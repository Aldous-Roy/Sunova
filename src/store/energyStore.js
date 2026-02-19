import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateSolarOutput, generateConsumption } from '../utils/energySimulation';

const useEnergyStore = create(
  persist(
    (set, get) => ({
      // Global State
      user: null, // { name, role, email }
      isAuthenticated: false,
      
      hour: 8, // Start at 8 AM
      minute: 0,
      solarOutput: 0,
      consumption: 0,
      surplus: 0,
      batteryLevel: 50, // %
      wallet: 1250, // INR
      role: 'host', // 'host' | 'ev' | 'admin'
      historicalData: [],
      bookings: [],

      // Actions
      setRole: (role) => set({ role }),
      
      login: (email, password, role) => {
        // Dummy Auth Logic
        const user = {
            name: role === 'host' ? 'Sarah Solar' : (role === 'admin' ? 'Grid Admin' : 'Dave Driver'),
            email: email,
            role: role
        };
        set({ user, isAuthenticated: true, role });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, role: null, bookings: [] });
        localStorage.removeItem('energy-storage'); // Clear persistence on logout
      },

      // Simulation Tick (to be called every few seconds)
      tick: () => {
        const { hour, minute, historicalData, batteryLevel, bookings } = get();
        
        // Advance time
        let newMinute = minute + 15;
        let newHour = hour;
        if (newMinute >= 60) {
          newMinute = 0;
          newHour = hour + 1;
          if (newHour >= 24) newHour = 0;
        }

        const timeFloat = newHour + newMinute / 60;
        
        // Generate new values
        const solar = generateSolarOutput(timeFloat);
        const cons = generateConsumption();
        
        // Check for active bookings
        const activeBookings = bookings.filter(b => b.status === 'active');
        const evLoad = activeBookings.length * 7.0; // 7kW AC charger per EV

        const totalConsumption = cons + evLoad;
        let currentSurplus = solar - totalConsumption;

        // Battery Logic
        let newBattery = batteryLevel;
        if (currentSurplus > 0) {
          if (newBattery < 100) {
            newBattery += (currentSurplus / 4); // charging
          }
        } else {
          if (newBattery > 0) {
            newBattery -= (Math.abs(currentSurplus) / 4); // discharging
          }
        }
        
        // Grid interaction
        const gridExport = currentSurplus > 0 && newBattery >= 100 ? currentSurplus : 0;
        const gridImport = currentSurplus < 0 && newBattery <= 0 ? Math.abs(currentSurplus) : 0;

        // Update Wallet (Earnings from EV or Grid Export)
        // Grid Feed-in tariff: 3 INR
        // EV Charging tariff: 14 INR
        let earning = 0;
        if (gridExport > 0) earning += gridExport * 0.25 * 3; // 15 min slot
        if (activeBookings.length > 0) earning += evLoad * 0.25 * 14;

        const newDataPoint = {
          time: `${newHour.toString().padStart(2, '0')}:${newMinute.toString().padStart(2, '0')}`,
          solar,
          consumption: totalConsumption,
          battery: newBattery,
          surplus: currentSurplus,
          gridExport,
          gridImport
        };
        
        // Keep last 20 data points for graph
        const newHistory = [...historicalData, newDataPoint].slice(-20);

        set({
          hour: newHour,
          minute: newMinute,
          solarOutput: solar,
          consumption: totalConsumption,
          surplus: currentSurplus,
          batteryLevel: Math.max(0, Math.min(100, newBattery)),
          historicalData: newHistory,
          wallet: get().wallet + earning
        });
      },

      addBooking: (booking) => set((state) => ({ 
        bookings: [...state.bookings, booking],
        wallet: state.wallet + booking.price // Pre-paid
      })),
    }),
    {
      name: 'energy-storage', // name of the item in the storage (must be unique)
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated, 
        role: state.role, 
        wallet: state.wallet,
        bookings: state.bookings
      }), // Persist only necessary fields
    }
  )
);

export default useEnergyStore;
