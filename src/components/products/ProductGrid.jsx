import { memo } from "react";
import { Box, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import { ShoppingCart, ShareOutlined, FavoriteBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CustomText } from "../comman/CustomText";
import { ProductDescription } from "../comman/ProductDescription";
import { ProductPrice } from "../comman/ProductPrice";

export const ProductGrid = memo(({ products, isVisible }) => {
  const navigate = useNavigate();

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
            key={product.id}
            sx={{
              width: {
                xs: "calc(50% - 6px)",
                sm: "calc(33.333% - 13.33px)",
                md: "calc(25% - 18px)",
                lg: "calc(20% - 20px)",
              },
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
                  <IconButton size="small" onClick={(e) => { e.stopPropagation() }}>
                    <ShoppingCart sx={{ fontSize: 18 }} />
                  </IconButton>
                  <IconButton size="small" onClick={(e) => { e.stopPropagation() }}>
                    <ShareOutlined sx={{ fontSize: 18 }} />
                  </IconButton>
                  <IconButton size="small" onClick={(e) => { e.stopPropagation() }}>
                    <FavoriteBorder sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>
              </Box>
              <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <CustomText
                  autoTitleCase={true}
                  sx={{
                    fontWeight: 600,
                    color: "#2c2c2c",
                    mb: 0.5,
                    fontSize: { xs: 11, sm: 12, md: 13 },
                    lineHeight: 1.3,
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#FF643A",
                    },
                  }}
                >
                  {product?.name}
                </CustomText>

                <ProductDescription>{product?.description}</ProductDescription>

                <ProductPrice>{product?.price}</ProductPrice>
              </CardContent>
            </Card>
          </Box>
        ))
      ) : (
        <Box sx={{ width: "100%", textAlign: "center", py: 8, animation: "fadeIn 0.6s ease-out", "@keyframes fadeIn": { "0%": { opacity: 0 }, "100%": { opacity: 1 }, }, }}>
          <CustomText variant="h6" sx={{ color: "#999", fontSize: { xs: 16, md: 20 }, }}>
            No products found
          </CustomText>
        </Box>
      )}
    </Box>
  );
});

