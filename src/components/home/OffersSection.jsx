import { Box, Typography, Button } from "@mui/material";
import offer1 from "../../assets/Group 8.png";
import offer2 from "../../assets/Group 8 (2).png";
import offer3 from "../../assets/Group 8 (1).png";
import { useState } from "react";

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


export const OffersSection = () => {
  const [activeTab, setActiveTab] = useState("Danbro Special");
  const filteredItems =
    activeTab === "Others"
      ? offers
      : offers.filter((item) => item.category === activeTab);

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      <Typography sx={{ fontSize: 38, fontWeight: 800, color: "var(--themeColor)", mb: 1, }}>
        Offers
      </Typography>

      {/* Tabs */}
      <Box sx={{ display: "flex", gap: 4, alignItems: "center", mb: 4 }}>
        {tabs?.map((tab) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color:
                activeTab === tab ? "var(--themeColor)" : "rgba(0,0,0,0.7)",
              border:
                activeTab === tab
                  ? "2px solid var(--themeColor)"
                  : "2px solid transparent",
              backgroundColor: activeTab === tab ? "#fff4f0" : "transparent",
              borderRadius: 20,
              px: activeTab === tab ? 3 : 0,
              py: activeTab === tab ? 0.6 : 0,
              transition: "0.25s",
            }}
          >
            {tab}
          </Button>
        ))}
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 3, }}>
        {filteredItems?.map((offer, index) => (
          <Box key={index} sx={{ position: "relative", borderRadius: 3, overflow: "hidden", cursor: "pointer", }}>
            <img src={offer.img} alt={offer.title} style={{ width: "100%", height: 260, objectFit: "cover" }} />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                p: 2,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.85) 100%)",
                color: "#fff",
              }}
            >
              <Typography sx={{ fontSize: 14, opacity: 0.9 }}>
                {offer.subtitle}
              </Typography>
              <Typography sx={{ fontSize: 22, fontWeight: 700 }}>
                {offer.title}
              </Typography>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 15,
                background: "#0A1234",
                px: 2,
                py: 2,
                borderRadius: 1,
                fontSize: 15,
                fontWeight: 'bold',
                color: "#fff",
              }}
            >
              {offer.discount}
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", my: 3 }}>
        <Typography
          sx={{
            fontSize:'150px',
            fontWeight: 'bold',
            letterSpacing: 4,
            textAlign: "center",
            color: "transparent",
            WebkitTextStroke: "2px var(--specialColor)",
            opacity: 0.15,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          SPECIAL MOMENTS
        </Typography>
      </Box>
    </Box>
  );
};
