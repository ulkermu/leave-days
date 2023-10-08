import { CircularProgress } from "@mui/material";

const CustomLoading = ({ cCWidth, cCHeight, cWidth, cHeight }: any) => {
  return (
    <div
      style={{
        width: cCWidth,
        height: cCHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress
        sx={{
          width: cWidth,
          height: cHeight,
        }}
      />
    </div>
  );
};

export default CustomLoading;
