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
  setAnnualLeaveModal,
  setEmpID,
  setPastLeavesData,
  setPastLeavesModal,
  setRegularLeaveModal,
} from "../redux/features/employee/employeeSlice";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { EmployeeLeave } from "@/types";
import toast from "react-hot-toast";

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
  }));

  const handleAddAnnualLeave = (data: any) => {
    dispatch(setEmpID(data.id));
    dispatch(setAnnualLeaveModal(true));
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
          <Tooltip title="Past Leaves">
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
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
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
          <p className="text-center">Employee not found.</p>
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
