import { useMedia } from '@carapis/nextjs/hooks';
import { Close, FilterList } from '@mui/icons-material';
import { Box, Drawer, Fab, IconButton, Toolbar, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import CatalogFilters from './CatalogFilters';

interface CatalogFiltersWrapperProps {
  children: React.ReactNode;
}

const CatalogFiltersWrapper: React.FC<CatalogFiltersWrapperProps> = ({ children }) => {
  const theme = useTheme();
  const { is } = useMedia();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  // Mobile layout with drawer
  if (is.mobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Main content */}
        <Box sx={{ flex: 1 }}>{children}</Box>

        {/* Floating Action Button for mobile */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            p: 2,
            zIndex: theme.zIndex.appBar + 1,
          }}
        >
          <Fab color="primary" aria-label="filters" onClick={handleDrawerToggle}>
            <FilterList />
          </Fab>
        </Box>

        {/* Drawer for filters */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerClose}
          PaperProps={{
            sx: {
              width: '100%',
              maxWidth: 320,
              p: 2,
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box component="h2" sx={{ m: 0, fontSize: '1.25rem', fontWeight: 600 }}>
              Filters
            </Box>
            <IconButton onClick={handleDrawerClose}>
              <Close />
            </IconButton>
          </Box>
          <CatalogFilters onApply={handleDrawerClose} />
        </Drawer>
      </Box>
    );
  }

  // Desktop layout with persistent sidebar
  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      {/* Main content */}
      <Box sx={{ flex: 1, minWidth: 0, py: 2, pr: '320px' }}>
        <Container maxWidth="lg">{children}</Container>
      </Box>

      {/* Fixed filters sidebar */}
      <Box
        sx={{
          width: 320,
          flexShrink: 0,
          borderLeft: `1px solid ${theme.palette.divider}`,
          p: 2,
          backgroundColor: 'background.paper',
          height: '100vh',
          position: 'fixed',
          right: 0,
          top: 0,
          overflowY: 'auto',
          zIndex: theme.zIndex.appBar - 1,
          pt: 3,
        }}
      >
        <Toolbar />
        <CatalogFilters />
      </Box>
    </Box>
  );
};

export default CatalogFiltersWrapper;
