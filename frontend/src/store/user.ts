import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserState } from "../models/user";

const userSlice = createSlice({
  name: "user",
  initialState: { name: undefined } as UserState,
  reducers: {
    addName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export default userSlice;

export const userActions = userSlice.actions;
