import { Box, CircularProgress, Alert, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CategoryIcon from "@mui/icons-material/Category";
import CookieIcon from "@mui/icons-material/Cookie";
import TagIcon from "@mui/icons-material/Tag";
import cat1 from "../../assets/09f1ee59e9d78cc206e6e867e1cda04c1887d8f8.webp";
import cat2 from "../../assets/60be109ca830b1d8ab92f161cd0ca3083a16e4ca-B0hMvy0v.webp";
import cat3 from "../../assets/43676d15934fc50bdda59d3e39fd8a4ceaadcb9e-Rpx5ZY2j.webp";
import { useItemCategories } from "../../hooks/useItemCategories";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./CategoryCarousel.css";

const BRAND_COLOR = "#5F2930";

const getCategoryImage = (categoryName, index) => {
  const images = [cat1, cat2, cat3];
  return images[index % images.length];
};

export const CategoryCarousel = ({ categories: propCategories }) => {
  const carouselRef = useRef(null);
  const { categories: hookCategories, loading, error } = useItemCategories();
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  const categories = propCategories || hookCategories;
  const isLoading = propCategories ? false : loading;

  const items = categories?.map((category, index) => ({
    id: category?.id ?? category?.categoryId,
    categoryId: category?.categoryId ?? category?.id,
    title: category?.categoryName || category?.groupname,
    img: category?.image || getCategoryImage(category?.categoryName || category?.groupname, index),
    brand: category?.brand,
    brandid: category?.brandid,
  }));

  const handleToProductList = (categoryId) => {
    if (categoryId == null) return;
    navigate(`/products?categoryId=${encodeURIComponent(String(categoryId))}`);
  };

  const scrollCarousel = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollAmount = 300;
    el.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 4 }}>
        <CircularProgress sx={{ color: BRAND_COLOR }} />
      </Box>
    );
  }

  if (error || !items || items?.length === 0) {
    return (
      <Box sx={{ mb: 3 }}>
        <Alert severity={error ? "error" : "info"} sx={{ borderRadius: 2 }}>
          {error ? `Failed to load categories: ${error}` : "No categories available at the moment."}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      ref={sectionRef}
      sx={{
        width: "100%",
        margin: "0 auto",
        py: { xs: 2, md: 4 },
        px: { xs: 1, md: 2 },
      }}
    >
      {/* Section header – same as HTML */}
      <Box
        className="category-header-container"
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          mb: 2.5,
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Box className="category-header-title-wrapper" sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", flex: 1 }}>
          <Box
            component="h2"
            className="home-section-heading"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem", lg: "2.2rem" },
              fontWeight: 800,
              color: "#2d1e1b",
              letterSpacing: "-0.01em",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              m: 0,
              flex: 1,
            }}
          >
            <CategoryIcon className="category-header-icon" sx={{ color: BRAND_COLOR, fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" }, opacity: 0.9 }} />
            Our sweet categories
          </Box>
        </Box>
        <Box className="category-badge-arrows-row" sx={{ display: "flex", gap: 1.2, alignItems: "center", flexShrink: 0 }}>
          <Box className="category-nav-buttons" sx={{ display: "flex", gap: 1.2, alignItems: "center" }}>
          <IconButton
            className="carousel-nav-btn"
            onClick={() => scrollCarousel("left")}
            sx={{
              width: 48,
              height: 48,
              borderRadius: "60px",
              bgcolor: "white",
              border: "1px solid rgba(95, 41, 48, 0.2)",
              color: BRAND_COLOR,
              boxShadow: "0 6px 14px rgba(0,0,0,0.02)",
              "&:hover": {
                bgcolor: BRAND_COLOR,
                color: "white",
                borderColor: BRAND_COLOR,
                transform: "scale(1.06)",
              },
            }}
            aria-label="Scroll left"
          >
            <ArrowBackIosNewIcon sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" } }} />
          </IconButton>
          <IconButton
            className="carousel-nav-btn"
            onClick={() => scrollCarousel("right")}
            sx={{
              width: 48,
              height: 48,
              borderRadius: "60px",
              bgcolor: "white",
              border: "1px solid rgba(95, 41, 48, 0.2)",
              color: BRAND_COLOR,
              boxShadow: "0 6px 14px rgba(0,0,0,0.02)",
              "&:hover": {
                bgcolor: BRAND_COLOR,
                color: "white",
                borderColor: BRAND_COLOR,
                transform: "scale(1.06)",
              },
            }}
            aria-label="Scroll right"
          >
            <ArrowForwardIosIcon sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" } }} />
          </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Carousel – horizontal scroll, scrollbar hidden, full width */}
      <Box
        ref={carouselRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          gap: "1.8rem",
          py: 1,
          px: 0.8,
          pb: 2,
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          width: "100%",
          maxWidth: "100%",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {items?.map((item, i) => (
          <Box
            key={item?.id ?? i}
            onClick={() => handleToProductList(item?.categoryId)}
            sx={{
              flex: "0 0 auto",
              width: { xs: 200, sm: 240, md: 280 },
              background: "white",
              borderRadius: "42px",
              boxShadow: "0 18px 30px -10px rgba(95, 41, 48, 0.12)",
              p: "1.8rem 1.2rem",
              transition: "all 0.35s cubic-bezier(0.2, 0.9, 0.4, 1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              border: "1px solid rgba(255, 230, 220, 0.6)",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-14px) scale(1.02)",
                boxShadow: "0 32px 50px -16px rgba(95, 41, 48, 0.28)",
                borderColor: "rgba(95, 41, 48, 0.25)",
                bgcolor: "#fffdfc",
                "& .card-img-category": {
                  borderColor: BRAND_COLOR,
                  boxShadow: "0 26px 36px -10px #5F2930",
                  transform: "scale(1.02)",
                  "& img": {
                    transform: "scale(1.12)",
                    filter: "brightness(1.06) saturate(1.1)",
                  },
                },
                "& .card-accent": { width: 80, background: "#7a424a" },
                "& .category-name": { color: BRAND_COLOR },
              },
            }}
          >
            {/* Floating dots – first two cards */}
            {i < 2 && (
              <>
                <Box
                  sx={{
                    position: "absolute",
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: "rgba(95, 41, 48, 0.2)",
                    top: "15%",
                    right: "12%",
                    filter: "blur(3px)",
                    animation: "floatCategory 6s infinite alternate",
                    "@keyframes floatCategory": {
                      "0%": { transform: "translate(0, 0) scale(1)", opacity: 0.3 },
                      "100%": { transform: "translate(-10px, -15px) scale(1.5)", opacity: 0.8 },
                    },
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    bgcolor: "rgba(230, 180, 140, 0.3)",
                    left: "10%",
                    bottom: "15%",
                    filter: "blur(4px)",
                    animation: "floatCategory2 8s infinite alternate",
                    "@keyframes floatCategory2": {
                      "0%": { transform: "translate(0, 0)" },
                      "100%": { transform: "translate(15px, -10px) scale(1.4)" },
                    },
                  }}
                />
              </>
            )}

            {/* Image container */}
            <Box
              className="card-img-category"
              sx={{
                width: { xs: 110, sm: 130, md: 160 },
                height: { xs: 110, sm: 130, md: 160 },
                borderRadius: "50%",
                overflow: "hidden",
                mb: 1.5,
                position: "relative",
                boxShadow: "0 18px 26px -8px rgba(95, 41, 48, 0.2)",
                border: "4px solid white",
                transition: "all 0.4s",
              }}
            >
              {item?.img ? (
                <Box
                  component="img"
                  src={item.img}
                  alt={item?.title}
                  loading="lazy"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.55s ease, filter 0.5s ease",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(145deg, #f8e4db, #f3dcd2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: BRAND_COLOR,
                    fontSize: "2.8rem",
                  }}
                >
                  <CategoryIcon sx={{ fontSize: 48 }} />
                </Box>
              )}
            </Box>

            {/* Category name */}
            <Box
              className="category-name"
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                color: "#2f2421",
                lineHeight: 1.2,
                mb: 0.3,
                transition: "color 0.2s",
                letterSpacing: "-0.5px",
              }}
            >
              {item?.title}
            </Box>

            {/* Accent line */}
            <Box
              className="card-accent"
              sx={{
                width: 50,
                height: 4,
                background: BRAND_COLOR,
                borderRadius: "10px",
                my: "0.8rem 1rem",
                transition: "width 0.3s",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
