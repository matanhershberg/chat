import { User } from "./User.js";
import users from "./UsersService.js";

export default class Broadcast {
  private io: any;

  setIo(io: any) {
    this.io = io;
  }

  broadcastOnlineUsers() {
    if (!this.io) {
      console.warn("Broadcast: io not set, cannot broadcast");
      return;
    }

    const onlineUsers = users.users
      .filter((user) => user.name)
      .map((user) => ({
        id: user.socket.id,
        name: user.name!,
      }));
    this.io.emit("online-users", onlineUsers);
  }

  sendOnlineUsersToSocket(user: User) {
    const onlineUsers = users.users
      .filter((user) => user.name)
      .map((user) => ({
        id: user.socket.id,
        name: user.name!,
      }));

    user.socket.emit("online-users", onlineUsers);
  }

  broadcastUserConnected(user: User) {
    if (!this.io) {
      console.warn("Broadcast: io not set, cannot broadcast");
      return;
    }

    // Only broadcast if user has a name
    if (user.name) {
      this.io.emit("user-connected", {
        id: user.socket.id,
        name: user.name,
      });
    }
  }

  broadcastUserDisconnected(user: User) {
    if (!this.io) {
      console.warn("Broadcast: io not set, cannot broadcast");
      return;
    }

    this.io.emit("user-disconnected", {
      id: user.socket.id,
    });
  }
}
