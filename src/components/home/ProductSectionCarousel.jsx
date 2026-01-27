import { Box, IconButton, CircularProgress } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef, useEffect, useState, memo, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addToCart } from "../../utils/cart";
import { getAccessToken } from "../../utils/cookies";
import { CustomToast } from "../comman/CustomToast";

export const ProductSectionCarousel = memo(({
  title,
  subtitle,
  products,
  icon: Icon,
  bgColor = "transparent",
  showBadge = true
}) => {
  const navigate = useNavigate();
  let sliderRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
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

  const handleAddToCart = useCallback(async (e, product) => {
    e.stopPropagation();

    if (!product?.productId && !product?.id) {
      setToast({
        open: true,
        message: "Product ID is missing. Please try again.",
        severity: "error",
        loading: false,
      });
      return;
    }

    if (!isLoggedIn) {
      setToast({
        open: true,
        message: "Please login to add items to cart",
        severity: "warning",
        loading: false,
      });
      setTimeout(() => setToast((prev) => ({ ...prev, open: false })), 3000);
      return;
    }

    const productId = product.productId || product.id || product._id;
    setLoadingCart((prev) => new Set(prev).add(productId));
    setToast({
      open: true,
      message: "Adding to cart...",
      severity: "info",
      loading: true,
    });

    try {
      const quantity = 1;
      await addToCart(productId, quantity);
      
      setToast({
        open: true,
        message: "Product added to cart successfully!",
        severity: "success",
        loading: false,
      });
      
      // Dispatch event to update cart count in header
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      
      setTimeout(() => setToast((prev) => ({ ...prev, open: false })), 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setToast({
        open: true,
        message: error.response?.data?.message || "Failed to add product to cart",
        severity: "error",
        loading: false,
      });
      setTimeout(() => setToast((prev) => ({ ...prev, open: false })), 3000);
    } finally {
      setLoadingCart((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  }, [isLoggedIn]);

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        mb: { xs: 6, md: 8 },
        position: "relative",
        background: bgColor,
        borderRadius: { xs: 0, md: 3 },
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,181,161,0.08) 0%, transparent 70%)",
          animation: visible ? "float 20s ease-in-out infinite" : "none",
          "@keyframes float": {
            "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
            "50%": { transform: "translate(-30px, -30px) rotate(180deg)" },
          },
          zIndex: 0,
          pointerEvents: "none",
        },
      }}
    >
      {/* Section Header */}
      <Box sx={{ textAlign: "center", mb: { xs: 5, md: 6 }, position: "relative", zIndex: 1 }}>
        {Icon && (
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 70,
              height: 70,
              borderRadius: "50%",
              bgcolor: "rgba(255,181,161,0.15)",
              mb: 2,
              animation: visible ? "pulseIcon 2s ease-in-out infinite" : "none",
              "@keyframes pulseIcon": {
                "0%, 100%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.1)" },
              },
            }}
          >
            <Icon sx={{ fontSize: 40, color: "#FF9472" }} />
          </Box>
        )}
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
          {subtitle}
        </CustomText>
        <CustomText
          sx={{
            fontSize: { xs: 32, sm: 38, md: 48 },
            fontWeight: 800,
            color: "var(--themeColor)",
            mb: 2,
            position: "relative",
            display: "inline-block",
            fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
            fontStyle: "italic",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: visible ? "100px" : "0",
              height: "4px",
              background: "linear-gradient(90deg, transparent, #FF9472, transparent)",
              borderRadius: "2px",
              transition: "width 0.8s ease 0.3s",
            },
          }}
        >
          {title}
        </CustomText>
      </Box>

      {/* Products Carousel */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <IconButton
          onClick={() => sliderRef?.slickPrev()}
          sx={{
            position: "absolute",
            left: { xs: -15, md: -25 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "#fff",
            color: "var(--themeColor)",
            width: { xs: 45, md: 55 },
            height: { xs: 45, md: 55 },
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
            border: "2px solid rgba(255,181,161,0.2)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              bgcolor: "var(--themeColor)",
              color: "#fff",
              transform: "translateY(-50%) scale(1.1)",
              boxShadow: "0 8px 25px rgba(95,41,48,0.3)",
            },
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
        </IconButton>

        <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
          {products.map((product, index) => (
            <Box
              key={product?.id || index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              sx={{
                px: { xs: 1, md: 1.5 },
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
                transition: `opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`,
              }}
            >
              <Box
                onClick={() => {
                  if (product?.categoryId) {
                    navigate(`/products?categoryId=${product?.categoryId}&search=${encodeURIComponent(product?.title || product?.name)}`);
                  } else {
                    navigate(`/products?search=${encodeURIComponent(product?.title || product?.name)}`);
                  }
                }}
                sx={{
                  bgcolor: "#fff",
                  borderRadius: { xs: 2.5, md: 3 },
                  overflow: "hidden",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,181,161,0.1) inset",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: "1px solid rgba(255,181,161,0.1)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: hoveredIndex === index
                      ? `linear-gradient(135deg, ${product?.color || "#FF9472"}12 0%, ${product?.color || "#FF9472"}08 50%, #fff 100%)`
                      : "linear-gradient(135deg, rgba(255,181,161,0.05) 0%, rgba(95,41,48,0.02) 100%)",
                    opacity: hoveredIndex === index ? 1 : 0,
                    transition: "opacity 0.5s ease",
                    zIndex: 1,
                    pointerEvents: "none",
                  },
                  "&:hover": {
                    transform: "translateY(-15px) scale(1.03) rotateY(2deg)",
                    boxShadow: `0 25px 60px ${product?.color || "#FF9472"}30, 0 0 0 2px ${product?.color || "#FF9472"}20 inset`,
                    "& .product-image": {
                      transform: "scale(1.1)",
                    },
                    "& .add-cart-btn": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  },
                }}
              >
                {/* Product Image */}
                <Box sx={{ position: "relative", height: { xs: 200, md: 250 }, overflow: "hidden", background: "#f9f9f9", }}>
                  <Box
                    className="product-image"
                    component="img"
                    src={product?.image}
                    alt={product?.title || product?.name}
                    loading="lazy"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />

                  {/* Badge */}
                  {showBadge && product?.badge && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        bgcolor: product?.badgeColor || "var(--themeColor)",
                        color: "#fff",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                        zIndex: 2,
                        animation: hoveredIndex === index ? "badgePulse 1.5s ease-in-out infinite" : "none",
                        "@keyframes badgePulse": {
                          "0%, 100%": { transform: "scale(1)" },
                          "50%": { transform: "scale(1.05)" },
                        },
                      }}
                    >
                      {product?.badge}
                    </Box>
                  )}

                  {/* Discount */}
                  {product?.discount && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        bgcolor: "#0A1234",
                        color: "#fff",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: 11,
                        fontWeight: 800,
                        zIndex: 2,
                      }}
                    >
                      {product?.discount}
                    </Box>
                  )}

                  {/* Favorite Icon */}
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 12,
                      right: 12,
                      bgcolor: "rgba(255,255,255,0.95)",
                      width: 38,
                      height: 38,
                      zIndex: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "#fff",
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <FavoriteBorderIcon sx={{ fontSize: 18, color: "var(--themeColor)" }} />
                  </IconButton>
                </Box>

                {/* Product Info */}
                <Box sx={{ p: { xs: 2, md: 2.5 }, position: "relative", zIndex: 2 }}>
                  {/* Rating */}
                  {product?.rating && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1 }}>
                      <StarIcon sx={{ fontSize: 14, color: "#FFD700" }} />
                      <CustomText
                        autoTitleCase={false}
                        sx={{ fontSize: 12, fontWeight: 600, color: "#666", textTransform: "none" }}
                      >
                        {product?.rating} {product?.reviews && `(${product?.reviews})`}
                      </CustomText>
                    </Box>
                  )}

                  {/* Title */}
                  <CustomText
                    autoTitleCase={false}
                    sx={{
                      fontSize: { xs: 16, md: 18 },
                      fontWeight: 700,
                      color: "var(--themeColor)",
                      lineHeight: 1.3,
                      mb: 0,
                      minHeight: { xs: 40, md: 50 },
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textTransform: "none !important",
                    }}
                    style={{ textTransform: "none" }}
                  >
                    {(() => {
                      const text = product?.title || product?.name || "";
                      if (text && text === text.toUpperCase() && text !== text.toLowerCase()) {
                        return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
                      }
                      return text;
                    })()}
                  </CustomText>

                  {/* SKU */}
                  {product?.sku && (
                    <CustomText autoTitleCase={false} sx={{ fontSize: 11, color: "#999", textTransform: "none" }}>
                      SKU: {product?.sku}
                    </CustomText>
                  )}

                  {/* Price and Add to Cart */}
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                      <CustomText
                        autoTitleCase={false}
                        sx={{ fontSize: { xs: 18, md: 20 }, fontWeight: 800, color: "#d32f2f", textTransform: "none" }}
                      >
                        {product?.price}
                      </CustomText>
                      {product?.originalPrice && (
                        <CustomText
                          autoTitleCase={false}
                          sx={{ fontSize: 12, color: "#999", textDecoration: "line-through", ml: 1, textTransform: "none" }}
                        >
                          {product?.originalPrice}
                        </CustomText>
                      )}
                    </Box>
                    <IconButton
                      className="add-cart-btn"
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={loadingCart.has(product?.productId || product?.id || product?._id)}
                      sx={{
                        bgcolor: "var(--themeColor)",                       
                        color: "#fff",
                        width: { xs: 36, md: 40 },
                        height: { xs: 36, md: 40 },
                        opacity: 0,
                        transform: "translateY(10px)",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          bgcolor: "#7a2d3a",
                          transform: "scale(1.1)",
                        },
                        "&:disabled": {
                          opacity: 0.7,
                        },
                      }}
                    >
                      {loadingCart.has(product?.productId || product?.id || product?._id) ? (
                        <CircularProgress
                          size={16}
                          sx={{
                            color: "#fff",
                          }}
                        />
                      ) : (
                        <ShoppingCartIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
                      )}
                    </IconButton>
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
            right: { xs: -15, md: -25 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "#fff",
            color: "var(--themeColor)",
            width: { xs: 45, md: 55 },
            height: { xs: 45, md: 55 },
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
            border: "2px solid rgba(255,181,161,0.2)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              bgcolor: "var(--themeColor)",
              color: "#fff",
              transform: "translateY(-50%) scale(1.1)",
              boxShadow: "0 8px 25px rgba(95,41,48,0.3)",
            },
          }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
        </IconButton>

        {/* Custom Dots */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mt: 3,
            "& .slick-dots": {
              position: "relative",
              bottom: "auto",
              display: "flex !important",
              justifyContent: "center",
              gap: 1,
              "& li": {
                width: "auto",
                height: "auto",
                margin: 0,
                "& button": {
                  width: { xs: "30px", md: "40px" },
                  height: { xs: "4px", md: "5px" },
                  padding: 0,
                  borderRadius: "20px",
                  backgroundColor: "rgba(255,181,161,0.3)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:before": {
                    display: "none",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255,181,161,0.6)",
                  },
                },
                "&.slick-active button": {
                  backgroundColor: "#FF9472",
                  width: { xs: "40px", md: "50px" },
                  boxShadow: "0 0 15px rgba(255,148,114,0.5)",
                },
              },
            },
          }}
        />
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
}, (prevProps, nextProps) => {
  // Custom comparison function for memo
  return (
    prevProps.title === nextProps.title &&
    prevProps.subtitle === nextProps.subtitle &&
    prevProps.bgColor === nextProps.bgColor &&
    prevProps.showBadge === nextProps.showBadge &&
    prevProps.products?.length === nextProps.products?.length &&
    JSON.stringify(prevProps.products) === JSON.stringify(nextProps.products)
  );
});
