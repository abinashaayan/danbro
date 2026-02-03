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
        window.dispatchEvent(new CustomEvent("cartUpdated"));
      }
      dispatch(loadCartItems());
      return;
    }

    // Razorpay redirect: verify with intentId (from URL or sessionStorage)
    const intentId =
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

        if (res?.success) {
          sessionStorage.removeItem("pendingIntentId");
          sessionStorage.removeItem("pendingOrderId");
          if (!token) {
            dispatch(setGuestCart([]));
            window.dispatchEvent(new CustomEvent("cartUpdated"));
          }
          dispatch(loadCartItems());
          setOrderDetails(res?.data ?? res);
          setOrderId(res?.data?.orderId ?? res?.orderId ?? intentId);
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
  const amount = details.amount ?? details.totalAmount ?? details.amountPaid;
  const paymentId = details.paymentId ?? details.razorpay_payment_id ?? details.payment_id;
  const currency = details.currency ?? "INR";

  return (
    <Box sx={{ minHeight: "60vh", py: 6, px: 2 }}>
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
                mb: 3,
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
                  <CustomText sx={{ fontSize: 14, fontWeight: 500, color: "#444" }}>
                    {paymentId}
                  </CustomText>
                </>
              )}
            </Paper>

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
