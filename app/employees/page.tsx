"use client";
import { CustomButton } from "@/components";
import { useDispatch } from "react-redux";
import { setEmployeeModal } from "../redux/features/employee/employeeSlice";
import { Modal } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { EmployeeForm, EmployeeList } from ".";

const Employees = () => {
  const employee = useSelector((state: RootState) => state.employee);
  const modal = employee.modal;

  const dispatch = useDispatch();

  const handleAddEmploye = () => {
    dispatch(setEmployeeModal(true));
  };

  const handleClose = () => {
    dispatch(setEmployeeModal(false));
  };

  return (
    <main className="flex flex-col gap-5 max-w-[1280px] w-full p-5">
      <Modal
        className="max-w-[600px] w-full p-5 m-auto"
        open={modal}
        onClose={handleClose}
      >
        <div className="bg-white dark:bg-slate-800 p-5 rounded-md">
          <EmployeeForm />
        </div>
      </Modal>

      <h6 className="text-center">Employee List</h6>
      <CustomButton
        title="Add Employee"
        containerStyles="bg-blue-400 text-white hover:bg-blue-600"
        handleClick={handleAddEmploye}
        disable={false}
        type="button"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
        }
      />
      <EmployeeList />
    </main>
  );
};

export default Employees;
