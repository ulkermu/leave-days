"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface EmployeeState {
  modal: boolean;
  employees: any;
}

const initialState: EmployeeState = {
  modal: false,
  employees: [],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployeeModal: (state, action) => {
      state.modal = action.payload;
    },
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    appendEmployee: (state, action) => {
      state.employees = [...state.employees, action.payload];
    },
  },
});

export const { setEmployeeModal, setEmployees, appendEmployee } =
  employeeSlice.actions;

export default employeeSlice.reducer;
