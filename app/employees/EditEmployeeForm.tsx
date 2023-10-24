import { Formik, Form, Field } from "formik";
import {
  Button,
  Modal,
  PaletteMode,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { CustomButton, CustomLoading } from "@/components";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setEmployeeEditModal } from "../redux/features/employee/employeeSlice";
import { RootState } from "../redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import { editEmployee } from "../firabase";

interface EmployeeRow {
  id?: string;
  firstName?: string;
  lastName?: string;
  start_date?: any;
  birth_date?: any;
}

const EditEmployeeForm = () => {
  const row: EmployeeRow = useSelector(
    (state: RootState) => state.employee.empRow
  );
  const isDark = useTheme();
  const mode: PaletteMode = isDark.theme === "dark" ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const editModal = useSelector((state: RootState) => state.employee.editModal);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setLoading(false);
    dispatch(setEmployeeEditModal(false));
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        className="h-screen flex items-center w-full justify-center"
        open={editModal}
        onClose={handleClose}
      >
        <div className="m-auto max-w-xl	w-full bg-white dark:bg-slate-700 p-5 rounded-md m-5">
          <Formik
            initialValues={{
              name: row?.firstName,
              surname: row?.lastName,
              start_date: dayjs(row.start_date),
              birth_date: dayjs(row.birth_date),
            }}
            onSubmit={async (values) => {
              // Convert Day.js object to JavaScript Date object
              const startDateAsDate = values.start_date.toDate();
              const birthDateAsDate = values.birth_date.toDate();

              // Create a new object and update date fields with the converted values
              const updatedValues = {
                values: {
                  name: values.name,
                  surname: values.surname,
                  start_date: startDateAsDate,
                  birth_date: birthDateAsDate,
                },
              };

              await editEmployee(row?.id, updatedValues);
              handleClose();
            }}
          >
            {(props) => (
              <Form className="w-full flex flex-col gap-2.5">
                <Field name="name">
                  {({ field, form }: any) => (
                    <TextField
                      {...field}
                      label="First name"
                      type="text"
                      value={field.value}
                      onChange={(e) =>
                        form.setFieldValue("name", e.target.value)
                      }
                      error={form.errors.name && form.touched.name}
                      text={form.errors.name}
                      size="small"
                      variant="standard"
                      autoComplete="off"
                    />
                  )}
                </Field>
                <Field name="surname">
                  {({ field, form }: any) => (
                    <TextField
                      {...field}
                      label="Last name"
                      type="text"
                      value={field.value}
                      onChange={(e) =>
                        form.setFieldValue("surname", e.target.value)
                      }
                      error={form.errors.surname && form.touched.surname}
                      text={form.errors.surname}
                      size="small"
                      variant="standard"
                      autoComplete="off"
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
                        onChange={(date) =>
                          form.setFieldValue("birth_date", date)
                        } // Burada kullanıcının seçtiği tarihi Formik state'ine aktarıyoruz
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
                        onChange={(date) =>
                          form.setFieldValue("start_date", date)
                        } // Burada kullanıcının seçtiği tarihi Formik state'ine aktarıyoruz
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
                      cCHeight={"36.5px"}
                      cWidth={"21px!important"}
                      cHeight={"21px!important"}
                    />
                  ) : (
                    <CustomButton
                      title="Update"
                      containerStyles="text-green-500 dark:text-green-300 bg-green-50 hover:bg-green-100"
                      type="submit"
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
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
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

export default EditEmployeeForm;
