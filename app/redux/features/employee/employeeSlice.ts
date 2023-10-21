"use client";

import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export interface EmployeeState {
  modal: boolean;
  editModal: boolean;
  employees: any;
  empID: string;
  empRow: object;
  regularLeaveModal: boolean;
  annualLeaveModal: boolean;
  pastLeaves: any;
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
  regularLeaveModal: false,
  annualLeaveModal: false,
  pastLeaves: {
    modal: false,
    data: [],
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
    setRegularLeaveModal: (state, action) => {
      state.regularLeaveModal = action.payload;
    },
    setAnnualLeaveModal: (state, action) => {
      state.annualLeaveModal = action.payload;
    },
    setPastLeaves: (state, action) => {
      state.pastLeaves = action.payload;
    },
  },
});

export const {
  setEmployeeModal,
  setEmployees,
  setEmployeeEditModal,
  setEmpID,
  setEmpRow,
  setRegularLeaveModal,
  setAnnualLeaveModal,
  setPastLeaves,
} = employeeSlice.actions;

export default employeeSlice.reducer;
