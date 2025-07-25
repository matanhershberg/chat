import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("WebSocket Server Running");
});

io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);
  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    socket.emit("message", `Echo: ${JSON.stringify(msg)}`);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const port = 3000;
httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
