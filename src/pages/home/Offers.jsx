import { Box, Container, Typography, Grid, Card, CardContent, Button, Chip } from "@mui/material";
import jointeams from "../../assets/jointeams.png";
import ourculture from "../../assets/ourculture.png";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { useState, useEffect, useRef } from "react";

export const Offers = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = {
    header: useRef(null),
    culture: useRef(null),
    benefits: useRef(null),
    positions: useRef(null),
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

  const schemes = [
    {
      title: "Loyalty Program",
      description: "We're seeking a skilled baker to create our signature breads, pastries, and cakes. Responsibilities include mixing, shaping, and baking dough, ensuring quality and consistency, and maintaining a clean workspace.",
      image: jointeams
    },
    {
      title: "Subscription Plan",
      description: "Join our front-of-house team to provide exceptional customer service. Responsibilities include taking orders, handling payments, assisting customers with inquiries, and maintaining a welcoming atmosphere.",
      image: jointeams
    },
    {
      title: "Corporate Scheme",
      description: "We need a reliable delivery driver to transport our baked goods to customers and events. Responsibilities include safe and timely delivery, maintaining vehicle cleanliness, and providing excellent customer service.",
      image: jointeams
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const whyWorkWithUs = [
    {
      icon: TrendingUpIcon,
      title: "Competitive Pay",
      highlighted: true,
    },
    {
      icon: LightbulbIcon,
      title: "Health & Wellness",
      highlighted: false,
    },
    {
      icon: EnergySavingsLeafIcon,
      title: "Employee Discounts",
      highlighted: false,
    },
    {
      icon: BusinessCenterIcon,
      title: "Growth Opportunities",
      highlighted: false,
    },
  ];


  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 0 } }}>
      <Box sx={{ width: "100%", overflowX: "hidden", backgroundColor: "#fff", pb: { xs: 12, md: 0 } }}>
        <Box
          ref={sectionRefs.header}
          sx={{
            position: "relative",
            height: { xs: 280, sm: 350, md: 400 },
            backgroundImage: `url(${jointeams})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            px: { xs: 2, sm: 3, md: 6 },
            borderRadius: { xs: 3, md: 5 },
            pt: { xs: 4, sm: 6, md: 10 },
            mb: { xs: 4, md: 6 },
            opacity: visibleSections.header ? 1 : 0,
            transform: visibleSections.header ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 28, sm: 36, md: 56 },
              fontWeight: 700,
              color: "#fff",
              mb: 2,
              textAlign: "center",
            }}
          >
            Offers & Schemes
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: 13, sm: 14, md: 16 },
              color: "#fff",
              textAlign: "center",
              maxWidth: "700px",
              px: { xs: 2, sm: 0 },
            }}
          >
            At Danbro Bakery, we're more than just a team; we're a family. We're passionate about crafting delicious baked goods and creating memorable experiences for our customers. If you share our love for baking and community, we'd love to hear from you.
          </Typography>
          <Button
            variant="contained"
            sx={{
              color: "#fff",
              backgroundColor: "#FFB5A1",
              textTransform: "none",
              borderRadius: 2,
              mt: 2,
              fontSize: { xs: 13, sm: 14, md: 16 },
              fontWeight: 600,
              px: { xs: 3, md: 4 },
              py: { xs: 1, md: 1.2 },
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#FF9472",
                transform: "scale(1.05)",
              },
            }}
          >
            View all Openings
          </Button>
        </Box>

        {/* Current Offers Section */}
        <Box ref={sectionRefs.culture} sx={{ mt: { xs: 3, md: 4 } }}>
          <Box
            sx={{
              opacity: visibleSections.culture ? 1 : 0,
              transform: visibleSections.culture ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 22, sm: 24, md: 32 },
                fontWeight: 700,
                color: "#515151",
                mb: 2,
              }}
            >
              Our Culture
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: 13, sm: 14, md: 16 },
                mb: 2,
                lineHeight: 1.7,
              }}
            >
              At Danbro Bakery, we foster a collaborative and supportive environment where every team member is valued.
              We believe in continuous learning, growth, and celebrating our successes together. Our commitment to quality
              and customer satisfaction drives everything we do.
            </Typography>
            <Box
              sx={{
                width: "100%",
                mt: 2,
                borderRadius: { xs: 2, md: 3 },
                overflow: "hidden",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <img
                src={ourculture}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  objectFit: "cover",
                  display: "block",
                }}
                alt="Our Culture"
              />
            </Box>
          </Box>
        </Box>


        <Box ref={sectionRefs.benefits} sx={{ mt: { xs: 4, md: 5 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 22, sm: 24, md: 32 },
              fontWeight: 700,
              color: "#2c2c2c",
              mb: 2,
            }}
          >
            Benefits
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 2, md: 2 }}>
            {whyWorkWithUs?.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  onClick={() => setActiveIndex(index)}
                  sx={{
                    borderRadius: 3,
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    animation: visibleSections.benefits
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
                    p: { xs: 1.5, sm: 2 },
                    backgroundColor: "#fff",
                    border: "2px solid #e0e0e0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    ...(activeIndex === index && {
                      backgroundColor: "#FFE5E5",
                      border: "2px solid #ff9800",
                    }),
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 0.8, sm: 1 },
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <item.icon
                      sx={{
                        fontSize: { xs: 24, sm: 28, md: 30 },
                        color: activeIndex === index ? "#ff9800" : "#2c2c2c",
                        transition: "0.3s",
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        color: "#2c2c2c",
                        fontSize: { xs: 13, sm: 14, md: 15 },
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Schemes Section */}
        <Box ref={sectionRefs.positions} sx={{ py: { xs: 4, md: 5 }, mt: { xs: 4, md: 5 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 22, sm: 24, md: 32 },
              fontWeight: 700,
              color: "#2c2c2c",
            }}
          >
            Open Positions
          </Typography>

          {schemes?.map((scheme, index) => (
            <Box
              key={index}
              sx={{
                mt: { xs: 2, md: 3 },
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                gap: { xs: 2, md: 3 },
                borderRadius: 3,
              }}
            >
              <Box sx={{ flex: 1, textAlign: { xs: "center", md: "start" }, width: "100%" }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: "#2c2c2c",
                    fontSize: { xs: 18, sm: 20, md: 24 },
                  }}
                >
                  {scheme.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#666",
                    mb: 2,
                    maxWidth: { xs: "100%", md: 600 },
                    fontSize: { xs: 13, sm: 14, md: 15 },
                    lineHeight: 1.7,
                  }}
                >
                  {scheme.description}
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FF9472",
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: 2,
                    px: { xs: 4, md: 3 },
                    py: { xs: 1, md: 1.2 },
                    fontSize: { xs: 13, sm: 14, md: 15 },
                    fontWeight: 600,
                    width: { xs: "100%", md: "auto" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#ff7d58",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  Apply Now
                </Button>
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", md: 260 },
                  height: { xs: 200, sm: 220, md: 170 },
                  borderRadius: 3,
                  overflow: "hidden",
                  flexShrink: 0,
                  order: { xs: -1, md: 1 },
                }}
              >
                <img
                  src={scheme.image}
                  alt={scheme.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

