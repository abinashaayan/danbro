import { Box, IconButton, Button, CircularProgress } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addToCart } from "../../utils/cart";
import { getAccessToken } from "../../utils/cookies";
import { CustomToast } from "../comman/CustomToast";
import offer1 from "../../assets/Group 8.png";
import offer2 from "../../assets/Group 8 (2).png";
import offer3 from "../../assets/Group 8 (1).png";

const featuredProducts = [
  {
    id: 1,
    title: "Red Velvet Delight",
    description: "Luxurious red velvet cake with cream cheese frosting",
    price: "₹899",
    originalPrice: "₹1299",
    discount: "31% OFF",
    image: offer1,
    rating: 4.8,
    reviews: 234,
    badge: "Bestseller",
  },
  {
    id: 2,
    title: "Chocolate Fudge Cake",
    description: "Rich chocolate cake with fudge frosting",
    price: "₹749",
    originalPrice: "₹999",
    discount: "25% OFF",
    image: offer2,
    rating: 4.9,
    reviews: 189,
    badge: "New",
  },
  {
    id: 3,
    title: "Strawberry Dream",
    description: "Fresh strawberry cake with vanilla cream",
    price: "₹849",
    originalPrice: "₹1199",
    discount: "29% OFF",
    image: offer3,
    rating: 4.7,
    reviews: 156,
    badge: "Popular",
  },
  {
    id: 4,
    title: "Vanilla Bean Cake",
    description: "Classic vanilla cake with buttercream",
    price: "₹699",
    originalPrice: "₹899",
    discount: "22% OFF",
    image: offer1,
    rating: 4.6,
    reviews: 201,
    badge: "Trending",
  },
  {
    id: 5,
    title: "Carrot Cake Special",
    description: "Moist carrot cake with cream cheese",
    price: "₹799",
    originalPrice: "₹1099",
    discount: "27% OFF",
    image: offer2,
    rating: 4.8,
    reviews: 178,
    badge: "Bestseller",
  },
];

