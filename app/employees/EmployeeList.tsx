"use client";

import {
  Box,
  Button,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ConvertToAge, ConvertToYearsWorked } from "@/utils/ConvertDate";
import { useDispatch } from "react-redux";
import { useTheme } from "next-themes";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const EmployeeList = () => {
  const employee = useSelector((state: RootState) => state.employee);
  const employees = employee.employees;

  const initialRows = employees.map((emp: any) => ({
    id: emp.id,
    lastName: emp.values.surname,
    firstName: emp.values.name,
    age: ConvertToAge(emp.values.birth_date),
    start_date: emp.values.start_date,
    years_worked: emp.values.start_date,
  }));

  const [rows, setRows] = useState<any>(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [mounted, setMounted] = useState<boolean>(false);

  const isDark = useTheme();
  const mode: PaletteMode = isDark.theme === "dark" ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const dispatch = useDispatch();

  const handleDeleteEmployee = () => {
    alert("Will be fired, don't worry");
  };

  const columns: GridColDef[] = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 120,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 120,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      type: "date",
      width: 120,
      editable: true,
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
  ];

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row: any) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row: any) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: any) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row: any) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  useEffect(() => {
    if (initialRows?.length > 0 && !mounted) {
      setRows(initialRows);
      setMounted(true);
    }
  }, [mounted, initialRows?.length]);

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
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default EmployeeList;
