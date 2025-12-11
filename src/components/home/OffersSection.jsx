import { Box, Typography, Button } from "@mui/material";
import offer1 from "../../assets/Group 8.png";
import offer2 from "../../assets/Group 8 (2).png";
import offer3 from "../../assets/Group 8 (1).png";
import { useState } from "react";
import { CakeSection } from "./Cake";
import { PersonalisedInstant } from "./PersonalisedInstant";
import { TestimonialsSection } from "./TestimonialsSection";
import specialMomentslogo from "../../assets/SPECIALMOMENTS.png";
import { Artical } from "./Artical";

const tabs = ["Pizza", "Cakes", "Danbro Special", "Others"];

const offers = [
  // 🔥 Pizza
  {
    title: "BBQ Chicken Pizza",
    subtitle: "smokey & spicy",
    discount: "-15%",
    category: "Pizza",
    img: offer1,
  },
  {
    title: "Margherita Cheese Pizza",
    subtitle: "classic italian delight",
    discount: "-22%",
    category: "Pizza",
    img: offer2,
  },
  {
    title: "Veg Loaded Pizza",
    subtitle: "fresh & crunchy",
    discount: "-18%",
    category: "Pizza",
    img: offer3,
  },

  // 🔥 Cakes
  {
    title: "Mango Cakes",
    subtitle: "Eat without guilt",
    discount: "-40%",
    category: "Cakes",
    img: offer1,
  },
  {
    title: "Blackforest Cake",
    subtitle: "fresh cream & chocolate",
    discount: "-25%",
    category: "Cakes",
    img: offer1,
  },
  {
    title: "Red Velvet Classic",
    subtitle: "soft & premium",
    discount: "-30%",
    category: "Cakes",
    img: offer2,
  },

  // 🔥 Danbro Special
  {
    title: "Handmade Cookies",
    subtitle: "yummy & crispy",
    discount: "-20%",
    category: "Danbro Special",
    img: offer1,
  },
  {
    title: "Choco Muffin",
    subtitle: "a tasty & light dessert",
    discount: "-17%",
    category: "Danbro Special",
    img: offer1,
  },
  {
    title: "Premium Celebration Box",
    subtitle: "festive treat pack",
    discount: "-28%",
    category: "Danbro Special",
    img: offer2,
  },

  // 🔥 Others
  {
    title: "Burger Meal Combo",
    subtitle: "cheesy & satisfying",
    discount: "-12%",
    category: "Others",
    img: offer3,
  },
  {
    title: "Breakfast Delight",
    subtitle: "healthy & energetic",
    discount: "-14%",
    category: "Others",
    img: offer2,
  },
  {
    title: "Snack Platter",
    subtitle: "perfect for sharing",
    discount: "-16%",
    category: "Others",
    img: offer1,
  },
];

const specialMoments = [
  // 🔥 Pizza
  {
    title: "BBQ Chicken Pizza",
    subtitle: "smokey & spicy",
    discount: "-15%",
    category: "Pizza",
    img: offer1,
  },
  {
    title: "Margherita Cheese Pizza",
    subtitle: "classic italian delight",
    discount: "-22%",
    category: "Pizza",
    img: offer2,
  },
  {
    title: "Veg Loaded Pizza",
    subtitle: "fresh & crunchy",
    discount: "-18%",
    category: "Pizza",
    img: offer3,
  },
];


