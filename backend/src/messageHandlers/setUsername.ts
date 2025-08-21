import { Socket } from "socket.io";
import users from "../UsersService.js";

const onSetUsername = (
  socket: Socket,
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

  const isTaken = users.users.some(
    (user) => user.name === data.username && user.socket.id !== socket.id,
  );
  if (isTaken) {
    callback({ success: false, error: "Username already taken" });
    return;
  }

  const user = users.users.find((user) => user.socket.id === socket.id);
  if (user) {
    user.name = data.username;
    console.log(`Username set for ${socket.id}: ${user.name}`);
    callback({ success: true, username: user.name });
  } else {
    callback({ success: false, error: "User not found" });
  }
};

export default onSetUsername;
