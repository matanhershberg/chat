import { Socket } from "socket.io";
import BroadcastService from "../BroadcastService.js";
import users from "../UsersService.js";

const isUsernameTaken = (username: string, socketId: string): boolean => {
  return users.users.some(
    (user) => user.name === username && user.socket.id !== socketId,
  );
};

const onSetUsername = (
  socket: Socket,
  data: { username: string },
  callback: (result: {
    success: boolean;
    error?: string;
    username?: string;
  }) => void,
  broadcastService: BroadcastService,
) => {
  if (!data || typeof data.username !== "string") {
    callback({ success: false, error: "Invalid username" });
    return;
  }

  if (isUsernameTaken(data.username, socket.id)) {
    callback({ success: false, error: "Username already taken" });
    return;
  }

  const user = users.findUserBySocketId(socket.id);
  if (user) {
    user.name = data.username;
    console.log(`Username set for ${socket.id}: ${user.name}`);
    callback({ success: true, username: user.name });
    broadcastService.broadcastOnlineUsers();
  } else {
    callback({ success: false, error: "User not found" });
  }
};

export default onSetUsername;
