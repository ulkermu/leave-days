"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "next-themes";
import { darkTheme, lightTheme } from "@/theme";
import { signIn } from "@/app/firabase";
import { CustomField, CustomLoading } from ".";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface signInValues {
  email: string;
  password: any;
}

const SignInForm = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const schema = Yup.object({
    email: Yup.string()
      .required("Email is required.")
      .email("Email format should be true."),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password be at least 6 char.")
      .max(14, "Password max be 14 char."),
  });

  const handleSubmit = async (values: signInValues) => {
    const user = await signIn(values.email, values.password);
    setLoading(false);
    if (user) {
      router.push("/dashboard");
    }
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <div className="flex justify-center">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={schema}
          onSubmit={async (values) => {
            setLoading(true);
            handleSubmit(values);
          }}
        >
          {(props) => (
            <Form className="rounded-lg max-w-md w-full flex flex-col gap-2.5 shadow-md p-5">
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
              {loading ? (
                <CustomLoading
                  cCHeight={"36.5px"}
                  cWidth={"21px!important"}
                  cHeight={"21px!important"}
                />
              ) : (
                <Button
                  type="submit"
                  sx={{ textTransform: "none" }}
                  className="dark:bg-slate-600 dark:hover:bg-slate-800 bg-blue-500 hover:bg-blue-600 ease-out duration-150 py-1 px-2 rounded-md normal-case text-slate-200 dark:text-slate-200"
                >
                  Sign In
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </ThemeProvider>
  );
};

export default SignInForm;
