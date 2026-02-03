import React from "react";
import { Box, Container, Button } from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import { Cancel as CancelIcon } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const message =
    searchParams.get("message") ||
    "Your payment could not be completed. No amount has been deducted.";

  return (
    <Box sx={{ minHeight: "60vh", py: 6, px: 2 }}>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center" }}>
          <CancelIcon sx={{ fontSize: 72, color: "#d32f2f", mb: 2 }} />
          <CustomText variant="h5" sx={{ fontWeight: 700, color: "#2c2c2c", mb: 2 }}>
            Payment Failed
          </CustomText>
          <CustomText sx={{ fontSize: 15, color: "#666", mb: 3 }}>
            {message}
          </CustomText>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
            <Button
              variant="contained"
              onClick={() => navigate("/cart")}
              sx={{
                backgroundColor: "var(--themeColor)",
                textTransform: "none",
                px: 3,
                py: 1.5,
                minWidth: 200,
                "&:hover": { backgroundColor: "var(--specialColor)" },
              }}
            >
              Try Again (Back to Cart)
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/")}
              sx={{
                borderColor: "var(--themeColor)",
                color: "var(--themeColor)",
                textTransform: "none",
                minWidth: 200,
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PaymentFailure;
