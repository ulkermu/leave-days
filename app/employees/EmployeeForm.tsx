"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "next-themes";
import { darkTheme, lightTheme } from "@/theme";
import { CustomButton, CustomField, CustomLoading } from "../../components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setEmployeeModal } from "@/app/redux/features/employee/employeeSlice";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { addEmployee } from "@/app/firabase";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { AuthState } from "@/app/redux/features/auth/authSlice";
import dayjs from "dayjs";
import { ConvertToAge } from "@/utils/ConvertDate";

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const { user }: AuthState = useSelector((state: RootState) => state.auth);

  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  const schema = Yup.object({
    name: Yup.string().required("Employee name is required."),
    surname: Yup.string().required("Employee surname is required."),
    start_date: Yup.date().required("Employee start date is requiered."),
    birth_date: Yup.date()
      .required("Employee birth date is required.")
      .test(
        "is-older-than-18",
        "Employee must be at least 18 years old.",
        (value: any) => {
          if (!value) return false;
          return ConvertToAge(value) >= 18;
        }
      ),
  });

  const handleClose = () => {
    setLoading(false);
    dispatch(setEmployeeModal(false));
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          start_date: dayjs(),
          birth_date: dayjs().subtract(18, "year"),
        }}
        validationSchema={schema}
        onSubmit={async (values) => {
          setLoading(true);

          // Convert Day.js object to JavaScript Date object
          const startDateAsDate = values.start_date.toDate();
          const birthDateAsDate = values.birth_date.toDate();

          // Create a new object and update date fields with the converted values
          const updatedValues = {
            ...values,
            start_date: startDateAsDate,
            birth_date: birthDateAsDate,
          };

          // Add the updated values and user ID to the database
          await addEmployee({
            values: updatedValues,
            uid: user.uid,
            create_date: dayjs().toDate(),
          });
          handleClose();
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
            <Field name="birth_date">
              {({ field, form }: any) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Birth Date"
                    maxDate={dayjs().subtract(18, "year")}
                    format="DD/MM/YYYY"
                    value={field.value} // Burada Formik'ten gelen value'yu set ediyoruz
                    onChange={(date) => form.setFieldValue("birth_date", date)} // Burada kullanıcının seçtiği tarihi Formik state'ine aktarıyoruz
                    slotProps={{
                      textField: {
                        property: { ...field },
                        variant: "standard",
                        error:
                          form.errors.birth_date && form.touched.birth_date,
                        helperText: form.errors.birth_date,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            </Field>
            <Field name="start_date">
              {({ field, form }: any) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    format="DD/MM/YYYY"
                    value={field.value} // Burada Formik'ten gelen value'yu set ediyoruz
                    onChange={(date) => form.setFieldValue("start_date", date)} // Burada kullanıcının seçtiği tarihi Formik state'ine aktarıyoruz
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
                  title="Add"
                  containerStyles="text-green-500 dark:text-green-300 bg-green-50 hover:bg-green-100"
                  type="submit"
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
    </ThemeProvider>
  );
};

export default EmployeeForm;
