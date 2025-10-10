import { Socket } from "socket.io";
import broadcastService from "../BroadcastService.js";
import users from "../UsersService.js";

export default function onDisconnect(socket: Socket) {
  console.log("Client disconnected:", socket.id);
  const user = users.findUserBySocketId(socket.id);

  // Only broadcast if user had a name (was visible in the users list)
  if (user && user.name) {
    broadcastService.broadcastUserDisconnected(user);
  }

  users.removeUser(socket);
}
