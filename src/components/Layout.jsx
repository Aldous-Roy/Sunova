import React, { useState } from 'react';
import { 
  Box, IconButton, Drawer, Typography, Chip, useMediaQuery
} from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import useEnergyStore from '../store/energyStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import Sidebar from './Sidebar';

const Layout = () => {
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { user, wallet, hour, minute } = useEnergyStore();
    const [mobileOpen, setMobileOpen] = useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    // If user is NOT logged in (Landing Page), show a simple Header (or nothing if you prefer landing page to handle its own layout)
    // For this refactor, we'll assume Layout wraps everything. If no user, we render children roughly as before but without Key Nav elements
    if (!user) {
        return (
             <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Outlet />
             </Box>
        );
    }
    
    // Sidebar width
    const drawerWidth = 260;

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0B0F1A' }}>
            {/* Desktop Sidebar */}
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 }, height: '100vh', display: { xs: 'none', md: 'block' } }}
            >
                <Sidebar />
            </Box>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                <Sidebar onClose={handleDrawerToggle} />
            </Drawer>

            {/* Main Content Area */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, minWidth: 0, height: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                
                {/* Mobile Header / Top Helper Bar */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, minHeight: '40px' }}>
                    {/* Mobile Toggle */}
                     <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Left: Optional Breadcrumb or Welcome */}
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Typography variant="body2" color="text.secondary">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </Typography>
                    </Box>

                    {/* Right: Global Stats (Time / Wallet) */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto' }}>
                        <Chip 
                            label={`${hour}:${minute.toString().padStart(2, '0')}`} 
                            variant="outlined" 
                            size="small"
                            sx={{ borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary' }}
                        />
                        <motion.div key={wallet} initial={{ scale: 1.2 }} animate={{ scale: 1 }}>
                            <Chip 
                                label={`₹${wallet.toFixed(0)}`} 
                                variant="filled"
                                sx={{ 
                                    fontWeight: 'bold', 
                                    background: 'linear-gradient(90deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)', 
                                    color: '#4ADE80',
                                    border: '1px solid rgba(34, 197, 94, 0.2)'
                                }}
                            />
                        </motion.div>
                    </Box>
                </Box>

                {/* Page Content */}
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%' }}
                >
                    <Outlet />
                </motion.div>
            </Box>
        </Box>
    );
};

export default Layout;
