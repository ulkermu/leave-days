"use client";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import CustomField from "../registerForm/CustomField";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "next-themes";
import { darkTheme, lightTheme } from "@/theme";

const LoginForm = () => {
  const { theme } = useTheme();

  const schema = Yup.object({
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
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={schema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(props) => (
            <Form className="flex flex-col gap-2.5 max-w-md border p-5 rounded-lg">
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
              <Button className="dark:bg-slate-600 dark:hover:bg-slate-800 bg-blue-500 hover:bg-blue-600 ease-out duration-150 py-1 px-2 rounded-md normal-case text-slate-200 dark:text-slate-200">
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </ThemeProvider>
  );
};

export default LoginForm;
