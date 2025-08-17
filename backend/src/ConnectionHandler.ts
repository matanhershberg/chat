import { Server } from "socket.io";
import Users from "./Users.js";

const users = new Users();

export function handleConnection(io: Server) {
  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);
    users.createUser(socket);
    console.log("Users:", users.users.length);

    socket.on("message", (msg) => {
      if (
        msg.type === "set-username" &&
        msg.payload &&
        typeof msg.payload.username === "string"
      ) {
        // Check for duplicate username
        const isTaken = users.users.some(
          (user) =>
            user.name === msg.payload.username && user.socket.id !== socket.id,
        );
        if (isTaken) {
          socket.emit("username-error", { error: "Username already taken" });
          return;
        }
        // Find the user and set their name
        const user = users.users.find((u) => u.socket.id === socket.id);
        if (user) {
          user.name = msg.payload.username;
          console.log(`Username set for ${socket.id}: ${user.name}`);
          socket.emit("username-accepted", { username: user.name });
        }
      } else if (msg.type === "chat" && msg.payload) {
        io.emit("message", msg);
      }
    });

    socket.on("disconnect", () => {
      users.removeUser(socket);
      console.log("Client disconnected:", socket.id);
      console.log("Users:", users.users.length);
    });
  });
}
