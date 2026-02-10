import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent
} from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadCartItems, updateCartItemQuantity, removeCartItem, clearCartItems } from "../../store/cartSlice";
import { getGuestWishlist } from "../../store/guestSlice";
import { getAccessToken } from "../../utils/cookies";
import { getMyAddresses, getAllCoupons, applyCoupon, removeCoupon } from "../../utils/apiService";
import { initiateOrderSelf, initiateOrderOther } from "../../utils/apiService";
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
    isGuest,
    cartSubtotal,
    cartTaxTotal,
    cartDiscount,
    cartFinalAmount,
    appliedCoupon: appliedCouponFromApi,
  } = useAppSelector((state) => state.cart);
  const guestWishlist = useAppSelector(getGuestWishlist);

  // Local state for addresses and coupons
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [deliveryType, setDeliveryType] = useState('self'); // 'self' or 'someone_else'
  // For "OTHER" orders (guest-style address entry)
  const [someoneElseData, setSomeoneElseData] = useState({
    name: "",
    phone: "",
    houseNumber: "",
    streetName: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [coupons, setCoupons] = useState([]);
  const [couponsLoading, setCouponsLoading] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  // Applied coupon is now driven by API (/cart/get) via Redux cartSlice
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

  const getDisplayAddress = () => {
    if (deliveryType === "self" && selectedAddress) {
      const addr = addresses.find((a) => (a._id || a.id) === selectedAddress);
      if (addr) {
        const parts = [addr.houseNumber, addr.streetName, addr.area, addr.landmark && `Near ${addr.landmark}`, addr.city, addr.state, addr.zipCode].filter(Boolean);
        return parts.join(", ");
      }
    }
    const o = someoneElseData;
    if (o?.houseNumber || o?.streetName || o?.area || o?.city) {
      const parts = [o.houseNumber, o.streetName, o.area, o.landmark && `Near ${o.landmark}`, o.city, o.state, o.zipCode].filter(Boolean);
      return parts.join(", ");
    }
    return "";
  };

  useEffect(() => {
    dispatch(loadCartItems());
    loadAddresses();
    loadCoupons();
  }, [dispatch]);

  // Refetch cart when page is restored from back-forward cache (e.g. user clicked Back from payment success)
  useEffect(() => {
    const onPageShow = (e) => {
      if (e.persisted) dispatch(loadCartItems());
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [dispatch]);

  // Scroll to top when order error appears so user sees it without scrolling
  useEffect(() => {
    if (orderError) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [orderError]);

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
      const response = await getAllCoupons();
      if (response && response.data) {
        const formattedCoupons = response.data.map((coupon) => {
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
      setCouponCode(coupon.code);
      setCouponError("");
    }
  };

  const handleInitiateOrder = async () => {
    if (isGuest) {
      navigate("/login", {
        state: {
          fromCart: true,
          cartItems: cartItems?.map((item) => ({
            productId: item?.productId || item?.id,
            quantity: Number(item?.quantity) || 1,
          })) || [],
          wishlist: guestWishlist || [],
          appliedCoupon: appliedCouponFromApi?.couponCode ? { couponCode: appliedCouponFromApi.couponCode } : undefined,
        },
      });
      return;
    }
    try {
      setOrderInitiating(true);
      setOrderError("");
      setPaymentStatus(null);
      let orderResponse;
      if (deliveryType === 'self') {
        if (!selectedAddress) {
          setOrderError("Please select a delivery address");
          setOrderInitiating(false);
          return;
        }
        orderResponse = await initiateOrderSelf({
          addressId: selectedAddress,
          paymentMode: paymentMode,
          instructions: deliveryInstructions,
          couponCode: appliedCouponFromApi?.couponCode || couponCode || undefined,
        });
      } else {
        if (
          !someoneElseData?.name ||
          !someoneElseData?.phone ||
          !someoneElseData?.houseNumber ||
          !someoneElseData?.streetName ||
          !someoneElseData?.area ||
          !someoneElseData?.city ||
          !someoneElseData?.state ||
          !someoneElseData?.zipCode
        ) {
          setOrderError("Please fill in all required delivery address fields");
          setOrderInitiating(false);
          return;
        }
        const nameTrim = (someoneElseData?.name || "").trim();
        const phoneTrim = (someoneElseData?.phone || "").trim();
        const nameValid = /^[a-zA-Z\s.'-]+$/.test(nameTrim);
        const phoneValid = /^\d{10}$/.test(phoneTrim.replace(/\D/g, ""));
        if (!nameValid || nameTrim.length < 2) {
          setOrderError("Recipient name should contain only letters and spaces (at least 2 characters).");
          setOrderInitiating(false);
          return;
        }
        if (!phoneValid) {
          setOrderError("Please enter a valid 10 digit phone number.");
          setOrderInitiating(false);
          return;
        }
        orderResponse = await initiateOrderOther({
          deliveryAddress: {
            name: someoneElseData?.name,
            phone: someoneElseData?.phone,
            houseNumber: someoneElseData?.houseNumber,
            streetName: someoneElseData?.streetName,
            area: someoneElseData?.area,
            landmark: someoneElseData?.landmark,
            city: someoneElseData?.city,
            state: someoneElseData?.state,
            zipCode: someoneElseData?.zipCode,
          },
          paymentMode: paymentMode,
          instructions: deliveryInstructions,
          couponCode: appliedCouponFromApi?.couponCode || couponCode || undefined,
        });
      }
      const orderId = orderResponse?.orderId;
      const paymentLink = orderResponse?.paymentLink;
      const intentId = orderResponse?.intentId;
      const responsePaymentMode = (orderResponse?.paymentMode || paymentMode || "").toString().toUpperCase();

      if (!orderId) {
        throw new Error("Order initiation failed: No order ID received");
      }

      if (responsePaymentMode === "COD") {
        if (intentId) {
          sessionStorage.setItem("pendingIntentId", intentId);
          sessionStorage.setItem("pendingOrderId", orderId);
        }
        dispatch(loadCartItems());
        navigate("/order-success", {
          state: {
            orderId,
            orderDetails: {
              orderId,
              amount: orderResponse?.amount,
              intentId,
            },
            intentId,
          },
        });
        return;
      }

      if (paymentLink && intentId) {
        sessionStorage.setItem("pendingIntentId", intentId);
        sessionStorage.setItem("pendingOrderId", orderId);
        window.location.href = paymentLink;
        return;
      }

      setOrderError("Order initiated but payment link missing. Please contact support.");
    } catch (error) {
      console.error("Order initiation error:", error);
      setOrderError(error.message || "Failed to initiate order. Please try again.");
      setPaymentStatus('failure');
    } finally {
      setOrderInitiating(false);
    }
  };

  const updateQuantity = async (productId, change, weight) => {
    const itemKey = getItemKey(productId, weight);
    if (updatingItems.has(itemKey)) return;

    try {
      await dispatch(updateCartItemQuantity({ productId, change, weight }));
      await dispatch(loadCartItems());
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeItem = async (productId, weight) => {
    try {
      await dispatch(removeCartItem({ productId, weight }));
      await dispatch(loadCartItems());
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm("Remove all items from your cart?")) return;
    try {
      await dispatch(clearCartItems());
      await dispatch(loadCartItems());
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  // Apply coupon by code (used by manual input and by dialog selection)
  const handleApplyCouponWithCode = async (code) => {
    const trimmed = typeof code === "string" ? code.trim() : "";
    if (!trimmed) {
      setCouponError("Please enter a coupon code");
      return;
    }
    if (!cartItems?.length) {
      setCouponError("Add items to cart to apply a coupon");
      return;
    }

    setApplyingCoupon(true);
    setCouponError("");

    try {
      await applyCoupon(trimmed);
      await dispatch(loadCartItems());
      setCouponCode("");
      setSelectedCoupon(null);
      setCouponError("");
    } catch (err) {
      console.error("Error applying coupon:", err);
      setCouponError(err?.message || "Failed to apply coupon");
      throw err;
    } finally {
      setApplyingCoupon(false);
    }
  };

  const handleApplyCoupon = async () => {
    await handleApplyCouponWithCode(couponCode);
  };

  // Remove coupon via API and reload cart
  const handleRemoveCoupon = async () => {
    try {
      setApplyingCoupon(true);
      setCouponError("");
      await removeCoupon();
      await dispatch(loadCartItems());
      setSelectedCoupon(null);
      setCouponCode("");
    } catch (err) {
      console.error("Error removing coupon:", err);
      setCouponError(err?.message || "Failed to remove coupon");
    } finally {
      setApplyingCoupon(false);
    }
  };

  // Calculate subtotal from cart items (guest items have lineTotal = rate * qty already)
  const subtotal = cartItems?.reduce((sum, item) => {
    if (item?.lineTotal != null && !isNaN(item?.lineTotal)) {
      return sum + Number(item?.lineTotal);
    }
    let itemPrice = 0;
    if (Array.isArray(item?.price) && item?.price.length > 0) {
      itemPrice = item?.price[0].rate || item?.price[0].mrp || 0;
    } else if (typeof item?.price === "object" && item?.price && (item?.price.rate != null || item?.price.mrp != null)) {
      itemPrice = Number(item?.price.rate) || Number(item?.price.mrp) || 0;
    } else if (typeof item?.price === "number") {
      itemPrice = item?.price;
    }
    const quantity = typeof item?.quantity === "number" ? item?.quantity : parseInt(item?.quantity, 10) || 0;
    return sum + itemPrice * quantity;
  }, 0);

  // Use API summary when available (logged-in cart/get), otherwise calculate
  const hasApiSummary = cartSubtotal != null || cartFinalAmount != null;
  const finalSubtotal = hasApiSummary && cartSubtotal != null ? cartSubtotal : (cartTotal > 0 ? cartTotal : subtotal);
  const taxTotal = hasApiSummary && cartTaxTotal != null ? cartTaxTotal : 0;

  // Discount: from API when available, else from applied coupon
  let discount = 0;
  if (hasApiSummary && cartDiscount != null) {
    discount = cartDiscount;
  }

  const shipping = finalSubtotal > 50 ? 0 : 5.0;
  const total = hasApiSummary && cartFinalAmount != null ? cartFinalAmount : finalSubtotal - discount + shipping;

  return (
    <Box sx={{ minHeight: "100vh", pb: { xs: 14, sm: 12, md: 6 }, boxSizing: "border-box", overflowX: "hidden", width: "100%", maxWidth: "100%" }}>
      <Container sx={{ px: { xs: 1.5, sm: 2, md: 3 }, maxWidth: "100%", width: "100%", boxSizing: "border-box" }}>
        <Box sx={{ mb: { xs: 1, md: 1.5 }, minWidth: 0 }}>
          <CustomText variant="h4" sx={{ fontSize: { xs: 20, sm: 22, md: 28 }, fontWeight: 700, color: "var(--themeColor)" }}>
            Shopping Cart
          </CustomText>
          <CustomText sx={{ fontSize: { xs: 12, sm: 13, md: 15 }, color: "#666" }}>
            {cartItems?.length || 0} {cartItems?.length === 1 ? "item" : "items"} in your cart
          </CustomText>
        </Box>

        {orderError && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setOrderError("")}>
            {orderError}
          </Alert>
        )}
        {error && !orderError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading && !cartItems?.length ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : cartItems?.length === 0 ? (
          <EmptyCart navigate={navigate} />
        ) : (
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }} sx={{ maxWidth: "100%", margin: 0 }}>
            {/* Left column: Delivery, Preparation, Cart items, Add note */}
            <Grid size={{ xs: 12, md: 8 }} sx={{ order: { xs: 1, md: 1 }, minWidth: 0, maxWidth: "100%" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, sm: 2 }, minWidth: 0, maxWidth: "100%", overflow: "hidden" }}>
                {!isGuest && (
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
                )}
                <Card sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", overflow: "hidden", maxWidth: "100%" }}>
                  <CardContent sx={{ px: { xs: 1.5, sm: 2 }, pt: 1, pb: 1, "&:last-child": { pb: 2 }, maxWidth: "100%", boxSizing: "border-box" }}>
                    {cartItems?.map((item, index) => (
                      <CartItem
                        key={item?.productId || item?._id || item?.id}
                        item={item}
                        updatingItems={updatingItems}
                        updatingAction={updatingAction}
                        getItemKey={getItemKey}
                        updateQuantity={updateQuantity}
                        removeItem={removeItem}
                        compact
                        showDivider={index < (cartItems?.length || 0) - 1}
                      />
                    ))}
                  </CardContent>
                </Card>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/products")}
                    disabled={loading}
                    size="small"
                    sx={{
                      borderColor: "var(--themeColor)",
                      color: "var(--themeColor)",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: { xs: 12, sm: 14 },
                      py: { xs: 0.6, sm: 0.75 },
                      "&:hover": { borderColor: "var(--specialColor)", color: "var(--specialColor)", backgroundColor: "rgba(195, 46, 6, 0.05)" },
                    }}
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleClearCart}
                    disabled={loading || !cartItems?.length}
                    size="small"
                    sx={{
                      borderColor: "#d32f2f",
                      color: "#d32f2f",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: { xs: 12, sm: 14 },
                      py: { xs: 0.6, sm: 0.75 },
                      "&:hover": { borderColor: "#b71c1c", backgroundColor: "rgba(211, 47, 47, 0.08)" },
                    }}
                  >
                    Clear Cart
                  </Button>
                </Box>
              </Box>
            </Grid>

            {/* Right column: Offers + Bill details + Place order */}
            <Grid size={{ xs: 12, md: 4 }} sx={{ order: { xs: 2, md: 2 }, minWidth: 0, maxWidth: "100%" }}>
              <Box sx={{ minWidth: 0, maxWidth: "100%" }}>
                <OrderSummary
                  finalSubtotal={finalSubtotal}
                  taxTotal={taxTotal}
                  discount={discount}
                  shipping={shipping}
                  total={total}
                  appliedCoupon={appliedCouponFromApi}
                  couponError={couponError}
                  applyingCoupon={applyingCoupon}
                  handleRemoveCoupon={handleRemoveCoupon}
                  onApplyCouponWithCode={handleApplyCouponWithCode}
                  coupons={coupons}
                  couponsLoading={couponsLoading}
                  selectedCoupon={selectedCoupon}
                  handleCouponSelect={handleCouponSelect}
                  selectedAddress={selectedAddress}
                  cartItems={cartItems}
                  deliveryType={deliveryType}
                  someoneElseData={someoneElseData}
                  onInitiateOrder={handleInitiateOrder}
                  orderInitiating={orderInitiating}
                  paymentMode={paymentMode}
                  setPaymentMode={setPaymentMode}
                  paymentStatus={paymentStatus}
                  paymentVerifying={paymentVerifying}
                  isGuest={isGuest}
                />
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};
