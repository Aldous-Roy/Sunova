import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import HostDashboard from './pages/HostDashboard';
import EVDashboard from './pages/EVDashboard';
import AdminDashboard from './pages/AdminDashboard';
import useEnergyStore from './store/energyStore';

function App() {
  const tick = useEnergyStore((state) => state.tick);

  // Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 3000); // 3 seconds per tick (15 simulated minutes)

    return () => clearInterval(interval);
  }, [tick]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="host" element={<HostDashboard />} />
            <Route path="ev" element={<EVDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
