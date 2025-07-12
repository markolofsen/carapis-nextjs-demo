import { useRouter } from 'next/router';
import { useCallback } from 'react';

import BugReportIcon from '@mui/icons-material/BugReport';
import HomeIcon from '@mui/icons-material/Home';
import ReplayIcon from '@mui/icons-material/Replay';
import { alpha, Box, Button, Container, keyframes, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

import Routes from '@/core/routes';

import LogoAnimation from '@/components/animations/LogoAnimation';
import { ButtonLink } from '@carapis/nextjs/components';
import { useMedia } from '@carapis/nextjs/hooks';

// Define animations
const shake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
`;

const moveLeft = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
`;

const moveRight = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(10px); }
  100% { transform: translateX(0); }
`;

// Styled components
const ShakeContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&:hover': {
    animation: `${shake} 0.5s ease-in-out`,
  },
}));

const LeftEyeBrow = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '30px',
  height: '5px',
  top: '15px',
  left: '40px',
  background: theme.palette.text.primary,
  borderRadius: '10px',
  transform: 'rotate(-20deg)',
  animation: `${moveLeft} 2s ease-in-out infinite`,
  zIndex: 10,
}));

const RightEyeBrow = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '30px',
  height: '5px',
  top: '15px',
  right: '40px',
  background: theme.palette.text.primary,
  borderRadius: '10px',
  transform: 'rotate(20deg)',
  animation: `${moveRight} 2s ease-in-out infinite`,
  zIndex: 10,
}));

const GlitchText = styled(Typography)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  color: theme.palette.error.main,
  fontWeight: 900,
  textShadow: `0 0 10px ${alpha(theme.palette.error.main, 0.7)}`,
  '&::before, &::after': {
    content: 'attr(data-text)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  '&::before': {
    left: '2px',
    textShadow: `-2px 0 ${theme.palette.primary.main}`,
    animation: 'glitch 0.3s infinite',
    clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
  },
  '&::after': {
    left: '-2px',
    textShadow: `2px 0 ${theme.palette.secondary.main}`,
    animation: 'glitch 0.3s infinite',
    clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
  },
  '@keyframes glitch': {
    '0%': {
      transform: 'translate(0)',
    },
    '20%': {
      transform: 'translate(-2px, 2px)',
    },
    '40%': {
      transform: 'translate(-2px, -2px)',
    },
    '60%': {
      transform: 'translate(2px, 2px)',
    },
    '80%': {
      transform: 'translate(2px, -2px)',
    },
    '100%': {
      transform: 'translate(0)',
    },
  },
}));

// Props interface for the Error layout
export interface ErrorLayoutProps {
  statusCode?: number;
  errorMessage?: string;
}

export const ErrorLayout = ({ statusCode, errorMessage }: ErrorLayoutProps) => {
  const router = useRouter();
  const theme = useTheme();
  const { is } = useMedia();

  const handleRefresh = useCallback(() => {
    router.reload();
  }, [router]);

  let errorTitle = 'Something went wrong';
  let errorText = errorMessage || 'An unexpected error has occurred. Our team has been notified.';

  if (statusCode) {
    if (statusCode === 404) {
      return null; // Let 404 layout handle this
    }

    errorTitle = `Error ${statusCode}`;

    if (!errorMessage) {
      switch (statusCode) {
        case 500:
          errorText = "Server error: We're experiencing some technical difficulties.";
          break;
        case 401:
          errorText = 'Unauthorized: You need to be logged in to access this page.';
          break;
        case 403:
          errorText = "Forbidden: You don't have permission to access this page.";
          break;
        default:
          errorText = `Server returned status code ${statusCode}`;
      }
    }
  }

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
      <ShakeContainer sx={{ position: 'relative' }}>
        <LeftEyeBrow />
        <RightEyeBrow />
        <LogoAnimation size={is.mobile ? 160 : 220} followCursor float />
      </ShakeContainer>

      <Box sx={{ mt: 2 }}>
        <GlitchText variant={is.mobile ? 'h3' : 'h2'} fontWeight="bold" data-text={errorTitle} sx={{ mb: 2 }}>
          {errorTitle}
        </GlitchText>

        <Typography
          variant={is.mobile ? 'h6' : 'h5'}
          sx={{
            mb: is.mobile ? 2 : 4,
            color: theme.palette.mode === 'dark' ? alpha(theme.palette.error.light, 0.8) : alpha(theme.palette.error.dark, 0.8),
            fontSize: is.mobile ? '1rem' : 'inherit',
          }}
        >
          {errorText}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            fontSize: is.mobile ? '0.75rem' : 'inherit',
          }}
        >
          {statusCode ? `Status code: ${statusCode}` : 'Client-side error occurred'}
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
          startIcon={<ReplayIcon />}
          onClick={handleRefresh}
          sx={{
            borderRadius: '8px',
            width: is.mobile ? '100%' : 'auto',
          }}
        >
          Try Again
        </Button>
        <ButtonLink
          variant="contained"
          color="primary"
          startIcon={<HomeIcon />}
          href={Routes.home.path}
          sx={{
            borderRadius: '8px',
            width: is.mobile ? '100%' : 'auto',
          }}
        >
          Go Home
        </ButtonLink>
        {process.env.NODE_ENV === 'development' && (
          <ButtonLink
            variant="outlined"
            color="error"
            startIcon={<BugReportIcon />}
            href="/api/debug"
            target="_blank"
            sx={{
              borderRadius: '8px',
              width: is.mobile ? '100%' : 'auto',
            }}
          >
            Debug Info
          </ButtonLink>
        )}
      </Box>
    </Container>
  );
};

export default ErrorLayout;
