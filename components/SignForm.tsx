"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, CircularProgress } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "next-themes";
import { darkTheme, lightTheme } from "@/theme";
import { signIn, signUp } from "@/app/firabase";
import { CustomField } from ".";
import { usePathname, useRouter } from "next/navigation";
import { setAuth } from "@/app/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";

const SignForm = () => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const isSignInPage = pathname === "/login";

  const schema = Yup.object({
    email: Yup.string()
      .required("Email is required.")
      .email("Email format should be true."),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password be at least 6 char.")
      .max(14, "Password max be 14 char."),
  });

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
            if (isSignInPage) {
              const user = await signIn(values.email, values.password);
              dispatch(setAuth(user?.uid));
              toast.success("You're In!");
              setLoading(false);
              router.push("/dashboard");
            } else {
              await signUp(values.email, values.password);
              setLoading(false);
              toast.success("You are a member now!");
              router.push("/");
            }
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
                <CircularProgress />
              ) : (
                <Button
                  type="submit"
                  className="dark:bg-slate-600 dark:hover:bg-slate-800 bg-blue-500 hover:bg-blue-600 ease-out duration-150 py-1 px-2 rounded-md normal-case text-slate-200 dark:text-slate-200"
                >
                  {isSignInPage ? "Sign In" : "Sign Up"}
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </ThemeProvider>
  );
};

export default SignForm;
