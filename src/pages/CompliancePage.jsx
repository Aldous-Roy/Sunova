import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Paper } from '@mui/material';
import GlassCard from '../components/GlassCard';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import RefreshIcon from '@mui/icons-material/Refresh';

const CompliancePage = () => {
    const mockAuditLog = [
        { id: 1, time: '10:15 AM', event: 'Peer-to-Peer Transaction Settled', status: 'success', details: 'Transferred 3.2kWh to EV-8821' },
        { id: 2, time: '10:12 AM', event: 'Grid Export Limit Check', status: 'success', details: 'Export within regulatory cap (5kW)' },
        { id: 3, time: '09:45 AM', event: 'Voltage Stability Warning', status: 'warning', details: 'Micro-fluctuation detected in Sector 4' },
        { id: 4, time: '09:30 AM', event: 'New Host KYC Approved', status: 'success', details: 'Host ID: #HST-9921' },
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">Compliance Audit Log</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Chip 
                        icon={<VerifiedUserIcon />} 
                        label="System Status: COMPLIANT" 
                        color="success" 
                        variant="outlined" 
                        sx={{ p: 1, borderRadius: 2 }}
                    />
                    <Typography variant="body2" color="text.secondary">Last Audit: Just now</Typography>
                </Box>
            </Box>

            <GlassCard delay={0.1}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Real-time Audit Trail</Typography>
                    <RefreshIcon sx={{ opacity: 0.5, cursor: 'pointer' }} />
                </Box>
                <TableContainer component={Box} sx={{ maxHeight: 'calc(100vh - 250px)' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'text.secondary', background: '#1A2235' }}>Time</TableCell>
                                <TableCell sx={{ color: 'text.secondary', background: '#1A2235' }}>Event Type</TableCell>
                                <TableCell sx={{ color: 'text.secondary', background: '#1A2235' }}>Status</TableCell>
                                <TableCell sx={{ color: 'text.secondary', background: '#1A2235' }}>Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockAuditLog.map((log) => (
                                <TableRow key={log.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{log.time}</TableCell>
                                    <TableCell>{log.event}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={log.status.toUpperCase()} 
                                            size="small" 
                                            color={log.status === 'success' ? 'success' : 'warning'} 
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell sx={{ opacity: 0.7, minWidth: 200 }}>{log.details}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </GlassCard>
        </Box>
    );
};

export default CompliancePage;
