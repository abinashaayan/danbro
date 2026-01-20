import { useState, useEffect } from "react";
import { Box,  TextField, Button, IconButton } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import CloseIcon from "@mui/icons-material/Close";

export const DeliveryCheckDialog = ({ open, onClose }) => {
  const [pincode, setPincode] = useState("");

  const handleCheck = () => {
    if (pincode.trim()) {
      // Handle delivery check logic here
      console.log("Checking delivery for:", pincode);
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCheck();
    }
  };

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        animation: "fadeIn 0.3s ease-out",
        "@keyframes fadeIn": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      }}
      onClick={onClose}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: { xs: 3, md: 4 },
          width: { xs: "90%", sm: "500px", md: "600px" },
          maxWidth: "90%",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          position: "relative",
          animation: "slideUp 0.3s ease-out",
          "@keyframes slideUp": {
            "0%": {
              opacity: 0,
              transform: "translateY(20px)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#666",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.05)",
              color: "#000",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <CustomText
          sx={{
            fontSize: { xs: 22, md: 24 },
            fontWeight: 700,
            color: "#333",
            mb: 3,
            mt: 1,
          }}
        >
          Check Delivery First
        </CustomText>

        <TextField
          fullWidth
          placeholder="Enter Pincode or Area"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& fieldset": {
                borderColor: "#ddd",
              },
              "&:hover fieldset": {
                borderColor: "#999",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--themeColor)",
              },
            },
            "& input": {
              fontSize: { xs: 14, md: 16 },
              padding: { xs: "12px 14px", md: "14px 16px" },
            },
          }}
        />

        <Button
          fullWidth
          onClick={handleCheck}
          disabled={!pincode.trim()}
          sx={{
            backgroundColor: "#e0e0e0",
            color: "#333",
            padding: { xs: "12px", md: "14px" },
            borderRadius: "8px",
            fontSize: { xs: 15, md: 16 },
            fontWeight: 600,
            textTransform: "none",
            border: "1px solid #ccc",
            "&:hover": {
              backgroundColor: "#d0d0d0",
            },
            "&:disabled": {
              backgroundColor: "#f0f0f0",
              color: "#999",
              borderColor: "#e0e0e0",
            },
          }}
        >
          Check
        </Button>
      </Box>
    </Box>
  );
};

