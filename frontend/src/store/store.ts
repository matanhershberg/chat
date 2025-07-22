import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./messages";

const store = configureStore({
  reducer: {
    messages: messagesSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
