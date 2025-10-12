import { Socket } from "socket.io";
import broadcastService from "../BroadcastService.js";
import logger from "../logger.js";
import users from "../UsersService.js";

export default async function onConnect(socket: Socket) {
  logger.trace({ socketId: socket.id }, "A client connected");
  const user = users.createUser(socket);

  await broadcastService.sendOnlineUsersToSocket(user);
}
