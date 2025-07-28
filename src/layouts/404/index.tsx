import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import { alpha, Box, Button, Container, keyframes, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Routes from '@/core/routes';

import LogoAnimation from '@/components/animations/LogoAnimation';
import { ButtonLink } from '@carapis/nextjs/components';
import { useMedia } from '@carapis/nextjs/hooks';

// Define animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

// Styled components
const FloatingContainer = styled(Box)(({ theme }) => ({
  animation: `${float} 6s ease-in-out infinite`,
}));

interface NotFoundLayoutProps {
  // No additional props needed as all functionality is self-contained
}

export const NotFoundLayout = ({}: NotFoundLayoutProps) => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const { is } = useMedia();

  // Auto redirect countdown
  useEffect(() => {
    if (countdown <= 0) {
      router.push(Routes.home.path);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  // Handle manual redirect
  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: is.mobile ? 2 : 4,
        py: is.mobile ? 2 : 4,
        px: is.mobile ? 2 : 0,
      }}
    >
      <FloatingContainer>
        <LogoAnimation size={is.mobile ? 150 : 200} followCursor float />
      </FloatingContainer>

      <Box sx={{ mt: 2 }}>
        <Typography
          variant={is.mobile ? 'h2' : 'h1'}
          fontWeight="bold"
          sx={{
            fontSize: is.mobile ? '3rem' : '8rem',
            mb: is.mobile ? 1 : 2,
          }}
        >
          404
        </Typography>
        <Typography variant={is.mobile ? 'h5' : 'h4'} sx={{ mb: is.mobile ? 1 : 2 }}>
          PAGE NOT FOUND
        </Typography>
        <Typography
          variant={is.mobile ? 'body1' : 'h6'}
          color="text.secondary"
          sx={{
            mb: is.mobile ? 2 : 4,
            fontSize: is.mobile ? '0.875rem' : 'inherit',
          }}
        >
          We've looked everywhere, but the page seems to have vanished into thin air!
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            fontSize: is.mobile ? '0.75rem' : 'inherit',
          }}
        >
          Auto-redirecting to home page in {countdown} seconds...
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: is.mobile ? 1 : 2,
          flexWrap: 'wrap',
          justifyContent: 'center',
          flexDirection: is.mobile ? 'column' : 'row',
          width: is.mobile ? '100%' : 'auto',
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{
            borderRadius: '8px',
            width: is.mobile ? '100%' : 'auto',
          }}
        >
          Go Back
        </Button>
        <ButtonLink
          variant="contained"
          startIcon={<HomeIcon />}
          href={Routes.home.path}
          sx={{
            borderRadius: '8px',
            width: is.mobile ? '100%' : 'auto',
          }}
        >
          Go Home
        </ButtonLink>
      </Box>
    </Container>
  );
};

export default NotFoundLayout;
