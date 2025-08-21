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
}
