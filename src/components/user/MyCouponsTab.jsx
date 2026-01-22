import { Box, Grid, Card, CardContent, Button, CircularProgress, Alert } from "@mui/material";
import { Celebration as CelebrationIcon, LocalOffer as OfferIcon, ContentCopy as ContentCopyIcon } from "@mui/icons-material";
import { CustomText } from "../comman/CustomText";

export const MyCouponsTab = ({ coupons, couponsLoading, couponsError }) => {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <CelebrationIcon sx={{ fontSize: { xs: 32, md: 40 }, color: "var(--themeColor)" }} />
        <CustomText
          variant="h4"
          sx={{
            fontSize: { xs: 24, md: 32 },
            fontWeight: 700,
            color: "var(--themeColor)",
            background: "linear-gradient(135deg, #FF9472 0%, #F2709C 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          My Coupons
        </CustomText>
      </Box>

      {couponsLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
          <CircularProgress sx={{ color: "var(--themeColor)" }} />
        </Box>
      ) : couponsError ? (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {couponsError}
        </Alert>
      ) : coupons && coupons.length > 0 ? (
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {coupons.map((coupon, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={coupon.id}>
              <Card
                sx={{
                  borderRadius: { xs: 2.5, md: 3 },
                  boxShadow: coupon.isValid
                    ? "0 4px 20px rgba(255,148,114,0.2)"
                    : "0 2px 8px rgba(0,0,0,0.1)",
                  background: coupon.isValid
                    ? "linear-gradient(135deg, #FF9472 0%, #F2709C 100%)"
                    : "#f5f5f5",
                  color: coupon.isValid ? "#fff" : "#999",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: coupon.isValid ? "none" : "1px solid #e0e0e0",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: coupon.isValid
                      ? "0 8px 30px rgba(255,148,114,0.35)"
                      : "0 4px 15px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {!coupon.isValid && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1.5,
                      background: "rgba(0,0,0,0.5)",
                      zIndex: 2,
                    }}
                  >
                    <CustomText variant="caption" sx={{ fontWeight: 700, fontSize: 10, color: "#fff" }}>
                      EXPIRED
                    </CustomText>
                  </Box>
                )}

                <CardContent sx={{ p: { xs: 2.5, md: 3 }, position: "relative", zIndex: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  {/* Discount Badge */}
                  <Box sx={{ mb: 2, textAlign: "center" }}>
                    <CustomText
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: 36, md: 44 },
                        lineHeight: 1,
                        mb: 0.5,
                        color: coupon.isValid ? "#fff" : "#999",
                      }}
                    >
                      {coupon.discount}
                    </CustomText>
                    <CustomText
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: 14, md: 16 },
                        color: coupon.isValid ? "#fff" : "#999",
                        letterSpacing: 1,
                      }}
                    >
                      OFF
                    </CustomText>
                  </Box>

                  {/* Coupon Code */}
                  <Box
                    sx={{
                      mb: 2,
                      px: 2,
                      py: 1.25,
                      borderRadius: 2,
                      background: coupon.isValid ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.05)",
                      border: coupon.isValid ? "2px dashed rgba(255,255,255,0.4)" : "2px dashed #ddd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <CustomText
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: 15, md: 17 },
                        letterSpacing: 1.2,
                        fontFamily: "monospace",
                        color: coupon.isValid ? "#fff" : "#666",
                      }}
                    >
                      {coupon.code}
                    </CustomText>
                    <OfferIcon sx={{ fontSize: { xs: 18, md: 20 }, opacity: coupon.isValid ? 0.9 : 0.5 }} />
                  </Box>

                  {/* Description */}
                  <CustomText
                    variant="body2"
                    sx={{
                      mb: 2,
                      fontSize: { xs: 12, md: 13 },
                      lineHeight: 1.5,
                      fontWeight: 500,
                      color: coupon.isValid ? "rgba(255,255,255,0.95)" : "#666",
                      textAlign: "center",
                    }}
                  >
                    {coupon.description}
                  </CustomText>

                  {/* Validity Dates */}
                  <Box
                    sx={{
                      mb: 2,
                      p: 1.25,
                      borderRadius: 1.5,
                      background: coupon.isValid ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.03)",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <CustomText
                        variant="caption"
                        sx={{
                          fontSize: { xs: 10, md: 11 },
                          fontWeight: 600,
                          color: coupon.isValid ? "rgba(255,255,255,0.9)" : "#999",
                        }}
                      >
                        Valid From:
                      </CustomText>
                      <CustomText
                        variant="body2"
                        sx={{
                          fontSize: { xs: 10, md: 11 },
                          fontWeight: 500,
                          color: coupon.isValid ? "#fff" : "#666",
                        }}
                      >
                        {coupon.validFrom}
                      </CustomText>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <CustomText
                        variant="caption"
                        sx={{
                          fontSize: { xs: 10, md: 11 },
                          fontWeight: 600,
                          color: coupon.isValid ? "rgba(255,255,255,0.9)" : "#999",
                        }}
                      >
                        Valid Until:
                      </CustomText>
                      <CustomText
                        variant="body2"
                        sx={{
                          fontSize: { xs: 10, md: 11 },
                          fontWeight: 500,
                          color: coupon.isValid ? "#fff" : "#666",
                        }}
                      >
                        {coupon.validTo}
                      </CustomText>
                    </Box>
                  </Box>

                  {/* Copy Button */}
                  <Box sx={{ mt: "auto" }}>
                    <Button
                      fullWidth
                      variant="contained"
                      disabled={!coupon.isValid}
                      onClick={() => {
                        navigator.clipboard.writeText(coupon.code);
                      }}
                      startIcon={coupon.isValid ? <ContentCopyIcon /> : null}
                      sx={{
                        backgroundColor: coupon.isValid ? "#fff" : "#e0e0e0",
                        color: coupon.isValid ? "var(--themeColor)" : "#999",
                        textTransform: "none",
                        borderRadius: 2,
                        fontWeight: 700,
                        py: 1.25,
                        fontSize: { xs: 13, md: 14 },
                        boxShadow: coupon.isValid ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: coupon.isValid ? "#fff" : "#e0e0e0",
                          transform: coupon.isValid ? "translateY(-2px)" : "none",
                          boxShadow: coupon.isValid ? "0 4px 12px rgba(0,0,0,0.2)" : "none",
                        },
                        "&:disabled": {
                          backgroundColor: "#e0e0e0",
                          color: "#999",
                          cursor: "not-allowed",
                        },
                      }}
                    >
                      {coupon.isValid ? "Copy Code" : "Expired"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            px: 3,
            borderRadius: 3,
            background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
          }}
        >
          <OfferIcon sx={{ fontSize: 64, color: "#ccc", mb: 2 }} />
          <CustomText variant="h6" sx={{ color: "#666", mb: 1, fontWeight: 600 }}>
            No coupons available
          </CustomText>
          <CustomText variant="body2" sx={{ color: "#999" }}>
            Check back later for exciting offers!
          </CustomText>
        </Box>
      )}
    </Box>
  );
};

