import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Chip, TableContainer } from '@mui/material';
import GlassCard from '../components/GlassCard';
import useEnergyStore from '../store/energyStore';

const HistoryPage = () => {
    const { bookings, user } = useEnergyStore();

    // Use simulated bookings if store is empty for demo
    const displayBookings = bookings.length > 0 ? bookings : [
        { id: 101, hostName: 'EcoHaven Residence', date: '2024-10-24 14:00', amount: 120, status: 'completed' },
        { id: 102, hostName: 'TechPark Solar', date: '2024-10-23 09:30', amount: 250, status: 'completed' },
    ];

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
                {user?.role === 'host' ? 'Charging Sessions' : 'Booking History'}
            </Typography>
            
            <GlassCard>
                 <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Date & Time</TableCell>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                                     {user?.role === 'host' ? 'EV Driver' : 'Station Name'}
                                </TableCell>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Amount</TableCell>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayBookings.map((booking) => (
                                <TableRow key={booking.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{booking.date || new Date().toLocaleString()}</TableCell>
                                    <TableCell>{booking.hostName || booking.name || booking.stationName || 'Unknown Station'}</TableCell>
                                    <TableCell>₹{(booking.price || booking.amount || 0).toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={(booking.status || 'completed').toUpperCase()} 
                                            size="small" 
                                            color={booking.status === 'active' ? 'primary' : 'success'} 
                                            variant="outlined" 
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                            {displayBookings.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" sx={{ py: 3, opacity: 0.6 }}>
                                        No history found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </GlassCard>
        </Box>
    );
};

export default HistoryPage;
