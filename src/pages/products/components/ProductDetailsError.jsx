import { Box, Button } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { CustomText } from "../../../components/comman/CustomText";

export const ProductDetailsError = ({ error }) => {
  const isLocationError = error?.toLowerCase?.().includes("selected location");
  const displayMessage = error || "Product not found";

  return (
    <Box sx={{ pt: { xs: 8, sm: 7 }, px: { xs: 2, sm: 3, md: 6 }, py: 6, display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
      <Box sx={{ textAlign: "center" }}>
        <ErrorOutline sx={{ fontSize: 48, color: "error.main", mb: 2, display: "block", mx: "auto" }} />
        <CustomText sx={{ fontSize: 18, fontWeight: 700, color: "#c62828", mb: 1.5, display: "block" }}>
          Product unavailable
        </CustomText>
        <CustomText sx={{ fontSize: 15, color: "#444", lineHeight: 1.6, mb: isLocationError ? 2 : 0 }}>
          {displayMessage}
        </CustomText>
        {isLocationError && (
          <CustomText sx={{ display: "block", fontSize: 14, color: "#666", lineHeight: 1.5, mt: 1.5, px: 1 }}>
            You can change your delivery location from the header to check availability elsewhere.
          </CustomText>
        )}
        <RouterLink to="/home" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            sx={{
              mt: 3,
              borderColor: "var(--themeColor)",
              color: "var(--themeColor)",
              "&:hover": {
                borderColor: "var(--themeColor)",
                bgcolor: "rgba(95, 41, 48, 0.06)",
              },
            }}
          >
            Browse products
          </Button>
        </RouterLink>
      </Box>
    </Box>
  );
};
