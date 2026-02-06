import { Box, Container, Grid, Button, Rating } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import StarIcon from "@mui/icons-material/Star";
import offer1 from "../../assets/Group 8.png";
import offer2 from "../../assets/Group 8 (2).png";
import offer3 from "../../assets/Group 8 (1).png";

const featuredProducts = [
  {
    id: 1,
    title: "Red Velvet Delight",
    description: "Luxurious red velvet cake with cream cheese frosting",
    price: "₹899",
    originalPrice: "₹1299",
    discount: "31% OFF",
    image: offer1,
    rating: 4.8,
    reviews: 234,
    badge: "Bestseller",
    badgeColor: "#FF6B6B",
  },
  {
    id: 2,
    title: "Chocolate Fudge Cake",
    description: "Rich chocolate cake with fudge frosting and chocolate chips",
    price: "₹749",
    originalPrice: "₹999",
    discount: "25% OFF",
    image: offer2,
    rating: 4.9,
    reviews: 189,
    badge: "New",
    badgeColor: "#4ECDC4",
  },
  {
    id: 3,
    title: "Strawberry Dream",
    description: "Fresh strawberry cake with vanilla cream and fresh berries",
    price: "₹849",
    originalPrice: "₹1199",
    discount: "29% OFF",
    image: offer3,
    rating: 4.7,
    reviews: 156,
    badge: "Popular",
    badgeColor: "#FFE66D",
  },
];