export const OffersSection = () => {
  const [activeTab, setActiveTab] = useState("Danbro Special");
  const filteredItems =
    activeTab === "Others"
      ? offers
      : offers.filter((item) => item.category === activeTab);

  return (
    <Box>
      <Box sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: { xs: 2, md: 4 },
            alignItems: { xs: "flex-start", md: "center" },
            mb: { xs: 4, md: 6 },
            position: "relative",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Typography 
              sx={{ 
                fontSize: { xs: 28, sm: 32, md: 38 }, 
                fontWeight: 800, 
                color: "var(--themeColor)",
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-5px",
                  left: 0,
                  width: "60%",
                  height: "4px",
                  background: "linear-gradient(90deg, var(--themeColor) 0%, rgba(255,181,161,0.5) 100%)",
                  borderRadius: "2px",
                  animation: "underlineExpand 0.8s ease-out",
                  "@keyframes underlineExpand": {
                    "0%": { width: "0%" },
                    "100%": { width: "60%" },
                  },
                },
              }}
            >
              Offers
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "end" },
              gap: { xs: 1, sm: 2, md: 4 },
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {tabs?.map((tab, index) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: { xs: 11, sm: 12, md: 14 },
                  color:
                    activeTab === tab ? "var(--themeColor)" : "rgba(0,0,0,0.7)",
                  border:
                    activeTab === tab
                      ? "2px solid var(--themeColor)"
                      : "2px solid transparent",
                  backgroundColor: activeTab === tab ? "#fff4f0" : "transparent",
                  borderRadius: 20,
                  px: activeTab === tab ? { xs: 2, md: 3 } : 0,
                  py: activeTab === tab ? { xs: 0.4, md: 0.6 } : 0,
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  whiteSpace: "nowrap",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "0",
                    height: "0",
                    borderRadius: "50%",
                    background: activeTab === tab 
                      ? "radial-gradient(circle, rgba(95,41,48,0.1) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(255,181,161,0.2) 0%, transparent 70%)",
                    transform: "translate(-50%, -50%)",
                    transition: "all 0.5s ease",
                    zIndex: 0,
                  },
                  "&:hover": {
                    transform: "translateY(-3px) scale(1.05)",
                    backgroundColor: activeTab === tab ? "#fff4f0" : "rgba(255,244,240,0.6)",
                    border: "2px solid var(--themeColor)",
                    boxShadow: "0 6px 20px rgba(95,41,48,0.2)",
                    "&::before": {
                      width: "300%",
                      height: "300%",
                    },
                  },
                  "&:active": {
                    transform: "translateY(-1px) scale(1.02)",
                  },
                }}
              >
                <Box sx={{ position: "relative", zIndex: 1 }}>{tab}</Box>
              </Button>
            ))}
          </Box>
        </Box>
        {/* Offer */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: { xs: 2.5, md: 4 },
            mb: { xs: 6, md: 8 },
          }}
        >
          {filteredItems?.map((offer, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                borderRadius: { xs: 2, md: 3 },
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05) inset",
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
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
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(135deg, rgba(255,181,161,0.1) 0%, rgba(95,41,48,0.05) 100%)",
                  opacity: 0,
                  transition: "opacity 0.5s ease",
                  zIndex: 1,
                  pointerEvents: "none",
                },
                "&:hover": {
                  transform: "translateY(-12px) scale(1.03)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,181,161,0.3) inset",
                  "&::before": {
                    opacity: 1,
                  },
                  "& img": {
                    transform: "scale(1.15)",
                  },
                  "& .overlay-content": {
                    opacity: 1,
                    transform: "translateY(0)",
                    background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.95) 100%)",
                  },
                  "& .discount-badge": {
                    transform: "scale(1.15) rotate(5deg)",
                    boxShadow: "0 8px 25px rgba(10,18,52,0.5)",
                  },
                },
              }}
            >
              <Box
                component="img"
                src={offer.img}
                alt={offer.title}
                sx={{
                  width: "100%",
                  height: { xs: 220, sm: 250, md: 280 },
                  objectFit: "cover",
                  transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                  filter: "brightness(0.95)",
                }}
              />
              <Box
                className="overlay-content"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  p: { xs: 2, md: 2.5 },
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.85) 100%)",
                  color: "#fff",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  opacity: 1,
                  transform: "translateY(0)",
                  zIndex: 2,
                }}
              >
                <Typography 
                  sx={{ 
                    fontSize: { xs: 12, md: 14 }, 
                    opacity: 0.95, 
                    color: "#FFB5A1",
                    fontWeight: 500,
                    mb: 0.5,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {offer?.subtitle}
                </Typography>
                <Typography 
                  sx={{ 
                    fontSize: { xs: 18, sm: 20, md: 24 }, 
                    fontWeight: 800,
                    lineHeight: 1.2,
                    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                  }}
                >
                  {offer?.title}
                </Typography>
              </Box>
              <Box
                className="discount-badge"
                sx={{
                  position: "absolute",
                  top: { xs: 12, md: 15 },
                  right: { xs: 12, md: 18 },
                  background: "linear-gradient(135deg, #0A1234 0%, #1a2a4a 100%)",
                  px: { xs: 2, md: 2.5 },
                  py: { xs: 1.5, md: 2 },
                  borderRadius: { xs: 1.5, md: 2 },
                  fontSize: { xs: 13, md: 16 },
                  fontWeight: 800,
                  color: "#fff",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  animation: "pulse 2.5s ease-in-out infinite",
                  boxShadow: "0 4px 15px rgba(10,18,52,0.4), 0 0 0 2px rgba(255,255,255,0.1) inset",
                  zIndex: 3,
                  "@keyframes pulse": {
                    "0%, 100%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.08)" },
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "-2px",
                    left: "-2px",
                    right: "-2px",
                    bottom: "-2px",
                    background: "linear-gradient(45deg, rgba(255,181,161,0.5), rgba(255,255,255,0.3))",
                    borderRadius: "inherit",
                    zIndex: -1,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  },
                  "&:hover::before": {
                    opacity: 1,
                  },
                }}
              >
                {offer?.discount}
              </Box>
            </Box>
          ))}
        </Box>
        <Box 
          sx={{ 
            width: "100%", 
            display: "flex", 
            justifyContent: "center", 
            my: { xs: 5, md: 7 }, 
            mb: { xs: 6, md: 8 }, 
            overflow: "hidden",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "200%",
              height: "200%",
              background: "radial-gradient(circle, rgba(255,181,161,0.1) 0%, transparent 70%)",
              animation: "pulse 4s ease-in-out infinite",
              "@keyframes pulse": {
                "0%, 100%": { transform: "translate(-50%, -50%) scale(1)", opacity: 0.5 },
                "50%": { transform: "translate(-50%, -50%) scale(1.2)", opacity: 0.8 },
              },
              zIndex: 0,
              pointerEvents: "none",
            },
          }}
        >
          <Box
            component="img"
            src={specialMomentslogo}
            alt="special moments"
            sx={{
              position: "relative",
              zIndex: 1,
              maxWidth: "100%",
              height: "auto",
              filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.15))",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: { xs: 3, md: 5 },
            my: { xs: 6, md: 8 },
          }}
        >
          {specialMoments?.map((offer, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                borderRadius: { xs: 2.5, md: 3 },
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05) inset",
                animation: `fadeInUp 0.7s ease-out ${index * 0.15}s both`,
                "@keyframes fadeInUp": {
                  "0%": {
                    opacity: 0,
                    transform: "translateY(40px) scale(0.95)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translateY(0) scale(1)",
                  },
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(135deg, rgba(255,181,161,0.15) 0%, rgba(95,41,48,0.1) 100%)",
                  opacity: 0,
                  transition: "opacity 0.6s ease",
                  zIndex: 1,
                  pointerEvents: "none",
                },
                "&:hover": {
                  transform: "translateY(-15px) scale(1.04)",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,181,161,0.4) inset",
                  "&::before": {
                    opacity: 1,
                  },
                  "& img": {
                    transform: "scale(1.2)",
                    filter: "brightness(1.1)",
                  },
                  "& .special-overlay": {
                    opacity: 1,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.98) 100%)",
                    transform: "translateY(0)",
                  },
                },
              }}
            >
              <Box
                component="img"
                src={offer?.img}
                alt={offer?.title}
                sx={{
                  width: "100%",
                  height: { xs: 280, sm: 330, md: 420 },
                  objectFit: "cover",
                  transition: "transform 0.9s cubic-bezier(0.4, 0, 0.2, 1), filter 0.6s ease",
                  filter: "brightness(0.9)",
                }}
              />
              <Box
                className="special-overlay"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  p: { xs: 2, md: 3 },
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.85) 100%)",
                  color: "#fff",
                  textAlign: "center",
                  transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  opacity: 1,
                  transform: "translateY(0)",
                  zIndex: 2,
                }}
              >
                <Typography 
                  sx={{ 
                    fontSize: { xs: 18, sm: 20, md: 24 }, 
                    fontWeight: 800,
                    textShadow: "0 2px 15px rgba(0,0,0,0.6)",
                    lineHeight: 1.3,
                  }}
                >
                  {offer?.title}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <CakeSection />
      </Box>
      <Box>
        <PersonalisedInstant />
        <TestimonialsSection />
        <Artical />
      </Box>
    </Box>
  );
};
