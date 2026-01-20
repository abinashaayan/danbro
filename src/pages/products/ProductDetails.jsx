import { useState, useEffect, useMemo, memo } from "react";
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
} from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  CheckCircle as CheckCircleIcon,
  ShoppingCart as ShoppingCartIcon,
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
import { fetchProducts } from "../../utils/apiService";
import { useItemCategories } from "../../hooks/useItemCategories";

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
  
  // Fetch categories to get all products
  const { categories: apiCategories } = useItemCategories();

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

        const productId = parseInt(id);
        if (apiCategories && apiCategories.length > 0) {
          try {
            const productPromises = apiCategories.map(category => 
              fetchProducts(category.id).catch(err => {
                return null;
              })
            );
            
            const responses = await Promise.all(productPromises);
            for (const response of responses) {
              if (!response) continue;
              
              const data = response?.data || response?.records;
              if (Array.isArray(data)) {
                const foundProduct = data.find(p => p.prdcode === productId);
                if (foundProduct) {
                  setProduct(foundProduct);
                  setProductWeight(foundProduct.weight || "500g");
                  setLoading(false);
                  return;
                }
              }
            }
          } catch (err) {
            for (const category of apiCategories) {
              try {
                const response = await fetchProducts(category.id);
                const data = response?.data || response?.records;
                if (Array.isArray(data)) {
                  const foundProduct = data.find(p => p.prdcode === productId);
                  if (foundProduct) {
                    setProduct(foundProduct);
                    setProductWeight(foundProduct.weight || "500g");
                    setLoading(false);
                    return;
                  }
                }
              } catch (err) {
                continue;
              }
            }
          }
        }
        
        setError("Product not found");
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (apiCategories && apiCategories.length > 0) {
      loadProduct();
    }
  }, [id, apiCategories]);

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
    
    const placeholderImage = "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=400&fit=crop&auto=format&q=80";
    let images = [];
    
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      images = product.images.map(img => img.url || placeholderImage);
    } else {
      images = [placeholderImage, placeholderImage, placeholderImage, placeholderImage];
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

  const icons = [<LocalGroceryStore />, <Handshake />, <Shield />, <Verified />];
  const features = [
    "100% Organic Flour\nLocally sourced",
    "Handmade Daily\nBaked fresh at 4 AM",
    "No Preservatives\nClean ingredients",
    "Quality Guarantee\nTaste the difference"
  ];

  const images = useMemo(() => [
    "https://picsum.photos/id/1040/300/200",
    "https://picsum.photos/id/1060/300/200",
    "https://picsum.photos/id/1080/300/200",
    "https://picsum.photos/id/109/300/200",
    "https://picsum.photos/id/120/300/200",
    "https://picsum.photos/id/121/300/200",
    "https://picsum.photos/id/122/300/200",
    "https://picsum.photos/id/123/300/200"
  ], []);

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
    <Box >
      <Container maxWidth="false" sx={{ py: 4, px: { xs: 2, md: 3, lg: 2 } }}>
        <Breadcrumbs sx={{ mb: 3, px: { xs: 2, md: 3, lg: 2 } }}>
          <Link component="button" variant="body1" onClick={() => navigate("/products")} sx={{ color: "#666", textDecoration: "none", cursor: "pointer", "&:hover": { color: "#FF9472", }, }}>
            Products
          </Link>
          <CustomText color="text.primary" autoTitleCase={true}>{productData?.name}</CustomText>
        </Breadcrumbs>

          <Grid container spacing={{ xs: 2, md: 4, lg: 3 }} sx={{ px: { xs: 2, md: 3, lg: 2 } }}>
            <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", gap: { xs: 1, md: 2 } }}>
              <Box sx={{ display: { xs: "none", md: "flex" }, flexDirection: "column", gap: 1 }}>
                {productData?.images?.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      overflow: "hidden",
                      cursor: "pointer",
                      border: selectedImage === index ? "2px solid #FF9472" : "2px solid transparent",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        border: "2px solid #FF9472",
                      },
                    }}
                  >
                    <Box 
                      component="img" 
                      src={image} 
                      alt={`${productData?.name} ${index + 1}`} 
                      loading="lazy"
                      sx={{ width: "100%", height: "100%", objectFit: "cover", }} 
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ width: "100%", height: { xs: 300, sm: 350, md: 450 }, borderRadius: 2, overflow: "hidden", mb: 2 }}>
                  <Box 
                    component="img" 
                    src={productData?.images[selectedImage]} 
                    alt={productData?.name} 
                    loading="lazy"
                    sx={{ width: "100%", height: "100%", objectFit: "cover", }} 
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <CustomText variant="h3" autoTitleCase={true} sx={{ fontSize: { xs: 20, sm: 24, md: 30, lg: 36 }, fontWeight: 700, color: "#2c2c2c", mb: 2, }}>
                {productData?.name}
              </CustomText>
              <CustomText variant="h4" sx={{ fontSize: { xs: 20, sm: 24, md: 30, lg: 36 }, fontWeight: 700, color: "#F31400", mb: 2, display: "flex", alignItems: "center" }}>
                {productData?.price} / <CustomText variant="body1" sx={{ fontSize: '13px', fontWeight: 600, color: "#2c2c2c", }}>
                  {productData?.weight}
                </CustomText>
              </CustomText>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating value={4.5} precision={0.5} readOnly sx={{ color: "#FF643A" }} />
                  <CustomText sx={{ fontSize: { xs: 13, sm: 14, md: 16 }, fontWeight: 600, color: "#333" }}>
                    4.5 <span style={{ fontWeight: 400, color: "#777" }}>/ 5</span>
                  </CustomText>
                  <CustomText sx={{ fontSize: { xs: 11, sm: 12, md: 14 }, color: "#777" }}>(245 Reviews)</CustomText>
                </Box>
              </Box>
              <CustomText variant="body1" autoTitleCase={true} sx={{ color: "#666", lineHeight: 1.8, mb: 3, fontSize: { xs: 12, sm: 13, md: 15, lg: 16 }, }}>
                {productData?.description}
              </CustomText>
              <Divider sx={{ my: 2, backgroundColor: "#F31400" }} />
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, gap: { xs: 2, md: 0 } }}>
                <Box>
                  <CustomText variant="body2" sx={{ fontWeight: 600, color: "#2c2c2c", fontSize: { xs: 13, md: 14 } }}>
                    Weight
                  </CustomText>
                  <Select 
                    value={productWeight} 
                    size="small" 
                    open={selectOpen}
                    onOpen={() => setSelectOpen(true)}
                    onClose={() => setSelectOpen(false)}
                    onChange={(e) => {
                      setProductWeight(e.target.value);
                      setSelectOpen(false);
                    }} 
                    sx={{ width: { xs: "100%", md: 250 }, mt: 1 }}
                    MenuProps={{
                      disablePortal: false,
                      disableScrollLock: true,
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                      },
                      PaperProps: {
                        sx: {
                          maxHeight: 224,
                        },
                      },
                    }}
                  >
                    <MenuItem value={product.weight || "500g"}>{product.weight || "500g"}</MenuItem>
                    <MenuItem value="custom">Custom</MenuItem>
                  </Select>
                  {productWeight === "custom" && (
                    <TextField type="number" label="Enter weight (g)" onBlur={(e) => setProductWeight(e.target.value + "g")} size="small" sx={{ mt: 1, width: { xs: "100%", md: 150 } }} />
                  )}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, backgroundColor: "#9BFF82", borderRadius: 2, p: { xs: 0.8, md: 1 } }}>
                  <CheckCircleIcon sx={{ color: "#4caf50", fontSize: { xs: 18, md: 20 } }} />
                  <CustomText variant="body1" sx={{ fontWeight: 600, color: "#2c2c2c", fontSize: { xs: 13, md: 16 } }}>
                    {productData?.stock} in stock
                  </CustomText>
                </Box>
              </Box>

              <Grid container spacing={{ xs: 1.5, md: 2 }} mt={{ xs: 3, md: 4 }}>
                <Grid size={{ xs: 4, md: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: { xs: 1, md: 2 }, borderRadius: 10, border: "1px solid #2c2c2c", p: { xs: 0.8, md: 1 }, backgroundColor: "#gainsboro" }}>
                    <Box onClick={() => setQuantity(Math.max(1, quantity - 1))} sx={{ cursor: "pointer" }}>
                      <Remove sx={{ color: "#2c2c2c", fontSize: { xs: 18, md: 20 } }} />
                    </Box>
                    <CustomText variant="body2" sx={{ fontWeight: 600, color: "#2c2c2c", fontSize: { xs: 13, md: 14 } }}>
                      {quantity}
                    </CustomText>
                    <Box onClick={() => setQuantity(quantity + 1)} sx={{ cursor: "pointer" }}>
                      <Add sx={{ color: "#2c2c2c", fontSize: { xs: 18, md: 20 } }} />
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, md: 8 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Button
                    type="submit"
                    fullWidth
                    sx={{
                      backgroundColor: "#FF9472",
                      color: "#fff",
                      p: { xs: 0.8, md: 1 },
                      borderRadius: "50px",
                      fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                      fontWeight: 700,
                      textTransform: "none",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: "0 4px 15px rgba(255,148,114,0.3)",
                      "&:hover": {
                        backgroundColor: "#F2709C",
                        transform: "translateY(-3px)",
                        boxShadow: "0 8px 25px rgba(255,148,114,0.5)",
                      },
                      "&:disabled": {
                        backgroundColor: "#ccc",
                        color: "#999",
                      },
                    }}
                  >
                    Add to Cart
                  </Button>
                </Grid>
                <Grid size={{ xs: 2, md: 1 }} sx={{ display: "flex", justifyContent: { xs: "center", md: "end" }, alignItems: { xs: "center", md: "end" } }}>
                  <IconButton aria-label="delete" size={isMobile ? "medium" : "large"} sx={{ backgroundColor: "#edecec", borderRadius: "50px" }}>
                    <FavoriteBorder sx={{ color: "#2c2c2c", fontSize: { xs: 18, md: 20 } }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, mt: { xs: 2, md: 2 }, backgroundColor: "#F0FFF4", p: { xs: 1, md: 1 }, borderRadius: 2, border: "1px solid #B5FFC9" }}>
              <CustomText variant="subtitle1" sx={{ fontSize: { xs: 12, md: 14 }, fontWeight: 600, color: "#00A819", display: "flex", alignItems: "center", gap: 0.5, flexWrap: "wrap", justifyContent: "center" }}>
                <LocalShipping sx={{ fontSize: { xs: 16, md: 18 } }} /> Order within 2hrs for delivery today.
              </CustomText>
            </Box>
          </Grid>
        </Grid>
      </Container>


      <Box sx={{ py: { xs: 4, md: 0 } }}>
        <Grid container spacing={{ xs: 2, md: 3, lg: 2.5 }} justifyContent="center" alignItems="center" sx={{ backgroundColor: "#FFEFEA", height: { xs: "auto", md: "200px" }, px: { xs: 1, md: 2, lg: 1.5 }, py: { xs: 2, md: 0 } }}>
          {features?.map((text, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ backgroundColor: "#FFEFEA", p: { xs: 2, md: 3 }, borderRadius: 3, textAlign: "start", display: "flex", justifyContent: "center", alignItems: "center", gap: { xs: 1.5, md: 2 } }}>
                <Box sx={{ backgroundColor: "#fff", color: "#FF6F61", width: { xs: 50, md: 60 }, height: { xs: 50, md: 60 }, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: { xs: 18, md: 22 } }}>
                  {icons[i]}
                </Box>
                <CustomText fontWeight={600} sx={{ whiteSpace: "pre-line", fontSize: { xs: 12, md: 14 }, color: "#515151", fontWeight: 'bold' }}>
                  {text}
                </CustomText>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 🔶 What's Inside + Nutrition Facts */}
      <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 3, lg: 2 } }}>
        <Grid container spacing={{ xs: 2, md: 2 }} sx={{ px: { xs: 2, md: 3, lg: 2 } }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ p: { xs: 2, md: 3 }, border: "1px solid #ddd", borderRadius: 2 }}>
              <CustomText fontWeight={600} fontSize={{ xs: 16, md: 18 }}>What's Inside</CustomText>
              <CustomText mt={1} autoTitleCase={true} fontSize={{ xs: 13, md: 14 }} color="text.secondary">
                {productData?.ingredient || "Ingredients information not available."}
              </CustomText>
              {product.veg && (
                <Box mt={2} sx={{ p: { xs: 1.5, md: 2 }, background: "#FFF1EE", borderRadius: 2, display: "flex", alignItems: "center", gap: { xs: 1.5, md: 2 }, border: "1px solid #FF643A" }}>
                  <ThumbUpOffAlt sx={{ color: "#FF643A", fontSize: { xs: 18, md: 20 } }} />
                  <Box>
                    <CustomText fontWeight={600} fontSize={{ xs: 13, md: 14 }}>Vegetarian Product</CustomText>
                    <CustomText fontSize={{ xs: 12, md: 13 }}>{product.veg === "Y" ? "This is a vegetarian product." : "Please check ingredients for allergen information."}</CustomText>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ p: { xs: 2, md: 3 }, border: "1px solid #ddd", borderRadius: 2 }}>
              <CustomText fontWeight={600} fontSize={{ xs: 16, md: 18 }} mb={1}>
                Nutrition Facts
              </CustomText>
              <Box fontSize={{ xs: 13, md: 14 }}>
                {productData?.nutrition && Object.keys(productData?.nutrition).length > 0 ? (
                  Object.entries(productData?.nutrition).map(([label, value], index, array) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: { xs: 1, md: 1.2 },
                        borderBottom: index !== array.length - 1 ? "1px solid #eee" : "none"
                      }}
                    >
                      <CustomText fontSize={{ xs: 13, md: 14 }}>{label}</CustomText>
                      <CustomText fontWeight={600} fontSize={{ xs: 13, md: 14 }}>{value}</CustomText>
                    </Box>
                  ))
                ) : (
                  <CustomText fontSize={{ xs: 13, md: 14 }} color="text.secondary">
                    Nutrition information not available.
                  </CustomText>
                )}
              </Box>
              {product.expiryday && (
                <Box mt={2} sx={{ p: { xs: 1.5, md: 2 }, background: "#F8F8F8", borderRadius: 2, border: "1px solid #D5D5D5" }}>
                  <CustomText fontWeight={600} fontSize={{ xs: 13, md: 14 }}>Storage Instructions</CustomText>
                  <CustomText fontSize={{ xs: 12, md: 13 }}>
                    Best consumed within {product.expiryday} days. Keep in a cool dry place.
                  </CustomText>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Rating Section */}
        <Box mt={{ xs: 4, md: 6 }} sx={{ px: { xs: 2, md: 3, lg: 2 } }}>
          <CustomText fontSize={{ xs: 20, sm: 24, md: 28, lg: 34 }} fontWeight={700}>4.5 ⭐</CustomText>
          <CustomText fontSize={{ xs: 11, sm: 12, md: 13, lg: 14 }} color="text.secondary">120 reviews</CustomText>

          {/* Rating Bars */}
          {[5, 4, 3, 2, 1].map((r, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 }, my: 0.5 }}>
              <CustomText width={{ xs: 18, md: 20 }} fontSize={{ xs: 13, md: 14 }}>{r}</CustomText>
              <Box sx={{ flex: 1, height: { xs: 6, md: 8 }, background: "#FFE1DA", borderRadius: 4, position: 'relative' }}>
                <Box sx={{
                  height: "100%",
                  width: `${[40, 20, 19, 10, 7][i]}%`,
                  bgcolor: "#FF6F61",
                  borderRadius: 4
                }} />
              </Box>
              <CustomText fontSize={{ xs: 12, md: 14 }}>{[40, 20, 19, 10, 7][i]}%</CustomText>
            </Box>
          ))}
        </Box>

        {/* Reviews */}
        <Box mt={{ xs: 3, md: 4 }} sx={{ mb: 5, px: { xs: 2, md: 3, lg: 2 } }}>
          {[{
            name: "Sophia Carter", time: "2 weeks ago",
            text: "These chocolate muffins are absolutely divine! Perfect balance of sweetness and rich chocolate flavor."
          }, {
            name: "Ethan Bennett", time: "1 month ago",
            text: "Good taste, a little too sweet for me. Texture is soft and moist overall decent treat."
          }].map((review, i) => (
            <Box key={i} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, backgroundColor: "#FCF7FA", mt: 2 }}>
              <Box display="flex" gap={{ xs: 1.5, md: 2 }} alignItems="center">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: { xs: 36, md: 40 }, height: { xs: 36, md: 40 } }} />
                <Box>
                  <CustomText fontWeight={600} fontSize={{ xs: 14, md: 16 }}>{review.name}</CustomText>
                  <CustomText fontSize={{ xs: 11, md: 12 }} color="text.secondary">{review.time}</CustomText>
                </Box>
              </Box>
              <Rating value={5 - i} readOnly size="small" sx={{ mt: 1 }} />
              <CustomText mt={1} fontSize={{ xs: 13, md: 14 }}>{review.text}</CustomText>
              <Box sx={{ display: "flex", gap: { xs: 2, md: 3 }, mt: 2, color: "#707070" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: .5, cursor: "pointer" }}>
                  <ThumbUpOffAlt sx={{ fontSize: { xs: 16, md: 18 } }} />
                  <CustomText fontSize={{ xs: 12, md: 13 }}>12</CustomText>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: .5, cursor: "pointer" }}>
                  <ThumbDownOffAlt sx={{ fontSize: { xs: 16, md: 18 } }} />
                  <CustomText fontSize={{ xs: 12, md: 13 }}>3</CustomText>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Explore More */}
        <CustomText className="title-style" sx={{ textAlign: "center", mt: { xs: 3, md: 5 }, mb: { xs: 2, md: 4 }, fontSize: { xs: 18, sm: 22, md: 26, lg: 28 }, fontWeight: 'bold', fontFamily: "var(--fontFamily)" }}>Explore More</CustomText>
        <Box sx={{ width: "100%", borderBottom: "1px solid #e5e5e5", overflowX: { xs: "auto", md: "visible" } }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            centered={!isMobile}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons="auto"
            TabIndicatorProps={{
              sx: {
                backgroundColor: "#C22A00",
                height: 10,
                borderTopRightRadius: "10px",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }
            }}
            sx={{
              "& .MuiTab-root": {
                fontSize: { xs: 14, md: 18 },
                textTransform: "capitalize",
                fontWeight: 500,
                mx: { xs: 1, md: 2 },
                minWidth: { xs: "auto", md: "auto" },
                px: { xs: 1.5, md: 2 }
              },
              "& .Mui-selected": { color: "#FF643A", fontWeight: 700 }
            }}
          >
            {["Cake", "Muffins", "Croissant", "Bread", "Tart", "Favorite"].map((item) => (
              <Tab key={item} label={item} value={item.toLowerCase()} />
            ))}
          </Tabs>
        </Box>
        <Grid container spacing={{ xs: 2, md: 3 }} mt={{ xs: 3, md: 4 }} sx={{ mb: 5, px: { xs: 2, md: 3, lg: 2 } }} >
          {images?.map((img, i) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={i}>
              <Box
                component="img"
                src={img}
                loading="lazy"
                sx={{
                  width: "100%",
                  height: { xs: 180, sm: 200, md: 230 },
                  objectFit: "cover",
                  borderRadius: 3,
                  transition: "0.3s",
                  cursor: "pointer",
                  "&:hover": { transform: "scale(1.03)" }
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

