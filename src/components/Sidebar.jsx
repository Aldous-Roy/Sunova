import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar, Divider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import BoltIcon from '@mui/icons-material/Bolt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EvStationIcon from '@mui/icons-material/EvStation';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MapIcon from '@mui/icons-material/Map';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import useEnergyStore from '../store/energyStore';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const Sidebar = ({ onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useEnergyStore();
    
    // Fallback if no user is logged in (should be protected by route, but for safety)
    if (!user) return null;

    const handleNavigation = (path) => {
        navigate(path);
        if (typeof onClose === 'function') onClose(); // Close drawer on mobile
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        if (typeof onClose === 'function') onClose();
    };

    // Dynamic Menu Items based on Role
    let menuItems = [];

    if (user.role === 'host') {
        menuItems = [
            { label: 'Dashboard', icon: <DashboardIcon />, path: '/host' },
            { label: 'My Earnings', icon: <AccountBalanceWalletIcon />, path: '/host/earnings' },
            { label: 'Settings', icon: <SettingsIcon />, path: '/host/settings' },
        ];
    } else if (user.role === 'ev') {
        menuItems = [
            { label: 'Find Chargers', icon: <MapIcon />, path: '/ev' },
            { label: 'History', icon: <HistoryIcon />, path: '/ev/history' },
        ];
    } else if (user.role === 'admin') {
        menuItems = [
            { label: 'Network Overview', icon: <DashboardIcon />, path: '/admin' },
            { label: 'Compliance Audit', icon: <BoltIcon />, path: '/admin' },
            { label: 'User Management', icon: <SettingsIcon />, path: '/admin/users' },
        ];
    }

    return (
        <Box sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            bgcolor: '#0B0F1A',
            borderRight: '1px solid rgba(255,255,255,0.05)',
        }}>
            {/* Logo Area */}
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                 <Avatar sx={{ bgcolor: 'rgba(59, 130, 246, 0.2)', color: '#3B82F6', mr: 2 }}>
                    <BoltIcon />
                </Avatar>
                <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: '0.05em' }}>
                    VOLT<span style={{ color: '#3B82F6' }}>NEST</span>
                </Typography>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />

            {/* Navigation Menu */}
            <List sx={{ flexGrow: 1, px: 2, py: 3 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton 
                            onClick={() => handleNavigation(item.path)}
                            sx={{ 
                                borderRadius: 3,
                                backgroundColor: location.pathname === item.path ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                                color: location.pathname === item.path ? '#3B82F6' : 'text.secondary',
                                '&:hover': {
                                    backgroundColor: 'rgba(59, 130, 246, 0.08)',
                                    color: 'white'
                                }
                            }}
                        >
                            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
                            {location.pathname === item.path && (
                                <motion.div layoutId="active-pill" style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#3B82F6' }} />
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            {/* User Profile / Logout */}
            <Box sx={{ p: 2 }}>
                <GlassCard sx={{ p: 2, background: 'rgba(255,255,255,0.03)', border: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 1.5, fontSize: '0.8rem' }}>
                            {user.name.charAt(0)}
                        </Avatar>
                        <Box>
                            <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>{user.name}</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>{user.role} Account</Typography>
                        </Box>
                    </Box>
                    <ListItemButton 
                        onClick={handleLogout}
                        sx={{ 
                            borderRadius: 2, 
                            p: 1,
                            color: '#EF4444',
                            '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' }
                        }}
                    >
                        <ListItemIcon sx={{ color: 'inherit', minWidth: 32 }}>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Sign Out" primaryTypographyProps={{ fontSize: '0.85rem' }} />
                    </ListItemButton>
                </GlassCard>
            </Box>
        </Box>
    );
};

export default Sidebar;
