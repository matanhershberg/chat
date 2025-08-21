import { Server } from "socket.io";

export default function onMessage(msg: any, io: Server) {
  if (msg.type === "chat" && msg.payload) {
    io.emit("message", msg);
  }
}
