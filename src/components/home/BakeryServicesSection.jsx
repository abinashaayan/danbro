import { Box, Container, Grid } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import { useEffect, useRef, useState } from "react";
import CakeIcon from "@mui/icons-material/Cake";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CelebrationIcon from "@mui/icons-material/Celebration";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const services = [
  {
    icon: <CakeIcon sx={{ fontSize: 50 }} />,
    title: "Custom Cakes",
    description: "Personalized cakes for birthdays, weddings, and special occasions",
    color: "#FF6B6B",
  },
  {
    icon: <RestaurantIcon sx={{ fontSize: 50 }} />,
    title: "Catering Services",
    description: "Professional catering for events, parties, and corporate functions",
    color: "#4ECDC4",
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 50 }} />,
    title: "Fast Delivery",
    description: "Quick and reliable delivery service to your doorstep",
    color: "#FFE66D",
  },
  {
    icon: <CelebrationIcon sx={{ fontSize: 50 }} />,
    title: "Event Planning",
    description: "Complete event planning services for memorable celebrations",
    color: "#95E1D3",
  },
  {
    icon: <CardGiftcardIcon sx={{ fontSize: 50 }} />,
    title: "Gift Hampers",
    description: "Beautifully curated gift hampers for your loved ones",
    color: "#F38181",
  },
  {
    icon: <MenuBookIcon sx={{ fontSize: 50 }} />,
    title: "Baking Classes",
    description: "Learn the art of baking from our expert chefs professionally",
    color: "#AA96DA",
  },
];

