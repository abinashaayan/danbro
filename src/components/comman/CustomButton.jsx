import { Button } from "@mui/material";

export const CustomButton = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      sx={{
        backgroundColor: "#FF9472",
        color: "#fff",
        py: { xs: 1.2, md: 1.5 },
        borderRadius: "12px",
        fontSize: { xs: 16, md: 18 },
        fontWeight: 700,
        textTransform: "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0 4px 15px rgba(255,148,114,0.3)",
        "&:hover": {
          backgroundColor: "#F2709C",
          transform: "translateY(-3px)",
          boxShadow: "0 8px 25px rgba(255,148,114,0.5)",
        },
        "&:disabled": {
          backgroundColor: "#ccc",
          color: "#999",
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

