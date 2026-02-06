import { Box, Container, Grid, Button } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import offer1 from "../../assets/Group 8.png";
import offer2 from "../../assets/Group 8 (2).png";
import offer3 from "../../assets/Group 8 (1).png";

const specialOffers = [
  {
    id: 1,
    title: "Weekend Special",
    subtitle: "Get 30% off on all cakes",
    description: "Valid every Saturday & Sunday",
    discount: "30% OFF",
    image: offer1,
    bgColor: "#FF6B6B",
  },
  {
    id: 2,
    title: "Birthday Combo",
    subtitle: "Cake + Candles + Gift",
    description: "Perfect birthday package",
    discount: "25% OFF",
    image: offer2,
    bgColor: "#4ECDC4",
  },
  {
    id: 3,
    title: "Family Pack",
    subtitle: "Buy 3 Get 1 Free",
    description: "On selected items",
    discount: "Buy 3+1",
    image: offer3,
    bgColor: "#FFE66D",
  },
];

export const SpecialOffersSection = () => {
  const navigate = useNavigate();
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
        borderRadius: { xs: 0, md: 4 },
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, mb: 1 }}>
            <LocalOfferIcon sx={{ fontSize: 32, color: "#FF9472" }} />
            <CustomText sx={{ fontSize: { xs: 12, md: 14 }, fontWeight: 600, color: "#FF9472", textTransform: "uppercase", letterSpacing: 2, }}>
              Special Offers
            </CustomText>
          </Box>
          <CustomText sx={{ fontSize: { xs: 32, sm: 38, md: 48 }, fontWeight: 800, color: "var(--themeColor)", mb: 2, }}>
            Limited Time Deals
          </CustomText>
          <CustomText sx={{ fontSize: { xs: 14, md: 16 }, color: "#666", maxWidth: 600, mx: "auto", }}>
            Don't miss out on these amazing deals and special offers
          </CustomText>
        </Box>

        {/* Offers Grid */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {specialOffers.map((offer, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={offer.id}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(50px)",
                  animation: visible ? `fadeInUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both` : "none",
                  "@keyframes fadeInUp": {
                    "0%": { opacity: 0, transform: "translateY(50px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${offer.bgColor}15 0%, transparent 100%)`,
                    opacity: 0,
                    transition: "opacity 0.5s ease",
                    zIndex: 1,
                    pointerEvents: "none",
                  },
                  "&:hover": {
                    transform: "translateY(-12px) scale(1.02)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
                    "&::before": {
                      opacity: 1,
                    },
                    "& .offer-image": {
                      transform: "scale(1.1)",
                    },
                    "& .pulse-badge": {
                      animation: "pulseBadge 0.5s ease-in-out",
                    },
                  },
                }}
                onClick={() => navigate("/offers")}
              >
                {/* Image */}
                <Box sx={{ position: "relative", height: { xs: 200, md: 250 }, overflow: "hidden", bgcolor: offer.bgColor, }}>
                  <Box
                    className="offer-image"
                    component="img"
                    src={offer.image}
                    alt={offer.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                      willChange: "transform",
                    }}
                  />
                  {/* Discount Badge with Pulse Animation */}
                  <Box
                    className="pulse-badge"
                    sx={{
                      position: "absolute",
                      top: 20,
                      right: 20,
                      bgcolor: "#0A1234",
                      color: "#fff",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      fontSize: 16,
                      fontWeight: 800,
                      boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                      animation: "pulseBadge 2s ease-in-out infinite",
                      "@keyframes pulseBadge": {
                        "0%, 100%": {
                          transform: "scale(1)",
                          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                        },
                        "50%": {
                          transform: "scale(1.05)",
                          boxShadow: "0 6px 20px rgba(10,18,52,0.5)",
                        },
                      },
                    }}
                  >
                    {offer.discount}
                  </Box>
                </Box>

                {/* Content */}
                <Box sx={{ p: 3, bgcolor: "#fff" }}>
                  <CustomText sx={{ fontSize: { xs: 20, md: 24 }, fontWeight: 800, color: "var(--themeColor)", mb: 0.5, }}>
                    {offer.title}
                  </CustomText>
                  <CustomText sx={{ fontSize: { xs: 16, md: 18 }, fontWeight: 600, color: "#333", mb: 1, }}>
                    {offer.subtitle}
                  </CustomText>
                  <CustomText sx={{ fontSize: 14, color: "#666", mb: 2.5, }}>
                    {offer.description}
                  </CustomText>
                  <Button fullWidth sx={{ bgcolor: "var(--themeColor)", color: "#fff", py: 1.2, borderRadius: 2, fontWeight: 700, fontSize: 15, textTransform: "none", "&:hover": { bgcolor: "#7a2d3a" }, }}>
                    Shop Now
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

