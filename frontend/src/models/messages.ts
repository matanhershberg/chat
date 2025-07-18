export interface Message {
  id: string;
  text: string;
  timestamp: string;
}

export interface MessageState {
  messages: Message[];
}
