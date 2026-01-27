import Slider from "react-slick";
import { Box, IconButton, CircularProgress, Alert } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import cat1 from "../../assets/09f1ee59e9d78cc206e6e867e1cda04c1887d8f8.png";
import cat2 from "../../assets/60be109ca830b1d8ab92f161cd0ca3083a16e4ca.png";
import cat3 from "../../assets/43676d15934fc50bdda59d3e39fd8a4ceaadcb9e.png";
import { useItemCategories } from "../../hooks/useItemCategories";
import { useNavigate } from "react-router-dom";
import { CustomText } from "../comman/CustomText";
import { useEffect, useRef, useState } from "react";

const getCategoryImage = (categoryName, index) => {
  const images = [cat1, cat2, cat3];
  return images[index % images.length];
};

export const CategoryCarousel = () => {
  let sliderRef = null;
  const { categories, loading, error } = useItemCategories();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Set visible immediately if component is already in viewport
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInViewport) {
        setVisible(true);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.01, rootMargin: "50px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    // Fallback: make visible after 500ms if observer doesn't trigger
    const fallbackTimer = setTimeout(() => {
      setVisible(true);
    }, 500);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const items = categories?.map((category, index) => ({
    id: category?.id,
    title: category?.groupname,
    img: category?.image || getCategoryImage(category?.groupname, index),
    brand: category?.brand,
    brandid: category?.brandid,
  }));

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5 } },
      { breakpoint: 992, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 576, settings: { slidesToShow: 2 } },
    ],
  };

  const handleToProductList = (categoryId) => {
    navigate(`/products?categoryId=${categoryId}`)
  }

  return (
    loading ? (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
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
          mb: { xs: 6, md: 8 },
          opacity: visible ? 1 : 0.3,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          visibility: "visible",
          minHeight: "200px",
        }}
      >
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <CustomText sx={{ fontSize: { xs: 12, md: 14 }, fontWeight: 600, color: "#FF9472", textTransform: "uppercase", letterSpacing: 2, mb: 1, }}>
            Browse Categories
          </CustomText>
          <CustomText sx={{ fontSize: { xs: 28, sm: 34, md: 42 }, fontWeight: 800, color: "var(--themeColor)", mb: 2, }}>
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
            <IconButton
              onClick={() => sliderRef?.slickPrev()}
              sx={{
                position: "absolute",
                left: { xs: 5, md: 10 },
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                backgroundColor: "#fff",
                border: "2px solid rgba(255,181,161,0.3)",
                width: { xs: 40, md: 50 },
                height: { xs: 40, md: 50 },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                "&:hover": {
                  backgroundColor: "var(--themeColor)",
                  borderColor: "var(--themeColor)",
                  transform: "translateY(-50%) scale(1.1)",
                  "& svg": {
                    color: "#fff",
                  },
                },
              }}
            >
              <ArrowBackIosNewIcon sx={{ color: "var(--themeColor)", fontSize: { xs: 20, md: 24 } }} />
            </IconButton>

            {/* Carousel */}
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
                {items?.map((item, i) => (
                  <Box
                    key={item.id || i}
                    sx={{
                      cursor: "pointer",
                      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      px: { xs: 0.5, md: 1 },
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(30px)",
                      animation: visible ? `fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.1}s both` : "none",
                      "@keyframes fadeInUp": {
                        "0%": { opacity: 0, transform: "translateY(30px)" },
                        "100%": { opacity: 1, transform: "translateY(0)" },
                      },
                    }}
                  >
                    <Box
                      className="category-card"
                      onClick={() => handleToProductList(item.id)}
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.95)",
                        backdropFilter: "blur(10px)",
                        borderRadius: { xs: "20px", md: "25px" },
                        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                        overflow: "visible",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: { xs: 1, md: 1.5 },
                        p: { xs: 1.5, md: 2 },
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        border: "2px solid rgba(255,181,161,0.2)",
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "0",
                          height: "0",
                          borderRadius: "50%",
                          background: "radial-gradient(circle, rgba(255,181,161,0.2) 0%, transparent 70%)",
                          transition: "all 0.5s ease",
                          zIndex: -1,
                        },
                        "&:hover": {
                          transform: "translateY(-15px) scale(1.08)",
                          boxShadow: "0 12px 40px rgba(255,181,161,0.3)",
                          borderColor: "rgba(255,181,161,0.5)",
                          backgroundColor: "#fff",
                          "&::before": {
                            width: "150%",
                            height: "150%",
                          },
                          "& img": {
                            transform: "scale(1.2) rotate(5deg)",
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
              </Slider>
            </Box>

            {/* Right Arrow */}
            <IconButton
              onClick={() => sliderRef?.slickNext()}
              sx={{
                position: "absolute",
                right: { xs: 5, md: 10 },
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                backgroundColor: "#fff",
                border: "2px solid rgba(255,181,161,0.3)",
                width: { xs: 40, md: 50 },
                height: { xs: 40, md: 50 },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                "&:hover": {
                  backgroundColor: "var(--themeColor)",
                  borderColor: "var(--themeColor)",
                  transform: "translateY(-50%) scale(1.1)",
                  "& svg": {
                    color: "#fff",
                  },
                },
              }}
            >
              <ArrowForwardIosIcon sx={{ color: "var(--themeColor)", fontSize: { xs: 20, md: 24 } }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    )
  );
};
