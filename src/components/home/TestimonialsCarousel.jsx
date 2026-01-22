import { Box, Container, IconButton } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef, useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import user1 from "../../assets/174fadede8628f65c914092552741f716b9b8039.jpg";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Regular Customer",
    rating: 5,
    comment: "The best bakery in town! Their cakes are absolutely delicious and the service is outstanding. I've been ordering from Danbro for years and they never disappoint.",
    image: user1,
  },
  {
    id: 2,
    name: "Rahul Kapoor",
    role: "Event Organizer",
    rating: 5,
    comment: "We ordered a custom cake for our company event and it was perfect! The design was exactly as requested and tasted amazing. Highly recommended!",
    image: user1,
  },
  {
    id: 3,
    name: "Anjali Patel",
    role: "Happy Customer",
    rating: 5,
    comment: "The red velvet cake is to die for! Fresh ingredients, perfect texture, and beautiful presentation. Danbro has become our go-to bakery for all celebrations.",
    image: user1,
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Food Blogger",
    rating: 5,
    comment: "As a food blogger, I've tried many bakeries, but Danbro stands out. Their attention to detail and quality is unmatched. The pastries are simply divine!",
    image: user1,
  },
  {
    id: 5,
    name: "Meera Desai",
    role: "Wedding Planner",
    rating: 5,
    comment: "Danbro created the most beautiful wedding cake for our client. The taste was exceptional and the presentation was flawless. Truly professional!",
    image: user1,
  },
  {
    id: 6,
    name: "Arjun Mehta",
    role: "Corporate Client",
    rating: 5,
    comment: "We order from Danbro for all our corporate events. Consistent quality, timely delivery, and excellent customer service. They never fail to impress!",
    image: user1,
  },
];

