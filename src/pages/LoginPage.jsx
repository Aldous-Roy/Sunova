import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Tabs, Tab, Container, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import useEnergyStore from '../store/energyStore';
import BoltIcon from '@mui/icons-material/Bolt';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useEnergyStore();
    const [tab, setTab] = useState(0); // 0: Host, 1: EV Driver, 2: Admin
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please enter any email and password to visualize the demo.');
            return;
        }
        
        const role = tab === 0 ? 'host' : (tab === 1 ? 'ev' : 'admin');
        login(email, password, role);
        
        if (role === 'host') navigate('/host');
        else if (role === 'ev') navigate('/ev');
        else navigate('/admin');
    };

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
        setEmail('');
        setPassword('');
        setError('');
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
        }}>
            <GlassCard sx={{ width: '100%', p: 4, textAlign: 'center' }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box sx={{ mb: 2, display: 'inline-flex', p: 1.5, borderRadius: '50%', background: 'rgba(59, 130, 246, 0.2)' }}>
                        <BoltIcon sx={{ fontSize: 40, color: '#3B82F6' }} />
                    </Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                        Sign in to the VoltNest P2P Network
                    </Typography>

                    <Tabs 
                        value={tab} 
                        onChange={handleTabChange} 
                        centered 
                        sx={{ mb: 4, borderBottom: 1, borderColor: 'rgba(255,255,255,0.1)' }}
                        textColor="primary"
                        indicatorColor="primary"
                    >
                        <Tab label="Solar Host" />
                        <Tab label="EV Driver" />
                        <Tab label="Compliance" />
                    </Tabs>

                    <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 2 }}
                            placeholder="demo@voltnest.com"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="******"
                        />
                        
                        {error && (
                            <Alert severity="info" sx={{ mt: 2, background: 'rgba(59, 130, 246, 0.1)', color: '#93C5FD' }}>
                                {error}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 4, mb: 2, py: 1.5, fontSize: '1.1rem' }}
                        >
                            Sign In as {tab === 0 ? 'Host' : (tab === 1 ? 'Driver' : 'Admin')}
                        </Button>
                        <Typography variant="caption" color="text.secondary">
                            (Pilot Demo Mode: Use any non-empty credentials)
                        </Typography>
                    </Box>
                </motion.div>
            </GlassCard>
        </Container>
    );
};

export default LoginPage;
