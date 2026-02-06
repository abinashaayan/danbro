import { Box, IconButton, CircularProgress, Rating } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import { CustomCarousel, CustomCarouselArrow } from "../comman/CustomCarousel";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef, useEffect, useState, memo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { addToCart } from "../../utils/cart";
import { addToWishlist, removeFromWishlist, getWishlist } from "../../utils/wishlist";
import { CustomToast } from "../comman/CustomToast";
import { useCartProductIds } from "../../hooks/useCartProductIds";

export const ProductSectionCarousel = memo(({
  title,
  subtitle,
  products,
  icon: Icon,
  bgColor = "transparent",
  showBadge = true
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartProductIds } = useCartProductIds();
  const sliderRef = useRef(null);
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
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [loadingWishlist, setLoadingWishlist] = useState(new Set());

  const loadWishlistIds = useCallback(async () => {
    try {
      const data = await getWishlist();
      const list = data?.data ?? [];
      const ids = new Set();
      list.forEach((item) => {
        const product = item?.product || item;
        const id = product?.productId || product?._id || item?.productId;
        if (id) ids.add(id);
      });
      setWishlistIds(ids);
    } catch {
      setWishlistIds(new Set());
    }
  }, []);

  useEffect(() => {
    loadWishlistIds();
  }, [loadWishlistIds]);

  useEffect(() => {
    const handler = () => loadWishlistIds();
    window.addEventListener("wishlistUpdated", handler);
    return () => window.removeEventListener("wishlistUpdated", handler);
  }, [loadWishlistIds]);

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

  const isProductInCart = useCallback((product) => {
    const productId = product?.productId || product?.id || product?._id;
    // Use isCart from product data first (faster), then check cartProductIds
    return product?.isCart === true || (productId && cartProductIds.has(String(productId)));
  }, [cartProductIds]);

  const handleCartAction = useCallback((e, product) => {
    e.stopPropagation();
    const productId = product?.productId || product?.id || product?._id;
    if (!productId) {
      setToast({
        open: true,
        message: "Product ID is missing. Please try again.",
        severity: "error",
        loading: false,
      });
      return;
    }
    if (isProductInCart(product)) {
      navigate("/cart");
      return;
    }
    handleAddToCart(e, product);
  }, [isProductInCart, navigate]);

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

    const effectiveRate = Number(product?.rate) ?? Number(product?.price?.[0]?.rate) ?? Number(product?.price?.[0]?.mrp) ?? 0;
    if (effectiveRate === 0) {
      setToast({
        open: true,
        message: "This product cannot be added to cart as price is not available.",
        severity: "warning",
        loading: false,
      });
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
      // Create product snapshot for guest mode
      // Save price as object/array format, and also save rate/mrp directly for easy access
      const priceObj = product?.price && typeof product.price === "object" && !Array.isArray(product.price) 
        ? product.price 
        : (Array.isArray(product?.price) ? product.price : null);
      const productSnapshot = {
        name: product?.name || product?.title,
        image: product?.image,
        price: priceObj, // Save original price object/array if available
        weight: product?.weight || null,
        mrp: product?.mrp != null ? Number(product.mrp) : (priceObj?.mrp != null ? Number(priceObj.mrp) : null),
        rate: product?.rate != null ? Number(product.rate) : (effectiveRate != null ? Number(effectiveRate) : (priceObj?.rate != null ? Number(priceObj.rate) : null)),
        veg: product?.veg,
        courier: product?.courier,
      };
      await addToCart(productId, quantity, { 
        rate: effectiveRate,
        weight: product?.weight || null,
        productSnapshot: productSnapshot
      });

      setToast({
        open: true,
        message: "Product added to cart successfully!",
        severity: "success",
        loading: false,
      });

      window.dispatchEvent(new CustomEvent('cartUpdated'));
      if (location.pathname === '/' || location.pathname === '/home') {
        window.dispatchEvent(new CustomEvent('cartUpdatedOnHomepage'));
      }

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
  }, []);

  const handleWishlistToggle = useCallback(async (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    const productId = product?.productId || product?.id || product?._id;
    if (!productId) return;
    setLoadingWishlist((prev) => new Set(prev).add(productId));
    try {
      const isInWishlist = product?.isWishlisted === true || wishlistIds.has(productId);
      if (isInWishlist) {
        await removeFromWishlist(productId);
        setWishlistIds((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
        setToast({ open: true, message: "Removed from wishlist", severity: "info", loading: false });
      } else {
        await addToWishlist(productId);
        setWishlistIds((prev) => new Set(prev).add(productId));
        setToast({ open: true, message: "Added to wishlist!", severity: "success", loading: false });
      }
      window.dispatchEvent(new CustomEvent("wishlistUpdated"));
      setTimeout(() => setToast((prev) => ({ ...prev, open: false })), 2000);
    } catch (err) {
      setToast({ open: true, message: err?.response?.data?.message || "Failed to update wishlist", severity: "error", loading: false });
      setTimeout(() => setToast((prev) => ({ ...prev, open: false })), 3000);
    } finally {
      setLoadingWishlist((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  }, [wishlistIds]);

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: "relative",
        background: bgColor,
        borderRadius: { xs: 0, md: 3 },
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: "opacity 0.4s ease 0.25s, transform 0.4s ease 0.25s",
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
        <CustomText sx={{ fontSize: { xs: 12, md: 14 }, fontWeight: 600, color: "#FF9472", textTransform: "uppercase", letterSpacing: 2, }}>
          {subtitle}
        </CustomText>
        <CustomText
          sx={{
            fontSize: { xs: 32, sm: 38, md: 48 },
            fontWeight: 800,
            color: "var(--themeColor)",
            position: "relative",
            display: "inline-block",
            fontFamily: "'Inter', sans-serif",
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
              transition: "width 0.4s ease 0.15s",
            },
          }}
        >
          {title}
        </CustomText>
      </Box>

      {/* Products Carousel */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <CustomCarouselArrow
          direction="prev"
          onClick={() => sliderRef.current?.handlePrev()}
          sx={{
            position: "absolute",
            left: { xs: -15, md: -25 },
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
          <ArrowBackIosNewIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
        </CustomCarouselArrow>

        <CustomCarousel
          ref={sliderRef}
          slidesToShow={4}
          slidesToScroll={1}
          infinite={true}
          speed={600}
          arrows={false}
          autoplay={true}
          autoplaySpeed={4000}
          pauseOnHover={true}
          responsive={[
            { breakpoint: 1200, settings: { slidesToShow: 3 } },
            { breakpoint: 992, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 576, settings: { slidesToShow: 1 } },
          ]}
        >
          {products?.map((product, index) => (
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const productId = product?.productId || product?.id || product?._id;
                  if (productId) {
                    navigate(`/products/${productId}`);
                  }
                }}
                sx={{
                  bgcolor: "transparent",
                  borderRadius: { xs: 2.5, md: 3 },
                  overflow: "hidden",
                  cursor: "pointer",
                  position: "relative",
                  boxShadow: "none",
                  border: "none",
                  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background:
                      hoveredIndex === index
                        ? `linear-gradient(
                      135deg,
                      ${product?.color || "#FF9472"}12 0%,
                      ${product?.color || "#FF9472"}08 50%,
                      transparent 100%
                    )`
                        : "transparent",
                    opacity: hoveredIndex === index ? 1 : 0,
                    transition: "opacity 0.3s ease",
                    zIndex: 1,
                    pointerEvents: "none",
                  },
                  "&:hover": {
                    backgroundColor: "#fff",       // ✅ hover pe card feel
                    transform: "translateY(-15px) scale(1.03) rotateY(2deg)",
                    boxShadow: `0 25px 60px ${product?.color || "#FF9472"}30`,
                    borderRadius: { xs: 2.5, md: 3 },

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
                    decoding="async"
                    fetchPriority="low"
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

                  {/* Veg / Non-Veg dot - top left corner (when badge not present) */}
                  {!product?.badge && product?.veg != null && product?.veg !== "" && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        bgcolor: product?.veg === "Y" || product?.veg === "y" ? "#2e7d32" : "#d32f2f",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        zIndex: 2,
                        border: "2px solid #fff",
                      }}
                      aria-label={product?.veg === "Y" || product?.veg === "y" ? "Veg" : "Non-Veg"}
                    />
                  )}

                  {/* Added to Cart Badge - top right corner */}
                  {isProductInCart(product) && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        bgcolor: "success.main",
                        color: "#fff",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        zIndex: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      ✓ Added
                    </Box>
                  )}

                  {/* Courier - top right corner (when not in cart) */}
                  {!isProductInCart(product) && product?.courier != null && product?.courier !== "" && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        bgcolor:
                          product.courier === "Y" || product.courier === "y"
                            ? "#2e7d32"
                            : "#d32f2f",
                        color: "#fff",
                        px: 1.25,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: 10,
                        fontWeight: 600,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        zIndex: 2,
                      }}
                    >
                      Courier
                    </Box>
                  )}

                  {/* Favorite Icon */}
                  <IconButton
                    onClick={(e) => handleWishlistToggle(e, product)}
                    disabled={loadingWishlist.has(product?.productId || product?.id || product?._id)}
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
                    {(product?.isWishlisted === true || wishlistIds.has(product?.productId || product?.id || product?._id)) ? (
                      <FavoriteIcon sx={{ fontSize: 18, color: "#f44336" }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ fontSize: 18, color: "var(--themeColor)" }} />
                    )}
                  </IconButton>
                </Box>

                {/* Product Info */}
                <Box sx={{ p: { xs: 1, md: 1.5 }, position: "relative", zIndex: 2 }}>
                  {/* Rating - 5 stars, dynamic from API */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                    <Rating
                      value={Math.min(5, Math.max(0, Number(product?.avgRating ?? product?.rating) || 0))}
                      readOnly
                      precision={0.1}
                      size="small"
                      max={5}
                      sx={{ color: "#FFB400", "& .MuiRating-iconFilled": { color: "#FFB400" }, "& .MuiRating-iconEmpty": { color: "rgba(255, 180, 0, 0.55)" } }}
                    />
                    <CustomText
                      autoTitleCase={false}
                      sx={{ fontSize: 12, fontWeight: 600, color: "#666", textTransform: "none" }}
                    >
                      {(Number(product?.avgRating ?? product?.rating) || 0).toFixed(1)}
                      {(Number(product?.totalReviews ?? product?.reviews) || 0) > 0 && ` (${Number(product?.totalReviews ?? product?.reviews)} reviews)`}
                    </CustomText>
                  </Box>

                  {/* Title */}
                  <CustomText
                    autoTitleCase={false}
                    sx={{
                      fontWeight: 700,
                      color: "var(--themeColor)",
                      mb: 0,
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

                  {/* Price and Add to Cart */}
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                      <CustomText
                        autoTitleCase={false}
                        sx={{ fontWeight: 800, color: "#d32f2f", textTransform: "none" }}
                      >
                        Rate {product?.price}
                      </CustomText>
                      {(product?.mrp != null || product?.rate != null || product?.weight) && (
                        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
                          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1 }}>
                            {product?.mrp != null && (
                              <CustomText sx={{ fontSize: 12, color: "#444", fontWeight: 600, textTransform: "none" }}>
                                MRP <Box component="span" sx={{ color: "#2c2c2c", textDecoration: "line-through" }}>₹{Number(product.mrp).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</Box>
                              </CustomText>
                            )}
                            {product?.mrp != null && product?.rate != null && (
                              <Box component="span" sx={{ color: "#bbb", fontSize: 10 }}>•</Box>
                            )}
                          </Box>
                          {product?.weight && (
                            <CustomText sx={{ fontSize: 12, color: "#2c2c2c", fontWeight: 700, textTransform: "none", bgcolor: "rgba(23, 17, 15, 0.12)", px: 1, py: 0.25, borderRadius: 1, }}>
                              Weight: {product?.weight}
                            </CustomText>
                          )}
                        </Box>
                      )}
                    </Box>
                    <IconButton
                      className="add-cart-btn"
                      onClick={(e) => handleCartAction(e, product)}
                      disabled={loadingCart.has(product?.productId || product?.id || product?._id)}
                      sx={{
                        bgcolor: isProductInCart(product) ? "success.main" : "var(--themeColor)",
                        color: "#fff",
                        width: { xs: 36, md: 40 },
                        height: { xs: 36, md: 40 },
                        opacity: isProductInCart(product) ? 1 : 0,
                        transform: isProductInCart(product) ? "translateY(0)" : "translateY(10px)",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          bgcolor: isProductInCart(product) ? "success.dark" : "#7a2d3a",
                          transform: "scale(1.1)",
                        },
                        "&:disabled": {
                          opacity: 0.7,
                        },
                      }}
                    >
                      {loadingCart.has(product?.productId || product?.id || product?._id) ? (
                        <CircularProgress size={16} sx={{ color: "#fff", }} />
                      ) : isProductInCart(product) ? (
                        <CheckCircleIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
                      ) : (
                        <ShoppingCartIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
                      )}
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </CustomCarousel>

        <CustomCarouselArrow
          direction="next"
          onClick={() => sliderRef.current?.handleNext()}
          sx={{
            position: "absolute",
            right: { xs: -15, md: -25 },
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
          <ArrowForwardIosIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
        </CustomCarouselArrow>

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
