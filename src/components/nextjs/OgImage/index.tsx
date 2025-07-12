import { colors } from '@mui/material';

import { settings } from '@/core/settings';

interface OgImageProps {
  title: string;
  subtitle?: string;
}

const OgImage: React.FC<OgImageProps> = ({ title, subtitle }) => {
  const Logo = `${settings.url}/static/logo.svg`;

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Geist, system-ui, sans-serif',
        position: 'relative',
        backgroundColor: colors.common.white,
      }}
    >
      {/* Header area with strict business styling */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100px',
          flexDirection: 'column',
          borderBottom: `1px solid ${colors.grey[200]}`,
        }}
      >
        {/* Header content container */}
        <div
          style={{
            display: 'flex',
            position: 'relative',
            width: '100%',
            height: '100%',
            zIndex: 2,
            alignItems: 'center',
            padding: '0 60px',
          }}
        >
          {/* Logo in header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              height={36}
              style={{
                objectFit: 'contain',
              }}
            />
          </div>

          {/* Company name - now right after the logo */}
          <div
            style={{
              display: 'flex',
              flexGrow: 1,
              color: colors.grey[900],
              fontWeight: 600,
              fontSize: '30px',
              marginLeft: '20px',
            }}
          >
            {settings.app.name}
          </div>

          {/* Separator line */}
          <div
            style={{
              display: 'flex',
              width: '1px',
              height: '40px',
              backgroundColor: colors.grey[300],
              margin: '0 30px',
            }}
          />

          {/* App description - moved to right side */}
          <div
            style={{
              display: 'flex',
              color: colors.grey[700],
              fontWeight: 600,
              fontSize: '14px',
              maxWidth: '300px',
            }}
          >
            {settings.app.description}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '90%',
          padding: '0 60px',
          paddingTop: '120px', // Account for header + spacing
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: '100%',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Large title */}
        <h1
          style={{
            fontWeight: 700,
            fontSize: '80px',
            margin: '40px 0 30px 0',
            color: colors.grey[900],
            lineHeight: 1.1,
            textAlign: 'left',
            width: '100%',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            style={{
              fontSize: '32px',
              margin: 0,
              color: colors.grey[600],
              fontWeight: 500,
              lineHeight: 1.3,
              textAlign: 'left',
              width: '100%',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Footer line */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '1px',
          backgroundColor: colors.grey[200],
        }}
      />
    </div>
  );
};

export default OgImage;
