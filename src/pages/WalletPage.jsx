import React from 'react';
import { Box, Typography, Button, Grid, Avatar, Chip, IconButton } from '@mui/material';
import GlassCard from '../components/GlassCard';
import TransactionHistory from '../components/TransactionHistory';
import useEnergyStore from '../store/energyStore';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const EarningsChart = () => {
    const data = [
        { day: 'Mon', amount: 120 },
        { day: 'Tue', amount: 150 },
        { day: 'Wed', amount: 180 },
        { day: 'Thu', amount: 140 },
        { day: 'Fri', amount: 210 },
        { day: 'Sat', amount: 250 },
        { day: 'Sun', amount: 310 },
    ];

    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.8rem' }} />
                <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.8rem' }} />
                <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ background: 'rgba(26, 34, 53, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                />
                <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
        </ResponsiveContainer>
    );
};

const WalletPage = () => {
    const { wallet } = useEnergyStore();
    
    // Dummy Data
    const transactions = [
        { id: 1, type: 'credit', amount: 450.50, desc: 'Energy Sale: Host #442', date: 'Today, 2:30 PM', status: 'Completed' },
        { id: 2, type: 'debit', amount: 120.00, desc: 'EV Charging Session', date: 'Yesterday, 6:15 PM', status: 'Completed' },
        { id: 3, type: 'credit', amount: 1200.00, desc: 'Grid Feed-in Rebate', date: 'Oct 24, 2024', status: 'Pending' },
        { id: 4, type: 'credit', amount: 85.20, desc: 'Peer-to-Peer Transfer', date: 'Oct 22, 2024', status: 'Completed' },
    ];

    return (
        <Box sx={{ width: '100%', pb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold">My Earnings</Typography>
                    <Typography variant="body2" color="text.secondary">Manage your wallet and track revenue</Typography>
                </Box>
                <Button variant="outlined" startIcon={<TrendingUpIcon />}>Download Report</Button>
            </Box>
            
            <Grid container spacing={3}>
                {/* Left Column: Balance & Chart */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Grid container spacing={3}>
                        {/* Balance Card */}
                        <Grid size={{ xs: 12 }}>
                            <GlassCard sx={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar sx={{ bgcolor: 'rgba(59, 130, 246, 0.2)', color: '#3B82F6', mr: 2, height: 48, width: 48 }}>
                                            <AccountBalanceWalletIcon />
                                        </Avatar>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">Total Balance</Typography>
                                            <Typography variant="h3" fontWeight="bold" sx={{ color: 'white' }}>
                                                ₹{wallet.toFixed(2)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Chip label="+12.5% this month" color="success" size="small" variant="outlined" />
                                </Box>
                                
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 3, px: 4, flexGrow: 1 }}>
                                        Withdraw Funds
                                    </Button>
                                    <Button variant="outlined" color="primary" size="large" sx={{ borderRadius: 3, px: 4, flexGrow: 1 }}>
                                        Add Money
                                    </Button>
                                </Box>
                            </GlassCard>
                        </Grid>

                        {/* Earnings Chart */}
                        <Grid size={{ xs: 12 }}>
                            <GlassCard>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="h6" fontWeight="bold">Revenue Trends</Typography>
                                    <Box>
                                        <Chip label="Weekly" color="primary" size="small" />
                                    </Box>
                                </Box>
                                <EarningsChart />
                            </GlassCard>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Right Column: Transactions & Quick Stats */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Grid container spacing={3} direction="column">
                        {/* Quick Stats */}
                        <Grid size={{ xs: 12 }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <GlassCard sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary">Pending</Typography>
                                    <Typography variant="h5" fontWeight="bold">₹1,250</Typography>
                                </GlassCard>
                                <GlassCard sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary">Lifetime</Typography>
                                    <Typography variant="h5" fontWeight="bold">₹45.2k</Typography>
                                </GlassCard>
                            </Box>
                        </Grid>

                        {/* Transactions List */}
                        <Grid size={{ xs: 12, flexGrow: 1 }}>
                            <TransactionHistory transactions={transactions} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default WalletPage;
