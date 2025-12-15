import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  Chip,
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
} from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";

export const ProductDetails = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedImage, setSelectedImage] = useState(0);
  const [tab, setTab] = useState("cake");

  const product = {
    name: "Chocolate Muffin",
    description:
      "Break open sweetness with our Red Velvet Hammer Pinata Cake – 500 g of creamy, romantic indulgence hidden inside a smashable chocolate dome.",
    price: "$3.50",
    weight: "500g",
    stock: 235,
    images: [
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&h=600&fit=crop",
    ],
  };

  const icons = [<LocalGroceryStore />, <Handshake />, <Shield />, <Verified />];
  const features = [
    "100% Organic Flour\nLocally sourced",
    "Handmade Daily\nBaked fresh at 4 AM",
    "No Preservatives\nClean ingredients",
    "Quality Guarantee\nTaste the difference"
  ];

  const images = [
    "https://picsum.photos/id/1040/300/200",
    "https://picsum.photos/id/1060/300/200",
    "https://picsum.photos/id/1080/300/200",
    "https://picsum.photos/id/109/300/200",
    "https://picsum.photos/id/120/300/200",
    "https://picsum.photos/id/121/300/200",
    "https://picsum.photos/id/122/300/200",
    "https://picsum.photos/id/123/300/200"
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", py: { xs: 4, md: 0 }, pb: { xs: 12, md: 0 }, p: { xs: 1.25, md: 0 } }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link component="button" variant="body1" onClick={() => navigate("/products")} sx={{ color: "#666", textDecoration: "none", cursor: "pointer", "&:hover": { color: "#FF9472", }, }}>
            Products
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", gap: { xs: 1, md: 2 } }}>
              <Box sx={{ display: { xs: "none", md: "flex" }, flexDirection: "column", gap: 1 }}>
                {product.images.map((image, index) => (
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
                    <Box component="img" src={image} alt={`${product.name} ${index + 1}`} sx={{ width: "100%", height: "100%", objectFit: "cover", }} />
                  </Box>
                ))}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ width: "100%", height: { xs: 300, sm: 350, md: 450 }, borderRadius: 2, overflow: "hidden", mb: 2 }}>
                  <Box component="img" src={product.images[selectedImage]} alt={product.name} sx={{ width: "100%", height: "100%", objectFit: "cover", }} />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 36 }, fontWeight: 700, color: "#2c2c2c", mb: 2, }}>
                {product.name}
              </Typography>
              <Typography variant="h4" sx={{ fontSize: { xs: 28, md: 36 }, fontWeight: 700, color: "#F31400", mb: 2, display: "flex", alignItems: "center" }}>
                {product.price} / <Typography variant="body1" sx={{ fontSize: '13px', fontWeight: 600, color: "#2c2c2c", }}>
                  {product.weight}
                </Typography>
              </Typography>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating value={4.5} precision={0.5} readOnly sx={{ color: "#FF643A" }} />
                  <Typography sx={{ fontSize: 16, fontWeight: 600, color: "#333" }}>
                    4.5 <span style={{ fontWeight: 400, color: "#777" }}>/ 5</span>
                  </Typography>
                  <Typography sx={{ color: "#777" }}>(245 Reviews)</Typography>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.8, mb: 3, fontSize: { xs: 14, md: 16 }, }}>
                {product.description}
              </Typography>
              <Divider sx={{ my: 2, backgroundColor: "#F31400" }} />
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, gap: { xs: 2, md: 0 } }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "#2c2c2c", fontSize: { xs: 13, md: 14 } }}>
                    Weight
                  </Typography>
                  <Select value={product.weight} size="small" onChange={(e) => setProductWeight(e.target.value)} sx={{ width: { xs: "100%", md: 250 }, mt: 1 }}>
                    <MenuItem value="500g">Regular (500g)</MenuItem>
                    <MenuItem value="1000g">Medium (1kg)</MenuItem>
                    <MenuItem value="2000g">Large (2kg)</MenuItem>
                    <MenuItem value="3000g">Party Pack (3kg)</MenuItem>
                    <MenuItem value="custom">Custom</MenuItem>
                  </Select>
                  {product.weight === "custom" && (
                    <TextField type="number" label="Enter weight (g)" onBlur={(e) => setProductWeight(e.target.value + "g")} size="small" sx={{ mt: 1, width: { xs: "100%", md: 150 } }} />
                  )}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, backgroundColor: "#9BFF82", borderRadius: 2, p: { xs: 0.8, md: 1 } }}>
                  <CheckCircleIcon sx={{ color: "#4caf50", fontSize: { xs: 18, md: 20 } }} />
                  <Typography variant="body1" sx={{ fontWeight: 600, color: "#2c2c2c", fontSize: { xs: 13, md: 16 } }}>
                    {product.stock} in stock
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={{ xs: 1.5, md: 2 }} mt={{ xs: 3, md: 4 }}>
                <Grid size={{ xs: 4, md: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: { xs: 1, md: 2 }, borderRadius: 10, border: "1px solid #2c2c2c", p: { xs: 0.8, md: 1 }, backgroundColor: "#gainsboro" }}>
                    <Box>
                      <Add sx={{ color: "#2c2c2c", fontSize: { xs: 18, md: 20 } }} />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#2c2c2c", fontSize: { xs: 13, md: 14 } }}>
                      1
                    </Typography>
                    <Box>
                      <Remove sx={{ color: "#2c2c2c", fontSize: { xs: 18, md: 20 } }} />
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
                      fontSize: { xs: 14, md: 18 },
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
              <Typography variant="subtitle1" sx={{ fontSize: { xs: 12, md: 14 }, fontWeight: 600, color: "#00A819", display: "flex", alignItems: "center", gap: 0.5, flexWrap: "wrap", justifyContent: "center" }}>
                <LocalShipping sx={{ fontSize: { xs: 16, md: 18 } }} /> Order within 2hrs for delivery today.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>


      <Box sx={{ py: { xs: 4, md: 0 } }}>
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center" alignItems="center" sx={{ backgroundColor: "#FFEFEA", height: { xs: "auto", md: "200px" }, px: { xs: 1, md: 2 }, py: { xs: 2, md: 0 } }}>
          {features?.map((text, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ backgroundColor: "#FFEFEA", p: { xs: 2, md: 3 }, borderRadius: 3, textAlign: "start", display: "flex", justifyContent: "center", alignItems: "center", gap: { xs: 1.5, md: 2 } }}>
                <Box sx={{ backgroundColor: "#fff", color: "#FF6F61", width: { xs: 50, md: 60 }, height: { xs: 50, md: 60 }, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: { xs: 18, md: 22 } }}>
                  {icons[i]}
                </Box>
                <Typography fontWeight={600} sx={{ whiteSpace: "pre-line", fontSize: { xs: 12, md: 14 }, color: "#515151", fontWeight: 'bold' }}>
                  {text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 🔶 What's Inside + Nutrition Facts */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={{ xs: 2, md: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ p: { xs: 2, md: 3 }, border: "1px solid #ddd", borderRadius: 2 }}>
              <Typography fontWeight={600} fontSize={{ xs: 16, md: 18 }}>What's Inside</Typography>
              <Typography mt={1} fontSize={{ xs: 13, md: 14 }} color="text.secondary">
                We use only the finest ingredients sourced from trusted local farmers and premium importers.
                Premium Type 55 French Wheat Flour, Normandy Butter (82% fat), Belgian Dark Chocolate (54.5%),
                Free-range Eggs, Fresh Whole Milk, Cane Sugar, Sea Salt, Yeast.
              </Typography>
              <Box mt={2} sx={{ p: { xs: 1.5, md: 2 }, background: "#FFF1EE", borderRadius: 2, display: "flex", alignItems: "center", gap: { xs: 1.5, md: 2 }, border: "1px solid #FF643A" }}>
                <ThumbUpOffAlt sx={{ color: "#FF643A", fontSize: { xs: 18, md: 20 } }} />
                <Box>
                  <Typography fontWeight={600} fontSize={{ xs: 13, md: 14 }}>Allergen Information</Typography>
                  <Typography fontSize={{ xs: 12, md: 13 }}>Contains: Wheat, Gluten, Milk, Eggs, Soy.</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ p: { xs: 2, md: 3 }, border: "1px solid #ddd", borderRadius: 2 }}>
              <Typography fontWeight={600} fontSize={{ xs: 16, md: 18 }} mb={1}>
                Nutrition Facts
              </Typography>
              <Box fontSize={{ xs: 13, md: 14 }}>
                {[
                  { label: "Calories", value: "320 kcal" },
                  { label: "Fat", value: "19g" },
                  { label: "Carbohydrates", value: "35g" },
                  { label: "Protein", value: "4g" },
                  { label: "Sugar", value: "12g" }
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      py: { xs: 1, md: 1.2 },
                      borderBottom: index !== 4 ? "1px solid #eee" : "none"
                    }}
                  >
                    <Typography fontSize={{ xs: 13, md: 14 }}>{item.label}</Typography>
                    <Typography fontWeight={600} fontSize={{ xs: 13, md: 14 }}>{item.value}</Typography>
                  </Box>
                ))}
              </Box>
              <Box mt={2} sx={{ p: { xs: 1.5, md: 2 }, background: "#F8F8F8", borderRadius: 2, border: "1px solid #D5D5D5" }}>
                <Typography fontWeight={600} fontSize={{ xs: 13, md: 14 }}>Storage Instructions</Typography>
                <Typography fontSize={{ xs: 12, md: 13 }}>
                  Keep in a cool dry place. Consume within 24 hours.
                  Can be rewarmed in an oven for 2 mins at 180°C.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Rating Section */}
        <Box mt={{ xs: 4, md: 6 }}>
          <Typography fontSize={{ xs: 24, md: 34 }} fontWeight={700}>4.5 ⭐</Typography>
          <Typography fontSize={{ xs: 13, md: 14 }} color="text.secondary">120 reviews</Typography>

          {/* Rating Bars */}
          {[5, 4, 3, 2, 1].map((r, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 }, my: 0.5 }}>
              <Typography width={{ xs: 18, md: 20 }} fontSize={{ xs: 13, md: 14 }}>{r}</Typography>
              <Box sx={{ flex: 1, height: { xs: 6, md: 8 }, background: "#FFE1DA", borderRadius: 4, position: 'relative' }}>
                <Box sx={{
                  height: "100%",
                  width: `${[40, 20, 19, 10, 7][i]}%`,
                  bgcolor: "#FF6F61",
                  borderRadius: 4
                }} />
              </Box>
              <Typography fontSize={{ xs: 12, md: 14 }}>{[40, 20, 19, 10, 7][i]}%</Typography>
            </Box>
          ))}
        </Box>

        {/* Reviews */}
        <Box mt={{ xs: 3, md: 4 }}>
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
                  <Typography fontWeight={600} fontSize={{ xs: 14, md: 16 }}>{review.name}</Typography>
                  <Typography fontSize={{ xs: 11, md: 12 }} color="text.secondary">{review.time}</Typography>
                </Box>
              </Box>
              <Rating value={5 - i} readOnly size="small" sx={{ mt: 1 }} />
              <Typography mt={1} fontSize={{ xs: 13, md: 14 }}>{review.text}</Typography>
              <Box sx={{ display: "flex", gap: { xs: 2, md: 3 }, mt: 2, color: "#707070" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: .5, cursor: "pointer" }}>
                  <ThumbUpOffAlt sx={{ fontSize: { xs: 16, md: 18 } }} />
                  <Typography fontSize={{ xs: 12, md: 13 }}>12</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: .5, cursor: "pointer" }}>
                  <ThumbDownOffAlt sx={{ fontSize: { xs: 16, md: 18 } }} />
                  <Typography fontSize={{ xs: 12, md: 13 }}>3</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Explore More */}
        <Typography className="title-style" sx={{ textAlign: "center", mt: { xs: 3, md: 5 }, mb: { xs: 2, md: 4 }, fontSize: { xs: 20, md: 28 }, fontWeight: 'bold', fontFamily: "var(--fontFamily)" }}>Explore More</Typography>
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
        <Grid container spacing={{ xs: 2, md: 3 }} mt={{ xs: 3, md: 4 }}>
          {images.map((img, i) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={i}>
              <Box
                component="img"
                src={img}
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

