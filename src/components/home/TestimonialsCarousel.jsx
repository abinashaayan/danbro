import { Box, Container, Avatar, Button } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import { CustomCarousel, CustomCarouselArrow } from "../comman/CustomCarousel";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect, useRef } from "react";
import StarIcon from "@mui/icons-material/Star";
import user1 from "../../assets/174fadede8628f65c914092552741f716b9b8039.jpg";
import { getAllReviews } from "../../utils/apiService";
import { Link } from "react-router-dom";

const mapReviewToTestimonial = (r) => ({
  id: r?._id,
  name: r?.user?.name ?? "Customer",
  role: r?.product?.name ?? "Customer",
  rating: typeof r?.rating === "number" ? Math.min(5, Math.max(1, r.rating)) : 5,
  comment: r?.review ?? "",
  image: user1,
});

const TestimonialCard = ({ item }) => (
  <Box
    className="testimonial-card"
    sx={{
      borderRadius: "40px",
      padding: "30px 23px",
      background: "var(--themeColor)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      minHeight: 320,
      height: "100%",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: "0 12px 40px rgba(95, 41, 48, 0.35)",
      },
    }}
  >
    <Box
      className="testimonial-avatar-wrap"
      sx={{
        width: 100,
        height: 70,
        position: "relative",
        mb: 2,
      }}
    >
      <Avatar
        src={item?.image}
        alt={item?.name}
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 100,
          height: 100,
          border: "3px solid rgba(255,255,255,0.3)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      />
    </Box>
    <CustomText
      className="testimonial-text"
      sx={{
        color: "#fff",
        fontSize: 16,
        fontWeight: 400,
        maxWidth: 330,
        mx: "auto",
        mb: 3,
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        lineHeight: 1.6,
      }}
    >
      {item?.comment || "Great experience with Danbro!"}
    </CustomText>
    <CustomText
      className="testimonial-name"
      sx={{
        color: "#fff",
        fontSize: 16,
        fontWeight: 700,
        mb: 2.5,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          left: -23,
          top: "50%",
          transform: "translateY(-50%)",
          width: 20,
          height: 1,
          backgroundColor: "#fff",
        },
      }}
    >
      {item?.name}
    </CustomText>
    <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
      {[...Array(item?.rating || 5)].map((_, i) => (
        <StarIcon key={i} sx={{ fontSize: 20, color: "#D4B754" }} />
      ))}
    </Box>
  </Box>
);

export const TestimonialsCarousel = () => {
  const carouselRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);

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
      })
      .catch(() => setTestimonials([]));
    return () => { cancelled = true; };
  }, []);

  const hasMore = testimonials.length > 4;

  return (
    <Box id="testimonials" sx={{ py: { xs: 4, md: 6 }, position: "relative" }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            textAlign: "center",
            position: "relative",
            mb: { xs: 2, md: 4 },
            "&::before": {
              content: '""',
              position: "absolute",
              left: { xs: "15%", md: "18%" },
              top: 22,
              width: { xs: 45, md: 141 },
              height: 2,
              backgroundColor: "#D4B754",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              right: { xs: "15%", md: "18%" },
              top: 22,
              width: { xs: 45, md: 141 },
              height: 2,
              backgroundColor: "#D4B754",
            },
          }}
        >
          <CustomText
            sx={{
              fontSize: { xs: 32, md: 40 },
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              color: "var(--themeColor)",
              lineHeight: 1.2,
              position: "relative",
            }}
          >
            What Our Customers Say
          </CustomText>
        </Box>

        {testimonials.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8, color: "#666" }}>
            <CustomText>Loading testimonials...</CustomText>
          </Box>
        ) : (
          <>
            <Box sx={{ position: "relative", mb: hasMore ? 4 : 0 }}>
              {testimonials.length > 4 && (
                <>
                  <CustomCarouselArrow direction="prev" onClick={() => carouselRef.current?.handlePrev()} sx={{ left: { xs: -8, md: -24 } }}>
                    <ArrowBackIosNewIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                  </CustomCarouselArrow>
                  <CustomCarouselArrow direction="next" onClick={() => carouselRef.current?.handleNext()} sx={{ right: { xs: -8, md: -24 } }}>
                    <ArrowForwardIosIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                  </CustomCarouselArrow>
                </>
              )}
              <CustomCarousel
                ref={carouselRef}
                slidesToShow={4}
                slidesToScroll={1}
                infinite={testimonials.length > 4}
                speed={500}
                arrows={false}
                dots={true}
                autoplay={true}
                autoplaySpeed={4000}
                pauseOnHover={true}
                responsive={[
                  { breakpoint: 1200, settings: { slidesToShow: 3 } },
                  { breakpoint: 900, settings: { slidesToShow: 2 } },
                  { breakpoint: 600, settings: { slidesToShow: 1 } },
                ]}
              >
                {testimonials.map((item) => (
                  <Box key={item?.id} sx={{ px: 1.5 }}>
                    <TestimonialCard item={item} />
                  </Box>
                ))}
              </CustomCarousel>
            </Box>

            {hasMore && (
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Button
                  component={Link}
                  to="/reviews"
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: "var(--themeColor)",
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: "0 4px 14px rgba(95, 41, 48, 0.3)",
                    "&:hover": {
                      bgcolor: "var(--specialColor)",
                      boxShadow: "0 6px 20px rgba(95, 41, 48, 0.4)",
                    },
                  }}
                >
                  View All ({testimonials.length} reviews)
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};
