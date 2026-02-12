import { Box, IconButton, CircularProgress } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import MessageIcon from "@mui/icons-material/Message";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import CakeIcon from "@mui/icons-material/Cake";
import ShieldIcon from "@mui/icons-material/Shield";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TagIcon from "@mui/icons-material/Tag";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link, useNavigate } from "react-router-dom";
import { getAllReviews } from "../../utils/apiService";
import "./TestimonialsCarousel.css";
import GradientBg from "../../assets/Group_906.webp";

const BRAND_COLOR = "#5F2930";

// Helper function to get initials from name
const getInitials = (name) => {
  if (!name) return "CU";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "Recently";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return "Recently";
  }
};

// Helper function to truncate ID
const truncateId = (id) => {
  if (!id) return "—";
  const str = String(id);
  if (str.length <= 12) return str;
  return `${str.substring(0, 8)}…${str.substring(str.length - 4)}`;
};

// Map review data to testimonial format
const mapReviewToTestimonial = (r) => ({
  id: r?._id || r?.id,
  name: r?.user?.name || "Customer",
  email: r?.user?.email || r?.email || "customer@example.com",
  rating: typeof r?.rating === "number" ? Math.min(5, Math.max(1, r.rating)) : 5,
  comment: r?.review || r?.comment || "",
  productName: r?.product?.name || r?.productName || "Product",
  date: r?.createdAt || r?.date || new Date().toISOString(),
  verified: true,
});

