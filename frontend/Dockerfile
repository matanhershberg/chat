FROM node:24-alpine

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

# Need to expose ports to outside connections to be able to connect to the docker instance
ENV EXPOSE_PORTS=true

CMD ["npm", "run", "preview"]
