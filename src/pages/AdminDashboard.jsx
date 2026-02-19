import React from 'react';
import { Grid, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Chip } from '@mui/material';
import GlassCard from '../components/GlassCard';
import useEnergyStore from '../store/energyStore';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WarningIcon from '@mui/icons-material/Warning';
import RefreshIcon from '@mui/icons-material/Refresh';

const AdminDashboard = () => {
    const { historicalData, bookings } = useEnergyStore();

    // Calculate aggregates from history (last 20 ticks)
    const totalSolar = historicalData.reduce((acc, curr) => acc + curr.solar, 0);
    const totalGridExport = historicalData.reduce((acc, curr) => acc + curr.gridExport, 0);
    const complianceScore = 98.5; // Simulated high compliance

    const mockAuditLog = [
        { id: 1, time: '10:15 AM', event: 'Peer-to-Peer Transaction Settled', status: 'success', details: 'Transferred 3.2kWh to EV-8821' },
        { id: 2, time: '10:12 AM', event: 'Grid Export Limit Check', status: 'success', details: 'Export within regulatory cap (5kW)' },
        { id: 3, time: '09:45 AM', event: 'Voltage Stability Warning', status: 'warning', details: 'Micro-fluctuation detected in Sector 4' },
        { id: 4, time: '09:30 AM', event: 'New Host KYC Approved', status: 'success', details: 'Host ID: #HST-9921' },
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">Regulatory Compliance Hub</Typography>
                <Chip 
                    icon={<VerifiedUserIcon />} 
                    label="System Status: COMPLIANT" 
                    color="success" 
                    variant="outlined" 
                    sx={{ p: 1, borderRadius: 2 }}
                />
            </Box>

            {/* Aggregates */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                    <GlassCard delay={0.1}>
                        <Typography color="text.secondary">Total Pilot Generation</Typography>
                        <Typography variant="h3" fontWeight="bold">{(totalSolar * 10).toFixed(1)} kWh</Typography>
                        <Typography variant="caption" color="success.main"> +12% vs Projection</Typography>
                    </GlassCard>
                </Grid>
                <Grid item xs={12} md={4}>
                    <GlassCard delay={0.2}>
                         <Typography color="text.secondary">Grid Export Volume</Typography>
                         <Typography variant="h3" fontWeight="bold">{(totalGridExport * 10).toFixed(1)} kWh</Typography>
                         <Typography variant="caption" color="text.secondary"> 20% capped by local transformer</Typography>
                    </GlassCard>
                </Grid>
                <Grid item xs={12} md={4}>
                    <GlassCard delay={0.3}>
                         <Typography color="text.secondary">Active P2P Nodes</Typography>
                         <Typography variant="h3" fontWeight="bold">24 / 30</Typography>
                         <Typography variant="caption" color="primary"> 80% Pilot Participation</Typography>
                    </GlassCard>
                </Grid>
            </Grid>

            {/* Compliance Audit Log */}
            <GlassCard delay={0.4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Real-time Audit Log</Typography>
                    <RefreshIcon sx={{ opacity: 0.5 }} />
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'text.secondary' }}>Time</TableCell>
                            <TableCell sx={{ color: 'text.secondary' }}>Event Type</TableCell>
                            <TableCell sx={{ color: 'text.secondary' }}>Status</TableCell>
                            <TableCell sx={{ color: 'text.secondary' }}>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockAuditLog.map((log) => (
                            <TableRow key={log.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{log.time}</TableCell>
                                <TableCell>{log.event}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={log.status.toUpperCase()} 
                                        size="small" 
                                        color={log.status === 'success' ? 'success' : 'warning'} 
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell sx={{ opacity: 0.7 }}>{log.details}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </GlassCard>
        </Box>
    );
};

export default AdminDashboard;
