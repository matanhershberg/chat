import { io, Socket } from "socket.io-client";
import type { OutgoingMessage } from "../models/messages";
import { messagesActions } from "../store/messages";
import store from "../store/store";
import { setOnlineUsers, type OnlineUser } from "../store/users";

class Websocket {
  private socket: Socket;

  constructor() {
    this.socket = io("https://api.chat.matan.app");
    this.addListeners();
  }

  private addListeners() {
    this.socket.on("message", (data: OutgoingMessage) => {
      // Only handle chat messages for now
      if (data.type === "chat" && "payload" in data && data.payload) {
        store.dispatch(messagesActions.addMessage(data.payload));
      }
    });

    this.socket.on("online-users", (onlineUsers: OnlineUser[]) => {
      store.dispatch(setOnlineUsers(onlineUsers));
    });
  }

  // setUsername with acknowledgement
  public setUsername(
    username: string,
    callback: (result: {
      success: boolean;
      username?: string;
      error?: string;
    }) => void,
  ) {
    this.socket.emit("set-username", { username }, callback);
  }

  public emit(data: OutgoingMessage) {
    this.socket.emit("message", data);
  }
}

export default Websocket;
