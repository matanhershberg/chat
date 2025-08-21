import { Server } from "socket.io";
import users from "./UsersService.js";

export default class BroadcastService {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  broadcastOnlineUsers() {
    const onlineUsers = users.users
      .filter((user) => user.name)
      .map((user) => ({
        id: user.socket.id,
        name: user.name!,
      }));
    this.io.emit("online-users", onlineUsers);
  }
}
