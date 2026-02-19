import React from 'react';
import { Grid, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Chip, TableContainer, Paper } from '@mui/material';
import GlassCard from '../components/GlassCard';
import useEnergyStore from '../store/energyStore';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WarningIcon from '@mui/icons-material/Warning';
import RefreshIcon from '@mui/icons-material/Refresh';

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
        </Box>
    );
};

export default AdminDashboard;
