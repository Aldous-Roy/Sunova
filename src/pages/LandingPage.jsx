import React from 'react';
import { Box, Typography, Button, Grid, Container, Avatar, Toolbar, AppBar, IconButton, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import useEnergyStore from '../store/energyStore';
import { useNavigate } from 'react-router-dom';
import BoltIcon from '@mui/icons-material/Bolt';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

const LandingPage = () => {
  const navigate = useNavigate();
  const { setRole } = useEnergyStore();

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0B0F1A', display: 'flex', flexDirection: 'column' }}>
        {/* Landing Page Navbar */}
        <AppBar position="static" elevation={0} sx={{ background: 'transparent', pt: 2 }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ bgcolor: 'rgba(59, 130, 246, 0.2)', color: '#3B82F6' }}>
                            <BoltIcon />
                        </Avatar>
                        <Typography variant="h5" fontWeight="bold" sx={{ letterSpacing: '0.05em' }}>
                            VOLT<span style={{ color: '#3B82F6' }}>NEST</span>
                        </Typography>
                    </Box>
                    <Button 
                        variant="outlined" 
                        sx={{ 
                            borderRadius: '50px', 
                            borderColor: 'rgba(255,255,255,0.2)', 
                            color: 'white',
                            px: 3,
                            '&:hover': { borderColor: '#3B82F6', bgcolor: 'rgba(59, 130, 246, 0.1)' }
                        }} 
                        onClick={handleStart}
                    >
                        Sign In
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1 }}>
            <Container maxWidth="lg">
                {/* Hero Section */}
                <Box sx={{ textAlign: 'center', pt: { xs: 12, md: 20 }, pb: { xs: 10, md: 16 } }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Chip 
                            label="Now Live in Chennai 🇮🇳" 
                            sx={{ 
                                bgcolor: 'rgba(59, 130, 246, 0.1)', 
                                color: '#3B82F6', 
                                border: '1px solid rgba(59, 130, 246, 0.2)',
                                mb: 3,
                                fontWeight: 500
                            }} 
                        />
                        <Typography 
                            variant="h1" 
                            sx={{ 
                                fontSize: { xs: '2.5rem', md: '5rem' },
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 3,
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em'
                            }}
                        >
                            Decentralized Energy. <br />
                            <span style={{ color: '#3B82F6', WebkitTextFillColor: '#3B82F6' }}>Democratized Power.</span>
                        </Typography>
                        <Typography 
                            variant="h5" 
                            color="text.secondary" 
                            sx={{ 
                                mb: 6, 
                                maxWidth: '700px', 
                                mx: 'auto',
                                fontSize: { xs: '1rem', md: '1.25rem' },
                                lineHeight: 1.6,
                                fontWeight: 400
                            }}
                        >
                            Join the peer-to-peer revolution. Trade surplus rooftop solar energy with EV drivers in your neighborhood using smart contracts.
                        </Typography>
                        <Button 
                            variant="contained" 
                            size="large" 
                            onClick={handleStart}
                            sx={{ 
                                fontSize: { xs: '1rem', md: '1.1rem' }, 
                                padding: { xs: '16px 48px', md: '18px 60px' },
                                borderRadius: '50px',
                                boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
                                background: 'linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)',
                                textTransform: 'none',
                                fontWeight: 600
                            }}
                        >
                            Launch App
                        </Button>
                    </motion.div>
                </Box>

                {/* Stats Grid */}
                <Grid container spacing={4} sx={{ mb: 16 }}>
                    {[
                        { value: '40%', label: 'Surplus Redirected', color: '#3B82F6' },
                        { value: '₹14', label: 'Per Unit (vs ₹20 Grid)', color: '#22C55E' },
                        { value: '100%', label: 'Regulatory Compliant', color: '#F59E0B' }
                    ].map((stat, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <GlassCard 
                                delay={0.1 * (index + 1)} 
                                sx={{ 
                                    textAlign: 'center', 
                                    borderTop: `4px solid ${stat.color}`,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    py: 6
                                }}
                            >
                                <Typography variant="h2" sx={{ color: stat.color, fontSize: { xs: '3rem', md: '4rem' }, fontWeight: 'bold', mb: 1 }}>
                                    {stat.value}
                                </Typography>
                                <Typography variant="h6" color="text.secondary" fontWeight="500">
                                    {stat.label}
                                </Typography>
                            </GlassCard>
                        </Grid>
                    ))}
                </Grid>
                
                {/* How it works */}
                <Box sx={{ mb: 16 }}>
                    <Typography variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 'bold' }}>How the Pilot Works</Typography>
                    <Grid container spacing={4}>
                        {[
                            { title: '1. Generate', desc: 'Rooftop solar hosts generate excess power during peak sun hours (10 AM - 2 PM).' },
                            { title: '2. Connect', desc: 'EV drivers find nearby hosts with dynamic surplus availability via the VoltNest app.' },
                            { title: '3. Transact', desc: 'Smart contracts settle payments instantly. Hosts earn more; Drivers pay less.' }
                        ].map((step, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <GlassCard delay={0.4 + (index * 0.1)} sx={{ height: '100%', p: 4 }}>
                                    <Typography variant="h5" gutterBottom fontWeight="bold" color="primary.main">{step.title}</Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>{step.desc}</Typography>
                                </GlassCard>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>

        {/* Footer */}
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.05)', py: 6, mt: 'auto' }}>
            <Container maxWidth="lg">
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                         <Typography variant="body2" color="text.secondary">
                            © 2026 VoltNest. All rights reserved. Built for the Future.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'white' } }}><GitHubIcon /></IconButton>
                            <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'white' } }}><TwitterIcon /></IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </Box>
  );
};

export default LandingPage;
