import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { useDetail } from '../context';

const VehicleInfo: React.FC = () => {
  const { vehicle } = useDetail();

  if (!vehicle) return null;

  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return 'Not available';
    return String(value);
  };

  const data = {
    price: vehicle.price_usd ? `$${vehicle.price_usd}` : vehicle.price ? `${vehicle.price}M KRW` : 'Price not available',
    mileage: vehicle.mileage ? `${vehicle.mileage.toLocaleString()}km` : 'Not available',
    fuel: formatValue(vehicle.fuel_type),
    transmission: formatValue(vehicle.transmission),
    grade: vehicle.investment_grade ? String(vehicle.investment_grade) : null,
    risk: vehicle.risk_level ? String(vehicle.risk_level) : null,
    isVerified: vehicle.is_verified,
  };

  const chips = [];

  if (data.grade) {
    const gradeColor = data.grade.startsWith('A') ? 'success' : data.grade.startsWith('B') ? 'warning' : 'error';
    chips.push({
      key: 'grade',
      label: `Grade: ${data.grade}`,
      color: gradeColor as 'success' | 'warning' | 'error',
      variant: 'filled' as const,
    });
  }

  if (data.risk) {
    chips.push({
      key: 'risk',
      label: `Risk: ${data.risk}`,
      variant: 'outlined' as const,
    });
  }

  if (data.isVerified) {
    chips.push({
      key: 'verified',
      label: 'Verified',
      color: 'success' as const,
      variant: 'filled' as const,
    });
  }

  const vehicleDetails: ReactNode[] = [
    <Typography key="mileage" variant="body1" color="text.secondary" gutterBottom>
      Mileage: {data.mileage}
    </Typography>,
    <Typography key="fuel" variant="body1" color="text.secondary" gutterBottom>
      Fuel: {data.fuel}
    </Typography>,
    <Typography key="transmission" variant="body1" color="text.secondary" gutterBottom>
      Transmission: {data.transmission}
    </Typography>,
  ];

  if (vehicle.year) {
    vehicleDetails.push(
      <Typography key="year" variant="body1" color="text.secondary" gutterBottom>
        Year: {vehicle.year}
      </Typography>,
    );
  }

  if (vehicle.displacement) {
    vehicleDetails.push(
      <Typography key="displacement" variant="body1" color="text.secondary" gutterBottom>
        Engine: {vehicle.displacement}cc
      </Typography>,
    );
  }

  if (vehicle.color) {
    vehicleDetails.push(
      <Typography key="color" variant="body1" color="text.secondary" gutterBottom>
        Color: {formatValue(vehicle.color)}
      </Typography>,
    );
  }

  if (vehicle.seat_count) {
    vehicleDetails.push(
      <Typography key="seats" variant="body1" color="text.secondary" gutterBottom>
        Seats: {vehicle.seat_count}
      </Typography>,
    );
  }

  if (vehicle.body_type) {
    vehicleDetails.push(
      <Typography key="body_type" variant="body1" color="text.secondary" gutterBottom>
        Body Type: {formatValue(vehicle.body_type)}
      </Typography>,
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" color="primary" gutterBottom>
          {data.price}
        </Typography>

        <Box sx={{ mb: 3 }}>{vehicleDetails}</Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {chips.map((chip) => (
            <Chip key={chip.key} label={chip.label} size="medium" color={chip.color} variant={chip.variant} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default VehicleInfo;
