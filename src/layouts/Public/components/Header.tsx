import Routes from '@/core/routes';
import { settings } from '@/core/settings';
import { ButtonLink, Link } from '@carapis/nextjs/components';
import { useMedia } from '@carapis/nextjs/hooks';
import { Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Box, Collapse, Container, IconButton, Stack, Toolbar, useTheme } from '@mui/material';
import React, { useState } from 'react';

const Header: React.FC = () => {
  const theme = useTheme();
  const { is } = useMedia();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { label: 'Catalog', href: Routes.catalog.index.path },
    { label: 'About', href: Routes.about.path },
  ];

  return (
    <>
      {/* Main Header */}
      <Toolbar />
      <AppBar
        position="fixed"
        sx={{
          borderRadius: 0,
          border: 0,
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
          zIndex: theme.zIndex.appBar,
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 0, px: { xs: 2, md: 2 } }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link
              href={Routes.home.path}
              variant="h4"
              component="div"
              underline="none"
              sx={{
                fontWeight: 'bold',
                color: theme.palette.text.primary,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box component="img" src={settings.app.icon} alt={settings.app.name} sx={{ borderRadius: '100%', width: 40, height: 40 }} />
              {settings.app.name}
            </Link>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                sx={{
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                  fontSize: '0.9rem',
                  fontWeight: 500,
                }}
              >
                {item.label}
              </Link>
            ))}
          </Box>

          {/* CTA Buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <ButtonLink variant="contained" size="small" href={Routes.dashboard.index.path}>
              Get Started
            </ButtonLink>
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)} sx={{ color: 'text.secondary' }}>
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu */}
      {/* {mobileMenuOpen && ( */}
      <Collapse in={mobileMenuOpen}>
        <Box
          sx={{
            position: 'relative',
            zIndex: theme.zIndex.appBar,
            display: { xs: 'block', md: 'none' },
            bgcolor: 'background.paper',
            borderBottom: 1,
            borderColor: 'divider',
            py: 3,
          }}
        >
          <Container>
            <Stack spacing={2}>
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  variant="h6"
                  sx={{
                    textDecoration: 'none',
                    color: 'text.primary',
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
                <ButtonLink fullWidth variant="contained" size="large" href={Routes.dashboard.index.path}>
                  Get Started
                </ButtonLink>
              </Box>
            </Stack>
          </Container>
        </Box>
      </Collapse>
    </>
  );
};

export default Header;
