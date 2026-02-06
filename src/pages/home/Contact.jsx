import { Box, Button, Container, Grid, IconButton, Link } from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import { CustomToast } from "../../components/comman/CustomToast";
import { useEffect, useRef, useState } from "react";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@mui/icons-material";
import { submitContact, getAllFAQs } from "../../utils/apiService";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import blogHero from "../../assets/blog.png";
import getintouch from "../../assets/getintouch.png";

const inputStyle = {
  width: "100%",
  padding: "12px",
  background: "rgba(255,255,255,0.55)",
  border: "none",
  borderRadius: "6px",
  fontSize: "14px",
  outline: "none",
};

export const Contact = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const [open, setOpen] = useState(0);
  const [faqs, setFaqs] = useState([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
    loading: false,
  });

  const sectionRefs = {
    header: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const observers = Object.keys(sectionRefs).map((key) => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setVisibleSections(prev => ({ ...prev, [key]: true }));
        });
      }, { threshold: 0.1 });

      if (sectionRefs[key].current) observer.observe(sectionRefs[key].current);
      return observer;
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoadingFaqs(true);
        const response = await getAllFAQs();
        // Handle different response structures
        if (response?.data && Array.isArray(response.data)) {
          setFaqs(response.data);
        } else if (response?.faqs && Array.isArray(response.faqs)) {
          setFaqs(response.faqs);
        } else if (Array.isArray(response)) {
          setFaqs(response);
        } else {
          // Fallback to default FAQs if API structure is different
          setFaqs([
            { question: "Can I place an Order Online?", answer: "Yes! you can place an order through our website for pickup or delivery." },
            { question: "What payment methods do you accept?", answer: "Online, UPI, Card & Cash depending on store." },
            { question: "Can I customize my cake or bakery item?", answer: "Yes! Custom cakes & bakery products available." },
            { question: "Can I return my order?", answer: "Return policy varies depending on item condition." },
            { question: "What are your store hours?", answer: "Timings vary per location. Check nearest store." },
          ]);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        // Use default FAQs on error
        setFaqs([
          { question: "Can I place an Order Online?", answer: "Yes! you can place an order through our website for pickup or delivery." },
          { question: "What payment methods do you accept?", answer: "Online, UPI, Card & Cash depending on store." },
          { question: "Can I customize my cake or bakery item?", answer: "Yes! Custom cakes & bakery products available." },
          { question: "Can I return my order?", answer: "Return policy varies depending on item condition." },
          { question: "What are your store hours?", answer: "Timings vary per location. Check nearest store." },
        ]);
      } finally {
        setLoadingFaqs(false);
      }
    };

    fetchFAQs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setToast({
        open: true,
        message: "Please enter both first name and last name",
        severity: "error",
        loading: false,
      });
      return;
    }

    if (!formData.email.trim()) {
      setToast({
        open: true,
        message: "Please enter your email address",
        severity: "error",
        loading: false,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setToast({
        open: true,
        message: "Please enter a valid email address",
        severity: "error",
        loading: false,
      });
      return;
    }

    if (!formData.phone.trim()) {
      setToast({
        open: true,
        message: "Please enter your phone number",
        severity: "error",
        loading: false,
      });
      return;
    }

    if (!formData.message.trim()) {
      setToast({
        open: true,
        message: "Please enter your message",
        severity: "error",
        loading: false,
      });
      return;
    }

    setIsSubmitting(true);
    setToast({
      open: true,
      message: "Submitting your message...",
      severity: "info",
      loading: true,
    });

    try {
      await submitContact(formData);
      setToast({
        open: true,
        message: "Thank you! Your message has been sent successfully.",
        severity: "success",
        loading: false,
      });
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setToast({
        open: true,
        message: error.message || "Failed to send message. Please try again.",
        severity: "error",
        loading: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ width: "100%", overflowX: "hidden", p: { xs: "10px", sm: 0 }, pt: { xs: "35px", sm: 0 } }}>

      {/* HERO */}
      <Box
        ref={sectionRefs.header}
        sx={{
          height: { xs: 220, sm: 280, md: 350, lg: 420 },
          backgroundImage: `url(${blogHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 0, sm: 3, md: 4, lg: 6 },
          opacity: visibleSections.header ? 1 : 0,
          transform: visibleSections.header ? "translateY(0)" : "translateY(20px)",
          transition: "0.7s ease",
        }}
      >
        <CustomText sx={{ fontSize: { xs: 24, sm: 38, md: 42, lg: 56 }, fontWeight: 700, color: "#fff" }}>
          CONTACT US
        </CustomText>
        <CustomText sx={{ color: "#fff", fontSize: { xs: 11, sm: 13, md: 13, lg: 14 }, mt: 1 }}>
          Home • Contact Us
        </CustomText>
      </Box>

      {/* CONTACT DETAILS — modern, with social */}
      <Container sx={{ py: { xs: 3, sm: 4 }, px: { xs: 0, sm: 2, md: 3, lg: 2 }, maxWidth: "100%" }}>
        <CustomText align="center" sx={{ fontWeight: 700, color: "#FF9472", mb: { xs: 3, sm: 4 }, fontSize: { xs: 20, sm: 24, md: 26, lg: 28 }, px: { xs: 0, sm: 0, md: 2, lg: 0 } }}>
          CONTACT DETAILS
        </CustomText>
        <Grid container spacing={{ xs: 2, sm: 2 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,181,161,0.4)",
                  width: "100%",
                  height: "100%",
                  minHeight: { xs: 180, sm: 220 },
                  transition: "all 0.25s ease",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(255, 148, 114, 0.15)",
                    borderColor: "#FFB5A1",
                  },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 40, sm: 48 },
                    height: { xs: 40, sm: 48 },
                    borderRadius: "50%",
                    bgcolor: "#FF9472",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1.5,
                  }}
                >
                <PhoneIcon sx={{ color: "#fff", fontSize: { xs: 20, sm: 24 } }} />
              </Box>

              <Box sx={{ flexGrow: 1 }}>
                <CustomText
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#666",
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    mb: 0.5,
                  }}
                >
                  Phone
                </CustomText>

                <Link
                  href="tel:+917309032618"
                  sx={{
                    fontSize: { xs: 13, sm: 14 },
                    fontWeight: 600,
                    color: "#2c2c2c",
                    textDecoration: "none",
                    display: "block",
                    "&:hover": {
                      color: "#FF643A",
                      textDecoration: "underline",
                    },
                  }}
                >
                  +91 7309032618
                </Link>

                <Link
                  href="tel:05224113205"
                  sx={{
                    fontSize: { xs: 13, sm: 14 },
                    fontWeight: 600,
                    color: "#2c2c2c",
                    textDecoration: "none",
                    display: "block",
                    "&:hover": {
                      color: "#FF643A",
                      textDecoration: "underline",
                    },
                  }}
                >
                  0522-4113205
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 2,
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,181,161,0.4)",
                width: "100%",
                height: "100%",
                minHeight: 220,
                transition: "all 0.25s ease",
                "&:hover": {
                  boxShadow: "0 8px 24px rgba(255, 148, 114, 0.15)",
                  borderColor: "#FFB5A1",
                },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  bgcolor: "#FF9472",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1.5,
                }}
              >
                <EmailIcon sx={{ color: "#fff", fontSize: 24 }} />
              </Box>

              <Box sx={{ flexGrow: 1 }}>
                <CustomText
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#666",
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    mb: 0.5,
                  }}
                >
                  Email
                </CustomText>

                <Link
                  href="mailto:Info@Mrbrownbakery.Com"
                  sx={{
                    fontSize: { xs: 13, sm: 14 },
                    fontWeight: 600,
                    color: "#2c2c2c",
                    textDecoration: "none",
                    wordBreak: "break-all",
                    "&:hover": {
                      color: "#FF643A",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Info@Mrbrownbakery.Com
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 2,
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,181,161,0.4)",
                width: "100%",
                height: "100%",
                minHeight: 220,
                transition: "all 0.25s ease",
                "&:hover": {
                  boxShadow: "0 8px 24px rgba(255, 148, 114, 0.15)",
                  borderColor: "#FFB5A1",
                },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  bgcolor: "#FF9472",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1.5,
                }}
              >
                <LocationOnIcon sx={{ color: "#fff", fontSize: 24 }} />
              </Box>

              <Box sx={{ flexGrow: 1 }}>
                <CustomText
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#666",
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    mb: 0.5,
                  }}
                >
                  Address
                </CustomText>

                <Link
                  href="https://www.google.com/maps/search/?api=1&query=B-35,+Sector-P,+Aliganj,+Lucknow,+UP+220024"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontSize: { xs: 13, sm: 14 },
                    fontWeight: 600,
                    color: "#2c2c2c",
                    textDecoration: "none",
                    wordBreak: "break-word",
                    "&:hover": {
                      color: "#FF643A",
                      textDecoration: "underline",
                    },
                  }}
                >
                  B-35, Sector-P, Aliganj, Lucknow, UP 220024
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* GET IN TOUCH */}
      <Box sx={{ textAlign: "center", mb: 3, px: { xs: 0, sm: 3, md: 4, lg: 4 } }}>
        <CustomText sx={{ fontSize: { xs: 28, sm: 40, md: 48, lg: 60 }, fontWeight: 700, opacity: .15 }}>Get in touch</CustomText>
        <CustomText sx={{ fontSize: { xs: 13, sm: 16, md: 17, lg: 18 }, maxWidth: { xs: "100%", sm: "90%", md: 600 }, mx: "auto", mt: -3, color: "#555" }}>
          Reach out, and let's create a universe of possibilities together!
        </CustomText>
      </Box>

      <Container sx={{ py: { xs: 3, sm: 4 }, px: { xs: 0, sm: 2, md: 3, lg: 2 }, maxWidth: "100%" }}>
        <Box sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          background: "linear-gradient(90deg,#FF9472,#FF8F6B)",
          borderRadius: { xs: 2, sm: 4 },
          p: { xs: 2, sm: 3.5, md: 4, lg: 5 },
          gap: { xs: 3, sm: 4, md: 3.5, lg: 4 }
        }}>

          {/* FORM */}
          <Box sx={{ flex: 1 }}>
            <CustomText sx={{ fontSize: { xs: 18, sm: 20, md: 22, lg: 24 }, fontWeight: 700, color: "#fff" }}>Let's connect constellations</CustomText>
            <CustomText sx={{ fontSize: { xs: 13, sm: 14, md: 14.5, lg: 15 }, color: "#fff", mb: 3, mt: 1 }}>
              Let's align our constellations! Reach out and let the magic of collaboration shine.
            </CustomText>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, textAlign: { xs: "center", md: "left" } }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isSubmitting}
                sx={{
                  background: "#fff",
                  color: "#000",
                  fontWeight: 600,
                  width: { xs: "100%", md: "40%" },
                  "&:disabled": {
                    background: "rgba(255,255,255,0.7)",
                    color: "rgba(0,0,0,0.5)",
                  },
                }}
              >
                {isSubmitting ? "Sending..." : "Send"}
              </Button>
            </Box>
          </Box>

          {/* IMAGE */}
          <Box sx={{ flex: 1 }}>
            <img src={getintouch} style={{ width: "100%", borderRadius: 16 }} />
          </Box>
        </Box>
      </Container>

      {/* FAQ */}
      <Container sx={{ py: { xs: 3, sm: 4 }, px: { xs: 0, sm: 2, md: 3, lg: 2 }, mb: { xs: 4, sm: 5 }, maxWidth: "100%" }}>
        <CustomText align="center" sx={{ fontWeight: 700, fontSize: { xs: 20, sm: 26, md: 28, lg: 32 }, mb: { xs: 3, sm: 4 }, px: { xs: 0, sm: 0, md: 1, lg: 0 } }}>
          Frequently Asked Questions
        </CustomText>

        <Box sx={{ px: { xs: 0, sm: 0, md: 1, lg: 0 } }}>
          {loadingFaqs ? (
            <CustomText sx={{ textAlign: "center", py: 4 }}>Loading FAQs...</CustomText>
          ) : faqs.length === 0 ? (
            <CustomText sx={{ textAlign: "center", py: 4 }}>No FAQs available</CustomText>
          ) : (
            faqs.map((item, i) => {
              const question = item.question || item.q || "";
              const answer = item.answer || item.a || "";
              return (
                <Box key={i} sx={{
                  background: "#FFEDE8", p: { xs: 1, sm: 1, md: 1, lg: 2 }, borderRadius: 3, mb: 2, cursor: "pointer",
                  "&:hover": { background: "#FFE1D8" }
                }} onClick={() => setOpen(open === i ? null : i)}>

                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <CustomText sx={{ fontWeight: 600, fontSize: { xs: 14, sm: 15, md: 15, lg: 16 } }}>{question}</CustomText>
                    <IconButton>{open === i ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}</IconButton>
                  </Box>

                  {open === i && (
                    <CustomText sx={{ mt: 1.5, fontSize: { xs: 13, sm: 14, md: 14.5, lg: 15 }, color: "#444", lineHeight: 1.6 }}>
                      {answer}
                    </CustomText>
                  )}
                </Box>
              );
            })
          )}
        </Box>
      </Container>

      {/* Toast Notification */}
      <CustomToast
        open={toast.open}
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
        severity={toast.severity}
        loading={toast.loading}
      />

    </Box>
  );
};
