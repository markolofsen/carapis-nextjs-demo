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
RUN npm install --production --ignore-scripts --legacy-peer-deps

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"] 