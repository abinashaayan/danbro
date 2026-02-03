import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Card, CardContent, Button, IconButton, CircularProgress, Alert, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import { CustomCarousel, CustomCarouselArrow } from "../comman/CustomCarousel";
import { CustomText } from "../comman/CustomText";
import { getWishlist, removeFromWishlist } from "../../utils/wishlist";
import { getAccessToken } from "../../utils/cookies";
import { fetchProductById } from "../../utils/apiService";
import blankImage from "../../assets/blankimage.png";

const responsivePadding = { xs: 1, sm: 2, md: 3 };

export const WishlistTab = ({ onRemoveFromWishlist }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  const sliderRef = useRef(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingId, setRemovingId] = useState(null);


  const formatWishlistItem = (item) => {
    const product = item?.product || item;
    const priceArr = Array.isArray(product?.price) ? product.price : [];
    const priceObj = priceArr[0] ?? (product?.price && typeof product.price === "object" ? product.price : null);
    const rate = priceObj != null ? (Number(priceObj.rate) || Number(priceObj.mrp) || 0) : 0;
    const displayPrice = rate >= 0 ? `₹${rate}` : "Price not available";
    const imgFirst = product?.images?.[0];
    const image = imgFirst != null ? (typeof imgFirst === "string" ? imgFirst : imgFirst?.url) || blankImage : blankImage;
    return {
      id: item?._id || item?.id || product?.productId || product?._id,
      productId: product?.productId || product?._id || item?.productId,
      prdcode: product?.prdcode ?? null,
      name: product?.name || "Unknown Product",
      image,
      price: displayPrice,
      mrp: priceObj?.mrp ?? null,
      rate: priceObj?.rate ?? null,
      weight: product?.weight ?? null,
      category: product?.category ?? null,
      subcategory: product?.subcategory ?? null,
    };
  };

  const fetchWishlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getWishlist();
      const rawData = response?.data && Array.isArray(response.data) ? response.data : (response?.data?.data && Array.isArray(response.data.data) ? response.data.data : []);
      if (!Array.isArray(rawData)) {
        setWishlistItems([]);
        setLoading(false);
        return;
      }
      const isGuest = !getAccessToken();
      const isGuestShape = rawData.length > 0 && rawData[0]?.productId != null && rawData[0]?.product == null && rawData[0]?.name == null;
      if (isGuest && isGuestShape) {
        const formatted = [];
        for (const it of rawData) {
          const pid = it.productId ?? it;
          if (pid == null || pid === "") continue;
          const pidStr = String(pid);
          try {
            const res = await fetchProductById(pidStr);
            const product = res?.data?.product ?? res?.data ?? res?.product ?? res ?? null;
            if (product && (product.name != null || product.productId != null || product._id != null)) {
              formatted.push(formatWishlistItem({ product, productId: pidStr }));
            } else {
              formatted.push(formatWishlistItem({ product: { productId: pidStr, name: "Unknown Product" }, productId: pidStr }));
            }
          } catch {
            formatted.push(formatWishlistItem({ product: { productId: pidStr, name: "Unknown Product" }, productId: pidStr }));
          }
        }
        setWishlistItems(formatted);
      } else {
        setWishlistItems(rawData.map((item) => formatWishlistItem(item)));
      }
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      setError("Failed to load wishlist. Please try again later.");
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    setRemovingId(productId);
    try {
      await removeFromWishlist(productId);
      setWishlistItems((prev) => prev.filter((item) => item?.productId !== productId));
      if (onRemoveFromWishlist) onRemoveFromWishlist(productId);
      window.dispatchEvent(new CustomEvent("wishlistUpdated"));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      setError("Failed to remove item from wishlist. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8, p: responsivePadding, pt: responsivePadding, mt: responsivePadding }}>
        <CircularProgress sx={{ color: "var(--themeColor)" }} />
      </Box>
    );
  }

  if (error && wishlistItems.length === 0) {
    return (
      <Box sx={{ p: responsivePadding, pt: responsivePadding, mt: responsivePadding }}>
        <CustomText
          variant="h4"
          sx={{
            fontSize: { xs: 20, md: 32 },
            fontWeight: 700,
            color: "var(--themeColor)",
            mb: { xs: 2, md: 2 },
            textTransform: "none",
          }}
        >
          My Wishlist
        </CustomText>
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  const renderCard = (item) => (
    <Card
                sx={{
                  borderRadius: { xs: 2, md: 2.5 },
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#fff",
                  border: "1px solid #f0f0f0",
                  maxWidth: { xs: "100%", sm: "280px", md: "260px" },
                  mx: "auto",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    borderColor: "#e0e0e0",
                    "& .product-image": {
                      transform: "scale(1.05)",
                    },
                  },
                }}
              >
                <Box sx={{ position: "relative", overflow: "hidden", backgroundColor: "#f8f8f8", }}>
                  <Box className="product-image" component="img" src={item?.image} alt={item?.name} sx={{ width: "100%", height: { xs: 150, sm: 170, md: 190 }, objectFit: "cover", transition: "transform 0.4s ease", }} />
                  <IconButton
                    onClick={() => handleRemoveFromWishlist(item?.productId)}
                    disabled={removingId === item?.productId}
                    sx={{
                      position: "absolute",
                      top: { xs: 8, md: 10 },
                      right: { xs: 8, md: 10 },
                      backgroundColor: "rgba(255,255,255,0.95)",
                      padding: { xs: 0.75, md: 0.875 },
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#fff",
                        transform: "scale(1.1)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      },
                      "&:disabled": {
                        opacity: 0.6,
                      },
                    }}
                  >
                    {removingId === item?.productId ? (
                      <CircularProgress size={18} sx={{ color: "#f44336" }} />
                    ) : (
                      <FavoriteIcon sx={{ color: "#f44336", fontSize: { xs: 18, md: 22 } }} />
                    )}
                  </IconButton>
                </Box>
                <CardContent sx={{ p: { xs: 1.75, md: 2 }, flexGrow: 1, display: "flex", flexDirection: "column", backgroundColor: "#fff", }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: 14, md: 15 },
                      lineHeight: 1.4,
                      color: "#2c2c2c",
                      minHeight: { xs: "2.6em", md: "3em" },
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textTransform: "none",
                    }}
                    style={{ textTransform: "none" }}
                  >
                    {item?.name}
                  </Typography>
                  {item?.weight && (
                    <CustomText variant="body2" sx={{ color: "#666", mb: 1, fontSize: { xs: 12, md: 13 }, fontWeight: 400, textTransform: "capitalize", }}>
                      {item?.weight}
                    </CustomText>
                  )}
                  <Box >
                    <CustomText variant="h6" sx={{ color: "var(--themeColor)", fontWeight: 700, mb: 1.5, fontSize: { xs: 16, md: 18 }, textTransform: "none", }}>
                      {item?.price}
                    </CustomText>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => {
                        const productId = item?.productId || item?.id;
                        if (productId) {
                          navigate(`/products/${productId}`);
                        }
                      }}
                      sx={{
                        backgroundColor: "#FFB5A1",
                        color: "#000",
                        textTransform: "none",
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: { xs: 13, md: 14 },
                        py: 1,
                        boxShadow: "0 2px 8px rgba(255,181,161,0.25)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#F2709C",
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 12px rgba(242,112,156,0.35)",
                        },
                      }}
                    >
                      View Product
                    </Button>
                  </Box>
                </CardContent>
              </Card>
  );

  return (
    <Box sx={{ mb: 5, mt: responsivePadding, p: responsivePadding, pt: responsivePadding }}>
      <CustomText variant="h4" sx={{ fontSize: { xs: 20, md: 32 }, fontWeight: 700, color: "var(--themeColor)", mb: { xs: 2, md: 2 }, }}>
        My Wishlist
      </CustomText>

      {error && (
        <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {wishlistItems.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            px: 3,
            borderRadius: 3,
            background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
          }}
        >
          <FavoriteIcon sx={{ fontSize: 64, color: "#ccc", mb: 2 }} />
          <CustomText variant="h6" sx={{ color: "#666", mb: 1, fontWeight: 600, textTransform: "none" }}>
            Your wishlist is empty
          </CustomText>
          <CustomText variant="body2" sx={{ color: "#999", textTransform: "none" }}>
            Start adding products to your wishlist to see them here!
          </CustomText>
        </Box>
      ) : isMobileView ? (
        <Box sx={{ overflow: "hidden", mx: -1 }}>
          <CustomCarousel
            ref={sliderRef}
            dots={true}
            infinite={wishlistItems.length > 1}
            speed={400}
            slidesToShow={1.15}
            slidesToScroll={1}
            arrows={false}
            swipeToSlide={true}
          >
            {wishlistItems?.map((item) => (
              <Box key={item?.id}>
                {renderCard(item)}
              </Box>
            ))}
          </CustomCarousel>
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ justifyContent: { xs: "flex-start", md: "center" } }}>
          {wishlistItems?.map((item) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={item?.id}>
              {renderCard(item)}
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

