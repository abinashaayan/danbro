import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  
  Grid,
  Button,
  IconButton,
  Divider,
  Card,
  CardContent,
  TextField,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert,
} from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import {
  DeleteOutline as DeleteOutlineIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalShipping as LocalShippingIcon,
  Payment as PaymentIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getCart, increaseItemCount, decreaseItemCount } from "../../utils/cart";
import { getAccessToken } from "../../utils/cookies";
import api from "../../utils/api";
import { getMyAddresses } from "../../utils/apiService";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { AddressFormDialog } from "../../components/user/AddressFormDialog";

export const Cart = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingItems, setUpdatingItems] = useState(new Set());
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [couponsLoading, setCouponsLoading] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  useEffect(() => {
    loadCart();
    loadAddresses();
    loadCoupons();
  }, []);

  const loadAddresses = async () => {
    try {
      setAddressesLoading(true);
      const token = getAccessToken();
      if (!token) {
        setAddresses([]);
        return;
      }
      const data = await getMyAddresses();
      setAddresses(data || []);
      // Set default address as selected
      const defaultAddress = data?.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress._id || defaultAddress.id);
      } else if (data && data.length > 0) {
        setSelectedAddress(data[0]._id || data[0].id);
      }
    } catch (err) {
      console.error("Error loading addresses:", err);
      setAddresses([]);
    } finally {
      setAddressesLoading(false);
    }
  };

  const formatAddress = (address) => {
    const parts = [];
    if (address.houseNumber) parts.push(address.houseNumber);
    if (address.streetName) parts.push(address.streetName);
    if (address.area) parts.push(address.area);
    if (address.landmark) parts.push(`Near ${address.landmark}`);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.zipCode) parts.push(address.zipCode);
    return parts.join(", ");
  };

  const loadCoupons = async () => {
    try {
      setCouponsLoading(true);
      const token = getAccessToken();
      if (!token) {
        setCoupons([]);
        return;
      }
      const response = await api.get('/coupon/getAll');
      if (response.data && response.data.data) {
        // Format coupon data
        const formattedCoupons = response.data.data.map((coupon) => {
          const isPercentage = coupon.discountType === "ITEM_DISCOUNT_PERCENTAGE";
          const discount = isPercentage 
            ? `${coupon.discountPercentage}%` 
            : `₹${coupon.discountAmount}`;
          
          // Check if coupon is still valid
          const now = new Date();
          const validUntil = new Date(coupon.validTo);
          const isValid = validUntil >= now;

          return {
            id: coupon._id,
            code: coupon.couponCode,
            discount: discount,
            discountType: coupon.discountType,
            discountPercentage: coupon.discountPercentage,
            discountAmount: coupon.discountAmount,
            description: isPercentage 
              ? `Get ${coupon.discountPercentage}% off on your order` 
              : `Flat ₹${coupon.discountAmount} off on your order`,
            isValid: isValid,
          };
        }).filter(coupon => coupon.isValid); // Only show valid coupons
        setCoupons(formattedCoupons);
      }
    } catch (err) {
      console.error("Error loading coupons:", err);
      setCoupons([]);
    } finally {
      setCouponsLoading(false);
    }
  };

  const handleAddressSuccess = () => {
    loadAddresses();
    setAddressDialogOpen(false);
  };

  const handleCouponSelect = (couponId) => {
    const coupon = coupons.find(c => c.id === couponId);
    if (coupon) {
      setSelectedCoupon(couponId);
      setAppliedCoupon({
        code: coupon.code,
        discountPercent: coupon.discountPercentage || 0,
        discountAmount: coupon.discountAmount || 0,
        discountType: coupon.discountType,
      });
      setCouponCode(coupon.code);
      setCouponError("");
    }
  };

  const loadCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getAccessToken();
      if (!token) {
        setError("Please login to view your cart");
        setLoading(false);
        return;
      }
      const response = await getCart();
      
      // Handle API response structure: { success: true, data: [...], cartTotal: ... }
      if (response?.data && Array.isArray(response.data)) {
        setCartItems(response.data);
        // Set cartTotal if available in response
        if (response.cartTotal !== undefined) {
          setCartTotal(response.cartTotal);
        }
      } else if (response?.data?.data && Array.isArray(response.data.data)) {
        setCartItems(response.data.data);
        if (response.data.cartTotal !== undefined) {
          setCartTotal(response.data.cartTotal);
        }
      } else if (response?.data?.items) {
        setCartItems(response.data.items);
        if (response.data.cartTotal !== undefined) {
          setCartTotal(response.data.cartTotal);
        }
      } else if (response?.items) {
        setCartItems(response.items);
      } else if (Array.isArray(response)) {
        setCartItems(response);
      } else {
        setCartItems([]);
        setCartTotal(0);
      }
    } catch (err) {
      console.error("Error loading cart:", err);
      setError(err.response?.data?.message || err.message || "Failed to load cart");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, change) => {
    if (updatingItems.has(productId)) return;
    
    try {
      setUpdatingItems((prev) => new Set(prev).add(productId));
      
      if (change > 0) {
        await increaseItemCount(productId);
      } else {
        await decreaseItemCount(productId);
      }
      
      // Reload cart to get updated data
      await loadCart();
      // Dispatch event to update cart count in header
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError(err.response?.data?.message || err.message || "Failed to update quantity");
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const removeItem = async (productId) => {
    try {
      await decreaseItemCount(productId);
      await loadCart();
      // Dispatch event to update cart count in header
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    } catch (err) {
      console.error("Error removing item:", err);
      setError(err.response?.data?.message || err.message || "Failed to remove item");
    }
  };

  const [cartTotal, setCartTotal] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  // Apply coupon
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    setApplyingCoupon(true);
    setCouponError("");

    try {
      const response = await api.post('/coupon/apply', {
        couponCode: couponCode.trim(),
      });

      if (response.data && response.data.success) {
        const couponData = response.data.data || response.data;
        setAppliedCoupon({
          code: couponCode.trim(),
          discountPercent: couponData.discountPercentage || couponData.discount || 0,
          discountAmount: couponData.discountAmount || 0,
          discountType: couponData.discountType,
        });
        setCouponCode("");
      } else {
        setCouponError(response.data?.message || "Invalid coupon code");
      }
    } catch (err) {
      console.error("Error applying coupon:", err);
      setCouponError(err.response?.data?.message || err.message || "Failed to apply coupon");
    } finally {
      setApplyingCoupon(false);
    }
  };

  // Remove coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  // Calculate subtotal from cart items
  const subtotal = cartItems.reduce((sum, item) => {
    // Handle price - can be array or number
    let itemPrice = 0;
    if (Array.isArray(item.price) && item.price.length > 0) {
      itemPrice = item.price[0].rate || item.price[0].mrp || 0;
    } else if (typeof item.price === 'number') {
      itemPrice = item.price;
    } else if (item.lineTotal) {
      itemPrice = item.lineTotal;
    }
    
    const quantity = typeof item.quantity === 'number' ? item.quantity : parseInt(item.quantity) || 0;
    return sum + itemPrice * quantity;
  }, 0);

  // Use cartTotal from API if available, otherwise calculate
  const finalSubtotal = cartTotal > 0 ? cartTotal : subtotal;
  
  // Calculate discount based on coupon type
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "ITEM_DISCOUNT_PERCENTAGE" || appliedCoupon.discountPercent) {
      // Percentage discount
      discount = finalSubtotal * (appliedCoupon.discountPercent || 0) / 100;
    } else if (appliedCoupon.discountAmount) {
      // Fixed amount discount
      discount = appliedCoupon.discountAmount;
    }
  }
  
  const shipping = finalSubtotal > 50 ? 0 : 5.0;
  const total = finalSubtotal - discount + shipping;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", py: { xs: 3, md: 3 }, pb: { xs: 12, md: 4 }, mb: 4 }}>
      <Container sx={{ py: { xs: 2, md: 3 }, px: { xs: 2, md: 3 } }}>
        <Box sx={{ mb: { xs: 2, md: 3 } }}>
          <CustomText
            variant="h4"
            sx={{
              fontSize: { xs: 22, md: 28 },
              fontWeight: 700,
              color: "var(--themeColor)",
              mb: 0.5,
            }}
          >
            Shopping Cart
          </CustomText>
          <CustomText sx={{ fontSize: { xs: 13, md: 15 }, color: "#666" }}>
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </CustomText>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : cartItems.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: { xs: 8, md: 12 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: { xs: 64, md: 96 }, color: "#ddd" }} />
            <CustomText sx={{ fontSize: { xs: 18, md: 24 }, fontWeight: 600, color: "#666" }}>
              Your cart is empty
            </CustomText>
            <Button
              variant="contained"
              onClick={() => navigate("/products")}
              sx={{
                backgroundColor: "var(--themeColor)",
                color: "#fff",
                textTransform: "none",
                px: { xs: 4, md: 6 },
                py: { xs: 1.2, md: 1.5 },
                fontSize: { xs: 14, md: 16 },
                fontWeight: 600,
                mt: 2,
                "&:hover": {
                  backgroundColor: "var(--specialColor)",
                },
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {/* Cart Items */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, md: 2 } }}>
                {cartItems.map((item) => {
                  const productId = item.productId || item._id || item.id;
                  const isUpdating = updatingItems.has(productId);
                  
                  return (
                  <Card
                    key={productId || item.id}
                    sx={{
                      borderRadius: { xs: 2, md: 2.5 },
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 1.5, md: 2.5 } }}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: { xs: 2, md: 3 },
                          flexDirection: { xs: "column", sm: "row" },
                        }}
                      >
                        {/* Product Image */}
                        <Box
                          sx={{
                            width: { xs: "100%", sm: 110 },
                            height: { xs: 180, sm: 110 },
                            borderRadius: { xs: 2, md: 2 },
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={
                              (item.images && Array.isArray(item.images) && item.images.length > 0 && item.images[0].url) ||
                              item.image || 
                              item.product?.image || 
                              "https://via.placeholder.com/200"
                            }
                            alt={item.name || item.product?.name || "Product"}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>

                        {/* Product Details */}
                        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                          <Box>
                            <CustomText
                              sx={{
                                fontSize: { xs: 16, md: 18 },
                                fontWeight: 600,
                                color: "#2c2c2c",
                                mb: 0.5,
                              }}
                            >
                              {item.name || item.product?.name || "Product"}
                            </CustomText>
                            <CustomText
                              sx={{
                                fontSize: { xs: 12, md: 14 },
                                color: "#666",
                                mb: { xs: 1, md: 1.5 },
                              }}
                            >
                              Weight: {item.weight || item.product?.weight || "N/A"}
                            </CustomText>
                            <CustomText
                              sx={{
                                fontSize: { xs: 18, md: 20 },
                                fontWeight: 700,
                                color: "var(--themeColor)",
                              }}
                            >
                              ₹{
                                item.lineTotal 
                                  ? item.lineTotal.toFixed(2)
                                  : (Array.isArray(item.price) && item.price.length > 0)
                                    ? (item.price[0].rate || item.price[0].mrp || 0).toFixed(2)
                                    : (typeof item.price === 'number' ? item.price : parseFloat(item.price || 0)).toFixed(2)
                              }
                            </CustomText>
                          </Box>

                          {/* Quantity Controls */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              mt: { xs: 2, sm: 0 },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                border: "1px solid #ddd",
                                borderRadius: 2,
                                p: 0.5,
                              }}
                            >
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(productId, -1)}
                                disabled={isUpdating}
                                sx={{
                                  color: "var(--themeColor)",
                                  "&:hover": { backgroundColor: "rgba(95, 41, 48, 0.1)" },
                                  "&:disabled": { opacity: 0.5 },
                                }}
                              >
                                {isUpdating ? (
                                  <CircularProgress size={16} />
                                ) : (
                                <RemoveIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
                                )}
                              </IconButton>
                              <CustomText
                                sx={{
                                  minWidth: { xs: 30, md: 40 },
                                  textAlign: "center",
                                  fontSize: { xs: 14, md: 16 },
                                  fontWeight: 600,
                                }}
                              >
                                {item.quantity}
                              </CustomText>
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(productId, 1)}
                                disabled={isUpdating}
                                sx={{
                                  color: "var(--themeColor)",
                                  "&:hover": { backgroundColor: "rgba(95, 41, 48, 0.1)" },
                                  "&:disabled": { opacity: 0.5 },
                                }}
                              >
                                {isUpdating ? (
                                  <CircularProgress size={16} />
                                ) : (
                                <AddIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
                                )}
                              </IconButton>
                            </Box>

                            <IconButton
                              onClick={() => removeItem(productId)}
                              disabled={isUpdating}
                              sx={{
                                color: "#d32f2f",
                                "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.1)" },
                                "&:disabled": { opacity: 0.5 },
                              }}
                            >
                              <DeleteOutlineIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                  );
                })}
              </Box>

              {/* Continue Shopping Button */}
              <Box sx={{ mt: { xs: 2, md: 3 } }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/products")}
                  sx={{
                    borderColor: "var(--themeColor)",
                    color: "var(--themeColor)",
                    textTransform: "none",
                    px: { xs: 3, md: 4 },
                    py: { xs: 0.9, md: 1.1 },
                    fontSize: { xs: 13, md: 15 },
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: "var(--specialColor)",
                      color: "var(--specialColor)",
                      backgroundColor: "rgba(195, 46, 6, 0.05)",
                    },
                  }}
                >
                  Continue Shopping
                </Button>
              </Box>
            </Grid>

            {/* Order Summary */}
            <Grid size={{ xs: 12, md: 4 }}>
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
                    Saved Addresses
                  </CustomText>

                  {addressesLoading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 1.5 }}>
                      <CircularProgress size={20} />
                    </Box>
                  ) : addresses.length === 0 ? (
                    <Box sx={{ mb: 1.5 }}>
                      <CustomText sx={{ fontSize: { xs: 13, md: 14 }, color: "#666", mb: 1.5 }}>
                        No saved addresses. Please add an address.
                      </CustomText>
                      <Button
                        variant="outlined"
                        onClick={() => setAddressDialogOpen(true)}
                        sx={{
                          borderColor: "var(--themeColor)",
                          color: "var(--themeColor)",
                          textTransform: "none",
                          fontSize: { xs: 12, md: 13 },
                          py: 0.8,
                          "&:hover": {
                            borderColor: "var(--themeColor)",
                            backgroundColor: "#fbeeee",
                          },
                        }}
                      >
                        Add Address
                      </Button>
                    </Box>
                  ) : (
                    <RadioGroup
                      value={selectedAddress || ""}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      sx={{ mb: 1.5 }}
                    >
                      {addresses.map((address) => {
                        const addressId = address._id || address.id;
                        return (
                          <Card
                            key={addressId}
                            sx={{
                              mb: 1.5,
                              border: selectedAddress === addressId ? "2px solid var(--themeColor)" : "1px solid #ddd",
                              borderRadius: 2,
                              transition: "all 0.3s ease",
                              "&:hover": {
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                              },
                            }}
                          >
                            <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                              <FormControlLabel
                                value={addressId}
                                control={<Radio sx={{ color: "var(--themeColor)" }} />}
                                label={
                                  <Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                                      <CustomText sx={{ fontWeight: 600, fontSize: { xs: 14, md: 16 } }}>
                                        {address.addressType || "Address"}
                                      </CustomText>
                                      {address.isDefault && (
                                        <Box
                                          sx={{
                                            px: 1,
                                            py: 0.2,
                                            borderRadius: 1,
                                            backgroundColor: "#FFB5A1",
                                            color: "#000",
                                            fontSize: 10,
                                            fontWeight: 600,
                                          }}
                                        >
                                          Default
                                        </Box>
                                      )}
                                    </Box>
                                    <CustomText sx={{ fontSize: { xs: 12, md: 14 }, color: "#666" }}>
                                      {formatAddress(address)}
                                    </CustomText>
                                  </Box>
                                }
                                sx={{ width: "100%", m: 0, alignItems: "flex-start" }}
                              />
                            </CardContent>
                          </Card>
                        );
                      })}
                    </RadioGroup>
                  )}
                  
                  {/* Add New Address Button */}
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => setAddressDialogOpen(true)}
                    sx={{
                      borderColor: "var(--themeColor)",
                      color: "var(--themeColor)",
                      textTransform: "none",
                      mt: 1.5,
                      py: 1,
                      fontSize: { xs: 13, md: 14 },
                      fontWeight: 600,
                      "&:hover": {
                        borderColor: "var(--themeColor)",
                        backgroundColor: "#fbeeee",
                      },
                    }}
                  >
                    Add New Address
                  </Button>
                </CardContent>
              </Card>

              <Card
                sx={{
                  borderRadius: { xs: 2, md: 2.5 },
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  position: { md: "sticky" },
                  top: { md: 100 },
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
                  <Box sx={{ mb: 1.5 }}>
                    <CustomText sx={{ fontSize: { xs: 13, md: 15 }, fontWeight: 600, mb: 1, color: "#2c2c2c" }}>
                      Available Coupons
                    </CustomText>
                    
                    {couponsLoading ? (
                      <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
                        <CircularProgress size={20} />
                      </Box>
                    ) : coupons.length === 0 ? (
                      <Box sx={{ mb: 1.5 }}>
                        <CustomText sx={{ fontSize: { xs: 11, md: 12 }, color: "#666", mb: 1 }}>
                          No coupons available
                        </CustomText>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => {
                              setCouponCode(e.target.value.toUpperCase());
                              setCouponError("");
                            }}
                            disabled={applyingCoupon || !!appliedCoupon}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            }}
                          />
                          <Button
                            variant="contained"
                            onClick={handleApplyCoupon}
                            disabled={!couponCode || applyingCoupon || !!appliedCoupon}
                            sx={{
                              backgroundColor: appliedCoupon ? "#4caf50" : "var(--themeColor)",
                              color: "#fff",
                              textTransform: "none",
                              borderRadius: 2,
                              px: 2.5,
                              fontSize: { xs: 12, md: 13 },
                              "&:hover": {
                                backgroundColor: appliedCoupon ? "#45a049" : "var(--specialColor)",
                              },
                              "&:disabled": {
                                backgroundColor: "#ccc",
                              },
                            }}
                          >
                            {applyingCoupon ? "Applying..." : appliedCoupon ? "Applied" : "Apply"}
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <RadioGroup
                        value={selectedCoupon || ""}
                        onChange={(e) => handleCouponSelect(e.target.value)}
                        sx={{ mb: 1.5 }}
                      >
                        {coupons.map((coupon) => (
                          <Card
                            key={coupon.id}
                            sx={{
                              mb: 1,
                              border: selectedCoupon === coupon.id ? "2px solid var(--themeColor)" : "1px solid #ddd",
                              borderRadius: 2,
                              transition: "all 0.3s ease",
                              "&:hover": {
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                              },
                            }}
                          >
                            <CardContent sx={{ p: 1.2, "&:last-child": { pb: 1.2 } }}>
                              <FormControlLabel
                                value={coupon.id}
                                control={<Radio sx={{ color: "var(--themeColor)", padding: "4px" }} />}
                                label={
                                  <Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.3 }}>
                                      <CustomText sx={{ fontWeight: 600, fontSize: { xs: 13, md: 14 }, color: "var(--themeColor)" }}>
                                        {coupon.code}
                                      </CustomText>
                                      <Box
                                        sx={{
                                          px: 0.8,
                                          py: 0.15,
                                          borderRadius: 1,
                                          backgroundColor: "#FFB5A1",
                                          color: "#000",
                                          fontSize: 9,
                                          fontWeight: 600,
                                        }}
                                      >
                                        {coupon.discount} OFF
                                      </Box>
                                    </Box>
                                    <CustomText sx={{ fontSize: { xs: 10, md: 11 }, color: "#666" }}>
                                      {coupon.description}
                                    </CustomText>
                                  </Box>
                                }
                                sx={{ width: "100%", m: 0, alignItems: "flex-start" }}
                              />
                            </CardContent>
                          </Card>
                        ))}
                      </RadioGroup>
                    )}
                    
                    {/* Manual Coupon Input */}
                    {coupons.length > 0 && (
                      <Box sx={{ mt: 1.5, pt: 1.5, borderTop: "1px solid #eee" }}>
                        <CustomText sx={{ fontSize: { xs: 11, md: 12 }, fontWeight: 600, mb: 0.8, color: "#2c2c2c" }}>
                          Or Enter Coupon Code
                        </CustomText>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => {
                              setCouponCode(e.target.value.toUpperCase());
                              setCouponError("");
                              setSelectedCoupon(null);
                            }}
                            disabled={applyingCoupon || !!appliedCoupon}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            }}
                          />
                          <Button
                            variant="contained"
                            onClick={handleApplyCoupon}
                            disabled={!couponCode || applyingCoupon || !!appliedCoupon}
                            sx={{
                              backgroundColor: appliedCoupon ? "#4caf50" : "var(--themeColor)",
                              color: "#fff",
                              textTransform: "none",
                              borderRadius: 2,
                              px: 2.5,
                              fontSize: { xs: 12, md: 13 },
                              "&:hover": {
                                backgroundColor: appliedCoupon ? "#45a049" : "var(--specialColor)",
                              },
                              "&:disabled": {
                                backgroundColor: "#ccc",
                              },
                            }}
                          >
                            {applyingCoupon ? "Applying..." : appliedCoupon ? "Applied" : "Apply"}
                          </Button>
                        </Box>
                      </Box>
                    )}
                    
                    {couponError && (
                      <Alert severity="error" sx={{ mt: 1, fontSize: 11, py: 0.5 }}>
                        {couponError}
                      </Alert>
                    )}
                    {appliedCoupon && (
                      <Alert severity="success" sx={{ mt: 1, fontSize: 11, py: 0.5 }}>
                        Coupon "{appliedCoupon.code}" applied! {
                          appliedCoupon.discountType === "ITEM_DISCOUNT_PERCENTAGE" || appliedCoupon.discountPercent
                            ? `${appliedCoupon.discountPercent}% discount`
                            : `₹${appliedCoupon.discountAmount} off`
                        }
                      </Alert>
                    )}
                    {appliedCoupon && (
                      <Button
                        size="small"
                        onClick={() => {
                          handleRemoveCoupon();
                          setSelectedCoupon(null);
                        }}
                        sx={{ mt: 0.8, textTransform: "none", fontSize: 11 }}
                      >
                        Remove Coupon
                      </Button>
                    )}
                  </Box>

                  <Divider sx={{ mb: 1.5 }} />

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2, mb: 1.5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <CustomText sx={{ fontSize: { xs: 13, md: 15 }, color: "#666" }}>
                        Subtotal
                      </CustomText>
                      <CustomText sx={{ fontSize: { xs: 13, md: 15 }, fontWeight: 600 }}>
                        ₹{finalSubtotal.toFixed(2)}
                      </CustomText>
                    </Box>

                    {appliedCoupon && discount > 0 && (
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <CustomText sx={{ fontSize: { xs: 13, md: 15 }, color: "#4caf50" }}>
                          Discount ({appliedCoupon.code})
                        </CustomText>
                        <CustomText sx={{ fontSize: { xs: 13, md: 15 }, fontWeight: 600, color: "#4caf50" }}>
                          -₹{discount.toFixed(2)}
                        </CustomText>
                      </Box>
                    )}

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <CustomText sx={{ fontSize: { xs: 13, md: 15 }, color: "#666" }}>
                        Shipping
                      </CustomText>
                      <CustomText sx={{ fontSize: { xs: 13, md: 15 }, fontWeight: 600 }}>
                        {shipping === 0 ? (
                          <Box component="span" sx={{ color: "#4caf50" }}>
                            Free
                          </Box>
                        ) : (
                          `₹${shipping.toFixed(2)}`
                        )}
                      </CustomText>
                    </Box>

                    {finalSubtotal < 50 && (
                      <CustomText
                        sx={{
                          fontSize: { xs: 11, md: 12 },
                          color: "#ED7D2B",
                          fontStyle: "italic",
                        }}
                      >
                        Add ₹{(50 - finalSubtotal).toFixed(2)} more for free shipping
                      </CustomText>
                    )}

                    <Divider sx={{ my: 0.8 }} />

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate("/checkout")}
                    sx={{
                      backgroundColor: "var(--themeColor)",
                      color: "#fff",
                      textTransform: "none",
                      py: { xs: 1.1, md: 1.3 },
                      fontSize: { xs: 13, md: 15 },
                      fontWeight: 600,
                      mb: 1.5,
                      "&:hover": {
                        backgroundColor: "var(--specialColor)",
                      },
                    }}
                  >
                    Proceed to Checkout
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
            </Grid>
          </Grid>
        )}
      </Container>
      
      {/* Address Form Dialog */}
      <AddressFormDialog
        open={addressDialogOpen}
        onClose={() => setAddressDialogOpen(false)}
        onSuccess={handleAddressSuccess}
      />
    </Box>
  );
};

