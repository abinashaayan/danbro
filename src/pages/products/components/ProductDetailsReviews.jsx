import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Rating,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { ReviewsListSkeleton } from "../../../components/comman/Skeletons";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { getReviewsByProduct, addReview } from "../../../utils/apiService";
import { getAccessToken } from "../../../utils/cookies";

function getTimeAgo(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  const now = new Date();
  const diffMs = now - d;
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffWeeks === 1) return "1 week ago";
  if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
  if (diffMonths === 1) return "1 month ago";
  if (diffMonths < 12) return `${diffMonths} months ago`;
  return `${Math.floor(diffMonths / 12)} year(s) ago`;
}

function computeSummary(reviews) {
  const list = Array.isArray(reviews) ? reviews : [];
  const total = list.length;
  if (total === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      distribution: [0, 0, 0, 0, 0],
      distributionPct: [0, 0, 0, 0, 0],
    };
  }
  let sum = 0;
  const counts = [0, 0, 0, 0, 0];
  list.forEach((r) => {
    const rating = Math.min(5, Math.max(1, Number(r.rating) || 0));
    sum += rating;
    const idx = rating - 1;
    if (idx >= 0 && idx < 5) counts[idx] += 1;
  });
  const averageRating = total ? Math.round((sum / total) * 10) / 10 : 0;
  const distributionPct = counts.map((c) => (total ? Math.round((c / total) * 100) : 0));
  return {
    averageRating,
    totalReviews: total,
    distribution: counts,
    distributionPct,
  };
}

