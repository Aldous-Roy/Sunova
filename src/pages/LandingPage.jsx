import React from 'react';
import { Box, Typography, Button, Grid, Container } from '@mui/material';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import useEnergyStore from '../store/energyStore';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const { setRole } = useEnergyStore();

  const handleStart = () => {
    setRole('host');
    navigate('/host');
  };

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <Typography 
            variant="h1" 
            sx={{ 
                background: 'linear-gradient(135deg, #FFFFFF 0%, #3B82F6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
            }}
          >
            Decentralized Energy. <br />
            Democratized Power.
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}>
            Join the peer-to-peer revolution. Trade surplus rooftop solar energy with EV drivers in your neighborhood.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            onClick={handleStart}
            sx={{ 
                fontSize: '1.2rem', 
                padding: '12px 36px',
                borderRadius: '30px',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
            }}
          >
            Launch Pilot Simulation
          </Button>
        </motion.div>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={4} sx={{ mb: 10 }}>
        <Grid item xs={12} md={4}>
          <GlassCard delay={0.2} sx={{ textAlign: 'center' }}>
            <Typography variant="h2" color="primary">40%</Typography>
            <Typography variant="body1" color="text.secondary">Surplus Redirected</Typography>
          </GlassCard>
        </Grid>
        <Grid item xs={12} md={4}>
            <GlassCard delay={0.4} sx={{ textAlign: 'center' }}>
            <Typography variant="h2" color="secondary">₹14</Typography>
            <Typography variant="body1" color="text.secondary">Per Unit (vs ₹20 Grid)</Typography>
            </GlassCard>
        </Grid>
        <Grid item xs={12} md={4}>
            <GlassCard delay={0.6} sx={{ textAlign: 'center' }}>
            <Typography variant="h2" color="warning.main">100%</Typography>
            <Typography variant="body1" color="text.secondary">Regulatory Compliant</Typography>
            </GlassCard>
        </Grid>
      </Grid>
      
      {/* How it works */}
      <Typography variant="h3" sx={{ textAlign: 'center', mb: 6 }}>How the Pilot Works</Typography>
      <Grid container spacing={4}>
         <Grid item xs={12} md={4}>
            <GlassCard delay={0.8}>
                <Typography variant="h5" gutterBottom>1. Generate</Typography>
                <Typography color="text.secondary">Rooftop solar hosts generate excess power during peak sun hours (10 AM - 2 PM).</Typography>
            </GlassCard>
         </Grid>
         <Grid item xs={12} md={4}>
            <GlassCard delay={1.0}>
                <Typography variant="h5" gutterBottom>2. Connect</Typography>
                <Typography color="text.secondary">EV drivers find nearby hosts with dynamic surplus availability via the VoltNest app.</Typography>
            </GlassCard>
         </Grid>
         <Grid item xs={12} md={4}>
            <GlassCard delay={1.2}>
                <Typography variant="h5" gutterBottom>3. Transact</Typography>
                <Typography color="text.secondary">Smart contracts settle payments instantly. Hosts earn more; Drivers pay less.</Typography>
            </GlassCard>
         </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
