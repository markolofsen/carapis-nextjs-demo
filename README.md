# Car Demo Portal

## Overview

A pre-configured demo portal for car listings and management, built on top of the CarAPIS platform. This is a lightweight Next.js application designed for easy deployment and demonstration purposes.

## Features

- **Car Listings**: Browse and search vehicles
- **Car Details**: View detailed information about each vehicle
- **Responsive Design**: Works on desktop and mobile devices
- **Pre-configured**: Ready to run with CarAPIS integration
- **Lightweight**: Minimal dependencies for fast loading

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

### Environment Variables

The portal is pre-configured with the following environment variables:

```env
NEXT_PUBLIC_URL=https://vamcar.com
NEXT_PUBLIC_API_URL=https://api2.carapis.com

# CARAPIS
NEXT_PUBLIC_CARAPIS_APIKEY=
NEXT_PUBLIC_GOOGLE_TAG_ID=
```

- `NEXT_PUBLIC_CARAPIS_APIKEY` — your CarAPIS API key (get it from your CarAPIS dashboard)
- `NEXT_PUBLIC_GOOGLE_TAG_ID` — your Google Tag Manager ID (optional, for analytics)

## Docker Deployment

For production deployment, use the provided Docker configuration:

### Using Dockerfile

```bash
# Build the Docker image
docker build -t car-portal .

# Run the container
docker run -p 3000:3000 car-portal
```

### Using Docker Compose

```bash
# Build and run with Docker Compose
docker-compose up -d car_portal
```

The portal will be available at port 3000 (or 9102 when using docker-compose).

### Environment Variables in Docker

You can pass environment variables when running the container:

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_CARAPIS_APIKEY=your-api-key \
  -e NEXT_PUBLIC_GOOGLE_TAG_ID=your-gtag-id \
  car-portal
```

## Project Structure

```
portal/
├── src/
│   ├── api/                 # API clients and types
│   │   ├── encar_public/    # ENCAR API client
│   │   └── index.ts         # API exports
│   ├── components/          # UI components
│   ├── core/                # Core configuration
│   │   ├── routes.ts        # Route definitions
│   │   └── settings.ts      # App settings
│   ├── layouts/             # Page layouts
│   │   ├── 404/             # 404 page layout
│   │   ├── Error/           # Error page layout
│   │   └── Public/          # Public pages layout
│   ├── pages/               # Next.js pages
│   │   ├── api/             # API routes
│   │   ├── catalog/         # Car catalog pages
│   │   ├── v/               # Vehicle detail pages
│   │   └── index.tsx        # Home page
│   └── views/               # Page views and components
│       ├── catalog/         # Catalog view components
│       └── detail/          # Vehicle detail view
├── public/                  # Static assets
│   ├── static/              # Static files
│   │   ├── favicons/        # Favicon files
│   │   ├── fonts/           # Font files
│   │   └── lottie/          # Lottie animation files
│   └── manifest.json        # PWA manifest
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── next.config.mjs          # Next.js configuration
└── README.md                # This file
```

## API Integration

This portal integrates with the CarAPIS platform for:

- Vehicle data retrieval
- Search and filtering
- Real-time updates

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## License

This demo portal is part of the CarAPIS ecosystem.
