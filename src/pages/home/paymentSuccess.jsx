import React, { useEffect, useState } from "react";
import { Box, Container, Button, CircularProgress, Alert, Paper } from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { verifyOrderPayment, verifyOrderPaymentGuest } from "../../utils/apiService";
import { getAccessToken } from "../../utils/cookies";
import { useAppDispatch } from "../../store/hooks";
import { loadCartItems } from "../../store/cartSlice";
import { setGuestCart } from "../../store/guestSlice";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState("loading"); // 'loading' | 'success' | 'failure'
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const stateOrderId = location.state?.orderId;
    const stateDetails = location.state?.orderDetails;
    if (stateOrderId) {
      setOrderId(stateOrderId);
      if (stateDetails) setOrderDetails(stateDetails);
      setStatus("success");
      if (!getAccessToken()) {
        dispatch(setGuestCart([]));
        window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { cartCount: 0 } }));
      } else {
        window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { cartCount: 0 } }));
      }
      dispatch(loadCartItems());
      return;
    }

    // Razorpay redirect: intentId from backend callback URL (razorpay_payment_link_id) or sessionStorage
    const intentId =
      searchParams.get("razorpay_payment_link_id") ||
      searchParams.get("intentId") ||
      searchParams.get("intent_id") ||
      sessionStorage.getItem("pendingIntentId") ||
      "";

    if (!intentId) {
      setStatus("failure");
      setError("Invalid return. No payment intent found.");
      return;
    }

    const verify = async () => {
      try {
        const token = getAccessToken();
        const res = token
          ? await verifyOrderPayment(intentId)
          : await verifyOrderPaymentGuest(intentId);

        const ok = res?.status === 200 || res?.success === true;
        const order = res?.order ?? res?.data ?? res;
        const id = res?.orderId ?? order?.orderId ?? intentId;
        if (ok && id) {
          sessionStorage.removeItem("pendingIntentId");
          sessionStorage.removeItem("pendingOrderId");
          if (!token) {
            dispatch(setGuestCart([]));
            window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { cartCount: 0 } }));
          } else {
            window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { cartCount: 0 } }));
          }
          dispatch(loadCartItems());
          setOrderDetails(order);
          setOrderId(id);
          setStatus("success");
        } else {
          setStatus("failure");
          setError(res?.message || "Payment verification failed.");
        }
      } catch (err) {
        setStatus("failure");
        setError(err?.message || "Payment verification failed. Please try again.");
      }
    };

    verify();
  }, [searchParams, location.state, dispatch]);

  const details = orderDetails || {};
  const pricing = details.pricing || {};
  const amount = pricing.grandTotal ?? details.amount ?? details.totalAmount ?? details.amountPaid;
  const paymentId =
    details.paymentId ??
    details.razorpay_payment_id ??
    details.payment_id ??
    searchParams.get("razorpay_payment_id");
  const currency = details.currency ?? "INR";
  const orderItems = details.items || [];
  const deliveryAddress = details.deliveryAddress || {};

  return (
    <Box sx={{ minHeight: "60vh", py: 6, px: 2, mb: 4 }}>
      <Container maxWidth="sm">
        {status === "loading" && (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <CircularProgress size={48} sx={{ color: "var(--themeColor)" }} />
            <CustomText sx={{ fontSize: 16, color: "#666" }}>
              Verifying your payment...
            </CustomText>
          </Box>
        )}

        {status === "success" && (
          <Box sx={{ textAlign: "center" }}>
            <CheckCircleIcon sx={{ fontSize: 72, color: "#2e7d32", mb: 2 }} />
            <CustomText variant="h5" sx={{ fontWeight: 700, color: "#2c2c2c", mb: 2 }}>
              Payment Completed
            </CustomText>
            <CustomText sx={{ fontSize: 15, color: "#666", mb: 3 }}>
              You have successfully paid {currency} {amount != null ? Number(amount).toFixed(2) : "—"}
            </CustomText>

            <Paper
              elevation={0}
              sx={{
                textAlign: "left",
                p: 2.5,
                mb: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                backgroundColor: "#fafafa",
              }}
            >
              <CustomText sx={{ fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, mb: 0.5 }}>
                Order ID
              </CustomText>
              <CustomText sx={{ fontSize: 16, fontWeight: 600, color: "#2c2c2c", mb: 1.5 }}>
                #{orderId}
              </CustomText>
              {paymentId && (
                <>
                  <CustomText sx={{ fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, mb: 0.5 }}>
                    Payment ID
                  </CustomText>
                  <CustomText sx={{ fontSize: 14, fontWeight: 500, color: "#444", mb: 1.5 }}>
                    {paymentId}
                  </CustomText>
                </>
              )}
              {details.paymentMode && (
                <CustomText sx={{ fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, mb: 0.5 }}>
                  Payment Mode
                </CustomText>
              )}
              {details.paymentMode && (
                <CustomText sx={{ fontSize: 14, fontWeight: 500, color: "#444" }}>
                  {details.paymentMode}
                </CustomText>
              )}
            </Paper>
            {orderItems.length > 0 && (
              <Paper
                elevation={0}
                sx={{
                  textAlign: "left",
                  p: 2,
                  mb: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  backgroundColor: "#fafafa",
                }}
              >
                <CustomText sx={{ fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, mb: 1 }}>
                  Order summary
                </CustomText>
                {orderItems.map((item, idx) => (
                  <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", py: 0.5, fontSize: 13 }}>
                    <CustomText sx={{ fontSize: 13 }}>{item.name} × {item.quantity}</CustomText>
                    <CustomText sx={{ fontSize: 13, fontWeight: 600 }}>₹{Number(item.total).toFixed(2)}</CustomText>
                  </Box>
                ))}
                {pricing.grandTotal != null && (
                  <Box sx={{ borderTop: "1px solid #eee", mt: 1, pt: 1, display: "flex", justifyContent: "space-between" }}>
                    <CustomText sx={{ fontSize: 14, fontWeight: 600 }}>Total</CustomText>
                    <CustomText sx={{ fontSize: 14, fontWeight: 600, color: "var(--themeColor)" }}>
                      ₹{Number(pricing.grandTotal).toFixed(2)}
                    </CustomText>
                  </Box>
                )}
              </Paper>
            )}
            {deliveryAddress && (deliveryAddress.name || deliveryAddress.city) && (
              <Paper
                elevation={0}
                sx={{
                  textAlign: "left",
                  p: 2,
                  mb: 3,
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  backgroundColor: "#fafafa",
                }}
              >
                <CustomText sx={{ fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, mb: 1 }}>
                  Delivery address
                </CustomText>
                <CustomText sx={{ fontSize: 14, fontWeight: 600 }}>{deliveryAddress.name}</CustomText>
                {deliveryAddress.phone && (
                  <CustomText sx={{ fontSize: 13, color: "#666" }}>{deliveryAddress.phone}</CustomText>
                )}
                <CustomText sx={{ fontSize: 13, color: "#666" }}>
                  {[deliveryAddress.houseNumber, deliveryAddress.streetName, deliveryAddress.area].filter(Boolean).join(", ")}
                </CustomText>
                <CustomText sx={{ fontSize: 13, color: "#666" }}>
                  {[deliveryAddress.city, deliveryAddress.state, deliveryAddress.zipCode].filter(Boolean).join(", ")}
                </CustomText>
              </Paper>
            )}

            <Button
              variant="contained"
              onClick={() => navigate("/track-order")}
              sx={{
                backgroundColor: "var(--themeColor)",
                textTransform: "none",
                px: 3,
                py: 1.5,
                "&:hover": { backgroundColor: "var(--specialColor)" },
              }}
            >
              Track Order
            </Button>
          </Box>
        )}

        {status === "failure" && (
          <Box>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
            <Button
              variant="outlined"
              onClick={() => navigate("/cart")}
              sx={{
                borderColor: "var(--themeColor)",
                color: "var(--themeColor)",
                textTransform: "none",
              }}
            >
              Back to Cart
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default PaymentSuccess;
