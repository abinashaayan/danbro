import { useState, useEffect } from "react";
import {
  Box,
  Container,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import api from "../../utils/api";
import { clearAuthCookies } from "../../utils/cookies";
import { ProfileSidebar } from "../../components/user/ProfileSidebar";
import { AccountDetailsTab } from "../../components/user/AccountDetailsTab";
import { DashboardTab } from "../../components/user/DashboardTab";
import { OrderHistoryTab } from "../../components/user/OrderHistoryTab";
import { DownloadsTab } from "../../components/user/DownloadsTab";
import { SavedAddressesTab } from "../../components/user/SavedAddressesTab";
import { MyCouponsTab } from "../../components/user/MyCouponsTab";
import { WishlistTab } from "../../components/user/WishlistTab";
import { SettingsTab } from "../../components/user/SettingsTab";

export const UserProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "dashboard"
  );

  const favoriteItems = [
    { id: 1, name: "Chocolate Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop", price: "₹450" },
    { id: 2, name: "Red Velvet Cake", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop", price: "₹550" },
    { id: 3, name: "Black Forest Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop", price: "₹500" },
    { id: 4, name: "Vanilla Cake", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop", price: "₹400" },
  ];

  const orders = [
    { id: "#ORD-001", date: "2024-01-15", items: 3, total: "₹1,250", status: "Delivered" },
    { id: "#ORD-002", date: "2024-01-10", items: 2, total: "₹850", status: "Out for Delivery" },
    { id: "#ORD-003", date: "2024-01-05", items: 5, total: "₹2,100", status: "Processing" },
    { id: "#ORD-004", date: "2023-12-28", items: 1, total: "₹450", status: "Delivered" },
  ];

  const downloads = [
    { id: 1, name: "Invoice #ORD-001", date: "2024-01-15", type: "PDF" },
    { id: 2, name: "Invoice #ORD-002", date: "2024-01-10", type: "PDF" },
    { id: 3, name: "Receipt #ORD-003", date: "2024-01-05", type: "PDF" },
  ];

  const addresses = [
    { id: 1, type: "Home", name: "Aditya Kumar", phone: "+91 9876543210", address: "123, Main Street, Lucknow, UP - 226001", isDefault: true },
    { id: 2, type: "Work", name: "Aditya Kumar", phone: "+91 9876543210", address: "456, Business Park, Kanpur, UP - 208001", isDefault: false },
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

  useEffect(() => {
    if (activeTab === "coupons") {
      fetchCoupons();
    }
  }, [activeTab]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", py: { xs: 3, md: 0 }, pb: { xs: 8, md: 0 }, p: { xs: 1.25, md: 0 } }}>
      <Container  sx={{ px: { xs: 2, md: 3, lg: 2 }, py: 4 }}>
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
                maxHeight: "calc(100vh - 120px)",
                overflowY: "auto",
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
            }}
          >
            {isMobile && (
              <IconButton
                onClick={() => setMobileDrawerOpen(true)}
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  backgroundColor: "#FF9472",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#F2709C",
                  },
                  zIndex: 10,
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Box sx={{ width: "100%" }}>
              {activeTab === "dashboard" && (
                <DashboardTab
                  favoriteItems={favoriteItems}
                  setActiveTab={setActiveTab}
                  isMobile={isMobile}
                  userProfile={userProfile}
                />
              )}

              {activeTab === "order-history" && (
                <OrderHistoryTab orders={orders} />
              )}

              {activeTab === "downloads" && (
                <DownloadsTab downloads={downloads} />
              )}

              {activeTab === "addresses" && (
                <SavedAddressesTab addresses={addresses} />
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
                <MyCouponsTab
                  coupons={coupons}
                  couponsLoading={couponsLoading}
                  couponsError={couponsError}
                />
              )}

              {activeTab === "wishlist" && (
                <WishlistTab />
              )}

              {activeTab === "settings" && (
                <SettingsTab />
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