export const BakeryServicesSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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

  return (
    <Box ref={sectionRef} sx={{ py: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 }, position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 1, md: 4 },
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 70,
              height: 70,
              borderRadius: "50%",
              bgcolor: "rgba(255,181,161,0.15)",
              mb: 2,
              animation: visible ? "pulseIcon 2s ease-in-out infinite" : "none",
              "@keyframes pulseIcon": {
                "0%, 100%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.1)" },
              },
            }}
          >
            <CakeIcon sx={{ fontSize: 40, color: "#FF9472" }} />
          </Box>
          <CustomText sx={{ fontSize: { xs: 12, md: 14 }, fontWeight: 600, color: "#FF9472", textTransform: "uppercase", letterSpacing: 2, mb: 1, }}>
            Our Services
          </CustomText>
          <CustomText
            sx={{
              fontSize: { xs: 32, sm: 38, md: 48 },
              fontWeight: 800,
              color: "var(--themeColor)",
              mb: 2,
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100px",
                height: "4px",
                background: "linear-gradient(90deg, transparent, #FF9472, transparent)",
                borderRadius: "2px",
                animation: visible ? "expandLine 1s ease-out 0.5s both" : "none",
                "@keyframes expandLine": {
                  "0%": { width: 0, opacity: 0 },
                  "100%": { width: "100px", opacity: 1 },
                },
              },
            }}
          >
            What We Offer
          </CustomText>
          <CustomText sx={{ fontSize: { xs: 14, md: 16 }, color: "#666", maxWidth: 600, mx: "auto", lineHeight: 1.8, }}>
            Comprehensive bakery services to meet all your needs and make every occasion special
          </CustomText>
        </Box>

        {/* Services Grid */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {services.map((service, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Box
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                sx={{
                  bgcolor: "#fff",
                  borderRadius: { xs: 3, md: 4 },
                  p: { xs: 3.5, md: 4.5 },
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,181,161,0.1) inset",
                  cursor: "pointer",
                  transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.9)",
                  animation: visible ? `cardFadeIn 0.8s ease-out ${index * 0.15}s both` : "none",
                  "@keyframes cardFadeIn": {
                    "0%": {
                      opacity: 0,
                      transform: "translateY(50px) scale(0.9) rotateY(-10deg)"
                    },
                    "100%": {
                      opacity: 1,
                      transform: "translateY(0) scale(1) rotateY(0deg)"
                    },
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: `linear-gradient(90deg, ${service.color}, ${service.color}dd, ${service.color})`,
                    backgroundSize: "200% 100%",
                    opacity: 0,
                    transition: "opacity 0.5s ease",
                    animation: hoveredIndex === index ? "gradientShift 3s ease infinite" : "none",
                    "@keyframes gradientShift": {
                      "0%, 100%": { backgroundPosition: "0% 50%" },
                      "50%": { backgroundPosition: "100% 50%" },
                    },
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: "-50%",
                    left: "-50%",
                    width: "200%",
                    height: "200%",
                    background: `radial-gradient(circle, ${service.color}15 0%, transparent 70%)`,
                    opacity: 0,
                    transition: "opacity 0.6s ease",
                    transform: "scale(0)",
                    zIndex: 0,
                  },
                  "&:hover": {
                    background: `linear-gradient(135deg, ${service.color}12 0%, ${service.color}08 50%, #fff 100%)`,
                    transform: "translateY(-15px) scale(1.05) rotateY(2deg)",
                    boxShadow: `0 25px 60px ${service.color}40, 0 0 0 2px ${service.color}30 inset`,
                    "&::before": {
                      opacity: 1,
                    },
                    "&::after": {
                      opacity: 1,
                      transform: "scale(1)",
                    },
                    "& .service-icon": {
                      transform: "scale(1.2) rotate(10deg) translateY(-5px)",
                      boxShadow: `0 10px 30px ${service.color}50`,
                      "&::before": {
                        opacity: 1,
                      },
                    },
                    "& .service-title": {
                      color: service.color,
                      transform: "translateY(-3px)",
                    },
                    "& .service-description": {
                      transform: "translateY(-2px)",
                    },
                    "& .decorative-dots": {
                      opacity: 1,
                      transform: "scale(1)",
                    },
                    "& .shimmer-effect": {
                      left: "100%",
                      transition: "left 0.7s ease",
                    },
                  },
                }}
              >
                {/* Decorative Background Pattern */}
                <Box
                  className="decorative-dots"
                  sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    width: 60,
                    height: 60,
                    opacity: 0,
                    transform: "scale(0.5)",
                    transition: "all 0.6s ease",
                    backgroundImage: `radial-gradient(circle, ${service.color}30 2px, transparent 2px)`,
                    backgroundSize: "12px 12px",
                    zIndex: 0,
                  }}
                />

                {/* Icon Container with Enhanced Animation */}
                <Box
                  className="service-icon"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { xs: 90, md: 110 },
                    height: { xs: 90, md: 110 },
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${service.color}20 0%, ${service.color}10 100%)`,
                    color: service.color,
                    mb: 3,
                    position: "relative",
                    zIndex: 1,
                    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: `0 8px 25px ${service.color}20`,
                    animation: visible ? `iconFloat ${2 + index * 0.2}s ease-in-out infinite ${index * 0.3}s` : "none",
                    "@keyframes iconFloat": {
                      "0%, 100%": { transform: "translateY(0px)" },
                      "50%": { transform: "translateY(-8px)" },
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: -5,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${service.color}30, transparent)`,
                      opacity: 0,
                      transition: "opacity 0.6s ease",
                      zIndex: -1,
                    },
                  }}
                >
                  <Box
                    sx={{
                      animation: hoveredIndex === index ? "iconSpin 0.6s ease" : "none",
                      "@keyframes iconSpin": {
                        "0%": { transform: "rotate(0deg)" },
                        "100%": { transform: "rotate(360deg)" },
                      },
                    }}
                  >
                    {service.icon}
                  </Box>
                </Box>

                {/* Title */}
                <CustomText
                  className="service-title"
                  sx={{
                    fontSize: { xs: 22, md: 26 },
                    fontWeight: 800,
                    color: "var(--themeColor)",
                    mb: 1.5,
                    position: "relative",
                    zIndex: 1,
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    textShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  {service.title}
                </CustomText>

                {/* Description */}
                <CustomText
                  className="service-description"
                  sx={{
                    fontSize: { xs: 14, md: 15 },
                    color: "#666",
                    lineHeight: 1.8,
                    position: "relative",
                    zIndex: 1,
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {service.description}
                </CustomText>

                {/* Shimmer Effect */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    transition: "left 0.5s ease",
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                  className="shimmer-effect"
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