export const FeaturedProductsSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => ({ ...prev, [entry.target.dataset.index]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const items = sectionRef.current.querySelectorAll("[data-index]");
      items.forEach((item) => observer.observe(item));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 6, md: 10 },
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 30% 20%, rgba(255,181,161,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(251,199,181,0.08) 0%, transparent 50%)",
          pointerEvents: "none",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="false" sx={{ px: { xs: 2, md: 3, lg: 2 }, position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 4, md: 6 },
            opacity: visibleItems.header ? 1 : 0,
            transform: visibleItems.header ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
          data-index="header"
        >
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, mb: 2 }}>
            <LocalFireDepartmentIcon sx={{ fontSize: 32, color: "#FF6B6B", animation: "pulse 2s ease-in-out infinite" }} />
            <CustomText
              sx={{
                fontSize: { xs: 14, md: 16 },
                fontWeight: 600,
                color: "#FF6B6B",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              Featured Products
            </CustomText>
          </Box>
          <CustomText
            sx={{
              fontSize: { xs: 32, sm: 38, md: 48 },
              fontWeight: 800,
              color: "var(--themeColor)",
              mb: 2,
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "4px",
                background: "linear-gradient(90deg, transparent, var(--themeColor), transparent)",
                borderRadius: "2px",
              },
            }}
          >
            Our Signature Creations
          </CustomText>
          <CustomText
            sx={{
              fontSize: { xs: 14, md: 16 },
              color: "#666",
              maxWidth: 600,
              mx: "auto",
              mt: 3,
            }}
          >
            Handcrafted with love, our signature bakery items are made from the finest ingredients
          </CustomText>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {featuredProducts.map((product, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product?.id}>
              <Box
                data-index={index}
                sx={{
                  position: "relative",
                  bgcolor: "#fff",
                  borderRadius: { xs: 3, md: 4 },
                  overflow: "hidden",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05) inset",
                  cursor: "pointer",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  opacity: visibleItems[index] ? 1 : 0,
                  transform: visibleItems[index] ? "translateY(0)" : "translateY(50px)",
                  animation: visibleItems[index] ? `fadeInUp 0.4s ease-out 0.3s both` : "none",
                  "@keyframes fadeInUp": {
                    "0%": {
                      opacity: 0,
                      transform: "translateY(50px)",
                    },
                    "100%": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  },
                  "&:hover": {
                    transform: "translateY(-15px) scale(1.02)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,181,161,0.3) inset",
                    "& .product-image": {
                      transform: "scale(1.15) rotate(2deg)",
                    },
                    "& .product-badge": {
                      transform: "scale(1.1) rotate(-5deg)",
                    },
                    "& .add-to-cart-btn": {
                      backgroundColor: "var(--themeColor)",
                      color: "#fff",
                      transform: "translateY(-2px)",
                    },
                  },
                }}
                onClick={() => navigate(`/products/${product?.id}`)}
              >
                {/* Badge */}
                <Box
                  className="product-badge"
                  sx={{
                    position: "absolute",
                    top: 15,
                    right: 15,
                    bgcolor: product?.badgeColor,
                    color: "#fff",
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: 12,
                    fontWeight: 700,
                    zIndex: 10,
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    transition: "all 0.4s ease",
                  }}
                >
                  {product?.badge}
                </Box>

                {/* Discount Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 15,
                    left: 15,
                    bgcolor: "#0A1234",
                    color: "#fff",
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: 13,
                    fontWeight: 800,
                    zIndex: 10,
                    boxShadow: "0 4px 15px rgba(10,18,52,0.4)",
                  }}
                >
                  {product?.discount}
                </Box>

                {/* Product Image */}
                <Box
                  className="product-image"
                  sx={{
                    width: "100%",
                    height: { xs: 280, md: 320 },
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)",
                      zIndex: 1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={product?.image}
                    alt={product?.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                </Box>

                {/* Product Info */}
                <Box sx={{ p: { xs: 2.5, md: 3 }, position: "relative", zIndex: 2 }}>
                  {/* Rating - 5 stars, dynamic */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                    <Rating
                      value={Math.min(5, Math.max(0, Number(product?.avgRating ?? product?.rating) || 0))}
                      readOnly
                      precision={0.1}
                      size="small"
                      max={5}
                      sx={{ color: "#FFB400", "& .MuiRating-iconFilled": { color: "#FFB400" }, "& .MuiRating-iconEmpty": { color: "rgba(255, 180, 0, 0.55)" } }}
                    />
                    <CustomText sx={{ fontSize: 14, fontWeight: 600, color: "#333" }}>
                      {(Number(product?.avgRating ?? product?.rating) || 0).toFixed(1)}
                    </CustomText>
                    <CustomText sx={{ fontSize: 12, color: "#999" }}>
                      ({Number(product?.totalReviews ?? product?.reviews) || 0} reviews)
                    </CustomText>
                  </Box>

                  {/* Title */}
                  <CustomText
                    sx={{
                      fontSize: { xs: 20, md: 24 },
                      fontWeight: 800,
                      color: "var(--themeColor)",
                      mb: 1,
                      lineHeight: 1.3,
                    }}
                  >
                    {product?.title}
                  </CustomText>

                  {/* Description */}
                  <CustomText
                    sx={{
                      fontSize: { xs: 13, md: 14 },
                      color: "#666",
                      mb: 2.5,
                      lineHeight: 1.6,
                      minHeight: { xs: 40, md: 44 },
                    }}
                  >
                    {product?.description}
                  </CustomText>

                  {/* Price and Add to Cart */}
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                    <Box>
                      <CustomText
                        sx={{
                          fontSize: { xs: 24, md: 28 },
                          fontWeight: 800,
                          color: "var(--themeColor)",
                        }}
                      >
                        {product?.price}
                      </CustomText>
                      <CustomText
                        sx={{
                          fontSize: { xs: 14, md: 16 },
                          color: "#999",
                          textDecoration: "line-through",
                          ml: 1,
                        }}
                      >
                        {product?.originalPrice}
                      </CustomText>
                    </Box>
                    <Button
                      className="add-to-cart-btn"
                      sx={{
                        bgcolor: "#fbc7b5",
                        color: "var(--themeColor)",
                        px: { xs: 2.5, md: 3 },
                        py: { xs: 1, md: 1.2 },
                        borderRadius: { xs: 2, md: 2.5 },
                        fontWeight: 700,
                        fontSize: { xs: 13, md: 14 },
                        textTransform: "none",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow: "0 4px 15px rgba(251,199,181,0.4)",
                        "&:hover": {
                          bgcolor: "var(--themeColor)",
                          color: "#fff",
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic here
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* View All Button */}
        <Box sx={{ textAlign: "center", mt: { xs: 5, md: 6 } }}>
          <Button
            onClick={() => navigate("/products")}
            sx={{
              bgcolor: "var(--themeColor)",
              color: "#fff",
              px: { xs: 4, md: 5 },
              py: { xs: 1.2, md: 1.5 },
              borderRadius: { xs: 2, md: 3 },
              fontWeight: 700,
              fontSize: { xs: 15, md: 16 },
              textTransform: "none",
              boxShadow: "0 8px 25px rgba(95,41,48,0.3)",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                bgcolor: "#7a2d3a",
                transform: "translateY(-3px)",
                boxShadow: "0 12px 35px rgba(95,41,48,0.4)",
              },
            }}
          >
            View All Products
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

