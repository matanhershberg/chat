import { Server } from "socket.io";
import Users from "./Users";

const users = new Users();

export function handleConnection(io: Server) {
  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);
    users.createUser(socket);
    console.log("Users:", users.users.length);

    socket.on("message", (msg) => {
      console.log("Message received:", msg);
      io.emit("message", msg);
    });

    socket.on("disconnect", () => {
      users.removeUser(socket);
      console.log("Client disconnected:", socket.id);
      console.log("Users:", users.users.length);
    });
  });
}