// Testimonial Card Component
const TestimonialCard = ({ item }) => {
  const rating = item?.rating || 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <Box
      className="testimonial-card-modern"
      sx={{
        flex: "0 0 auto",
        width: { xs: 280, sm: 340 },
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRadius: "40px",
        padding: "1.5rem 1.25rem 1.25rem",
        position: "relative",
        transition: "all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1)",
        border: "1px solid rgba(255, 255, 255, 0.6)",
        boxShadow: "0 20px 40px -20px rgba(95, 41, 48, 0.12)",
        display: "flex",
        flexDirection: "column",
        transformOrigin: "center",
        "&:hover": {
          background: "rgba(255, 255, 255, 0.9)",
          border: "1px solid rgba(95, 41, 48, 0.25)",
          boxShadow: "0 36px 56px -20px rgba(95, 41, 48, 0.25), inset 0 0 0 2px rgba(255,255,255,0.8)",
          transform: "translateY(-10px) scale(1.01)",
          "& .quote-icon-3d": {
            WebkitTextStroke: "2px rgba(95,41,48,0.3)",
            transform: "scale(1.08) rotate(2deg)",
          },
          "& .avatar-liquid": {
            background: BRAND_COLOR,
            color: "white",
            borderRadius: "48% 52% 38% 62% / 44% 52% 48% 56%",
            transform: "scale(0.96) rotate(4deg)",
          },
          "& .product-tag-modern": {
            background: BRAND_COLOR,
            color: "white",
            borderColor: BRAND_COLOR,
            boxShadow: "6px 6px 0 #281c19",
            "& .tag-icon": {
              color: "white",
            },
          },
          "& .card-glow": {
            opacity: 1,
          },
        },
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "40px",
          background: "radial-gradient(circle at 80% 0%, rgba(95, 41, 48, 0.08) 0%, transparent 60%)",
          opacity: 0,
          transition: "opacity 0.5s",
          pointerEvents: "none",
        },
        "&:hover::before": {
          opacity: 1,
        },
      }}
    >
      {/* Floating orbs */}
      <Box
        className="card-glow"
        sx={{
          position: "absolute",
          top: "-30px",
          right: "-20px",
          width: "150px",
          height: "150px",
          background: "radial-gradient(circle at 30% 30%, rgba(95,41,48,0.1), transparent 80%)",
          borderRadius: "50%",
          filter: "blur(45px)",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.5s",
        }}
      />

      {/* Kinetic dots */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          left: "8%",
          width: "8px",
          height: "8px",
          background: BRAND_COLOR,
          opacity: 0.2,
          borderRadius: "50%",
          filter: "blur(2px)",
          animation: "kineticMove 8s infinite alternate",
          "@keyframes kineticMove": {
            "0%": { transform: "translate(0, 0) scale(1)" },
            "100%": { transform: "translate(-18px, -22px) scale(1.8)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          right: "12%",
          width: "14px",
          height: "14px",
          background: BRAND_COLOR,
          opacity: 0.15,
          borderRadius: "50%",
          filter: "blur(2px)",
          animation: "kineticMove2 8s infinite alternate",
          "@keyframes kineticMove2": {
            "0%": { transform: "translate(0, 0) scale(1)" },
            "100%": { transform: "translate(18px, -22px) scale(1.8)" },
          },
        }}
      />

      {/* Quote icon */}
      <Box
        className="quote-icon-3d"
        sx={{
          position: "absolute",
          top: "16px",
          right: "20px",
          fontSize: "3rem",
          fontWeight: 800,
          fontFamily: "'Playfair Display', serif",
          lineHeight: 1,
          WebkitTextStroke: "2px rgba(95,41,48,0.15)",
          color: "transparent",
          textShadow: "0 6px 14px rgba(95,41,48,0.05)",
          transition: "all 0.2s",
          zIndex: 1,
        }}
      >
        ''
      </Box>

      {/* User section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "1rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Avatar */}
        <Box
          className="avatar-liquid testimonial-avatar"
          sx={{
            width: 52,
            height: 52,
            background: "linear-gradient(145deg, #f7eae6, #f0dbd2)",
            borderRadius: "38% 62% 42% 58% / 56% 44% 56% 44%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: BRAND_COLOR,
            fontSize: "1.25rem",
            fontWeight: 600,
            transition: "all 0.4s",
            boxShadow: "0 12px 20px -10px rgba(95,41,48,0.25)",
            border: "2px solid rgba(255,255,255,0.9)",
            flexShrink: 0,
          }}
        >
          {getInitials(item.name)}
        </Box>

        {/* User details */}
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" },
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              color: "#1f1614",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexWrap: "wrap",
            }}
          >
            {item.name}
            {item.verified && (
              <Box
                sx={{
                  background: BRAND_COLOR,
                  color: "white",
                  borderRadius: "100px",
                  padding: "0.2rem 0.5rem",
                  fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
                  fontWeight: 700,
                  display: "inline-flex",
                  gap: "4px",
                  alignItems: "center",
                }}
              >
                <CheckCircleIcon sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }} />
                VERIFIED
              </Box>
            )}
          </Box>
          <Box
            sx={{
              fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
              color: "#9a7d74",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "4px",
              background: "rgba(255,255,255,0.5)",
              padding: "0.25rem 0.9rem",
              borderRadius: "60px",
              width: "fit-content",
              backdropFilter: "blur(4px)",
            }}
          >
            <EmailIcon sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" } }} />
            {item.email}
          </Box>
        </Box>
      </Box>

      {/* Product tag */}
      <Box
        className="product-tag-modern"
        sx={{
          background: "#ffffff",
          border: "1.5px solid #281c19",
          padding: "0.45rem 1rem",
          borderRadius: "32px 32px 32px 6px",
          fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
          fontWeight: 700,
          color: "#281c19",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "1rem",
          width: "fit-content",
          transition: "all 0.25s",
          boxShadow: "3px 3px 0 #5F2930",
        }}
      >
        <CakeIcon className="tag-icon" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: BRAND_COLOR, transition: "color 0.2s" }} />
        (ORD) {item.productName.toUpperCase()}
      </Box>

      {/* Rating */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(8px)",
          padding: "0.3rem 0.75rem 0.3rem 0.9rem",
          borderRadius: "80px",
          width: "fit-content",
          marginBottom: "0.9rem",
          border: "1px solid rgba(95,41,48,0.1)",
        }}
      >
        <Box sx={{ display: "flex", gap: "3px", color: "#ffb83b", fontSize: "0.85rem" }}>
          {[...Array(fullStars)].map((_, i) => (
            <StarIcon key={i} sx={{ fontSize: "0.85rem" }} />
          ))}
          {hasHalfStar && <StarHalfIcon sx={{ fontSize: "0.85rem" }} />}
          {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
            <StarIcon key={`empty-${i}`} sx={{ fontSize: "0.85rem", color: "#ddd" }} />
          ))}
        </Box>
        <Box
          sx={{
            fontWeight: 800,
            background: "white",
            padding: "0.15rem 0.5rem",
            borderRadius: "60px",
            fontSize: "0.7rem",
            color: BRAND_COLOR,
            border: "1px solid rgba(95,41,48,0.2)",
          }}
        >
          {rating.toFixed(1)}
        </Box>
      </Box>

      {/* Review text */}
      <Box
        className="review-text-scrollable"
        sx={{
          fontSize: { xs: "0.82rem", sm: "0.88rem", md: "0.92rem" },
          lineHeight: 1.48,
          fontWeight: 450,
          color: "#2d2623",
          marginBottom: "1rem",
          position: "relative",
          zIndex: 2,
          fontStyle: "italic",
          letterSpacing: "-0.01em",
          paddingRight: "0.4rem",
          maxHeight: "100px",
          overflowY: "auto",
          transition: "color 0.2s",
          borderLeft: "3px solid #5F2930",
          paddingLeft: "0.9rem",
        }}
      >
        "{item.comment}"
      </Box>

      {/* Meta info */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "0.6rem",
          paddingTop: "1rem",
          borderTop: "2px dotted rgba(95,41,48,0.15)",
          fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
          fontWeight: 600,
          color: "#6c4e46",
          textTransform: "uppercase",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <Box
          sx={{
            background: "#f3eae7",
            padding: "0.4rem 1.1rem",
            borderRadius: "60px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            letterSpacing: "0.5px",
          }}
        >
          <TagIcon sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" } }} />
          {truncateId(item.id)}
        </Box>
        <Box
          sx={{
            background: "#f3eae7",
            padding: "0.4rem 1.1rem",
            borderRadius: "60px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <CalendarTodayIcon sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" } }} />
          {formatDate(item.date)}
        </Box>
      </Box>
    </Box>
  );
};

