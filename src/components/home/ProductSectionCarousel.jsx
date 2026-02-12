import { Box, IconButton, CircularProgress, Rating } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import { CustomCarousel } from "../comman/CustomCarousel";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useRef, useEffect, useState, memo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CookieIcon from "@mui/icons-material/Cookie";
import { addToCart, increaseItemCount, decreaseItemCount } from "../../utils/cart";
import { addToWishlist, removeFromWishlist, getWishlist } from "../../utils/wishlist";
import { CustomToast } from "../comman/CustomToast";
import { useCartProductIds } from "../../hooks/useCartProductIds";
import "./ProductSectionCarousel.css";

const BRAND_COLOR = "#5F2930";

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
  const { cartProductIds, getCartQuantity, refreshCartIds } = useCartProductIds();
  const sliderRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);
  const [loadingCart, setLoadingCart] = useState(new Set());
  const [quantityUpdatingKey, setQuantityUpdatingKey] = useState(null); // "itemKey|increase" | "itemKey|decrease"
  const quantityUpdatingRef = useRef(null);
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
    // Use isCart from product data first (faster), then check cartProductIds (localStorage + API)
    return product?.isCart === true || (productId && cartProductIds.has(String(productId)));
  }, [cartProductIds]);

  const getItemKey = useCallback((productId, weight) => {
    const w = (weight == null ? "" : String(weight)).trim();
    const normalized = w === "" || w.toLowerCase() === "n/a" ? "" : w;
    return `${String(productId ?? "")}|${normalized}`;
  }, []);

  const handleQuantityChange = useCallback(async (product, change) => {
    const productId = product?.productId || product?.id || product?._id;
    if (!productId) return;
    const weight = product?.weight ?? null;
    const key = getItemKey(productId, weight);
    const action = change > 0 ? "increase" : "decrease";
    const stateKey = `${key}|${action}`;
    if (quantityUpdatingRef.current != null) return;
    quantityUpdatingRef.current = stateKey;
    setQuantityUpdatingKey(stateKey);
    try {
      if (change > 0) {
        await increaseItemCount(productId, weight);
      } else {
        await decreaseItemCount(productId, weight);
      }
      window.dispatchEvent(new CustomEvent("cartUpdated"));
      if (location.pathname === "/" || location.pathname === "/home") {
        window.dispatchEvent(new CustomEvent("cartUpdatedOnHomepage"));
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
      setToast({ open: true, message: err?.response?.data?.message || "Failed to update quantity", severity: "error", loading: false });
      setTimeout(() => setToast((prev) => ({ ...prev, open: false })), 3000);
    } finally {
      quantityUpdatingRef.current = null;
      setQuantityUpdatingKey(null);
    }
  }, [getItemKey, location.pathname]);

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
        width: "100%",
        margin: "0 auto",
        background: bgColor,
        px: { xs: 1, md: 2 },
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
      {/* Section Header – same as category: title + arrows, same spacing */}
      <Box className="section-header-container" sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "stretch", md: "baseline" }, justifyContent: "space-between", mb: 2.5, flexWrap: "wrap", gap: 1, position: "relative", zIndex: 1, }}>
        <Box className="section-header-title" sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", flex: 1, justifyContent: { xs: "space-between", md: "center" }, minWidth: { xs: "100%", md: "auto" }, width: { xs: "100%", md: "auto" } }}>
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
            {Icon && <Icon className="product-section-icon" sx={{ color: BRAND_COLOR, fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" }, opacity: 0.9 }} />}
            {title}
          </Box>
        </Box>
        <Box className="product-badge-arrows-row" sx={{ display: "flex", gap: 1.2, alignItems: "center", justifyContent: "space-between", width: { xs: "100%", md: "auto" }, flexShrink: 0 }}>
          <Box className="section-nav-buttons" sx={{ display: "flex", gap: 1.2, flexShrink: 0 }}>
          <IconButton
            className="carousel-nav-btn"
            onClick={() => sliderRef.current?.handlePrev()}
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
            aria-label="Previous"
          >
            <ArrowBackIosNewIcon sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" } }} />
          </IconButton>
          <IconButton
            className="carousel-nav-btn"
            onClick={() => sliderRef.current?.handleNext()}
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
            aria-label="Next"
          >
            <ArrowForwardIosIcon sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" } }} />
          </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Products Carousel */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
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
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
                transition: `opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`,
                height: "100%",
                display: "flex",
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
                  bgcolor: "#ffffff",
                  borderRadius: "48px",
                  overflow: "hidden",
                  cursor: "pointer",
                  position: "relative",
                  border: "1px solid rgba(255, 226, 221, 0.5)",
                  // p: { xs: "1.5rem 1.2rem", sm: "1.8rem 1.5rem", md: "2rem 1.8rem" },
                  p: { xs: "1.2rem 1rem", sm: "1.5rem 1.2rem", md: "1.7rem 1.5rem" },
                  display: "flex",
                  flexDirection: "column",
                  minHeight: { xs: "520px", sm: "560px", md: "600px", lg: "620px" },
                  height: "100%",
                  transition: "all 0.45s cubic-bezier(0.19, 1, 0.22, 1)",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: "-30%",
                    left: "-20%",
                    width: "140%",
                    height: "140%",
                    background: "radial-gradient(circle at 30% 40%, rgba(95, 41, 48, 0.04) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(95, 41, 48, 0.03) 0%, transparent 50%)",
                    opacity: hoveredIndex === index ? 1 : 0,
                    transition: "opacity 0.7s ease",
                    pointerEvents: "none",
                  },
                  "&:hover": {
                    transform: "translateY(-10px) scale(1.01)",
                    boxShadow: "0 48px 70px -18px rgba(95, 41, 48, 0.24)",
                    "& .product-image": {
                      transform: "scale(1.05)",
                    },
                    "& .modern-image-section": {
                      borderColor: "rgba(95, 41, 48, 0.25)",
                      boxShadow: "0 22px 36px -12px rgba(95, 41, 48, 0.22)",
                    },
                    "& .product-name-modern": {
                      color: "#5F2930",
                    },
                  },
                }}
              >
                {/* Modern image section */}
                <Box
                  className="modern-image-section"
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: 180, sm: 200, md: 240 },
                    borderRadius: "32px",
                    bgcolor: "#fdf5f2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1.6,
                    overflow: "hidden",
                    border: "2px solid rgba(95, 41, 48, 0.08)",
                    boxShadow: "0 12px 26px -8px rgba(95, 41, 48, 0.12)",
                    transition: "all 0.4s",
                  }}
                >
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

                  {/* Brand / Badge – top left */}
                  {showBadge && product?.badge && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 20,
                        left: 22,
                        bgcolor: "rgba(95, 41, 48, 0.92)",
                        color: "#fff",
                        px: 1.2,
                        py: 0.5,
                        borderRadius: "60px",
                        fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                        fontWeight: 600,
                        letterSpacing: "0.8px",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        border: "1px solid rgba(255,255,255,0.35)",
                        boxShadow: "0 8px 20px rgba(95, 41, 48, 0.4)",
                        zIndex: 10,
                      }}
                    >
                      {product?.badge}
                    </Box>
                  )}

                  {/* Veg (Y) / Non-Veg (N) dot – top right: green / red */}
                  {product?.veg != null && product?.veg !== "" && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        bgcolor: product?.veg === "Y" || product?.veg === "y" ? "#2e7d32" : "#d32f2f",
                        border: "2px solid #fff",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        zIndex: 11,
                      }}
                      aria-label={product?.veg === "Y" || product?.veg === "y" ? "Veg" : "Non-Veg"}
                    />
                  )}
                </Box>

                {/* Product ID + courier micro */}
                <Box
                  sx={{
                    fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
                    fontWeight: 500,
                    color: "#8f7a75",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    mb: 0.4,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {product?.productId && (
                    <span>
                      ID · {String(product.productId).slice(-12)}
                    </span>
                  )}
                  {product?.courier != null && product?.courier !== "" && (
                    <Box
                      component="span"
                      sx={{
                        fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                        bgcolor: "#f2eae7",
                        px: 0.9,
                        py: 0.25,
                        borderRadius: "30px",
                        fontWeight: 600,
                        color: "#5F2930",
                        border: "1px solid rgba(95, 41, 48, 0.1)",
                      }}
                    >
                      Courier {product?.courier === "Y" || product?.courier === "y" ? "Y" : "N"}
                    </Box>
                  )}
                </Box>

                {/* Product name + cart state */}
                <Box
                  className="product-name-modern"
                  sx={{
                    fontSize: { xs: "1.5rem", sm: "1.7rem", md: "1.8rem", lg: "2rem", xl: "2.2rem" },
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: "#221c1a",
                    my: "0.2rem 0.4rem",
                    minHeight: { xs: "3.6rem", sm: "4rem", md: "4.2rem", lg: "4.8rem" },
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: "-0.02em",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  <CustomText
                    autoTitleCase={false}
                    sx={{
                      fontWeight: 700,
                      color: "inherit",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textTransform: "none !important",
                      flex: "1 1 auto",
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
                  {isProductInCart(product) ? (
                    <Box component="span" sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" }, color: "#1f8b4c", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                      <CheckCircleIcon sx={{ fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" } }} /> In cart
                    </Box>
                  ) : (
                    <Box component="span" sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" }, py: 0.35, px: 0.9, bgcolor: "#fee9e5", borderRadius: "30px", color: "#5F2930", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                      not in cart
                    </Box>
                  )}
                </Box>

                {/* Meta row: weight + rating */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 0.5, mb: 1.2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      bgcolor: "#f9f3f1",
                      px: 1,
                      py: 0.4,
                      borderRadius: "40px",
                      fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                      fontWeight: 500,
                      color: "#4b3631",
                    }}
                  >
                    {product?.weight ? (
                      <span>{product.weight}</span>
                    ) : (
                      <span>—</span>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      bgcolor: "#fff7e5",
                      px: 1.1,
                      py: 0.4,
                      borderRadius: "60px",
                      fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                      fontWeight: 600,
                    }}
                  >
                    <Rating
                      value={Math.min(5, Math.max(0, Number(product?.avgRating ?? product?.rating) || 0))}
                      readOnly
                      precision={0.1}
                      size="small"
                      max={5}
                      sx={{ "& .MuiRating-iconFilled": { color: "#ffb83b" }, "& .MuiRating-iconEmpty": { color: "rgba(255, 184, 59, 0.4)" } }}
                    />
                    <Box component="span" sx={{ color: "#63534e", fontWeight: 500 }}>
                      {(Number(product?.avgRating ?? product?.rating) || 0).toFixed(1)} ({(Number(product?.totalReviews ?? product?.reviews) || 0)})
                    </Box>
                  </Box>
                </Box>

                {/* Price section */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 1.25,
                    my: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem" },
                    py: { xs: 0.5, sm: 0.55, md: 0.6 },
                    borderTop: "2px dashed rgba(95, 41, 48, 0.1)",
                    borderBottom: "2px dashed rgba(95, 41, 48, 0.1)",
                    flexShrink: 0,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {product?.mrp != null && (
                      <Box component="span" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: "#75605a" }}>
                        MRP{" "}
                        <Box component="span" sx={{ fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" }, color: "#98837c", textDecoration: "line-through", fontWeight: 500 }}>
                          ₹{Number(product.mrp).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </Box>
                      </Box>
                    )}
                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5, flexWrap: "wrap" }}>
                      <Box
                        component="span"
                        sx={{
                          fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.7rem", lg: "2rem", xl: "2.3rem" },
                          fontWeight: 750,
                          color: "#5F2930",
                          lineHeight: 1,
                          letterSpacing: "-1px",
                        }}
                      >
                        {product?.price || (product?.rate != null ? `₹${Number(product.rate).toLocaleString("en-IN", { minimumFractionDigits: 2 })}` : "—")}
                      </Box>
                      {product?.poscode && (
                        <Box
                          component="span"
                          sx={{
                            fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
                            bgcolor: "#ede0db",
                            py: 0.25,
                            px: 0.8,
                            borderRadius: "30px",
                            fontWeight: 600,
                            color: "#3a2c28",
                            ml: 1,
                          }}
                        >
                          {product.poscode}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>

                {/* Action row: Add to cart / quantity controls + wishlist */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: "auto", pt: 0.4 }}>
                  {isProductInCart(product) ? (
                    /* Quantity UI – same as cart page (CartItem compact style) */
                    <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          borderRadius: 999,
                          border: "1px solid #ffd3c4",
                          px: 0.6,
                          py: 0.25,
                          backgroundColor: "#fff8f4",
                          boxShadow: "0 1px 3px rgba(220, 120, 80, 0.18)",
                          gap: 0.5,
                        }}
                      >
                        <Box
                          onClick={(e) => {
                            e.stopPropagation();
                            if (quantityUpdatingKey != null) return;
                            handleQuantityChange(product, -1);
                          }}
                          sx={{
                            cursor: quantityUpdatingKey != null ? "default" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: { xs: 20, sm: 22 },
                            height: { xs: 20, sm: 22 },
                            borderRadius: "999px",
                            background: "linear-gradient(135deg, #fff0ea 0%, #ffe0d4 100%)",
                            boxShadow: "0 1px 3px rgba(220, 120, 80, 0.22)",
                            "&:hover": quantityUpdatingKey == null && {
                              transform: "translateY(-1px)",
                              boxShadow: "0 2px 5px rgba(220, 120, 80, 0.32)",
                            },
                          }}
                        >
                          {quantityUpdatingKey === `${getItemKey(product?.productId || product?.id || product?._id, product?.weight)}|decrease` ? (
                            <CircularProgress size={12} sx={{ color: "#F31400" }} />
                          ) : (
                            <RemoveIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#F31400" }} />
                          )}
                        </Box>
                        <CustomText sx={{ minWidth: 20, textAlign: "center", fontSize: { xs: 11, sm: 12 }, fontWeight: 600, color: "#3d2914", letterSpacing: 0.3 }}>
                          {getCartQuantity(product?.productId || product?.id || product?._id, product?.weight) || 0}
                        </CustomText>
                        <Box
                          onClick={(e) => {
                            e.stopPropagation();
                            if (quantityUpdatingKey != null) return;
                            handleQuantityChange(product, 1);
                          }}
                          sx={{
                            cursor: quantityUpdatingKey != null ? "default" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: { xs: 20, sm: 22 },
                            height: { xs: 20, sm: 22 },
                            borderRadius: "999px",
                            background: "linear-gradient(135deg, #ff9472 0%, #f2709c 100%)",
                            boxShadow: "0 1px 4px rgba(242, 112, 156, 0.45)",
                            "&:hover": quantityUpdatingKey == null && {
                              transform: "translateY(-1px)",
                              boxShadow: "0 2px 7px rgba(242, 112, 156, 0.6)",
                            },
                          }}
                        >
                          {quantityUpdatingKey === `${getItemKey(product?.productId || product?.id || product?._id, product?.weight)}|increase` ? (
                            <CircularProgress size={12} sx={{ color: "#fff" }} />
                          ) : (
                            <AddIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#fff" }} />
                          )}
                        </Box>
                      </Box>
                      <Box
                        component="span"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/cart");
                        }}
                        sx={{
                          fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
                          fontWeight: 600,
                          color: "#5F2930",
                          cursor: "pointer",
                          textDecoration: "underline",
                          flexShrink: 0,
                        }}
                      >
                        View cart
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      className="add-cart-btn"
                      component="button"
                      type="button"
                      onClick={(e) => handleCartAction(e, product)}
                      disabled={loadingCart.has(product?.productId || product?.id || product?._id)}
                      sx={{
                        flex: 1,
                        bgcolor: "#5F2930",
                        borderRadius: "100px",
                        py: { xs: 0.8, sm: 0.9, md: 0.95, lg: 1 },
                        px: { xs: 1.5, sm: 1.8, md: 1.9, lg: 2 },
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: { xs: "0.95rem", sm: "0.98rem", md: "1rem", lg: "1.05rem", xl: "1.1rem" },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1.25,
                        boxShadow: "0 12px 24px -6px rgba(95, 41, 48, 0.44)",
                        border: "1px solid rgba(255, 215, 215, 0.2)",
                        letterSpacing: "0.8px",
                        cursor: "pointer",
                        transition: "all 0.32s cubic-bezier(0.2, 0.9, 0.4, 1)",
                        "&:hover:not(:disabled)": {
                          bgcolor: "#7a3f48",
                          boxShadow: "0 24px 36px -10px rgba(95, 41, 48, 0.5)",
                          "& .cart-arrow": { transform: "translateX(7px) scale(1.1)" },
                        },
                        "&:disabled": { opacity: 0.7 },
                      }}
                    >
                      {loadingCart.has(product?.productId || product?.id || product?._id) ? (
                        <CircularProgress size={22} sx={{ color: "#fff" }} />
                      ) : (
                        <>Add to cart <ShoppingCartIcon className="cart-arrow" sx={{ fontSize: { xs: "1rem", sm: "1.05rem", md: "1.1rem", lg: "1.15rem", xl: "1.2rem" }, transition: "transform 0.22s" }} /></>
                      )}
                    </Box>
                  )}
                  <IconButton
                    onClick={(e) => handleWishlistToggle(e, product)}
                    disabled={loadingWishlist.has(product?.productId || product?.id || product?._id)}
                    sx={{
                      width: { xs: 48, sm: 52, md: 56 },
                      height: { xs: 48, sm: 52, md: 56 },
                      flexShrink: 0,
                      borderRadius: "60px",
                      bgcolor: "#fff",
                      color: "#5F2930",
                      boxShadow: "0 10px 20px -8px rgba(95,41,48,0.2)",
                      border: "1px solid rgba(95,41,48,0.1)",
                      "&:hover": {
                        bgcolor: "#5F2930",
                        color: "#fff",
                        transform: "scale(1.06)",
                      },
                    }}
                  >
                    {loadingWishlist.has(product?.productId || product?.id || product?._id) ? (
                      <CircularProgress size={24} sx={{ color: "#5F2930" }} />
                    ) : (product?.isWishlisted === true || wishlistIds.has(product?.productId || product?.id || product?._id)) ? (
                      <FavoriteIcon sx={{ fontSize: { xs: "1.4rem", sm: "1.5rem", md: "1.6rem" } }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ fontSize: { xs: "1.4rem", sm: "1.5rem", md: "1.6rem" } }} />
                    )}
                  </IconButton>
                </Box>

                {/* Bottom micro row */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1.2, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: "#6f5b55" }}>
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    {product?.courier === "Y" || product?.courier === "y" ? (
                      <Box component="span" sx={{ bgcolor: "#f5efed", py: 0.3, px: 0.9, borderRadius: "30px" }}>
                        ✓ Express courier
                      </Box>
                    ) : null}
                    <Box component="span" sx={{ bgcolor: "#f5efed", py: 0.3, px: 0.9, borderRadius: "30px" }}>
                      {(Number(product?.totalReviews ?? product?.reviews) || 0)} reviews
                    </Box>
                  </Box>
                </Box>

                {/* Shine line */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: 4,
                    background: "linear-gradient(90deg, #5F2930, #c79a91, #5F2930)",
                    opacity: 0.3,
                  }}
                />
              </Box>
            </Box>
          ))}
        </CustomCarousel>

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
