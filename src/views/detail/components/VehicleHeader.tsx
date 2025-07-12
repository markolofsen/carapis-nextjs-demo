import { Typography } from '@mui/material';
import React from 'react';
import { useDetail } from '../context';

const VehicleHeader: React.FC = () => {
  const { vehicle } = useDetail();

  if (!vehicle) return null;

  const title = `${vehicle.year || ''} ${vehicle.brand?.name || ''} ${vehicle.vehicle_model?.name || ''}`.trim();

  return (
    <Typography variant="h3" gutterBottom>
      {title || 'Vehicle Details'}
    </Typography>
  );
};

export default VehicleHeader;
