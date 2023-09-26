"use client";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomField from "./CustomField";
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "next-themes";
import { darkTheme, lightTheme } from "@/theme";

const RegisterForm = () => {
  const { theme } = useTheme();

  const schema = Yup.object({
    firstName: Yup.string().required("Name is required."),
    lastName: Yup.string().required("Lastname is required."),
    email: Yup.string()
      .required("Email is required.")
      .email("Email format should be true."),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password be at least 6 char.")
      .max(15, "Password max be 15 char."),
  });

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <div className="flex justify-center">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(props) => (
            <Form className="rounded-lg max-w-md w-full flex flex-col gap-2.5 shadow-md p-5">
              <div className="flex gap-2.5">
                <Field name="firstName">
                  {({ field, form }: any) => (
                    <CustomField
                      field={field}
                      label="First Name"
                      type="text"
                      error={form.errors.firstName && form.touched.firstName}
                      text={form.errors.firstName}
                    />
                  )}
                </Field>
                <Field name="lastName">
                  {({ field, form }: any) => (
                    <CustomField
                      field={field}
                      label="Last Name"
                      type="text"
                      error={form.errors.lastName && form.touched.lastName}
                      text={form.errors.lastName}
                    />
                  )}
                </Field>
              </div>
              <Field name="email">
                {({ field, form }: any) => (
                  <CustomField
                    field={field}
                    label="Email"
                    type="email"
                    error={form.errors.email && form.touched.email}
                    text={form.errors.email}
                  />
                )}
              </Field>
              <Field name="password">
                {({ field, form }: any) => (
                  <CustomField
                    field={field}
                    label="Password"
                    type="password"
                    error={form.errors.password && form.touched.password}
                    text={form.errors.password}
                  />
                )}
              </Field>
              <Button
                type="submit"
                className="dark:bg-slate-600 dark:hover:bg-slate-800 bg-blue-500 hover:bg-blue-600 ease-out duration-150 py-1 px-2 rounded-md normal-case text-slate-200 dark:text-slate-200"
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </ThemeProvider>
  );
};

export default RegisterForm;
