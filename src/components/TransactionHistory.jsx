import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip, Divider, Button } from '@mui/material';
import GlassCard from './GlassCard';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const TransactionHistory = ({ transactions }) => {
    const downloadStatement = () => {
        const doc = new jsPDF();
        doc.text("Transaction Statement", 14, 20);
        
        const tableColumn = ["Date", "Description", "Type", "Amount", "Status"];
        const tableRows = transactions.map(tx => [
            tx.date, 
            tx.desc, 
            tx.type.toUpperCase(), 
            `Rs ${tx.amount.toFixed(2)}`, 
            tx.status
        ]);

        autoTable(doc, {
            startY: 30,
            head: [tableColumn],
            body: tableRows,
        });

        doc.save("statement.pdf");
    };

    return (
        <GlassCard sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">Recent Transactions</Typography>
                <Button 
                    size="small" 
                    startIcon={<DownloadIcon />} 
                    onClick={downloadStatement}
                    sx={{ color: 'text.secondary', borderColor: 'rgba(255,255,255,0.1)' }}
                    variant="outlined"
                >
                    Statement
                </Button>
            </Box>
            
            <List sx={{ width: '100%', bgcolor: 'transparent' }}>
                {transactions.map((tx, index) => (
                    <Box key={tx.id}>
                        <ListItem alignItems="center" sx={{ px: 0, py: 2 }}>
                            <ListItemAvatar>
                                <Avatar sx={{ 
                                    bgcolor: tx.type === 'credit' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: tx.type === 'credit' ? '#22C55E' : '#EF4444',
                                    border: `1px solid ${tx.type === 'credit' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                                }}>
                                    {tx.icon || (tx.type === 'credit' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1" fontWeight="600" color="text.primary">
                                        {tx.desc}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                        {tx.date} • {tx.status}
                                    </Typography>
                                }
                            />
                            <Box sx={{ textAlign: 'right' }}>
                                <Typography 
                                    variant="subtitle1" 
                                    fontWeight="bold"
                                    color={tx.type === 'credit' ? '#22C55E' : '#EF4444'}
                                >
                                    {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {tx.type === 'credit' ? 'Received' : 'Debited'}
                                </Typography>
                            </Box>
                        </ListItem>
                        {index < transactions.length - 1 && <Divider component="li" sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />}
                    </Box>
                ))}
            </List>
        </GlassCard>
    );
};

export default TransactionHistory;
