import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
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

const store = configureStore({
  reducer: {
    messages: messagesSlice.reducer,
  },
});

export const messagesActions = messagesSlice.actions;

export default store;

export type RootState = ReturnType<typeof store.getState>;
