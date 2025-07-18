export interface Message {
  id: number;
  text: string;
  timestamp: Date;
}

export interface MessageState {
  messages: Message[];
}
