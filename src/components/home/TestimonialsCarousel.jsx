import { Box, Container, IconButton, Avatar, Stack } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import { CustomCarousel, CustomCarouselArrow } from "../comman/CustomCarousel";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef, useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import VerifiedIcon from "@mui/icons-material/Verified";
import user1 from "../../assets/174fadede8628f65c914092552741f716b9b8039.jpg";
import { getAllReviews } from "../../utils/apiService";

const mapReviewToTestimonial = (r) => ({
  id: r?._id,
  name: r?.user?.name ?? "Customer",
  role: r?.product?.name ?? "Customer",
  rating: typeof r?.rating === "number" ? Math.min(5, Math.max(1, r.rating)) : 5,
  comment: r?.review ?? "",
  image: user1,
});

export const TestimonialsCarousel = () => {
  const sliderRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    getAllReviews()
      .then((data) => {
        if (cancelled) return;
        const list = (Array.isArray(data) ? data : [])
          .filter((r) => (r?.status || "").toLowerCase() === "approved")
          .map(mapReviewToTestimonial)
          .filter((t) => t.comment?.trim());
        setTestimonials(list);
        if (list.length > 0) setVisible(true);
      })
      .catch(() => setTestimonials([]));
    return () => { cancelled = true; };
  }, []);

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

  const handleBeforeChange = (current, next) => {
    setCurrentSlide(next);
  };

  const hasTestimonials = testimonials?.length > 0;

  return (
    <Box
      ref={sectionRef} >
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 2, md: 4 },
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <CustomText
            sx={{
              fontSize: { xs: 32, sm: 40, md: 52 },
              fontWeight: 800,
              color: "var(--themeColor)",
              mb: 2,
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.2,
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
              lineHeight: 1.7,
            }}
          >
            Real experiences from our valued customers
          </CustomText>
        </Box>

        {/* Single Card Carousel */}
        <Box sx={{ position: "relative", maxWidth: { xs: "100%", md: "900px" }, mx: "auto" }}>
          {/* Navigation Buttons */}
          <CustomCarouselArrow
            direction="prev"
            onClick={() => sliderRef.current?.handlePrev()}
            sx={{
              position: "absolute",
              left: { xs: -10, md: -70 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: { xs: 45, md: 55 },
              height: { xs: 45, md: 55 },
              backgroundColor: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255,181,161,0.3)",
              borderRadius: "50%",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                backgroundColor: "var(--themeColor)",
                borderColor: "var(--themeColor)",
                transform: "translateY(-50%) scale(1.1)",
                "& svg": {
                  color: "#fff",
                },
              },
            }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: { xs: 22, md: 26 } }} />
          </CustomCarouselArrow>

          <CustomCarouselArrow
            direction="next"
            onClick={() => sliderRef.current?.handleNext()}
            sx={{
              position: "absolute",
              right: { xs: -10, md: -70 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: { xs: 45, md: 55 },
              height: { xs: 45, md: 55 },
              backgroundColor: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255,181,161,0.3)",
              borderRadius: "50%",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                backgroundColor: "var(--themeColor)",
                borderColor: "var(--themeColor)",
                transform: "translateY(-50%) scale(1.1)",
                "& svg": {
                  color: "#fff",
                },
              },
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: { xs: 22, md: 26 } }} />
          </CustomCarouselArrow>

          {/* Carousel Slider - key forces remount when testimonials load so slides render */}
          {!hasTestimonials ? (
            <Box sx={{ minHeight: 320, display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>
              <CustomText>Loading testimonials...</CustomText>
            </Box>
          ) : (
          <CustomCarousel
            key={`testimonials-${testimonials.length}`}
            ref={sliderRef}
            slidesToShow={1}
            slidesToScroll={1}
            infinite={true}
            speed={600}
            arrows={false}
            dots={true}
            autoplay={true}
            autoplaySpeed={5000}
            pauseOnHover={true}
            fade={true}
            cssEase="cubic-bezier(0.4, 0, 0.2, 1)"
            beforeChange={handleBeforeChange}
          >
            {testimonials.map((testimonial, index) => {
              const isActive = currentSlide === index;
              return (
                <Box key={testimonial?.id} sx={{ px: { xs: 1, md: 2 } }}>
                  <Box
                    sx={{
                      bgcolor: "#fff",
                      borderRadius: { xs: 4, md: 6 },
                      p: { xs: 4, md: 6 },
                      boxShadow: "0 10px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,148,114,0.08)",
                      position: "relative",
                      overflow: "hidden",
                      opacity: visible ? 1 : 0,
                      transform: visible ? "scale(1)" : "scale(0.95)",
                      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "6px",
                        background: "linear-gradient(90deg, #FF9472 0%, #FFB5A1 50%, #FF9472 100%)",
                        backgroundSize: "200% 100%",
                        animation: isActive ? "gradientShift 3s ease infinite" : "none",
                        "@keyframes gradientShift": {
                          "0%, 100%": { backgroundPosition: "0% 50%" },
                          "50%": { backgroundPosition: "100% 50%" },
                        },
                      },
                    }}
                  >
                    {/* Decorative Quote Icon */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 30,
                        right: 30,
                        color: "rgba(255,148,114,0.06)",
                        zIndex: 0,
                      }}
                    >
                      <FormatQuoteIcon
                        sx={{
                          fontSize: { xs: 120, md: 150 },
                          transform: "rotate(180deg)",
                        }}
                      />
                    </Box>

                    {/* Content */}
                    <Box sx={{ position: "relative", zIndex: 1 }}>
                      {/* Customer Image and Info - Top Section */}
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                        alignItems="center"
                        sx={{ mb: 4 }}
                      >
                        <Avatar
                          src={testimonial?.image}
                          alt={testimonial?.name}
                          sx={{
                            width: { xs: 100, md: 120 },
                            height: { xs: 100, md: 120 },
                            border: "4px solid rgba(255,148,114,0.2)",
                            boxShadow: "0 8px 30px rgba(255,148,114,0.25)",
                            transition: "all 0.5s ease",
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: "0 12px 40px rgba(255,148,114,0.35)",
                            },
                          }}
                        />
                        <Box sx={{ textAlign: { xs: "center", md: "left" }, flex: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: { xs: "center", md: "flex-start" }, mb: 1 }}>
                            <CustomText
                              sx={{
                                fontSize: { xs: 22, md: 28 },
                                fontWeight: 700,
                                color: "var(--themeColor)",
                              }}
                            >
                              {testimonial?.name}
                            </CustomText>
                            <VerifiedIcon
                              sx={{
                                fontSize: { xs: 20, md: 24 },
                                color: "#4CAF50",
                              }}
                            />
                          </Box>
                          <CustomText
                            sx={{
                              fontSize: { xs: 14, md: 16 },
                              color: "#888",
                              fontWeight: 500,
                              mb: 2,
                            }}
                          >
                            {testimonial?.role}
                          </CustomText>
                          {/* Rating Stars */}
                          <Box
                            sx={{
                              display: "flex",
                              gap: 0.5,
                              justifyContent: { xs: "center", md: "flex-start" },
                            }}
                          >
                            {[...Array(testimonial?.rating)].map((_, i) => (
                              <StarIcon
                                key={i}
                                sx={{
                                  fontSize: { xs: 24, md: 28 },
                                  color: "#FFD700",
                                  filter: "drop-shadow(0 2px 4px rgba(255,215,0,0.4))",
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                      </Stack>

                      {/* Testimonial Comment */}
                      <Box
                        sx={{
                          position: "relative",
                          pl: { xs: 2, md: 3 },
                          borderLeft: "4px solid rgba(255,148,114,0.3)",
                        }}
                      >
                        <FormatQuoteIcon
                          sx={{
                            fontSize: { xs: 40, md: 50 },
                            color: "rgba(255,148,114,0.3)",
                            position: "absolute",
                            top: -10,
                            left: -5,
                          }}
                        />
                        <CustomText
                          sx={{
                            fontSize: { xs: 16, md: 20 },
                            color: "#444",
                            lineHeight: 1.8,
                            fontStyle: "italic",
                            fontWeight: 400,
                            pt: 2,
                          }}
                        >
                          {testimonial?.comment}
                        </CustomText>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </CustomCarousel>
          )}

          {/* Custom Dots */}
          <Box
            sx={{
              display: hasTestimonials ? "flex" : "none",
              justifyContent: "center",
              gap: 1.5,
              mt: 5,
              "& .slick-dots": {
                position: "relative",
                bottom: "auto",
                display: "flex !important",
                justifyContent: "center",
                gap: 1.5,
                "& li": {
                  width: "auto",
                  height: "auto",
                  margin: 0,
                  "& button": {
                    width: { xs: 40, md: 50 },
                    height: { xs: 6, md: 8 },
                    padding: 0,
                    borderRadius: "10px",
                    backgroundColor: "rgba(255,148,114,0.25)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:before": {
                      display: "none",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(255,148,114,0.5)",
                      transform: "scaleY(1.3)",
                    },
                  },
                  "&.slick-active button": {
                    backgroundColor: "#FF9472",
                    width: { xs: 50, md: 70 },
                    boxShadow: "0 0 20px rgba(255,148,114,0.6)",
                    transform: "scaleY(1.2)",
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
