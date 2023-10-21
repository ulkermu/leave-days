"use client";

import { Modal, PaletteMode, ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  setPastLeavesData,
  setPastLeavesModal,
} from "../redux/features/employee/employeeSlice";
import { useDispatch } from "react-redux";
import { CustomButton } from "@/components";
import { useTheme } from "next-themes";
import { ConvertToDate, DaysBetweenDates } from "@/utils/ConvertDate";

const ReviewPastLeaves = () => {
  const isDark = useTheme();
  const mode: PaletteMode = isDark.theme === "dark" ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const dispatch = useDispatch();
  const pastLeaves = useSelector((state: RootState) => state.employee);
  const pastLeavesModal = pastLeaves.pastLeavesModal;
  const pastLeavesData = pastLeaves.pastLeavesData;

  const handleClose = () => {
    dispatch(setPastLeavesModal(false));
    dispatch(setPastLeavesData([]));
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={pastLeavesModal}
        onClose={handleClose}
        className="h-screen flex items-center w-full justify-center"
      >
        <div className="m-auto max-w-xl	w-full bg-white dark:bg-slate-700 p-5 rounded-md m-5 flex flex-col gap-2.5">
          <h3 className="text-center text-xl text-orange-700 dark:text-slate-100">Past Leaves</h3>
          {pastLeavesData?.map((past: any, key: number) => (
            <div
              key={key}
              className="bg-orange-50 dark:bg-slate-500 text-orange-700 dark:text-slate-100 p-2.5 rounded-md"
            >
              {past.leave_reason} -{" "}
              {DaysBetweenDates(past.leave_start_date, past.leave_end_date)} (
              {ConvertToDate(past.leave_start_date)} -{" "}
              {ConvertToDate(past.leave_end_date)})
            </div>
          ))}
          <div className="flex justify-end">
            <CustomButton
              title="Close"
              handleClick={handleClose}
              containerStyles="bg-red-50 text-red-700 hover:bg-red-100 dark:text-red-300"
            />
          </div>
        </div>
      </Modal>
    </ThemeProvider>
  );
};

export default ReviewPastLeaves;
