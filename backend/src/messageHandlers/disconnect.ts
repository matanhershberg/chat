import { Socket } from "socket.io";
import users from "../UsersService.js";

export default function onDisconnect(socket: Socket) {
  users.removeUser(socket);
  console.log("Client disconnected:", socket.id);
}
