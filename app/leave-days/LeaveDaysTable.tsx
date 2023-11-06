"use client";

import { ConvertToAge, ConvertToYearsWorked } from "@/utils/ConvertDate";
import {
  Box,
  IconButton,
  PaletteMode,
  ThemeProvider,
  Tooltip,
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
import { useTheme } from "next-themes";
import { useDispatch } from "react-redux";
import {
  setAnnualLeave,
  setAnnualLeaveModal,
  setEmpID,
  setPastLeavesData,
  setPastLeavesModal,
  setRegularLeaveModal,
} from "../redux/features/employee/employeeSlice";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { EmployeeLeave } from "@/types";
import toast from "react-hot-toast";
import Link from "next/link";
import { CustomNavLink } from "@/components";

const LeaveDaysTable = () => {
  const db = getFirestore();
  const dispatch = useDispatch();
  const isDark = useTheme();
  const mode: PaletteMode = isDark.theme === "dark" ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const employee = useSelector((state: RootState) => state.employee);
  const employees = employee.employees;

  const rows = employees.map((emp: any) => ({
    id: emp.id,
    lastName: emp.values.surname,
    firstName: emp.values.name,
    age: ConvertToAge(emp.values.birth_date),
    birth_date: emp.values.birth_date,
    start_date: emp.values.start_date,
    years_worked: emp.values.start_date,
    annual_leave: emp.annual_leave,
  }));

  const handleAddAnnualLeave = (data: any) => {
    dispatch(setEmpID(data.id));
    dispatch(setAnnualLeaveModal(true));
    dispatch(setAnnualLeave(data.annual_leave));
  };

  const handleAddRegularLeave = (data: any) => {
    dispatch(setRegularLeaveModal(true));
    dispatch(setEmpID(data.id));
  };

  const handleReviewPastLeaves = async (data: any) => {
    const leaves: EmployeeLeave[] = [];

    try {
      const q = query(collection(db, "employees", data.id, "leaves"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        leaves.push({
          id: doc.id,
          ...(doc.data() as Omit<EmployeeLeave, "id">),
        });
      });
      if (leaves.length > 0) {
        const serializedLeaves = leaves.map((leave) => ({
          ...leave,
          leave_start_date: leave.leave_start_date.toDate().toISOString(),
          leave_end_date: leave.leave_end_date.toDate().toISOString(),
        }));
        dispatch(setPastLeavesData(serializedLeaves));
        dispatch(setPastLeavesModal(true));
      } else return toast.error("This employee hasn't taken any leave so far.");
    } catch (error: any) {
      toast.error("Error fetching employee leaves: ", error);
      dispatch(setPastLeavesData([]));
      dispatch(setPastLeavesModal(false));
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 90 },
    {
      field: "fullName",
      headerName: "Full name",
      flex: 1,
      minWidth: 90,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      maxWidth: 45,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "years_worked",
      headerName: "Years Worked",
      flex: 1,
      minWidth: 90,
      valueGetter: (params: GridValueGetterParams) =>
        ConvertToYearsWorked(params.row.years_worked),
    },
    {
      field: "annual_leave_entitlement",
      headerName: "Remaining Leave",
      flex: 1,
      minWidth: 90,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.annual_leave.annual_leave_entitlement,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 90,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Tooltip title="Annual Leave">
            <IconButton onClick={() => handleAddAnnualLeave(params.row)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-orange-600 dark:text-orange-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
            </IconButton>
          </Tooltip>
          <Tooltip title="Regular Leave">
            <IconButton onClick={() => handleAddRegularLeave(params.row)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </IconButton>
          </Tooltip>
          <Tooltip title="Past & Planned Leaves">
            <IconButton onClick={() => handleReviewPastLeaves(params.row)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-blue-600 dark:text-blue-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
              </svg>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {rows.length === 0 ? (
          <p className="text-center">
            If there are no employees, then no one can take a day off. If you
            agree with me, let's head over to the{" "}
            <CustomNavLink
              href={"/employees"}
              title="employees"
              containerStyles="text-blue-500 hover:text-blue-700 duration-150 ease-out dark:text-blue-300 dark:hover:text-blue-500"
            />{" "}
            page!
          </p>
        ) : (
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
                    sort: "asc",
                  },
                ],
              },
            }}
            pageSizeOptions={[25, 50, 100]}
            disableRowSelectionOnClick
            className="dark:text-white"
          />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default LeaveDaysTable;
