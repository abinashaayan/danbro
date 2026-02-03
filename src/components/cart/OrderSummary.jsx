import React from "react";
import {
  Card,
  CardContent,
  Box,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { CustomText } from "../comman/CustomText";
import {
  LocalShipping as LocalShippingIcon,
  Payment as PaymentIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { getAccessToken } from "../../utils/cookies";

export const OrderSummary = ({
  finalSubtotal,
  discount,
  shipping,
  total,
  appliedCoupon,
  couponCode,
  couponError,
  applyingCoupon,
  setCouponCode,
  handleApplyCoupon,
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
  orderError,
  paymentMode,
  setPaymentMode,
  deliveryInstructions,
  setDeliveryInstructions,
  paymentStatus,
  paymentVerifying,
}) => {
  const isCheckoutDisabled = () => {
    if (cartItems?.length === 0) return true;
    if (deliveryType === 'self') {
      return !selectedAddress;
    } else if (deliveryType === 'someone_else') {
      return !someoneElseData?.name ||
             !someoneElseData?.phone ||
             !someoneElseData?.houseNumber ||
             !someoneElseData?.streetName ||
             !someoneElseData?.area ||
             !someoneElseData?.city ||
             !someoneElseData?.state ||
             !someoneElseData?.zipCode;
    }
    return true;
  };
  return (
    <>
      <Card
        sx={{
          borderRadius: { xs: 2, md: 2.5 },
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          position: { md: "sticky" },
          top: { md: 100 },
          mb: 2,
        }}
      >
        <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
          <CustomText
            sx={{
              fontSize: { xs: 18, md: 22 },
              fontWeight: 700,
              color: "#2c2c2c",
              mb: { xs: 1.5, md: 2 },
            }}
          >
            Order Summary
          </CustomText>

          {/* Coupon Section - checkboxes only */}
          <Box sx={{ mb: 2 }}>
            <CustomText
              sx={{
                fontSize: { xs: 14, md: 16 },
                fontWeight: 600,
                color: "#2c2c2c",
                mb: 1,
              }}
            >
              Coupon Code
            </CustomText>
            {coupons.length > 0 ? (
              <Box sx={{ width: "100%" }}>
                {couponsLoading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, py: 1 }}>
                    <CircularProgress size={18} />
                    <CustomText sx={{ fontSize: 13, color: "#666" }}>Loading coupons...</CustomText>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {coupons.map((coupon) => {
                      const isChecked = selectedCoupon === coupon.id;
                      return (
                        <FormControlLabel
                          key={coupon.id}
                          control={
                            <Checkbox
                              size="small"
                              checked={isChecked}
                              onChange={() => {
                                if (isChecked) {
                                  handleRemoveCoupon();
                                } else {
                                  handleCouponSelect(coupon.id);
                                }
                              }}
                              sx={{
                                color: "#999",
                                p: 0.75,
                                "&.Mui-checked": {
                                  color: "var(--themeColor)",
                                },
                              }}
                            />
                          }
                          label={
                            <Box sx={{ py: 0.5 }}>
                              <CustomText sx={{ fontSize: { xs: 13, md: 14 }, fontWeight: 600, color: "#2c2c2c" }}>
                                {coupon.code}
                              </CustomText>
                              <CustomText sx={{ fontSize: { xs: 11, md: 12 }, color: "#666", display: "block" }}>
                                {coupon.description}
                              </CustomText>
                            </Box>
                          }
                          sx={{
                            m: 0,
                            alignItems: "flex-start",
                            p: 1,
                            borderRadius: 1,
                            bgcolor: isChecked ? "rgba(var(--themeColor-rgb, 230, 120, 80), 0.06)" : "transparent",
                            border: "1px solid",
                            borderColor: isChecked ? "var(--themeColor)" : "#eee",
                            "&:hover": {
                              bgcolor: isChecked ? "rgba(var(--themeColor-rgb, 230, 120, 80), 0.08)" : "#fafafa",
                            },
                          }}
                        />
                      );
                    })}
                  </Box>
                )}
                {couponError && (
                  <CustomText sx={{ fontSize: 12, color: "#d32f2f", mt: 1 }}>
                    {couponError}
                  </CustomText>
                )}
              </Box>
            ) : (
              !couponsLoading && (
                <CustomText sx={{ fontSize: 13, color: "#666" }}>
                  No coupons available. Log in to see your coupons.
                </CustomText>
              )
            )}
          </Box>

          {/* Price Breakdown */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <CustomText sx={{ fontSize: { xs: 13, md: 14 }, color: "#666" }}>
                Subtotal ({cartItems?.length} items)
              </CustomText>
              <CustomText sx={{ fontSize: { xs: 13, md: 14 }, color: "#333" }}>
                ₹{finalSubtotal.toFixed(2)}
              </CustomText>
            </Box>
            {discount > 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <CustomText sx={{ fontSize: { xs: 13, md: 14 }, color: "#666" }}>
                  Discount
                </CustomText>
                <CustomText sx={{ fontSize: { xs: 13, md: 14 }, color: "#16a34a" }}>
                  -₹{discount.toFixed(2)}
                </CustomText>
              </Box>
            )}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <CustomText sx={{ fontSize: { xs: 13, md: 14 }, color: "#666" }}>
                Shipping
              </CustomText>
              <CustomText sx={{ fontSize: { xs: 13, md: 14 }, color: "#333" }}>
                {shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}
              </CustomText>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pt: 1,
                borderTop: "1px solid #eee",
              }}
            >
              <CustomText
                sx={{
                  fontSize: { xs: 16, md: 18 },
                  fontWeight: 700,
                  color: "#2c2c2c",
                }}
              >
                Total
              </CustomText>
              <CustomText
                sx={{
                  fontSize: { xs: 16, md: 18 },
                  fontWeight: 700,
                  color: "var(--themeColor)",
                }}
              >
                ₹{total.toFixed(2)}
              </CustomText>
            </Box>
          </Box>

          {/* Payment Mode Selection */}
          <Box sx={{ mt: 3 }}>
            <CustomText
              sx={{
                fontSize: { xs: 14, md: 16 },
                fontWeight: 600,
                color: "#2c2c2c",
                mb: 1,
              }}
            >
              Payment Mode
            </CustomText>
            <FormControl fullWidth>
              <Select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              >
                <MenuItem value="UPI">UPI</MenuItem>
                <MenuItem value="COD">Cash on Delivery</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Delivery Instructions */}
          <Box sx={{ mt: 3 }}>
            <CustomText
              sx={{
                fontSize: { xs: 14, md: 16 },
                fontWeight: 600,
                color: "#2c2c2c",
                mb: 1,
              }}
            >
              Delivery Instructions (Optional)
            </CustomText>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Enter any special delivery instructions..."
              value={deliveryInstructions}
              onChange={(e) => setDeliveryInstructions(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </Box>

          {/* Payment Success */}
          {paymentStatus === 'success' && (
            <Alert 
              severity="success" 
              icon={<CheckCircleIcon />}
              sx={{ mt: 2 }}
            >
              Payment successful! Redirecting to order confirmation...
            </Alert>
          )}

          {/* Checkout Button */}
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
              fontSize: { xs: 14, md: 16 },
              fontWeight: 600,
              mt: 3,
              "&:hover": {
                backgroundColor: "var(--specialColor)",
              },
              "&:disabled": {
                backgroundColor: "#ccc",
                color: "#666",
              },
            }}
          >
            {orderInitiating || paymentVerifying ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                {paymentVerifying ? "Verifying Payment..." : "Processing Order..."}
              </Box>
            ) : paymentStatus === 'success' ? (
              "Order Placed Successfully!"
            ) : (
              `Place Order • ₹${total.toFixed(2)}`
            )}
          </Button>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 1.5,
              pt: 1.5,
              borderTop: "1px solid #eee",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
              <PaymentIcon sx={{ fontSize: { xs: 16, md: 18 }, color: "#666" }} />
              <CustomText sx={{ fontSize: { xs: 11, md: 12 }, color: "#666" }}>
                Secure payment
              </CustomText>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
