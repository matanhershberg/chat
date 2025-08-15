import { Socket } from "socket.io";

export class User {
  public socket: Socket;
  public name?: string;

  constructor(socket: Socket) {
    this.socket = socket;
  }
}
