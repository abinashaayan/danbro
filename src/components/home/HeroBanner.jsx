import { Box, IconButton, Typography } from "@mui/material";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useRef, useState } from "react";
import banner from "../../assets/banner.png";

export const HeroBanner = () => {
  let sliderRef = null;
  const bannerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerSlides = [
    { 
      id: 1, 
      img: banner, 
      alt: "hero banner 1",
      title: "Fresh Baked Daily",
      subtitle: "Experience the finest bakery delights"
    },
    { 
      id: 2, 
      img: "https://treasuretrove.com.my/wp-content/uploads/2022/05/bannerimage.jpg", 
      alt: "hero banner 2",
      title: "Premium Quality",
      subtitle: "Made with love and finest ingredients"
    },
    { 
      id: 3, 
      img: "https://treasuretrove.com.my/wp-content/uploads/2024/09/IMG_1039-scaled.jpg", 
      alt: "hero banner 3",
      title: "Celebrate Every Moment",
      subtitle: "Special cakes for special occasions"
    },
  ];

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dots: true,
    pauseOnHover: true,
    fade: true,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
        },
      },
    ],
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    if (bannerRef.current) observer.observe(bannerRef.current);

    return () => {
      if (bannerRef.current) observer.unobserve(bannerRef.current);
    };
  }, []);

  return (
    <Box
      ref={bannerRef}
      sx={{
        width: "100%",
        maxWidth: "100vw",
        mb: 4,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        opacity: 0,
        transform: "translateY(20px)",
        transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,181,161,0.25) 0%, transparent 70%)",
          animation: "float 12s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translate(0, 0) scale(1) rotate(0deg)" },
            "50%": { transform: "translate(50px, 50px) scale(1.2) rotate(180deg)" },
          },
          zIndex: 0,
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-80px",
          right: "-80px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251,199,181,0.2) 0%, transparent 70%)",
          animation: "float 15s ease-in-out infinite reverse",
          "@keyframes float": {
            "0%, 100%": { transform: "translate(0, 0) scale(1) rotate(0deg)" },
            "50%": { transform: "translate(-40px, -40px) scale(1.15) rotate(-180deg)" },
          },
          zIndex: 0,
          pointerEvents: "none",
        },
      }}
    >
      {/* Animated Background Particles */}
      {[...Array(6)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: { xs: "8px", md: "12px" },
            height: { xs: "8px", md: "12px" },
            borderRadius: "50%",
            background: "rgba(255, 181, 161, 0.4)",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `particleFloat ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            zIndex: 2,
            pointerEvents: "none",
            "@keyframes particleFloat": {
              "0%, 100%": { 
                transform: "translateY(0px) translateX(0px) scale(1)",
                opacity: 0.3
              },
              "50%": { 
                transform: `translateY(${-30 - i * 10}px) translateX(${20 + i * 5}px) scale(1.5)`,
                opacity: 0.8
              },
            },
          }}
        />
      ))}

      <Box
        sx={{
          width: "100%",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
          borderRadius: { xs: 0, md: "30px" },
          boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1) inset",
          "& .slick-dots": {
            bottom: { xs: "15px", md: "30px" },
            zIndex: 10,
            "& li": {
              width: { xs: "30px", md: "40px" },
              height: { xs: "4px", md: "6px" },
              margin: "0 4px",
              "& button": {
                width: "100%",
                height: "100%",
                padding: 0,
                borderRadius: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                transition: "all 0.3s ease",
                "&:before": {
                  display: "none",
                },
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                },
              },
              "&.slick-active button": {
                backgroundColor: "var(--themeColor)",
                boxShadow: "0 0 10px rgba(95, 41, 48, 0.5)",
              },
            },
          },
        }}
      >
        {/* Left Arrow */}
        <IconButton
          onClick={() => sliderRef?.slickPrev()}
          sx={{
            position: "absolute",
            left: { xs: 10, md: 30 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(15px)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.2) inset",
            width: { xs: 40, md: 50 },
            height: { xs: 40, md: 50 },
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
              transform: "translateY(-50%) scale(1.15) translateX(-5px)",
              boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
            },
            display: { xs: "none", md: "flex" },
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            animation: "pulseArrow 3s ease-in-out infinite",
            "@keyframes pulseArrow": {
              "0%, 100%": { boxShadow: "0 8px 25px rgba(0,0,0,0.15)" },
              "50%": { boxShadow: "0 8px 25px rgba(95, 41, 48, 0.3)" },
            },
          }}
        >
          <ArrowBackIosNewIcon sx={{ color: "var(--themeColor)", fontSize: { xs: 24, md: 32 } }} />
        </IconButton>

        <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
          {bannerSlides?.map((slide, index) => (
            <Box
              key={slide.id}
              sx={{
                width: "100%",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(135deg, rgba(95,41,48,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(255,181,161,0.1) 100%)",
                  pointerEvents: "none",
                  zIndex: 2,
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "radial-gradient(circle at 30% 50%, rgba(255,181,161,0.15) 0%, transparent 50%)",
                  pointerEvents: "none",
                  zIndex: 2,
                },
                "&:hover": {
                  "& img": {
                    transform: "scale(1.08)",
                  },
                  "& .slide-content": {
                    transform: "translateY(-10px)",
                  },
                },
              }}
            >
              <Box
                component="img"
                src={slide.img}
                alt={slide.alt}
                sx={{
                  width: "100%",
                  height: { xs: "50vh", sm: "60vh", md: "75vh", lg: "85vh" },
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
              
              {/* Slide Content Overlay */}
              <Box
                className="slide-content"
                sx={{
                  position: "absolute",
                  bottom: { xs: "20%", md: "25%" },
                  left: { xs: "5%", md: "10%" },
                  zIndex: 3,
                  maxWidth: { xs: "90%", md: "50%" },
                  transition: "transform 0.6s ease",
                  opacity: currentSlide === index ? 1 : 0,
                  transform: currentSlide === index ? "translateY(0)" : "translateY(30px)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "28px", sm: "36px", md: "48px", lg: "56px" },
                    fontWeight: 900,
                    color: "#fff",
                    textShadow: "0 4px 20px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)",
                    mb: 1,
                    lineHeight: 1.2,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", sm: "16px", md: "20px" },
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.95)",
                    textShadow: "0 2px 10px rgba(0,0,0,0.4)",
                  }}
                >
                  {slide.subtitle}
                </Typography>
              </Box>
            </Box>
          ))}
        </Slider>

        {/* Right Arrow */}
        <IconButton
          onClick={() => sliderRef?.slickNext()}
          sx={{
            position: "absolute",
            right: { xs: 10, md: 30 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(15px)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.2) inset",
            width: { xs: 40, md: 50 },
            height: { xs: 40, md: 50 },
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
              transform: "translateY(-50%) scale(1.15) translateX(5px)",
              boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
            },
            display: { xs: "none", md: "flex" },
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            animation: "pulseArrow 3s ease-in-out infinite 1.5s",
            "@keyframes pulseArrow": {
              "0%, 100%": { boxShadow: "0 8px 25px rgba(0,0,0,0.15)" },
              "50%": { boxShadow: "0 8px 25px rgba(95, 41, 48, 0.3)" },
            },
          }}
        >
          <ArrowForwardIosIcon sx={{ color: "var(--themeColor)", fontSize: { xs: 24, md: 32 } }} />
        </IconButton>
      </Box>
    </Box>
  );
};
