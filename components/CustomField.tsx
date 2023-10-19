import { TextField } from "@mui/material";

const CustomField = ({ field, label, type, error, text, values }: any) => {
  return (
    <TextField
      {...field}
      label={label}
      type={type}
      error={error}
      helperText={error && text}
      size="small"
      variant="standard"
      autoComplete="off"
    />
  );
};

export default CustomField;