export const TestimonialsCarousel = () => {
  let sliderRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 8, md: 12 },
        background: `
          linear-gradient(135deg, 
            rgba(255,181,161,0.05) 0%, 
            rgba(251,199,181,0.08) 50%,
            rgba(255,181,161,0.05) 100%
          )
        `,
        position: "relative",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,181,161,0.1) 0%, transparent 70%)",
          animation: "float 15s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translate(0, 0)" },
            "50%": { transform: "translate(-30px, -30px)" },
          },
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-100px",
          left: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251,199,181,0.1) 0%, transparent 70%)",
          animation: "floatReverse 18s ease-in-out infinite",
          "@keyframes floatReverse": {
            "0%, 100%": { transform: "translate(0, 0)" },
            "50%": { transform: "translate(30px, 30px)" },
          },
        },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 }, position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 70,
              height: 70,
              borderRadius: "50%",
              bgcolor: "rgba(255,181,161,0.15)",
              mb: 2,
              animation: visible ? "pulseIcon 2s ease-in-out infinite" : "none",
              "@keyframes pulseIcon": {
                "0%, 100%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.1)" },
              },
            }}
          >
            <FormatQuoteIcon sx={{ fontSize: 40, color: "#FF9472" }} />
          </Box>
          <CustomText
            sx={{
              fontSize: { xs: 12, md: 14 },
              fontWeight: 600,
              color: "#FF9472",
              textTransform: "uppercase",
              letterSpacing: 2,
              mb: 1,
            }}
          >
            Testimonials
          </CustomText>
          <CustomText
            sx={{
              fontSize: { xs: 32, sm: 38, md: 48 },
              fontWeight: 800,
              color: "var(--themeColor)",
              mb: 2,
            }}
          >
            What Our Customers Say
          </CustomText>
          <CustomText
            sx={{
              fontSize: { xs: 14, md: 16 },
              color: "#666",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Don't just take our word for it - hear from our satisfied customers
          </CustomText>
        </Box>

        {/* Testimonials Carousel */}
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() => sliderRef?.slickPrev()}
            sx={{
              position: "absolute",
              left: { xs: -15, md: -25 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              bgcolor: "#fff",
              color: "var(--themeColor)",
              width: { xs: 45, md: 55 },
              height: { xs: 45, md: 55 },
              boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
              border: "2px solid rgba(255,181,161,0.2)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                bgcolor: "var(--themeColor)",
                color: "#fff",
                transform: "translateY(-50%) scale(1.1)",
                boxShadow: "0 8px 25px rgba(95,41,48,0.3)",
              },
            }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
          </IconButton>

          <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
            {testimonials.map((testimonial, index) => {
              const isActive = currentSlide === index || currentSlide === index - 1;
              return (
                <Box key={testimonial.id} sx={{ px: { xs: 1, md: 1.5 } }}>
                  <Box
                    sx={{
                      bgcolor: "#fff",
                      borderRadius: { xs: 3, md: 4 },
                      p: { xs: 3.5, md: 4.5 },
                      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                      height: "100%",
                      position: "relative",
                      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                      border: "1px solid rgba(255,181,161,0.1)",
                      overflow: "hidden",
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(50px)",
                      animation: visible ? `fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.15}s both` : "none",
                      "@keyframes fadeInUp": {
                        "0%": { opacity: 0, transform: "translateY(50px)" },
                        "100%": { opacity: 1, transform: "translateY(0)" },
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: "linear-gradient(90deg, #FF9472, #FFB5A1, #FF9472)",
                        backgroundSize: "200% 100%",
                        animation: isActive ? "gradientShift 3s ease infinite" : "none",
                        "@keyframes gradientShift": {
                          "0%, 100%": { backgroundPosition: "0% 50%" },
                          "50%": { backgroundPosition: "100% 50%" },
                        },
                      },
                      "&:hover": {
                        transform: "translateY(-12px) scale(1.02)",
                        boxShadow: "0 16px 50px rgba(255,181,161,0.25)",
                        borderColor: "rgba(255,181,161,0.3)",
                        "& .quote-icon": {
                          color: "rgba(255,181,161,0.5)",
                          transform: "scale(1.2) rotate(5deg)",
                        },
                        "& .testimonial-image": {
                          transform: "scale(1.1)",
                          boxShadow: "0 8px 25px rgba(255,181,161,0.4)",
                        },
                      },
                    }}
                  >
                    {/* Quote Icon with Enhanced Animation */}
                    <Box
                      className="quote-icon"
                      sx={{
                        position: "absolute",
                        top: 15,
                        right: 15,
                        color: "rgba(255,181,161,0.15)",
                        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                        zIndex: 0,
                      }}
                    >
                      <FormatQuoteIcon
                        sx={{
                          fontSize: { xs: 70, md: 90 },
                          transform: "rotate(180deg)",
                          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                        }}
                      />
                    </Box>

                    {/* Rating with Animation */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 0.5,
                        mb: 2.5,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon
                          key={i}
                          sx={{
                            fontSize: { xs: 22, md: 24 },
                            color: "#FFD700",
                            transition: "all 0.3s ease",
                            animation: isActive ? `starPulse ${0.5 + i * 0.1}s ease-in-out infinite` : "none",
                            "@keyframes starPulse": {
                              "0%, 100%": { transform: "scale(1)" },
                              "50%": { transform: "scale(1.2)" },
                            },
                            filter: "drop-shadow(0 2px 4px rgba(255,215,0,0.3))",
                          }}
                        />
                      ))}
                    </Box>

                    {/* Comment */}
                    <CustomText
                      sx={{
                        fontSize: { xs: 15, md: 16 },
                        color: "#555",
                        lineHeight: 1.9,
                        mb: 3.5,
                        position: "relative",
                        zIndex: 1,
                        fontStyle: "italic",
                      }}
                    >
                      "{testimonial.comment}"
                    </CustomText>

                    {/* Author Section */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        position: "relative",
                        zIndex: 1,
                        pt: 2,
                        borderTop: "1px solid rgba(255,181,161,0.15)",
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: "-3px",
                            left: "-3px",
                            right: "-3px",
                            bottom: "-3px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, rgba(255,181,161,0.3), rgba(95,41,48,0.2))",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                            zIndex: -1,
                          },
                        }}
                      >
                        <Box
                          className="testimonial-image"
                          component="img"
                          src={testimonial.image}
                          alt={testimonial.name}
                          sx={{
                            width: { xs: 65, md: 75 },
                            height: { xs: 65, md: 75 },
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "3px solid rgba(255,181,161,0.3)",
                            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                          }}
                        />
                      </Box>
                      <Box>
                        <CustomText
                          sx={{
                            fontSize: { xs: 17, md: 18 },
                            fontWeight: 700,
                            color: "var(--themeColor)",
                            mb: 0.5,
                          }}
                        >
                          {testimonial.name}
                        </CustomText>
                        <CustomText
                          sx={{
                            fontSize: { xs: 13, md: 14 },
                            color: "#999",
                            fontWeight: 500,
                          }}
                        >
                          {testimonial.role}
                        </CustomText>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Slider>

          <IconButton
            onClick={() => sliderRef?.slickNext()}
            sx={{
              position: "absolute",
              right: { xs: -15, md: -25 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              bgcolor: "#fff",
              color: "var(--themeColor)",
              width: { xs: 45, md: 55 },
              height: { xs: 45, md: 55 },
              boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
              border: "2px solid rgba(255,181,161,0.2)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                bgcolor: "var(--themeColor)",
                color: "#fff",
                transform: "translateY(-50%) scale(1.1)",
                boxShadow: "0 8px 25px rgba(95,41,48,0.3)",
              },
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
          </IconButton>

          {/* Custom Dots */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              mt: 4,
              "& .slick-dots": {
                position: "relative",
                bottom: "auto",
                display: "flex !important",
                justifyContent: "center",
                gap: 1,
                "& li": {
                  width: "auto",
                  height: "auto",
                  margin: 0,
                  "& button": {
                    width: { xs: "30px", md: "40px" },
                    height: { xs: "4px", md: "5px" },
                    padding: 0,
                    borderRadius: "20px",
                    backgroundColor: "rgba(255,181,161,0.3)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:before": {
                      display: "none",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(255,181,161,0.6)",
                    },
                  },
                  "&.slick-active button": {
                    backgroundColor: "#FF9472",
                    width: { xs: "40px", md: "50px" },
                    boxShadow: "0 0 15px rgba(255,148,114,0.5)",
                  },
                },
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};
