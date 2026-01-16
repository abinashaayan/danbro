import Slider from "react-slick";
import { Box, IconButton, Typography, CircularProgress, Alert } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import cat1 from "../../assets/09f1ee59e9d78cc206e6e867e1cda04c1887d8f8.png";
import cat2 from "../../assets/60be109ca830b1d8ab92f161cd0ca3083a16e4ca.png";
import cat3 from "../../assets/43676d15934fc50bdda59d3e39fd8a4ceaadcb9e.png";
import { useItemCategories } from "../../hooks/useItemCategories";
import { useNavigate } from "react-router-dom";


// Helper function to get image based on category name or index
const getCategoryImage = (categoryName, index) => {
  const images = [cat1, cat2, cat3];
  return images[index % images.length];
};

export const CategoryCarousel = () => {
  let sliderRef = null;
  const { categories, loading, error } = useItemCategories();

  const navigate = useNavigate();

  // Transform API data to component format
  const items = categories?.map((category, index) => ({
    id: category?.id,
    title: category?.groupname,
    img: getCategoryImage(category?.groupname, index),
    brand: category?.brand,
    brandid: category?.brandid,
  }));

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
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
      <Box sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <Alert severity={error ? "error" : "info"} sx={{ borderRadius: 2 }}>
          {error ? `Failed to load categories: ${error}` : "No categories available at the moment."}
        </Alert>
      </Box>
    ) : (
      <Box sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <Box
          sx={{
            width: "100%",
            background: "linear-gradient(135deg, #fbd9d3 0%, #ffe5e1 50%, #fbd9d3 100%)",
            borderRadius: { xs: "30px", md: "100px" },
            py: { xs: 2, md: 4 },
            px: { xs: 1, md: 4 },
            mb: { xs: 4, md: 6 },
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
              animation: "rotate 20s linear infinite",
              "@keyframes rotate": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
              zIndex: 0,
              pointerEvents: "none",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
              animation: "shimmer 3s ease-in-out infinite",
              "@keyframes shimmer": {
                "0%, 100%": { transform: "translateX(-100%)" },
                "50%": { transform: "translateX(100%)" },
              },
              zIndex: 0,
              pointerEvents: "none",
            },
          }}
        >
          {[...Array(3)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                width: { xs: "60px", md: "100px" },
                height: { xs: "60px", md: "100px" },
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,181,161,0.2) 0%, transparent 70%)",
                top: `${20 + i * 30}%`,
                left: i % 2 === 0 ? "5%" : "auto",
                right: i % 2 === 1 ? "5%" : "auto",
                animation: `floatCategory ${6 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
                zIndex: 0,
                pointerEvents: "none",
                "@keyframes floatCategory": {
                  "0%, 100%": { transform: "translateY(0px) scale(1)" },
                  "50%": { transform: `translateY(${-15 - i * 5}px) scale(1.1)` },
                },
              }}
            />
          ))}

          <IconButton
            onClick={() => sliderRef.slickPrev()}
            sx={{
              position: "absolute",
              left: { xs: 8, md: 15 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              backgroundColor: "transparent",
              backdropFilter: "none",
              width: { xs: 36, md: 48 },
              height: { xs: 36, md: 48 },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <ArrowBackIosNewIcon sx={{ color: "var(--themeColor)", fontSize: { xs: 20, md: 28 } }} />
          </IconButton>

          {/* Carousel */}
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
              {items?.map((item, i) => (
                <Box
                  key={item.id || i}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
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
                      transition: "all 0.4s ease",
                      zIndex: -1,
                    },
                    "&:hover": {
                      transform: "translateY(-12px) scale(1.05)",
                      "&::before": {
                        width: "120%",
                        height: "120%",
                      },
                      "& img": {
                        transform: "scale(1.25) rotate(180deg)",
                        filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.2))",
                      },
                      "& .category-title": {
                        color: "var(--specialColor)",
                        transform: "scale(1.08)",
                        fontWeight: 700,
                      },
                    },
                  }}
                >
                  <Box className="category-card" onClick={() => handleToProductList(item.id)} sx={{ backgroundColor: "transparent", backdropFilter: "blur(10px)", borderRadius: { xs: "15px", md: "20px" }, transition: "all 0.4s ease", overflow: "visible", }}>
                    <Box
                      component="img"
                      src={item?.img}
                      alt=""
                      sx={{
                        height: { xs: 65, md: 95 },
                        width: "100%",
                        objectFit: "contain",
                        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                        filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
                      }}
                    />
                    <Typography
                      className="category-title"
                      sx={{
                        fontSize: { xs: 10, sm: 11, md: 13 },
                        fontWeight: 600,
                        color: "var(--themeColor)",
                        textAlign: "center",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        textShadow: "0 1px 2px rgba(255,255,255,0.8)",
                      }}
                    >
                      {item?.title}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>

          {/* Right Arrow */}
          <IconButton
            onClick={() => sliderRef.slickNext()}
            sx={{
              position: "absolute",
              right: { xs: 8, md: 15 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              backgroundColor: "transparent",
              backdropFilter: "none",
              width: { xs: 36, md: 48 },
              height: { xs: 36, md: 48 },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <ArrowForwardIosIcon sx={{ color: "var(--themeColor)", fontSize: { xs: 20, md: 28 } }} />
          </IconButton>
        </Box>
      </Box>
    )
  );
};
