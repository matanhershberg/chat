import { createAdapter } from "@socket.io/redis-adapter";
import express from "express";
import { createServer } from "http";
import { createClient } from "redis";
import { Server } from "socket.io";
import { handleConnection } from "./ConnectionHandler.js";
import logger from "./logger.js";

const app = express();
const httpServer = createServer(app);

const corsOrigin =
  process.env.NODE_ENV === "production"
    ? "https://chat.matan.app"
    : "http://localhost";

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    methods: ["GET", "POST"],
  },
  // Enable connection state recovery for cross-server communication
  connectionStateRecovery: {},
});

// Set up Redis adapter for horizontal scaling
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
const pubClient = createClient({ url: redisUrl });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()])
  .then(() => {
    io.adapter(createAdapter(pubClient, subClient));
    logger.info("Redis adapter connected successfully");
  })
  .catch((err) => {
    logger.error("Redis connection error:", err);
    process.exit(1);
  });

handleConnection(io);

app.get("/", (req, res) => {
  res.send("WebSocket Server Running");
});

const port = process.env.PORT ?? 3000;
httpServer.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
