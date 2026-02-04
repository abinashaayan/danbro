import { memo, useState, useEffect } from "react";
import { Box, Card, CardContent, CardMedia, IconButton, CircularProgress } from "@mui/material";
import { ShoppingCart, ShareOutlined, FavoriteBorder, Favorite, SearchOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CustomText } from "../comman/CustomText";
import { ProductDescription } from "../comman/ProductDescription";
import { ProductPrice } from "../comman/ProductPrice";
import { CustomToast } from "../comman/CustomToast";
import { addToWishlist, removeFromWishlist, getWishlist } from "../../utils/wishlist";
import { addToCart } from "../../utils/cart";
import { getStoredLocation } from "../../utils/location";
import { getAccessToken } from "../../utils/cookies";

export const ProductGrid = memo(({ products, isVisible }) => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const [loadingWishlist, setLoadingWishlist] = useState(new Set());
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

  // Check which products are in wishlist (works for guest and logged-in)
  useEffect(() => {
    const checkWishlistItems = async () => {
      if (!products || products.length === 0) {
        setWishlistItems(new Set());
        return;
      }

      try {
        // Fetch wishlist ONCE instead of calling isInWishlist for each product
        const wishlistData = await getWishlist();
        const wishlistSet = new Set();

        if (wishlistData && wishlistData.data && Array.isArray(wishlistData.data)) {
          // Extract all product IDs from wishlist
          const wishlistProductIds = new Set();
          wishlistData.data.forEach((item) => {
            const product = item.product || item;
            const productId = product?.productId || product?._id || item?.productId;
            if (productId) wishlistProductIds.add(productId);
          });

          // Check which products are in wishlist
          products.forEach((product) => {
            const productId = product?.productId || product?.id;
            if (productId && wishlistProductIds.has(productId)) {
              wishlistSet.add(productId);
            }
          });
        }

        setWishlistItems(wishlistSet);
      } catch (error) {
        console.error('Error checking wishlist:', error);
        setWishlistItems(new Set());
      }
    };

    checkWishlistItems();
  }, [products, isLoggedIn]);

  const handleWishlistToggle = async (e, productId) => {
    console.log(productId, 'productId')
    e.stopPropagation();

    if (!productId) {
      console.error("ProductId is missing");
      console.error("Product object:", e.currentTarget.closest('[data-product-id]'));
      setToast({
        open: true,
        message: "Product ID is missing. Please try again.",
        severity: "error",
        loading: false,
      });
      return;
    }
    const isInList = wishlistItems.has(productId);
    setToast({
      open: true,
      message: isInList ? "Removing from wishlist..." : "Adding to wishlist...",
      severity: "info",
      loading: true,
    });
    setLoadingWishlist((prev) => new Set(prev).add(productId));

    try {
      if (isInList) {
        await removeFromWishlist(productId);
        setWishlistItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
        setToast({
          open: true,
          message: "Removed from wishlist",
          severity: "success",
          loading: false,
        });
        window.dispatchEvent(new CustomEvent('wishlistUpdated'));
      } else {
        const response = await addToWishlist(productId);
        setWishlistItems((prev) => new Set(prev).add(productId));
        setToast({
          open: true,
          message: response?.message || "Added to wishlist",
          severity: "success",
          loading: false,
        });
        window.dispatchEvent(new CustomEvent('wishlistUpdated'));
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      setToast({
        open: true,
        message: error.response?.data?.message || "Failed to update wishlist",
        severity: "error",
        loading: false,
      });
    } finally {
      setLoadingWishlist((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleShare = (e, product) => {
    e.stopPropagation();
    const url = `${window.location.origin}/products/${product?.productId || ""}`;
    const text = `${product?.name || "Product"} ${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleAddToCart = async (e, product) => {
    e.stopPropagation();

    if (!product?.productId) {
      setToast({
        open: true,
        message: "Product ID is missing. Please try again.",
        severity: "error",
        loading: false,
      });
      return;
    }


    const productId = product.productId;
    setLoadingCart((prev) => new Set(prev).add(productId));
    setToast({
      open: true,
      message: "Adding to cart...",
      severity: "info",
      loading: true,
    });

    try {
      // Default quantity is 1, can be customized later
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
    } catch (error) {
      console.error("Error adding to cart:", error);
      setToast({
        open: true,
        message: error.response?.data?.message || "Failed to add product to cart",
        severity: "error",
        loading: false,
      });
    } finally {
      setLoadingCart((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: { xs: "center", sm: "flex-start" },
        gap: { xs: 1.5, sm: 2, md: 3, lg: 2.5 },
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.6s ease-in-out",
      }}
    >
      {products?.length > 0 ? (
        products?.map((product, index) => (
          <Box
            key={product?.productId}
            sx={{
              width: {
                xs: "calc(50% - 6px)",
                sm: "calc(33.333% - 13.33px)",
                md: "calc(25% - 18px)",
                lg: "calc(20% - 20px)",
              },
              display: "flex",
              animation: isVisible
                ? `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                : "none",
              "@keyframes fadeInUp": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(30px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
            <Card
              elevation={0}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/products/${product?.productId}`);
              }}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                "& .green-dot": {
                  position: "absolute",
                  top: 8,
                  left: 8,
                  width: 12,
                  height: 12,
                  backgroundColor: "#26d94c",
                  borderRadius: "50%",
                  border: "2px solid white",
                  zIndex: 15,
                },
                "& .hover-icons": {
                  opacity: 0,
                  transition: "opacity 0.4s ease",
                },
                "&:hover .hover-icons": {
                  opacity: 1,
                },

                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(255, 100, 58, 0)",
                  transition: "background-color 0.3s ease",
                  zIndex: 1,
                  pointerEvents: "none",
                },
                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",

                  "&::before": {
                    backgroundColor: "rgba(255, 100, 58, 0.05)",
                  },
                },

                "&:active": {
                  transform: "translateY(-4px) scale(1.01)",
                },
              }}
            >
              <Box className="green-dot" />
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  px: 1,
                  py: 0.25,
                  borderRadius: 1,
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#fff",
                  zIndex: 15,
                  bgcolor:
                    product?.courier === "Y" || product?.courier === "y"
                      ? "#2e7d32"
                      : "#d32f2f",
                }}
              >
                Courier
              </Box>
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  flexShrink: 0,
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    transition: "left 0.5s ease",
                  },
                  "&:hover::after": {
                    left: "100%",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product?.image}
                  alt={product?.name}
                  loading="lazy"
                  sx={{
                    height: { xs: 160, sm: 180, md: 200 },
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />

                <Box
                  className="hover-icons"
                  sx={{
                    position: "absolute",
                    bottom: 12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 1.5,
                    backgroundColor: "rgba(255,255,255,0.9)",
                    padding: "6px 14px",
                    borderRadius: "30px",
                    zIndex: 12,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={loadingCart.has(product?.productId)}
                    sx={{
                      position: "relative",
                      "&:disabled": {
                        opacity: 0.8,
                      },
                      transition: "all 0.3s ease",
                      "&:hover:not(:disabled)": {
                        transform: "scale(1.15)",
                        color: "var(--themeColor)",
                      },
                    }}
                  >
                    {loadingCart.has(product?.productId) ? (
                      <CircularProgress
                        size={18}
                        thickness={4}
                        sx={{
                          color: "var(--themeColor)",
                          position: "absolute",
                        }}
                      />
                    ) : (
                      <ShoppingCart
                        sx={{
                          fontSize: 18,
                          transition: "all 0.3s ease",
                        }}
                      />
                    )}
                  </IconButton>
                  <IconButton size="small" onClick={(e) => handleShare(e, product)}>
                    <ShareOutlined sx={{ fontSize: 18 }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(e) => handleWishlistToggle(e, product?.productId)}
                    disabled={loadingWishlist.has(product?.productId)}
                    sx={{
                      position: "relative",
                      "&:disabled": {
                        opacity: 0.8,
                      },
                      transition: "all 0.3s ease",
                      "&:hover:not(:disabled)": {
                        transform: "scale(1.15)",
                      },
                    }}
                  >
                    {loadingWishlist.has(product?.productId) ? (
                      <CircularProgress
                        size={18}
                        thickness={4}
                        sx={{
                          color: "#f44336",
                          position: "absolute",
                        }}
                      />
                    ) : wishlistItems.has(product?.productId) ? (
                      <Favorite
                        sx={{
                          fontSize: 18,
                          color: "#f44336",
                          animation: "heartBeat 0.6s ease",
                          "@keyframes heartBeat": {
                            "0%, 100%": { transform: "scale(1)" },
                            "25%": { transform: "scale(1.3)" },
                            "50%": { transform: "scale(1)" },
                            "75%": { transform: "scale(1.15)" },
                          },
                        }}
                      />
                    ) : (
                      <FavoriteBorder
                        sx={{
                          fontSize: 18,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            color: "#f44336",
                          },
                        }}
                      />
                    )}
                  </IconButton>
                </Box>
              </Box>
              <CardContent sx={{ p: { xs: 1.5, sm: 2 }, flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
                <CustomText
                  autoTitleCase={true}
                  sx={{
                    fontWeight: 600,
                    color: "#2c2c2c",
                    mb: 0.5,
                    fontSize: { xs: 11, sm: 12, md: 13 },
                    lineHeight: 1.3,
                    transition: "color 0.3s ease",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    minHeight: { xs: "2.6em", sm: "2.6em", md: "2.6em" },
                    "&:hover": {
                      color: "#FF643A",
                    },
                  }}
                >
                  {product?.name}
                </CustomText>

                <ProductDescription
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    flex: 1,
                    minHeight: 0,
                  }}
                >
                  {product?.description}
                </ProductDescription>

                <ProductPrice>{product?.price}</ProductPrice>
                {(product?.mrp != null || product?.rate != null) && (
                  <CustomText
                    sx={{
                      fontSize: 10,
                      color: "#666",
                      mt: 0.5,
                      textAlign: "right",
                    }}
                  >
                    {product?.mrp != null && `MRP ₹${product.mrp}`}
                    {product?.mrp != null && product?.rate != null && " · "}
                    {product?.rate != null && `Rate ₹${product.rate}`}
                  </CustomText>
                )}
              </CardContent>
            </Card>
          </Box>
        ))
      ) : (
        <Box 
          sx={{ 
            width: "100%", 
            textAlign: "center", 
            py: { xs: 6, md: 10 },
            px: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            animation: "fadeInUp 0.8s ease-out",
            "@keyframes fadeInUp": {
              "0%": { opacity: 0, transform: "translateY(30px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "pulse 2s ease-in-out infinite",
              "@keyframes pulse": {
                "0%, 100%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.1)" },
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: { xs: 120, md: 150 },
                height: { xs: 120, md: 150 },
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(255,148,114,0.1) 0%, rgba(242,112,156,0.1) 100%)",
                animation: "ripple 2s ease-out infinite",
                "@keyframes ripple": {
                  "0%": { transform: "scale(0.8)", opacity: 1 },
                  "100%": { transform: "scale(1.5)", opacity: 0 },
                },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                width: { xs: 100, md: 130 },
                height: { xs: 100, md: 130 },
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(255,148,114,0.15) 0%, rgba(242,112,156,0.15) 100%)",
                animation: "ripple 2s ease-out infinite 0.5s",
              }}
            />
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                width: { xs: 80, md: 100 },
                height: { xs: 80, md: 100 },
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FF9472 0%, #F2709C 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 30px rgba(255,148,114,0.3)",
              }}
            >
              <SearchOff 
                sx={{ 
                  fontSize: { xs: 40, md: 50 },
                  color: "#fff",
                }} 
              />
            </Box>
          </Box>
          
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <CustomText 
              variant="h5" 
              sx={{ 
                color: "#2c2c2c", 
                fontSize: { xs: 20, sm: 24, md: 28 },
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              No Products Found
            </CustomText>
            <CustomText 
              sx={{ 
                color: "#666", 
                fontSize: { xs: 14, md: 16 },
                maxWidth: { xs: "100%", md: "500px" },
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              We couldn't find any products matching your search. Try adjusting your filters or browse our categories.
            </CustomText>
          </Box>
        </Box>
      )}

      <CustomToast
        open={toast.open}
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
        severity={toast.severity}
        loading={toast.loading}
      />
    </Box>
  );
});

