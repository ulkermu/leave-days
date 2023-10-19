"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "next-themes";
import { darkTheme, lightTheme } from "@/theme";
import { CustomField, CustomLoading } from "../../components";
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

          console.log({
            values: updatedValues,
            uid: user.uid,
            create_date: dayjs(),
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
