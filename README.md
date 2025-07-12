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
NEXT_PUBLIC_CARAPIS_APIKEY=your-api-key
```

## Docker Deployment

For production deployment, use the provided Docker configuration:

```bash
# Build and run with Docker Compose
docker-compose up -d encar_portal
```

The portal will be available at port 9102.

## Project Structure

```
portal/
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # UI components
│   ├── lib/             # Utilities and API client
│   └── types/           # TypeScript definitions
├── package.json
└── README.md
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

### Adding Features

1. Create new components in `src/components/`
2. Add API calls in `src/lib/api/`
3. Update types in `src/types/`

## License

This demo portal is part of the CarAPIS ecosystem.
