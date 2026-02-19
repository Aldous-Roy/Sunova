import React from 'react';
import { Grid, Typography, Box, Chip } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import GlassCard from '../components/GlassCard';
import useEnergyStore from '../store/energyStore';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const AdminDashboard = () => {
    const { historicalData } = useEnergyStore();

    // Calculate aggregates from history (last 20 ticks)
    const totalSolar = historicalData.reduce((acc, curr) => acc + curr.solar, 0);
    const totalGridExport = historicalData.reduce((acc, curr) => acc + curr.gridExport, 0);

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 4, gap: 2 }}>
                <Typography variant="h4" fontWeight="bold">Compliance Hub</Typography>
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
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <GlassCard delay={0.1}>
                        <Typography color="text.secondary">Total Pilot Generation</Typography>
                        <Typography variant="h3" fontWeight="bold">{(totalSolar * 10).toFixed(1)} kWh</Typography>
                        <Typography variant="caption" color="success.main"> +12% vs Projection</Typography>
                    </GlassCard>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <GlassCard delay={0.2}>
                         <Typography color="text.secondary">Grid Export Volume</Typography>
                         <Typography variant="h3" fontWeight="bold">{(totalGridExport * 10).toFixed(1)} kWh</Typography>
                         <Typography variant="caption" color="text.secondary"> 20% capped by local transformer</Typography>
                    </GlassCard>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <GlassCard delay={0.3}>
                         <Typography color="text.secondary">Active P2P Nodes</Typography>
                         <Typography variant="h3" fontWeight="bold">24 / 30</Typography>
                         <Typography variant="caption" color="primary"> 80% Pilot Participation</Typography>
                    </GlassCard>
                </Grid>
            </Grid>

            {/* Network Graphs */}
            <Grid container spacing={3}>
                {/* Main Flow Chart */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <GlassCard delay={0.4} sx={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Network Energy Flow</Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={historicalData}>
                                <defs>
                                    <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#FBBF24" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorGrid" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} />
                                <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1A2235', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="solar" name="Solar Gen (kW)" stroke="#FBBF24" fillOpacity={1} fill="url(#colorSolar)" />
                                <Area type="monotone" dataKey="gridExport" name="Grid Export (kW)" stroke="#3B82F6" fillOpacity={1} fill="url(#colorGrid)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </GlassCard>
                </Grid>

                {/* Battery/Load Chart */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <GlassCard delay={0.5} sx={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Storage & Demand</Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={historicalData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 10 }} interval={4} />
                                <Tooltip 
                                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                    contentStyle={{ backgroundColor: '#1A2235', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}
                                />
                                <Bar dataKey="batteryLevel" name="Avg Battery %" fill="#10B981" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="consumption" name="Load (kW)" fill="#EF4444" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </GlassCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
