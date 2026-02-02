import React from "react";
import {
  Card,
  CardContent,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import { CustomText } from "../comman/CustomText";
import {
  LocalShipping as LocalShippingIcon,
  Payment as PaymentIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
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
      return !someoneElseData.name || 
             !someoneElseData.phone || 
             !someoneElseData.address || 
             !someoneElseData.city || 
             !someoneElseData.state || 
             !someoneElseData.pincode;
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

          {/* Coupon Section */}
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
            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={!!appliedCoupon}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    fontSize: { xs: 13, md: 14 },
                  },
                }}
              />
              <Button
                variant="outlined"
                onClick={handleApplyCoupon}
                disabled={applyingCoupon || !couponCode.trim() || !!appliedCoupon}
                sx={{
                  borderColor: "var(--themeColor)",
                  color: "var(--themeColor)",
                  textTransform: "none",
                  px: 2,
                  fontSize: { xs: 12, md: 13 },
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "var(--specialColor)",
                    color: "var(--specialColor)",
                  },
                }}
              >
                {applyingCoupon ? "Applying..." : "Apply"}
              </Button>
            </Box>
            {couponError && (
              <CustomText sx={{ fontSize: 12, color: "#d32f2f", mb: 1 }}>
                {couponError}
              </CustomText>
            )}
            {appliedCoupon && (
              <Box
                sx={{
                  p: 1,
                  backgroundColor: "#f0f9ff",
                  borderRadius: 1,
                  border: "1px solid #0284c7",
                }}
              >
                <CustomText sx={{ fontSize: 12, color: "#0284c7", mb: 0.5 }}>
                  Coupon Applied: {appliedCoupon.code}
                </CustomText>
                <Button
                  size="small"
                  onClick={handleRemoveCoupon}
                  sx={{
                    fontSize: 11,
                    color: "#0284c7",
                    textTransform: "none",
                    p: 0,
                    minWidth: "auto",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                >
                  Remove
                </Button>
              </Box>
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
                <MenuItem value="CARD">Credit/Debit Card</MenuItem>
                <MenuItem value="NET_BANKING">Net Banking</MenuItem>
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

          {/* Order Error */}
          {orderError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {orderError}
            </Alert>
          )}

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

          {/* Payment Failure */}
          {paymentStatus === 'failure' && (
            <Alert 
              severity="error" 
              icon={<ErrorIcon />}
              sx={{ mt: 2 }}
            >
              Payment failed. Please try again.
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
              <LocalShippingIcon sx={{ fontSize: { xs: 16, md: 18 }, color: "#666" }} />
              <CustomText sx={{ fontSize: { xs: 11, md: 12 }, color: "#666" }}>
                Free shipping on orders over ₹50
              </CustomText>
            </Box>
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
