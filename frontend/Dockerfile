# Build stage
FROM node:24-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:24-alpine AS production

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built app and node_modules
COPY --from=builder /app/dist ./dist

CMD ["npm", "run", "preview", "--", "--host"]
