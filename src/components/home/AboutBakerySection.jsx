import { Box, Container, Grid, Button } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PeopleIcon from "@mui/icons-material/People";
import planning from "../../assets/2f1c127d9f6293a74bd052f2c516c77a6713fa7f.jpg";
import logo from "../../assets/logo.png";

const features = [
  {
    icon: <LocalDiningIcon sx={{ fontSize: 40 }} />,
    title: "Fresh Ingredients",
    description: "We use only the finest, freshest ingredients in all our products",
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
    title: "Award Winning",
    description: "Recognized for excellence in bakery and confectionery",
  },
  {
    icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    title: "Expert Bakers",
    description: "Our skilled bakers bring years of experience to every creation",
  },
];

export const AboutBakerySection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    
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

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 2, md: 6 },
        position: "relative",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          {/* Left Side - Image with Slide Animation */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              ref={imageRef}
              sx={{
                position: "relative",
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-50px)",
                transition: isReducedMotion
                  ? "opacity 0.3s ease"
                  : "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(135deg, rgba(255,181,161,0.1) 0%, rgba(95,41,48,0.05) 100%)",
                  zIndex: 1,
                },
                "&:hover": {
                  "& .about-image": {
                    transform: "scale(1.05)",
                  },
                },
              }}
            >
              <Box
                className="about-image"
                component="img"
                src={planning}
                alt="Bakery"
                sx={{
                  width: "100%",
                  height: { xs: 300, md: 500 },
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </Box>
          </Grid>

          {/* Right Side - Content with Fade Animation */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              ref={contentRef}
              sx={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(50px)",
                transition: isReducedMotion
                  ? "opacity 0.3s ease"
                  : "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s",
              }}
            >
              {/* Logo & Badge */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                {/* <Box
                  component="img"
                  src={logo}
                  alt="Danbro Logo"
                  sx={{
                    height: { xs: 40, md: 50 },
                    width: "auto",
                  }}
                /> */}
                <CustomText
                  sx={{
                    fontSize: { xs: 10, md: 12 },
                    fontWeight: 'bold',
                    color: "#FF9472",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                  }}
                >
                  About Danbro
                </CustomText>
              </Box>

              {/* Title */}
              <CustomText
                sx={{
                  fontSize: { xs: 28, sm: 32, md: 42 },
                  fontWeight: 800,
                  color: "var(--themeColor)",
                  lineHeight: 1.2,
                }}
              >
                Crafting Sweet Memories Since 2006
              </CustomText>

              {/* Description */}
              <CustomText
                sx={{
                  fontSize: { xs: 15, md: 17 },
                  color: "#666",
                  mb: 1,
                }}
              >
                A gourmet family-owned pastry shop in Lucknow, now expanded to Kanpur & Delhi. We blend Asian traditions with modern flavors, creating premium desserts, mousse cakes, artisan tarts, and innovative baked mithai.
              </CustomText>

              {/* Features List */}
              <Box sx={{ mb: 4 }}>
                {features?.map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      mb: 1,
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(20px)",
                      transition: isReducedMotion
                        ? "opacity 0.3s ease"
                        : `opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.6 + index * 0.15}s, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.6 + index * 0.15}s`,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "#fff",
                        borderRadius: "50%",
                        width: 60,
                        height: 60,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--themeColor)",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                        flexShrink: 0,
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          transform: "scale(1.1) rotate(5deg)",
                          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                        },
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Box>
                      <CustomText
                        sx={{
                          fontSize: { xs: 18, md: 20 },
                          fontWeight: 700,
                          color: "var(--themeColor)",
                          mb: 0.5,
                        }}
                      >
                        {feature.title}
                      </CustomText>
                      <CustomText
                        sx={{
                          fontSize: { xs: 14, md: 15 },
                          color: "#666",
                          lineHeight: 1.6,
                        }}
                      >
                        {feature.description}
                      </CustomText>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Button
                onClick={() => navigate("/about-us")}
                sx={{
                  bgcolor: "var(--themeColor)",
                  color: "#fff",
                  px: { xs: 4, md: 5 },
                  py: { xs: 1.2, md: 1.5 },
                  borderRadius: { xs: 2, md: 3 },
                  fontWeight: 700,
                  fontSize: { xs: 15, md: 16 },
                  textTransform: "none",
                  boxShadow: "0 8px 25px rgba(95,41,48,0.3)",
                  "&:hover": {
                    bgcolor: "#7a2d3a",
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 35px rgba(95,41,48,0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Learn More About Us
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

