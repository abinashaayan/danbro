import { Box, Container, Grid, Button } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleCheck, UtensilsCrossed, Trophy, Users } from "lucide-react";
import planning from "../../assets/09f1ee59e9d78cc206e6e867e1cda04c1887d8f8.webp";
import logo from "../../assets/logo.webp";

const features = [
  {
    icon: <UtensilsCrossed size={40} strokeWidth={1.5} />,
    title: "Fresh Ingredients",
    description: "We use only the finest, freshest ingredients in all our products",
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
    title: "Award Winning",
    description: "Recognized for excellence in bakery and confectionery",
  },
  {
    icon: <Users size={40} strokeWidth={1.5} />,
    title: "Expert Bakers",
    description: "Our skilled bakers bring years of experience to every creation",
  },
];

const stats = [
  { number: "200K+", label: "Happy Customers" },
  { number: "300+", label: "Products" },
  { number: "18+", label: "Years Experience" },
  { number: "500+", label: "Team Members" },
];

export const AboutPreviewSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        bgcolor: "#fef9f7",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 20% 30%, rgba(255,181,161,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(251,199,181,0.12) 0%, transparent 50%)",
          pointerEvents: "none",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="false" sx={{ px: { xs: 2, md: 3, lg: 2 }, position: "relative", zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          {/* Left Side - Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(-50px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
              }}
            >
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Box
                  component="img"
                  src={logo}
                  alt="Danbro Logo"
                  sx={{
                    height: { xs: 50, md: 60 },
                    width: "auto",
                    filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
                  }}
                />
                <CustomText
                  sx={{
                    fontSize: { xs: 12, md: 14 },
                    fontWeight: 600,
                    color: "#FF9472",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                  }}
                >
                  About Danbro
                </CustomText>
              </Box>

              <CustomText
                sx={{
                  fontSize: { xs: 32, sm: 38, md: 48 },
                  fontWeight: 800,
                  color: "var(--themeColor)",
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                Crafting Sweet Memories Since 2006
              </CustomText>

              <CustomText
                sx={{
                  fontSize: { xs: 15, md: 17 },
                  color: "#666",
                  mb: 3,
                  lineHeight: 1.8,
                }}
              >
                A gourmet family-owned pastry shop in Lucknow, now expanded to Kanpur & Delhi. We blend Asian traditions with modern flavors, creating premium desserts, mousse cakes, artisan tarts, and innovative baked mithai.
              </CustomText>

              {/* Features List */}
              <Box sx={{ mb: 4 }}>
                {features.map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      mb: 2.5,
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateX(0)" : "translateX(-30px)",
                      transition: `opacity 0.6s ease ${0.3 + index * 0.1}s, transform 0.6s ease ${0.3 + index * 0.1}s`,
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
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    bgcolor: "#7a2d3a",
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 35px rgba(95,41,48,0.4)",
                  },
                }}
              >
                Learn More About Us
              </Button>
            </Box>
          </Grid>

          {/* Right Side - Image & Stats */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(50px)",
                transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
              }}
            >
              {/* Main Image */}
              <Box
                sx={{
                  position: "relative",
                  borderRadius: { xs: 3, md: 4 },
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
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
                }}
              >
                <Box
                  component="img"
                  src={planning}
                  alt="Bakery"
                  sx={{
                    width: "100%",
                    height: { xs: 300, md: 450 },
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>

              {/* Stats Cards */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                  mt: { xs: 3, md: 4 },
                }}
              >
                {stats.map((stat, index) => (
                  <Box
                    key={index}
                    sx={{
                      bgcolor: "#fff",
                      borderRadius: { xs: 2, md: 3 },
                      p: { xs: 2, md: 2.5 },
                      textAlign: "center",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                      transition: "all 0.4s ease",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(30px)",
                      animation: isVisible ? `fadeInUp 0.4s ease-out 0.3s both` : "none",
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
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <CustomText
                      sx={{
                        fontSize: { xs: 28, md: 32 },
                        fontWeight: 800,
                        color: "var(--themeColor)",
                        mb: 0.5,
                      }}
                    >
                      {stat.number}
                    </CustomText>
                    <CustomText
                      sx={{
                        fontSize: { xs: 12, md: 14 },
                        color: "#666",
                        fontWeight: 600,
                      }}
                    >
                      {stat.label}
                    </CustomText>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

