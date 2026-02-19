import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import HostDashboard from './pages/HostDashboard';
import EVDashboard from './pages/EVDashboard';
import AdminDashboard from './pages/AdminDashboard';
import WalletPage from './pages/WalletPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import CompliancePage from './pages/CompliancePage';
import useEnergyStore from './store/energyStore';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useEnergyStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const tick = useEnergyStore((state) => state.tick);

  // Simulation Loop
  useEffect(() => {
    tick(); // Initial sync
    const interval = setInterval(() => {
      tick();
    }, 60000); // 60 seconds per tick (Real Time)

    return () => clearInterval(interval);
  }, [tick]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            
            {/* Host Routes */}
            <Route path="host" element={<ProtectedRoute><HostDashboard /></ProtectedRoute>} />
            <Route path="host/earnings" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
            <Route path="host/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            
            {/* EV Routes */}
            <Route path="ev" element={<ProtectedRoute><EVDashboard /></ProtectedRoute>} />
            <Route path="ev/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="admin/compliance" element={<ProtectedRoute><CompliancePage /></ProtectedRoute>} />
            <Route path="admin/users" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
