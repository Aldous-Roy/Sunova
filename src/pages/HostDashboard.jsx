import React from 'react';
import { Grid, Typography, Box, CircularProgress, Chip } from '@mui/material';
import GlassCard from '../components/GlassCard';
import EnergyChart from '../components/EnergyChart';
import useEnergyStore from '../store/energyStore';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import HomeIcon from '@mui/icons-material/Home';

const StatCard = ({ title, value, unit, icon, color, delay }) => (
    <GlassCard delay={delay} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ color: color, mb: 1 }}>{icon}</Box>
        <Typography variant="h6" color="text.secondary">{title}</Typography>
        <Typography variant="h3" fontWeight="bold">
            {value} <span style={{ fontSize: '1rem', opacity: 0.7 }}>{unit}</span>
        </Typography>
    </GlassCard>
);

const HostDashboard = () => {
    const { 
        solarOutput, 
        consumption, 
        surplus, 
        batteryLevel, 
        historicalData, 
        bookings 
    } = useEnergyStore();

    const activeBookings = bookings.filter(b => b.status === 'active');

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                Solar Host Dashboard
            </Typography>

            {/* Top Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={3}>
                    <StatCard 
                        title="Solar Generation" 
                        value={solarOutput.toFixed(2)} 
                        unit="kW" 
                        icon={<WbSunnyIcon fontSize="large" />} 
                        color="#F59E0B"
                        delay={0.1}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard 
                        title="Consumption" 
                        value={consumption.toFixed(2)} 
                        unit="kW" 
                        icon={<HomeIcon fontSize="large" />} 
                        color="#EF4444"
                        delay={0.2}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard 
                        title="Battery Level" 
                        value={batteryLevel.toFixed(1)} 
                        unit="%" 
                        icon={<BatteryChargingFullIcon fontSize="large" />} 
                        color="#3B82F6"
                        delay={0.3}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                     <GlassCard delay={0.4} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h6" color="text.secondary">Net Surplus</Typography>
                        <Box sx={{ position: 'relative', display: 'inline-flex', mt: 2 }}>
                            <CircularProgress 
                                variant="determinate" 
                                value={Math.min(100, (Math.max(0, surplus) / 5) * 100)} 
                                size={80} 
                                thickness={4}
                                sx={{ color: surplus > 0 ? '#22C55E' : '#EF4444' }}
                            />
                            <Box
                                sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                }}
                            >
                                <Typography variant="caption" component="div" color="white" fontWeight="bold">
                                {surplus > 0 ? '+' : ''}{surplus.toFixed(1)}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>kW Available </Typography>
                    </GlassCard>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {/* Main Graph */}
                <Grid item xs={12} md={8}>
                    <GlassCard delay={0.5} sx={{ height: '400px' }}>
                        <Typography variant="h6" gutterBottom>Real-time Energy Flow</Typography>
                        <EnergyChart data={historicalData} />
                    </GlassCard>
                </Grid>

                {/* Active Bookings / Status */}
                <Grid item xs={12} md={4}>
                    <GlassCard delay={0.6} sx={{ height: '400px', overflowY: 'auto' }}>
                        <Typography variant="h6" gutterBottom>Active Sessions</Typography>
                        {activeBookings.length === 0 ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80%', opacity: 0.5 }}>
                                <Typography>No active EV charging sessions.</Typography>
                            </Box>
                        ) : (
                            activeBookings.map((booking, index) => (
                                <Box key={index} sx={{ mb: 2, p: 2, borderRadius: 2, background: 'rgba(255,255,255,0.05)' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="subtitle2" fontWeight="bold">{booking.user}</Typography>
                                        <Chip label="Charging" color="success" size="small" />
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">Rate: ₹14/kWh</Typography>
                                    <Typography variant="body2" fontWeight="bold" color="primary">Earning: +₹10.50</Typography>
                                </Box>
                            ))
                        )}
                        
                        {/* Simulated Grid Feed-in */}
                        {surplus > 0 && activeBookings.length === 0 && batteryLevel >= 100 && (
                             <Box sx={{ mt: 2, p: 2, borderRadius: 2, background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22C55E' }}>
                                <Typography variant="subtitle2" color="#22C55E">Exporting to Grid</Typography>
                            </Box>
                        )}
                    </GlassCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HostDashboard;
