import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./messages";
import userSlice from "./user";

const store = configureStore({
  reducer: {
    messages: messagesSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
