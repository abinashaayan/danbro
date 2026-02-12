import { Box, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import CakeIcon from "@mui/icons-material/Cake";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CelebrationIcon from "@mui/icons-material/Celebration";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarIcon from "@mui/icons-material/Star";
import "./BakeryServicesSection.css";

const services = [
  {
    icon: CakeIcon,
    title: "Custom Cakes",
    description: "Personalized cakes for birthdays, weddings, and special occasions — crafted with artistry.",
    color: "#FF6B6B",
    to: "/products",
  },
  {
    icon: RestaurantIcon,
    title: "Catering Services",
    description: "Professional catering for events, parties, and corporate functions with bakery signature.",
    color: "#4ECDC4",
    to: "/catering-events",
  },
  {
    icon: LocalShippingIcon,
    title: "Fast Delivery",
    description: "Quick and reliable delivery service to your doorstep — fresh & on time.",
    color: "#FFE66D",
    to: "/products",
  },
  {
    icon: CelebrationIcon,
    title: "Event Planning",
    description: "Complete event planning services for memorable celebrations, from concept to execution.",
    color: "#95E1D3",
    to: "/catering-events",
  },
  {
    icon: CardGiftcardIcon,
    title: "Gift Hampers",
    description: "Beautifully curated gift hampers for your loved ones — filled with artisanal treats.",
    color: "#F38181",
    to: "/products",
  },
  {
    icon: MenuBookIcon,
    title: "Baking Classes",
    description: "Learn the art of baking from our expert chefs professionally — hands-on & fun.",
    color: "#AA96DA",
    to: "/contact",
  },
];

export const BakeryServicesSection = () => {
  return (
    <Box
      className="bakery-services-section"
      sx={{
        py: { xs: 2, md: 8 },
        px: { xs: 2, md: 3 },
        minHeight: "auto",
        background: "#fcf9f7",
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(95, 41, 48, 0.02) 0%, transparent 30%),
          radial-gradient(circle at 90% 60%, rgba(95, 41, 48, 0.03) 0%, transparent 40%),
          repeating-linear-gradient(45deg, rgba(95,41,48,0.002) 0px, rgba(95,41,48,0.002) 2px, transparent 2px, transparent 12px)
        `,
        fontFamily: "'Satoshi', sans-serif",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 3 } }}>
        {/* Glass header */}
        <Box
          className="services-header"
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            mb: { xs: 3, md: 3.5 },
            flexWrap: "wrap",
            gap: 1.5,
            background: "rgba(255, 255, 255, 0.65)",
            backdropFilter: "blur(16px)",
            py: 1.2,
            px: { xs: 1.5, md: 2.2 },
            borderRadius: "120px",
            border: "1px solid rgba(95, 41, 48, 0.1)",
            boxShadow: "0 20px 40px -12px rgba(95,41,48,0.08)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              component="h2"
              className="services-header-title"
              sx={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: { xs: "1.4rem", sm: "1.6rem", md: "2rem", lg: "2.3rem" },
                fontWeight: 700,
                color: "#2d1e1b",
                letterSpacing: "-0.02em",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                m: 0,
              }}
            >
              <Box
                className="services-header-icon"
                sx={{
                  color: "#5F2930",
                  bgcolor: "white",
                  p: 0.7,
                  borderRadius: "100px",
                  fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.8rem" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 20px rgba(95,41,48,0.08)",
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.4rem" } }} />
              </Box>
              Our premium services
            </Box>
            <Box
              className="services-header-badge"
              sx={{
                background: "#5F2930",
                color: "white",
                py: 0.6,
                px: 1.8,
                borderRadius: "60px",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
                fontWeight: 600,
                letterSpacing: 0.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" } }} />
              6 specialties
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Box
              sx={{
                color: "#7e6b64",
                background: "rgba(95,41,48,0.04)",
                py: 0.5,
                px: 1.5,
                borderRadius: "60px",
                fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" },
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 0.75,
              }}
            >
              <WorkspacePremiumIcon sx={{ color: "#5F2930", fontSize: { xs: "0.9rem", sm: "0.95rem", md: "1rem" } }} />
              artisan bakery
            </Box>
          </Box>
        </Box>

        {/* Service grid */}
        <Grid container spacing={{ xs: 2, md: 2.2 }} sx={{ mt: 1.8 }}>
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Box
                  component={Link}
                  to={service.to}
                  sx={{
                    position: "relative",
                    background: "white",
                    borderRadius: "48px",
                    p: { xs: 2, md: "2.4rem 1.8rem 2.4rem" },
                    transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                    border: "1px solid rgba(95, 41, 48, 0.06)",
                    boxShadow: "0 20px 35px -12px rgba(95,41,48,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    textAlign: "left",
                    overflow: "hidden",
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": {
                      transform: "translateY(-16px) scale(1.01)",
                      boxShadow: "0 40px 60px -18px rgba(95,41,48,0.2)",
                      borderColor: "rgba(95, 41, 48, 0.15)",
                      "& .card-color-accent": { height: 14 },
                      "& .icon-wrapper": {
                        borderRadius: "32px 32px 32px 16px",
                        background: "white",
                        boxShadow: "0 15px 25px -8px rgba(95,41,48,0.15)",
                        "& svg": { transform: "scale(1.1) rotate(-2deg)" },
                      },
                      "& .service-link": {
                        gap: 1.5,
                        borderBottomColor: "#5F2930",
                        "& svg": { transform: "translateX(6px)" },
                      },
                    },
                  }}
                >
                  {/* Color accent bar */}
                  <Box
                    className="card-color-accent"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: 10,
                      background: service.color,
                      borderRadius: "48px 48px 0 0",
                      transition: "height 0.3s",
                    }}
                  />
                  {/* Micro float (optional) */}
                  {index === 0 && (
                    <>
                      <Box
                        sx={{
                          position: "absolute",
                          width: 12,
                          height: 12,
                          background: "rgba(95,41,48,0.1)",
                          borderRadius: "50%",
                          filter: "blur(3px)",
                          top: "15%",
                          right: "12%",
                          animation: "floatAround 8s infinite alternate",
                          "@keyframes floatAround": {
                            "0%": { transform: "translate(0, 0) scale(1)", opacity: 0.2 },
                            "100%": { transform: "translate(-15px, -20px) scale(1.6)", opacity: 0.6 },
                          },
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          width: 18,
                          height: 18,
                          background: service.color,
                          opacity: 0.1,
                          borderRadius: "50%",
                          bottom: "20%",
                          left: "10%",
                        }}
                      />
                    </>
                  )}
                  {/* Icon wrapper */}
                  <Box
                    className="icon-wrapper"
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "24px 24px 24px 8px",
                      background: "rgba(95, 41, 48, 0.02)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 1.8,
                      transition: "all 0.35s",
                      border: `1px solid ${service.color}33`,
                      color: service.color,
                      "& svg": {
                        fontSize: "2.8rem",
                        transition: "transform 0.25s",
                      },
                    }}
                  >
                    <IconComponent />
                  </Box>
                  <Box
                    component="h3"
                    sx={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem", lg: "1.7rem" },
                    fontWeight: 700,
                      color: "#1f1614",
                      lineHeight: 1.2,
                      mb: 0.8,
                      letterSpacing: "-0.02em",
                      m: 0,
                    }}
                  >
                    {service.title}
                  </Box>
                  <Box
                    sx={{
                      fontSize: { xs: "0.85rem", sm: "0.9rem", md: "0.98rem" },
                      lineHeight: 1.55,
                      color: "#6a5650",
                      fontWeight: 450,
                      mb: 1.8,
                      flex: 1,
                    }}
                  >
                    {service.description}
                  </Box>
                  <Box
                    className="service-link"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontWeight: 600,
                      color: "#5F2930",
                      fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                      letterSpacing: 0.8,
                      textTransform: "uppercase",
                      borderBottom: "2px solid transparent",
                      transition: "gap 0.25s, border-color 0.2s",
                      "& svg": { fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, transition: "transform 0.2s" },
                    }}
                  >
                    discover
                    <ArrowForwardIcon />
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Footer pills */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3.5, gap: 2, flexWrap: "wrap", }}>
          <Box
            sx={{
              background: "white",
              backdropFilter: "blur(8px)",
              py: 0.6,
              px: 2.2,
              borderRadius: "60px",
              border: "1px solid rgba(95,41,48,0.08)",
              boxShadow: "0 10px 25px -8px rgba(0,0,0,0.03)",
              color: "#4a3530",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
            }}
          >
            <VerifiedIcon sx={{ color: "#5F2930", fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" } }} />
            150+ custom cakes monthly
          </Box>
          <Box
            sx={{
              background: "white",
              backdropFilter: "blur(8px)",
              py: 0.6,
              px: 2.2,
              borderRadius: "60px",
              border: "1px solid rgba(95,41,48,0.08)",
              boxShadow: "0 10px 25px -8px rgba(0,0,0,0.03)",
              color: "#4a3530",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
            }}
          >
            <StarIcon sx={{ color: "#5F2930", fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" } }} />
            4.9 ★ (2.8k reviews)
          </Box>
          <Box
            sx={{
              background: "#5F2930",
              color: "white",
              py: 0.6,
              px: 2.2,
              borderRadius: "60px",
              border: "1px solid rgba(255,255,255,0.2)",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
            }}
          >
            <WorkspacePremiumIcon sx={{ fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" } }} />
            danbro signature
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
