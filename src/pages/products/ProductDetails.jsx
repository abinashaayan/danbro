import { useState, useEffect, useMemo, useRef } from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  TextField,
  Breadcrumbs,
  Link,
  Rating,
  Divider,
  Select,
  MenuItem,
  IconButton,
  Avatar,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import {
  Add,
  Remove,
  FavoriteBorder,
  LocalGroceryStore,
  Handshake,
  Shield,
  Verified,
  LocalShipping,
  ThumbUpOffAlt,
  ThumbDownOffAlt,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import { fetchProducts, fetchProductById } from "../../utils/apiService";
import { useItemCategories } from "../../hooks/useItemCategories";
import { useHomeLayout } from "../../hooks/useHomeLayout";
import { addToCart } from "../../utils/cart";
import { getAccessToken } from "../../utils/cookies";
import { getStoredLocation } from "../../utils/location";
import blankImage from "../../assets/blankimage.png";

export const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedImage, setSelectedImage] = useState(0);
  const [tab, setTab] = useState("cake");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [productWeight, setProductWeight] = useState("500g");
  const [selectOpen, setSelectOpen] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState(null);
  const [cakeMessage, setCakeMessage] = useState("");

  // Delivery location display
  const [deliveryLocationLabel, setDeliveryLocationLabel] = useState("");
  const [hasSavedLocation, setHasSavedLocation] = useState(false);

  // Image zoom state
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  // Fetch categories and home layout data
  const { categories: apiCategories } = useItemCategories();
  const { products: homeLayoutProducts } = useHomeLayout();

  // On mount, determine if we already have a stored delivery location
  useEffect(() => {
    try {
      const stored = localStorage.getItem("userLocation");
      if (stored) {
        const parsed = JSON.parse(stored);
        setHasSavedLocation(true);
        setDeliveryLocationLabel(parsed.label || "Saved delivery location");
      } else {
        setHasSavedLocation(false);
        setDeliveryLocationLabel("");
      }
    } catch {
      setHasSavedLocation(false);
      setDeliveryLocationLabel("");
    }
  }, []);

  // Update delivery label when location is changed anywhere in the app
  useEffect(() => {
    const handleLocationUpdated = (event) => {
      const detail = event.detail || {};
      const label = detail.label || getStoredLocation().label || "Saved delivery location";
      setHasSavedLocation(true);
      setDeliveryLocationLabel(label);
    };

    window.addEventListener("locationUpdated", handleLocationUpdated);
    return () => {
      window.removeEventListener("locationUpdated", handleLocationUpdated);
    };
  }, []);

  useEffect(() => {
    if (!selectOpen) return;

    const handleScroll = () => {
      setSelectOpen(false);
    };

    document.addEventListener('scroll', handleScroll, { capture: true, passive: true });

    return () => {
      document.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, [selectOpen]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id) {
          setError("Product ID not found");
          setLoading(false);
          return;
        }
        const productId = id;

        // OPTIMIZATION 1: Use direct API endpoint to get product by ID (fastest)
        try {
          const response = await fetchProductById(productId);
          if (response?.success && response?.data) {
            setProduct(response.data);
            setProductWeight(response.data.weight || "500g");
            setLoading(false);
            return;
          } else if (response?.data) {
            // Some APIs return data directly without success flag
            setProduct(response.data);
            setProductWeight(response.data.weight || "500g");
            setLoading(false);
            return;
          }
        } catch (err) {
          console.log('Direct product fetch failed, trying fallback methods...', err);
        }

        // FALLBACK 1: Check homeLayout products data (already loaded)
        if (homeLayoutProducts && homeLayoutProducts.length > 0) {
          for (const categoryData of homeLayoutProducts) {
            if (categoryData.products && Array.isArray(categoryData.products)) {
              const foundProduct = categoryData.products.find(p =>
                p.productId === productId ||
                p._id === productId ||
                p.id === productId
              );
              if (foundProduct) {
                // Try to get full product details
                try {
                  const response = await fetchProductById(productId);
                  if (response?.success && response?.data) {
                    setProduct(response.data);
                    setProductWeight(response.data.weight || "500g");
                    setLoading(false);
                    return;
                  }
                } catch (err) {
                  // Use the product from homeLayout as fallback
                  setProduct(foundProduct);
                  setProductWeight(foundProduct.weight || "500g");
                  setLoading(false);
                  return;
                }
              }
            }
          }
        }

        // FALLBACK 2: Search without category filter
        try {
          const response = await fetchProducts(null, 1, 100, productId);
          if (response?.success && response?.data && Array.isArray(response.data)) {
            const foundProduct = response.data.find(p =>
              p._id === productId ||
              p.productId === productId ||
              p.id === productId ||
              p.productId?.toString() === productId ||
              p._id?.toString() === productId
            );
            if (foundProduct) {
              setProduct(foundProduct);
              setProductWeight(foundProduct.weight || "500g");
              setLoading(false);
              return;
            }
          }
        } catch (err) {
          console.log('Search without category failed');
        }

        setError("Product not found");
      } catch (err) {
        console.error('Error loading product:', err);
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    // Load product immediately when id is available
    if (id) {
      loadProduct();
    }
  }, [id, apiCategories, homeLayoutProducts]);

  const handleAddToCart = async () => {
    if (!product) return;

    const token = getAccessToken();
    if (!token) {
      setCartMessage({ type: "error", text: "Please login to add items to cart" });
      setTimeout(() => setCartMessage(null), 3000);
      return;
    }

    try {
      setAddingToCart(true);
      setCartMessage(null);

      // Get productId - could be _id, productId, or prdcode
      const productId = product._id || product.productId || product.id || product.prdcode?.toString();

      if (!productId) {
        throw new Error("Product ID not found");
      }

      const response = await addToCart(productId, quantity);

      setCartMessage({
        type: "success",
        text: response?.message || "Item added to cart successfully!"
      });

      // Dispatch event to update cart count in header
      window.dispatchEvent(new CustomEvent('cartUpdated'));

      setTimeout(() => setCartMessage(null), 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setCartMessage({
        type: "error",
        text: error.response?.data?.message || error.message || "Failed to add item to cart"
      });
      setTimeout(() => setCartMessage(null), 3000);
    } finally {
      setAddingToCart(false);
    }
  };

  // Transform product data for display
  const productData = useMemo(() => {
    if (!product) return null;

    const priceObj = product.price && product.price.length > 0 ? product.price[0] : { rate: 0, mrp: 0 };
    const displayPrice = priceObj.rate || priceObj.mrp || 0;

    // Transform nutrition array to object
    const nutritionObj = {};
    if (product.nutrition && Array.isArray(product.nutrition)) {
      product.nutrition.forEach(item => {
        const key = Object.keys(item)[0];
        const value = item[key];
        nutritionObj[key] = value;
      });
    }

    let images = [];

    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      images = product.images.map(img => img.url || blankImage);
    } else {
      images = [blankImage, blankImage, blankImage, blankImage];
    }

    return {
      name: product.name || "Product",
      description: product.ingredient || product.name || "",
      price: `₹${displayPrice}`,
      weight: product.weight || "500g",
      stock: 235, // API doesn't provide stock, using default
      images: images,
      nutrition: nutritionObj,
      ingredient: product.ingredient || "",
    };
  }, [product]);

  // Available weight options – drive strictly from API data (no static list)
  const weightOptions = useMemo(() => {
    if (!product) return [];

    // If backend ever sends explicit options array, prefer that
    if (Array.isArray(product.weightOptions) && product.weightOptions.length > 0) {
      return product.weightOptions;
    }

    // Fallback: single weight string from API
    if (typeof product.weight === "string" && product.weight.trim()) {
      return [product.weight.trim()];
    }

    return [];
  }, [product]);

  const icons = [<LocalGroceryStore />, <Handshake />, <Shield />, <Verified />];
  const features = [
    "100% Organic Flour\nLocally sourced",
    "Handmade Daily\nBaked fresh at 4 AM",
    "No Preservatives\nClean ingredients",
    "Quality Guarantee\nTaste the difference"
  ];


  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: "var(--themeColor)" }} />
      </Box>
    );
  }

  if (error || !productData) {
    return (
      <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error || "Product not found"}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Container maxWidth="lg" sx={{ pb: 6, px: { xs: 2, sm: 3, md: 4 }, }}>
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link
            component="button"
            variant="body1"
            onClick={() => navigate("/products")}
            sx={{
              color: "#666",
              textDecoration: "none",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              fontSize: 14,
              fontWeight: 400,
              "&:hover": { color: "#FF9472" },
            }}
          >
            Products
          </Link>
          <CustomText color="text.primary" autoTitleCase={true} sx={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 400, }}>
            {productData?.name}
          </CustomText>
        </Breadcrumbs>

        <Grid container spacing={{ xs: 3, md: 5 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" } }}>
              <Box sx={{ display: { xs: "none", md: "flex" }, flexDirection: "column", gap: 1.5 }}>
                {productData?.images?.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: 1,
                      overflow: "hidden",
                      cursor: "pointer",
                      border: selectedImage === index ? "2px solid #FF9472" : "1px solid #e0e0e0",
                    }}
                  >
                    <Box
                      component="img"
                      src={image}
                      alt={`${productData?.name} ${index + 1}`}
                      loading={index === 0 ? "eager" : "lazy"}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ flex: 1, position: "relative" }}>
                <Box
                  ref={imageContainerRef}
                  sx={{
                    width: "100%",
                    height: { xs: 350, sm: 400, md: 500 },
                    borderRadius: 1,
                    overflow: "hidden",
                    backgroundColor: "#f5f5f5",
                    position: "relative",
                    cursor: { xs: "default", md: isZooming ? "crosshair" : "default" },
                  }}
                  onMouseEnter={() => !isMobile && setIsZooming(true)}
                  onMouseLeave={() => setIsZooming(false)}
                  onMouseMove={(e) => {
                    if (!imageContainerRef.current || isMobile) return;
                    const rect = imageContainerRef.current.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
                  }}
                >
                  <Box
                    component="img"
                    src={productData?.images[selectedImage]}
                    alt={productData?.name}
                    loading="eager"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {/* Stock badge - top right on main image */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      backgroundColor: "rgba(0,0,0,0.65)",
                      color: "#fff",
                      px: 1.5,
                      py: 0.75,
                      borderRadius: 1,
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: "'Poppins', sans-serif",
                      zIndex: 5,
                    }}
                  >
                    {productData?.stock} in stock
                  </Box>
                  {/* Zoom lens overlay */}
                  {isZooming && !isMobile && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: mousePosition.y - 100,
                        left: mousePosition.x - 100,
                        width: 200,
                        height: 200,
                        borderRadius: "50%",
                        border: "2px solid #FF9472",
                        backgroundColor: "rgba(255, 148, 114, 0.15)",
                        pointerEvents: "none",
                        display: { xs: "none", md: "block" },
                        zIndex: 10,
                        boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.3)",
                        clipPath: "circle(100px at center)",
                      }}
                    />
                  )}
                </Box>
                {/* Zoomed image panel */}
                {isZooming && !isMobile && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: { xs: 0, md: -420 },
                      width: { xs: "100%", md: 400 },
                      height: { xs: 350, sm: 400, md: 500 },
                      borderRadius: 1,
                      overflow: "hidden",
                      backgroundColor: "#fff",
                      border: "1px solid #e0e0e0",
                      zIndex: 20,
                      display: { xs: "none", md: "block" },
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Box
                      component="img"
                      src={productData?.images[selectedImage]}
                      alt={`${productData?.name} - Zoomed`}
                      sx={{
                        width: "200%",
                        height: "200%",
                        objectFit: "cover",
                        position: "absolute",
                        left: `${-zoomPosition.x * 2}%`,
                        top: `${-zoomPosition.y * 2}%`,
                        pointerEvents: "none",
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <CustomText
                variant="h3"
                autoTitleCase={true}
                sx={{
                  fontSize: { xs: 24, sm: 28, md: 32 },
                  fontWeight: 600,
                  fontFamily: "'Playfair Display', serif",
                  color: "#2c2c2c",
                  mb: 1,
                }}
              >
                {productData?.name}
              </CustomText>
              <Box>
                <CustomText sx={{ fontSize: { xs: 24, sm: 28, md: 32 }, fontWeight: 600, fontFamily: "'Poppins', sans-serif", color: "#F31400", }}>
                  {productData?.price}
                  <Box component="span" sx={{ fontSize: 14, fontWeight: 400, color: "#666", ml: 0.5 }}>
                    / {productData?.weight}
                  </Box>
                </CustomText>
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Rating value={4.5} precision={0.5} readOnly sx={{ color: "#FF643A" }} />
                  <CustomText sx={{ fontSize: 14, fontWeight: 500, fontFamily: "'Poppins', sans-serif", color: "#333" }}>
                    4.5
                  </CustomText>
                  <CustomText sx={{ fontSize: 14, fontWeight: 400, fontFamily: "'Poppins', sans-serif", color: "#777" }}>
                    (245 Reviews)
                  </CustomText>
                </Box>
              </Box>
              <CustomText
                variant="body1"
                autoTitleCase={true}
                sx={{
                  color: "#666",
                  lineHeight: 1.7,
                  mb: 1,
                  fontSize: 15,
                  fontWeight: 400,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {productData?.description}
              </CustomText>
              <Divider sx={{ backgroundColor: "#e0e0e0" }} />
              {/* Weight selection */}
              {weightOptions.length > 0 && (
                <Box sx={{ mb: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                    <CustomText sx={{ fontWeight: 600, fontFamily: "'Poppins', sans-serif", color: "#2c2c2c", fontSize: 14 }}>
                      Select Weight
                    </CustomText>
                    <Chip
                      label={`${productData?.stock ?? 0} in stock`}
                      size="small"
                      sx={{
                        fontSize: 12,
                        fontWeight: 500,
                        fontFamily: "'Poppins', sans-serif",
                        borderRadius: 1,
                        backgroundColor: "#f0f9f0",
                        color: "#2e7d32",
                        border: "1px solid #c8e6c9",
                      }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {weightOptions?.map((w) => (
                      <Chip
                        key={w}
                        label={w}
                        clickable
                        onClick={() => setProductWeight(w)}
                        size="small"
                        sx={{
                          fontSize: 13,
                          fontWeight: 500,
                          fontFamily: "'Poppins', sans-serif",
                          borderRadius: 1,
                          px: 1.5,
                          py: 0.5,
                          border: productWeight === w ? "2px solid #F31400" : "1px solid #ddd",
                          backgroundColor: productWeight === w ? "#FFE9E3" : "#fff",
                          color: productWeight === w ? "#F31400" : "#333",
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Cake message input */}
              <Box sx={{ mb: 1 }}>
                <CustomText sx={{ fontWeight: 600, fontFamily: "'Poppins', sans-serif", color: "#2c2c2c", fontSize: 14, mb: 1 }}>
                  Cake Message
                </CustomText>
                <TextField
                  fullWidth
                  placeholder="Write a sweet wish!"
                  value={cakeMessage}
                  onChange={(e) => {
                    const value = e.target.value.slice(0, 25);
                    setCakeMessage(value);
                  }}
                  size="small"
                  inputProps={{ maxLength: 25 }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                      fontFamily: "'Poppins', sans-serif",
                    },
                  }}
                  helperText={`${cakeMessage.length}/25`}
                />
              </Box>

              {/* Delivery location section */}
              <Box sx={{ mb: 3, p: 2, borderRadius: 1, border: "1px solid #e0e0e0", backgroundColor: "#fafafa" }}>
                <CustomText sx={{ fontWeight: 600, fontFamily: "'Poppins', sans-serif", color: "#2c2c2c", fontSize: 14, mb: 1.5 }}>
                  Delivery Location
                </CustomText>

                {hasSavedLocation ? (
                  <Box sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    gap: 1.5,
                    alignItems: { xs: "flex-start", sm: "center" }
                  }}>
                    <Box>
                      <CustomText sx={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "'Poppins', sans-serif",
                        color: "#2c2c2c"
                      }}>
                        {deliveryLocationLabel}
                      </CustomText>
                      <CustomText sx={{
                        fontSize: 13,
                        fontWeight: 400,
                        fontFamily: "'Poppins', sans-serif",
                        color: "#1B9C3F",
                        mt: 0.5
                      }}>
                        Awesome, we deliver to this location.
                      </CustomText>
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        window.dispatchEvent(new Event("openLocationDialog"));
                      }}
                      sx={{
                        borderRadius: 1,
                        textTransform: "none",
                        fontSize: 13,
                        fontWeight: 500,
                        fontFamily: "'Poppins', sans-serif",
                        px: 2,
                        borderColor: "#F31400",
                        color: "#F31400",
                        "&:hover": {
                          borderColor: "#C22A00",
                          backgroundColor: "rgba(255, 148, 114, 0.08)",
                        },
                      }}
                    >
                      Change
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 1.5,
                    alignItems: { xs: "stretch", sm: "center" }
                  }}>
                    <TextField
                      fullWidth
                      placeholder="Enter area / locality / pincode"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 1,
                          fontFamily: "'Poppins', sans-serif",
                        },
                      }}
                      onFocus={() => {
                        window.dispatchEvent(new Event("openLocationDialog"));
                      }}
                      onClick={() => {
                        window.dispatchEvent(new Event("openLocationDialog"));
                      }}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        window.dispatchEvent(new Event("openLocationDialog"));
                      }}
                      sx={{
                        borderRadius: 1,
                        textTransform: "none",
                        fontSize: 13,
                        fontWeight: 500,
                        fontFamily: "'Poppins', sans-serif",
                        px: 2.5,
                        backgroundColor: "#F31400",
                        "&:hover": {
                          backgroundColor: "#C22A00",
                        },
                      }}
                    >
                      Set Location
                    </Button>
                  </Box>
                )}
              </Box>

              {/* Quantity and Add to Cart */}
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ xs: 4, sm: 3 }}>
                  <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: 1,
                    border: "1px solid #ddd",
                    p: 1,
                    backgroundColor: "#fff"
                  }}>
                    <Box
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                    >
                      <Remove sx={{ color: "#2c2c2c", fontSize: 20 }} />
                    </Box>
                    <CustomText
                      sx={{
                        fontWeight: 500,
                        fontFamily: "'Poppins', sans-serif",
                        color: "#2c2c2c",
                        fontSize: 14
                      }}
                    >
                      {quantity}
                    </CustomText>
                    <Box
                      onClick={() => setQuantity(quantity + 1)}
                      sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                    >
                      <Add sx={{ color: "#2c2c2c", fontSize: 20 }} />
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 7 }}>
                  <Button
                    onClick={handleAddToCart}
                    disabled={addingToCart || !product}
                    fullWidth
                    sx={{
                      backgroundColor: "#FF9472",
                      color: "#fff",
                      py: 1.2,
                      borderRadius: 1,
                      fontSize: 15,
                      fontWeight: 500,
                      fontFamily: "'Poppins', sans-serif",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#F2709C",
                      },
                      "&:disabled": {
                        backgroundColor: "#ccc",
                        color: "#999",
                      },
                    }}
                  >
                    {addingToCart ? (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CircularProgress size={20} sx={{ color: "#fff" }} />
                        <CustomText sx={{ fontFamily: "'Poppins', sans-serif" }}>Adding...</CustomText>
                      </Box>
                    ) : (
                      "Add to Cart"
                    )}
                  </Button>
                </Grid>
                <Grid size={{ xs: 2, sm: 2 }}>
                  <IconButton
                    aria-label="favorite"
                    sx={{
                      backgroundColor: "#f5f5f5",
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "#e0e0e0",
                      }
                    }}
                  >
                    <FavoriteBorder sx={{ color: "#2c2c2c", fontSize: 20 }} />
                  </IconButton>
                </Grid>
              </Grid>

              {cartMessage && (
                <Alert
                  severity={cartMessage.type}
                  sx={{ mt: 2, borderRadius: 1 }}
                  onClose={() => setCartMessage(null)}
                >
                  {cartMessage.text}
                </Alert>
              )}

              <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 3,
                backgroundColor: "#f0f9f0",
                p: 1.5,
                borderRadius: 1,
                border: "1px solid #c8e6c9"
              }}>
                <LocalShipping sx={{ fontSize: 18, color: "#00A819" }} />
                <CustomText
                  sx={{
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: "'Poppins', sans-serif",
                    color: "#00A819"
                  }}
                >
                  Order within 2hrs for delivery today.
                </CustomText>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>


      <Box sx={{ py: 4, backgroundColor: "#fafafa" }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Grid container spacing={3}>
            {features?.map((text, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{
                  backgroundColor: "#fff",
                  p: 3,
                  borderRadius: 1,
                  border: "1px solid #e0e0e0",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  height: "100%"
                }}>
                  <Box sx={{
                    backgroundColor: "#fff5f2",
                    color: "#FF6F61",
                    width: 50,
                    height: 50,
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    {icons[i]}
                  </Box>
                  <CustomText
                    sx={{
                      whiteSpace: "pre-line",
                      fontSize: 13,
                      fontWeight: 500,
                      fontFamily: "'Poppins', sans-serif",
                      color: "#515151",
                      lineHeight: 1.6
                    }}
                  >
                    {text}
                  </CustomText>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* What's Inside + Nutrition Facts */}
      <Container maxWidth="lg" sx={{ py: 5, px: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ p: 3, border: "1px solid #e0e0e0", borderRadius: 1, backgroundColor: "#fff" }}>
              <CustomText
                sx={{
                  fontWeight: 600,
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 18,
                  mb: 2,
                  color: "#2c2c2c"
                }}
              >
                What's Inside
              </CustomText>
              <CustomText
                autoTitleCase={true}
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  fontFamily: "'Poppins', sans-serif",
                  color: "#666",
                  lineHeight: 1.7,
                  mb: product.veg ? 2 : 0
                }}
              >
                {productData?.ingredient || "Ingredients information not available."}
              </CustomText>
              {product.veg && (
                <Box sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: "#fff5f2",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                  border: "1px solid #FF643A"
                }}>
                  <ThumbUpOffAlt sx={{ color: "#FF643A", fontSize: 20, mt: 0.5 }} />
                  <Box>
                    <CustomText
                      sx={{
                        fontWeight: 600,
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: 14,
                        color: "#2c2c2c",
                        mb: 0.5
                      }}
                    >
                      Vegetarian Product
                    </CustomText>
                    <CustomText
                      sx={{
                        fontSize: 13,
                        fontWeight: 400,
                        fontFamily: "'Poppins', sans-serif",
                        color: "#666"
                      }}
                    >
                      {product.veg === "Y" ? "This is a vegetarian product." : "Please check ingredients for allergen information."}
                    </CustomText>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ p: 3, border: "1px solid #e0e0e0", borderRadius: 1, backgroundColor: "#fff" }}>
              <CustomText
                sx={{
                  fontWeight: 600,
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 18,
                  mb: 2,
                  color: "#2c2c2c"
                }}
              >
                Nutrition Facts
              </CustomText>
              <Box>
                {productData?.nutrition && Object.keys(productData?.nutrition).length > 0 ? (
                  Object.entries(productData?.nutrition).map(([label, value], index, array) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: 1.2,
                        borderBottom: index !== array.length - 1 ? "1px solid #e0e0e0" : "none"
                      }}
                    >
                      <CustomText
                        sx={{
                          fontSize: 14,
                          fontWeight: 400,
                          fontFamily: "'Poppins', sans-serif",
                          color: "#666"
                        }}
                      >
                        {label}
                      </CustomText>
                      <CustomText
                        sx={{
                          fontWeight: 500,
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: 14,
                          color: "#2c2c2c"
                        }}
                      >
                        {value}
                      </CustomText>
                    </Box>
                  ))
                ) : (
                  <CustomText
                    sx={{
                      fontSize: 14,
                      fontWeight: 400,
                      fontFamily: "'Poppins', sans-serif",
                      color: "#666"
                    }}
                  >
                    Nutrition information not available.
                  </CustomText>
                )}
              </Box>
              {product.expiryday && (
                <Box sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 1,
                  border: "1px solid #e0e0e0"
                }}>
                  <CustomText
                    sx={{
                      fontWeight: 600,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 14,
                      color: "#2c2c2c",
                      mb: 0.5
                    }}
                  >
                    Storage Instructions
                  </CustomText>
                  <CustomText
                    sx={{
                      fontSize: 13,
                      fontWeight: 400,
                      fontFamily: "'Poppins', sans-serif",
                      color: "#666"
                    }}
                  >
                    Best consumed within {product.expiryday} days. Keep in a cool dry place.
                  </CustomText>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Rating Section */}
        <Box sx={{ mt: 5, mb: 4 }}>
          <CustomText
            sx={{
              fontSize: 28,
              fontWeight: 600,
              fontFamily: "'Playfair Display', serif",
              color: "#2c2c2c",
              mb: 0.5
            }}
          >
            4.5 ⭐
          </CustomText>
          <CustomText
            sx={{
              fontSize: 14,
              fontWeight: 400,
              fontFamily: "'Poppins', sans-serif",
              color: "#666",
              mb: 3
            }}
          >
            120 reviews
          </CustomText>

          {/* Rating Bars */}
          {[5, 4, 3, 2, 1].map((r, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 1.5
              }}
            >
              <CustomText
                sx={{
                  width: 20,
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: "'Poppins', sans-serif",
                  color: "#2c2c2c"
                }}
              >
                {r}
              </CustomText>
              <Box sx={{
                flex: 1,
                height: 8,
                backgroundColor: "#f0f0f0",
                borderRadius: 1,
                overflow: "hidden"
              }}>
                <Box sx={{
                  height: "100%",
                  width: `${[40, 20, 19, 10, 7][i]}%`,
                  backgroundColor: "#FF6F61",
                }} />
              </Box>
              <CustomText
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  fontFamily: "'Poppins', sans-serif",
                  color: "#666",
                  width: 40,
                  textAlign: "right"
                }}
              >
                {[40, 20, 19, 10, 7][i]}%
              </CustomText>
            </Box>
          ))}
        </Box>

        {/* Reviews */}
        <Box sx={{ mt: 4, mb: 5 }}>
          {[{
            name: "Sophia Carter",
            time: "2 weeks ago",
            text: "These chocolate muffins are absolutely divine! Perfect balance of sweetness and rich chocolate flavor."
          }, {
            name: "Ethan Bennett",
            time: "1 month ago",
            text: "Good taste, a little too sweet for me. Texture is soft and moist overall decent treat."
          }].map((review, i) => (
            <Box
              key={i}
              sx={{
                p: 3,
                borderRadius: 1,
                backgroundColor: "#fafafa",
                border: "1px solid #e0e0e0",
                mt: 2
              }}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1.5 }}>
                <Avatar
                  alt={review.name}
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#FF9472"
                  }}
                >
                  {review.name.charAt(0)}
                </Avatar>
                <Box>
                  <CustomText
                    sx={{
                      fontWeight: 600,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 15,
                      color: "#2c2c2c"
                    }}
                  >
                    {review.name}
                  </CustomText>
                  <CustomText
                    sx={{
                      fontSize: 13,
                      fontWeight: 400,
                      fontFamily: "'Poppins', sans-serif",
                      color: "#666"
                    }}
                  >
                    {review.time}
                  </CustomText>
                </Box>
              </Box>
              <Rating value={5 - i} readOnly size="small" sx={{ mb: 1.5, color: "#FF643A" }} />
              <CustomText
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  fontFamily: "'Poppins', sans-serif",
                  color: "#666",
                  lineHeight: 1.7,
                  mb: 2
                }}
              >
                {review.text}
              </CustomText>
              <Box sx={{
                display: "flex",
                gap: 3,
                color: "#707070"
              }}>
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  cursor: "pointer"
                }}>
                  <ThumbUpOffAlt sx={{ fontSize: 18 }} />
                  <CustomText
                    sx={{
                      fontSize: 13,
                      fontWeight: 400,
                      fontFamily: "'Poppins', sans-serif"
                    }}
                  >
                    12
                  </CustomText>
                </Box>
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  cursor: "pointer"
                }}>
                  <ThumbDownOffAlt sx={{ fontSize: 18 }} />
                  <CustomText
                    sx={{
                      fontSize: 13,
                      fontWeight: 400,
                      fontFamily: "'Poppins', sans-serif"
                    }}
                  >
                    3
                  </CustomText>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Explore More section disabled as per request */}
      </Container>
    </Box>
  );
};

