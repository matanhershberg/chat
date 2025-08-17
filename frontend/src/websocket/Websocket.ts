import { io, Socket } from "socket.io-client";
import type { OutgoingMessage } from "../models/messages";
import { messagesActions } from "../store/messages";
import store from "../store/store";

class Websocket {
  private socket: Socket;
  private usernameErrorCallback?: (error: string) => void;
  private usernameAcceptedCallback?: (username: string) => void;

  constructor() {
    this.socket = io("http://localhost:3000");
    this.addListeners();
  }

  private addListeners() {
    this.socket.on("message", (data: OutgoingMessage) => {
      // Only handle chat messages for now
      if (data.type === "chat" && "payload" in data && data.payload) {
        store.dispatch(messagesActions.addMessage(data.payload));
      }
    });
    this.socket.on("username-error", (data: { error: string }) => {
      if (this.usernameErrorCallback) {
        this.usernameErrorCallback(data.error);
      }
    });
    this.socket.on("username-accepted", (data: { username: string }) => {
      if (this.usernameAcceptedCallback) {
        this.usernameAcceptedCallback(data.username);
      }
    });
  }

  public onUsernameError(callback: (error: string) => void) {
    this.usernameErrorCallback = callback;
  }

  public onUsernameAccepted(callback: (username: string) => void) {
    this.usernameAcceptedCallback = callback;
  }

  public emit(data: OutgoingMessage) {
    this.socket.emit("message", data);
  }
}

export default Websocket;
