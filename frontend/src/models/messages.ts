export interface Message {
  id: string;
  text: string;
  username: string;
  timestamp: string;
}

export interface MessageState {
  messages: Message[];
}

export type OutgoingMessage =
  | { type: "chat"; payload: Message }
  | { type: "set-username"; payload: { username: string } };
