import { Box, Button, IconButton, Grid, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import CloseIcon from "@mui/icons-material/Close";
import CampaignIcon from "@mui/icons-material/Campaign";
import { Link } from "react-router-dom";

export const BusinessDialog = ({ open, onClose }) => {
  const handleClickHere = () => {
    onClose();
  };

  const handleInquireNow = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="business-dialog-title"
      aria-describedby="business-dialog-description"
      scroll="paper"
      maxWidth={false}
      sx={{
        "& .MuiDialog-container": {
          alignItems: "center",
          justifyContent: "center",
        },
      }}
      PaperProps={{
        sx: {
          margin: { xs: 1, sm: 2 },
          width: "100%",
          maxWidth: { xs: "calc(100% - 16px)", sm: 900, md: 1000 },
          maxHeight: "calc(100vh - 32px)",
          borderRadius: 2,
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          overflow: "hidden",
        },
      }}
    >
      {/* modal-header */}
      <DialogTitle
        id="business-dialog-title"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 1.5,
          px: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <CustomText sx={{ fontSize: 18, fontWeight: 600, color: "var(--themeColor)" }}>
          Business
        </CustomText>
        <IconButton
          onClick={onClose}
          aria-label="Close"
          sx={{
            color: "text.secondary",
            "&:hover": { backgroundColor: "action.hover" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* modal-body */}
      <DialogContent id="business-dialog-description" sx={{ overflowY: "auto", my: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                backgroundColor: "var(--themeColor)",
                borderRadius: { xs: "16px", md: "20px" },
                padding: { xs: 3, md: 4 },
                height: "100%",
                // display: "flex",
                // flexDirection: "column",
                // justifyContent: "space",
                // minHeight: { xs: "300px", md: "400px" },
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 40px rgba(95,41,48,0.4)",
                },
              }}
            >
              <Box>
                <CustomText sx={{ fontSize: { xs: 24, sm: 28, md: 32 }, fontWeight: 700, color: "#fff", lineHeight: 1.2, mb:4 }}>
                  Something About Us
                </CustomText>
                <CustomText sx={{ fontSize: { xs: 14, md: 16 }, color: "#fff", lineHeight: 1.8, opacity: 0.95, }}>
                  Danbro by Mr. Brown Bakery brings you oven-fresh goodness inspired by tradition and baked with heart, We believe in slow baking, honest ingredients, and creating moments worth savoring.
                </CustomText>
              </Box>
              <Link to="/about-us" className="link-no-decoration">
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
                  <CampaignIcon sx={{ color: "#FFB5A1", fontSize: { xs: 30, md: 32 } }} />
                  <CustomText sx={{ color: "#000", fontWeight: 600 }}>
                    Click Here
                  </CustomText>
                </Button>
              </Link>
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
              <Link to="/danbro-fresh-b2b" className="link-no-decoration">
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
                  <CampaignIcon sx={{ color: "#FFB5A1", fontSize: { xs: 30, md: 32 } }} />
                  <CustomText sx={{ color: "#000", fontWeight: 600 }}>
                    Inquire Now
                  </CustomText>
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      {/* modal-footer - optional; primary actions are inside body */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          px: 2,
          py: 1.5,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Button onClick={onClose} color="inherit" sx={{ textTransform: "none" }}>
          Close
        </Button>
      </Box>
    </Dialog>
  );
};

