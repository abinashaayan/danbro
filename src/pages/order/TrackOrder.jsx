import React, { useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { trackOrder as trackOrderApi } from "../../utils/apiService";

export const TrackOrder = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");

  const handleTrackOrder = async () => {
    if (!orderId.trim()) {
      setError("Please enter an order ID");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await trackOrderApi(orderId.trim());
      const success = response?.success === true || response?.status === 200;
      const data = response?.data ?? response;
      if (success && data) {
        setOrderData(data);
      } else if (data && typeof data === "object" && (data.orderId || data.status)) {
        setOrderData(data);
      } else {
        setError(response?.message || "Order not found");
      }
    } catch (err) {
      console.error("Error tracking order:", err);
      setError(err?.message || "Failed to track order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getActiveStep = (s) => {
    const raw = (s || "").toLowerCase();
    const statusMap = {
      pending: 0,
      confirmed: 1,
      preparing: 2,
      out_for_delivery: 3,
      delivered: 4,
      cancelled: -1,
      paid: 1,
    };
    return statusMap[raw] ?? 0;
  };

  const formatOrderStatus = (s) => {
    const raw = (s || "").toLowerCase();
    const statusMap = {
      pending: "Order Pending",
      confirmed: "Order Confirmed",
      preparing: "Preparing",
      out_for_delivery: "Out for Delivery",
      delivered: "Delivered",
      cancelled: "Cancelled",
      paid: "Paid",
    };
    return statusMap[raw] || s || "—";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReset = () => {
    setOrderId("");
    setOrderData(null);
    setError("");
    setLoading(false);
  };

  return (
    <Box sx={{ py: 4, mb: 3 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <CustomText sx={{ fontSize: { xs: 28, md: 36 }, fontWeight: 700, color: "var(--themeColor)", mb: 1, }}>
            Track Your Order
          </CustomText>
          <CustomText sx={{ fontSize: { xs: 14, md: 16 }, color: "#666" }}>
            Enter your order ID to track your delivery status
          </CustomText>
        </Box>

        {/* Search Form */}

        <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" } }}>
          <TextField
            fullWidth
            placeholder="Enter Order ID (e.g., ORD-2024-001)"
            value={orderId}
            onChange={(e) => {
              setOrderId(e.target.value);
              if (error) setError("");
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                fontSize: { xs: 14, md: 16 },
              },
            }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: "#999", mr: 1 }} />,
            }}
          />
        </Box>
        <Box
          sx={{
            my: 2,
            display: "flex",
            justifyContent: "center",
            gap: 1.5,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            onClick={handleTrackOrder}
            disabled={loading}
            size="small"
            sx={{
              backgroundColor: "var(--themeColor)",
              color: "#fff",
              textTransform: "none",
              px: 2.5,
              py: 0.75,
              fontSize: 13,
              fontWeight: 600,
              minHeight: 32,
              "&:hover": {
                backgroundColor: "var(--specialColor)",
              },
              "&:disabled": {
                backgroundColor: "#ccc",
              },
            }}
          >
            {loading ? <CircularProgress size={16} color="inherit" /> : "Track Order"}
          </Button>

          {(orderData || error) && (
            <Button
              variant="outlined"
              onClick={handleReset}
              size="small"
              sx={{
                textTransform: "none",
                px: 2.5,
                py: 0.75,
                fontSize: 13,
                fontWeight: 600,
                minHeight: 32,
                borderColor: "var(--themeColor)",
                color: "var(--themeColor)",
                "&:hover": {
                  backgroundColor: "rgba(var(--themeColor-rgb, 230, 120, 80), 0.08)",
                  borderColor: "var(--themeColor)",
                },
              }}
            >
              Reset
            </Button>
          )}
        </Box>


        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {/* Order Details - single card */}
        {orderData && (() => {
          const orderIdVal = orderData._id || orderData.orderId;
          const orderStatus = orderData.order_state || orderData.status;
          const totalAmount = orderData.totalAmount ?? (Array.isArray(orderData.items) && orderData.items.length
            ? orderData.items.reduce((sum, i) => sum + (Number(i.total) || 0), 0)
            : 0);
          const addr = orderData.deliveryAddress || {};
          return (
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                overflow: "hidden",
                border: "1px solid #eee",
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
                {/* Header: Order ID + Status badge */}
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    pb: 2,
                    mb: 2,
                    borderBottom: "2px solid #f0f0f0",
                  }}
                >
                  <CustomText sx={{ fontSize: { xs: 15, md: 17 }, fontWeight: 700, color: "#2c2c2c" }}>
                    Order #{orderIdVal}
                  </CustomText>
                  <Box
                    sx={{
                      px: 2,
                      py: 0.75,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: 13,
                      textTransform: "capitalize",
                      backgroundColor:
                        (orderStatus || "").toLowerCase() === "cancelled"
                          ? "rgba(211, 47, 47, 0.12)"
                          : (orderStatus || "").toLowerCase() === "delivered"
                            ? "rgba(46, 125, 50, 0.12)"
                            : "rgba(var(--themeColor-rgb, 230, 120, 80), 0.15)",
                      color:
                        (orderStatus || "").toLowerCase() === "cancelled"
                          ? "#d32f2f"
                          : (orderStatus || "").toLowerCase() === "delivered"
                            ? "#2e7d32"
                            : "var(--themeColor)",
                    }}
                  >
                    {formatOrderStatus(orderStatus)}
                  </Box>
                </Box>

                {/* Order info row */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                    gap: 2,
                    mb: 3,
                  }}
                >
                  <Box>
                    <CustomText sx={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, mb: 0.5 }}>
                      Order Date
                    </CustomText>
                    <CustomText sx={{ fontSize: 14, fontWeight: 500 }}>
                      {formatDate(orderData.createdAt)}
                    </CustomText>
                  </Box>
                  <Box>
                    <CustomText sx={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, mb: 0.5 }}>
                      Payment
                    </CustomText>
                    <CustomText sx={{ fontSize: 14, fontWeight: 500 }}>
                      {orderData.paymentStatus || orderData.paymentMethod || "—"}
                    </CustomText>
                  </Box>
                  <Box>
                    <CustomText sx={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, mb: 0.5 }}>
                      Total Amount
                    </CustomText>
                    <CustomText sx={{ fontSize: 16, fontWeight: 700, color: "var(--themeColor)" }}>
                      ₹{Number(totalAmount).toFixed(2)}
                    </CustomText>
                  </Box>
                </Box>

                {/* Delivery address */}
                <Box sx={{ mb: 3 }}>
                  <CustomText sx={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, mb: 1 }}>
                    Delivery Address
                  </CustomText>
                  <Box sx={{ bgcolor: "#fafafa", borderRadius: 2, p: 2, border: "1px solid #f0f0f0" }}>
                    <CustomText sx={{ fontSize: 14, fontWeight: 600, color: "#2c2c2c" }}>
                      {addr.name || "—"}
                    </CustomText>
                    {addr.phone && (
                      <CustomText sx={{ fontSize: 13, color: "#666", mt: 0.5 }}>Phone: {addr.phone}</CustomText>
                    )}
                    <CustomText sx={{ fontSize: 13, color: "#666", mt: 0.5 }}>
                      {[addr.houseNumber, addr.streetName, addr.area, addr.landmark].filter(Boolean).join(", ") || "—"}
                    </CustomText>
                    <CustomText sx={{ fontSize: 13, color: "#666" }}>
                      {[addr.city, addr.state].filter(Boolean).join(", ")}
                      {addr.zipCode ? ` - ${addr.zipCode}` : ""}
                      {!addr.city && !addr.state && !addr.zipCode ? "—" : ""}
                    </CustomText>
                  </Box>
                </Box>

                {/* Order items - no image */}
                <Box>
                  <CustomText sx={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, mb: 1.5 }}>
                    Order Items
                  </CustomText>
                  {orderData.items && orderData.items.length > 0 ? (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                      {orderData.items.map((item, index) => {
                        const rate = item.rate ?? item.price ?? 0;
                        const lineTotal = item.total ?? (item.quantity * rate);
                        return (
                          <Box
                            key={item.product || index}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              py: 1.5,
                              px: 2,
                              borderRadius: 2,
                              bgcolor: "#fafafa",
                              border: "1px solid #f0f0f0",
                            }}
                          >
                            <Box>
                              <CustomText sx={{ fontSize: 14, fontWeight: 600 }}>{item.name || "—"}</CustomText>
                              <CustomText sx={{ fontSize: 12, color: "#666" }}>
                                Qty: {item.quantity} × ₹{Number(rate).toFixed(2)}
                              </CustomText>
                            </Box>
                            <CustomText sx={{ fontSize: 14, fontWeight: 600, color: "var(--themeColor)" }}>
                              ₹{Number(lineTotal).toFixed(2)}
                            </CustomText>
                          </Box>
                        );
                      })}
                    </Box>
                  ) : (
                    <CustomText sx={{ fontSize: 13, color: "#666" }}>No items in this order</CustomText>
                  )}
                </Box>
              </CardContent>
            </Card>
          );
        })()}
      </Container>
    </Box>
  );
};
