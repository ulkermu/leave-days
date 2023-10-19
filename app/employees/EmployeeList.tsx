"use client";

import {
  Box,
  IconButton,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ConvertToAge, ConvertToYearsWorked } from "@/utils/ConvertDate";
import { useDispatch } from "react-redux";
import { useTheme } from "next-themes";

const EmployeeList = () => {
  const employee = useSelector((state: RootState) => state.employee);
  const employees = employee.employees;

  const isDark = useTheme();
  const mode: PaletteMode = isDark.theme === "dark" ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const dispatch = useDispatch();

  const handleDeleteEmployee = () => {
    console.log("Will be fired, don't worry");
  };

  const handleEditEmployee = () => {
    console.log("Will be edit");
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 120,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 120,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      type: "date",
      width: 120,
      valueGetter: (params: GridValueGetterParams) =>
        new Date(params.row.start_date),
    },
    {
      field: "years_worked",
      headerName: "Years Worked",
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        ConvertToYearsWorked(params.row.years_worked),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton onClick={handleEditEmployee}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 text-indigo-600 dark:text-indigo-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </IconButton>
          <IconButton onClick={handleDeleteEmployee}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 text-red-600 dark:text-red-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </IconButton>
        </>
      ),
    },
  ];

  const rows = employees.map((emp: any) => ({
    id: emp.id,
    lastName: emp.values.surname,
    firstName: emp.values.name,
    age: ConvertToAge(emp.values.birth_date),
    start_date: emp.values.start_date,
    years_worked: emp.values.start_date,
  }));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 100,
              },
            },
            sorting: {
              sortModel: [
                {
                  field: "start_date",
                  sort: "asc", // 'asc' for ascending order
                },
              ],
            },
          }}
          pageSizeOptions={[25, 50, 100]}
          checkboxSelection
          disableRowSelectionOnClick
          className="dark:text-white"
        />
      </Box>
    </ThemeProvider>
  );
};

export default EmployeeList;
