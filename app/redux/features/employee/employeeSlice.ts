"use client";

import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export interface EmployeeState {
  modal: boolean;
  editModal: boolean;
  employees: any;
  empID: string;
  empRow: object;
}

const initialState: EmployeeState = {
  modal: false,
  editModal: false,
  employees: [],
  empID: "",
  empRow: {
    id: "",
    firstName: "",
    lastName: "",
    start_date: dayjs().toISOString(),
    birth_date: dayjs().subtract(18, "year").toISOString(),
  },
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
    setEmployeeEditModal: (state, action) => {
      state.editModal = action.payload;
    },
    setEmpID: (state, action) => {
      state.empID = action.payload;
    },
    setEmpRow: (state, action) => {
      state.empRow = action.payload;
    },
  },
});

export const {
  setEmployeeModal,
  setEmployees,
  setEmployeeEditModal,
  setEmpID,
  setEmpRow,
} = employeeSlice.actions;

export default employeeSlice.reducer;
