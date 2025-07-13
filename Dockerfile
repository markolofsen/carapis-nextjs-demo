# Dockerfile for CarAPIS Portal
# 
# TROUBLESHOOTING NOTES:
# 
# 1. WORKSPACE DEPENDENCIES:
#    - If you see "Unsupported URL Type workspace:*" error, make sure to use overrides in package.json:
#      "overrides": { "@carapis/nextjs": { "@carapis/api": "latest" } }
#    - Or use pnpm instead of npm for workspace support
#
# 2. PEER DEPENDENCY CONFLICTS:
#    - Use --legacy-peer-deps flag to resolve React version conflicts
#    - Common with @react-spring packages that don't support React 19 yet
#    - Override peer dependencies in package.json if needed
#
# 3. HUSKY PREPARE SCRIPTS:
#    - Set npm_config_ignore_scripts=true to avoid husky install errors
#    - Some packages try to run prepare scripts during installation
#
# 4. TYPESCRIPT BUILD ISSUES:
#    - Install all dependencies (including devDependencies) for build
#    - Next.js requires TypeScript and @types packages for compilation
#    - Don't use --production flag during build stage
#
# 5. DNS RESOLUTION:
#    - Set DNS_SERVERS for external API access in containerized environments
#    - Helps resolve npm registry and external API calls

FROM node:18-alpine

# Build arguments for environment variables
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_API_URL
ARG CARAPIS_APIKEY
ARG NEXT_PUBLIC_GOOGLE_TAG_ID

WORKDIR /app

# Set environment variables from build args
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV CARAPIS_APIKEY=${CARAPIS_APIKEY}
ENV NEXT_PUBLIC_GOOGLE_TAG_ID=${NEXT_PUBLIC_GOOGLE_TAG_ID}
ENV NEXT_TELEMETRY_DISABLED=1

# Configure DNS servers for external API access
ENV DNS_SERVERS="8.8.8.8 8.8.4.4"

# Disable prepare scripts to avoid husky issues
ENV npm_config_ignore_scripts=true

COPY package*.json ./
# Install all dependencies (including devDependencies) for build
RUN npm install --ignore-scripts --legacy-peer-deps

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"] 