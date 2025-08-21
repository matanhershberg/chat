import { Server } from "socket.io";
import BroadcastService from "./BroadcastService.js";
import onConnect from "./messageHandlers/connect.js";
import onDisconnect from "./messageHandlers/disconnect.js";
import onMessage from "./messageHandlers/message.js";
import onSetUsername from "./messageHandlers/setUsername.js";

export function handleConnection(io: Server) {
  const broadcastService = new BroadcastService(io);

  io.on("connection", (socket) => {
    onConnect(socket, broadcastService);

    socket.on("set-username", (data, callback) =>
      onSetUsername(socket, data, callback, broadcastService),
    );

    socket.on("message", (msg) => {
      onMessage(msg, io);
    });

    socket.on("disconnect", () => onDisconnect(socket, broadcastService));
  });
}
