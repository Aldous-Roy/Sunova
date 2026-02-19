import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button } from '@mui/material';
import GlassCard from '../components/GlassCard';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import RefreshIcon from '@mui/icons-material/Refresh';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';

const CompliancePage = () => {
    const mockAuditLog = [
        { id: 1, time: '10:15 AM', event: 'Peer-to-Peer Transaction Settled', status: 'success', details: 'Transferred 3.2kWh to EV-8821' },
        { id: 2, time: '10:12 AM', event: 'Grid Export Limit Check', status: 'success', details: 'Export within regulatory cap (5kW)' },
        { id: 3, time: '09:45 AM', event: 'Voltage Stability Warning', status: 'warning', details: 'Micro-fluctuation detected in Sector 4' },
        { id: 4, time: '09:30 AM', event: 'New Host KYC Approved', status: 'success', details: 'Host ID: #HST-9921' },
    ];

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Compliance Audit Log", 14, 20);
        
        const tableColumn = ["Time", "Event", "Status", "Details"];
        const tableRows = mockAuditLog.map(log => [log.time, log.event, log.status.toUpperCase(), log.details]);

        autoTable(doc, {
            startY: 30,
            head: [tableColumn],
            body: tableRows,
        });

        doc.save("compliance_log.pdf");
    };

    const downloadCSV = () => {
        const headers = ["Time,Event,Status,Details"];
        const rows = mockAuditLog.map(log => `${log.time},"${log.event}",${log.status},"${log.details}"`);
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "compliance_log.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 4, gap: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                        variant="outlined" 
                        startIcon={<TableChartIcon />} 
                        onClick={downloadCSV}
                        sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'text.primary' }}
                    >
                        Export CSV
                    </Button>
                    <Button 
                        variant="contained" 
                        startIcon={<PictureAsPdfIcon />} 
                        onClick={downloadPDF}
                        sx={{ background: 'linear-gradient(45deg, #EF4444, #F87171)' }}
                    >
                        Download Report
                    </Button>
                </Box>
            </Box>

            <GlassCard delay={0.1}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Real-time Audit Trail</Typography>
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
