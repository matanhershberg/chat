import { Socket } from "socket.io";
import users from "../UsersService.js";

export default function onConnect(socket: Socket) {
  console.log("A client connected:", socket.id);
  users.createUser(socket);
  console.log("Users:", users.users.length);
}
