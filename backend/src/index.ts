import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { handleConnection } from "./ConnectionHandler.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost",
    methods: ["GET", "POST"],
  },
});

handleConnection(io);

app.get("/", (req, res) => {
  res.send("WebSocket Server Running");
});

const port = 3000;
httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
