import { Snackbar, Alert, Box, CircularProgress } from "@mui/material";
import { CheckCircle, Error, Info, Warning } from "@mui/icons-material";

export const CustomToast = ({ open, onClose, message, severity = "success", loading = false }) => {
  const getIcon = () => {
    if (loading) {
      return (
        <CircularProgress
          size={20}
          sx={{
            color: severity === "error" ? "#f44336" : severity === "warning" ? "#ff9800" : "#4caf50",
            mr: 1,
          }}
        />
      );
    }

    switch (severity) {
      case "success":
        return <CheckCircle sx={{ fontSize: 20, mr: 1 }} />;
      case "error":
        return <Error sx={{ fontSize: 20, mr: 1 }} />;
      case "warning":
        return <Warning sx={{ fontSize: 20, mr: 1 }} />;
      case "info":
        return <Info sx={{ fontSize: 20, mr: 1 }} />;
      default:
        return <CheckCircle sx={{ fontSize: 20, mr: 1 }} />;
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={loading ? null : 3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{
        zIndex: 9999,
        "& .MuiSnackbarContent-root": {
          minWidth: "auto",
        },
      }}
    >
      <Alert
        onClose={loading ? undefined : onClose}
        severity={severity}
        icon={getIcon()}
        sx={{
          width: "100%",
          minWidth: { xs: "280px", sm: "320px" },
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          borderRadius: 2,
          fontSize: { xs: 14, sm: 15 },
          fontWeight: 500,
          "& .MuiAlert-icon": {
            alignItems: "center",
          },
          "& .MuiAlert-message": {
            display: "flex",
            alignItems: "center",
            width: "100%",
          },
          animation: loading
            ? "pulse 1.5s ease-in-out infinite"
            : "slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          "@keyframes slideInUp": {
            "0%": {
              transform: "translateY(100px) scale(0.9)",
              opacity: 0,
            },
            "100%": {
              transform: "translateY(0) scale(1)",
              opacity: 1,
            },
          },
          "@keyframes pulse": {
            "0%, 100%": {
              opacity: 1,
              transform: "scale(1)",
            },
            "50%": {
              opacity: 0.9,
              transform: "scale(0.98)",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          {message}
        </Box>
      </Alert>
    </Snackbar>
  );
};

