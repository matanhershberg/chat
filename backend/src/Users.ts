import { Socket } from "socket.io";
import { User } from "./User";

export default class Users {
  users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
    console.log("User added:", user.socket.id);
  }

  createUser(socket: Socket) {
    const user = new User(socket);
    this.addUser(user);
    return user;
  }

  removeUser(socket: Socket) {
    this.users = this.users.filter((user) => user.socket.id !== socket.id);
    console.log("User removed:", socket.id);
  }
}
