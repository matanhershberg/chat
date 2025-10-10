import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface OnlineUser {
  id: string;
  name: string;
}

interface UsersState {
  onlineUsers: OnlineUser[];
}

const initialState: UsersState = {
  onlineUsers: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setOnlineUsers: (state, action: PayloadAction<OnlineUser[]>) => {
      state.onlineUsers = action.payload;
    },
    addOnlineUser: (state, action: PayloadAction<OnlineUser>) => {
      const exists = state.onlineUsers.some(
        (user) => user.id === action.payload.id,
      );

      if (!exists) {
        state.onlineUsers.push(action.payload);
      }
    },
    removeOnlineUser: (state, action: PayloadAction<{ id: string }>) => {
      state.onlineUsers = state.onlineUsers.filter(
        (user) => user.id !== action.payload.id,
      );
    },
  },
});

export const { setOnlineUsers, addOnlineUser, removeOnlineUser } =
  usersSlice.actions;
export default usersSlice;
