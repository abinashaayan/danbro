import React, { useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Grid,
  Divider,
  Alert,
} from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

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
      const response = await api.get(`/order/track/${orderId.trim()}`);
      if (response.data && response.data.success) {
        setOrderData(response.data.data);
      } else {
        setError(response.data?.message || "Order not found");
      }
    } catch (err) {
      console.error("Error tracking order:", err);
      setError(err.response?.data?.message || "Failed to track order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getActiveStep = (status) => {
    const statusMap = {
      'pending': 0,
      'confirmed': 1,
      'preparing': 2,
      'out_for_delivery': 3,
      'delivered': 4,
      'cancelled': -1
    };
    return statusMap[status] || 0;
  };

  const formatOrderStatus = (status) => {
    const statusMap = {
      'pending': 'Order Pending',
      'confirmed': 'Order Confirmed',
      'preparing': 'Preparing',
      'out_for_delivery': 'Out for Delivery',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
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

  const steps = [
    'Order Placed',
    'Order Confirmed',
    'Preparing',
    'Out for Delivery',
    'Delivered'
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa", py: 4 }}>
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
        <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleTrackOrder}
            disabled={loading}
            sx={{
              backgroundColor: "var(--themeColor)",
              color: "#fff",
              textTransform: "none",
              px: { xs: 3, md: 4 },
              py: { xs: 1.5, md: 1.8 },
              fontSize: { xs: 14, md: 16 },
              fontWeight: 600,
              minWidth: "150px",
              maxWidth: "200px",
              "&:hover": {
                backgroundColor: "var(--specialColor)",
              },
              "&:disabled": {
                backgroundColor: "#ccc",
              },
            }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : "Track Order"}
          </Button>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {/* Order Details */}
        {orderData && (
          <>
            {/* Order Status */}
            <Card sx={{ mb: 4, borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <CustomText
                  sx={{
                    fontSize: { xs: 18, md: 20 },
                    fontWeight: 600,
                    color: "#2c2c2c",
                    mb: 3,
                  }}
                >
                  Order Status
                </CustomText>

                <Stepper
                  activeStep={getActiveStep(orderData.status)}
                  alternativeLabel
                  sx={{ mb: 3 }}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                <Box sx={{ textAlign: "center", py: 2 }}>
                  <CustomText
                    sx={{
                      fontSize: { xs: 16, md: 18 },
                      fontWeight: 600,
                      color: orderData.status === 'delivered' ? "#2e7d32" :
                        orderData.status === 'cancelled' ? "#d32f2f" : "var(--themeColor)",
                    }}
                  >
                    {formatOrderStatus(orderData.status)}
                  </CustomText>
                  {orderData.estimatedDelivery && (
                    <CustomText sx={{ fontSize: { xs: 12, md: 14 }, color: "#666", mt: 1 }}>
                      Estimated Delivery: {formatDate(orderData.estimatedDelivery)}
                    </CustomText>
                  )}
                </Box>
              </CardContent>
            </Card>

            {/* Order Information */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <CustomText
                      sx={{
                        fontSize: { xs: 16, md: 18 },
                        fontWeight: 600,
                        color: "#2c2c2c",
                        mb: 2,
                      }}
                    >
                      Order Information
                    </CustomText>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <CustomText sx={{ fontSize: { xs: 13, md: 14 }, color: "#666" }}>
                          Order ID
                        </CustomText>
                        <CustomText sx={{ fontSize: { xs: 13, md: 14 }, fontWeight: 500 }}>
                          {orderData.orderId}
                        </CustomText>
                      </Box>

                      <Divider />

                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <CustomText sx={{ fontSize: { xs: 13, md: 14 }, color: "#666" }}>
                          Order Date
                        </CustomText>
                        <CustomText sx={{ fontSize: { xs: 13, md: 14 }, fontWeight: 500 }}>
                          {formatDate(orderData.createdAt)}
                        </CustomText>
                      </Box>

                      <Divider />

                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <CustomText sx={{ fontSize: { xs: 13, md: 14 }, color: "#666" }}>
                          Total Amount
                        </CustomText>
                        <CustomText sx={{ fontSize: { xs: 13, md: 14 }, fontWeight: 600, color: "var(--themeColor)" }}>
                          ₹{orderData.totalAmount?.toFixed(2) || "0.00"}
                        </CustomText>
                      </Box>

                      <Divider />

                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <CustomText sx={{ fontSize: { xs: 13, md: 14 }, color: "#666" }}>
                          Payment Method
                        </CustomText>
                        <CustomText sx={{ fontSize: { xs: 13, md: 14 }, fontWeight: 500 }}>
                          {orderData.paymentMethod || "N/A"}
                        </CustomText>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <CustomText
                      sx={{
                        fontSize: { xs: 16, md: 18 },
                        fontWeight: 600,
                        color: "#2c2c2c",
                        mb: 2,
                      }}
                    >
                      Delivery Address
                    </CustomText>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                      {orderData.deliveryAddress ? (
                        <>
                          <CustomText sx={{ fontSize: { xs: 13, md: 14 }, fontWeight: 500 }}>
                            {orderData.deliveryAddress.name || "N/A"}
                          </CustomText>
                          <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
                            {orderData.deliveryAddress.address || "N/A"}
                          </CustomText>
                          <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
                            {orderData.deliveryAddress.city && orderData.deliveryAddress.state &&
                              `${orderData.deliveryAddress.city}, ${orderData.deliveryAddress.state}`
                            }
                            {orderData.deliveryAddress.pinCode &&
                              ` - ${orderData.deliveryAddress.pinCode}`
                            }
                          </CustomText>
                          {orderData.deliveryAddress.phone && (
                            <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
                              Phone: {orderData.deliveryAddress.phone}
                            </CustomText>
                          )}
                        </>
                      ) : (
                        <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
                          Delivery address not available
                        </CustomText>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Order Items */}
            <Card sx={{ mt: 3, borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <CustomText
                  sx={{
                    fontSize: { xs: 16, md: 18 },
                    fontWeight: 600,
                    color: "#2c2c2c",
                    mb: 2,
                  }}
                >
                  Order Items
                </CustomText>

                {orderData.items && orderData.items.length > 0 ? (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {orderData.items.map((item, index) => (
                      <Box key={index} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <Box
                          component="img"
                          src={item.image || "/placeholder-product.jpg"}
                          alt={item.name}
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: 2,
                            objectFit: "cover",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <CustomText sx={{ fontSize: { xs: 13, md: 14 }, fontWeight: 500 }}>
                            {item.name}
                          </CustomText>
                          <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
                            Qty: {item.quantity} × ₹{item.price?.toFixed(2) || "0.00"}
                          </CustomText>
                        </Box>
                        <CustomText sx={{ fontSize: { xs: 13, md: 14 }, fontWeight: 600 }}>
                          ₹{(item.quantity * item.price)?.toFixed(2) || "0.00"}
                        </CustomText>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
                    No items found in this order
                  </CustomText>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </Container>
    </Box>
  );
};
