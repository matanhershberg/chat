import { createStore } from "redux";
import type { Message, MessageState } from "../models/messages";

const messagesReducer = (
  state: MessageState = { messages: [] },
  action: { type: string; payload: Message },
) => {
  if (action.type === "ADD_MESSAGE") {
    return { messages: [...state.messages, action.payload] };
  }

  throw new Error(`Unknown action type: ${action.type}`);
};

const store = createStore(messagesReducer);

export default store;
