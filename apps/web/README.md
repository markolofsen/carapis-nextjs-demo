# Ready-to-Use Car Portal

## Overview

Launch your car portal in 10 minutes with our Docker container. Pre-configured with CarAPIS integration, responsive design, and thousands of vehicles from ENCAR. No developers needed.

## Features

- **Professional Design**: Modern, responsive design that works on all devices
- **Thousands of Cars**: Access to thousands of vehicles from ENCAR with real-time data
- **Advanced Search**: Powerful filtering by brand, model, year, price, fuel type
- **SEO Optimized**: Built for search engines to help customers find your portal
- **Fast Loading**: Optimized for speed with server-side rendering
- **Secure & Reliable**: API keys protected on server, SSL encryption

## Quick Start

### Prerequisites

- Server with Docker
- 2GB RAM
- 10GB storage
- CarAPIS API key

### Launch in 10 Minutes

```bash
# 1. Download Docker image
docker pull carapis/portal:latest

# 2. Run with your settings
docker run -d \
  -p 3000:3000 \
  -e CARAPIS_APIKEY=your-key \
  -e NEXT_PUBLIC_URL=https://your-domain.com \
  carapis/portal:latest

# 3. Done! Website runs on port 3000
```

Your car portal will be available at `http://localhost:3000`

### Environment Variables

Required environment variables:

```env
CARAPIS_APIKEY=your-api-key-here
NEXT_PUBLIC_URL=https://your-domain.com
```

Optional:

```env
NEXT_PUBLIC_GOOGLE_TAG_ID=your-gtag-id
```

**Security**: API keys are kept server-side and never exposed to the client browser. All API requests are proxied through secure middleware.

## Advanced Deployment

### Custom Docker Build

```bash
# Build image
docker build -t car-portal .

# Run container
docker run -p 3000:3000 car-portal
```

### Docker Compose

```bash
# Build and run
docker-compose up -d car_portal
```

### Environment Variables in Docker

```bash
docker run -p 3000:3000 \
  -e CARAPIS_APIKEY=your-api-key \
  -e NEXT_PUBLIC_GOOGLE_TAG_ID=your-gtag-id \
  car-portal
```

## Project Structure

```
portal/
├── src/
│   ├── api/                 # API clients and types
│   │   └── index.ts         # API exports (secure proxy)
│   ├── pages/
│   │   ├── api/             # API routes
│   │   ├── catalog/         # Car catalog pages
│   │   └── v/               # Vehicle detail pages
│   ├── components/          # UI components
│   ├── core/                # Core configuration
│   │   ├── routes.ts        # Route definitions
│   │   └── settings.ts      # App settings
│   ├── layouts/             # Page layouts
│   │   ├── 404/             # 404 page layout
│   │   ├── Error/           # Error page layout
│   │   └── Public/          # Public pages layout
│   └── views/               # Page views and components
│       ├── catalog/         # Catalog view components
│       └── detail/          # Vehicle detail view
├── public/                  # Static assets
│   ├── static/              # Static files
│   │   ├── favicons/        # Favicon files
│   │   ├── fonts/           # Font files
│   │   └── lottie/          # Lottie animation files
│   └── manifest.json        # PWA manifest
├── middleware.ts            # Edge proxy for API and media
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── next.config.mjs          # Next.js configuration
└── README.md                # This file
```

## What You Get

- **Professional Design**: Modern, responsive design that works on all devices
- **Thousands of Cars**: Access to thousands of vehicles from ENCAR with real-time data
- **Advanced Search**: Powerful filtering by brand, model, year, price, fuel type
- **SEO Optimized**: Built for search engines to help customers find your portal
- **Fast Loading**: Optimized for speed with server-side rendering
- **Secure & Reliable**: API keys protected on server, SSL encryption
- **Edge Proxy**: Fast middleware-based API and media proxying

## Why Choose Our Portal?

- **Save Time**: Launch in 10 minutes instead of months of development
- **Save Money**: No need to hire developers or pay for custom development
- **No Technical Knowledge**: Just run Docker command and you're ready to go
- **Professional Quality**: Built by experts with best practices
- **Always Updated**: Get new features and improvements automatically
- **Instant Support**: Professional support when you need help

## Development

For developers who want to modify the portal:

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Architecture

The portal uses a clean, minimalistic architecture:

- **Middleware Proxy**: Edge-level proxying for `/apix/*` and `/media/*` requests
- **API Client**: Simple wrapper around CarAPIS with automatic authentication
- **Server-Side Rendering**: Fast initial page loads with SEO optimization
- **Client-Side Hydration**: Smooth user experience with React hooks

## License

This demo portal is part of the CarAPIS ecosystem.
