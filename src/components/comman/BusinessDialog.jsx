import { Box, Button, IconButton, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
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

  const businessCards = [
    {
      title: "Something About Us",
      description:
        "Danbro by Mr. Brown Bakery brings you oven-fresh goodness inspired by tradition and baked with heart. We believe in slow baking, honest ingredients, and creating moments worth savoring.",
      buttonText: "Click Here",
      link: "/about-us",
      onClick: handleClickHere,
    },
    {
      title: "Danbro B2B",
      description:
        "Danbro by Mr. Brown Bakery delivers fresh, high quality baked goods tailored for businesses. We're your reliable Business to Business partner, committed to consistency, taste and timely supply.",
      buttonText: "Inquire Now",
      link: "/danbro-fresh-b2b",
      onClick: handleInquireNow,
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="business-dialog-title"
      aria-describedby="business-dialog-description"
      scroll="paper"
      maxWidth={false}
      PaperProps={{
        sx: {
          margin: { xs: 1, sm: 2 },
          width: "100%",
          maxWidth: { xs: "calc(100% - 16px)", sm: 900, md: 1000 },
          maxHeight: "calc(100vh - 32px)",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          overflow: "hidden",
        },
      }}
      slotProps={{
        backdrop: {
          sx: { backdropFilter: "blur(4px)" },
        },
      }}
      sx={{
        zIndex: 10000,
        "& .MuiDialog-container": {
          alignItems: "center",
          justifyContent: "center",
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
          px: { xs: 2, sm: 3 },
          py: 2,
          borderBottom: "1px solid rgba(211, 47, 47, 0.12)",
          background: "linear-gradient(135deg, #fff5f3 0%, #ffe8e4 100%)",
        }}
      >
        <CustomText component="span" sx={{ fontSize: { xs: 18, md: 20 }, fontWeight: 700, color: "#333" }}>
          Business
        </CustomText>
        <IconButton
          onClick={onClose}
          aria-label="Close"
          size="small"
          sx={{
            color: "#666",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.06)", color: "#333" },
          }}
        >
          <CloseIcon sx={{ fontSize: 22 }} />
        </IconButton>
      </DialogTitle>

      {/* modal-body */}
      <DialogContent
        id="business-dialog-description"
        sx={{ overflowY: "auto", px: { xs: 2, sm: 3 }, pt: 2.5, pb: 1 }}
      >
        <Grid container spacing={{ xs: 2, md: 3 }} alignItems="stretch">
          {businessCards?.map((card, index) => (
            <Grid key={index} size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  backgroundColor: "var(--themeColor)",
                  borderRadius: { xs: "16px", md: "20px" },
                  padding: { xs: 3, md: 4 },
                  height: "100%",
                  boxShadow: "0 8px 30px rgba(95,41,48,0.3)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 40px rgba(95,41,48,0.4)",
                  },
                }}
              >
                <CustomText sx={{ fontSize: { xs: 24, sm: 28, md: 32 }, fontWeight: 700, color: "#fff", lineHeight: 1.2, mb: { xs: 2, md: 3 } }}>
                  {card?.title}
                </CustomText>
                <CustomText sx={{ fontSize: { xs: 14, md: 16 }, color: "#fff", lineHeight: 1.8, opacity: 0.95, mb: { xs: 3, md: 4 } }}>
                  {card?.description}
                </CustomText>
                <Link to={card?.link} className="link-no-decoration">
                  <Button
                    onClick={card?.onClick}
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
                    <CampaignIcon sx={{ color: "#5F2930", fontSize: { xs: 30, md: 32 } }} />
                    <CustomText sx={{ color: "#000", fontWeight: 600 }}>
                      {card?.buttonText}
                    </CustomText>
                  </Button>
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      {/* modal-footer */}
      <DialogActions sx={{ px: { xs: 2, sm: 3 }, py: 2, borderTop: "1px solid #eee", gap: 1 }}>
        <Button onClick={onClose} color="inherit" sx={{ textTransform: "none" }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

