import { Server, Socket } from "socket.io";
import broadcastService from "../BroadcastService.js";
import logger from "../logger.js";
import users from "../UsersService.js";

const isUsernameTaken = async (
  io: Server,
  username: string,
  socketId: string,
): Promise<boolean> => {
  // Check across ALL backend instances using fetchSockets()
  const sockets = await io.fetchSockets();
  return sockets.some(
    (socket: any) =>
      socket.data.username === username && socket.id !== socketId,
  );
};

const onSetUsername = async (
  socket: Socket,
  io: Server,
  data: { username: string },
  callback: (result: {
    success: boolean;
    error?: string;
    username?: string;
  }) => void,
) => {
  if (!data || typeof data.username !== "string") {
    callback({ success: false, error: "Invalid username" });
    return;
  }

  if (await isUsernameTaken(io, data.username, socket.id)) {
    callback({ success: false, error: "Username already taken" });
    return;
  }

  const user = users.findUserBySocketId(socket.id);
  if (user) {
    user.name = data.username;
    // Store username in socket.data so it's accessible across servers
    socket.data.username = data.username;
    logger.trace({ socketId: socket.id, username: user.name }, "Username set");
    callback({ success: true, username: user.name });
    broadcastService.broadcastUserConnected(user);
  } else {
    callback({ success: false, error: "User not found" });
  }
};

export default onSetUsername;
