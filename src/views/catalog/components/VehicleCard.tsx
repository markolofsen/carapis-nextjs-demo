import type { VehicleListItem } from '@/api/types';
import routes from '@/core/routes';
import { NumberFormatter } from '@carapis/nextjs/utils';
import { Box, Card, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import NextLink from 'next/link';
import React, { useState } from 'react';

interface VehicleCardProps {
  vehicle: VehicleListItem;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Format all data first
  const priceUsd = vehicle.price_usd || 0;
  const priceKrw = vehicle.price_krw || 0;
  const priceUsdFormatted = NumberFormatter.formatNumber(priceUsd, {
    roundTo: 1000,
    showCommas: true,
    symbol: '$',
    symbolPosition: 'prefix',
  });
  const priceKrwFormatted = NumberFormatter.formatNumber(priceKrw, {
    roundTo: 1000,
    showCommas: true,
    symbol: '₩',
    symbolPosition: 'prefix',
  });

  const mileage = vehicle.mileage || 0;
  const mileageFormatted = NumberFormatter.formatNumber(mileage, {
    roundTo: 1000,
    showCommas: true,
    symbol: ' km',
    symbolPosition: 'suffix',
  });

  const title = `${vehicle.year} ${vehicle.brand?.name || ''} ${vehicle.vehicle_model?.name || ''}`;

  const convertString = (str: string | undefined) => {
    if (!str) return 'Not available';
    return str.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
  };

  const fuel = convertString(vehicle.fuel_type as string);
  const transmission = convertString(vehicle.transmission as string);

  const data = {
    title: title,
    priceUsd: priceUsdFormatted,
    priceKrw: priceKrwFormatted,
    mileage: mileageFormatted,
    fuel: fuel,
    transmission: transmission,
    grade: vehicle.investment_grade,
    risk: vehicle.risk_level,
    isVerified: vehicle.is_verified,
    mainPhoto: vehicle.main_photo?.url,
    location: vehicle.location || 'Location not specified',
  };

  // Prepare chips data
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

  const renderMainPhoto = () => {
    const height = 220;
    if (!data.mainPhoto) {
      return (
        <Box
          sx={{
            height,
            width: '100%',
            backgroundColor: 'action.disabledBackground',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No Image
          </Typography>
        </Box>
      );
    }
    return (
      <CardMedia
        component="img"
        height={height}
        image={data.mainPhoto}
        alt={data.title}
        sx={{
          objectFit: 'cover',
          transition: 'transform 0.3s ease',
          // transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />
    );
  };

  const href = routes.catalog.vehicle.as({
    brand: vehicle.brand?.slug,
    model: vehicle.model_group?.slug,
    vehicle_id: vehicle.listing_id,
  });

  return (
    <Card
      component={NextLink}
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        textDecoration: 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 0,
        transition: 'all 0.3s ease',
        outline: '2px solid transparent',
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: (theme) => theme.shadows[2],
        '&:hover': {
          outlineColor: (theme) => theme.palette.primary.main,
          boxShadow: (theme) => theme.shadows[8],
          transform: 'translateY(-4px)',
        },
      }}
    >
      {renderMainPhoto()}
      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        {/* Title */}
        <Typography variant="h6" noWrap gutterBottom sx={{ fontWeight: 600, mb: 1.5 }}>
          {data.title}
        </Typography>

        {/* Price */}
        <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 700, mb: 0.5 }}>
          {data.priceUsd}
        </Typography>
        {priceKrw > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {data.priceKrw}
          </Typography>
        )}

        {/* Divider */}
        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', my: 1.5 }} />

        {/* Vehicle Details */}
        <Box sx={{ mb: 2.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ minWidth: 80 }}>
              Mileage:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {data.mileage}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ minWidth: 80 }}>
              Fuel:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {data.fuel}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ minWidth: 80 }}>
              Transmission:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {data.transmission}
            </Typography>
          </Box>
          {data.location !== 'Location not specified' && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 80 }}>
                Location:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.3,
                }}
              >
                {data.location}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Chips */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
          {chips.map((chip) => (
            <Chip
              key={chip.key}
              label={chip.label}
              size="small"
              color={chip.color}
              variant={chip.variant}
              sx={{
                fontSize: '0.75rem',
                height: 22,
                '& .MuiChip-label': { px: 1 },
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
