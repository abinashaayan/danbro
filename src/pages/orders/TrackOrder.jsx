import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";
import {
  Assignment as AssignmentIcon,
  Restaurant as RestaurantIcon,
  LocalDining as LocalDiningIcon,
  LocalShipping as LocalShippingIcon,
  ArrowBack as ArrowBackIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const TrackOrder = () => {
  const navigate = useNavigate();
  const [activeStep] = useState(3); // 0-3, where 3 is the current step

  const steps = [
    {
      label: "Order Placed",
      description: "Today at 12:45 am",
      icon: <AssignmentIcon />,
      completed: true,
    },
    {
      label: "In the Kitchen",
      description: "Today at 12:45 am",
      icon: <RestaurantIcon />,
      completed: true,
    },
    {
      label: "Baking Fresh",
      description: "Today at 12:45 am",
      icon: <LocalDiningIcon />,
      completed: true,
    },
    {
      label: "Out for Delivery",
      description: "pending",
      icon: <LocalShippingIcon />,
      completed: false,
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", py: { xs: 4, md: 6 }, pb: { xs: 12, md: 16 } }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: 28, md: 36 },
                fontWeight: 700,
                color: "#2c2c2c",
                mb: 1,
              }}
            >
              Track your Order
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: 14, md: 16 },
                color: "#666",
              }}
            >
              Here's a quick look at your recent activity and rewards.
            </Typography>
          </Box>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              backgroundColor: "#e0e0e0",
              color: "#2c2c2c",
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              "&:hover": {
                backgroundColor: "#d0d0d0",
              },
            }}
          >
            Back
          </Button>
        </Box>

        {/* Order Status Card */}
        <Card
          sx={{
            borderRadius: 5,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            mb: 4,
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            {/* Order Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4, flexWrap: "wrap", gap: 2 }}>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "#2c2c2c",
                  }}
                >
                  Your Order is on its way!
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: "#666",
                  }}
                >
                  Order - #BAKERY-1234
                </Typography>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#2c2c2c",
                }}
              >
                Total : $24
              </Typography>
            </Box>

            <Divider sx={{ borderColor: "#BEBEBE", my: 2 }} />

            <Grid container spacing={2}>
              <Grid size={5} >
                <Box>
                  {steps?.map((step, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "flex-start", mb: 3, position: "relative", }}>
                      {index < steps.length - 1 && (
                        <Box
                          sx={{
                            position: "absolute",
                            left: 34,
                            top: 50,
                            width: 2,
                            height: "calc(100% + 12px)",
                            backgroundColor: step.completed ? "#FF9472" : "#e0e0e0",
                            zIndex: 0,
                          }}
                        />
                      )}
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: "50%",
                          backgroundColor: step.completed ? "#FF643A" : "#e0e0e0",
                          color: step.completed ? "#fff" : "#999",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 3,
                          zIndex: 1,
                          marginBottom: 3,
                          position: "relative",
                        }}
                      >
                        {step?.icon}
                      </Box>
                      <Box sx={{ flex: 1, pt: 0.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: step.completed ? "#2c2c2c" : "#999", fontSize: { xs: 16, md: 18 }, }}>
                          {step?.label}
                        </Typography>
                        <Typography variant="body2" sx={{ color: step.completed ? "#666" : "#999", fontSize: { xs: 13, md: 14 }, }}>
                          {step.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid size={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 3 }} />
              </Grid>
              <Grid size={5} sx={{ display: 'flex', alignItems: 'start' }}>
                <Box sx={{ width: "100%", backgroundColor: "#FFF8F2", borderRadius: 2, p: 3, border: "1px solid #FFDFBF", }}>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff", mr: 1.5, fontSize: 24, backgroundColor: "#FF643A"
                        }}
                      >
                        <DescriptionIcon />
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c", fontSize: { xs: 16, md: 18 }, }}>
                          Estimated Delivery
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#666", fontSize: { xs: 14, md: 16 } }}>
                          Arriving between 3:30 - 4:00 PM today
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Divider sx={{ borderColor: "#BEBEBE", my: 2 }} />
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff", mr: 1.5, fontSize: 24, backgroundColor: "#FF643A"
                        }}
                      >
                        <DescriptionIcon />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c2c2c", fontSize: { xs: 16, md: 18 }, }}>
                        Shipping to{" "}
                        <Typography component="span" sx={{ fontWeight: 400 }}>
                          123 sweet line, Lucknow, UP
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", flexWrap: "wrap" }}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#e0e0e0",
                  color: "#2c2c2c",
                  textTransform: "none",
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: 14, md: 16 },
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#d0d0d0",
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                Help with this Order
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/user-profile")}
                sx={{
                  backgroundColor: "#FFB5A1",
                  color: "#000",
                  textTransform: "none",
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: 14, md: 16 },
                  fontWeight: 'bold',
                  "&:hover": {
                    backgroundColor: "#F2709C",
                  },
                }}
              >
                View Order History
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Action Buttons */}

      </Container>
    </Box>
  );
};

