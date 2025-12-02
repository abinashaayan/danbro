import Slider from "react-slick";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import cat1 from "../../assets/09f1ee59e9d78cc206e6e867e1cda04c1887d8f8.png";
import cat2 from "../../assets/60be109ca830b1d8ab92f161cd0ca3083a16e4ca.png";
import cat3 from "../../assets/43676d15934fc50bdda59d3e39fd8a4ceaadcb9e.png";

const items = [
  { title: "PIZZA & BURGERS", img: cat1 },
  { title: "PINEAPPLE CAKES", img: cat2 },
  { title: "PASTRY & CUP CAKES", img: cat1 },
  { title: "BLUEBERRY CHOCOLATE CAKE", img: cat3 },
  { title: "CRISMAS CELEBRATION", img: cat1 },
  { title: "BLACKFOREST CAKES", img: cat1 },
  { title: "RED VELVET CLASSIC", img: cat2 },
  { title: "OREO CRUNCH CAKE", img: cat3 },
  { title: "STRAWBERRY DREAM PASTRY", img: cat2 },
  { title: "FRUIT & NUT DELIGHT", img: cat1 },
  { title: "COFFEE MOCHA CAKE", img: cat2 },
  { title: "KITKAT SURPRISE CAKE", img: cat3 },
  { title: "CARAMEL BUTTERSCOTCH CAKE", img: cat1 },
  { title: "BIRTHDAY SPECIAL THEME CAKE", img: cat3 },
  { title: "PARTY CELEBRATION COMBO", img: cat2 },
  { title: "FRESH CREAM VANILLA CAKE", img: cat1 },
  { title: "ANNIVERSARY SPECIAL CAKE", img: cat3 },
  { title: "CHOCO TRUFFLE PREMIUM", img: cat2 },
  { title: "DOLL SHAPE DESIGN CAKE", img: cat1 },
  { title: "KIDS CARTOON THEME CAKE", img: cat3 },
];


export const CategoryCarousel = () => {
  let sliderRef = null;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5 } },
      { breakpoint: 992, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 576, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fbd9d3",
        borderRadius: "100px",
        py: 4,
        px: 5,
        mb: 5,
        position: "relative",
      }}
    >
      <IconButton
        onClick={() => sliderRef.slickPrev()}
        sx={{
          position: "absolute",
          left: 10,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 5,
        }}
      >
        <ArrowBackIosNewIcon sx={{ color: "var(--themeColor)", fontSize: 28 }} />
      </IconButton>

      {/* Carousel */}
      <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
        {items?.map((item, i) => (
          <Box key={i} sx={{ px: 5 }}>
            <img src={item.img} alt="" style={{ height: 85, marginBottom: 8 }} />
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: "var(--themeColor)", }}>
              {item.title}
            </Typography>
          </Box>
        ))}
      </Slider>

      {/* Right Arrow */}
      <IconButton
        onClick={() => sliderRef.slickNext()}
        sx={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 5,
        }}
      >
        <ArrowForwardIosIcon sx={{ color: "var(--themeColor)", fontSize: 28 }} />
      </IconButton>
    </Box>
  );
};
