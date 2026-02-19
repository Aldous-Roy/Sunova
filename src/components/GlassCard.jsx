import React from 'react';
import { Card } from '@mui/material';
import { motion } from 'framer-motion';

const GlassCard = ({ children, sx = {}, delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      style={{ height: sx.height || 'auto', width: sx.width || 'auto' }}
    >
      <Card
        sx={{
          background: 'rgba(26, 34, 53, 0.6)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          borderRadius: '20px',
          padding: '24px',
          ...sx,
        }}
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  );
};

export default GlassCard;
