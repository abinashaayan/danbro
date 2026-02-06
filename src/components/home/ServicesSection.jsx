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
    description: "Personalized cakes for birthdays, weddings, and special occasions. Made to order with your favorite flavors and designs.",
    color: "#FF6B6B",
  },
  {
    icon: <RestaurantIcon sx={{ fontSize: 50 }} />,
    title: "Catering Services",
    description: "Professional catering for events, parties, and corporate functions. Fresh, delicious food delivered on time.",
    color: "#4ECDC4",
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 50 }} />,
    title: "Fast Delivery",
    description: "Quick and reliable delivery service. Your favorite bakery items delivered fresh to your doorstep.",
    color: "#FFE66D",
  },
  {
    icon: <CelebrationIcon sx={{ fontSize: 50 }} />,
    title: "Event Planning",
    description: "Complete event planning services. From decorations to desserts, we make your celebrations memorable.",
    color: "#95E1D3",
  },
  {
    icon: <CardGiftcardIcon sx={{ fontSize: 50 }} />,
    title: "Gift Hampers",
    description: "Beautifully curated gift hampers for your loved ones. Perfect for any occasion or celebration.",
    color: "#F38181",
  },
  {
    icon: <MenuBookIcon sx={{ fontSize: 50 }} />,
    title: "Baking Classes",
    description: "Learn the art of baking from our expert chefs. Join our classes and master the techniques.",
    color: "#AA96DA",
  },
];

export const ServicesSection = () => {
  const sectionRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => ({ ...prev, [entry.target.dataset.index]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const items = sectionRef.current.querySelectorAll("[data-index]");
      items.forEach((item) => observer.observe(item));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        bgcolor: "#fff",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(255,181,161,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="false" sx={{ px: { xs: 2, md: 3, lg: 2 }, position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 5, md: 8 },
            opacity: visibleItems.header ? 1 : 0,
            transform: visibleItems.header ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
          data-index="header"
        >
          <CustomText
            sx={{
              fontSize: { xs: 12, md: 14 },
              fontWeight: 600,
              color: "#FF9472",
              textTransform: "uppercase",
              letterSpacing: 2,
              mb: 2,
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
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "4px",
                background: "linear-gradient(90deg, transparent, var(--themeColor), transparent)",
                borderRadius: "2px",
              },
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
              mt: 3,
            }}
          >
            Comprehensive bakery services to meet all your needs and make every occasion special
          </CustomText>
        </Box>

        {/* Services Grid */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {services.map((service, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Box
                data-index={index}
                sx={{
                  bgcolor: "#fff",
                  borderRadius: { xs: 3, md: 4 },
                  p: { xs: 3, md: 4 },
                  textAlign: "center",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05) inset",
                  cursor: "pointer",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  opacity: visibleItems[index] ? 1 : 0,
                  transform: visibleItems[index] ? "translateY(0)" : "translateY(50px)",
                  animation: visibleItems[index] ? `fadeInUp 0.4s ease-out 0.3s both` : "none",
                  "@keyframes fadeInUp": {
                    "0%": {
                      opacity: 0,
                      transform: "translateY(50px)",
                    },
                    "100%": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${service.color}15 0%, transparent 100%)`,
                    opacity: 0,
                    transition: "opacity 0.5s ease",
                    zIndex: 0,
                  },
                  "&:hover": {
                    transform: "translateY(-12px) scale(1.03)",
                    boxShadow: `0 20px 50px ${service.color}30, 0 0 0 1px ${service.color}40 inset`,
                    "&::before": {
                      opacity: 1,
                    },
                    "& .service-icon": {
                      transform: "scale(1.2) rotate(5deg)",
                      color: service.color,
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
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    zIndex: 1,
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
                    position: "relative",
                    zIndex: 1,
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
                    position: "relative",
                    zIndex: 1,
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

