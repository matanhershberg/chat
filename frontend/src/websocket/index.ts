import { io, Socket } from "socket.io-client";
import type { Message } from "../models/messages";
import store from "../store/store";

class Websocket {
  private socket: Socket;
  private unsubscribe: () => void;
  private lastMessagesLength = 0;

  constructor() {
    this.socket = io("http://localhost:3000");
    this.unsubscribe = store.subscribe(this.handleStoreChange.bind(this));
  }

  private handleStoreChange() {
    const state = store.getState();
    const messages = state.messages.messages;
    if (messages.length > this.lastMessagesLength) {
      const newMessages = messages.slice(this.lastMessagesLength);
      newMessages.forEach((msg) => this.emit(msg));
      this.lastMessagesLength = messages.length;
    }
  }

  public emit(data: Message) {
    this.socket.emit("message", data);
  }

  public cleanup() {
    this.unsubscribe();
  }
}

export default Websocket;
