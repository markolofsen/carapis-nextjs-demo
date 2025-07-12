import { Card, CardMedia } from '@mui/material';
import React from 'react';
import { useDetail } from '../context';

const VehiclePhoto: React.FC = () => {
  const { vehicle } = useDetail();

  if (!vehicle || !vehicle.main_photo?.url) return null;

  const title = `${vehicle.year} ${vehicle.brand?.name || ''} ${vehicle.vehicle_model?.name || ''}`;

  return (
    <Card>
      <CardMedia component="img" height="400" image={vehicle.main_photo.url} alt={title} sx={{ objectFit: 'cover' }} />
    </Card>
  );
};

export default VehiclePhoto;
