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
} from "@mui/material";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  CheckCircle as CheckCircleIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const ProductDetails = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [message, setMessage] = useState("");

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

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", py: { xs: 4, md: 6 }, pb: { xs: 12, md: 16 } }}>
      <Container maxWidth="xl">
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link component="button" variant="body1" onClick={() => navigate("/products")} sx={{ color: "#666", textDecoration: "none", cursor: "pointer", "&:hover": { color: "#FF9472", }, }}>
            Products
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={2}>
          <Grid size={6}>
            <Box sx={{ display: "flex", gap: 2 }}>
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
                <Box sx={{ width: "100%", aspectRatio: "1", borderRadius: 2, overflow: "hidden", mb: 2, }}>
                  <Box component="img" src={product.images[selectedImage]} alt={product.name} sx={{ width: "100%", height: "100%", objectFit: "cover", }} />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, backgroundColor: "#e8f5e9", borderRadius: 2, p: 2, }}>
                  <CheckCircleIcon sx={{ color: "#4caf50", fontSize: 24 }} />
                  <Typography variant="body1" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                    {product.stock} in stock
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid size={6}>
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
                  <Rating
                    value={4.5}
                    precision={0.5}
                    readOnly
                    sx={{ color: "#FF643A" }}  // star color
                  />
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

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, backgroundColor: "#e8f5e9", borderRadius: 2, p: 2, }}>
                  <CheckCircleIcon sx={{ color: "#4caf50", fontSize: 24 }} />
                  <Typography variant="body1" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                    {product.stock} in stock
                  </Typography>
                </Box>
            </Box>
          </Grid>
        </Grid>

      
      </Container>
    </Box>
  );
};

