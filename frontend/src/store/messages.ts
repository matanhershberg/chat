import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Message, MessageState } from "../models/messages";

const messagesSlice = createSlice({
  name: "messages",
  initialState: { messages: [] } as MessageState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

export default messagesSlice;

export const messagesActions = messagesSlice.actions;
