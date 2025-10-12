import logger from "./logger.js";
import { User } from "./User.js";

export default class Broadcast {
  private io: any;

  setIo(io: any) {
    this.io = io;
  }

  async broadcastOnlineUsers() {
    if (!this.io) {
      logger.warn("Broadcast: io not set, cannot broadcast");
      return;
    }

    // Fetch all sockets across all backend instances using fetchSockets()
    const sockets = await this.io.fetchSockets();
    const onlineUsers = sockets
      .filter((socket: any) => socket.data.username)
      .map((socket: any) => ({
        id: socket.id,
        name: socket.data.username,
      }));

    this.io.emit("online-users", onlineUsers);
  }

  async sendOnlineUsersToSocket(user: User) {
    if (!this.io) {
      logger.warn("Broadcast: io not set, cannot send online users");
      return;
    }

    // Fetch all sockets across all backend instances using fetchSockets()
    const sockets = await this.io.fetchSockets();
    const onlineUsers = sockets
      .filter((socket: any) => socket.data.username)
      .map((socket: any) => ({
        id: socket.id,
        name: socket.data.username,
      }));

    user.socket.emit("online-users", onlineUsers);
  }

  broadcastUserConnected(user: User) {
    if (!this.io) {
      logger.warn("Broadcast: io not set, cannot broadcast");
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
      logger.warn("Broadcast: io not set, cannot broadcast");
      return;
    }

    this.io.emit("user-disconnected", {
      id: user.socket.id,
    });
  }
}
