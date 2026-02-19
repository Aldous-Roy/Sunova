import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Chip, Avatar } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import BoltIcon from '@mui/icons-material/Bolt';
import useEnergyStore from '../store/energyStore';
import { motion } from 'framer-motion';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, setRole, wallet, hour, minute } = useEnergyStore();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'host') navigate('/host');
    else if (newRole === 'ev') navigate('/ev');
    else if (newRole === 'admin') navigate('/admin');
    else navigate('/');
  };

  const navItems = [
    { label: 'Host Mode', value: 'host' },
    { label: 'EV Driver', value: 'ev' },
    { label: 'Compliance', value: 'admin' },
  ];

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backgroundColor: 'rgba(11, 15, 26, 0.8)', 
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 80 }}>
            {/* Logo */}
            <motion.div 
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
            >
              <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                <BoltIcon />
              </Avatar>
              <Typography variant="h5" component="div" sx={{ fontWeight: 700, letterSpacing: '0.05em' }}>
                VOLT<span style={{ color: '#3B82F6' }}>NEST</span>
              </Typography>
            </motion.div>

            {/* Role Switcher */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
              {navItems.map((item) => (
                <Button
                  key={item.value}
                  variant={role === item.value ? "contained" : "text"}
                  color={role === item.value ? "primary" : "inherit"}
                  onClick={() => handleRoleChange(item.value)}
                  sx={{ 
                    borderRadius: '24px',
                    px: 3,
                    opacity: role === item.value ? 1 : 0.6 
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Stats / Time */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip 
                label={`Time: ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`} 
                variant="outlined" 
                sx={{ borderColor: 'rgba(255,255,255,0.2)' }}
              />
               <motion.div key={wallet} initial={{ scale: 1.2 }} animate={{ scale: 1 }}>
                <Chip 
                  label={`₹${wallet.toFixed(2)}`} 
                  color="success" 
                  variant="nav"
                  sx={{ fontWeight: 'bold', background: 'rgba(34, 197, 94, 0.2)', color: '#22C55E' }}
                />
              </motion.div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, minHeight: '80vh' }}>
        <motion.div
           key={location.pathname}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.div>
      </Container>
    </>
  );
};

export default Layout;
