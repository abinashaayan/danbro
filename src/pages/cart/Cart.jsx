import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadCartItems, updateCartItemQuantity, removeCartItem } from "../../store/cartSlice";
import { getAccessToken } from "../../utils/cookies";
import api from "../../utils/api";
import { getMyAddresses } from "../../utils/apiService";
import { initiateOrderSelf, initiateOrderOther, verifyOrderPayment } from "../../utils/apiService";
import { CartItem } from "../../components/cart/CartItem";
import { OrderSummary } from "../../components/cart/OrderSummary";
import { AddressSection } from "../../components/cart/AddressSection";
import { EmptyCart } from "../../components/cart/EmptyCart";

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Redux state
  const { 
    items: cartItems, 
    cartTotal, 
    loading, 
    error, 
    updatingItems, 
    updatingAction,
    isGuest 
  } = useAppSelector((state) => state.cart);

  // Local state for addresses and coupons
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [deliveryType, setDeliveryType] = useState('self'); // 'self' or 'someone_else'
  const [someoneElseData, setSomeoneElseData] = useState({
    name: '',
    phone: '',
    address: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [coupons, setCoupons] = useState([]);
  const [couponsLoading, setCouponsLoading] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  // Order initiation state
  const [orderInitiating, setOrderInitiating] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [paymentVerifying, setPaymentVerifying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'failure', null

  const getItemKey = (productId, weight) => `${productId ?? ""}|${weight ?? ""}`;

  useEffect(() => {
    dispatch(loadCartItems());
    loadAddresses();
    loadCoupons();
  }, [dispatch]);

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

  const handleInitiateOrder = async () => {
    try {
      setOrderInitiating(true);
      setOrderError("");
      setPaymentStatus(null);

      let orderResponse;

      if (deliveryType === 'self') {
        if (!selectedAddress) {
          setOrderError("Please select a delivery address");
          return;
        }
        
        orderResponse = await initiateOrderSelf({
          addressId: selectedAddress,
          paymentMode: paymentMode,
          instructions: deliveryInstructions,
        });
      } else {
        // someone_else delivery
        if (!someoneElseData.name || !someoneElseData.phone) {
          setOrderError("Please fill in recipient name and phone number");
          return;
        }

        orderResponse = await initiateOrderOther({
          deliveryAddress: {
            name: someoneElseData.name,
            phone: someoneElseData.phone,
            houseNumber: someoneElseData.address,
            streetName: "",
            area: someoneElseData.address,
            landmark: someoneElseData.landmark,
            city: someoneElseData.city,
            state: someoneElseData.state,
            zipCode: someoneElseData.pincode,
          },
          paymentMode: paymentMode,
          instructions: deliveryInstructions,
        });
      }

      // Order initiated successfully, now verify payment
      if (orderResponse?.data?.orderId) {
        await handleVerifyPayment(orderResponse.data.orderId);
      } else {
        throw new Error("Order initiation failed: No order ID received");
      }

    } catch (error) {
      console.error("Order initiation error:", error);
      setOrderError(error.message || "Failed to initiate order. Please try again.");
      setPaymentStatus('failure');
    } finally {
      setOrderInitiating(false);
    }
  };

  const handleVerifyPayment = async (orderId) => {
    try {
      setPaymentVerifying(true);
      setPaymentStatus(null);

      const verificationResponse = await verifyOrderPayment(orderId);

      if (verificationResponse?.success) {
        setPaymentStatus('success');
        // Clear cart after successful order
        dispatch(loadCartItems());
        // Navigate to order success page after a delay
        setTimeout(() => {
          navigate('/order-success', { 
            state: { 
              orderId: orderId,
              message: 'Order placed successfully!' 
            } 
          });
        }, 2000);
      } else {
        setPaymentStatus('failure');
        setOrderError(verificationResponse?.message || "Payment verification failed");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      setPaymentStatus('failure');
      setOrderError(error.message || "Payment verification failed. Please try again.");
    } finally {
      setPaymentVerifying(false);
    }
  };

  const updateQuantity = async (productId, change, weight) => {
    const itemKey = getItemKey(productId, weight);
    if (updatingItems.has(itemKey)) return;
    
    try {
      await dispatch(updateCartItemQuantity({ productId, change, weight }));
      // Reload cart after update
      await dispatch(loadCartItems());
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeItem = async (productId, weight) => {
    try {
      await dispatch(removeCartItem({ productId, weight }));
      // Reload cart after removal
      await dispatch(loadCartItems());
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

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

  // Calculate subtotal from cart items (guest items have lineTotal = rate * qty already)
  const subtotal = cartItems?.reduce((sum, item) => {
    if (item.lineTotal != null && !isNaN(item.lineTotal)) {
      return sum + Number(item.lineTotal);
    }
    let itemPrice = 0;
    if (Array.isArray(item.price) && item.price.length > 0) {
      itemPrice = item.price[0].rate || item.price[0].mrp || 0;
    } else if (typeof item.price === "object" && item.price && (item.price.rate != null || item.price.mrp != null)) {
      itemPrice = Number(item.price.rate) || Number(item.price.mrp) || 0;
    } else if (typeof item.price === "number") {
      itemPrice = item.price;
    }
    const quantity = typeof item.quantity === "number" ? item.quantity : parseInt(item.quantity, 10) || 0;
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
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", p: { xs: 1, sm: 2, md: 3 }, pt: { xs: 1, sm: 2, md: 3 }, pb: { xs: 12, md: 4 }, mb: 4 }}>
      <Container sx={{ px: { xs: 1, sm: 2, md: 3 }, maxWidth: "100%" }}>
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
            {cartItems?.length} {cartItems?.length === 1 ? "item" : "items"} in your cart
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
        ) : cartItems?.length === 0 ? (
          <EmptyCart navigate={navigate} />
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {/* Cart Items */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, md: 2 } }}>
                {cartItems?.map((item) => (
                  <CartItem
                    key={item.productId || item._id || item.id}
                    item={item}
                    updatingItems={updatingItems}
                    updatingAction={updatingAction}
                    getItemKey={getItemKey}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                ))}
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

            {/* Address Section and Order Summary */}
            <Grid size={{ xs: 12, md: 4 }}>
              <AddressSection
                addresses={addresses}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                addressesLoading={addressesLoading}
                addressDialogOpen={addressDialogOpen}
                setAddressDialogOpen={setAddressDialogOpen}
                handleAddressSuccess={handleAddressSuccess}
                deliveryType={deliveryType}
                setDeliveryType={setDeliveryType}
                someoneElseData={someoneElseData}
                setSomeoneElseData={setSomeoneElseData}
              />
              
              <OrderSummary
                finalSubtotal={finalSubtotal}
                discount={discount}
                shipping={shipping}
                total={total}
                appliedCoupon={appliedCoupon}
                couponCode={couponCode}
                couponError={couponError}
                applyingCoupon={applyingCoupon}
                setCouponCode={setCouponCode}
                handleApplyCoupon={handleApplyCoupon}
                handleRemoveCoupon={handleRemoveCoupon}
                selectedAddress={selectedAddress}
                cartItems={cartItems}
                deliveryType={deliveryType}
                someoneElseData={someoneElseData}
                onInitiateOrder={handleInitiateOrder}
                orderInitiating={orderInitiating}
                orderError={orderError}
                paymentMode={paymentMode}
                setPaymentMode={setPaymentMode}
                deliveryInstructions={deliveryInstructions}
                setDeliveryInstructions={setDeliveryInstructions}
                paymentStatus={paymentStatus}
                paymentVerifying={paymentVerifying}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};
