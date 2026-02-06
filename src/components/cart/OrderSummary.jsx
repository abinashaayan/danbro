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
  Link,
} from "@mui/material";
import { CustomText } from "../comman/CustomText";
import {
  LocalOffer as LocalOfferIcon,
  Schedule as ScheduleIcon,
  Payment as PaymentIcon,
  CheckCircle as CheckCircleIcon,
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
      {/* Offers Card */}
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
        <CardContent sx={{ py: 2, px: 2.5, "&:last-child": { pb: 2 } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
              <Box sx={{ p: 0.75, borderRadius: 1.5, bgcolor: "rgba(93, 64, 55, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LocalOfferIcon sx={{ fontSize: 22, color: "#5D4037" }} />
              </Box>
              <CustomText sx={{ fontSize: 16, fontWeight: 600, color: "#2c2c2c" }}>Offers</CustomText>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flex: 1, justifyContent: "flex-end", minWidth: 0 }}>
              {couponsLoading ? (
                <CircularProgress size={18} sx={{ color: "#5D4037" }} />
              ) : appliedCoupon?.code ? (
                <CustomText sx={{ fontSize: 14, color: "#5D4037", fontWeight: 600, mr: 0.5 }}>{appliedCoupon.code}</CustomText>
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
                {appliedCoupon?.code ? "Change" : "Select"}
              </Link>
            </Box>
          </Box>
          {couponError && (
            <CustomText sx={{ fontSize: 12, color: "#d32f2f", mt: 1, display: "block" }}>{couponError}</CustomText>
          )}
        </CardContent>
      </Card>

      {/* Coupon selection dialog */}
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
        <DialogTitle sx={{ backgroundColor: "#3E2723", color: "#fff", fontSize: 18, fontWeight: 600, py: 2, px: 2.5, borderBottom: "none", }}>
          Select a coupon
        </DialogTitle>
        <DialogContent sx={{ my: 2, px: 2.5, pb: 2.5, bgcolor: "#fafafa" }}>
          {coupons.map((coupon) => (
            <Box
              key={coupon.id}
              onClick={() => {
                handleCouponSelect(coupon.id);
                setCouponDialogOpen(false);
              }}
              sx={{
                p: 2,
                mb: 1.5,
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: selectedCoupon === coupon.id ? "#5D4037" : "#e0e0e0",
                bgcolor: selectedCoupon === coupon.id ? "rgba(93, 64, 55, 0.08)" : "#fff",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: selectedCoupon === coupon.id ? "rgba(93, 64, 55, 0.12)" : "rgba(93, 64, 55, 0.04)",
                  borderColor: "#5D4037",
                },
              }}
            >
              <CustomText sx={{ fontWeight: 600, fontSize: 15, color: "#3E2723" }}>{coupon.code}</CustomText>
              <CustomText sx={{ fontSize: 13, color: "#666", display: "block", mt: 0.25 }}>{coupon.description}</CustomText>
            </Box>
          ))}
          {appliedCoupon?.code && (
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
      </Dialog>

      {/* Bill Details Card */}
      <Card sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", mb: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <CustomText sx={{ fontSize: 16, fontWeight: 700, color: "#2c2c2c", mb: 1.5 }}>
            Bill details:
          </CustomText>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <CustomText sx={{ fontSize: 13, color: "#666" }}>Item(s) Subtotal:</CustomText>
            <CustomText sx={{ fontSize: 13, color: "#333" }}>₹{Number(finalSubtotal).toFixed(2)}</CustomText>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <CustomText sx={{ fontSize: 13, color: "#666" }}>Packing Charges:</CustomText>
            <CustomText sx={{ fontSize: 13, color: "#333" }}>+₹{Number(packingCharges).toFixed(2)}</CustomText>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <CustomText sx={{ fontSize: 13, color: "#666" }}>Delivery Charges:</CustomText>
            <CustomText sx={{ fontSize: 13, color: "#333" }}>+₹{Number(shipping).toFixed(2)}</CustomText>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <CustomText sx={{ fontSize: 13, color: "#666" }}>Taxes and Charges:</CustomText>
            <CustomText sx={{ fontSize: 13, color: "#333" }}>+₹{Number(taxTotal).toFixed(2)}</CustomText>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <CustomText sx={{ fontSize: 13, color: "#666" }}>Discount:</CustomText>
            <CustomText sx={{ fontSize: 13, color: "#16a34a" }}>-₹{Number(discount).toFixed(2)}</CustomText>
          </Box>
          <Box sx={{ borderTop: "1px solid #eee", pt: 1.5, mt: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <CustomText sx={{ fontSize: 16, fontWeight: 700, color: "#2c2c2c" }}>Grand Total:</CustomText>
              <CustomText sx={{ fontSize: 16, fontWeight: 700, color: "var(--themeColor)" }}>₹{Number(total).toFixed(2)}</CustomText>
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
          py: 1.5,
          fontSize: 15,
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
