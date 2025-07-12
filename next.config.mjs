/** @type {import('next').NextConfig} */

const nextConfig = {
  // Disable React Strict Mode to prevent double effects and multiple connections
  reactStrictMode: false,

  transpilePackages: ['@carapis/nextjs'],

  // SWC compiler configuration for CSS-in-JS
  compiler: {
    emotion: true,
    styledComponents: true,
  },

  // Environment variables available to the client
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // Use SWC for optimization
  swcMinify: true,

  // Webpack configuration for workspace packages
  webpack: (config, { isServer }) => {
    // No custom webpack config needed - transpilePackages handles everything
    return config;
  },

  // Headers for CORS and security
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
