import { Socket } from "socket.io";
import { User } from "./User.js";

export default class Users {
  users: User[] = [];

  private addUser(user: User) {
    this.users.push(user);
    console.log("User added:", user.socket.id);
    console.log("Users:", this.users.length);
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
    console.log("User removed:", socket.id);
    console.log("Users:", this.users.length);
  }
}
