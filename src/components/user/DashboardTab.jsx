import { Box, Grid, Card, CardContent, Button } from "@mui/material";
import { LocalShipping as LocalShippingIcon, LocalOffer as LocalOfferIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { CustomText } from "../comman/CustomText";

export const DashboardTab = ({ favoriteItems, setActiveTab, isMobile, userProfile }) => {
  // Get user's first name or fallback to "User"
  const getUserName = () => {
    if (userProfile?.name) {
      // Get first name from full name
      const firstName = userProfile.name.split(' ')[0];
      return firstName;
    }
    if (userProfile?.email) {
      // Get name from email (before @)
      return userProfile.email.split('@')[0];
    }
    return "User";
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <CustomText
          variant="h3"
          sx={{
            fontSize: { xs: 18, md: 26 },
            fontWeight: 700,
            color: "var(--themeColor)",
            mb: 1,
            mt: { xs: isMobile ? 0 : 0, md: 0 },
          }}
        >
          Welcome back, {getUserName()}.
        </CustomText>
        <CustomText
          variant="body1"
          sx={{
            fontSize: { xs: 14, md: 16 },
            color: "#333",
            mb: 2,
          }}
        >
          Here's a quick look at your recent activity and rewards.
        </CustomText>
        <CustomText
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
        </CustomText>
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 5 } }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocalShippingIcon sx={{ fontSize: { xs: 28, md: 32 }, color: "var(--themeColor)", mr: 1.5 }} />
                <Box>
                  <CustomText variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                    Recent Order
                  </CustomText>
                  <CustomText variant="body2" sx={{ color: "#666", mb: 1 }}>
                    Order ID: #ORD-001
                  </CustomText>
                </Box>
              </Box>
              <CustomText
                variant="body2"
                sx={{
                  color: "#4caf50",
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Order Status - Out for Delivery
              </CustomText>
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

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocalOfferIcon sx={{ fontSize: { xs: 28, md: 32 }, color: "var(--themeColor)", mr: 1.5 }} />
                <Box>
                  <CustomText variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                    Loyalty Points
                  </CustomText>
                  <CustomText variant="body2" sx={{ fontWeight: 700, color: "#2c2c2c", mb: 1 }}>
                    1250
                  </CustomText>
                </Box>
              </Box>
              <CustomText variant="body2" sx={{ color: "#666", mb: 2 }}>
                You're 250 points away from a free pastry!
              </CustomText>
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
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocalOfferIcon sx={{ fontSize: 32, color: "var(--themeColor)", mr: 1.5 }} />
                <Box>
                  <CustomText variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c" }}>
                    Available Coupons
                  </CustomText>
                  <CustomText variant="body2" sx={{ fontWeight: 700, color: "#2c2c2c", mb: 1 }}>
                    3
                  </CustomText>
                </Box>
              </Box>
              <CustomText variant="body2" sx={{ color: "#666", mb: 2 }}>
                Including a 20% off your next purchase.
              </CustomText>
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
        <CustomText variant="h5" sx={{ fontWeight: 700, color: "var(--themeColor)", mb: { xs: 2, md: 3 }, fontSize: { xs: 18, md: 24 } }}>
          Your Favorite Items
        </CustomText>
        <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
          {favoriteItems.map((item) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={item?.id}>
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
                  src={item?.image}
                  alt={item?.name}
                  sx={{
                    width: "100%",
                    height: { xs: 140, sm: 160, md: 200 },
                    objectFit: "cover",
                  }}
                />
                <Box textAlign="center" sx={{ p: { xs: 1, md: 2 } }}>
                  <CustomText variant="body2" sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: 12, md: 14 } }}>
                    {item?.name}
                  </CustomText>
                  <CustomText variant="body2" sx={{ color: "var(--themeColor)", fontWeight: 700, fontSize: { xs: 13, md: 14 } }}>
                    {item?.price}
                  </CustomText>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

