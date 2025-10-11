import { Socket } from "socket.io";
import logger from "./logger.js";
import { User } from "./User.js";

export default class Users {
  users: User[] = [];

  private addUser(user: User) {
    this.users.push(user);
    logger.trace({ socketId: user.socket.id }, "User added");
    logger.trace({ usersCount: this.users.length }, "Users count");
  }

  createUser(socket: Socket) {
    const user = new User(socket);
    this.addUser(user);
    return user;
  }

  findUserBySocketId(socketId: string) {
    return this.users.find((user) => user.socket.id === socketId);
  }

  removeUser(socket: Socket) {
    this.users = this.users.filter((user) => user.socket.id !== socket.id);
    logger.trace({ socketId: socket.id }, "User removed");
    logger.trace({ usersCount: this.users.length }, "Users count");
  }
}
