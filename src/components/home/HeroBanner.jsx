import { Box, IconButton } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HeroBanner.css";
import { bannerSlides } from "../../utils/bannerSlides";

export const HeroBanner = () => {
  let sliderRef = null;
  const bannerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const settings = {
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    dots: true,
    pauseOnHover: true,
    fade: true,
    cssEase: "cubic-bezier(0.77, 0, 0.175, 1)",
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
            entry.target.style.transform = "translateY(0) scale(1)";
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

  // Trigger animations when slide becomes active
  useEffect(() => {
    // Remove animations from all slides first
    const allSlides = document.querySelectorAll('.slick-slide');
    allSlides.forEach((slide) => {
      const animatedElements = slide.querySelectorAll('[data-animation]');
      animatedElements.forEach((el) => {
        el.classList.remove('animated', 'flipInX', 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'fadeInDown', 'zoomIn', 'bounceIn');
      });
    });

    // Add animations to active slide after a small delay
    setTimeout(() => {
      const activeSlide = document.querySelector('.slick-active');
      if (activeSlide) {
        const animatedElements = activeSlide.querySelectorAll('[data-animation]');
        animatedElements.forEach((el) => {
          const animationType = el.getAttribute('data-animation');
          if (animationType) {
            el.classList.add(...animationType.split(' '));
          }
        });
      }
    }, 100);
  }, [currentSlide]);

  return (
    <>
      <Box
        ref={bannerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          width: "100%",
          maxWidth: "100%",
          mb: { xs: 2, md: 3 },
          position: "relative",
          display: "flex",
          justifyContent: "center",
          opacity: 0,
          transform: "translateY(20px) scale(0.98)",
          transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
          overflow: "hidden",
          overflowX: "hidden",
          overflowY: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-50px",
            left: "-50px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,181,161,0.35) 0%, rgba(95,41,48,0.15) 50%, transparent 70%)",
            animation: "float 15s ease-in-out infinite",
            zIndex: 0,
            pointerEvents: "none",
            filter: "blur(40px)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-50px",
            right: "-50px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251,199,181,0.3) 0%, rgba(255,181,161,0.2) 50%, transparent 70%)",
            animation: "floatReverse 18s ease-in-out infinite",
            zIndex: 0,
            pointerEvents: "none",
            filter: "blur(50px)",
          },
        }}
      >
        {/* Enhanced Animated Background Particles */}
        {[...Array(12)].map((_, i) => {
          const size = 8 + Math.random() * 8;
          const delay = Math.random() * 2;
          const duration = 10 + Math.random() * 10;
          return (
            <Box
              key={i}
              sx={{
                position: "absolute",
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: "50%",
                background: `radial-gradient(circle, rgba(255, 181, 161, ${0.5 + Math.random() * 0.3}) 0%, transparent 70%)`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `particleFloat ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
                zIndex: 2,
                pointerEvents: "none",
                boxShadow: `0 0 ${size * 2}px rgba(255, 181, 161, 0.5)`,
              }}
            />
          );
        })}

        {/* Rotating Gradient Orbs */}
        {[...Array(3)].map((_, i) => (
          <Box
            key={`orb-${i}`}
            sx={{
              position: "absolute",
              width: { xs: "150px", md: "200px" },
              height: { xs: "150px", md: "200px" },
              borderRadius: "50%",
              background: `conic-gradient(from ${i * 120}deg, 
                rgba(255,181,161,0.2) 0deg,
                rgba(95,41,48,0.15) 120deg,
                rgba(255,181,161,0.2) 240deg,
                rgba(95,41,48,0.15) 360deg)`,
              top: `${20 + i * 30}%`,
              left: `${10 + i * 25}%`,
              animation: `rotate360 ${20 + i * 5}s linear infinite`,
              zIndex: 1,
              pointerEvents: "none",
              filter: "blur(30px)",
              opacity: 0.4,
            }}
          />
        ))}

        <Box
          className="hero-banner-wrapper"
          sx={{
            width: "100%",
            maxWidth: "100%",
            position: "relative",
            zIndex: 1,
            overflow: "hidden",
            overflowX: "hidden",
            overflowY: "hidden",
            borderRadius: { xs: "0", md: "24px" },
            "& .slick-slider": {
              overflow: "hidden",
              overflowX: "hidden",
            },
            "& .slick-list": {
              overflow: "hidden",
              overflowX: "hidden",
            },
            "& .slick-track": {
              overflow: "hidden",
              overflowX: "hidden",
            },
            boxShadow: `
              0 20px 60px rgba(0,0,0,0.12),
              0 0 0 1px rgba(255,255,255,0.15) inset,
              0 0 80px rgba(95, 41, 48, 0.1)
            `,
            animation: isHovered ? "glow 2s ease-in-out infinite" : "none",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "30px",
              background: "linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
              zIndex: 5,
              pointerEvents: "none",
            },
            "& .slick-dots": {
              bottom: { xs: "10px", md: "15px" },
              zIndex: 10,
              display: "flex !important",
              justifyContent: "center",
              alignItems: "center",
              "& li": {
                width: { xs: "28px", md: "35px" },
                height: { xs: "4px", md: "5px" },
                margin: "0 4px",
                "& button": {
                  width: "100%",
                  height: "100%",
                  padding: 0,
                  borderRadius: "20px",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  "&:before": {
                    display: "none",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    transform: "scaleY(1.5)",
                  },
                },
                "&.slick-active button": {
                  backgroundColor: "var(--themeColor)",
                  boxShadow: `
                    0 0 15px rgba(95, 41, 48, 0.6),
                    0 0 30px rgba(255, 181, 161, 0.4),
                    inset 0 0 10px rgba(255, 255, 255, 0.2)
                  `,
                  animation: "dotPulse 2s ease-in-out infinite",
                  transform: "scaleY(1.2)",
                },
              },
            },
          }}
        >
          {/* Enhanced Left Arrow */}
          <IconButton
            className="kb-control-left"
            onClick={() => sliderRef?.slickPrev()}
            sx={{
              position: "absolute",
              left: { xs: "1%", md: "1%" },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              backgroundColor: "#fff",
              border: "2px solid #fff",
              width: { xs: 50, md: 55 },
              height: { xs: 50, md: 55 },
              display: { xs: "none", md: "flex" },
              transition: "all ease-in-out 0.3s",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              "&:hover, &:active, &:focus": {
                backgroundColor: "#fff",
                border: "2px solid #fff",
                color: "#000",
              },
            }}
          >
            <ArrowBackIosNewIcon
              className="kb-icons"
              sx={{
                color: "#000",
                fontSize: { xs: 24, md: 34 },
                lineHeight: "50px",
                fontWeight: "normal",
              }}
            />
          </IconButton>

          <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
            {bannerSlides?.map((slide, index) => {
              const isActive = currentSlide === index;
              return (
                <Box
                  key={slide.id}
                  sx={{
                    width: "100%",
                    height: { xs: "25vh", sm: "28vh", md: "32vh", lg: "35vh" },
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `
                        linear-gradient(135deg, 
                          rgba(95,41,48,0.15) 0%, 
                          rgba(0,0,0,0.1) 30%,
                          rgba(255,181,161,0.15) 70%,
                          rgba(95,41,48,0.1) 100%
                        )
                      `,
                      backgroundSize: "200% 200%",
                      animation: isActive ? "gradientShift 8s ease infinite" : "none",
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
                      background: `
                        radial-gradient(circle at 30% 50%, 
                          rgba(255,181,161,0.2) 0%, 
                          transparent 50%),
                        radial-gradient(circle at 70% 80%, 
                          rgba(95,41,48,0.15) 0%, 
                          transparent 50%)
                      `,
                      pointerEvents: "none",
                      zIndex: 2,
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 1s ease",
                    },
                    "&:hover": {
                      "& img": {
                        transform: "scale(1.05)",
                      },
                      "& .slide-content": {
                        transform: "translateY(-15px) scale(1.02)",
                      },
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={slide.img}
                    alt={slide.alt}
                    className={isActive ? "kb-kenburns-img" : ""}
                    sx={{
                      width: "100%",
                      height: "100%",
                      minHeight: { xs: "25vh", sm: "28vh", md: "32vh", lg: "35vh" },
                      maxHeight: { xs: "25vh", sm: "28vh", md: "32vh", lg: "35vh" },
                      objectFit: "cover",
                      objectPosition: "center center",
                      display: "block",
                      opacity: isActive ? 0.9 : 0.7,
                      transition: "opacity 0.7s ease-in-out, transform 8s ease-out",
                      transform: isActive ? "scale(1.05)" : "scale(1)",
                      clipPath: { xs: "polygon(0 0, 100% 0, 100% 85%, 0 100%)", md: "polygon(0 0, 100% 0, 100% 80%, 0 95%)" },
                    }}
                  />

                  {/* Shimmer Effect Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "200%",
                      height: "100%",
                      background: `
                        linear-gradient(90deg, 
                          transparent 0%, 
                          rgba(255,255,255,0.1) 50%, 
                          transparent 100%
                        )
                      `,
                      backgroundSize: "200% 100%",
                      animation: isActive ? "shimmer 3s ease-in-out infinite" : "none",
                      zIndex: 3,
                      pointerEvents: "none",
                      overflow: "hidden",
                    }}
                  />

                  {/* Enhanced Slide Content Overlay - Positioned at Top */}
                  <Box
                    className={`kb-caption ${slide.captionPosition === "right"
                        ? "kb-caption-right"
                        : slide.captionPosition === "center"
                          ? "kb-caption-center"
                          : ""
                      }`}
                    sx={{
                      position: "absolute",
                      top: { xs: "8%", sm: "10%", md: "12%", lg: "15%" },
                      left: { xs: "50%", md: slide.captionPosition === "right" ? "auto" : slide.captionPosition === "center" ? "50%" : "8%" },
                      right: { xs: "auto", md: slide.captionPosition === "right" ? "8%" : "auto" },
                      transform: { xs: "translateX(-50%)", md: slide.captionPosition === "center" ? "translateX(-50%)" : "none" },
                      zIndex: 4,
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.7s ease-in-out, transform 0.7s ease-in-out",
                      width: { xs: "90%", md: slide.captionPosition === "center" ? "75%" : "50%" },
                      textAlign: { xs: "center", md: slide.captionPosition === "center" ? "center" : "left" },
                    }}
                  >
                    {/* Glassmorphism Background for Text */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: { xs: "-15px", md: "-20px" },
                        left: { xs: "-15px", md: "-20px" },
                        right: { xs: "-15px", md: "-20px" },
                        bottom: { xs: "-15px", md: "-20px" },
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        borderRadius: { xs: "15px", md: "20px" },
                        border: "1px solid rgba(255, 181, 161, 0.2)",
                        zIndex: -1,
                        opacity: 0.95,
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      }}
                    />

                    <CustomText
                      component="h1"
                      data-animation={`animated ${slide.animationType}`}
                      className={isActive ? `animated ${slide.animationType}` : ""}
                      sx={{
                        fontSize: { xs: "22px", sm: "28px", md: "38px", lg: "42px" },
                        fontWeight: 700,
                        color: "var(--themeColor)",
                        fontFamily: "var(--fontFamily)",
                        textAlign: { xs: "center", md: slide.captionPosition === "center" ? "center" : "left" },
                        textShadow: "none",
                        padding: { xs: "8px 12px", md: "10px 15px" },
                        mb: { xs: 0.5, md: 1 },
                        lineHeight: 1.2,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {slide?.title}
                    </CustomText>
                    <CustomText
                      component="h2"
                      data-animation={`animated ${slide.animationType}`}
                      className={isActive ? `animated ${slide.animationType}` : ""}
                      sx={{
                        fontSize: { xs: "14px", sm: "16px", md: "18px", lg: "20px" },
                        fontWeight: 500,
                        fontFamily: "var(--fontFamily)",
                        color: "#666",
                        textAlign: { xs: "center", md: slide.captionPosition === "center" ? "center" : "left" },
                        textShadow: "none",
                        padding: { xs: "0 12px 8px", md: "0 15px 10px" },
                        lineHeight: 1.4,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {slide?.subtitle}
                    </CustomText>
                  </Box>
                </Box>
              );
            })}
          </Slider>

          {/* Enhanced Right Arrow */}
          <IconButton
            className="kb-control-right"
            onClick={() => sliderRef?.slickNext()}
            sx={{
              position: "absolute",
              right: { xs: "1%", md: "1%" },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              backgroundColor: "#fff",
              border: "2px solid #fff",
              width: { xs: 50, md: 55 },
              height: { xs: 50, md: 55 },
              display: { xs: "none", md: "flex" },
              transition: "all ease-in-out 0.3s",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              "&:hover, &:active, &:focus": {
                backgroundColor: "#fff",
                border: "2px solid #fff",
                color: "#000",
              },
            }}
          >
            <ArrowForwardIosIcon
              className="kb-icons"
              sx={{
                color: "#000",
                fontSize: { xs: 24, md: 34 },
                lineHeight: "50px",
                fontWeight: "normal",
              }}
            />
          </IconButton>
        </Box>
      </Box>

      {/* Zigzag Shape Divider at Bottom */}
      <Box
        className="elementor-shape elementor-shape-bottom"
        data-negative="false"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          maxWidth: "100%",
          height: { xs: "30px", md: "40px" },
          zIndex: 2,
          overflow: "hidden",
          overflowX: "hidden",
          overflowY: "hidden",
          transform: "rotate(180deg)",
          pointerEvents: "none",
          "& svg": {
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            display: "block",
            overflow: "hidden",
          },
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1800 40"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
        >
          <path
            className="elementor-shape-fill"
            d="M5.4 0.4l5.4 5.3L16.5 0.4l5.4 5.3L27.5 0.4 33 5.7 38.6 0.4l5.5 5.4h.1L49.9 0.4l5.4 5.3L60.9 0.4l5.5 5.3L72 0.4l5.5 5.3L83.1 0.4l5.4 5.3L94.1 0.4l5.5 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.4 5.3L161 0.4l5.4 5.3L172 0.4l5.5 5.3 5.6-5.3 5.4 5.3 5.7-5.3 5.4 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.5 5.3L261 0.4l5.4 5.3L272 0.4l5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.7-5.4 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.7-5.3 5.4 5.4h.2l5.6-5.4 5.5 5.3L361 0.4l5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.7-5.4 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.6-5.4 5.5 5.3L461 0.4l5.5 5.3 5.6-5.3 5.4 5.3 5.7-5.3 5.4 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1L550 0.4l5.4 5.3L561 0.4l5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.4 5.3 5.7-5.3 5.4 5.3 5.6-5.3 5.5 5.4h.2L650 0.4l5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.4h.2L750 0.4l5.5 5.3 5.6-5.3 5.4 5.3 5.7-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.7-5.4 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.4h.2L850 0.4l5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.4 5.3 5.7-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.7-5.4 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.4 5.3 5.7-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.7-5.4 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.7-5.4 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.7-5.3 5.4 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.6-5.4 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.7-5.3 5.4 5.4h.2l5.6-5.4 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.7-5.4 5.4 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.5 5.4h.1l5.6-5.4 5.5 5.3 5.6-5.3 5.5 5.3 5.6-5.3 5.4 5.3 5.7-5.3 5.4 5.3 5.6-5.3 5.5 5.4V0H-.2v40z"
            fill="#fff"
          />
        </svg>
      </Box>
    </>
  );
};
