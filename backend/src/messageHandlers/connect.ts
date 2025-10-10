import { Socket } from "socket.io";
import broadcastService from "../BroadcastService.js";
import users from "../UsersService.js";

export default function onConnect(socket: Socket) {
  console.log("A client connected:", socket.id);
  const user = users.createUser(socket);

  broadcastService.sendOnlineUsersToSocket(user);
}