export const ProductDetailsReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitRating, setSubmitRating] = useState(5);
  const [submitText, setSubmitText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const isLoggedIn = !!getAccessToken();

  const loadReviews = useCallback(async () => {
    if (!productId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await getReviewsByProduct(productId);
      const data = res?.data ?? res;
      let list = [];
      if (Array.isArray(data)) {
        list = data;
      } else if (Array.isArray(data?.reviews)) {
        list = data.reviews;
      } else if (Array.isArray(res?.data)) {
        list = res.data;
      }
      setReviews(list);
    } catch (err) {
      setError(err.message || "Failed to load reviews.");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleSubmitReview = async () => {
    if (!productId || !submitText.trim()) return;
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    try {
      await addReview({
        productId,
        rating: submitRating,
        review: submitText.trim(),
      });
      setSubmitSuccess(true);
      setSubmitText("");
      setSubmitRating(5);
      loadReviews();
    } catch (err) {
      setSubmitError(err.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  const summary = computeSummary(reviews);

  if (!productId) return null;

  const sectionTitleSx = {
    fontSize: { xs: "1.1rem", sm: "1.25rem" },
    fontWeight: 700,
    color: "#3d2914",
    fontFamily: "'Inter', sans-serif",
  };

  const cardSx = {
    p: { xs: 2, sm: 2.5 },
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 1, md: 3 }, px: { xs: 2, sm: 3, md: 4 }, maxWidth: "100%", }}>
      <Typography sx={{ ...sectionTitleSx, mb: 1 }}>Ratings & Reviews</Typography>

      {loading ? (
        <ReviewsListSkeleton count={4} />
      ) : (
        <>
          {/* Summary: average + distribution */}
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 3, mb: 1, }}>
            <Box
              sx={{
                minWidth: { sm: 220 },
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: "2.5rem", fontWeight: 700, color: "#3d2914", fontFamily: "'Inter', sans-serif", lineHeight: 1.2, }}>
                {summary.averageRating > 0 ? summary.averageRating.toFixed(1) : "0.0"}
              </Typography>
              <Rating
                value={summary.averageRating}
                readOnly
                precision={0.1}
                size="medium"
                emptyIcon={<StarIcon fontSize="inherit" />}
                sx={{ color: "#c9a227", my: 0.5 }}
              />
              <Typography sx={{ fontSize: "0.875rem", color: "#5c4a32", fontFamily: "'Inter', sans-serif", }}>
                Based on {summary.totalReviews} review{summary.totalReviews !== 1 ? "s" : ""}
              </Typography>
            </Box>

            <Box sx={{ ...cardSx, flex: 1 }}>
              {[5, 4, 3, 2, 1].map((star) => {
                const pct = summary.distributionPct[star - 1] ?? 0;
                return (
                  <Box key={star} sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5, }}>
                    <Box sx={{ display: "flex", width: 100, flexShrink: 0 }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <StarIcon key={s} sx={{ fontSize: 18, color: s <= star ? "#c9a227" : "#e0d5c7", }} />
                      ))}
                    </Box>
                    <Box sx={{ flex: 1, height: 10, backgroundColor: "#ebe6df", borderRadius: 1, overflow: "hidden", }}>
                      <Box sx={{ height: "100%", width: `${pct}%`, backgroundColor: "#8b6914", borderRadius: 1, minWidth: pct > 0 ? 4 : 0, }} />
                    </Box>
                    <Typography sx={{ width: 36, textAlign: "right", fontSize: "0.875rem", color: "#3d2914", fontFamily: "'Inter', sans-serif", }}>
                      {pct}%
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Typography sx={{ ...sectionTitleSx }}>Customer Reviews</Typography>

          {reviews?.length > 0 &&
            reviews?.map((rev, i) => {
              const name =
                rev.user?.name ||
                rev.userName ||
                rev.name ||
                "Customer";
              const time = getTimeAgo(rev.createdAt || rev.date || rev.updatedAt);
              const rating = Math.min(5, Math.max(1, Number(rev.rating) || 0));
              const text = rev.review || rev.text || "";
              const verified = rev.verifiedPurchase ?? rev.verified ?? true;
              const helpful = rev.helpfulCount ?? rev.helpful ?? 0;

              return (
                <Box key={rev._id || rev.id || i} sx={{ ...cardSx, mb: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 1, mb: 1, }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "#3d2914", fontFamily: "'Inter', sans-serif", }}>
                      {name}
                    </Typography>
                    <Typography sx={{ fontSize: "0.8rem", color: "#8a7a6a", fontFamily: "'Inter', sans-serif", }}>
                      {time}
                    </Typography>
                  </Box>
                  <Rating value={rating} readOnly size="small" sx={{ color: "#c9a227", mb: 1 }} />
                  <Typography sx={{ fontSize: "0.9375rem", color: "#3d2914", lineHeight: 1.6, fontFamily: "'Inter', sans-serif", mb: 1.5, whiteSpace: "pre-wrap", wordBreak: "break-word", }}>
                    {text}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", }}>
                    {verified && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#2e7d32", }}>
                        <CheckCircleIcon sx={{ fontSize: 18 }} />
                        <Typography component="span" sx={{ fontSize: "0.8rem", fontWeight: 500 }}>
                          Verified Purchase
                        </Typography>
                      </Box>
                    )}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#a67c52", }}>
                      <ThumbUpOutlinedIcon sx={{ fontSize: 18 }} />
                      <Typography component="span" sx={{ fontSize: "0.8rem" }}>
                        Helpful ({helpful})
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}

          {/* Write review (logged in) */}
          {isLoggedIn && (
            <Box sx={{ ...cardSx, mb: 3 }}>
              <Typography sx={{ fontSize: "0.95rem", fontWeight: 600, color: "#3d2914", fontFamily: "'Inter', sans-serif", mb: 1, }}>
                Write a review
              </Typography>
              <Box sx={{ mb: 1 }}>
                <Typography component="span" sx={{ fontSize: "0.875rem", color: "#5c4a32", mr: 1 }}>
                  Rating
                </Typography>
                <Rating value={submitRating} onChange={(_, v) => setSubmitRating(v ?? 5)} size="medium" sx={{ color: "#c9a227" }} />
              </Box>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Share your experience with this product..."
                value={submitText}
                onChange={(e) => setSubmitText(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                    "& fieldset": { borderColor: "#d4cfc4" },
                  },
                }}
              />
              {submitError && (
                <Typography sx={{ color: "#c62828", fontSize: "0.875rem", mt: 1 }}>
                  {submitError}
                </Typography>
              )}
              {submitSuccess && (
                <Typography sx={{ color: "#2e7d32", fontSize: "0.875rem", mt: 1 }}>
                  Thank you! Your review has been submitted.
                </Typography>
              )}
              <Button
                variant="contained"
                onClick={handleSubmitReview}
                disabled={submitting || !submitText.trim()}
                sx={{
                  mt: 2,
                  backgroundColor: "#8b6914",
                  "&:hover": { backgroundColor: "#6d5210" },
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                {submitting ? "Submitting..." : "Submit review"}
              </Button>
            </Box>
          )}

          {error && (
            <Typography sx={{ color: "#c62828", mb: 2 }}>{error}</Typography>
          )}

          {reviews?.length === 0 && !loading && (
            <Box sx={{ ...cardSx, py: 4, textAlign: "center" }}>
              <Typography sx={{ color: "#5c4a32", fontFamily: "'Inter', sans-serif" }}>
                No reviews yet. Be the first to review!
              </Typography>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};
