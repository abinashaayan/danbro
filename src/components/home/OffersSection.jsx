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
    <Box sx={{ px: { xs: 2, sm: 3, md: 6 }}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: { xs: 2, md: 4 },
          alignItems: { xs: "flex-start", md: "center" },
          mb: { xs: 3, md: 4 },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 28, sm: 32, md: 38 },
            fontWeight: 800,
            color: "var(--themeColor)",
          }}
        >
          Offers
        </Typography>

        {/* Categories */}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", md: "end" },
            gap: { xs: 1, sm: 2, md: 4 },
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {tabs?.map((tab) => (
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
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                whiteSpace: "nowrap",
                "&:hover": {
                  transform: "translateY(-2px)",
                  backgroundColor: activeTab === tab ? "#fff4f0" : "rgba(255,244,240,0.5)",
                  border: "2px solid var(--themeColor)",
                  boxShadow: "0 4px 12px rgba(95,41,48,0.15)",
                },
              }}
            >
              {tab}
            </Button>
          ))}
        </Box>
      </Box>
      {/* Offer */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: { xs: 2, md: 3 },
          mb: { xs: 5, md: 6 },
        }}
      >
        {filteredItems?.map((offer, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              borderRadius: 3,
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              "&:hover": {
                transform: "translateY(-8px) scale(1.02)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
                "& img": {
                  transform: "scale(1.1)",
                },
                "& .overlay-content": {
                  opacity: 1,
                  transform: "translateY(0)",
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
                height: { xs: 200, sm: 230, md: 260 },
                objectFit: "cover",
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
            <Box
              className="overlay-content"
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                p: { xs: 1.5, md: 2 },
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.85) 100%)",
                color: "#fff",
                transition: "all 0.4s ease",
                opacity: 1,
                transform: "translateY(0)",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 12, md: 14 },
                  opacity: 0.9,
                  color: "#FFB5A1",
                }}
              >
                {offer?.subtitle}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 16, sm: 18, md: 22 },
                  fontWeight: 700,
                }}
              >
                {offer?.title}
              </Typography>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: { xs: 10, md: 15 },
                background: "#0A1234",
                px: { xs: 1.5, md: 2 },
                py: { xs: 1.5, md: 2 },
                borderRadius: 1,
                fontSize: { xs: 12, md: 15 },
                fontWeight: "bold",
                color: "#fff",
                transition: "all 0.3s ease",
                animation: "pulse 2s ease-in-out infinite",
                "@keyframes pulse": {
                  "0%, 100%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.05)" },
                },
                "&:hover": {
                  transform: "scale(1.1) rotate(5deg)",
                  boxShadow: "0 4px 15px rgba(10,18,52,0.4)",
                },
              }}
            >
              {offer?.discount}
            </Box>
          </Box>
        ))}
      </Box>
      {/* Special title */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          my: { xs: 4, md: 5 },
          mb: { xs: 5, md: 6 },
          overflow: "hidden",
        }}
      >
        <img src={specialMomentslogo} alt="special moments" />
      </Box>
      {/* Categories */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: { xs: 2, md: 4 },
          my: { xs: 5, md: 6 },
        }}
      >
        {specialMoments?.map((offer, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              borderRadius: 3,
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
              "&:hover": {
                transform: "translateY(-10px) scale(1.03)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
                "& img": {
                  transform: "scale(1.15)",
                },
                "& .special-overlay": {
                  opacity: 1,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.95) 100%)",
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
                height: { xs: 250, sm: 300, md: 400 },
                objectFit: "cover",
                transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
            <Box
              className="special-overlay"
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                p: { xs: 1.5, md: 2 },
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.85) 100%)",
                color: "#fff",
                textAlign: "center",
                transition: "all 0.5s ease",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 16, sm: 18, md: 22 },
                  fontWeight: 700,
                }}
              >
                {offer?.title}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <CakeSection />
      <PersonalisedInstant />
      <TestimonialsSection />
      <Artical />
    </Box>
  );
};
