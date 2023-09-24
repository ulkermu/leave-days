import { TextField, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          borderRadius: "0.5rem",
          borderColor:'red'
        },
      },
    },
  },
});

const CustomField = ({ field, label, type, error, text }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        {...field}
        label={label}
        type={type}
        error={error}
        helperText={error && text}
        size="small"
        variant="standard"
      />
    </ThemeProvider>
  );
};

export default CustomField;
