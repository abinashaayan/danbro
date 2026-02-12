import { Box, Container, Breadcrumbs, Link, Typography } from "@mui/material";
import { ReviewsListSkeleton } from "../../components/comman/Skeletons";
import { CustomText } from "../../components/comman/CustomText";
import { useState, useEffect, useMemo } from "react";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HomeIcon from "@mui/icons-material/Home";
import RateReviewIcon from "@mui/icons-material/RateReview";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { getAllReviews } from "../../utils/apiService";
import { Link as RouterLink } from "react-router-dom";
import "./AllReviews.css";

const mapReview = (r) => ({
  id: r?._id,
  name: r?.user?.name ?? "Customer",
  productName: r?.product?.name ?? "",
  rating: typeof r?.rating === "number" ? Math.min(5, Math.max(1, r.rating)) : 5,
  comment: r?.review ?? "",
  createdAt: r?.createdAt,
});

export const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStar, setFilterStar] = useState("all");
  const [activeChip, setActiveChip] = useState("all");
  const [sortBy, setSortBy] = useState("recent"); // recent | high | low

  useEffect(() => {
    let cancelled = false;
    getAllReviews()
      .then((data) => {
        if (cancelled) return;
        const list = (Array.isArray(data) ? data : [])
          .filter((r) => (r?.status || "").toLowerCase() === "approved")
          .map(mapReview)
          .filter((t) => t.comment?.trim());
        setReviews(list);
      })
      .catch(() => setReviews([]))
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const totalReviews = reviews.length;

  // Overall average rating (all reviews)
  const averageRating = useMemo(() => {
    if (!totalReviews) return 0;
    const sum = reviews.reduce((s, r) => s + r.rating, 0);
    return (sum / totalReviews).toFixed(1);
  }, [reviews, totalReviews]);

  // Star distribution for breakdown
  const starBreakdown = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const star = Math.round(r.rating);
      if (counts[star] != null) counts[star] += 1;
    });
    return [5, 4, 3, 2, 1].map((star) => {
      const count = counts[star];
      const percent = totalReviews ? Math.round((count / totalReviews) * 100) : 0;
      return { star, count, percent };
    });
  }, [reviews, totalReviews]);

  // Filter + sort pipeline for visible list
  const filteredSortedReviews = useMemo(() => {
    let list = reviews;

    if (filterStar !== "all") {
      const star = Number(filterStar);
      list = list.filter((r) => r.rating === star);
    }

    if (sortBy === "recent") {
      list = [...list].sort((a, b) => {
        const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return db - da;
      });
    } else if (sortBy === "high") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "low") {
      list = [...list].sort((a, b) => a.rating - b.rating);
    }

    return list;
  }, [reviews, filterStar, sortBy]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  };

  const getInitials = (name) => {
    if (!name) return "CU";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pb: { xs: 4, sm: 6, md: 8 },
        pt: { xs: 2, sm: 3, md: 5 },
        px: { xs: 0, sm: 2, md: 3 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 0, sm: 2, md: 3 },
          maxWidth: { xs: "100%", sm: 720, md: 960, lg: 1280 },
        }}
      >
        {/* Breadcrumb with icons */}
        <Breadcrumbs
          separator={<NavigateNextIcon sx={{ fontSize: { xs: 16, sm: 18 }, color: "#9b8680" }} />}
          sx={{
            mb: { xs: 1.5, sm: 2, md: 2.5 },
            "& .MuiBreadcrumbs-ol": { flexWrap: "wrap" },
            "& .MuiBreadcrumbs-li": { display: "flex", alignItems: "center" },
          }}
        >
          <Link
            component={RouterLink}
            to="/"
            underline="hover"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 0.75 },
              color: "#6a5650",
              fontSize: { xs: "0.8rem", sm: "0.875rem", md: "0.9rem" },
              fontWeight: 600,
              textDecoration: "none",
              "&:hover": { color: "#5F2930" },
            }}
          >
            <HomeIcon sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" }, color: "inherit" }} />
            Home
          </Link>
          <Typography
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 0.75 },
              color: "#5F2930",
              fontSize: { xs: "0.8rem", sm: "0.875rem", md: "0.9rem" },
              fontWeight: 700,
            }}
          >
            <RateReviewIcon sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" }, color: "inherit" }} />
            All Reviews
          </Typography>
        </Breadcrumbs>

        <Box
          className="all-reviews-container"
          sx={{
            width: "100%",
            mx: "auto",
            background: "#ffffff",
            borderRadius: { xs: "24px", sm: "40px", md: "56px" },
            boxShadow: "0 24px 48px -16px rgba(95, 41, 48, 0.12)",
            p: { xs: 1.5, sm: 2, md: 2.8 },
            border: "1px solid rgba(95, 41, 48, 0.06)",
          }}
        >
          {/* Header: title + product badge */}
          <Box
            className="reviews-master-header"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "baseline" },
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: { xs: 1.5, sm: 1.8 },
              mb: { xs: 2, md: 2.5 },
            }}
          >
            <Box
              className="reviews-title-block"
              sx={{ display: "flex", alignItems: "center", gap: { xs: 1.25, sm: 2 }, flex: "1 1 auto" }}
            >
              <Box
                sx={{
                  color: "#5F2930",
                  background: "#fef5f2",
                  p: { xs: 0.75, sm: 1 },
                  borderRadius: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <StarIcon sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "1.8rem" } }} />
              </Box>
              <CustomText
                component="h1"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: { xs: "1.5rem", sm: "1.85rem", md: "2.2rem", lg: "2.4rem" },
                  fontWeight: 700,
                  color: "#2d1e1b",
                  letterSpacing: "-0.02em",
                }}
              >
                All Reviews
              </CustomText>
            </Box>

            <Box
              className="product-context-badge"
              sx={{
                background: "#f0eae8",
                py: { xs: 0.5, sm: 0.6 },
                px: { xs: 1.2, sm: 1.6 },
                borderRadius: "60px",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
                fontWeight: 600,
                color: "#5F2930",
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                flexWrap: "wrap",
              }}
            >
              Verified reviews across{" "}
              <Box component="span" sx={{ fontWeight: 700 }}>all Danbro favourites</Box>
              <Box
                component="span"
                className="total-count-pill"
                sx={{
                  background: "#ffffff",
                  py: 0.2,
                  px: 0.75,
                  borderRadius: "60px",
                  fontSize: { xs: 10, sm: 11 },
                  ml: 0.5,
                }}
              >
                Total: {totalReviews}
              </Box>
            </Box>
          </Box>

          {loading ? (
            <ReviewsListSkeleton count={6} />
          ) : totalReviews === 0 ? (
            <Box
              className="empty-reviews-state"
              sx={{
                background: "#fdfaf8",
                borderRadius: { xs: "24px", md: "48px" },
                py: { xs: 4, md: 6 },
                px: { xs: 1.5, sm: 2, md: 4 },
                textAlign: "center",
                border: "2px dashed rgba(95,41,48,0.1)",
              }}
            >
              <Box
                className="empty-icon"
                sx={{ fontSize: { xs: "3rem", md: "4rem" }, color: "rgba(95,41,48,0.2)", mb: 1.5 }}
              >
                <StarIcon sx={{ fontSize: "inherit" }} />
              </Box>
              <CustomText
                sx={{
                  fontSize: { xs: "1.35rem", md: "1.6rem" },
                  fontWeight: 600,
                  color: "#5a4a45",
                  mb: 1,
                }}
              >
                No reviews yet
              </CustomText>
              <CustomText
                sx={{
                  color: "#8b756e",
                  maxWidth: 500,
                  mx: "auto",
                  mb: 3,
                  fontSize: { xs: "0.9rem", md: "1rem" },
                }}
              >
                Be the first one to review and share your experience with the Danbro Bakery
                community.
              </CustomText>
              <Box
                component="button"
                type="button"
                sx={{
                  background: "#5F2930",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "60px",
                  px: { xs: 2.5, md: 3 },
                  py: { xs: 0.9, md: 1.1 },
                  fontWeight: 700,
                  fontSize: { xs: "0.875rem", md: "0.95rem" },
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  boxShadow: "0 18px 30px -12px rgba(95,41,48,0.3)",
                  "&:hover": { background: "#7a3f48" },
                }}
              >
                Write the first review
              </Box>
            </Box>
          ) : (
            <>
              {/* Overall rating summary card */}
              <Box
                className="rating-summary-card"
                sx={{
                  background: "linear-gradient(105deg, #fffaf8 0%, #fffdfc 100%)",
                  borderRadius: { xs: "24px", sm: "32px", md: "48px" },
                  px: { xs: 1.5, sm: 2, md: 3 },
                  py: { xs: 1.5, sm: 2, md: 2.6 },
                  mb: { xs: 2, md: 2.8 },
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "stretch", md: "center" },
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: { xs: 1.5, sm: 2 },
                  border: "1px solid rgba(95, 41, 48, 0.08)",
                  boxShadow: "0 12px 24px -10px rgba(95,41,48,0.06)",
                }}
              >
                <Box
                  className="rating-overview-large"
                  sx={{ display: "flex", alignItems: "center", gap: { xs: 2, sm: 3 }, flexWrap: "wrap" }}
                >
                  <Box
                    className="average-circle"
                    sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "flex-start", sm: "center" } }}
                  >
                    <Box
                      className="big-rating"
                      sx={{
                        fontSize: { xs: "2.5rem", sm: "3rem", md: "3.4rem" },
                        fontWeight: 800,
                        color: "#5F2930",
                        lineHeight: 1,
                      }}
                    >
                      {averageRating}
                    </Box>
                    <Box
                      className="rating-stars-large"
                      sx={{
                        color: "#ffb83b",
                        mt: 0.4,
                        display: "flex",
                        gap: 0.25,
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((i) => (
                        <StarIcon key={i} sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" } }} />
                      ))}
                    </Box>
                    <CustomText
                      className="total-reviews-large"
                      sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem", md: "0.95rem" }, color: "#6a5650", fontWeight: 500, mt: 0.5 }}
                    >
                      based on {totalReviews} reviews
                    </CustomText>
                  </Box>

                  <Box
                    className="rating-breakdown"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.75,
                      minWidth: { xs: "100%", sm: 200, md: 220 },
                      flex: { xs: "1 1 100%", md: "0 0 auto" },
                    }}
                  >
                    {starBreakdown.map(({ star, percent }) => (
                      <Box
                        key={star}
                        className="breakdown-row"
                        sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 } }}
                      >
                        <Box
                          className="breakdown-star"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            width: { xs: 48, sm: 60 },
                            fontSize: { xs: "0.8rem", sm: "0.9rem" },
                            fontWeight: 600,
                            color: "#5a4a45",
                          }}
                        >
                          {star}
                          <StarIcon sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" }, color: "#ffb83b" }} />
                        </Box>
                        <Box
                          className="breakdown-bar-bg"
                          sx={{
                            flex: 1,
                            height: { xs: 6, sm: 8 },
                            background: "#f0e2df",
                            borderRadius: 20,
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            className="breakdown-bar-fill"
                            sx={{
                              height: "100%",
                              background: "#5F2930",
                              borderRadius: 20,
                              width: `${percent}%`,
                              transition: "width 0.4s ease",
                            }}
                          />
                        </Box>
                        <Box
                          className="breakdown-percent"
                          sx={{
                            fontSize: { xs: "0.75rem", sm: "0.85rem" },
                            fontWeight: 600,
                            color: "#5F2930",
                            minWidth: { xs: 36, sm: 45 },
                            textAlign: "right",
                          }}
                        >
                          {percent}%
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box
                  component="button"
                  type="button"
                  sx={{
                    background: "#5F2930",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "60px",
                    px: { xs: 2, md: 2.5 },
                    py: { xs: 0.75, md: 1 },
                    fontWeight: 700,
                    fontSize: { xs: "0.8rem", sm: "0.875rem", md: "0.95rem" },
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.75,
                    cursor: "pointer",
                    boxShadow: "0 12px 24px -8px rgba(95,41,48,0.3)",
                    alignSelf: { xs: "stretch", sm: "center", md: "center" },
                    "&:hover": { background: "#7a3f48" },
                  }}
                >
                  Write a review
                </Box>
              </Box>

              {/* Filter & sort bar */}
              <Box
                className="reviews-filter-bar"
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "stretch", sm: "center" },
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: { xs: 1.2, sm: 1.5 },
                  mb: { xs: 1.8, md: 2.2 },
                }}
              >
                <Box className="filter-group" sx={{ display: "flex", gap: { xs: 0.6, sm: 1 }, flexWrap: "wrap" }}>
                  {[
                    { key: "all", label: "All reviews" },
                    { key: "5", label: "5 star" },
                    { key: "4", label: "4 star" },
                    { key: "3", label: "3 star" },
                  ].map((chip) => {
                    const isActive = activeChip === chip.key;
                    return (
                      <Box
                        key={chip.key}
                        component="button"
                        type="button"
                        className="all-reviews-filter-chip"
                        onClick={() => {
                          setActiveChip(chip.key);
                          setFilterStar(chip.key === "all" ? "all" : chip.key);
                        }}
                        sx={{
                          background: isActive ? "#5F2930" : "#ffffff",
                          border: "1px solid rgba(95, 41, 48, 0.15)",
                          borderRadius: "60px",
                          py: { xs: 0.5, sm: 0.6 },
                          px: { xs: 1, sm: 1.5 },
                          fontSize: { xs: "0.75rem", sm: "0.85rem" },
                          fontWeight: 600,
                          color: isActive ? "#ffffff" : "#5a4a45",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        {chip.label}
                      </Box>
                    );
                  })}
                </Box>
                <Box
                  className="sort-group"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    background: "#faf1ef",
                    p: 0.35,
                    borderRadius: "60px",
                    width: { xs: "100%", sm: "auto" },
                    justifyContent: { xs: "flex-start", sm: "center" },
                  }}
                >
                  {[
                    { key: "recent", label: "Most recent" },
                    { key: "high", label: "Highest rated" },
                    { key: "low", label: "Lowest rated" },
                  ].map((opt) => {
                    const isActive = sortBy === opt.key;
                    return (
                      <Box
                        key={opt.key}
                        component="button"
                        type="button"
                        className="all-reviews-sort-option"
                        onClick={() => setSortBy(opt.key)}
                        sx={{
                          border: "none",
                          background: isActive ? "#ffffff" : "transparent",
                          color: isActive ? "#5F2930" : "#6a5650",
                          borderRadius: "60px",
                          py: 0.45,
                          px: { xs: 1, sm: 1.4 },
                          fontSize: { xs: "0.75rem", sm: "0.85rem" },
                          fontWeight: 600,
                          cursor: "pointer",
                          boxShadow: isActive ? "0 6px 14px rgba(95,41,48,0.06)" : "none",
                          transition: "all 0.2s",
                        }}
                      >
                        {opt.label}
                      </Box>
                    );
                  })}
                </Box>
              </Box>

              {/* Reviews list */}
              <Box
                className="reviews-grid"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 1.2, sm: 1.5, md: 1.8 },
                  mb: { xs: 2, md: 2.8 },
                }}
              >
                {filteredSortedReviews.map((item) => (
                  <Box
                    key={item?.id}
                    className="review-card"
                    sx={{
                      background: "#ffffff",
                      borderRadius: { xs: "20px", sm: "24px", md: "32px" },
                      px: { xs: 1.25, sm: 1.5, md: 2.4 },
                      py: { xs: 1.25, sm: 1.5, md: 2.2 },
                      border: "1px solid rgba(95, 41, 48, 0.06)",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.01)",
                      transition: "all 0.25s",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        borderColor: "rgba(95, 41, 48, 0.15)",
                        boxShadow: "0 20px 30px -12px rgba(95,41,48,0.08)",
                      },
                    }}
                  >
                    <Box
                      className="review-header"
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", sm: "flex-start" },
                        mb: { xs: 1, md: 1.2 },
                        gap: { xs: 1, sm: 2 },
                      }}
                    >
                      <Box
                        className="reviewer"
                        sx={{ display: "flex", alignItems: "center", gap: { xs: 1.25, sm: 2 } }}
                      >
                        <Box
                          className="reviewer-avatar"
                          sx={{
                            width: { xs: 44, sm: 50, md: 56 },
                            height: { xs: 44, sm: 50, md: 56 },
                            background: "linear-gradient(145deg, #f3eae7, #ecdfdb)",
                            borderRadius: { xs: 2, md: 3 },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#5F2930",
                            fontWeight: 700,
                            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                            textTransform: "uppercase",
                            flexShrink: 0,
                          }}
                        >
                          {getInitials(item?.name)}
                        </Box>
                        <Box className="reviewer-info" sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                          <Box
                            className="reviewer-name-line"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.75,
                              flexWrap: "wrap",
                            }}
                          >
                            <CustomText
                              className="reviewer-name"
                              sx={{
                                fontWeight: 700,
                                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
                                color: "#2d1e1b",
                              }}
                            >
                              {item?.name}
                            </CustomText>
                            <Box
                              className="verified-badge"
                              sx={{
                                background: "#e8f5e9",
                                color: "#2e7d32",
                                fontSize: { xs: "0.65rem", sm: "0.7rem" },
                                py: 0.2,
                                px: 0.6,
                                borderRadius: "60px",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 0.4,
                              }}
                            >
                              <VerifiedIcon sx={{ fontSize: { xs: "0.75rem", sm: "0.9rem" } }} />
                              Verified
                            </Box>
                          </Box>
                          <CustomText
                            className="review-date"
                            sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" }, color: "#9b8680", mt: 0.4 }}
                          >
                            {formatDate(item?.createdAt)}
                            {item?.productName ? ` • ${item.productName}` : ""}
                          </CustomText>
                        </Box>
                      </Box>

                      <Box
                        className="review-rating"
                        sx={{
                          color: "#ffb83b",
                          letterSpacing: "2px",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.75,
                          flexShrink: 0,
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((i) => (
                          <StarIcon
                            key={i}
                            sx={{
                              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "0.95rem" },
                              color: i <= Math.round(item?.rating || 0) ? "#ffb83b" : "#e0d3cf",
                            }}
                          />
                        ))}
                        <Box
                          className="rating-number-small"
                          sx={{
                            background: "#f7efed",
                            py: 0.2,
                            px: 0.5,
                            borderRadius: "60px",
                            fontSize: { xs: "0.7rem", sm: "0.75rem" },
                            fontWeight: 700,
                            color: "#5F2930",
                          }}
                        >
                          {(item?.rating || 0).toFixed(1)}
                        </Box>
                      </Box>
                    </Box>

                    <CustomText
                      className="review-title"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
                        color: "#2d1e1b",
                        mb: 0.5,
                      }}
                    >
                      {item?.productName || "Customer review"}
                    </CustomText>

                    <CustomText
                      className="review-content"
                      sx={{
                        color: "#5a4a45",
                        lineHeight: 1.6,
                        fontSize: { xs: "0.875rem", sm: "0.9rem", md: "0.98rem" },
                        mb: { xs: 1, md: 1.4 },
                      }}
                    >
                      {item?.comment}
                    </CustomText>

                    <Box
                      className="review-footer"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderTop: "1px solid rgba(95, 41, 48, 0.06)",
                        pt: { xs: 1, md: 1.2 },
                        mt: 0.5,
                        flexWrap: "wrap",
                        gap: { xs: 0.75, sm: 1 },
                      }}
                    >
                      <Box
                        className="helpful-section"
                        sx={{ display: "flex", alignItems: "center", gap: { xs: 0.75, sm: 1.2 } }}
                      >
                        <Box
                          component="button"
                          type="button"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            background: "#faf1ef",
                            py: 0.4,
                            px: { xs: 0.9, sm: 1.2 },
                            borderRadius: "60px",
                            fontSize: { xs: "0.7rem", sm: "0.8rem" },
                            fontWeight: 600,
                            color: "#5a4a45",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            "&:hover": { background: "#5F2930", color: "#ffffff" },
                          }}
                        >
                          <ThumbUpOffAltIcon sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }} />
                          Helpful
                        </Box>
                        <Box
                          component="button"
                          type="button"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            fontSize: { xs: "0.7rem", sm: "0.8rem" },
                            fontWeight: 600,
                            color: "#6a5650",
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                        >
                          <ChatBubbleOutlineIcon sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }} />
                          Reply
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          fontSize: { xs: "0.65rem", sm: "0.75rem" },
                          color: "#9b8680",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <FlagOutlinedIcon sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }} />
                        Report
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Box>

        <Box
          sx={{
            textAlign: "center",
            mt: { xs: 1.5, md: 2 },
            color: "#b29f99",
            fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
          }}
        >
          Danbro Bakery · authentic reviews from verified customers
        </Box>
      </Container>
    </Box>
  );
};
