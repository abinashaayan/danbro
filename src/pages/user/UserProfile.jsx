import { useState, useEffect } from "react";
import {
  Box,
  Container,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import api from "../../utils/api";
import { ProfileSidebar } from "../../components/user/ProfileSidebar";
import { AccountDetailsTab } from "../../components/user/AccountDetailsTab";
import { DashboardTab } from "../../components/user/DashboardTab";
import { OrderHistoryTab } from "../../components/user/OrderHistoryTab";
import { DownloadsTab } from "../../components/user/DownloadsTab";
import { SavedAddressesTab } from "../../components/user/SavedAddressesTab";
import { HelpSupportTab } from "../../components/user/HelpSupportTab";
import { WishlistTab } from "../../components/user/WishlistTab";
import blankImage from "../../assets/blankimage.png";
import { getMyOrders, getRecentlyViewed } from "../../utils/apiService";

export const UserProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "dashboard"
  );

  const [recentlyViewedItems, setRecentlyViewedItems] = useState([]);
  const [recentOrder, setRecentOrder] = useState(null);
  const [recentOrderLoading, setRecentOrderLoading] = useState(false);
  const [orderHistoryList, setOrderHistoryList] = useState([]);
  const [orderHistoryTotal, setOrderHistoryTotal] = useState(0);
  const [orderHistoryPage, setOrderHistoryPage] = useState(1);
  const orderHistoryLimit = 5;
  const [orderHistoryLoading, setOrderHistoryLoading] = useState(false);

  const downloads = [
    { id: 1, name: "Invoice #ORD-001", date: "2024-01-15", type: "PDF" },
    { id: 2, name: "Invoice #ORD-002", date: "2024-01-10", type: "PDF" },
    { id: 3, name: "Receipt #ORD-003", date: "2024-01-05", type: "PDF" },
  ];

  const [coupons, setCoupons] = useState([]);
  const [couponsLoading, setCouponsLoading] = useState(false);
  const [couponsError, setCouponsError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");
  const [accountData, setAccountData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      setProfileLoading(true);
      try {
        const response = await api.get('/user/getById');
        if (response.data && response.data.user) {
          const user = response.data.user;
          setUserProfile(user);
          setAccountData({
            firstName: user.name?.split(' ')[0] || "",
            lastName: user.name?.split(' ').slice(1).join(' ') || "",
            email: user.email || "",
            phone: user.phone || "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch recent order for dashboard (single latest order)
  useEffect(() => {
    if (activeTab !== "dashboard") return;
    const fetchRecentOrder = async () => {
      setRecentOrderLoading(true);
      try {
        const res = await getMyOrders(1, 1);
        const list = res?.data ?? res?.orders ?? res?.result ?? [];
        const arr = Array.isArray(list) ? list : [];
        setRecentOrder(arr[0] ?? null);
      } catch (e) {
        console.error("Error fetching recent order:", e);
        setRecentOrder(null);
      } finally {
        setRecentOrderLoading(false);
      }
    };
    fetchRecentOrder();
  }, [activeTab]);

  // Fetch order history (paginated, 5 per page)
  useEffect(() => {
    if (activeTab !== "order-history") return;
    const fetchOrderHistory = async () => {
      setOrderHistoryLoading(true);
      try {
        const res = await getMyOrders(orderHistoryPage, orderHistoryLimit);
        const list = res?.data ?? res?.orders ?? res?.result ?? [];
        // Use pagination.total from API response, fallback to count or list length
        const count = res?.pagination?.total ?? res?.count ?? res?.total ?? (Array.isArray(list) ? list.length : 0);
        setOrderHistoryList(Array.isArray(list) ? list : []);
        setOrderHistoryTotal(Number(count) || 0);
      } catch (e) {
        console.error("Error fetching order history:", e);
        setOrderHistoryList([]);
        setOrderHistoryTotal(0);
      } finally {
        setOrderHistoryLoading(false);
      }
    };
    fetchOrderHistory();
  }, [activeTab, orderHistoryPage]);

  // Fetch recently viewed products
  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        const res = await getRecentlyViewed();
        const list =
          res?.data?.products ||
          res?.products ||
          res?.data ||
          res?.result ||
          [];

        const mapped = (Array.isArray(list) ? list : []).map((p) => {
          const pid = p?._id || p?.productId || p?.id;
          const rawImg =
            (Array.isArray(p?.images) && p.images[0]) ||
            p?.image ||
            p?.thumbnail;
          const imageUrl =
            typeof rawImg === "string" ? rawImg : rawImg?.url || blankImage;
          const priceVal =
            p?.salePrice ?? p?.discountedPrice ?? (Array.isArray(p?.price) ? p?.price?.[0]?.rate ?? p?.price?.[0]?.mrp : p?.price) ?? p?.mrp ?? p?.rate;
          return {
            id: pid,
            name: p?.name || p?.productName || "—",
            image: imageUrl || blankImage,
            price: priceVal != null ? `₹${priceVal}` : "—",
          };
        });

        setRecentlyViewedItems(mapped);
      } catch (e) {
        console.error("Error fetching recently viewed:", e);
        setRecentlyViewedItems([]);
      }
    };

    fetchRecentlyViewed();
  }, []);

  const getOrderIdLabel = (o) => o?.orderId || o?._id || o?.id || "";
  const getOrderStatusLabel = (o) => {
    const raw = (o?.order_state || o?.status || "").toString();
    if (!raw) return "—";
    const map = {
      placed: "Placed",
      confirmed: "Confirmed",
      preparing: "Preparing",
      ready: "Ready",
      dispatched: "Dispatched",
      delivered: "Delivered",
      cancelled: "Cancelled",
    };
    return map[raw.toLowerCase()] || raw;
  };
  const getOrderDateLabel = (o) => {
    const d = o?.createdAt || o?.created_at || o?.date;
    if (!d) return "—";
    try {
      return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    } catch {
      return String(d);
    }
  };
  const getOrderItemsCount = (o) => {
    if (Array.isArray(o?.items)) return o.items.length;
    if (Array.isArray(o?.cart)) return o.cart.length;
    return o?.itemsCount || 0;
  };
  const getOrderTotalLabel = (o) => {
    const total =
      o?.total_charges ??
      o?.totalAmount ??
      o?.pricing?.grandTotal ??
      o?.amountPaid ??
      o?.amount ??
      o?.total;
    return total != null && !Number.isNaN(Number(total)) ? `₹${Number(total).toFixed(2)}` : "—";
  };

  const recentOrderForDashboard = recentOrder
    ? {
      id: getOrderIdLabel(recentOrder) ? `#${getOrderIdLabel(recentOrder)}` : "—",
      rawId: getOrderIdLabel(recentOrder) || "",
      date: getOrderDateLabel(recentOrder),
      items: getOrderItemsCount(recentOrder),
      total: getOrderTotalLabel(recentOrder),
      status: getOrderStatusLabel(recentOrder),
    }
    : null;

  // Fetch coupons from API
  const fetchCoupons = async () => {
    setCouponsLoading(true);
    setCouponsError(null);
    try {
      const response = await api.get('/coupon/getAll');
      if (response.data && response.data.data) {
        // Format coupon data
        const formattedCoupons = response.data.data.map((coupon) => {
          const isPercentage = coupon.discountType === "ITEM_DISCOUNT_PERCENTAGE";
          const discount = isPercentage
            ? `${coupon.discountPercentage}%`
            : `₹${coupon.discountAmount}`;

          // Format dates
          const validFrom = new Date(coupon.validFrom).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          });
          const validTo = new Date(coupon.validTo).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          });

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
            validFrom: validFrom,
            validTo: validTo,
            validUntil: validUntil,
            status: isValid ? "Active" : "Expired",
            isValid: isValid,
            usageCount: coupon.usageCount || 0,
          };
        });
        setCoupons(formattedCoupons);
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
      setCouponsError('Failed to load coupons. Please try again later.');
    } finally {
      setCouponsLoading(false);
    }
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    setIsSaving(true);
    setSaveError("");
    setSaveSuccess("");

    try {
      const name = `${accountData.firstName} ${accountData.lastName}`.trim();
      const response = await api.put('/user/editProfile', {
        name: name,
        phone: accountData.phone,
      });

      if (response.data) {
        setSaveSuccess("Profile updated successfully!");
        // Refresh user profile
        const profileResponse = await api.get('/user/getById');
        if (profileResponse.data && profileResponse.data.user) {
          const user = profileResponse.data.user;
          setUserProfile(user);
          setAccountData({
            ...accountData,
            firstName: user.name?.split(' ')[0] || "",
            lastName: user.name?.split(' ').slice(1).join(' ') || "",
            phone: user.phone || "",
          });
        }
        setTimeout(() => setSaveSuccess(""), 3000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveError(error.response?.data?.message || "Failed to update profile. Please try again.");
      setTimeout(() => setSaveError(""), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle password change
  const handleChangePassword = async () => {
    if (!accountData.currentPassword || !accountData.newPassword) {
      setSaveError("Please fill in current password and new password.");
      return;
    }

    if (accountData.newPassword !== accountData.confirmPassword) {
      setSaveError("New password and confirm password do not match.");
      return;
    }

    setIsSaving(true);
    setSaveError("");
    setSaveSuccess("");

    try {
      const response = await api.put('/user/changePassword', {
        oldPassword: accountData.currentPassword,
        newPassword: accountData.newPassword,
      });

      if (response.data) {
        setSaveSuccess("Password changed successfully!");
        setAccountData({
          ...accountData,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => setSaveSuccess(""), 3000);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setSaveError(error.response?.data?.message || "Failed to change password. Please try again.");
      setTimeout(() => setSaveError(""), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle save changes (both profile and password if filled)
  const handleSaveChanges = async () => {
    const hasPasswordChange = accountData.currentPassword || accountData.newPassword || accountData.confirmPassword;
    if (hasPasswordChange) {
      await handleChangePassword();
    }
    await handleUpdateProfile();
  };

  // Update activeTab when location state changes
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  // TopHeader menu icon (mobile) opens this drawer via custom event
  useEffect(() => {
    const openDrawer = () => setMobileDrawerOpen(true);
    window.addEventListener("openProfileMenu", openDrawer);
    return () => window.removeEventListener("openProfileMenu", openDrawer);
  }, []);

  useEffect(() => {
    if (activeTab === "coupons") {
      fetchCoupons();
    }
  }, [activeTab]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", py: { xs: 3, md: 0 }, pt: { xs: "55px", md: 0 }, pb: { xs: 8, md: 0 }, p: { xs: 1.25, md: 0 } }}>
      <Container sx={{ px: { xs: 2, md: 3, lg: 2 }, py: 4, pt: { xs: "38px", md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            minHeight: { xs: "auto", md: "80vh" },
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 2, md: 0 },
          }}
        >
          {/* Desktop Sidebar */}
          {!isMobile && (
            <Box
              sx={{
                width: { md: 280, lg: 300 },
                flexShrink: 0,
                position: "sticky",
                top: { md: 96, lg: 110 },
                alignSelf: "flex-start",
                height: "calc(100vh - 120px)",
                overflowY: "hidden",
                overflowX: "hidden",
              }}
            >
              <ProfileSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                userProfile={userProfile}
                profileLoading={profileLoading}
                accountData={accountData}
                isMobile={isMobile}
                setMobileDrawerOpen={setMobileDrawerOpen}
              />
            </Box>
          )}

          {/* Mobile Drawer */}
          <Drawer
            anchor="left"
            open={mobileDrawerOpen}
            onClose={() => setMobileDrawerOpen(false)}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                width: 280,
              },
            }}
          >
            <ProfileSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              userProfile={userProfile}
              profileLoading={profileLoading}
              accountData={accountData}
              isMobile={isMobile}
              setMobileDrawerOpen={setMobileDrawerOpen}
            />
          </Drawer>

          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
              width: { xs: "100%", md: "auto" },
              ml: { xs: 0, md: 2 },
              position: "relative",
              maxHeight: { md: "calc(100vh - 120px)" },
              overflowY: { md: "auto" },
              overflowX: "hidden",
            }}
          >
            <Box sx={{ width: "100%" }}>
              {activeTab === "dashboard" && (
                <DashboardTab
                  favoriteItems={recentlyViewedItems}
                  setActiveTab={setActiveTab}
                  isMobile={isMobile}
                  userProfile={userProfile}
                  recentOrder={recentOrderForDashboard}
                  recentOrderRaw={recentOrder}
                  ordersLoading={recentOrderLoading}
                />
              )}

              {activeTab === "order-history" && (
                <OrderHistoryTab
                  orders={orderHistoryList}
                  page={orderHistoryPage}
                  totalCount={orderHistoryTotal}
                  limit={orderHistoryLimit}
                  onPageChange={setOrderHistoryPage}
                  loading={orderHistoryLoading}
                />
              )}

              {/* Downloads tab commented out
              {activeTab === "downloads" && (
                <DownloadsTab downloads={downloads} />
              )}
              */}

              {activeTab === "addresses" && (
                <SavedAddressesTab />
              )}

              {/* Account Details Section */}
              {activeTab === "account" && (
                <AccountDetailsTab
                  accountData={accountData}
                  setAccountData={setAccountData}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  showNewPassword={showNewPassword}
                  setShowNewPassword={setShowNewPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
                  handleSaveChanges={handleSaveChanges}
                  isSaving={isSaving}
                  saveError={saveError}
                  saveSuccess={saveSuccess}
                  userProfile={userProfile}
                  setSaveError={setSaveError}
                  setSaveSuccess={setSaveSuccess}
                />
              )}

              {activeTab === "coupons" && (
                <HelpSupportTab />
              )}

              {activeTab === "wishlist" && (
                <WishlistTab />
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

