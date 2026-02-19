import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip, Divider } from '@mui/material';
import GlassCard from './GlassCard';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import BoltIcon from '@mui/icons-material/Bolt';

const TransactionHistory = ({ transactions }) => {
    return (
        <GlassCard sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">Recent Transactions</Typography>
                <Chip label="This Month" size="small" variant="outlined" color="primary" />
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