export const TestimonialsCarousel = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getAllReviews()
      .then((data) => {
        if (cancelled) return;
        const list = (Array.isArray(data) ? data : [])
          .filter((r) => (r?.status || "").toLowerCase() === "approved")
          .map(mapReviewToTestimonial)
          .filter((t) => t.comment?.trim());
        setTestimonials(list);
      })
      .catch(() => setTestimonials([]))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const scrollCarousel = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollAmount = 430;
    el.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  if (loading) {
    return (
      <Box
        sx={{
          py: { xs: 2, md: 6 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
        }}
      >
        <CircularProgress sx={{ color: BRAND_COLOR }} />
      </Box>
    );
  }

  if (testimonials?.length === 0) {
    return null;
  }

  return (
    <Box id="testimonials" sx={{ py: { xs: 1.5, md: 3 }, mb: 0, backgroundImage: `url(${GradientBg})`, position: "relative" }}>
      <Box sx={{ width: "100%", margin: "0 auto", px: { xs: 0, md: 3 } }}>
        <Box
          className="testimonials-header"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "center" },
            justifyContent: "space-between",
            marginBottom: { xs: "1.5rem", md: "2rem" },
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <Box className="testimonials-title-wrapper" sx={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", flex: 1, justifyContent: { xs: "space-between", md: "flex-start" }, width: { xs: "100%", md: "auto" } }}>
            <Box
              component="h2"
              className="testimonials-title"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontSize: { xs: "1.2rem", sm: "1.35rem", md: "1.5rem", lg: "1.65rem" },
                fontWeight: 700,
                color: "#281c19",
                letterSpacing: "-0.03em",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: 0,
                flex: 1,
              }}
            >
              <Box
                className="testimonials-title-icon"
                sx={{
                  color: BRAND_COLOR,
                  fontSize: { xs: "1.2rem", sm: "1.35rem", md: "1.5rem" },
                  background: "white",
                  padding: "0.45rem",
                  borderRadius: "100px",
                  boxShadow: "0 6px 14px rgba(95,41,48,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MessageIcon sx={{ fontSize: "inherit" }} />
              </Box>
              What Our Customers Say
            </Box>
          </Box>
          <Box className="testimonials-badge-arrows-row" sx={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "space-between", width: { xs: "100%", md: "auto" } }}>
            <Link to="/reviews" style={{ textDecoration: "none" }}>
              <Box
                component="button"
                type="button"
                sx={{
                  borderRadius: "999px",
                  border: "1px solid rgba(95,41,48,0.15)",
                  background: "#ffffff",
                  px: 1.8,
                  py: 0.6,
                  fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                  fontWeight: 600,
                  color: BRAND_COLOR,
                  cursor: "pointer",
                  boxShadow: "0 8px 18px -6px rgba(95,41,48,0.2)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    background: BRAND_COLOR,
                    color: "#ffffff",
                    boxShadow: "0 12px 24px -8px rgba(95,41,48,0.4)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                View all reviews
              </Box>
            </Link>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <IconButton
                className="testimonials-nav-btn"
                onClick={() => scrollCarousel("left")}
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "100px",
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.8)",
                  color: BRAND_COLOR,
                  boxShadow: "0 8px 16px rgba(0,0,0,0.02)",
                  transition: "all 0.25s",
                  "&:hover": {
                    background: BRAND_COLOR,
                    color: "white",
                    borderColor: BRAND_COLOR,
                    transform: "scale(1.08) rotate(360deg)",
                  },
                }}
              >
                <ArrowBackIosNewIcon sx={{ fontSize: "1rem" }} />
              </IconButton>
              <IconButton
                className="testimonials-nav-btn"
                onClick={() => scrollCarousel("right")}
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "100px",
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.8)",
                  color: BRAND_COLOR,
                  boxShadow: "0 8px 16px rgba(0,0,0,0.02)",
                  transition: "all 0.25s",
                  "&:hover": {
                    background: BRAND_COLOR,
                    color: "white",
                    borderColor: BRAND_COLOR,
                    transform: "scale(1.08) rotate(360deg)",
                  },
                }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: "1rem" }} />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Carousel */}
        <Box
          ref={carouselRef}
          className="testimonials-carousel"
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: { xs: "1.2rem", md: "1.5rem" },
            padding: { xs: "0.75rem 0.4rem 1.5rem", md: "1rem 0.5rem 2rem" },
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {testimonials
            ?.slice(0, 6)
            .map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
        </Box>

        {/* Stats */}
        <Box
          className="testimonials-stats"
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: { xs: "1rem", md: "1.25rem" },
            gap: { xs: "10px", md: "12px" },
            fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
            flexWrap: "wrap",
          }}
        >
          <Box
            className="testimonials-stat-badge"
            sx={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(8px)",
              padding: { xs: "0.3rem 1rem", sm: "0.35rem 1.2rem", md: "0.4rem 1.4rem" },
              borderRadius: "60px",
              border: "1px solid rgba(255,255,255,0.7)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <ShieldIcon sx={{ color: BRAND_COLOR, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" } }} />
            100% verified purchases
          </Box>
          <Box
            className="testimonials-stat-badge"
            sx={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(8px)",
              padding: { xs: "0.3rem 1rem", sm: "0.35rem 1.2rem", md: "0.4rem 1.4rem" },
              borderRadius: "60px",
              border: "1px solid rgba(255,255,255,0.7)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <AccessTimeIcon sx={{ color: BRAND_COLOR, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" } }} />
            live from bakery
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
