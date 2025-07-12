import type { VehicleListItem } from '@/api/types';
import { Pagination } from '@carapis/nextjs/components';
import { useMedia } from '@carapis/nextjs/hooks';
import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import CatalogFiltersWrapper from './components/CatalogFiltersWrapper';
import NoResultsFound from './components/NoResultsFound';
import VehicleCard from './components/VehicleCard';
import { CatalogProvider, FiltersProvider, useCatalog } from './context';

interface CatalogListProps {
  initialVehicles: VehicleListItem[];
  initialTotalCount: number;
  initialPage: number;
}

const CatalogListContent: React.FC = () => {
  const { vehicles, totalCount } = useCatalog();
  const { is } = useMedia();

  const isMobile = is.mobile;

  if (!vehicles.length) {
    return (
      <CatalogFiltersWrapper>
        <Box>
          <Typography variant="h1" gutterBottom>
            Vehicle Catalog
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Found {totalCount} vehicles
          </Typography>
          <NoResultsFound totalCount={totalCount} />
        </Box>
      </CatalogFiltersWrapper>
    );
  }

  const pages = Math.ceil(totalCount / 20);

  return (
    <CatalogFiltersWrapper>
      <Box
        sx={{
          ...(isMobile && {
            px: 2,
            py: 4,
          }),
        }}
      >
        <Typography variant="h1" gutterBottom>
          Vehicle Catalog
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Found {totalCount} vehicles
        </Typography>

        <Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 2,
            }}
          >
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.listing_id} vehicle={vehicle} />
            ))}
          </Box>

          <Pagination count={pages} />
        </Box>
      </Box>
    </CatalogFiltersWrapper>
  );
};

const CatalogList: React.FC<CatalogListProps> = ({ initialVehicles, initialTotalCount, initialPage }) => {
  return (
    <FiltersProvider>
      <CatalogProvider initialVehicles={initialVehicles} initialTotalCount={initialTotalCount} initialPage={initialPage}>
        <CatalogListContent />
      </CatalogProvider>
    </FiltersProvider>
  );
};

export default CatalogList;
