import { Server } from "socket.io";
import Users from "./Users.js";

const users = new Users();

export function handleConnection(io: Server) {
  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);
    users.createUser(socket);
    console.log("Users:", users.users.length);

    socket.on("set-username", (data, callback) => {
      if (!data || typeof data.username !== "string") {
        callback({ success: false, error: "Invalid username" });
        return;
      }
      const isTaken = users.users.some(
        (user) => user.name === data.username && user.socket.id !== socket.id,
      );
      if (isTaken) {
        callback({ success: false, error: "Username already taken" });
        return;
      }
      const user = users.users.find((u) => u.socket.id === socket.id);
      if (user) {
        user.name = data.username;
        console.log(`Username set for ${socket.id}: ${user.name}`);
        callback({ success: true, username: user.name });
      } else {
        callback({ success: false, error: "User not found" });
      }
    });

    // Only handle chat messages here
    socket.on("message", (msg) => {
      if (msg.type === "chat" && msg.payload) {
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
