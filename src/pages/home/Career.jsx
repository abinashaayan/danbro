import { Box, Container, Grid, Card, CardContent, Button } from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { useState, useEffect, useRef } from "react";
import { whyWorkWithUs, currentOpenings } from "../../utils/careerData";

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

  return (
    <Box sx={{ width: "100%", overflowX: "hidden", backgroundColor: "#fff", pb: { xs: 12, sm: 8, md: 0 }, p: { xs: 1.25, sm: 1.5, md: 0 }, mb: 5 }}>
      <Container sx={{ py: { xs: 4, sm: 4, md: 4, lg: 0 }, px: { xs: 2, sm: 3, md: 4, lg: 4 } }}>
        <Box
          ref={sectionRefs.header}
          sx={{
            opacity: visibleSections.header ? 1 : 0,
            transform: visibleSections.header ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            px: { xs: 0, sm: 0, md: 1, lg: 0 },
          }}
        >
          <CustomText variant="h4" sx={{ fontWeight: 700, color: "#2c2c2c", mb: 3, fontSize: { xs: 24, sm: 28, md: 30, lg: 32 }, }}>
            Join the Danbro Bakery Team
          </CustomText>
          <CustomText variant="body1" sx={{ fontSize: { xs: 13, sm: 14, md: 15, lg: 16 }, color: "#666", lineHeight: 1.8, }}>
            At Danbro Bakery, we're more than just a team; we're a family. We're passionate about crafting delicious baked goods and creating a positive work environment where everyone can thrive. If you're looking for a rewarding career in the baking industry, we invite you to explore opportunities with us.
          </CustomText>
        </Box>
      </Container>

      {/* Why Work With Us Section */}
      <Container ref={sectionRefs.whyWork} sx={{ px: { xs: 2, sm: 3, md: 4, lg: 4 }, py: { xs: 2, sm: 3, md: 3, lg: 4 } }}>
        <Box
          sx={{
            opacity: visibleSections.whyWork ? 1 : 0,
            transform: visibleSections.whyWork ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            px: { xs: 0, sm: 0, md: 1, lg: 0 },
          }}
        >
          <CustomText
            variant="h2"
            sx={{
              fontSize: { xs: 22, sm: 26, md: 28, lg: 32 },
              fontWeight: 700,
              color: "#2c2c2c",
              mb: { xs: 3, sm: 3.5, md: 4, lg: 4 },
            }}
          >
            Why Work With Us?
          </CustomText>
          <Grid container spacing={{ xs: 2, sm: 2, md: 2.5, lg: 3 }}>
            {whyWorkWithUs?.map((item, index) => (
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
                      <item.icon sx={{ fontSize: { xs: 36, md: 40 }, color: activeIndex === index ? "#ff9800" : "#2c2c2c", transition: "0.3s", }} />
                    </Box>

                    <CustomText variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: "#2c2c2c", fontSize: { xs: 16, sm: 17, md: 17, lg: 18 }, textAlign: "center", }}>
                      {item?.title}
                    </CustomText>

                    <CustomText variant="body2" sx={{ color: "#666", lineHeight: 1.7, fontSize: { xs: 13, sm: 13.5, md: 13.5, lg: 14 }, textAlign: "center", }}>
                      {item?.description}
                    </CustomText>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Current Openings Section */}
      <Container sx={{ py: { xs: 4, sm: 4, md: 4, lg: 0 }, px: { xs: 2, sm: 3, md: 4, lg: 4 } }} ref={sectionRefs.openings}>
        <Box
          sx={{
            opacity: visibleSections.openings ? 1 : 0,
            transform: visibleSections.openings ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            px: { xs: 0, sm: 0, md: 1, lg: 0 },
          }}
        >
          <CustomText
            variant="h2"
            sx={{
              fontSize: { xs: 22, sm: 26, md: 28, lg: 32 },
              fontWeight: 700,
              color: "#2c2c2c",
              mb: { xs: 3, sm: 3.5, md: 4, lg: 4 },
            }}
          >
            Current Openings
          </CustomText>
          <Grid container spacing={{ xs: 2, sm: 3, md: 3, lg: 3 }}>
            {currentOpenings?.map((job, index) => {
              const IconComponent = job.icon;
              return (
                <Grid size={12} key={index}>
                  <Box
                    sx={{
                      border: "2px solid #FFE5E5",
                      borderRadius: "10px",
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
                      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 }, flex: 1, width: "100%", }}>
                        <Box sx={{ p: { xs: 1.2, sm: 1.5 }, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FFE2DA", borderRadius: 2, flexShrink: 0, }}>
                          <IconComponent sx={{ fontSize: { xs: 28, sm: 32, md: 36 }, color: "#171412", }} />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <CustomText variant="h6" sx={{ fontWeight: 700, color: "#2c2c2c", fontSize: { xs: 16, sm: 18, md: 19, lg: 20 }, mb: 0.5, }}>
                            {job?.title}
                          </CustomText>
                          <CustomText variant="body2" sx={{ color: "#666", fontSize: { xs: 12, sm: 13, md: 13.5, lg: 14 }, }}>
                            {job?.description}
                          </CustomText>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>

      {/* How to Apply Section */}
      <Container sx={{ py: { xs: 4, sm: 4, md: 4, lg: 0 }, px: { xs: 2, sm: 3, md: 4, lg: 4 }, mb: 5, mt: 2 }} ref={sectionRefs.apply}>
        <Box
          sx={{
            opacity: visibleSections.apply ? 1 : 0,
            transform: visibleSections.apply ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            px: { xs: 0, sm: 0, md: 1, lg: 0 },
          }}
        >
          <CustomText
            variant="h2"
            sx={{
              fontSize: { xs: 22, sm: 26, md: 28, lg: 32 },
              fontWeight: 700,
              color: "#2c2c2c",
              mb: { xs: 3, sm: 3.5, md: 4, lg: 4 },
            }}
          >
            How to Apply
          </CustomText>
          <Grid container spacing={{ xs: 2, sm: 3, md: 3, lg: 4 }}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: { xs: 1.5, sm: 2 },
                  p: { xs: 2, sm: 2.5, md: 2.5, lg: 3 },
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
                  <CustomText
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#2c2c2c",
                      fontSize: { xs: 15, sm: 16, md: 17, lg: 18 },
                      mb: 0.5,
                    }}
                  >
                    Head Office
                  </CustomText>
                  <CustomText
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: { xs: 12, sm: 13, md: 13.5, lg: 14 },
                      lineHeight: 1.7,
                    }}
                  >
                    B-35, Sector-P, Aliganj, Lucknow 226024
                  </CustomText>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: { xs: 1.5, sm: 2 },
                  p: { xs: 2, sm: 2.5, md: 2.5, lg: 3 },
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
                  <CustomText
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#2c2c2c",
                      fontSize: { xs: 15, sm: 16, md: 17, lg: 18 },
                      mb: 0.5,
                    }}
                  >
                    Email
                  </CustomText>
                  <CustomText
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: { xs: 12, sm: 13, md: 13.5, lg: 14 },
                      lineHeight: 1.7,
                    }}
                  >
                    hr@mrbrownbakery.com
                  </CustomText>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: { xs: 1.5, sm: 2 },
                  p: { xs: 2, sm: 2.5, md: 2.5, lg: 3 },
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
                  <CustomText
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#2c2c2c",
                      fontSize: { xs: 15, sm: 16, md: 17, lg: 18 },
                      mb: 0.5,
                    }}
                  >
                    Phone
                  </CustomText>
                  <CustomText
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: { xs: 12, sm: 13, md: 13.5, lg: 14 },
                      lineHeight: 1.7,
                    }}
                  >
                    +91-7309010623
                  </CustomText>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

