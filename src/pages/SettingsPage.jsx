import React, { useState } from 'react';
import { Box, Typography, Button, TextField, FormControlLabel, Switch, Grid, Avatar } from '@mui/material';
import GlassCard from '../components/GlassCard';
import useEnergyStore from '../store/energyStore';

const SettingsPage = () => {
    const { user } = useEnergyStore();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [notifications, setNotifications] = useState(true);

    return (
        <Box maxWidth="md">
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>Account Settings</Typography>
            
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <GlassCard>
                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                            <Avatar sx={{ width: 80, height: 80, fontSize: '2rem', mr: 3, bgcolor: 'primary.main' }}>
                                {name.charAt(0)}
                            </Avatar>
                            <Box>
                                <Typography variant="h6">Profile Picture</Typography>
                                <Button size="small" sx={{ mt: 1 }}>Change Photo</Button>
                            </Box>
                         </Box>

                         <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    fullWidth 
                                    label="Full Name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    fullWidth 
                                    label="Email Address" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    variant="outlined"
                                />
                            </Grid>
                         </Grid>

                         <Box sx={{ mt: 4 }}>
                            <Typography variant="h6" gutterBottom>Preferences</Typography>
                            <FormControlLabel
                                control={
                                    <Switch 
                                        checked={notifications} 
                                        onChange={(e) => setNotifications(e.target.checked)} 
                                        color="primary" 
                                    />
                                }
                                label="Receive email notifications for bookings"
                            />
                         </Box>

                         <Box sx={{ mt: 4 }}>
                            <Button variant="contained" size="large">Save Changes</Button>
                         </Box>
                    </GlassCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SettingsPage;
