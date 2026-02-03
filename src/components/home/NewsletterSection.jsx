import { Box, Container, TextField, Button } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import { useState, useEffect, useRef } from "react";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Newsletter subscription logic here
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 1, md: 4 },
        bgcolor: "var(--themeColor)",
        position: "relative",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        borderRadius: 5,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 30% 50%, rgba(255,181,161,0.2) 0%, transparent 50%)",
          pointerEvents: "none",
          animation: visible ? "gradientShift 8s ease infinite" : "none",
          "@keyframes gradientShift": {
            "0%, 100%": { opacity: 0.8 },
            "50%": { opacity: 1 },
          },
        },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 }, position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            textAlign: "center",
            maxWidth: 700,
            mx: "auto",
            mb: 4,
          }}
        >
          {/* Icon with Animation */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "rgba(255, 255, 255, 0.2)",
              animation: visible ? "floatIcon 3s ease-in-out infinite" : "none",
              "@keyframes floatIcon": {
                "0%, 100%": { transform: "translateY(0px)" },
                "50%": { transform: "translateY(-10px)" },
              },
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                bgcolor: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            <EmailIcon sx={{ fontSize: 40, color: "#fff" }} />
          </Box>

          {/* Title */}
          <CustomText
            sx={{
              fontSize: { xs: 28, sm: 34, md: 42 },
              fontWeight: 800,
              color: "#fff",
            }}
          >
            Subscribe to Our Newsletter
          </CustomText>

          {/* Description */}
          <CustomText
            sx={{
              fontSize: { xs: 14, md: 16 },
              color: "rgba(255, 255, 255, 0.9)",
              mb: 2,
              lineHeight: 1.6,
            }}
          >
            Get the latest updates on new products, special offers, and exclusive deals delivered straight to your inbox
          </CustomText>

          {/* Newsletter Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            <TextField
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              required
              sx={{
                flex: 1,
                bgcolor: "#fff",
                borderRadius: 2,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: focused ? "scale(1.02)" : "scale(1)",
                boxShadow: focused ? "0 8px 25px rgba(0,0,0,0.15)" : "0 4px 15px rgba(0,0,0,0.1)",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "& fieldset": {
                    border: "none",
                  },
                  "&:focus-within": {
                    transform: "scale(1.02)",
                  },
                },
              }}
            />
            <Button
              type="submit"
              endIcon={<SendIcon />}
              sx={{
                bgcolor: "#fff",
                color: "var(--themeColor)",
                px: { xs: 4, md: 5 },
                py: { xs: 1.2, md: 1.5 },
                borderRadius: 2,
                fontWeight: 700,
                fontSize: { xs: 15, md: 16 },
                textTransform: "none",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 0,
                  height: 0,
                  borderRadius: "50%",
                  background: "rgba(95,41,48,0.1)",
                  transform: "translate(-50%, -50%)",
                  transition: "width 0.6s ease, height 0.6s ease",
                },
                "&:hover": {
                  bgcolor: "#f5f5f5",
                  transform: "translateY(-3px) scale(1.03)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                  "&::before": {
                    width: 300,
                    height: 300,
                  },
                  "& .MuiButton-endIcon": {
                    transform: "translateX(5px)",
                  },
                },
                "&:active": {
                  transform: "translateY(-1px) scale(1.01)",
                },
                "& .MuiButton-endIcon": {
                  transition: "transform 0.3s ease",
                },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

