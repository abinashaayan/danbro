import { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, Button, IconButton, CircularProgress, Alert, Typography } from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import { CustomText } from "../comman/CustomText";
import api from "../../utils/api";
import { getStoredLocation } from "../../utils/location";

export const WishlistTab = ({ onRemoveFromWishlist }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  // Fetch wishlist items
  const fetchWishlist = async () => {
    setLoading(true);
    setError(null);
    try {
      // Headers (lat/long) are automatically added by axios interceptor
      const response = await api.get('/wishlist/get');

      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        // Format wishlist items - API returns products directly in data array
        const formattedItems = response.data.data.map((item) => {
          // Product data is directly in item (new API structure)
          // Support both old structure (item?.product) and new structure (item directly)
          const product = item?.product || item;

          // Extract price - price is an array
          const price = product.price && Array.isArray(product.price) && product.price.length > 0
            ? product.price[0]
            : null;

          // Extract image - images is an array of objects with url
          const image = product.images && Array.isArray(product.images) && product.images.length > 0
            ? product.images[0].url
            : "https://via.placeholder.com/300";

          return {
            id: item?._id || item?.id || product.productId || product._id,
            productId: product.productId || product._id || item?.productId,
            prdcode: product.prdcode || null,
            name: product.name || "Unknown Product",
            image: image,
            price: price
              ? `₹${price.rate || price.mrp || "N/A"}`
              : "Price not available",
            mrp: price?.mrp || null,
            rate: price?.rate || null,
            weight: product.weight || null,
            category: product.category || null,
            subcategory: product.subcategory || null,
          };
        });
        setWishlistItems(formattedItems);
      } else {
        setWishlistItems([]);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setError('Failed to load wishlist. Please try again later.');
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Remove item from wishlist
  const handleRemoveFromWishlist = async (productId) => {
    setRemovingId(productId);
    try {
      const response = await api.post('/wishlist/remove', {
        productId: productId,
      });

      if (response.data) {
        // Remove from local state
        setWishlistItems((prev) => prev.filter((item) => item?.productId !== productId));

        // Call parent callback if provided
        if (onRemoveFromWishlist) {
          onRemoveFromWishlist(productId);
        }

        // Dispatch event to update wishlist count in TopHeader
        window.dispatchEvent(new CustomEvent('wishlistUpdated'));
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      setError('Failed to remove item from wishlist. Please try again.');
    } finally {
      setRemovingId(null);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
        <CircularProgress sx={{ color: "var(--themeColor)" }} />
      </Box>
    );
  }

  if (error && wishlistItems.length === 0) {
    return (
      <Box>
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

  return (
    <Box>
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
      ) : (
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ justifyContent: { xs: "flex-start", md: "center" } }}>
          {wishlistItems?.map((item, index) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={item?.id}>
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
                        if (item?.prdcode) {
                          window.location.href = `/products/${item?.prdcode}`;
                        } else if (item?.productId) {
                          window.location.href = `/products/${item?.productId}`;
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
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

