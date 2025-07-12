FROM node:18-alpine

WORKDIR /app

# Configure DNS servers for external API access
ENV DNS_SERVERS="8.8.8.8 8.8.4.4"

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"] 