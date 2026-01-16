import { Box, Container, Typography, Card, CardContent, CardMedia } from "@mui/material";
import Slider from "react-slick";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

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

export const RecommendedProducts = ({ recommendedProducts = [] }) => {
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
  );
};

