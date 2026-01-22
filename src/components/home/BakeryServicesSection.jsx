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
    description: "Learn the art of baking from our expert chefs",
    color: "#AA96DA",
  },
];

export const BakeryServicesSection = () => {
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

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "#fef9f7",
        borderRadius: { xs: 0, md: 4 },
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 8 } }}>
          <CustomText
            sx={{
              fontSize: { xs: 12, md: 14 },
              fontWeight: 600,
              color: "#FF9472",
              textTransform: "uppercase",
              letterSpacing: 2,
              mb: 1,
            }}
          >
            Our Services
          </CustomText>
          <CustomText
            sx={{
              fontSize: { xs: 32, sm: 38, md: 48 },
              fontWeight: 800,
              color: "var(--themeColor)",
              mb: 2,
            }}
          >
            What We Offer
          </CustomText>
          <CustomText
            sx={{
              fontSize: { xs: 14, md: 16 },
              color: "#666",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Comprehensive bakery services to meet all your needs
          </CustomText>
        </Box>

        {/* Services Grid */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {services.map((service, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 3,
                  p: { xs: 3, md: 4 },
                  textAlign: "center",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transition: "all 0.4s ease",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(50px)",
                  animation: visible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : "none",
                  "@keyframes fadeInUp": {
                    "0%": { opacity: 0, transform: "translateY(50px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                  },
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: `0 15px 40px ${service.color}30`,
                    "& .service-icon": {
                      transform: "scale(1.15) rotate(5deg)",
                    },
                  },
                }}
              >
                {/* Icon */}
                <Box
                  className="service-icon"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { xs: 80, md: 100 },
                    height: { xs: 80, md: 100 },
                    borderRadius: "50%",
                    bgcolor: `${service.color}15`,
                    color: service.color,
                    mb: 3,
                    transition: "all 0.4s ease",
                  }}
                >
                  {service.icon}
                </Box>

                {/* Title */}
                <CustomText
                  sx={{
                    fontSize: { xs: 20, md: 24 },
                    fontWeight: 800,
                    color: "var(--themeColor)",
                    mb: 1.5,
                  }}
                >
                  {service.title}
                </CustomText>

                {/* Description */}
                <CustomText
                  sx={{
                    fontSize: { xs: 14, md: 15 },
                    color: "#666",
                    lineHeight: 1.7,
                  }}
                >
                  {service.description}
                </CustomText>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

