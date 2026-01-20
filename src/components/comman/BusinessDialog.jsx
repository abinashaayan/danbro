import { useState } from "react";
import { Box,  Button, IconButton, Grid } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import CloseIcon from "@mui/icons-material/Close";
import CampaignIcon from "@mui/icons-material/Campaign";

export const BusinessDialog = ({ open, onClose }) => {
  const handleClickHere = () => {
    // Handle "Click Here" action
    console.log("Click Here clicked");
    onClose();
  };

  const handleInquireNow = () => {
    // Handle "Inquire Now" action
    console.log("Inquire Now clicked");
    onClose();
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
        p: { xs: 2, md: 3 },
      }}
      onClick={onClose}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: { xs: 3, md: 4 },
          width: "100%",
          maxWidth: { xs: "100%", sm: "900px", md: "1000px" },
          maxHeight: "90vh",
          overflowY: "auto",
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
            zIndex: 10,
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.05)",
              color: "#000",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {/* Something About Us Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                backgroundColor: "var(--themeColor)",
                borderRadius: { xs: "16px", md: "20px" },
                padding: { xs: 3, md: 4 },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: { xs: "300px", md: "400px" },
                boxShadow: "0 8px 30px rgba(95,41,48,0.3)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 40px rgba(95,41,48,0.4)",
                },
              }}
            >
              <Box>
                <CustomText
                  sx={{
                    fontSize: { xs: 24, sm: 28, md: 32 },
                    fontWeight: 700,
                    color: "#fff",
                    mb: { xs: 2, md: 3 },
                    lineHeight: 1.2,
                  }}
                >
                  Something About Us
                </CustomText>
                <CustomText
                  sx={{
                    fontSize: { xs: 14, md: 16 },
                    color: "#fff",
                    lineHeight: 1.8,
                    opacity: 0.95,
                  }}
                >
                  Danbro by Mr. Brown Bakery brings you oven-fresh goodness inspired by tradition and baked with heart, We believe in slow baking, honest ingredients, and creating moments worth savoring.
                </CustomText>
              </Box>
              <Button
                onClick={handleClickHere}
                sx={{
                  backgroundColor: "#fff",
                  color: "#000",
                  borderRadius: "8px",
                  padding: { xs: "12px 20px", md: "14px 24px" },
                  fontSize: { xs: 14, md: 16 },
                  fontWeight: 600,
                  textTransform: "none",
                  mt: { xs: 3, md: 4 },
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <CampaignIcon sx={{ color: "#FFB5A1", fontSize: { xs: 20, md: 22 } }} />
                <CustomText sx={{ color: "#000", fontWeight: 600 }}>
                  Click Here
                </CustomText>
              </Button>
            </Box>
          </Grid>

          {/* Danbro B2B Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                backgroundColor: "var(--themeColor)",
                borderRadius: { xs: "16px", md: "20px" },
                padding: { xs: 3, md: 4 },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: { xs: "300px", md: "400px" },
                boxShadow: "0 8px 30px rgba(95,41,48,0.3)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 40px rgba(95,41,48,0.4)",
                },
              }}
            >
              <Box>
                <CustomText
                  sx={{
                    fontSize: { xs: 24, sm: 28, md: 32 },
                    fontWeight: 700,
                    color: "#fff",
                    mb: { xs: 2, md: 3 },
                    lineHeight: 1.2,
                  }}
                >
                  Danbro B2B
                </CustomText>
                <CustomText
                  sx={{
                    fontSize: { xs: 14, md: 16 },
                    color: "#fff",
                    lineHeight: 1.8,
                    opacity: 0.95,
                  }}
                >
                  Danbro by Mr. Brown Bakery delivers fresh, high quality baked goods tailored for businesses, We're your reliable Business to Business partner, committed to consistency, taste and timely supply.
                </CustomText>
              </Box>
              <Button
                onClick={handleInquireNow}
                sx={{
                  backgroundColor: "#fff",
                  color: "#000",
                  borderRadius: "8px",
                  padding: { xs: "12px 20px", md: "14px 24px" },
                  fontSize: { xs: 14, md: 16 },
                  fontWeight: 600,
                  textTransform: "none",
                  mt: { xs: 3, md: 4 },
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <CampaignIcon sx={{ color: "#FFB5A1", fontSize: { xs: 20, md: 22 } }} />
                <CustomText sx={{ color: "#000", fontWeight: 600 }}>
                  Inquire Now
                </CustomText>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

