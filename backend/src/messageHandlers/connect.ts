import { Socket } from "socket.io";
import broadcastService from "../BroadcastService.js";
import logger from "../logger.js";
import users from "../UsersService.js";

export default function onConnect(socket: Socket) {
  logger.trace({ socketId: socket.id }, "A client connected");
  const user = users.createUser(socket);

  broadcastService.sendOnlineUsersToSocket(user);
}
