import React from "react";
import { Box, Button } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";

export const EmptyCart = ({ navigate }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: { xs: 8, md: 12 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <ShoppingCartIcon sx={{ fontSize: { xs: 64, md: 96 }, color: "#ddd" }} />
      <CustomText sx={{ fontSize: { xs: 18, md: 24 }, fontWeight: 600, color: "#666" }}>
        Your cart is empty
      </CustomText>
      <Link to="/home" className="link-no-decoration">
      <Button
        variant="contained"
        sx={{
          backgroundColor: "var(--themeColor)",
          color: "#fff",
          textTransform: "none",
          px: { xs: 4, md: 6 },
          py: { xs: 1.2, md: 1.5 },
          fontSize: { xs: 14, md: 16 },
          fontWeight: 600,
          mt: 2,
          "&:hover": {
            backgroundColor: "var(--specialColor)",
          },
        }}
      >
        Continue Shopping
      </Button>
      </Link>
    </Box>
  );
};
