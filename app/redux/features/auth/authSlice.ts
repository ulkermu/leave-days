"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: any;
}

const isClient = typeof window !== "undefined";
const storedUser = isClient ? localStorage.getItem("leave-user") : null;
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

const initialState: AuthState = {
  user: parsedUser ?? false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginHandle: (state, action) => {
      if (isClient) {
        localStorage.setItem("leave-user", JSON.stringify(action.payload));
      }
      state.user = action.payload;
    },
    logoutHandle: (state) => {
      if (isClient) {
        localStorage.removeItem("leave-user");
      }
      state.user = false;
    },
  },
});

export const { loginHandle, logoutHandle } = authSlice.actions;

export default authSlice.reducer;
