import React, { useState } from 'react';
import { 
    Grid, Typography, Box, Button, Dialog, DialogTitle, 
    DialogContent, DialogActions, Chip, LinearProgress 
} from '@mui/material';
import GlassCard from '../components/GlassCard';
import MapComponent from '../components/MapComponent';
import useEnergyStore from '../store/energyStore';
import { calculateSavings, PRICING } from '../utils/pricingEngine';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EvStationIcon from '@mui/icons-material/EvStation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const HostCard = ({ host, onBook, delay }) => (
    <GlassCard delay={delay} sx={{ p: 0, overflow: 'hidden', position: 'relative', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">{host.name}</Typography>
                <Chip label={`${host.distance} km`} size="small" icon={<LocationOnIcon />} variant="outlined" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EvStationIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h4" color="primary">{host.availableKw} kW</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>Available</Typography>
            </Box>
            <Typography variant="body2" color="success.main" fontWeight="bold">
                Rate: ₹{PRICING.VOLTNEST_TARIFF}/kWh
            </Typography>
        </Box>
        <Button 
            fullWidth 
            variant="contained" 
            sx={{ borderRadius: 0, py: 2 }}
            onClick={() => onBook(host)}
            disabled={host.availableKw <= 0}
        >
            {host.availableKw > 0 ? 'Book Now' : 'Unavailable'}
        </Button>
    </GlassCard>
);

const EVDashboard = () => {
    const { addBooking, wallet, user } = useEnergyStore();
    const [selectedHost, setSelectedHost] = useState(null);
    const [open, setOpen] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    // Mock Location Data (Bangalore Center-ish)
    const userLocation = [12.9716, 77.5946];
    
    const hosts = [
        { id: 1, name: 'EcoHaven Residence', distance: 0.8, availableKw: 4.2, coords: [12.9750, 77.5980] },
        { id: 2, name: 'GreenRoof Villa', distance: 1.2, availableKw: 2.5, coords: [12.9680, 77.5900] },
        { id: 3, name: 'SunnySide Apts', distance: 0.5, availableKw: 0, coords: [12.9730, 77.5920] }, // Unavailable
        { id: 4, name: 'Solaris Desktop', distance: 2.1, availableKw: 6.0, coords: [12.9800, 77.6000] },
        { id: 5, name: 'TechPark Solar', distance: 3.5, availableKw: 12.0, coords: [12.9600, 77.6100] },
    ];

    const handleOpen = (host) => {
        setSelectedHost(host);
        setBookingSuccess(false);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedHost(null);
    };

    const handleConfirmBooking = () => {
        // Simulate booking logic
        addBooking({
            id: Date.now(),
            hostId: selectedHost.id,
            hostName: selectedHost.name,
            user: user ? user.name : 'Unknown Driver',
            status: 'active',
            price: 50 // Fixed dummy price for demo
        });
        setBookingSuccess(true);
        // Close after delay
        setTimeout(handleClose, 2000);
    };

    const savings = calculateSavings(100); 

    return (
        <Box sx={{ height: { xs: 'auto', md: 'calc(100vh - 100px)' }, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 2, gap: 1 }}>
                <Typography variant="h4" fontWeight="bold">Find Charge Points</Typography>
                <Chip label={`Wallet Balance: ₹${wallet.toFixed(0)}`} color="default" variant="outlined" />
            </Box>

            <Grid container spacing={3} sx={{ flexGrow: 1 }} alignItems="stretch">
                {/* Left Side: Map - Full width on Mobile, fixed height */}
                <Grid item xs={12} md={7} sx={{ height: { xs: '50vh', md: '100%' }, minHeight: '400px' }}>
                    <GlassCard sx={{ height: '100%', width: '100%', p: 0, overflow: 'hidden' }} delay={0}>
                         <MapComponent 
                            hosts={hosts} 
                            userLocation={userLocation} 
                            onHostClick={handleOpen}
                         />
                    </GlassCard>
                </Grid>

                {/* Right Side: List & Stats - Scrollable column on Desktop, stacked on Mobile */}
                <Grid item xs={12} md={5} sx={{ height: { xs: 'auto', md: '100%' }, overflowY: { xs: 'visible', md: 'auto' } }}>
                    {/* Savings Banner */}
                    <GlassCard sx={{ mb: 3, background: 'linear-gradient(90deg, rgba(59,130,246,0.2) 0%, rgba(34,197,94,0.2) 100%)' }} delay={0.1}>
                        <Grid container alignItems="center">
                            <Grid item xs={8}>
                                <Typography variant="h6" gutterBottom>Save 30%</Typography>
                                <Typography variant="caption" color="text.secondary" display="block">
                                    Pay ₹{PRICING.VOLTNEST_TARIFF}/unit (vs ₹{PRICING.PUBLIC_GRID_TARIFF})
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sx={{ textAlign: 'right' }}>
                                <Typography variant="h4" color="success.main" fontWeight="bold">₹{savings.savings}</Typography>
                                <Typography variant="caption">/ 100kWh</Typography>
                            </Grid>
                        </Grid>
                    </GlassCard>

                    {/* Available Hosts - Responsive Grid for Cards */}
                    <Grid container spacing={2}>
                        {hosts.map((host, index) => (
                            <Grid item xs={12} sm={6} md={12} key={host.id}>
                                <HostCard host={host} onBook={handleOpen} delay={0.2 + (index * 0.1)} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            {/* Booking Modal */}
            <Dialog 
                open={open} 
                onClose={handleClose}
                maxWidth="sm"
                fullWidth={true}
                PaperProps={{
                    style: {
                        background: '#1A2235',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 20,
                        margin: 16
                    }
                }}
            >
                {bookingSuccess ? (
                    <Box sx={{ p: 5, textAlign: 'center' }}>
                         <CheckCircleIcon sx={{ fontSize: 60, color: '#22C55E', mb: 2 }} />
                         <Typography variant="h5">Booking Confirmed!</Typography>
                         <Typography color="text.secondary">Redirecting you to navigation...</Typography>
                    </Box>
                ) : (
                    <>
                        <DialogTitle sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            Confirm Booking
                        </DialogTitle>
                        <DialogContent sx={{ pt: 3 }}>
                            {selectedHost && (
                                <Box>
                                    <Typography variant="h6" gutterBottom>{selectedHost.name}</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography color="text.secondary">Rate</Typography>
                                        <Typography>₹{PRICING.VOLTNEST_TARIFF} / kWh</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                        <Typography color="text.secondary">Est. Savings</Typography>
                                        <Typography color="success.main">30%</Typography>
                                    </Box>
                                    <Typography variant="caption" color="text.secondary">
                                        Smart contract will automatically deduct funds from your wallet upon completion.
                                    </Typography>
                                </Box>
                            )}
                        </DialogContent>
                        <DialogActions sx={{ p: 3 }}>
                            <Button onClick={handleClose} color="inherit">Cancel</Button>
                            <Button 
                                variant="contained" 
                                onClick={handleConfirmBooking}
                                sx={{ px: 4 }}
                            >
                                Confirm & Pay
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
};

export default EVDashboard;
