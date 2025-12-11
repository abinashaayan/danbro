import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect } from "react";

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f7f7f7 0%, #fef5f3 50%, #f7f7f7 100%)",
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: "center",
            animation: "fadeInUp 0.8s ease-out",
            "@keyframes fadeInUp": {
              "0%": {
                opacity: 0,
                transform: "translateY(30px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "120px", sm: "150px", md: "200px" },
              fontWeight: 900,
              color: "var(--themeColor)",
              lineHeight: 1,
              mb: 2,
              textShadow: "0 4px 20px rgba(95,41,48,0.2)",
            }}
          >
            404
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 24, sm: 28, md: 32 },
              fontWeight: 700,
              color: "#333",
              mb: 2,
            }}
          >
            Page Not Found
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, md: 16 },
              color: "#666",
              mb: 4,
              maxWidth: "500px",
              mx: "auto",
            }}
          >
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </Typography>
          <Button
            onClick={() => navigate("/")}
            startIcon={<HomeIcon />}
            sx={{
              backgroundColor: "var(--themeColor)",
              color: "#fff",
              px: { xs: 4, md: 5 },
              py: { xs: 1.2, md: 1.5 },
              borderRadius: "30px",
              fontSize: { xs: 14, md: 16 },
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 4px 15px rgba(95,41,48,0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "var(--themeColor)",
                transform: "translateY(-3px)",
                boxShadow: "0 6px 20px rgba(95,41,48,0.4)",
              },
            }}
          >
            Go Back Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

