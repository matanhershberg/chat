import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./messages";
import userSlice from "./user";
import usersSlice from "./users";

const store = configureStore({
  reducer: {
    messages: messagesSlice.reducer,
    user: userSlice.reducer,
    users: usersSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
