import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
} from "@mui/material";
import { CustomText } from "../comman/CustomText";
import IconButton from "@mui/material/IconButton";
import {
  LocalOffer as LocalOfferIcon,
  Schedule as ScheduleIcon,
  Payment as PaymentIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

export const OrderSummary = ({
  finalSubtotal,
  taxTotal = 0,
  discount,
  shipping,
  total,
  appliedCoupon,
  couponError,
  applyingCoupon,
  handleRemoveCoupon,
  onApplyCouponWithCode,
  coupons = [],
  couponsLoading,
  selectedCoupon,
  handleCouponSelect,
  selectedAddress,
  cartItems,
  deliveryType,
  someoneElseData,
  onInitiateOrder,
  orderInitiating,
  paymentMode,
  setPaymentMode,
  paymentStatus,
  paymentVerifying,
  isGuest = false,
}) => {
  const [couponDialogOpen, setCouponDialogOpen] = useState(false);

  const isCheckoutDisabled = () => {
    if (cartItems?.length === 0) return true;
    if (isGuest) return false;
    if (deliveryType === "self") return !selectedAddress;
    if (deliveryType === "someone_else") {
      return (
        !someoneElseData?.name ||
        !someoneElseData?.phone ||
        !someoneElseData?.houseNumber ||
        !someoneElseData?.streetName ||
        !someoneElseData?.area ||
        !someoneElseData?.city ||
        !someoneElseData?.state ||
        !someoneElseData?.zipCode
      );
    }
    return true;
  };

  const packingCharges = 0;

  return (
    <>
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: "0 2px 12px rgba(93, 64, 55, 0.15)",
          mb: 2,
          border: "2px solid #5D4037",
          overflow: "hidden",
          bgcolor: "rgba(93, 64, 55, 0.03)",
        }}
      >
        <CardContent sx={{ py: { xs: 1.5, sm: 2 }, px: { xs: 1.5, sm: 2.5 }, "&:last-child": { pb: 2 } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: { xs: 1, sm: 1.5 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
              <Box sx={{ p: { xs: 0.5, sm: 0.75 }, borderRadius: 1.5, bgcolor: "rgba(93, 64, 55, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LocalOfferIcon sx={{ fontSize: { xs: 20, sm: 22 }, color: "#5D4037" }} />
              </Box>
              <CustomText sx={{ fontSize: { xs: 14, sm: 16 }, fontWeight: 600, color: "#2c2c2c" }}>Offers</CustomText>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flex: 1, justifyContent: "flex-end", minWidth: 0 }}>
              {couponsLoading ? (
                <CircularProgress size={18} sx={{ color: "#5D4037" }} />
              ) : appliedCoupon?.couponCode || appliedCoupon?.code ? (
                <CustomText sx={{ fontSize: 14, color: "#5D4037", fontWeight: 600, mr: 0.5 }}>
                  {appliedCoupon.couponCode || appliedCoupon.code}
                </CustomText>
              ) : (
                <CustomText sx={{ fontSize: 13, color: "#999" }}>No coupon selected</CustomText>
              )}
              <Link
                component="button"
                type="button"
                onClick={() => (coupons.length > 0 ? setCouponDialogOpen(true) : null)}
                sx={{
                  color: "#5D4037",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: coupons.length > 0 ? "pointer" : "default",
                  textDecoration: "none",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  "&:hover": { textDecoration: "none", bgcolor: "rgba(93, 64, 55, 0.08)" },
                }}
              >
                {appliedCoupon?.couponCode || appliedCoupon?.code ? "Change" : "Select"}
              </Link>
            </Box>
          </Box>
          {couponError && (
            <CustomText sx={{ fontSize: 12, color: "#d32f2f", mt: 1, display: "block" }}>{couponError}</CustomText>
          )}
        </CardContent>
      </Card>

      {/* Coupon selection dialog: select coupon → Apply button enabled → on Apply call API then cart/get for update */}
      <Dialog
        open={couponDialogOpen}
        onClose={() => setCouponDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        disableScrollLock
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle sx={{ backgroundColor: "#3E2723", color: "#fff", fontSize: 18, fontWeight: 600, py: 2, px: 2.5, position: "relative", }}>
          Select a coupon

          <IconButton
            onClick={() => setCouponDialogOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ my: 2, px: 2.5, pb: 2.5, bgcolor: "#fafafa", position: "relative" }}>
          {applyingCoupon && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: "rgba(255,255,255,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
                borderRadius: 1,
              }}
            >
              <CircularProgress size={32} />
            </Box>
          )}
          {coupons.map((coupon) => {
            // Calculate discount amount for guest mode
            let discountAmount = 0;
            let discountText = "";
            if (isGuest && selectedCoupon === coupon.id && finalSubtotal > 0) {
              if (coupon.discountType === "ITEM_DISCOUNT_PERCENTAGE" && coupon.discountPercentage) {
                discountAmount = (finalSubtotal * coupon.discountPercentage) / 100;
                discountText = `Save ₹${discountAmount.toFixed(2)}`;
              } else if (coupon.discountType === "ITEM_DISCOUNT_AMOUNT" && coupon.discountAmount) {
                discountAmount = Math.min(coupon.discountAmount, finalSubtotal);
                discountText = `Save ₹${discountAmount.toFixed(2)}`;
              }
            }
            
            return (
              <Box
                key={coupon.id}
                onClick={() => {
                  if (applyingCoupon) return;
                  handleCouponSelect(coupon.id);
                }}
                sx={{
                  p: 2,
                  mb: 1.5,
                  borderRadius: 1.5,
                  border: "1px solid",
                  borderColor: selectedCoupon === coupon.id ? "#5D4037" : "#e0e0e0",
                  bgcolor: selectedCoupon === coupon.id ? "rgba(93, 64, 55, 0.08)" : "#fff",
                  cursor: applyingCoupon ? "default" : "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: applyingCoupon ? undefined : selectedCoupon === coupon.id ? "rgba(93, 64, 55, 0.12)" : "rgba(93, 64, 55, 0.04)",
                    borderColor: applyingCoupon ? undefined : "#5D4037",
                  },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box sx={{ flex: 1 }}>
                    <CustomText sx={{ fontWeight: 600, fontSize: 15, color: "#3E2723" }}>{coupon.couponCode ?? coupon.code}</CustomText>
                    <CustomText sx={{ fontSize: 13, color: "#666", display: "block", mt: 0.25 }}>{coupon.description}</CustomText>
                  </Box>
                  {isGuest && selectedCoupon === coupon.id && discountText && (
                    <Box sx={{ ml: 2, textAlign: "right" }}>
                      <CustomText sx={{ fontSize: 14, fontWeight: 700, color: "#16a34a" }}>
                        {discountText}
                      </CustomText>
                      <CustomText sx={{ fontSize: 12, color: "#666", mt: 0.25 }}>
                        New Total: ₹{(finalSubtotal - discountAmount).toFixed(2)}
                      </CustomText>
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })}
          {couponError && (
            <CustomText sx={{ fontSize: 12, color: "#d32f2f", mt: 1, display: "block" }}>{couponError}</CustomText>
          )}
          {(appliedCoupon?.couponCode || appliedCoupon?.code) && (
            <Button
              size="small"
              onClick={() => { handleRemoveCoupon(); setCouponDialogOpen(false); }}
              sx={{
                mt: 1.5,
                textTransform: "none",
                color: "#fff",
                bgcolor: "red",
                fontWeight: 600,
              }}
            >
              Remove coupon
            </Button>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 2.5, py: 2, bgcolor: "#fafafa", borderTop: "1px solid #eee" }}>
          <Button
            onClick={() => setCouponDialogOpen(false)}
            sx={{ textTransform: "none", color: "#666" }}
          >
            {isGuest ? "Close" : "Cancel"}
          </Button>
          {!isGuest && (
            <Button
              variant="contained"
              disabled={!selectedCoupon || applyingCoupon || !onApplyCouponWithCode}
              onClick={async () => {
                const selected = coupons.find((c) => c.id === selectedCoupon);
                const code = selected ? (selected.couponCode ?? selected.code) : null;
                if (!code) return;
                try {
                  await onApplyCouponWithCode(code);
                  setCouponDialogOpen(false);
                } catch (_) {
                  // couponError set in parent; dialog stays open
                }
              }}
              sx={{
                textTransform: "none",
                bgcolor: "#5D4037",
                fontWeight: 600,
                "&:hover": { bgcolor: "#3E2723" },
              }}
            >
              Apply
            </Button>
          )}
          {isGuest && selectedCoupon && (
            <CustomText sx={{ fontSize: 12, color: "#666", fontStyle: "italic" }}>
              Login to apply coupon
            </CustomText>
          )}
        </DialogActions>
      </Dialog>

      {/* Bill Details Card */}
      <Card sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", mb: 2, overflow: "hidden" }}>
        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
          <CustomText sx={{ fontSize: { xs: 15, sm: 16 }, fontWeight: 700, color: "#2c2c2c", mb: 1.5 }}>
            Bill details:
          </CustomText>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, gap: 1 }}>
            <CustomText sx={{ fontSize: { xs: 12, sm: 13 }, color: "#666", flexShrink: 0 }}>Item(s) Subtotal:</CustomText>
            <CustomText sx={{ fontSize: { xs: 12, sm: 13 }, color: "#333", flexShrink: 0 }}>₹{Number(finalSubtotal).toFixed(2)}</CustomText>
          </Box>
          {!isGuest && (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, gap: 1 }}>
                <CustomText sx={{ fontSize: { xs: 12, sm: 13 }, color: "#666" }}>Packing Charges:</CustomText>
                <CustomText sx={{ fontSize: { xs: 12, sm: 13 }, color: "#333" }}>+₹{Number(packingCharges).toFixed(2)}</CustomText>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, gap: 1 }}>
                <CustomText sx={{ fontSize: { xs: 12, sm: 13 }, color: "#666" }}>Delivery Charges:</CustomText>
                <CustomText sx={{ fontSize: { xs: 12, sm: 13 }, color: "#333" }}>+₹{Number(shipping).toFixed(2)}</CustomText>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, gap: 1 }}>
                <CustomText sx={{ fontSize: { xs: 12, sm: 13 }, color: "#666" }}>Taxes and Charges:</CustomText>
                <CustomText sx={{ fontSize: { xs: 12, sm: 13 }, color: "#333" }}>+₹{Number(taxTotal).toFixed(2)}</CustomText>
              </Box>
            </>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, gap: 1 }}>
            <CustomText sx={{ fontSize: { xs: 12, sm: 13 }, color: "#666" }}>Discount:</CustomText>
            <CustomText sx={{ fontSize: { xs: 12, sm: 13 }, color: "#16a34a" }}>-₹{Number(discount).toFixed(2)}</CustomText>
          </Box>
          <Box sx={{ borderTop: "1px solid #eee", pt: 1.5, mt: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
              <CustomText sx={{ fontSize: { xs: 15, sm: 16 }, fontWeight: 700, color: "#2c2c2c" }}>Grand Total:</CustomText>
              <CustomText sx={{ fontSize: { xs: 15, sm: 16 }, fontWeight: 700, color: "var(--themeColor)" }}>₹{Number(total).toFixed(2)}</CustomText>
            </Box>
          </Box>
          <CustomText sx={{ fontSize: 12, color: "#0d8c2d", fontWeight: 500, mt: 1.5, display: "block" }}>
            You will earn Danbro points for this transaction
          </CustomText>
        </CardContent>
      </Card>

      {/* Payment Mode - hidden for guest */}
      {!isGuest && (
        <Box sx={{ mb: 2 }}>
          <CustomText sx={{ fontSize: 14, fontWeight: 600, color: "#2c2c2c", mb: 1 }}>
            Payment Mode
          </CustomText>
          <FormControl>
            <RadioGroup row value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)} sx={{ gap: 2 }}>
              <FormControlLabel
                value="UPI"
                control={<Radio size="small" sx={{ color: "#666", "&.Mui-checked": { color: "var(--themeColor)" } }} />}
                label={<CustomText sx={{ fontSize: 13, color: "#333" }}>UPI</CustomText>}
              />
              <FormControlLabel
                value="COD"
                control={<Radio size="small" sx={{ color: "#666", "&.Mui-checked": { color: "var(--themeColor)" } }} />}
                label={<CustomText sx={{ fontSize: 13, color: "#333" }}>Cash on Delivery</CustomText>}
              />
            </RadioGroup>
          </FormControl>
        </Box>
      )}

      {paymentStatus === "success" && (
        <Alert severity="success" icon={<CheckCircleIcon />} sx={{ mb: 2 }}>
          Payment successful! Redirecting to order confirmation...
        </Alert>
      )}

      <Button
        variant="contained"
        fullWidth
        disabled={isCheckoutDisabled() || orderInitiating || paymentVerifying}
        onClick={onInitiateOrder}
        sx={{
          backgroundColor: "var(--themeColor)",
          color: "#fff",
          textTransform: "none",
          py: { xs: 1.25, sm: 1.5 },
          fontSize: { xs: 14, sm: 15 },
          fontWeight: 600,
          "&:hover": { backgroundColor: "var(--specialColor)" },
          "&:disabled": { backgroundColor: "#ccc", color: "#666" },
        }}
      >
        {orderInitiating || paymentVerifying ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={20} color="inherit" />
            {paymentVerifying ? "Verifying Payment..." : "Processing Order..."}
          </Box>
        ) : paymentStatus === "success" ? (
          "Order Placed Successfully!"
        ) : isGuest ? (
          `Login to Place Order • ₹${total.toFixed(2)}`
        ) : (
          `Place Order • ₹${total.toFixed(2)}`
        )}
      </Button>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mt: 1.5, pt: 1.5, borderTop: "1px solid #eee" }}>
        <PaymentIcon sx={{ fontSize: 18, color: "#666" }} />
        <CustomText sx={{ fontSize: 12, color: "#666" }}>Secure payment</CustomText>
      </Box>
    </>
  );
};
