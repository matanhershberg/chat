import { Socket } from "socket.io";
import BroadcastService from "../BroadcastService.js";
import users from "../UsersService.js";

export default function onConnect(
  socket: Socket,
  broadcastService: BroadcastService,
) {
  console.log("A client connected:", socket.id);
  users.createUser(socket);

  // Broadcast updated list to all users (including the new user)
  broadcastService.broadcastOnlineUsers();
}