export const FeaturedProductsCarousel = () => {
  const navigate = useNavigate();
  let sliderRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const [loadingCart, setLoadingCart] = useState(new Set());
  const [toast, setToast] = useState({ 
    open: false, 
    message: "", 
    severity: "success", 
    loading: false 
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = getAccessToken();
    setIsLoggedIn(!!token);
  }, []);

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

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        mb: { xs: 6, md: 8 },
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <CustomText
            sx={{
              fontSize: { xs: 12, md: 14 },
              fontWeight: 600,
              color: "#FF9472",
              textTransform: "uppercase",
              letterSpacing: 2,
              mb: 1,
            }}
          >
            Featured Products
          </CustomText>
          <CustomText
            sx={{
              fontSize: { xs: 32, sm: 38, md: 48 },
              fontWeight: 800,
              color: "var(--themeColor)",
              mb: 2,
            }}
          >
            Our Bestsellers
          </CustomText>
          <CustomText
            sx={{
              fontSize: { xs: 14, md: 16 },
              color: "#666",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Handcrafted with love, our signature bakery items are made from the finest ingredients
          </CustomText>
        </Box>

        {/* Products Carousel */}
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() => sliderRef?.slickPrev()}
            sx={{
              position: "absolute",
              left: { xs: -15, md: -20 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              bgcolor: "#fff",
              color: "var(--themeColor)",
              width: { xs: 40, md: 50 },
              height: { xs: 40, md: 50 },
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              "&:hover": { bgcolor: "#f5f5f5", transform: "translateY(-50%) scale(1.1)" },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
            {featuredProducts.map((product, index) => (
              <Box 
                key={product.id} 
                sx={{ 
                  px: { xs: 1, md: 1.5 },
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`,
                }}
              >
                <Box
                  onClick={() => navigate(`/products/${product.id}`)}
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "linear-gradient(135deg, rgba(255,181,161,0.05) 0%, rgba(95,41,48,0.02) 100%)",
                      opacity: 0,
                      transition: "opacity 0.5s ease",
                      zIndex: 1,
                      pointerEvents: "none",
                    },
                    "&:hover": {
                      transform: "translateY(-12px) scale(1.02)",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                      "&::before": {
                        opacity: 1,
                      },
                      "& .product-image": {
                        transform: "scale(1.08)",
                      },
                      "& .add-cart-btn": {
                        opacity: 1,
                        transform: "translateY(0)",
                      },
                    },
                  }}
                >
                  {/* Product Image */}
                  <Box
                    sx={{
                      position: "relative",
                      height: { xs: 220, md: 280 },
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      className="product-image"
                      component="img"
                      src={product.image}
                      alt={product.title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                        willChange: "transform",
                      }}
                    />
                    {/* Badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 15,
                        left: 15,
                        bgcolor: "var(--themeColor)",
                        color: "#fff",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {product.badge}
                    </Box>
                    {/* Discount */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 15,
                        right: 15,
                        bgcolor: "#0A1234",
                        color: "#fff",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: 12,
                        fontWeight: 800,
                      }}
                    >
                      {product.discount}
                    </Box>
                    {/* Favorite Icon */}
                    <IconButton
                      sx={{
                        position: "absolute",
                        bottom: 15,
                        right: 15,
                        bgcolor: "rgba(255,255,255,0.9)",
                        width: 40,
                        height: 40,
                        "&:hover": { bgcolor: "#fff" },
                      }}
                    >
                      <FavoriteBorderIcon sx={{ fontSize: 20, color: "var(--themeColor)" }} />
                    </IconButton>
                  </Box>

                  {/* Product Info */}
                  <Box sx={{ p: 2.5 }}>
                    {/* Rating */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <StarIcon sx={{ fontSize: 16, color: "#FFD700" }} />
                      <CustomText sx={{ fontSize: 13, fontWeight: 600 }}>
                        {product.rating} ({product.reviews})
                      </CustomText>
                    </Box>

                    {/* Title */}
                    <CustomText
                      sx={{
                        fontSize: { xs: 18, md: 20 },
                        fontWeight: 700,
                        color: "var(--themeColor)",
                        mb: 0.5,
                      }}
                    >
                      {product.title}
                    </CustomText>

                    {/* Description */}
                    <CustomText
                      sx={{
                        fontSize: 13,
                        color: "#666",
                        mb: 2,
                        lineHeight: 1.5,
                        minHeight: 40,
                      }}
                    >
                      {product.description}
                    </CustomText>

                    {/* Price and Add to Cart */}
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box>
                        <CustomText sx={{ fontSize: 22, fontWeight: 800, color: "var(--themeColor)" }}>
                          {product.price}
                        </CustomText>
                        <CustomText
                          sx={{
                            fontSize: 14,
                            color: "#999",
                            textDecoration: "line-through",
                            ml: 1,
                          }}
                        >
                          {product.originalPrice}
                        </CustomText>
                      </Box>
                      <Button
                        className="add-cart-btn"
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={loadingCart.has(product?.id || product?.productId || product?._id)}
                        startIcon={
                          loadingCart.has(product?.id || product?.productId || product?._id) ? (
                            <CircularProgress size={16} sx={{ color: "#fff" }} />
                          ) : (
                            <ShoppingCartIcon />
                          )
                        }
                        sx={{
                          bgcolor: "var(--themeColor)",
                          color: "#fff",
                          px: 2,
                          py: 0.8,
                          borderRadius: 2,
                          fontSize: 13,
                          fontWeight: 600,
                          textTransform: "none",
                          position: "relative",
                          overflow: "hidden",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:disabled": {
                            opacity: 0.7,
                          },
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: 0,
                            height: 0,
                            borderRadius: "50%",
                            background: "rgba(255, 255, 255, 0.3)",
                            transform: "translate(-50%, -50%)",
                            transition: "width 0.6s ease, height 0.6s ease",
                          },
                          "&:hover": {
                            bgcolor: "#7a2d3a",
                            transform: "scale(1.05)",
                            boxShadow: "0 4px 15px rgba(95,41,48,0.4)",
                            "&::before": {
                              width: 300,
                              height: 300,
                            },
                          },
                          "&:active": {
                            transform: "scale(0.98)",
                          },
                        }}
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Slider>

          <IconButton
            onClick={() => sliderRef?.slickNext()}
            sx={{
              position: "absolute",
              right: { xs: -15, md: -20 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              bgcolor: "#fff",
              color: "var(--themeColor)",
              width: { xs: 40, md: 50 },
              height: { xs: 40, md: 50 },
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              "&:hover": { bgcolor: "#f5f5f5", transform: "translateY(-50%) scale(1.1)" },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

      {/* Toast Notification */}
      <CustomToast
        open={toast.open}
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
        severity={toast.severity}
        loading={toast.loading}
      />
    </Box>
  );
};

