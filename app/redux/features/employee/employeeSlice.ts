"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface EmployeeState {
  modal: boolean;
}

const initialState: EmployeeState = {
  modal: false,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployeeModal: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const { setEmployeeModal } = employeeSlice.actions;

export default employeeSlice.reducer;