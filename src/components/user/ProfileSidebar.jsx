import { Box, Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  History as HistoryIcon,
  Download as DownloadIcon,
  LocationOn as LocationOnIcon,
  Person as PersonIcon,
  LocalOffer as LocalOfferIcon,
  Favorite as FavoriteIcon,
  ShoppingCart as ShoppingCartIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { CustomText } from "../comman/CustomText";
import { logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

const baseMenuItems = [
  { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { id: "order-history", label: "Order History", icon: <HistoryIcon /> },
  // { id: "downloads", label: "Downloads", icon: <DownloadIcon /> },
  { id: "addresses", label: "Saved Addresses", icon: <LocationOnIcon /> },
  { id: "account", label: "Account Details", icon: <PersonIcon /> },
  { id: "coupons", label: "Help & Support", icon: <LocalOfferIcon /> },
  { id: "wishlist", label: "Wishlist", icon: <FavoriteIcon /> },
  { id: "logout", label: "Logout", icon: <LogoutIcon /> },
];

export const ProfileSidebar = ({ 
  activeTab, 
  setActiveTab, 
  userProfile, 
  profileLoading, 
  accountData,
  isMobile,
  setMobileDrawerOpen 
}) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // On mobile only: add Cart in menu (before Logout)
  const menuItems = isMobile
    ? [
        ...baseMenuItems.filter((i) => i.id !== "logout"),
        { id: "cart", label: "Cart", icon: <ShoppingCartIcon />, isLink: true, path: "/cart" },
        ...baseMenuItems.filter((i) => i.id === "logout"),
      ]
    : baseMenuItems;

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate("/home");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if API fails, still redirect to home (cookies already cleared)
      navigate("/home");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Box
      sx={{
        width: { xs: 280, md: 280 },
        height: "100%",
        backgroundColor: "#FFF8F2",
        color: "black",
        display: "flex",
        flexDirection: "column",
        borderRadius: 5,
        py: 3,
      }}
    >
      {/* Profile Section */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
        <Avatar
          sx={{
            width: { xs: 50, md: 60 },
            height: { xs: 50, md: 60 },
            bgcolor: "var(--themeColor)",
            fontSize: { xs: 20, md: 24 },
            fontWeight: 600,
          }}
          src={userProfile?.avatar || userProfile?.profilePicture}
        >
          {userProfile?.name
            ? userProfile.name.charAt(0).toUpperCase()
            : userProfile?.email
            ? userProfile.email.charAt(0).toUpperCase()
            : "U"}
        </Avatar>
        <CustomText variant="h6" sx={{ fontWeight: 'bold', color: "#2c2c2c", fontSize: { xs: 16, md: 20 } }}>
          {profileLoading ? "Loading..." : (userProfile?.name || (accountData.firstName + " " + accountData.lastName).trim() || "User")}
        </CustomText>
      </Box>

      {/* Menu Items */}
      <List sx={{ flex: 1, px: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item?.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => {
                if (item?.id === "logout") {
                  handleLogout();
                } else if (item?.isLink && item?.path) {
                  navigate(item.path);
                  if (isMobile) setMobileDrawerOpen(false);
                } else {
                  setActiveTab(item?.id);
                  if (isMobile) setMobileDrawerOpen(false);
                }
              }}
              disabled={item?.id === "logout" && isLoggingOut}
              sx={{
                borderRadius: 2,
                backgroundColor: activeTab === item?.id ? "#FFDFBF" : "transparent",
                color: activeTab === item?.id ? "#2c2c2c" : "#666",
                "&:hover": {
                  backgroundColor: activeTab === item?.id ? "#FFDFBF" : "rgba(255,223,191,0.3)",
                },
                "&:disabled": {
                  opacity: 0.6,
                },
                py: 1.5,
              }}
            >
              <ListItemIcon sx={{ color: activeTab === item?.id ? "#FF9472" : "#666", minWidth: 40 }}>
                {item?.id === "logout" && isLoggingOut ? (
                  <CircularProgress size={20} sx={{ color: "#FF9472" }} />
                ) : (
                  item?.icon
                )}
              </ListItemIcon>
              <ListItemText
                primary={item?.id === "logout" && isLoggingOut ? "Logging out..." : item?.label}
                primaryTypographyProps={{
                  sx: {
                  fontSize: 14,
                  fontWeight: activeTab === item?.id ? 600 : 400,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

