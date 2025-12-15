import { Box, IconButton, Typography } from "@mui/material";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useRef, useState } from "react";
import banner from "../../assets/banner.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HeroBanner.css";

export const HeroBanner = () => {
  let sliderRef = null;
  const bannerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const bannerSlides = [
    { 
      id: 1, 
      img: "https://media.newyorker.com/photos/693b059fdb6063d63c569f98/16:10/w_2560%2Cc_limit/ROSNER-BESTDISHES-2025.gif", 
      alt: "hero banner 1",
      title: "Fresh Baked Daily",
      subtitle: "Experience the finest bakery delights",
      animationType: "flipInX",
      captionPosition: "left"
    },
    { 
      id: 2, 
      img: "https://media.newyorker.com/photos/693b059fdb6063d63c569f98/16:10/w_2560%2Cc_limit/ROSNER-BESTDISHES-2025.gif", 
      alt: "hero banner 2",
      title: "Premium Quality",
      subtitle: "Made with love and finest ingredients",
      animationType: "flipInX",
      captionPosition: "right"
    },
    { 
      id: 3, 
      img: "https://media.newyorker.com/photos/693b059fdb6063d63c569f98/16:10/w_2560%2Cc_limit/ROSNER-BESTDISHES-2025.gif", 
      alt: "hero banner 3",
      title: "Celebrate Every Moment",
      subtitle: "Special cakes for special occasions",
      animationType: "flipInX",
      captionPosition: "center"
    },
    { 
      id: 4, 
      img: "https://media.newyorker.com/photos/693b059fdb6063d63c569f98/16:10/w_2560%2Cc_limit/ROSNER-BESTDISHES-2025.gif", 
      alt: "hero banner 4",
      title: "Style Grilled Chicken",
      subtitle: "The Chik World's Original Skinless",
      animationType: "flipInX",
      captionPosition: "left"
    },
  ];

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
      <style>
        {`
          @keyframes float {
            0%, 100% { 
              transform: translate(0, 0) scale(1) rotate(0deg);
            }
            50% { 
              transform: translate(50px, 50px) scale(1.2) rotate(180deg);
            }
          }
          
          @keyframes floatReverse {
            0%, 100% { 
              transform: translate(0, 0) scale(1) rotate(0deg);
            }
            50% { 
              transform: translate(-40px, -40px) scale(1.15) rotate(-180deg);
            }
          }
          
          @keyframes particleFloat {
            0%, 100% { 
              transform: translateY(0px) translateX(0px) scale(1);
              opacity: 0.3;
            }
            50% { 
              transform: translateY(-40px) translateX(30px) scale(1.5);
              opacity: 0.8;
            }
          }
          
          @keyframes shimmer {
            0% {
              background-position: -1000px 0;
            }
            100% {
              background-position: 1000px 0;
            }
          }
          
          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(95, 41, 48, 0.3),
                          0 0 40px rgba(255, 181, 161, 0.2),
                          0 0 60px rgba(95, 41, 48, 0.1);
            }
            50% {
              box-shadow: 0 0 30px rgba(95, 41, 48, 0.5),
                          0 0 60px rgba(255, 181, 161, 0.3),
                          0 0 90px rgba(95, 41, 48, 0.2);
            }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-100px) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(100px) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }
          
          @keyframes zoomIn {
            from {
              opacity: 0;
              transform: scale(0.8) translateY(30px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulseArrow {
            0%, 100% {
              transform: translateY(-50%) scale(1);
              box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            }
            50% {
              transform: translateY(-50%) scale(1.1);
              box-shadow: 0 12px 35px rgba(95, 41, 48, 0.4);
            }
          }
          
          @keyframes rotate360 {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes gradientShift {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          
          @keyframes textGlow {
            0%, 100% {
              text-shadow: 0 4px 20px rgba(0,0,0,0.5),
                           0 2px 10px rgba(0,0,0,0.3),
                           0 0 30px rgba(255, 181, 161, 0.3);
            }
            50% {
              text-shadow: 0 4px 20px rgba(0,0,0,0.5),
                           0 2px 10px rgba(0,0,0,0.3),
                           0 0 50px rgba(255, 181, 161, 0.6);
            }
          }
          
          @keyframes dotPulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.3);
              opacity: 1;
            }
          }
        `}
      </style>
      
      <Box
        ref={bannerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          width: "100%",
          maxWidth: "100vw",
          mb: 4,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          opacity: 0,
          transform: "translateY(20px) scale(0.98)",
          transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
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
            bottom: "-100px",
            right: "-100px",
            width: "450px",
            height: "450px",
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
            position: "relative",
            zIndex: 1,
            overflow: "hidden",
            borderRadius: { xs: "0", md: "24px" },
            boxShadow: `
              0 25px 80px rgba(0,0,0,0.2),
              0 0 0 1px rgba(255,255,255,0.1) inset,
              0 0 100px rgba(95, 41, 48, 0.1)
            `,
            animation: isHovered ? "glow 2s ease-in-out infinite" : "none",
            "& .slick-dots": {
              bottom: { xs: "20px", md: "40px" },
              zIndex: 10,
              display: "flex !important",
              justifyContent: "center",
              alignItems: "center",
              "& li": {
                width: { xs: "35px", md: "50px" },
                height: { xs: "6px", md: "8px" },
                margin: "0 6px",
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
                      height: { xs: "55vh", sm: "65vh", md: "80vh", lg: "90vh" },
                      objectFit: "cover",
                      display: "block",
                      opacity: isActive ? 0.8 : 0.6,
                      transition: "opacity 0.7s ease-in-out",
                    }}
                  />
                  
                  {/* Shimmer Effect Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
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
                    }}
                  />
                  
                  {/* Enhanced Slide Content Overlay */}
                  <Box
                    className={`kb-caption ${
                      slide.captionPosition === "right" 
                        ? "kb-caption-right" 
                        : slide.captionPosition === "center" 
                        ? "kb-caption-center" 
                        : ""
                    }`}
                    sx={{
                      position: "absolute",
                      bottom: { xs: "25%", md: "60%" },
                      zIndex: 4,
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.7s ease-in-out",
                    }}
                  >
                    {/* Glassmorphism Background for Text */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: "-20px",
                        left: "-20px",
                        right: "-20px",
                        bottom: "-20px",
                        background: "rgba(0, 0, 0, 0.2)",
                        backdropFilter: "blur(20px)",
                        borderRadius: "20px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        zIndex: -1,
                        opacity: 0.7,
                      }}
                    />
                    
                    <Typography
                      component="h1"
                      data-animation={`animated ${slide.animationType}`}
                      className={isActive ? `animated ${slide.animationType}` : ""}
                      sx={{
                        fontSize: { xs: "25px", sm: "35px", md: "55px" },
                        fontWeight: 300,
                        color: "var(--themeColor)",
                        fontFamily: "var(--fontFamily)",
                        backgroundColor: "#fff",
                        textAlign: "center",
                        textShadow: "none",
                        padding: "5px 0 5px 15px",
                        mb: 1,
                        lineHeight: 1.2,
                        "@media (max-width: 480px)": {
                          fontSize: "25px",
                        },
                      }}
                    >
                      {slide?.title}
                    </Typography>
                    <Typography
                      component="h2"
                      data-animation={`animated ${slide.animationType}`}
                      className={isActive ? `animated ${slide.animationType}` : ""}
                      sx={{
                        fontSize: { xs: "20px", sm: "25px", md: "30px" },
                        fontWeight: "normal",
                        fontFamily: "var(--fontFamily)",
                        color: "#fff",
                        textAlign: "center",
                        textShadow: "none",
                        paddingLeft: "15px",
                        lineHeight: 1.3,
                        "@media (max-width: 480px)": {
                          fontSize: "20px",
                        },
                      }}
                    >
                      {slide?.subtitle}
                    </Typography>
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
    </>
  );
};
