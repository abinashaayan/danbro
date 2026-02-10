import { Box, CircularProgress, Alert } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CustomCarousel, CustomCarouselArrow } from "../comman/CustomCarousel";
import cat1 from "../../assets/09f1ee59e9d78cc206e6e867e1cda04c1887d8f8.png";
import cat2 from "../../assets/60be109ca830b1d8ab92f161cd0ca3083a16e4ca-B0hMvy0v.webp";
import cat3 from "../../assets/43676d15934fc50bdda59d3e39fd8a4ceaadcb9e-Rpx5ZY2j.webp";
import { useItemCategories } from "../../hooks/useItemCategories";
import { useNavigate } from "react-router-dom";
import { CustomText } from "../comman/CustomText";
import { useEffect, useRef, useState } from "react";

const getCategoryImage = (categoryName, index) => {
  const images = [cat1, cat2, cat3];
  return images[index % images.length];
};

export const CategoryCarousel = ({ categories: propCategories }) => {
  const carouselRef = useRef(null);
  const { categories: hookCategories, loading, error } = useItemCategories();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true); // Start visible immediately
  const sectionRef = useRef(null);

  const categories = propCategories || hookCategories;
  const isLoading = propCategories ? false : loading;

  // Set visible immediately if categories are available
  useEffect(() => {
    if (categories && categories.length > 0) {
      setVisible(true);
    }
  }, [categories]);

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

  return (
    isLoading ? (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress sx={{ color: "var(--themeColor)" }} />
      </Box>
    ) : error || !items || items.length === 0 ? (
      <Box>
        <Alert severity={error ? "error" : "info"} sx={{ borderRadius: 2 }}>
          {error ? `Failed to load categories: ${error}` : "No categories available at the moment."}
        </Alert>
      </Box>
    ) : (
      <Box
        ref={sectionRef}
        sx={{
          mb: { xs: 2, md: 4 },
          opacity: 1,
          transform: "translateY(0)",
          visibility: "visible",
          minHeight: "200px",
        }}
      >
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 2, md: 4 } }}>
          <CustomText sx={{ fontSize: { xs: 12, md: 14 }, fontWeight: 600, color: "#FF9472", textTransform: "uppercase", letterSpacing: 2 }}>
            Browse Categories
          </CustomText>
          <CustomText sx={{ fontSize: { xs: 28, sm: 34, md: 42 }, fontWeight: 800, color: "var(--themeColor)" }}>
            Shop by Category
          </CustomText>
          <CustomText sx={{ fontSize: { xs: 14, md: 16 }, color: "#666", maxWidth: 600, mx: "auto", }}>
            Discover our wide range of delicious bakery products
          </CustomText>
        </Box>

        <Box sx={{ px: { xs: 2, md: 3, lg: 2 }, position: "relative" }}>
          <Box>
            {[...Array(5)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: "absolute",
                  width: { xs: "30px", md: "50px" },
                  height: { xs: "30px", md: "50px" },
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,181,161,0.3) 0%, transparent 70%)",
                  top: `${15 + i * 20}%`,
                  left: i % 2 === 0 ? "8%" : "auto",
                  right: i % 2 === 1 ? "8%" : "auto",
                  animation: `floatCategory ${8 + i * 2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.8}s`,
                  zIndex: 0,
                  pointerEvents: "none",
                  filter: "blur(15px)",
                  "@keyframes floatCategory": {
                    "0%, 100%": { transform: "translateY(0px) scale(1)" },
                    "50%": { transform: `translateY(${-20 - i * 5}px) scale(1.2)` },
                  },
                }}
              />
            ))}

            {/* Left Arrow */}
            <CustomCarouselArrow
              direction="prev"
              onClick={() => carouselRef.current?.handlePrev()}
              sx={{
                display: { xs: "none", md: "flex" }, // Hide on mobile
              }}
            >
              <ArrowBackIosNewIcon sx={{ color: "var(--themeColor)", fontSize: { xs: 20, md: 24 } }} />
            </CustomCarouselArrow>

            {/* Carousel */}
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <CustomCarousel
                ref={carouselRef}
                slidesToShow={6}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={3500}
                pauseOnHover={true}
                swipeToSlide={true}
                infinite={true}
                speed={0}
                cssEase="none"
                arrows={false}
                responsive={[
                  { breakpoint: 1200, settings: { slidesToShow: 5 } },
                  { breakpoint: 992, settings: { slidesToShow: 4 } },
                  { breakpoint: 768, settings: { slidesToShow: 3 } },
                  { breakpoint: 600, settings: { slidesToShow: 2.2, autoplay: false } },
                  { breakpoint: 480, settings: { slidesToShow: 1.8, autoplay: false } }
                ]}
              >
                {items?.map((item, i) => (
                  <Box
                    key={item?.id || i}
                    sx={{
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      px: { xs: 0.5, md: 1 },
                      opacity: 1,
                      transform: "translateY(0)",
                    }}
                  >
                    <Box
                      className="category-card"
                      onClick={() => handleToProductList(item?.categoryId)}
                      sx={{
                        backdropFilter: "blur(10px)",
                        borderRadius: { xs: "20px", md: "25px" },
                        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: { xs: 1, md: 1.5 },
                        p: { xs: 1.5, md: 2 },
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        border: "2px solid rgba(255,181,161,0.2)",
                        position: "relative",
                        overflow: "visible",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "0",
                          height: "0",
                          borderRadius: "50%",
                          transition: "all 0.5s ease",
                          zIndex: -1,
                        },
                        "&:hover": {
                          transform: "translateY(-10px) scale(1.08)",
                          boxShadow: "0 12px 40px rgba(255,181,161,0.3)",
                          borderColor: "rgba(255,181,161,0.5)",
                          backgroundColor: "#fff",
                          "&::before": {
                            width: "150%",
                            height: "150%",
                          },
                          "& img": {
                            transform: "scale(1.15) rotate(3deg)",
                            filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.25)) brightness(1.1)",
                          },
                          "& .category-title": {
                            color: "var(--themeColor)",
                            transform: "scale(1.1)",
                            fontWeight: 700,
                          },
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            top: "-5px",
                            left: "-5px",
                            right: "-5px",
                            bottom: "-5px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, rgba(255,181,161,0.3), rgba(95,41,48,0.2))",
                            opacity: 0,
                            transition: "opacity 0.5s ease",
                            zIndex: -1,
                          },
                        }}
                      >
                        <Box
                          component="img"
                          src={item?.img}
                          alt={item?.title}
                          loading="lazy"
                          sx={{
                            height: { xs: 70, sm: 80, md: 100, lg: 120 },
                            width: { xs: 70, sm: 80, md: 100, lg: 120 },
                            borderRadius: "50%",
                            objectFit: "cover",
                            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                            filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.15))",
                            border: { xs: "3px solid #fff", md: "4px solid #fff" },
                            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                            position: "relative",
                            zIndex: 1,
                          }}
                        />
                      </Box>
                      <CustomText
                        className="category-title"
                        autoTitleCase={true}
                        sx={{
                          fontSize: { xs: 11, sm: 12, md: 14 },
                          fontWeight: 600,
                          color: "var(--themeColor)",
                          textAlign: "center",
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          lineHeight: 1.3,
                          px: 1,
                        }}
                      >
                        {item?.title}
                      </CustomText>
                    </Box>
                  </Box>
                ))}
              </CustomCarousel>
            </Box>

            {/* Right Arrow */}
            <CustomCarouselArrow
              direction="next"
              onClick={() => carouselRef.current?.handleNext()}
              sx={{
                display: { xs: "none", md: "flex" }, // Hide on mobile
              }}
            >
              <ArrowForwardIosIcon sx={{ color: "var(--themeColor)", fontSize: { xs: 20, md: 24 } }} />
            </CustomCarouselArrow>
          </Box>
        </Box>
      </Box>
    )
  );
};
