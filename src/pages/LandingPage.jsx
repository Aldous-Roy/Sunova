import React from 'react';
import { Box, Typography, Button, Grid, Container, Avatar, Toolbar, AppBar } from '@mui/material';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import useEnergyStore from '../store/energyStore';
import { useNavigate } from 'react-router-dom';
import BoltIcon from '@mui/icons-material/Bolt';

const LandingPage = () => {
  const navigate = useNavigate();
  const { setRole } = useEnergyStore();

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0B0F1A' }}>
        {/* Landing Page Navbar */}
        <AppBar position="static" elevation={0} sx={{ background: 'transparent', pt: 2 }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: 'rgba(59, 130, 246, 0.2)', color: '#3B82F6', mr: 2 }}>
                            <BoltIcon />
                        </Avatar>
                        <Typography variant="h5" fontWeight="bold" sx={{ letterSpacing: '0.05em' }}>
                            VOLT<span style={{ color: '#3B82F6' }}>NEST</span>
                        </Typography>
                    </Box>
                    <Button variant="outlined" sx={{ borderRadius: 6 }} onClick={handleStart}>
                        Sign In
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>

        <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', py: { xs: 6, md: 10 } }}>
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            >
            <Typography 
                variant="h1" 
                sx={{ 
                    fontSize: { xs: '2.5rem', md: '4.5rem' },
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #3B82F6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                    lineHeight: 1.1
                }}
            >
                Decentralized Energy. <br />
                Democratized Power.
            </Typography>
            <Typography 
                variant="h5" 
                color="text.secondary" 
                sx={{ 
                    mb: 6, 
                    maxWidth: '800px', 
                    mx: 'auto',
                    fontSize: { xs: '1rem', md: '1.25rem' },
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
                    padding: { xs: '12px 32px', md: '16px 48px' },
                    borderRadius: '50px',
                    boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
                    background: 'linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)'
                }}
            >
                Launch App
            </Button>
            </motion.div>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
            <Grid item xs={12} md={4}>
            <GlassCard delay={0.2} sx={{ textAlign: 'center', borderTop: '4px solid #3B82F6' }}>
                <Typography variant="h2" color="primary" sx={{ fontSize: { xs: '3rem', md: '3.75rem' }, fontWeight: 'bold' }}>40%</Typography>
                <Typography variant="body1" color="text.secondary">Surplus Redirected</Typography>
            </GlassCard>
            </Grid>
            <Grid item xs={12} md={4}>
                <GlassCard delay={0.4} sx={{ textAlign: 'center', borderTop: '4px solid #22C55E' }}>
                <Typography variant="h2" color="success.main" sx={{ fontSize: { xs: '3rem', md: '3.75rem' }, fontWeight: 'bold' }}>₹14</Typography>
                <Typography variant="body1" color="text.secondary">Per Unit (vs ₹20 Grid)</Typography>
                </GlassCard>
            </Grid>
            <Grid item xs={12} md={4}>
                <GlassCard delay={0.6} sx={{ textAlign: 'center', borderTop: '4px solid #F59E0B' }}>
                <Typography variant="h2" color="warning.main" sx={{ fontSize: { xs: '3rem', md: '3.75rem' }, fontWeight: 'bold' }}>100%</Typography>
                <Typography variant="body1" color="text.secondary">Regulatory Compliant</Typography>
                </GlassCard>
            </Grid>
        </Grid>
        
        {/* How it works */}
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold' }}>How the Pilot Works</Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
            <Grid item xs={12} md={4}>
                <GlassCard delay={0.8}>
                    <Typography variant="h5" gutterBottom fontWeight="bold">1. Generate</Typography>
                    <Typography color="text.secondary">Rooftop solar hosts generate excess power during peak sun hours (10 AM - 2 PM).</Typography>
                </GlassCard>
            </Grid>
            <Grid item xs={12} md={4}>
                <GlassCard delay={1.0}>
                    <Typography variant="h5" gutterBottom fontWeight="bold">2. Connect</Typography>
                    <Typography color="text.secondary">EV drivers find nearby hosts with dynamic surplus availability via the VoltNest app.</Typography>
                </GlassCard>
            </Grid>
            <Grid item xs={12} md={4}>
                <GlassCard delay={1.2}>
                    <Typography variant="h5" gutterBottom fontWeight="bold">3. Transact</Typography>
                    <Typography color="text.secondary">Smart contracts settle payments instantly. Hosts earn more; Drivers pay less.</Typography>
                </GlassCard>
            </Grid>
        </Grid>
        </Container>
    </Box>
  );
};

export default LandingPage;
