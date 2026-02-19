import React from 'react';
import { Box, Typography, Button, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import GlassCard from '../components/GlassCard';
import useEnergyStore from '../store/energyStore';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const WalletPage = () => {
    const { wallet, user } = useEnergyStore();
    
    // Dummy Data
    const transactions = [
        { id: 1, type: 'credit', amount: 450, desc: 'P2P Energy Sale (Host #442)', date: 'Today, 2:30 PM' },
        { id: 2, type: 'debit', amount: 120, desc: 'EV Charging Session', date: 'Yesterday, 6:15 PM' },
        { id: 3, type: 'credit', amount: 1200, desc: 'Grid Feed-in Rebate', date: 'Oct 24, 2024' },
    ];

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>My Wallet</Typography>
            
            <Grid container spacing={4}>
                {/* Balance Card */}
                <Grid item xs={12} md={6}>
                    <GlassCard sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar sx={{ bgcolor: 'rgba(34, 197, 94, 0.2)', color: '#22C55E', mr: 2 }}>
                                <AccountBalanceWalletIcon />
                            </Avatar>
                            <Typography variant="h6" color="text.secondary">Current Balance</Typography>
                        </Box>
                        <Typography variant="h2" fontWeight="bold" sx={{ mb: 1 }}>
                            ₹{wallet.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" color="success.main" sx={{ mb: 4 }}>
                            +2.4% vs last week
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button variant="contained" color="primary" fullWidth sx={{ borderRadius: 3 }}>
                                Add Funds
                            </Button>
                            <Button variant="outlined" color="inherit" fullWidth sx={{ borderRadius: 3 }}>
                                Withdraw
                            </Button>
                        </Box>
                    </GlassCard>
                </Grid>

                {/* Transaction History */}
                <Grid item xs={12} md={6}>
                    <GlassCard>
                         <Typography variant="h6" gutterBottom>Recent Transactions</Typography>
                         <List>
                            {transactions.map((tx, index) => (
                                <Box key={tx.id}>
                                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ 
                                                bgcolor: tx.type === 'credit' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                                color: tx.type === 'credit' ? '#22C55E' : '#EF4444'
                                            }}>
                                                {tx.type === 'credit' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={tx.desc}
                                            secondary={tx.date}
                                            primaryTypographyProps={{ fontWeight: 500 }}
                                            secondaryTypographyProps={{ color: 'text.secondary' }}
                                        />
                                        <Typography 
                                            variant="body1" 
                                            fontWeight="bold"
                                            color={tx.type === 'credit' ? 'success.main' : 'error.main'}
                                        >
                                            {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                                        </Typography>
                                    </ListItem>
                                    {index < transactions.length - 1 && <Divider component="li" sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />}
                                </Box>
                            ))}
                         </List>
                         <Button fullWidth sx={{ mt: 2 }}>View All Transactions</Button>
                    </GlassCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default WalletPage;
