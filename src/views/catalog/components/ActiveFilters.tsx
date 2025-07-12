import { Box, Chip, Typography } from '@mui/material';
import React from 'react';
import { useFilters } from '../context';

const ActiveFilters: React.FC = () => {
  const { activeFilters, removeFilter } = useFilters();

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Active Filters:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {activeFilters.map(({ key, label }) => (
          <Chip key={key} label={label} size="small" variant="outlined" onDelete={() => removeFilter(key)} />
        ))}
      </Box>
    </Box>
  );
};

export default ActiveFilters;
