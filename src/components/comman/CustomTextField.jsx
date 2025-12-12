import { TextField } from "@mui/material";

export const CustomTextField = ({ ...props }) => {
  return (
    <TextField
      {...props}
      sx={{
        mb: 2,
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#fff",
          borderRadius: "12px",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
          "&.Mui-focused": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(95,41,48,0.2)",
          },
        },
        "& .MuiInputLabel-root": {
          fontWeight: 500,
        },
        ...props.sx,
      }}
    />
  );
};

