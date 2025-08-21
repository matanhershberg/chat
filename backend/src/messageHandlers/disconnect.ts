import { Socket } from "socket.io";
import BroadcastService from "../BroadcastService.js";
import users from "../UsersService.js";

export default function onDisconnect(
  socket: Socket,
  broadcastService: BroadcastService,
) {
  console.log("Client disconnected:", socket.id);
  users.removeUser(socket);
  broadcastService.broadcastOnlineUsers();
}
