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
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

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
    { id: 1, name: "Chocolate Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
    { id: 2, name: "Chocolate Cake", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop" },
    { id: 3, name: "Chocolate Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" },
    { id: 4, name: "Chocolate Cake", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop" },
  ];

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
    <Box sx={{ minHeight: "100vh", py: { xs: 3, md: 5 }, pb: { xs: 12, md: 16 } }}>
      <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
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
                  top: 16,
                  left: 16,
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
            <Container maxWidth="xl" sx={{ px: { xs: 0, md: 3 } }}>
              {/* Welcome Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: 28, md: 36 },
                    fontWeight: 700,
                    color: "#2c2c2c",
                    mb: 1,
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

              {/* Account Summary Cards */}
              <Grid container spacing={3} sx={{ mb: 5 }}>
                {/* Recent Order Card */}
                <Grid item xs={12} md={4}>
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
                        <LocalShippingIcon sx={{ fontSize: 32, color: "#D52D00", mr: 1.5 }} />
                        <Box >
                          <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                            Recent Order
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                            Order ID: #order-id
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

                {/* Loyalty Points Card */}
                <Grid item xs={12} md={4}>
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
                        <LocalShippingIcon sx={{ fontSize: 32, color: "#D52D00", mr: 1.5 }} />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                            Loyalty Points
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: "#2c2c2c", mb: 1, }}>
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

                {/* Available Coupons Card */}
                <Grid item xs={12} md={4}>
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
                        <LocalShippingIcon sx={{ fontSize: 32, color: "#D52D00", mr: 1.5 }} />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                            Available Coupons
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: "#2c2c2c", mb: 1, }}>
                            3
                          </Typography>
                        </Box>
                      </Box>

                      <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
                        Including a 20% off your next purchase.
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
                        See Coupon
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Favorite Items Section */}
              <Box sx={{ mb: 4, border: '1px solid #BEBEBE', borderRadius: 10, p: 5 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#2c2c2c", mb: 3, }}>
                  Your Favorite Items
                </Typography>
                <Grid container spacing={3}>
                  {favoriteItems.map((item) => (
                    <Grid item xs={6} sm={4} md={3} key={item.id}>
                      <Box
                        sx={{
                          position: "relative",
                          borderRadius: 2,
                          overflow: "hidden",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
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
                            height: 200,
                            objectFit: "cover",
                          }}
                        />
                        <Box textAlign="center" sx={{ p: 2 }}>
                          <Typography variant="body2" sx={{ fontWeight: 6400 }}>
                            {item.name}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Update Profile Button */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFB5A1",
                    color: "black",
                    textTransform: "none",
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: 16,
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#F2709C",
                    },
                  }}
                >
                  Update Profile
                </Button>
              </Box>
            </Container>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

