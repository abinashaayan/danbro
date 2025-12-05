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
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            component="button"
            variant="body1"
            onClick={() => navigate("/products")}
            sx={{
              color: "#666",
              textDecoration: "none",
              cursor: "pointer",
              "&:hover": {
                color: "#FF9472",
              },
            }}
          >
            Products
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* Left Side - Product Images */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", gap: 2 }}>
              {/* Thumbnails */}
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
                    <Box
                      component="img"
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                ))}
              </Box>

              {/* Main Image */}
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: 2,
                    overflow: "hidden",
                    mb: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={product.images[selectedImage]}
                    alt={product.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                {/* Stock Information */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: "#e8f5e9",
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <CheckCircleIcon sx={{ color: "#4caf50", fontSize: 24 }} />
                  <Typography variant="body1" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                    {product.stock} in stock
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Right Side - Product Information */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: 28, md: 36 },
                fontWeight: 700,
                color: "#2c2c2c",
                mb: 2,
              }}
            >
              {product.name}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#666",
                lineHeight: 1.8,
                mb: 3,
                fontSize: { xs: 14, md: 16 },
              }}
            >
              {product.description}
            </Typography>

            {/* Price */}
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: 28, md: 36 },
                fontWeight: 700,
                color: "#FF9472",
                mb: 4,
              }}
            >
              {product.price} / {product.weight}
            </Typography>

            {/* Delivery Check Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#2c2c2c",
                  mb: 2,
                  fontSize: { xs: 16, md: 18 },
                }}
              >
                Check Delivery First
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  placeholder="Enter your Area Pin Code"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FF9472",
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: 2,
                    px: 4,
                    minWidth: 120,
                    "&:hover": {
                      backgroundColor: "#F2709C",
                    },
                  }}
                >
                  Check
                </Button>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                sx={{
                  backgroundColor: "#FFB5A1",
                  color: "#000",
                  textTransform: "none",
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: 14, md: 16 },
                  fontWeight: 600,
                  flex: 1,
                  minWidth: { xs: "100%", sm: 200 },
                  "&:hover": {
                    backgroundColor: "#FF9472",
                    color: "#fff",
                  },
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                onClick={() => setIsFavorite(!isFavorite)}
                sx={{
                  borderColor: "#FFB5A1",
                  color: isFavorite ? "#FF9472" : "#666",
                  textTransform: "none",
                  borderRadius: 2,
                  px: 3,
                  py: 1.5,
                  minWidth: { xs: "100%", sm: 120 },
                  "&:hover": {
                    borderColor: "#FF9472",
                    backgroundColor: "#FFF8F2",
                  },
                }}
              >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </Button>
            </Box>

            {/* Message on Cake Section */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#2c2c2c",
                  mb: 2,
                  fontSize: { xs: 16, md: 18 },
                }}
              >
                Message on Cake *
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  fullWidth
                  multiline
                  rows={3}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FF9472",
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: 2,
                    px: 4,
                    minWidth: 120,
                    alignSelf: "flex-start",
                    "&:hover": {
                      backgroundColor: "#F2709C",
                    },
                  }}
                >
                  Check
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

