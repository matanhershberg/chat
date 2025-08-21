# Development stage
FROM node:24-alpine AS development

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 80
CMD ["npm", "run", "dev", "--", "--host"]

# Pre-production stage
FROM development AS pre-production
RUN ["npm", "run", "build"]

# Production stage
FROM nginx:stable-alpine AS production
COPY --from=pre-production /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
