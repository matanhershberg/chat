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
  },
});

export const { setOnlineUsers } = usersSlice.actions;
export default usersSlice;
