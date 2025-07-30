import { io, Socket } from "socket.io-client";
import type { Message } from "../models/messages";
import { messagesActions } from "../store/messages";
import store from "../store/store";

class Websocket {
  private socket: Socket;

  constructor() {
    this.socket = io("http://localhost:3000");
    this.addListeners();
  }

  private addListeners() {
    this.socket.on("message", (data: Message) => {
      store.dispatch(messagesActions.addMessage(data));
    });
  }

  public emit(data: Message) {
    this.socket.emit("message", data);
  }
}

export default Websocket;
