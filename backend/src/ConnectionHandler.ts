import { Server } from "socket.io";
import onConnect from "./messageHandlers/connect.js";
import onDisconnect from "./messageHandlers/disconnect.js";
import onMessage from "./messageHandlers/message.js";
import onSetUsername from "./messageHandlers/setUsername.js";

export function handleConnection(io: Server) {
  io.on("connection", (socket) => {
    onConnect(socket);

    socket.on("set-username", (data, callback) =>
      onSetUsername(socket, data, callback),
    );

    socket.on("message", (msg) => {
      onMessage(msg, io);
    });

    socket.on("disconnect", () => onDisconnect(socket));
  });
}
