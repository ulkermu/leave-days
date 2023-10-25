"use client";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  PaletteMode,
  Select,
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
                }
              } catch (error: any) {
                toast.error(`Error: ${error.message}`);
              }
              handleClose();
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
                    <FormControl variant="standard" required size="small">
                      <InputLabel id="select-leave-reason-label">
                        Leave Reason
                      </InputLabel>
                      <Select
                        labelId="select-leave-reason-label"
                        id="select-leave-reason"
                        value={field.value}
                        {...field}
                        onChange={(e: any) =>
                          form.setFieldValue("leave_reason", e.target.value)
                        }
                        label="Leave Reason"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Sick Leave"}>Sick Leave</MenuItem>
                        <MenuItem value={"Bereavement Leave"}>
                          Bereavement Leave
                        </MenuItem>
                        <MenuItem value={"Medical Leave"}>
                          Medical Leave
                        </MenuItem>
                        <MenuItem value={"Maternity/Paternity Leave"}>
                          Maternity/Paternity Leave
                        </MenuItem>
                        <MenuItem value={"Unpaid Leave"}>Unpaid Leave</MenuItem>
                        <MenuItem value={"Study Leave"}>Study Leave</MenuItem>
                        <MenuItem value={"Administrative Leave"}>
                          Administrative Leave
                        </MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                      </Select>
                    </FormControl>
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
                      cCHeight={"36.5px"}
                      cWidth={"21px!important"}
                      cHeight={"21px!important"}
                    />
                  ) : (
                    <CustomButton
                      title="Add"
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
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
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
