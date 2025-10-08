import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { handleConnection } from "./ConnectionHandler.js";

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
});

handleConnection(io);

app.get("/", (req, res) => {
  res.send("WebSocket Server Running");
});

const port = process.env.PORT ?? 3000;
httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
