import React, { useState } from 'react';
import { Box, Typography, Button, TextField, FormControlLabel, Switch, Grid, Avatar, Chip, Divider, IconButton, InputAdornment } from '@mui/material';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import useEnergyStore from '../store/energyStore';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BadgeIcon from '@mui/icons-material/Badge';
import SecurityIcon from '@mui/icons-material/Security';

const SettingsPage = () => {
    const { user } = useEnergyStore();
    const [name, setName] = useState(user?.name || 'User Name');
    const [email, setEmail] = useState(user?.email || 'user@example.com');
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <Box maxWidth="lg" sx={{ mx: 'auto', pb: 4 }}>
            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                
                {/* Page Header */}
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="h4" fontWeight="bold" sx={{ background: 'linear-gradient(45deg, #fff, #94a3b8)', backgroundClip: 'text', textFillColor: 'transparent', mb: 1 }}>
                            Account Settings
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Manage your profile, security, and preferences
                        </Typography>
                    </Box>
                </Box>

                <Grid container spacing={4}>
                    {/* Left Column: Profile Card */}
                    <Grid item xs={12} md={4}>
                        <GlassCard sx={{ textAlign: 'center', p: 4, position: 'relative', overflow: 'visible' }}>
                            <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                                <Avatar 
                                    sx={{ 
                                        width: 120, 
                                        height: 120, 
                                        fontSize: '3rem', 
                                        bgcolor: 'rgba(59, 130, 246, 0.2)',
                                        color: '#60A5FA',
                                        border: '4px solid rgba(255,255,255,0.1)',
                                        boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                                    }}
                                >
                                    {name.charAt(0)}
                                </Avatar>
                            </Box>
                            
                            <Typography variant="h5" fontWeight="bold" gutterBottom>{name}</Typography>
                            <Chip 
                                label={user?.role?.toUpperCase() || 'USER'} 
                                size="small" 
                                sx={{ 
                                    bgcolor: 'rgba(59, 130, 246, 0.15)', 
                                    color: '#60A5FA', 
                                    borderColor: 'rgba(59, 130, 246, 0.3)', 
                                    borderWidth: 1, 
                                    borderStyle: 'solid',
                                    fontWeight: 'bold',
                                    letterSpacing: 1
                                }} 
                            />
                            
                            <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />
                            
                            <Box sx={{ textAlign: 'left' }}>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>Member Since</Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>August 2025</Typography>
                                
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>Location</Typography>
                                <Typography variant="body2">Chennai, India</Typography>
                            </Box>
                        </GlassCard>
                    </Grid>

                    {/* Right Column: Edit Forms */}
                    <Grid item xs={12} md={8}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {/* Personal Information */}
                            <GlassCard>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <BadgeIcon sx={{ color: '#60A5FA', mr: 2 }} />
                                    <Typography variant="h6" fontWeight="bold">Personal Information</Typography>
                                </Box>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                            fullWidth 
                                            label="Full Name" 
                                            value={name} 
                                            onChange={(e) => setName(e.target.value)}
                                            variant="filled"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonIcon sx={{ color: 'text.secondary' }} />
                                                    </InputAdornment>
                                                ),
                                                disableUnderline: true,
                                                sx: { borderRadius: 2, bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                            fullWidth 
                                            label="Email Address" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)}
                                            variant="filled"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailIcon sx={{ color: 'text.secondary' }} />
                                                    </InputAdornment>
                                                ),
                                                disableUnderline: true,
                                                sx: { borderRadius: 2, bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                            fullWidth 
                                            label="Bio / About" 
                                            multiline
                                            rows={3}
                                            placeholder="Tell us a little about yourself..."
                                            variant="filled"
                                            InputProps={{
                                                disableUnderline: true,
                                                sx: { borderRadius: 2, bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </GlassCard>

                            {/* Preferences */}
                            <GlassCard>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <NotificationsIcon sx={{ color: '#FBBF24', mr: 2 }} />
                                    <Typography variant="h6" fontWeight="bold">Preferences & Notifications</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box>
                                            <Typography variant="subtitle1">Email Notifications</Typography>
                                            <Typography variant="body2" color="text.secondary">Receive updates about your bookings and earnings.</Typography>
                                        </Box>
                                        <Switch checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
                                    </Box>
                                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box>
                                            <Typography variant="subtitle1">Dark Mode</Typography>
                                            <Typography variant="body2" color="text.secondary">Toggle application theme preference.</Typography>
                                        </Box>
                                        <Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
                                    </Box>
                                </Box>
                            </GlassCard>

                            {/* Security (Placeholder) */}
                            <GlassCard>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <SecurityIcon sx={{ color: '#EF4444', mr: 2 }} />
                                    <Typography variant="h6" fontWeight="bold">Security</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    Two-factor authentication is enabled for your account.
                                </Typography>
                            </GlassCard>

                        </Box>
                    </Grid>
                </Grid>
            </motion.div>
        </Box>
    );
};

export default SettingsPage;
