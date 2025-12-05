import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Chip,
} from "@mui/material";
import {
  Search as SearchIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const ProductList = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "Cakes",
    "Breads",
    "Pastries",
    "Cookies",
    "Donuts",
    "Muffins",
    "Product",
    "Product",
    "Product",
    "Product",
  ];

  const products = Array(10).fill(null).map((_, index) => ({
    id: index + 1,
    name: "Chocolate Muffin",
    description: "Rich chocolate flavor",
    price: "$25.00",
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=400&fit=crop",
  }));

  const recommendedProducts = [
    {
      id: 1,
      name: "Blueberry Cake",
      description: "Sweet blueberry delight",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Cinnamon Roll",
      description: "Warm cinnamon spice",
      image: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Lemon Tart",
      description: "Tangy lemon filling",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      name: "Lemon Tart",
      description: "Tangy lemon filling",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop",
    },
    {
      id: 5,
      name: "Lemon Tart",
      description: "Tangy lemon filling",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", py: { xs: 4, md: 6 }, pb: { xs: 12, md: 16 } }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: 24, md: 32 },
              fontWeight: 700,
              color: "#2c2c2c",
            }}
          >
            Categories
          </Typography>
          <TextField
            placeholder="Search for products"
            value={searchQuery}
            size="small"
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#666" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: { xs: "100%", sm: 300 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#f5f5f5",
              },
            }}
          />
        </Box>

        {/* Category Tabs */}
        <Box sx={{ mb: 5, borderColor: "divider", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Tabs
            value={selectedCategory}
            onChange={(e, newValue) => setSelectedCategory(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: { xs: 13, md: 14 },
                fontWeight: 600,
                color: "#666",
                minHeight: 40,
                borderRadius: "6px",
                px: 2.5,
                mx: 0.8,
                border: "1px solid #ddd",
                backgroundColor: "#F5F0F2",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#ffe9e1",
                  borderColor: "#FF643A",
                },
                "&.Mui-selected": {
                  color: "#fff",
                  backgroundColor: "#FF643A",
                  borderColor: "#FF9472",
                },
              },
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            {categories.map((category, index) => (
              <Tab key={index} label={category} />
            ))}
          </Tabs>

        </Box>

        {/* Product Grid */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",   // center align cards
            gap: 3,                     // spacing between cards
            mb: 6,
          }}
        >
          {products.map((product) => (
            <Box
              key={product.id}
              sx={{
                width: { xs: "46%", sm: "30%", md: "22%", lg: "18%" },
                minWidth: "200px",    
              }}
            >
              <Card
                elevation={0}
                onClick={() => navigate(`/products/${product.id}`)}
                sx={{
                  borderRadius: 2,
                  transition: "0.3s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardMedia component="img" height="200" image={product.image} alt={product.name} />
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c", mb: 0.5, fontSize: { xs: 14, md: 16 } }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666", mb: 1, fontSize: { xs: 12, md: 13 } }}>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#FF9472", fontSize: { xs: 16, md: 18 }, textAlign: "right" }}>
                    {product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>


        {/* Promotional Banner */}
        <Box
          sx={{
            backgroundImage: "url('https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=300&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 3,
            p: { xs: 4, md: 6 },
            mb: 6,
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.3)",
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <Typography variant="h3" sx={{ fontSize: { xs: 32, md: 48 }, fontWeight: 700, color: "#fff", mb: 2, }}>
              20% Off Your First Order
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: 14, md: 16 }, color: "#fff", mb: 4, opacity: 0.9, }}>
              Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibenjgg.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FF9472",
                color: "#fff",
                textTransform: "none",
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: { xs: 14, md: 16 },
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#F2709C",
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>

        {/* Recommended Products Section */}
        <Box>
          <Typography variant="h4" sx={{ fontSize: { xs: 24, md: 32 }, fontWeight: 700, color: "#2c2c2c", mb: 4, }}>
            Recommended Products
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              overflowX: "auto",
              pb: 2,
              "&::-webkit-scrollbar": {
                height: 8,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f5f5f5",
                borderRadius: 4,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#FF9472",
                borderRadius: 4,
              },
            }}
          >
            {recommendedProducts.map((product) => (
              <Card
                key={product.id}
                sx={{
                  minWidth: { xs: 200, sm: 250 },
                  borderRadius: 2,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ p: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#2c2c2c",
                      mb: 0.5,
                      fontSize: { xs: 14, md: 16 },
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: { xs: 12, md: 13 },
                    }}
                  >
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

