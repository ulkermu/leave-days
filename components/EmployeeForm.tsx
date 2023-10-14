"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "next-themes";
import { darkTheme, lightTheme } from "@/theme";
import { CustomField, CustomLoading } from ".";
import { useState } from "react";

const EmployeeForm = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  const schema = Yup.object({
    name: Yup.string().required("Employee name is required."),
    surname: Yup.string().required("Employee surname is required."),
    birth_date: Yup.string().required("Employee age is required"),
  });

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <div className="flex justify-center">
        <Formik
          initialValues={{
            name: "",
            surname: "",
            birth_date: "",
          }}
          validationSchema={schema}
          onSubmit={async (values) => {
            setLoading(true);
            setTimeout(() => {
              console.log(values.name, values.surname, values.birth_date);
              setLoading(false);
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
              <Field name="birth_date">
                {({ field, form }: any) => (
                  <CustomField
                    field={field}
                    type="text"
                    label="Age"
                    error={form.errors.age && form.touched.age}
                    text={form.errors.age}
                  />
                )}
              </Field>
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
                  className="dark:bg-slate-600 dark:hover:bg-slate-800 bg-blue-500 hover:bg-blue-600 ease-out duration-150 py-1 px-2 rounded-md normal-case text-slate-200 dark:text-slate-200"
                >
                  Add
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </ThemeProvider>
  );
};

export default EmployeeForm;
