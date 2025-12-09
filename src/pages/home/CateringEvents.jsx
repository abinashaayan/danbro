import { Box, Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import cateringEvents from "../../assets/createevents.png";
import createevents1 from "../../assets/createevents1.png";
import { useState, useEffect, useRef } from "react";

export const CateringEvents = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = {
    header: useRef(null),
    hero: useRef(null),
    whyChoose: useRef(null),
    specialties: useRef(null),
    contact: useRef(null),
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
  
  const specialties = [
    {
      title: "Weddings",
      description: "Elegant cakes and desserts for your special day.",
      image: createevents1,
    },
    {
      title: "Corporate Events",
      description: "Delicious treats for meetings, conferences, and company celebrations.",
      image: createevents1,
    },
    {
      title: "Festivals",
      description: "Crowd-pleasing snacks and baked items.",
      image: createevents1,
    },
    {
      title: "Private Parties",
      description: "Personalized baked goods for birthdays, anniversaries, and more.",
      image: createevents1,
    },
  ];


  const services = [
    {
      title: "Menu Planning",
      description: "Our expert team helps you plan the perfect menu for your event, considering your preferences, budget, and guest count.",
    },
    {
      title: "Custom Cakes",
      description: "Design your dream cake with our talented bakers. From simple elegance to elaborate designs, we bring your vision to life.",
    },
    {
      title: "On-Site Service",
      description: "We provide professional on-site catering services with trained staff to ensure your event runs smoothly.",
    },
    {
      title: "Delivery & Setup",
      description: "Timely delivery and professional setup at your venue. We handle everything so you can focus on enjoying your event.",
    },
  ];

  return (
    <Box sx={{ width: "100%", overflowX: "hidden", backgroundColor: "#fff", pb: { xs: 12, md: 16 } }}>
      <Box
        ref={sectionRefs.header}
        sx={{
          position: "relative",
          height: { xs: 250, sm: 300, md: 400 },
          backgroundImage: `url(${cateringEvents})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          px: { xs: 2, sm: 3, md: 6 },
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
          }}
        >
          Catering & Events
        </Typography>
      </Box>

      {/* Event Types Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 5, md: 6 } }}>
        <Box
          ref={sectionRefs.hero}
          sx={{
            position: "relative",
            height: { xs: 280, sm: 320, md: 400 },
            backgroundImage: `url(${createevents1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            px: { xs: 2, sm: 3, md: 6 },
            borderRadius: { xs: 2, md: 3 },
            pt: { xs: 4, sm: 6, md: 10 },
            opacity: visibleSections.hero ? 1 : 0,
            transform: visibleSections.hero ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 22, sm: 28, md: 50 },
              fontWeight: 700,
              color: "#fff",
              mb: 2,
              textAlign: "center",
              px: { xs: 1, sm: 0 },
            }}
          >
            Make your celebrations sweeter with Danbro's premium catering services!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: 11, sm: 12, md: 14 },
              color: "#fff",
              textAlign: "center",
              maxWidth: "700px",
              px: { xs: 2, sm: 0 },
            }}
          >
            Elevate your event with our exquisite baked goods and personalized service.
          </Typography>
          <Button
            variant="contained"
            sx={{
              color: "#fff",
              backgroundColor: "#ED7D2B",
              textTransform: "none",
              borderRadius: 2,
              mt: 2,
              fontSize: { xs: 12, sm: 14, md: 16 },
              fontWeight: 600,
              px: { xs: 3, md: 4 },
              py: { xs: 0.8, md: 1.2 },
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#d66a1f",
                transform: "scale(1.05)",
              },
            }}
          >
            Request a Quote
          </Button>
        </Box>

        {/* Why Choose Section */}
        <Box ref={sectionRefs.whyChoose} sx={{ mt: { xs: 3, md: 4 } }}>
          <Box
            sx={{
              opacity: visibleSections.whyChoose ? 1 : 0,
              transform: visibleSections.whyChoose ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 20, sm: 24, md: 30 },
                fontWeight: 700,
                color: "#2c2c2c",
                mb: 2,
              }}
            >
              Why Choose Danbro for Catering?
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#555",
                fontSize: { xs: 13, sm: 14, md: 15 },
                maxWidth: "850px",
                lineHeight: 1.7,
                mb: 3,
              }}
            >
              Danbro Bakery brings a touch of elegance and deliciousness to every event.
              Our commitment to quality, customization, and exceptional service ensures your celebration is unforgettable. We offer:
            </Typography>

            <Box sx={{ mt: 2 }}>
              {[
                "Customized menus tailored to your event's theme and dietary needs.",
                "Freshly baked goods using the finest ingredients.",
                "Professional and friendly service from start to finish."
              ].map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1.5, sm: 2 },
                    mb: 1.5,
                    animation: visibleSections.whyChoose
                      ? `fadeInUp 0.6s ease-out ${i * 0.1}s both`
                      : "none",
                    "@keyframes fadeInUp": {
                      "0%": { opacity: 0, transform: "translateY(20px)" },
                      "100%": { opacity: 1, transform: "translateY(0)" },
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 16, sm: 20 },
                      height: { xs: 16, sm: 20 },
                      borderRadius: "4px",
                      border: "2px solid #dcdcdc",
                      flexShrink: 0,
                    }}
                  />
                  <Typography sx={{ color: "#444", fontSize: { xs: 13, sm: 14, md: 15 } }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 4 } }}>
        <Box ref={sectionRefs.specialties}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 20, sm: 24, md: 30 },
              fontWeight: 700,
              color: "#2c2c2c",
              mb: { xs: 3, md: 4 },
            }}
          >
            Our Catering Specialties
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 2, md: 2 }}>
            {specialties.map((item, index) => (
              <Grid size={3} key={index}>
                <Box
                  sx={{
                    cursor: "pointer",
                    animation: visibleSections.specialties
                      ? `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                      : "none",
                    "@keyframes fadeInUp": {
                      "0%": { opacity: 0, transform: "translateY(20px)" },
                      "100%": { opacity: 1, transform: "translateY(0)" },
                    },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: { xs: 2, md: 3 },
                      overflow: "hidden",
                      height: { xs: 200, sm: 180, md: 170 },
                      mb: 2,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: 15, sm: 16, md: 16 },
                      color: "#2c2c2c",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: 12, sm: 13, md: 13 },
                      color: "#666",
                      mt: 0.5,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Contact Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
        <Box ref={sectionRefs.contact}>
          <Box
            sx={{
              opacity: visibleSections.contact ? 1 : 0,
              transform: visibleSections.contact ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 20, sm: 24, md: 32 },
                fontWeight: 700,
                color: "#2c2c2c",
                mb: 2,
              }}
            >
              Get in Touch
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: 13, sm: 14, md: 16 },
                color: "#666",
                lineHeight: 1.8,
                mb: { xs: 3, md: 4 },
              }}
            >
              Planning an event? Contact us today to discuss your requirements and get a customized quote. Our team is ready to help make your celebration perfect!
            </Typography>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              <Grid item xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: { xs: 2, sm: 2.5, md: 3 },
                    borderRadius: 3,
                    backgroundColor: "#f9f9f9",
                    height: "100%",
                    transition: "all 0.3s ease",
                    animation: visibleSections.contact
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
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#2c2c2c",
                      fontSize: { xs: 15, sm: 16, md: 18 },
                      textAlign: "center",
                    }}
                  >
                    Visit Us
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: { xs: 12, sm: 13, md: 14 },
                      textAlign: "center",
                    }}
                  >
                    B-35, Sector-P, Aliganj, Lucknow 226024
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: { xs: 2, sm: 2.5, md: 3 },
                    borderRadius: 3,
                    backgroundColor: "#f9f9f9",
                    height: "100%",
                    transition: "all 0.3s ease",
                    animation: visibleSections.contact
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
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#2c2c2c",
                      fontSize: { xs: 15, sm: 16, md: 18 },
                      textAlign: "center",
                    }}
                  >
                    Call Us
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: { xs: 12, sm: 13, md: 14 },
                      lineHeight: 1.7,
                      textAlign: "center",
                    }}
                  >
                    +91-7309010623
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: { xs: 2, sm: 2.5, md: 3 },
                    borderRadius: 3,
                    backgroundColor: "#f9f9f9",
                    height: "100%",
                    transition: "all 0.3s ease",
                    animation: visibleSections.contact
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
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#2c2c2c",
                      fontSize: { xs: 15, sm: 16, md: 18 },
                      textAlign: "center",
                    }}
                  >
                    Email Us
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: { xs: 12, sm: 13, md: 14 },
                      textAlign: "center",
                    }}
                  >
                    hr@mrbrownbakery.com
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

