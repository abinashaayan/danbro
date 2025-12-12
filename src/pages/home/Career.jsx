import { Box, Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FactoryIcon from "@mui/icons-material/Factory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { useState, useEffect, useRef } from "react";

export const Career = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = {
    header: useRef(null),
    whyWork: useRef(null),
    openings: useRef(null),
    apply: useRef(null),
  };

  useEffect(() => {
    const observers = Object.keys(sectionRefs).map((key) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => ({ ...prev, [key]: true }));
            }
          });
        },
        { threshold: 0.1 }
      );
      if (sectionRefs[key].current) {
        observer.observe(sectionRefs[key].current);
      }
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);
  const whyWorkWithUs = [
    {
      icon: TrendingUpIcon,
      title: "Growth Opportunities",
      description: "We invest in our employees' professional development, offering training and advancement opportunities.",
      highlighted: true,
    },
    {
      icon: LightbulbIcon,
      title: "Creative Environment",
      description: "We foster a culture of innovation and creativity, encouraging our team to bring their unique ideas to the table.",
      highlighted: false,
    },
    {
      icon: EnergySavingsLeafIcon,
      title: "Commitment to Quality",
      description: "We take pride in using the finest ingredients and time-honored techniques to create exceptional baked goods.",
      highlighted: false,
    },
    {
      icon: BusinessCenterIcon,
      title: "Employee Benefits",
      description: "We offer competitive salaries, comprehensive benefits packages, and a supportive work environment.",
      highlighted: false,
    },
  ];

  const currentOpenings = [
    {
      icon: RestaurantIcon,
      title: "Bakery Chefs",
      description: "Crafting delicious baked goods with passion and precision.",
    },
    {
      icon: FactoryIcon,
      title: "Production Staff",
      description: "Ensuring efficient production and maintaining high standards.",
    },
    {
      icon: ShoppingCartIcon,
      title: "Retail Executives",
      description: "Providing excellent customer service and managing retail operations.",
    },
    {
      icon: PeopleIcon,
      title: "Management Positions",
      description: "Overseeing operations, ensuring quality, and driving team success.",
    },
  ];

  return (
    <Box sx={{ width: "100%", overflowX: "hidden", backgroundColor: "#fff", pb: { xs: 12, md: 0 }, p: { xs: 1.25, md: 0 } }}>
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 0 }, px: { xs: 2, md: 3 } }}>
        <Box
          ref={sectionRefs.header}
          sx={{
            opacity: visibleSections.header ? 1 : 0,
            transform: visibleSections.header ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#2c2c2c",
              mb: 3,
              fontSize: { xs: 24, sm: 28, md: 32 },
            }}
          >
            Join the Danbro Bakery Team
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: 13, sm: 14, md: 16 },
              color: "#666",
              lineHeight: 1.8,
            }}
          >
            At Danbro Bakery, we're more than just a team; we're a family. We're passionate about crafting delicious baked goods and creating a positive work environment where everyone can thrive. If you're looking for a rewarding career in the baking industry, we invite you to explore opportunities with us.
          </Typography>
        </Box>
      </Container>

      {/* Why Work With Us Section */}
      <Container maxWidth="xl" ref={sectionRefs.whyWork} sx={{ px: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            opacity: visibleSections.whyWork ? 1 : 0,
            transform: visibleSections.whyWork ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 22, sm: 26, md: 32 },
              fontWeight: 700,
              color: "#2c2c2c",
              mb: { xs: 3, md: 4 },
            }}
          >
            Why Work With Us?
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 2, md: 2 }}>
            {whyWorkWithUs.map((item, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card
                  onClick={() => setActiveIndex(index)}
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    animation: visibleSections.whyWork
                      ? `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                      : "none",
                    "@keyframes fadeInUp": {
                      "0%": { opacity: 0, transform: "translateY(20px)" },
                      "100%": { opacity: 1, transform: "translateY(0)" },
                    },
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                    },
                    p: { xs: 2, md: 3 },
                    backgroundColor: "#fff",
                    border: "2px solid #e0e0e0",
                    ...(activeIndex === index && {
                      backgroundColor: "#FFE5E5",
                      border: "2px solid #ff9800",
                    }),
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                      <item.icon
                        sx={{
                          fontSize: { xs: 36, md: 40 },
                          color: activeIndex === index ? "#ff9800" : "#2c2c2c",
                          transition: "0.3s",
                        }}
                      />
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1.5,
                        color: "#2c2c2c",
                        fontSize: { xs: 16, md: 18 },
                        textAlign: "center",
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        lineHeight: 1.7,
                        fontSize: { xs: 13, md: 14 },
                        textAlign: "center",
                      }}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Current Openings Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 0 }, px: { xs: 2, md: 3 } }} ref={sectionRefs.openings}>
        <Box
          sx={{
            opacity: visibleSections.openings ? 1 : 0,
            transform: visibleSections.openings ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 22, sm: 26, md: 32 },
              fontWeight: 700,
              color: "#2c2c2c",
              mb: { xs: 3, md: 4 },
            }}
          >
            Current Openings
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3, md: 3 }}>
            {currentOpenings.map((job, index) => {
              const IconComponent = job.icon;
              return (
                <Grid size={12} key={index}>
                  <Box
                    sx={{
                      animation: visibleSections.openings
                        ? `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                        : "none",
                      "@keyframes fadeInUp": {
                        "0%": { opacity: 0, transform: "translateY(20px)" },
                        "100%": { opacity: 1, transform: "translateY(0)" },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "flex-start", sm: "center" },
                        gap: { xs: 2, sm: 3 },
                        p: 1,
                        borderRadius: 3,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: { xs: 1.5, sm: 2 },
                          flex: 1,
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            p: { xs: 1.2, sm: 1.5 },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#FFE2DA",
                            borderRadius: 2,
                            flexShrink: 0,
                          }}
                        >
                          <IconComponent
                            sx={{
                              fontSize: { xs: 28, sm: 32, md: 36 },
                              color: "#171412",
                            }}
                          />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: "#2c2c2c",
                              fontSize: { xs: 16, sm: 18, md: 20 },
                              mb: 0.5,
                            }}
                          >
                            {job.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#666",
                              fontSize: { xs: 12, sm: 13, md: 14 },
                            }}
                          >
                            {job.description}
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#1877F2",
                          color: "#fff",
                          textTransform: "none",
                          borderRadius: 2,
                          px: { xs: 3, sm: 4, md: 5 },
                          py: { xs: 1, sm: 1.2 },
                          fontSize: { xs: 13, sm: 14, md: 16 },
                          fontWeight: 600,
                          width: { xs: "100%", sm: "auto" },
                          "&:hover": {
                            backgroundColor: "#1565C0",
                            transform: "scale(1.05)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        Apply Now
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>

      {/* How to Apply Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 0 }, px: { xs: 2, md: 3 } }} ref={sectionRefs.apply}>
        <Box
          sx={{
            opacity: visibleSections.apply ? 1 : 0,
            transform: visibleSections.apply ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 22, sm: 26, md: 32 },
              fontWeight: 700,
              color: "#2c2c2c",
              mb: { xs: 3, md: 4 },
            }}
          >
            How to Apply
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: { xs: 1.5, sm: 2 },
                  p: { xs: 2, sm: 3 },
                  borderRadius: 3,
                  backgroundColor: "#f9f9f9",
                  height: "100%",
                  transition: "all 0.3s ease",
                  animation: visibleSections.apply
                    ? `fadeInUp 0.6s ease-out 0s both`
                    : "none",
                  "@keyframes fadeInUp": {
                    "0%": { opacity: 0, transform: "translateY(20px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                  },
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <LocationOnIcon
                  sx={{
                    fontSize: { xs: 28, sm: 32 },
                    color: "#FF9472",
                    mt: 0.5,
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#2c2c2c",
                      fontSize: { xs: 15, sm: 16, md: 18 },
                      mb: 0.5,
                    }}
                  >
                    Head Office
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: { xs: 12, sm: 13, md: 14 },
                      lineHeight: 1.7,
                    }}
                  >
                    B-35, Sector-P, Aliganj, Lucknow 226024
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: { xs: 1.5, sm: 2 },
                  p: { xs: 2, sm: 3 },
                  borderRadius: 3,
                  backgroundColor: "#f9f9f9",
                  height: "100%",
                  transition: "all 0.3s ease",
                  animation: visibleSections.apply
                    ? `fadeInUp 0.6s ease-out 0.1s both`
                    : "none",
                  "@keyframes fadeInUp": {
                    "0%": { opacity: 0, transform: "translateY(20px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                  },
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <EmailIcon
                  sx={{
                    fontSize: { xs: 28, sm: 32 },
                    color: "#FF9472",
                    mt: 0.5,
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#2c2c2c",
                      fontSize: { xs: 15, sm: 16, md: 18 },
                      mb: 0.5,
                    }}
                  >
                    Email
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: { xs: 12, sm: 13, md: 14 },
                      lineHeight: 1.7,
                    }}
                  >
                    hr@mrbrownbakery.com
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: { xs: 1.5, sm: 2 },
                  p: { xs: 2, sm: 3 },
                  borderRadius: 3,
                  backgroundColor: "#f9f9f9",
                  height: "100%",
                  transition: "all 0.3s ease",
                  animation: visibleSections.apply
                    ? `fadeInUp 0.6s ease-out 0.2s both`
                    : "none",
                  "@keyframes fadeInUp": {
                    "0%": { opacity: 0, transform: "translateY(20px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                  },
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <PhoneIcon
                  sx={{
                    fontSize: { xs: 28, sm: 32 },
                    color: "#FF9472",
                    mt: 0.5,
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#2c2c2c",
                      fontSize: { xs: 15, sm: 16, md: 18 },
                      mb: 0.5,
                    }}
                  >
                    Phone
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: { xs: 12, sm: 13, md: 14 },
                      lineHeight: 1.7,
                    }}
                  >
                    +91-7309010623
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

