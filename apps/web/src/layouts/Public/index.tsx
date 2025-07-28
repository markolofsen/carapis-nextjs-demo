import { Box, Container } from '@mui/material';
import React from 'react';
import { Header } from './components';

interface PublicLayoutProps {
  children: React.ReactNode;
  noContainer?: boolean;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children, noContainer }) => {
  const renderContent = () => {
    if (noContainer) {
      return children;
    }

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Box
        sx={{
          opacity: 0.2,
          background: (theme) => `linear-gradient(to bottom, ${theme.palette.primary.main} 0%, transparent 100%)`,
          position: 'absolute',
          height: 150,
          top: 0,
          left: 0,
          width: '100%',
        }}
      />
      <Header />
      {renderContent()}
    </Box>
  );
};

export default PublicLayout;
