import React from 'react';
import { Box, Typography, Button, Grid, Container, Avatar, Toolbar, AppBar, IconButton, Chip, Card } from '@mui/material';
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

                {/* Value Proposition Stats */}
                <Box sx={{ mb: 10 }}>
                    <GlassCard sx={{ p: { xs: 4, md: 6 }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-around', alignItems: 'center', gap: 4, background: 'rgba(26, 34, 53, 0.4)' }}>
                        {[
                            { value: '40%', label: 'Surplus Redirected', sub: 'From wasted to wealth', color: '#3B82F6' },
                            { type: 'divider' },
                            { value: '₹14', label: 'Per Unit Cost', sub: 'vs ₹20 Grid Rate', color: '#22C55E' },
                            { type: 'divider' },
                            { value: '100%', label: 'Secure & Compliant', sub: 'Smart Contract Audited', color: '#F59E0B' }
                        ].map((item, index) => (
                            item.type === 'divider' ? (
                                <Box key={index} sx={{ width: '1px', height: '80px', bgcolor: 'rgba(255,255,255,0.1)', display: { xs: 'none', md: 'block' } }} />
                            ) : (
                                <Box key={index} sx={{ textAlign: 'center' }}>
                                    <Typography variant="h2" sx={{ color: item.color, fontSize: { xs: '3rem', md: '4.5rem' }, fontWeight: 800, mb: 1, letterSpacing: '-0.02em' }}>
                                        {item.value}
                                    </Typography>
                                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>{item.label}</Typography>
                                    <Typography variant="body2" color="text.secondary">{item.sub}</Typography>
                                </Box>
                            )
                        ))}
                    </GlassCard>
                </Box>
                
                {/* Feature 1: Generate */}
                <Box sx={{ mb: 12, position: 'relative' }}>
                    {/* Background Glow */}
                    <Box sx={{ position: 'absolute', top: '50%', left: '0', transform: 'translateY(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, rgba(0,0,0,0) 70%)', zIndex: -1, pointerEvents: 'none' }} />
                    <Grid container spacing={8} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                                <Chip label="For Hosts" color="warning" sx={{ mb: 3, bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', border: '1px solid rgba(245, 158, 11, 0.2)' }} />
                                <Typography variant="h3" fontWeight="bold" sx={{ mb: 3 }}>Turn Sunlight into Passive Income.</Typography>
                                <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8, fontWeight: 400 }}>
                                    Your rooftop solar panels perform best when you aren't home. Instead of letting that power fade or selling it specifically to the grid for pennies, sell it to your neighbors at a premium.
                                </Typography>
                                <Button variant="text" size="large" sx={{ color: '#F59E0B', p: 0, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}>
                                    Start Hosting &rarr;
                                </Button>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <GlassCard sx={{ p: 0, overflow: 'hidden', transform: 'rotate(2deg)', transition: 'transform 0.3s ease', '&:hover': { transform: 'rotate(0deg)' } }}>
                                <Box sx={{ height: '300px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <BoltIcon sx={{ fontSize: '150px', color: 'rgba(245, 158, 11, 0.5)' }} />
                                </Box>
                                <Box sx={{ p: 4, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="body1" color="text.secondary">Daily Earnings</Typography>
                                        <Typography variant="h6" color="success.main">+ ₹450.00</Typography>
                                    </Box>
                                    <Box sx={{ height: '8px', width: '100%', bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                                        <Box sx={{ height: '100%', width: '75%', bgcolor: '#F59E0B' }} />
                                    </Box>
                                </Box>
                            </GlassCard>
                        </Grid>
                    </Grid>
                </Box>

                {/* Connecting Line (Desktop only) */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', mb: 4 }}>
                    <Box sx={{ width: '2px', height: '100px', background: 'linear-gradient(to bottom, rgba(245, 158, 11, 0.5), rgba(59, 130, 246, 0.5))' }} />
                </Box>

                {/* Feature 2: Connect */}
                <Box sx={{ mb: 12, position: 'relative' }}>
                     {/* Background Glow */}
                     <Box sx={{ position: 'absolute', top: '50%', right: '0', transform: 'translateY(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(0,0,0,0) 70%)', zIndex: -1, pointerEvents: 'none' }} />
                    <Grid container spacing={8} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
                        <Grid item xs={12} md={6}>
                            <GlassCard sx={{ p: 0, overflow: 'hidden', transform: 'rotate(-2deg)', transition: 'transform 0.3s ease', '&:hover': { transform: 'rotate(0deg)' } }}>
                                <Box sx={{ height: '300px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Box sx={{ position: 'relative' }}>
                                        <Box sx={{ width: '120px', height: '120px', border: '2px solid #3B82F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 2s infinite' }}>
                                            <Box sx={{ width: '12px', height: '12px', bgcolor: '#3B82F6', borderRadius: '50%' }} />
                                        </Box>
                                        <Box sx={{ position: 'absolute', top: '-40px', right: '-40px', bgcolor: 'rgba(26, 34, 53, 0.9)', p: 2, borderRadius: 3, border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                                            <Typography variant="caption" color="text.secondary">Station Found</Typography>
                                            <Typography variant="body2" fontWeight="bold">0.8 km away</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </GlassCard>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                                <Chip label="For Drivers" color="primary" sx={{ mb: 3, bgcolor: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', border: '1px solid rgba(59, 130, 246, 0.2)' }} />
                                <Typography variant="h3" fontWeight="bold" sx={{ mb: 3 }}>Charge Anywhere. <br /> Pay Less.</Typography>
                                <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8, fontWeight: 400 }}>
                                    Find private charging spots in your neighborhood. No queues, no app subscriptions, just pure energy at fair rates.
                                </Typography>
                                <Button variant="text" size="large" sx={{ color: '#3B82F6', p: 0, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}>
                                    Find Stations &rarr;
                                </Button>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Box>

                {/* Connecting Line (Desktop only) */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', mb: 4 }}>
                    <Box sx={{ width: '2px', height: '100px', background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.5), rgba(34, 197, 94, 0.5))' }} />
                </Box>

                {/* Feature 3: Transact */}
                <Box sx={{ mb: 16, position: 'relative' }}>
                     {/* Background Glow */}
                     <Box sx={{ position: 'absolute', top: '50%', left: '0', transform: 'translateY(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, rgba(0,0,0,0) 70%)', zIndex: -1, pointerEvents: 'none' }} />
                     <Grid container spacing={8} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                                <Chip label="Technology" color="success" sx={{ mb: 3, bgcolor: 'rgba(34, 197, 94, 0.1)', color: '#22C55E', border: '1px solid rgba(34, 197, 94, 0.2)' }} />
                                <Typography variant="h3" fontWeight="bold" sx={{ mb: 3 }}>Trustless & Instant.</Typography>
                                <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8, fontWeight: 400 }}>
                                    Powered by Ethereum smart contracts. Payments settle the moment electrons flow. No middlemen taking a cut.
                                </Typography>
                                <Button variant="text" size="large" sx={{ color: '#22C55E', p: 0, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}>
                                    View Contract &rarr;
                                </Button>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                             <GlassCard sx={{ p: 4, transform: 'rotate(2deg)', transition: 'transform 0.3s ease', '&:hover': { transform: 'rotate(0deg)' } }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <Avatar sx={{ bgcolor: 'rgba(34, 197, 94, 0.2)', color: '#22C55E', mr: 2 }}><Typography variant="h6">₹</Typography></Avatar>
                                    <Box>
                                        <Typography variant="body1" fontWeight="bold">Payment Received</Typography>
                                        <Typography variant="caption" color="text.secondary">0x8a...4b21 • Just now</Typography>
                                    </Box>
                                    <Typography variant="body1" color="success.main" sx={{ ml: 'auto', fontWeight: 'bold' }}>+ ₹210.00</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', opacity: 0.6 }}>
                                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white', mr: 2, width: 32, height: 32 }}><Typography variant="caption">Tx</Typography></Avatar>
                                    <Box>
                                        <Typography variant="body2">Smart Contract Interaction</Typography>
                                        <Typography variant="caption" color="text.secondary">Verified</Typography>
                                    </Box>
                                </Box>
                            </GlassCard>
                        </Grid>
                    </Grid>
                </Box>

                {/* CTA Section */}
                <Box sx={{ mb: 10, textAlign: 'center' }}>
                    <Card sx={{ 
                        background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', 
                        borderRadius: 8, 
                        p: { xs: 6, md: 10 },
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <Box sx={{ position: 'relative', zIndex: 2 }}>
                            <Typography variant="h2" fontWeight="800" sx={{ mb: 3, color: 'white' }}>Ready to Join the Grid?</Typography>
                            <Typography variant="h6" sx={{ mb: 6, color: 'rgba(255,255,255,0.9)', maxWidth: '600px', mx: 'auto' }}>
                                Note: This is a pilot program currently live in localized microgrids within Chennai.
                            </Typography>
                             <Button 
                                variant="contained" 
                                size="large" 
                                onClick={handleStart}
                                sx={{ 
                                    bgcolor: 'white',
                                    color: '#2563EB',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    px: 6,
                                    py: 2,
                                    borderRadius: 50,
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                                }}
                            >
                                Get Started Now
                            </Button>
                        </Box>
                        {/* Decorative Circles */}
                        <Box sx={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />
                        <Box sx={{ position: 'absolute', bottom: -100, right: -100, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />
                    </Card>
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
