"use client";

import {
  Modal,
  PaletteMode,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  setEmpID,
  setRegularLeaveModal,
} from "../redux/features/employee/employeeSlice";
import { useDispatch } from "react-redux";
import { addEmployeeLeave } from "../firabase";
import { Field, Form, Formik } from "formik";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTheme } from "next-themes";
import { CustomButton, CustomLoading } from "@/components";
import { useState } from "react";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import toast from "react-hot-toast";
import { EmployeeLeave } from "@/types";

const AddRegularLeave = () => {
  const db = getFirestore();
  const isDark = useTheme();
  const mode: PaletteMode = isDark.theme === "dark" ? "dark" : "light";

  const dispatch = useDispatch();
  const employee = useSelector((state: RootState) => state.employee);
  const regularLeaveModal = employee.regularLeaveModal;
  const empID = employee.empID;

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const isFormInvalid = (values: any) => {
    const currentDate = dayjs().add(-1, "day");
    const oneDayLater = dayjs();

    const leaveStartDate = dayjs(values.leave_start_date);
    const leaveEndDate = dayjs(values.leave_end_date);

    return (
      values.leave_reason === "" ||
      leaveStartDate.isBefore(currentDate) ||
      leaveEndDate.isBefore(oneDayLater) ||
      leaveEndDate.isBefore(leaveStartDate.add(1, "day"))
    );
  };

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    dispatch(setRegularLeaveModal(false));
    dispatch(setEmpID(""));
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        className="h-screen flex items-center w-full justify-center"
        open={regularLeaveModal}
        onClose={handleClose}
      >
        <div className="m-auto max-w-xl	w-full bg-white dark:bg-slate-700 p-5 rounded-md m-5">
          <Formik
            initialValues={{
              leave_start_date: dayjs(),
              leave_end_date: dayjs().add(1, "day"),
              leave_reason: "",
            }}
            onSubmit={async (values) => {
              setLoading(true);

              const leaveStartDate = values.leave_start_date.toDate();
              const leaveEndDate = values.leave_end_date.toDate();

              try {
                // Query the employee's leaves.
                const q = query(collection(db, "employees", empID, "leaves"));
                const querySnapshot = await getDocs(q);

                let isLeaveExist = false; // this variable is to check if there's a leave on the specified dates

                querySnapshot.forEach((doc) => {
                  const existingLeave = doc.data() as Omit<EmployeeLeave, "id">;

                  // Convert Firestore timestamp to JavaScript Date object
                  const existingStartDate =
                    existingLeave.leave_start_date.toDate();
                  const existingEndDate = existingLeave.leave_end_date.toDate();

                  // Check all possible overlaps
                  if (
                    (leaveStartDate >= existingStartDate &&
                      leaveStartDate <= existingEndDate) || // Scenario 2
                    (leaveEndDate >= existingStartDate &&
                      leaveEndDate <= existingEndDate) || // Scenario 3
                    (leaveStartDate <= existingStartDate &&
                      leaveEndDate >= existingEndDate) // Scenario 4
                  ) {
                    isLeaveExist = true;
                  }
                });

                if (isLeaveExist) {
                  // If there's a leave on the specified dates, show error message.
                  toast.error(
                    "The employee already has a leave for the specified date."
                  );
                } else {
                  // If not, add the new leave.
                  await addEmployeeLeave(
                    {
                      leave_start_date: leaveStartDate,
                      leave_end_date: leaveEndDate,
                      leave_reason: values.leave_reason,
                    },
                    empID
                  );
                  toast.success("Leave added successfully!");
                  handleClose();
                }
              } catch (error: any) {
                toast.error(`Error: ${error.message}`);
              }

              setLoading(false);
            }}
          >
            {(props) => (
              <Form className="w-full flex flex-col gap-2.5">
                <Field name="leave_start_date">
                  {({ field, form }: any) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Leave Start Date"
                        format="DD/MM/YYYY"
                        minDate={dayjs()}
                        value={field.value}
                        onChange={(date) =>
                          form.setFieldValue("leave_start_date", date)
                        }
                        slotProps={{
                          textField: {
                            property: { ...field },
                            variant: "standard",
                            error:
                              form.errors.leave_start_date &&
                              form.touched.leave_start_date,
                            helperText: form.errors.leave_start_date,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                </Field>
                <Field name="leave_end_date">
                  {({ field, form }: any) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Leave End Date"
                        format="DD/MM/YYYY"
                        minDate={dayjs().add(1, "day")}
                        disablePast
                        value={field.value}
                        onChange={(date) =>
                          form.setFieldValue("leave_end_date", date)
                        }
                        slotProps={{
                          textField: {
                            property: { ...field },
                            variant: "standard",
                            error:
                              form.errors.leave_end_date &&
                              form.touched.leave_end_date,
                            helperText: form.errors.leave_end_date,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                </Field>
                <Field name="leave_reason">
                  {({ field, form }: any) => (
                    <TextField
                      {...field}
                      label="Leave Reason"
                      type="text"
                      value={field.value}
                      onChange={(e) =>
                        form.setFieldValue("leave_reason", e.target.value)
                      }
                      error={
                        form.errors.leave_reason && form.touched.leave_reason
                      }
                      text={form.errors.leave_reason}
                      size="small"
                      variant="standard"
                      autoComplete="off"
                    />
                  )}
                </Field>
                <div className="flex gap-2.5 w-full justify-end">
                  <CustomButton
                    title="Cancel"
                    handleClick={handleClose}
                    containerStyles="text-red-500 dark:text-red-300 bg-red-50 hover:bg-red-100"
                    type="button"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    }
                  />
                  {loading ? (
                    <CustomLoading
                      cCWidth={"100%"}
                      cCHeight={"36.5px"}
                      cWidth={"21px!important"}
                      cHeight={"21px!important"}
                    />
                  ) : (
                    <CustomButton
                      title="Update"
                      containerStyles="text-green-500 dark:text-green-300 bg-green-50 hover:bg-green-100"
                      type="submit"
                      disable={isFormInvalid(props.values)}
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                          />
                        </svg>
                      }
                    />
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </ThemeProvider>
  );
};

export default AddRegularLeave;
