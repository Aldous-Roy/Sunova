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
                
                {/* Bento Grid Features */}
                <Box sx={{ mb: 20 }}>
                     <Typography variant="h3" fontWeight="bold" sx={{ textAlign: 'center', mb: 8 }}>
                        The Ecosystem
                    </Typography>
                    <Grid container spacing={3}>
                        {/* 1. Host Card (Large) */}
                        <Grid item xs={12} md={8}>
                            <GlassCard 
                                sx={{ 
                                    height: '400px', 
                                    p: 6, 
                                    position: 'relative', 
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': { transform: 'scale(1.01)', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)' }
                                }}
                            >
                                <Box sx={{ position: 'absolute', top: 0, right: 0, p: 4, opacity: 0.1 }}>
                                    <BoltIcon sx={{ fontSize: '200px', color: '#F59E0B' }} />
                                </Box>
                                <Box sx={{ position: 'relative', zIndex: 2 }}>
                                    <Chip label="For Hosts" sx={{ bgcolor: '#F59E0B', color: 'black', fontWeight: 'bold', mb: 2 }} />
                                    <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>Turn Sunlight into Income</Typography>
                                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', fontWeight: 400 }}>
                                        Monetize your rooftop surplus. Sell directly to neighbors via smart contracts, bypassing grid inefficiencies.
                                    </Typography>
                                </Box>
                            </GlassCard>
                        </Grid>

                        {/* 2. Driver Card (Tall/Side) */}
                        <Grid item xs={12} md={4}>
                             <GlassCard 
                                sx={{ 
                                    height: '400px', 
                                    p: 6, 
                                    position: 'relative', 
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                                     transition: 'all 0.3s ease',
                                    '&:hover': { transform: 'scale(1.02)', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)' }
                                }}
                            >
                                <Box sx={{ position: 'absolute', top: '-20px', right: '-20px', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(0,0,0,0) 70%)' }} />
                                <Box sx={{ position: 'relative', zIndex: 2 }}>
                                    <Chip label="For Drivers" sx={{ bgcolor: '#3B82F6', color: 'white', fontWeight: 'bold', mb: 2 }} />
                                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>Charge Anywhere</Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Access a decentralized network of private chargers. Fair rates, no subscriptions.
                                    </Typography>
                                </Box>
                            </GlassCard>
                        </Grid>

                        {/* 3. Tech Card (Wide Bottom) */}
                        <Grid item xs={12}>
                             <GlassCard 
                                sx={{ 
                                    height: '300px', 
                                    p: 6, 
                                    position: 'relative', 
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
                                     transition: 'all 0.3s ease',
                                    '&:hover': { transform: 'scale(1.01)', background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)' }
                                }}
                            >
                                <Grid container spacing={4} alignItems="center">
                                    <Grid item xs={12} md={6}>
                                        <Chip label="Powered by Ethereum" sx={{ bgcolor: '#22C55E', color: 'black', fontWeight: 'bold', mb: 2 }} />
                                        <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>Trustless Settlement</Typography>
                                        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                                            Payments execute automatically when energy flows. No middlemen, no delays, complete transparency.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                         <Box sx={{ 
                                             p: 3, 
                                             border: '1px solid rgba(34, 197, 94, 0.3)', 
                                             borderRadius: 4, 
                                             bgcolor: 'rgba(0,0,0,0.3)',
                                             backdropFilter: 'blur(10px)',
                                             fontFamily: 'monospace',
                                             color: '#22C55E'
                                         }}>
                                            <Typography variant="body2">{`function settlePayment() public payable {`}</Typography>
                                            <Typography variant="body2" sx={{ pl: 2 }}>{`require(energyDelivered > 0, "No energy");`}</Typography>
                                            <Typography variant="body2" sx={{ pl: 2 }}>{`host.transfer(msg.value);`}</Typography>
                                            <Typography variant="body2">{`}`}</Typography>
                                         </Box>
                                    </Grid>
                                </Grid>
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
