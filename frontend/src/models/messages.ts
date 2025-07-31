export interface Message {
  id: string;
  text: string;
  username: string;
  timestamp: string;
}

export interface MessageState {
  messages: Message[];
}
