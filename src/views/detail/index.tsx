import { Box } from '@mui/material';
import React from 'react';
import { VehicleHeader, VehicleInfo, VehiclePhoto } from './components';
import { DetailProvider } from './context';
import type { VehicleWebDetail } from './types';

interface VehicleDetailProps {
  vehicle: VehicleWebDetail | null;
}

const VehicleDetailContent: React.FC = () => {
  return (
    <Box>
      <VehicleHeader />

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mt: 3 }}>
        <Box sx={{ flex: 1 }}>
          <VehiclePhoto />
        </Box>

        <Box sx={{ flex: 1 }}>
          <VehicleInfo />
        </Box>
      </Box>
    </Box>
  );
};

const VehicleDetail: React.FC<VehicleDetailProps> = ({ vehicle }) => {
  return (
    <DetailProvider vehicle={vehicle}>
      <VehicleDetailContent />
    </DetailProvider>
  );
};

export default VehicleDetail;
