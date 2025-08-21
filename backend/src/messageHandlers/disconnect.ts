import { Socket } from "socket.io";
import users from "../UsersService.js";

export default function onDisconnect(socket: Socket) {
  console.log("Client disconnected:", socket.id);
  users.removeUser(socket);
}
