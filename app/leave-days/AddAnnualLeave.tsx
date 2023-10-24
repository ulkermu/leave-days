"use client";

import { Modal, PaletteMode, ThemeProvider, createTheme } from "@mui/material";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  setAnnualLeave,
  setAnnualLeaveModal,
  setEmpID,
} from "../redux/features/employee/employeeSlice";
import { Field, Form, Formik } from "formik";
import dayjs from "dayjs";
import { useState } from "react";
import { CustomButton, CustomLoading } from "@/components";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import toast from "react-hot-toast";
import { addEmployeeLeave, editEmployee } from "../firabase";
import { EmployeeLeave } from "@/types";
import { DaysBetweenDatesExcludingWeekends } from "@/utils/ConvertDate";

const AddAnnualLeave = () => {
  const [loading, setLoading] = useState(false);
  const isDark = useTheme();
  const mode: PaletteMode = isDark.theme === "dark" ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const dispatch = useDispatch();
  const db = getFirestore();
  const employee = useSelector((state: RootState) => state.employee);
  const annualLeaveModal = employee.annualLeaveModal;
  const empID = employee.empID;
  const annualLeave = employee.annualLeave;
  const annualLeaveEntitlement = annualLeave?.annual_leave_entitlement;

  const isFormInvalid = (values: any) => {
    const currentDate = dayjs().add(-1, "day");
    const oneDayLater = dayjs();

    const leaveStartDate = dayjs(values.annual_leave_start_date);
    const leaveEndDate = dayjs(values.annual_leave_end_date);

    return (
      values.leave_reason === "" ||
      leaveStartDate.isBefore(currentDate) ||
      leaveEndDate.isBefore(oneDayLater) ||
      leaveEndDate.isBefore(leaveStartDate.add(1, "day"))
    );
  };

  const handleClose = () => {
    dispatch(setAnnualLeaveModal(false));
    dispatch(setEmpID(""));
    dispatch(setAnnualLeave(null));
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={annualLeaveModal}
        onClose={handleClose}
        className="h-screen flex items-center w-full justify-center"
      >
        <div className="m-auto max-w-xl	w-full bg-white dark:bg-slate-700 p-5 rounded-md m-5">
          <Formik
            initialValues={{
              annual_leave_start_date: dayjs(),
              annual_leave_end_date: dayjs().add(1, "day"),
            }}
            onSubmit={async (values) => {
              setLoading(true);

              const annualLeaveStartDate =
                values.annual_leave_start_date.toDate();
              const annualLeaveEndDate = values.annual_leave_end_date.toDate();

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
                    (annualLeaveStartDate >= existingStartDate &&
                      annualLeaveStartDate <= existingEndDate) || // Scenario 2
                    (annualLeaveEndDate >= existingStartDate &&
                      annualLeaveEndDate <= existingEndDate) || // Scenario 3
                    (annualLeaveStartDate <= existingStartDate &&
                      annualLeaveEndDate >= existingEndDate) // Scenario 4
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

                  const remainingAnnualLeave =
                    annualLeaveEntitlement -
                    DaysBetweenDatesExcludingWeekends(
                      annualLeaveStartDate,
                      annualLeaveEndDate
                    );

                  if (remainingAnnualLeave > 0) {
                    await addEmployeeLeave(
                      {
                        leave_start_date: annualLeaveStartDate,
                        leave_end_date: annualLeaveEndDate,
                        leave_reason: "Annual Leave",
                      },
                      empID
                    );

                    await editEmployee(empID, {
                      annual_leave: {
                        annual_leave_start_date: annualLeaveStartDate,
                        annual_leave_end_date: annualLeaveEndDate,
                        annual_leave_entitlement: remainingAnnualLeave,
                      },
                    });
                    toast.success("Annual Leave added successfully!");
                  } else {
                    toast.error(
                      "You cannot grant more annual leave than the remaining annual leave entitlement!"
                    );
                  }
                }
              } catch (error: any) {
                toast.error(`Error: ${error.message}`);
              }
              handleClose();
            }}
          >
            {(props) => (
              <Form className="w-full flex flex-col gap-2.5">
                <Field name="annual_leave_start_date">
                  {({ field, form }: any) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Leave Start Date"
                        format="DD/MM/YYYY"
                        minDate={dayjs()}
                        value={field.value}
                        onChange={(date) =>
                          form.setFieldValue("annual_leave_start_date", date)
                        }
                        slotProps={{
                          textField: {
                            property: { ...field },
                            variant: "standard",
                            error:
                              form.errors.annual_leave_start_date &&
                              form.touched.annual_leave_start_date,
                            helperText: form.errors.annual_leave_start_date,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                </Field>
                <Field name="annual_leave_end_date">
                  {({ field, form }: any) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Leave End Date"
                        format="DD/MM/YYYY"
                        minDate={dayjs().add(1, "day")}
                        disablePast
                        value={field.value}
                        onChange={(date) =>
                          form.setFieldValue("annual_leave_end_date", date)
                        }
                        slotProps={{
                          textField: {
                            property: { ...field },
                            variant: "standard",
                            error:
                              form.errors.annual_leave_end_date &&
                              form.touched.annual_leave_end_date,
                            helperText: form.errors.annual_leave_end_date,
                          },
                        }}
                      />
                    </LocalizationProvider>
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

export default AddAnnualLeave;
