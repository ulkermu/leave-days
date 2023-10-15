"use client";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer, employeeReducer } from "@/app/redux/features";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
