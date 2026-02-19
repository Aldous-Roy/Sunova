import React, { useState } from 'react';
import { 
    Grid, Typography, Box, Button, Dialog, DialogTitle, 
    DialogContent, DialogActions, Chip, LinearProgress 
} from '@mui/material';
import GlassCard from '../components/GlassCard';
import useEnergyStore from '../store/energyStore';
import { calculateSavings, PRICING } from '../utils/pricingEngine';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EvStationIcon from '@mui/icons-material/EvStation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const HostCard = ({ host, onBook, delay }) => (
    <GlassCard delay={delay} sx={{ p: 0, overflow: 'hidden', position: 'relative' }}>
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
            <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                Grid: ₹{PRICING.PUBLIC_GRID_TARIFF}/kWh
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
    const { addBooking, wallet } = useEnergyStore();
    const [selectedHost, setSelectedHost] = useState(null);
    const [open, setOpen] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    // Mock Hosts Data (In a real app, this would come from the store/backend)
    const hosts = [
        { id: 1, name: 'EcoHaven Residence', distance: 0.8, availableKw: 4.2 },
        { id: 2, name: 'GreenRoof Villa', distance: 1.2, availableKw: 2.5 },
        { id: 3, name: 'SunnySide Apts', distance: 0.5, availableKw: 0 }, // Unavailable
        { id: 4, name: 'Solaris Desktop', distance: 2.1, availableKw: 6.0 },
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
            user: 'You',
            status: 'active',
            price: 50 // Fixed dummy price for demo
        });
        setBookingSuccess(true);
        // Close after delay
        setTimeout(handleClose, 2000);
    };

    const savings = calculateSavings(100); // Calculate for 100kWh example

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">Find Charge Points</Typography>
                <Chip label={`Wallet Balance: ₹${wallet}`} color="default" variant="outlined" />
            </Box>

            {/* Savings Banner */}
            <GlassCard sx={{ mb: 4, background: 'linear-gradient(90deg, rgba(59,130,246,0.2) 0%, rgba(34,197,94,0.2) 100%)' }}>
                <Grid container alignItems="center">
                    <Grid item xs={12} md={8}>
                        <Typography variant="h5" gutterBottom>Save 30% on every charge.</Typography>
                        <Typography variant="body1" color="text.secondary">
                            Paying ₹{PRICING.VOLTNEST_TARIFF}/unit instead of ₹{PRICING.PUBLIC_GRID_TARIFF}/unit.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
                        <Typography variant="h3" color="success.main" fontWeight="bold">₹{savings.savings}</Typography>
                        <Typography variant="caption">Saved per 100kWh</Typography>
                    </Grid>
                </Grid>
            </GlassCard>

            {/* Host Grid */}
            <Grid container spacing={3}>
                {hosts.map((host, index) => (
                    <Grid item xs={12} md={3} key={host.id}>
                        <HostCard host={host} onBook={handleOpen} delay={index * 0.1} />
                    </Grid>
                ))}
            </Grid>

            {/* Booking Modal */}
            <Dialog 
                open={open} 
                onClose={handleClose}
                PaperProps={{
                    style: {
                        background: '#1A2235',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 20,
                        minWidth: '400px'
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
