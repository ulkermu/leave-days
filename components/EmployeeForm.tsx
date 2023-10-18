"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "next-themes";
import { darkTheme, lightTheme } from "@/theme";
import { CustomField, CustomLoading } from ".";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setEmployeeModal } from "@/app/redux/features/employee/employeeSlice";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  const schema = Yup.object({
    name: Yup.string().required("Employee name is required."),
    surname: Yup.string().required("Employee surname is required."),
    start_date: Yup.date().required("Employee age is required."),
  });

  const handleClose = () => {
    dispatch(setEmployeeModal(false));
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          start_date: new Date(),
        }}
        validationSchema={schema}
        onSubmit={async (values) => {
          setLoading(true);
          setTimeout(() => {
            console.log(values);
            setLoading(false);
            handleClose();
          }, 100);
        }}
      >
        {(props) => (
          <Form className="w-full flex flex-col gap-2.5">
            <Field name="name">
              {({ field, form }: any) => (
                <CustomField
                  field={field}
                  label="Name"
                  type="text"
                  error={form.errors.name && form.touched.name}
                  text={form.errors.name}
                />
              )}
            </Field>
            <Field name="surname">
              {({ field, form }: any) => (
                <CustomField
                  field={field}
                  label="Surname"
                  type="text"
                  error={form.errors.surname && form.touched.surname}
                  text={form.errors.surname}
                />
              )}
            </Field>
            <Field name="start_date">
              {({ field, form }: any) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        property: { ...field },
                        variant: "standard",
                        error:
                          form.errors.start_date && form.touched.start_date,
                        helperText:
                          form.errors.start_date &&
                          form.touched.start_date &&
                          form.errors.start_date,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            </Field>
            <div className="flex gap-2.5 w-full">
              <Button
                type="button"
                sx={{ textTransform: "none" }}
                onClick={handleClose}
                className="dark:bg-slate-600 dark:hover:bg-slate-800 bg-blue-500 hover:bg-blue-600 ease-out duration-150 py-1 px-2 rounded-md normal-case text-slate-200 dark:text-slate-200 w-full"
              >
                Cancel
              </Button>
              {loading ? (
                <CustomLoading
                  cCWidth={"100%"}
                  cCHeight={"36.5px"}
                  cWidth={"21px!important"}
                  cHeight={"21px!important"}
                />
              ) : (
                <Button
                  type="submit"
                  sx={{ textTransform: "none" }}
                  className="dark:bg-slate-600 dark:hover:bg-slate-800 bg-blue-500 hover:bg-blue-600 ease-out duration-150 py-1 px-2 rounded-md normal-case text-slate-200 dark:text-slate-200 w-full"
                >
                  Add
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </ThemeProvider>
  );
};

export default EmployeeForm;
