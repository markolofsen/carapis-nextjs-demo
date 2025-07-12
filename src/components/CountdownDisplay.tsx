import { useCountdown } from '@carapis/nextjs/hooks';
import { AccessTime } from '@mui/icons-material';
import { Box, Chip, Typography } from '@mui/material';
import React from 'react';

interface CountdownDisplayProps {
  targetDate: string | null;
  showExpired?: boolean;
  variant?: 'compact' | 'detailed';
}

const CountdownDisplay: React.FC<CountdownDisplayProps> = ({ targetDate, showExpired = true, variant = 'compact' }) => {
  const countdown = useCountdown(targetDate);

  if (!targetDate) {
    return null;
  }

  if (countdown.isExpired) {
    if (!showExpired) return null;
    return <Chip label="Expired" color="error" size="small" variant="filled" />;
  }

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  if (variant === 'compact') {
    // Show only the most significant time unit
    let timeText = '';
    let color: 'warning' | 'error' | 'default' = 'default';

    if (countdown.days > 0) {
      timeText = `${countdown.days}d ${countdown.hours}h`;
    } else if (countdown.hours > 0) {
      timeText = `${countdown.hours}h ${countdown.minutes}m`;
    } else if (countdown.minutes > 0) {
      timeText = `${countdown.minutes}m ${countdown.seconds}s`;
    } else {
      timeText = `${countdown.seconds}s`;
    }

    // Color based on urgency
    if (countdown.totalSeconds < 300) {
      color = 'error';
    } else {
      color = 'warning';
    }

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          color: color === 'error' ? 'error.main' : 'warning.main',
          fontWeight: 600,
          fontSize: '0.875rem',
        }}
      >
        <AccessTime sx={{ fontSize: '1rem' }} />
        {timeText}
      </Box>
    );
  }

  // Detailed variant
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
        Expires in
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
        {countdown.days > 0 && <Chip label={`${countdown.days}d`} size="small" variant="outlined" color="success" />}
        {countdown.hours > 0 && <Chip label={`${countdown.hours}h`} size="small" variant="outlined" color="primary" />}
        <Chip label={`${formatTime(countdown.minutes)}:${formatTime(countdown.seconds)}`} size="small" variant="outlined" color={countdown.totalSeconds < 300 ? 'error' : 'warning'} />
      </Box>
    </Box>
  );
};

export default CountdownDisplay;
