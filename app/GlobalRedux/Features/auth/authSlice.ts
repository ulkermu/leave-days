"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  value: string;
}

const initialState: AuthState = {
  value: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (auth, action) => {
      auth.value = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
