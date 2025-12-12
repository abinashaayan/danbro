import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  History as HistoryIcon,
  Download as DownloadIcon,
  LocationOn as LocationOnIcon,
  Person as PersonIcon,
  LocalOffer as LocalOfferIcon,
  Favorite as FavoriteIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  LocalShipping as LocalShippingIcon,
  Menu as MenuIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { CustomTextField } from "../../components/comman/CustomTextField";

export const UserProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { id: "order-history", label: "Order History", icon: <HistoryIcon /> },
    { id: "downloads", label: "Downloads", icon: <DownloadIcon /> },
    { id: "addresses", label: "Saved Addresses", icon: <LocationOnIcon /> },
    { id: "account", label: "Account Details", icon: <PersonIcon /> },
    { id: "coupons", label: "My Coupons", icon: <LocalOfferIcon /> },
    { id: "wishlist", label: "Wishlist", icon: <FavoriteIcon /> },
    { id: "settings", label: "Settings", icon: <SettingsIcon /> },
    { id: "logout", label: "Logout", icon: <LogoutIcon /> },
  ];

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

  const coupons = [
    { id: 1, code: "WELCOME20", discount: "20%", description: "Get 20% off on your first order", validUntil: "2024-12-31", status: "Active" },
    { id: 2, code: "SAVE50", discount: "₹50", description: "Flat ₹50 off on orders above ₹500", validUntil: "2024-06-30", status: "Active" },
    { id: 3, code: "BIRTHDAY15", discount: "15%", description: "Special birthday discount", validUntil: "2024-03-31", status: "Active" },
  ];

  const [showPassword, setShowPassword] = useState(false);
  const [accountData, setAccountData] = useState({
    firstName: "Aditya",
    lastName: "Kumar",
    email: "aditya@example.com",
    phone: "+91 9876543210",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const sidebarContent = (
    <Box
      sx={{
        width: { xs: 280, md: 280 },
        height: "100%",
        backgroundColor: "#FFF8F2",
        color: "black",
        display: "flex",
        flexDirection: "column",
        py: 3,
      }}
    >
      {/* Profile Section */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
        <Avatar
          sx={{
            width: 60,
            height: 60,
          }}
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: "#2c2c2c" }}>
          Aditya Kumar
        </Typography>
      </Box>

      {/* Menu Items */}
      <List sx={{ flex: 1, px: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => {
                setActiveTab(item.id);
                if (isMobile) setMobileDrawerOpen(false);
                if (item.id === "logout") {
                  navigate("/login");
                }
              }}
              sx={{
                borderRadius: 2,
                backgroundColor: activeTab === item.id ? "#FFDFBF" : "transparent",
                color: activeTab === item.id ? "#2c2c2c" : "#666",
                "&:hover": {
                  backgroundColor: activeTab === item.id ? "#FFDFBF" : "rgba(255,223,191,0.3)",
                },
                py: 1.5,
              }}
            >
              <ListItemIcon sx={{ color: activeTab === item.id ? "#FF9472" : "#666", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: activeTab === item.id ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 3, md: 0 }, pb: { xs: 0, md: 0 }, mb: 0 }}>
      <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", mb: 0 }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            minHeight: { xs: "auto", md: "80vh" },
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {/* Desktop Sidebar */}
          {!isMobile && sidebarContent}

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
            {sidebarContent}
          </Drawer>

          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#fff",
              p: { xs: 2, md: 4 },
              ml: { xs: 0, md: 0 },
              position: "relative",
            }}
          >
            {/* Mobile Menu Button */}
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
            <Container maxWidth="xl" sx={{ px: { xs: 0, md: 3 }, pt: { xs: isMobile ? 4 : 0, md: 0 } }}>
              {activeTab === "dashboard" && (
                <>
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: { xs: 28, md: 36 },
                        fontWeight: 700,
                        color: "var(--themeColor)",
                        mb: 1,
                        mt: { xs: isMobile ? 0 : 0, md: 0 },
                      }}
                    >
                      Welcome back, Aditya.
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: 14, md: 16 },
                        color: "#333",
                        mb: 2,
                      }}
                    >
                      Here's a quick look at your recent activity and rewards.
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: 13, md: 14 },
                        color: "#333",
                        lineHeight: 1.8,
                      }}
                    >
                      From your account dashboard you can view your{" "}
                      <Box
                        component="span"
                        onClick={() => setActiveTab("order-history")}
                        sx={{
                          color: "#FF9472",
                          textDecoration: "underline",
                          cursor: "pointer",
                          "&:hover": { color: "#F2709C" },
                        }}
                      >
                        recent orders
                      </Box>
                      , manage your{" "}
                      <Box
                        component="span"
                        onClick={() => setActiveTab("addresses")}
                        sx={{
                          color: "#FF9472",
                          textDecoration: "underline",
                          cursor: "pointer",
                          "&:hover": { color: "#F2709C" },
                        }}
                      >
                        shipping and billing addresses
                      </Box>
                      , and edit your password and account details.
                    </Typography>
                  </Box>

                  <Grid container spacing={3} sx={{ mb: 5 }}>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <LocalShippingIcon sx={{ fontSize: 32, color: "var(--themeColor)", mr: 1.5 }} />
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                                Recent Order
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                                Order ID: #ORD-001
                              </Typography>
                            </Box>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#4caf50",
                              fontWeight: 600,
                              mb: 2,
                            }}
                          >
                            Order Status - Out for Delivery
                          </Typography>
                          <Link to="/track-order">
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "#FFB5A1",
                                color: "black",
                                textTransform: "none",
                                borderRadius: 2,
                                fontWeight: 'bold',
                                px: 3,
                                "&:hover": {
                                  backgroundColor: "#F2709C",
                                },
                              }}
                            >
                              Track Order
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <LocalOfferIcon sx={{ fontSize: 32, color: "var(--themeColor)", mr: 1.5 }} />
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                                Loyalty Points
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: "#2c2c2c", mb: 1 }}>
                                1250
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
                            You're 250 points away from a free pastry!
                          </Typography>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "#FFB5A1",
                              color: "black",
                              textTransform: "none",
                              borderRadius: 2,
                              fontWeight: 'bold',
                              px: 3,
                              "&:hover": {
                                backgroundColor: "#F2709C",
                              },
                            }}
                          >
                            View Rewards
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <LocalOfferIcon sx={{ fontSize: 32, color: "var(--themeColor)", mr: 1.5 }} />
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                                Available Coupons
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: "#2c2c2c", mb: 1 }}>
                                3
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
                            Including a 20% off your next purchase.
                          </Typography>
                          <Button
                            onClick={() => setActiveTab("coupons")}
                            variant="contained"
                            sx={{
                              backgroundColor: "#FFB5A1",
                              color: "black",
                              textTransform: "none",
                              borderRadius: 2,
                              fontWeight: 'bold',
                              px: 3,
                              "&:hover": {
                                backgroundColor: "#F2709C",
                              },
                            }}
                          >
                            See Coupon
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  <Box sx={{ mb: 4, border: '1px solid #BEBEBE', borderRadius: { xs: 3, md: 5 }, p: { xs: 2, sm: 3, md: 5 } }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "var(--themeColor)", mb: { xs: 2, md: 3 }, fontSize: { xs: 18, md: 24 } }}>
                      Your Favorite Items
                    </Typography>
                    <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                      {favoriteItems.map((item) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={item.id}>
                          <Box
                            sx={{
                              position: "relative",
                              borderRadius: { xs: 1.5, md: 2 },
                              overflow: "hidden",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                              "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                              },
                            }}
                          >
                            <Box
                              component="img"
                              src={item.image}
                              alt={item.name}
                              sx={{
                                width: "100%",
                                height: { xs: 140, sm: 160, md: 200 },
                                objectFit: "cover",
                              }}
                            />
                            <Box textAlign="center" sx={{ p: { xs: 1, md: 2 } }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: 12, md: 14 } }}>
                                {item.name}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "var(--themeColor)", fontWeight: 700, fontSize: { xs: 13, md: 14 } }}>
                                {item.price}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </>
              )}

              {/* Order History Section */}
              {activeTab === "order-history" && (
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: 24, md: 32 },
                      fontWeight: 700,
                      color: "var(--themeColor)",
                      mb: 2,
                    }}
                  >
                    Order History
                  </Typography>
                  <Grid container spacing={3}>
                    {orders?.map((order) => (
                      <Grid size={{ xs: 12 }} key={order.id}>
                        <Card
                          sx={{
                            borderRadius: 3,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-3px)",
                              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                            },
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2 }}>
                              <Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: "var(--themeColor)", mb: 1 }}>
                                  {order.id}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                                  Date: {order.date}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                                  Items: {order.items}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#666", fontWeight: 600, mt: 1 }}>
                                  Total: {order.total}
                                </Typography>
                              </Box>
                              <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
                                <Box
                                  sx={{
                                    display: "inline-block",
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 2,
                                    backgroundColor:
                                      order.status === "Delivered"
                                        ? "#4caf50"
                                        : order.status === "Out for Delivery"
                                          ? "#FF9472"
                                          : "#FFB5A1",
                                    color: "#fff",
                                    fontWeight: 600,
                                    fontSize: 12,
                                    mb: 2,
                                  }}
                                >
                                  {order.status}
                                </Box>
                                <Box>
                                  <Link to="/track-order">
                                    <Button
                                      variant="contained"
                                      sx={{
                                        backgroundColor: "#FFB5A1",
                                        color: "black",
                                        textTransform: "none",
                                        borderRadius: 2,
                                        fontWeight: 600,
                                        px: 3,
                                        "&:hover": {
                                          backgroundColor: "#F2709C",
                                        },
                                      }}
                                    >
                                      View Details
                                    </Button>
                                  </Link>
                                </Box>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Downloads Section */}
              {activeTab === "downloads" && (
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: 24, md: 32 },
                      fontWeight: 700,
                      color: "var(--themeColor)",
                      mb: 2,
                    }}
                  >
                    Downloads
                  </Typography>
                  <Grid container spacing={3}>
                    {downloads?.map((download) => (
                      <Grid size={{ xs: 12 }} key={download.id}>
                        <Card
                          sx={{
                            borderRadius: 3,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-3px)",
                              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                            },
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <DownloadIcon sx={{ fontSize: 40, color: "var(--themeColor)" }} />
                                <Box>
                                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c", mb: 0.5 }}>
                                    {download.name}
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: "#666" }}>
                                    Downloaded on {download.date} • {download.type}
                                  </Typography>
                                </Box>
                              </Box>
                              <Button
                                startIcon={<DownloadIcon />}
                                variant="contained"
                                sx={{
                                  backgroundColor: "#FFB5A1",
                                  color: "black",
                                  textTransform: "none",
                                  borderRadius: 2,
                                  fontWeight: 600,
                                  px: 3,
                                  "&:hover": {
                                    backgroundColor: "#F2709C",
                                  },
                                }}
                              >
                                Download
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Saved Addresses Section */}
              {activeTab === "addresses" && (
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: { xs: 24, md: 32 },
                        fontWeight: 700,
                        color: "var(--themeColor)",
                      }}
                    >
                      Saved Addresses
                    </Typography>
                    <Button
                      startIcon={<AddIcon />}
                      variant="contained"
                      sx={{
                        backgroundColor: "#FFB5A1",
                        color: "black",
                        textTransform: "none",
                        borderRadius: 2,
                        fontWeight: 600,
                        px: 3,
                        "&:hover": {
                          backgroundColor: "#F2709C",
                        },
                      }}
                    >
                      Add New Address
                    </Button>
                  </Box>
                  <Grid container spacing={3} gap={1}>
                    {addresses?.map((address) => (
                      <Grid size={{ xs: 12, md: 6 }} key={address.id}>
                        <Card
                          sx={{
                            borderRadius: 3,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                            border: "1px solid var(--themeColor)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-3px)",
                              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                            },
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                              <Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                  <Typography variant="h6" sx={{ fontWeight: 700, color: "var(--themeColor)" }}>
                                    {address.type}
                                  </Typography>
                                  {address.isDefault && (
                                    <Box
                                      sx={{
                                        px: 1.5,
                                        py: 0.3,
                                        borderRadius: 1,
                                        backgroundColor: "#FFB5A1",
                                        color: "#000",
                                        fontSize: 11,
                                        fontWeight: 600,
                                      }}
                                    >
                                      Default
                                    </Box>
                                  )}
                                </Box>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: "#2c2c2c", mb: 0.5 }}>
                                  {address.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                                  {address.phone}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.6 }}>
                                  {address.address}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                              <Button
                                startIcon={<EditIcon />}
                                variant="outlined"
                                sx={{
                                  borderColor: "var(--themeColor)",
                                  color: "var(--themeColor)",
                                  textTransform: "none",
                                  borderRadius: 2,
                                  "&:hover": {
                                    borderColor: "var(--themeColor)",
                                    backgroundColor: "#fbeeee",
                                  },
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                startIcon={<DeleteIcon />}
                                variant="outlined"
                                sx={{
                                  borderColor: "#f44336",
                                  color: "#f44336",
                                  textTransform: "none",
                                  borderRadius: 2,
                                  "&:hover": {
                                    borderColor: "#f44336",
                                    backgroundColor: "#ffebee",
                                  },
                                }}
                              >
                                Delete
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Account Details Section */}
              {activeTab === "account" && (
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: 24, md: 32 },
                      fontWeight: 700,
                      color: "var(--themeColor)",
                      mb: 2,
                    }}
                  >
                    Account Details
                  </Typography>
                  <Grid container spacing={3} gap={1}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <CustomTextField
                        fullWidth
                        label="Last Name"
                        name="fullName"
                        placeholder="First Name"
                        value={accountData.firstName}
                        onChange={(e) => setAccountData({ ...accountData, firstName: e.target.value })}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <CustomTextField
                        fullWidth
                        label="Last Name"
                        placeholder="Last Name"
                        value={accountData.lastName}
                        onChange={(e) => setAccountData({ ...accountData, lastName: e.target.value })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <CustomTextField
                        fullWidth
                        label="Email"
                        placeholder="Email"
                        type="email"
                        value={accountData.email}
                        onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <CustomTextField
                        fullWidth
                        label="Phone"
                        placeholder="Phone"
                        value={accountData.phone}
                        onChange={(e) => setAccountData({ ...accountData, phone: e.target.value })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: "var(--themeColor)", mb: 2 }}>
                        Change Password
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <CustomTextField
                        fullWidth
                        label="Current Password"
                        placeholder="Current Password"
                        type={showPassword ? "text" : "password"}
                        value={accountData.currentPassword}
                        onChange={(e) => setAccountData({ ...accountData, currentPassword: e.target.value })}
                        InputProps={{
                          endAdornment: (
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <CustomTextField
                        fullWidth
                        label="New Password"
                        placeholder="New Password"
                        type={showPassword ? "text" : "password"}
                        value={accountData.newPassword}
                        onChange={(e) => setAccountData({ ...accountData, newPassword: e.target.value })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <CustomTextField
                        fullWidth
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        value={accountData.confirmPassword}
                        onChange={(e) => setAccountData({ ...accountData, confirmPassword: e.target.value })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#FFB5A1",
                            color: "black",
                            textTransform: "none",
                            borderRadius: 2,
                            fontWeight: 600,
                            px: 4,
                            "&:hover": {
                              backgroundColor: "#F2709C",
                            },
                          }}
                        >
                          Save Changes
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* My Coupons Section */}
              {activeTab === "coupons" && (
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: 24, md: 32 },
                      fontWeight: 700,
                      color: "var(--themeColor)",
                      mb: 2,
                    }}
                  >
                    My Coupons
                  </Typography>
                  <Grid container spacing={3} gap={1}>
                    {coupons?.map((coupon) => (
                      <Grid size={{ xs: 12, md: 3 }} key={coupon.id}>
                        <Card
                          sx={{
                            borderRadius: 3,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                            background: "linear-gradient(135deg, #FF9472 0%, #F2709C 100%)",
                            color: "#fff",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-5px)",
                              boxShadow: "0 8px 30px rgba(255,148,114,0.3)",
                            },
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                              <Box>
                                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: 24, md: 28 } }}>
                                  {coupon.discount} OFF
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1, opacity: 0.95 }}>
                                  {coupon.description}
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: 12, opacity: 0.9 }}>
                                  Valid until: {coupon.validUntil}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  px: 2,
                                  py: 0.5,
                                  borderRadius: 2,
                                  backgroundColor: "rgba(255,255,255,0.2)",
                                  backdropFilter: "blur(10px)",
                                }}
                              >
                                <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 12 }}>
                                  {coupon.code}
                                </Typography>
                              </Box>
                            </Box>
                            <Button
                              fullWidth
                              variant="contained"
                              sx={{
                                backgroundColor: "#fff",
                                color: "var(--themeColor)",
                                textTransform: "none",
                                borderRadius: 2,
                                fontWeight: 700,
                                py: 1.5,
                                "&:hover": {
                                  backgroundColor: "#f5f5f5",
                                  transform: "scale(1.02)",
                                },
                              }}
                            >
                              Use Coupon
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Wishlist Section */}
              {activeTab === "wishlist" && (
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: 20, md: 32 },
                      fontWeight: 700,
                      color: "var(--themeColor)",
                      mb: { xs: 2, md: 2 },
                    }}
                  >
                    My Wishlist
                  </Typography>
                  <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                    {favoriteItems.map((item) => (
                      <Grid size={{ xs: 6, sm: 4, md: 3 }} key={item.id}>
                        <Card
                          sx={{
                            borderRadius: { xs: 2, md: 3 },
                            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                            overflow: "hidden",
                            transition: "all 0.3s ease",
                            position: "relative",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            "&:hover": {
                              transform: "translateY(-5px)",
                              boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                            },
                          }}
                        >
                          <Box sx={{ position: "relative" }}>
                            <Box
                              component="img"
                              src={item.image}
                              alt={item.name}
                              sx={{
                                width: "100%",
                                height: { xs: 140, sm: 160, md: 200 },
                                objectFit: "cover",
                              }}
                            />
                            <IconButton
                              sx={{
                                position: "absolute",
                                top: { xs: 4, md: 8 },
                                right: { xs: 4, md: 8 },
                                backgroundColor: "rgba(255,255,255,0.9)",
                                padding: { xs: 0.5, md: 1 },
                                "&:hover": {
                                  backgroundColor: "#fff",
                                },
                              }}
                            >
                              <FavoriteIcon sx={{ color: "#f44336", fontSize: { xs: 18, md: 24 } }} />
                            </IconButton>
                          </Box>
                          <CardContent sx={{ p: { xs: 1.5, md: 2 }, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: 13, md: 16 } }}>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "var(--themeColor)", fontWeight: 700, mb: { xs: 1.5, md: 2 }, fontSize: { xs: 13, md: 14 } }}>
                              {item.price}
                            </Typography>
                            <Button
                              fullWidth
                              variant="contained"
                              sx={{
                                backgroundColor: "#FFB5A1",
                                color: "black",
                                textTransform: "none",
                                borderRadius: { xs: 1.5, md: 2 },
                                fontWeight: 600,
                                fontSize: { xs: 12, md: 14 },
                                py: { xs: 0.8, md: 1 },
                                mt: "auto",
                                "&:hover": {
                                  backgroundColor: "#F2709C",
                                },
                              }}
                            >
                              Add to Cart
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Settings Section */}
              {activeTab === "settings" && (
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: 24, md: 32 },
                      fontWeight: 700,
                      color: "var(--themeColor)",
                      mb: 4,
                    }}
                  >
                    Settings
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "var(--themeColor)", mb: 2 }}>
                        Account Actions
                      </Typography>
                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: "var(--themeColor)",
                            color: "var(--themeColor)",
                            textTransform: "none",
                            borderRadius: 2,
                            px: 3,
                            "&:hover": {
                              borderColor: "var(--themeColor)",
                              backgroundColor: "#fbeeee",
                            },
                          }}
                        >
                          Export Data
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: "#f44336",
                            color: "#f44336",
                            textTransform: "none",
                            borderRadius: 2,
                            px: 3,
                            "&:hover": {
                              borderColor: "#f44336",
                              backgroundColor: "#ffebee",
                            },
                          }}
                        >
                          Delete Account
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Container>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

