import { Clear as ClearIcon } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useFilters } from '../context';

interface NoResultsFoundProps {
  totalCount: number;
}

const NoResultsFound: React.FC<NoResultsFoundProps> = ({ totalCount }) => {
  const { clearFilters } = useFilters();

  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h4" gutterBottom color="text.secondary">
        No vehicles found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Try adjusting your search criteria or clearing all filters to see more results.
      </Typography>

      <Button variant="outlined" startIcon={<ClearIcon />} onClick={clearFilters} sx={{ minWidth: 200 }}>
        Clear All Filters
      </Button>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Total vehicles in catalog: {totalCount}
      </Typography>
    </Box>
  );
};

export default NoResultsFound;
