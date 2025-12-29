import { useState, useEffect, useRef } from "react";
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
  IconButton,
} from "@mui/material";
import {
  Search as SearchIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart,
  FavoriteBorder,
  ShareOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Rectangle45 from "../../assets/Rectangle45.png";
import Slider from "react-slick";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

export const ProductList = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const productRef = useRef(null);

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

  // Category-wise products
  const allProducts = {
    Cakes: [
      { id: 1, name: "Chocolate Cake", description: "Rich chocolate flavor", price: "$35.00", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
      { id: 2, name: "Vanilla Cake", description: "Classic vanilla taste", price: "$30.00", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop" },
      { id: 3, name: "Red Velvet Cake", description: "Velvety smooth texture", price: "$40.00", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop" },
      { id: 4, name: "Strawberry Cake", description: "Fresh strawberry delight", price: "$32.00", image: "https://images.unsplash.com/photo-1606312619070-d48d4ecc3b16?w=400&h=400&fit=crop" },
      { id: 5, name: "Blueberry Cake", description: "Sweet blueberry delight", price: "$38.00", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop" },
    ],
    Breads: [
      { id: 6, name: "White Bread", description: "Fresh baked daily", price: "$5.00", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop" },
      { id: 7, name: "Whole Wheat Bread", description: "Healthy and nutritious", price: "$6.00", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=400&fit=crop" },
      { id: 8, name: "Garlic Bread", description: "Aromatic garlic flavor", price: "$7.00", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop" },
      { id: 9, name: "Multigrain Bread", description: "Power-packed grains", price: "$8.00", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=400&fit=crop" },
    ],
    Pastries: [
      { id: 10, name: "Apple Pastry", description: "Sweet apple filling", price: "$12.00", image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop" },
      { id: 11, name: "Chocolate Pastry", description: "Decadent chocolate", price: "$15.00", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop" },
      { id: 12, name: "Cream Pastry", description: "Creamy and smooth", price: "$13.00", image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop" },
    ],
    Cookies: [
      { id: 13, name: "Chocolate Chip Cookie", description: "Classic favorite", price: "$8.00", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop" },
      { id: 14, name: "Oatmeal Cookie", description: "Healthy and tasty", price: "$9.00", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop" },
      { id: 15, name: "Sugar Cookie", description: "Sweet and simple", price: "$7.00", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop" },
    ],
    Donuts: [
      { id: 16, name: "Glazed Donut", description: "Sweet glaze coating", price: "$4.00", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop" },
      { id: 17, name: "Chocolate Donut", description: "Rich chocolate", price: "$5.00", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop" },
      { id: 18, name: "Sprinkled Donut", description: "Colorful sprinkles", price: "$4.50", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop" },
    ],
    Muffins: [
      { id: 19, name: "Chocolate Muffin", description: "Rich chocolate flavor", price: "$25.00", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=400&fit=crop" },
      { id: 20, name: "Blueberry Muffin", description: "Fresh blueberries", price: "$22.00", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=400&fit=crop" },
      { id: 21, name: "Banana Muffin", description: "Ripe banana taste", price: "$20.00", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=400&fit=crop" },
    ],
    Product: [
      { id: 22, name: "Chocolate Muffin", description: "Rich chocolate flavor", price: "$25.00", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=400&fit=crop" },
      { id: 23, name: "Chocolate Muffin", description: "Rich chocolate flavor", price: "$25.00", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=400&fit=crop" },
      { id: 24, name: "Chocolate Muffin", description: "Rich chocolate flavor", price: "$25.00", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=400&fit=crop" },
    ],
  };

  // Get products for selected category
  const getFilteredProducts = () => {
    const categoryName = categories[selectedCategory];
    let categoryProducts = allProducts[categoryName] || allProducts.Muffins;

    // Apply search filter
    if (searchQuery) {
      categoryProducts = categoryProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return categoryProducts;
  };

  const products = getFilteredProducts();

  // Animation on mount and category change
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

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
    {
      id: 5,
      name: "Lemon Tart",
      description: "Tangy lemon filling",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop",
    },
  ];

  const NextArrow = ({ onClick }) => (
    <Box
      onClick={onClick}
      sx={{
        position: "absolute",
        right: { xs: "5px", sm: "5px", md: "-10px" },
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        backgroundColor: "#fff",
        width: { xs: 32, sm: 36, md: 38 },
        height: { xs: 32, sm: 36, md: 38 },
        borderRadius: "50%",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        display: { xs: "flex", md: "flex" },
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        "&:hover": { backgroundColor: "#FF643A", color: "#fff" },
      }}
    >
      <ArrowForwardIos sx={{ fontSize: { xs: 16, sm: 17, md: 18 } }} />
    </Box>
  );

  const PrevArrow = ({ onClick }) => (
    <Box
      onClick={onClick}
      sx={{
        position: "absolute",
        left: { xs: "5px", sm: "5px", md: "-10px" },
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        backgroundColor: "#fff",
        width: { xs: 32, sm: 36, md: 38 },
        height: { xs: 32, sm: 36, md: 38 },
        borderRadius: "50%",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        display: { xs: "flex", md: "flex" },
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        "&:hover": { backgroundColor: "#FF643A", color: "#fff" },
      }}
    >
      <ArrowBackIosNew sx={{ fontSize: { xs: 16, sm: 17, md: 18 } }} />
    </Box>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 900, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 400, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };


  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", py: { xs: 3, md: 0 }, pb: { xs: 8, md: 0 }, p: { xs: 1.25, md: 0 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 }, py: 4 }}>
        <Box
          sx={{
            mb: { xs: 3, md: 4 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: { xs: 1.5, md: 2 },
            animation: "fadeInDown 0.8s ease-out",
            "@keyframes fadeInDown": {
              "0%": {
                opacity: 0,
                transform: "translateY(-20px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          <Typography variant="h4" sx={{ fontSize: { xs: 22, sm: 24, md: 32 }, fontWeight: 700, color: "#2c2c2c", transition: "color 0.3s ease", }}>
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
                  <SearchIcon sx={{ color: "#666", transition: "color 0.3s ease" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: { xs: "100%", sm: 280, md: 300 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#f5f5f5",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                },
                "&.Mui-focused": {
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 12px rgba(255,100,58,0.2)",
                },
              },
            }}
          />
        </Box>
        <Box
          sx={{
            mb: { xs: 3, md: 5 },
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflowX: "auto",
            px: { xs: 1, md: 0 },
            "&::-webkit-scrollbar": {
              height: 6,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f5f5f5",
              borderRadius: 3,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#FF643A",
              borderRadius: 3,
            },
          }}
        >
          <Tabs
            value={selectedCategory}
            onChange={(e, newValue) => setSelectedCategory(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: { xs: 12, sm: 13, md: 14 },
                fontWeight: 600,
                color: "#666",
                minHeight: { xs: 36, sm: 40 },
                borderRadius: "6px",
                px: { xs: 2, sm: 2.5 },
                mx: { xs: 0.5, sm: 0.8 },
                border: "1px solid #ddd",
                backgroundColor: "#F5F0F2",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,100,58,0.2), transparent)",
                  transition: "left 0.5s ease",
                },
                "&:hover": {
                  backgroundColor: "#ffe9e1",
                  borderColor: "#FF643A",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(255,100,58,0.2)",
                  "&::before": {
                    left: "100%",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  backgroundColor: "#FF643A",
                  borderColor: "#FF9472",
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 12px rgba(255,100,58,0.3)",
                  animation: "pulse 2s ease-in-out infinite",
                  "@keyframes pulse": {
                    "0%, 100%": {
                      boxShadow: "0 4px 12px rgba(255,100,58,0.3)",
                    },
                    "50%": {
                      boxShadow: "0 6px 20px rgba(255,100,58,0.5)",
                    },
                  },
                },
              },
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            {categories?.map((category, index) => (
              <Tab
                key={index}
                label={category}
                sx={{
                  animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                  "@keyframes slideIn": {
                    "0%": {
                      opacity: 0,
                      transform: "translateX(-20px)",
                    },
                    "100%": {
                      opacity: 1,
                      transform: "translateX(0)",
                    },
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
        <Box
          ref={productRef}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: "center", sm: "flex-start" },
            gap: { xs: 1.5, sm: 2, md: 3 },
            mb: { xs: 4, md: 6 },
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.6s ease-in-out",
          }}
        >
          {products?.length > 0 ? (
            products.map((product, index) => (
              <Box
                key={product.id}
                sx={{
                  width: {
                    xs: "calc(50% - 6px)",
                    sm: "calc(33.333% - 13.33px)",
                    md: "calc(25% - 18px)",
                    lg: "calc(20% - 19.2px)",
                  },
                  minWidth: { xs: "140px", sm: "160px", md: "200px" },
                  maxWidth: { xs: "none", md: "280px" },
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
                  onClick={() => navigate(`/products/${product.id}`)}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",

                    /* GREEN DOT */
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

                    /* Hover Icons visible on hover */
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
                  {/* GREEN DOT */}
                  <Box className="green-dot" />

                  <Box
                    sx={{
                      position: "relative",
                      overflow: "hidden",
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
                      image={product.image}
                      alt={product.name}
                      sx={{
                        height: { xs: 160, sm: 180, md: 200 },
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    />

                    {/* HOVER BAR ICONS */}
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
                      <IconButton size="small">
                        <ShoppingCart sx={{ fontSize: 18 }} />
                      </IconButton>
                      <IconButton size="small">
                        <ShareOutlined sx={{ fontSize: 18 }} />
                      </IconButton>
                      <IconButton size="small">
                        <FavoriteBorder sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  </Box>
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#2c2c2c",
                        mb: 0.5,
                        fontSize: { xs: 13, sm: 14, md: 16 },
                        lineHeight: 1.3,
                        transition: "color 0.3s ease",
                        "&:hover": {
                          color: "#FF643A",
                        },
                      }}
                    >
                      {product?.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        mb: 1,
                        fontSize: { xs: 11, sm: 12, md: 13 },
                        lineHeight: 1.4,
                      }}
                    >
                      {product?.description}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#000",
                        fontSize: { xs: 14, sm: 16, md: 18 },
                        textAlign: "right",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      {product?.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))
          ) : (
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                py: 8,
                animation: "fadeIn 0.6s ease-out",
                "@keyframes fadeIn": {
                  "0%": { opacity: 0 },
                  "100%": { opacity: 1 },
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#999",
                  fontSize: { xs: 16, md: 20 },
                }}
              >
                No products found
              </Typography>
            </Box>
          )}
        </Box>
      </Container>

      {/* Promotional Banner */}
      <Container maxWidth="false" sx={{ px: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            backgroundImage: `url(${Rectangle45})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: { xs: "8px", md: "12px" },
            height: { xs: 250, sm: 320, md: 420 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: { xs: 4, md: 6 },
            position: "relative",
            overflow: "hidden",
          animation: "fadeInScale 1s ease-out",
          "@keyframes fadeInScale": {
            "0%": {
              opacity: 0,
              transform: "scale(0.95)",
            },
            "100%": {
              opacity: 1,
              transform: "scale(1)",
            },
          },
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(1px)",
            zIndex: 1,
          },
          "&:hover": {
            "&::after": {
              backdropFilter: "blur(2px)",
            },
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: "480px", px: 2, }}>
          <Typography
            sx={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: { xs: 24, sm: 32, md: 42 },
              fontWeight: 700,
              color: "#8B3D22",
              mb: 1,
              lineHeight: 1.3,
            }}
          >
            20% Off Your <br /> First Order
          </Typography>

          <Typography
            sx={{
              fontFamily: `'Inter', sans-serif`,
              fontStyle: "italic",
              fontSize: { xs: 14, sm: 16, md: 18 },
              color: "#5D5D5D",
              mb: 3,
              maxWidth: 380,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum justo.
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF643A",
              color: "#fff",
              textTransform: "none",
              px: 5,
              py: 1.4,
              borderRadius: "30px",
              fontSize: { xs: 14, sm: 15, md: 16 },
              fontWeight: 600,
              boxShadow: "0 6px 18px rgba(255,100,58,0.35)",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#ff5323",
                boxShadow: "0 8px 22px rgba(255,100,58,0.45)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Learn More
          </Button>
        </Box>
        </Box>
      </Container>

      <Container maxWidth="xl" sx={{ px: { xs: "11px", md: 3 } }}>
        <Box
          sx={{
            mb: { xs: 4, md: 6 },
            animation: "fadeIn 1s ease-out 0.3s both",
            "@keyframes fadeIn": {
              "0%": { opacity: 0 },
              "100%": { opacity: 1 },
            },
            position: "relative",
            "& .slick-slider": {
              position: "relative",
            },
            "& .slick-list": {
              padding: { xs: "0 20px", md: "0" },
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: 20, sm: 24, md: 32 },
              fontWeight: 700,
              color: "#2c2c2c",
              mb: { xs: 3, md: 4 },
              animation: "slideInLeft 0.8s ease-out",
              "@keyframes slideInLeft": {
                "0%": {
                  opacity: 0,
                  transform: "translateX(-30px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              },
            }}
          >
            Recommended Products
          </Typography>

          <Box sx={{ position: "relative" }}>
            <Slider {...settings}>
            {recommendedProducts?.map((product) => (
              <Box key={product.id} sx={{ px: { xs: 1, md: 1.5 } }}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: { xs: 1.5, md: 2 },
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
                    sx={{ 
                      height: { xs: 160, sm: 180, md: 200 },
                      objectFit: "cover" 
                    }}
                  />

                  <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#2c2c2c",
                        mb: 0.5,
                        fontSize: { xs: 13, md: 16 },
                      }}
                    >
                      {product.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#964F73",
                        fontSize: { xs: 11, md: 13 },
                      }}
                    >
                      {product.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

