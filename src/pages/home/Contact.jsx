import { Box, Container, Typography, Grid, Button, Divider, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@mui/icons-material";

import blogHero from "../../assets/blog.png";
import visitors from "../../assets/e347211cb5caeeec77eae32383b9d19dd9459edf.jpg";
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

  const faqs = [
    { q: "Can I place an Order Online?", a: "Yes! you can place an order through our website for pickup or delivery." },
    { q: "What payment methods do you accept?", a: "Online, UPI, Card & Cash depending on store." },
    { q: "Can I customize my cake or bakery item?", a: "Yes! Custom cakes & bakery products available." },
    { q: "Can I return my order?", a: "Return policy varies depending on item condition." },
    { q: "What are your store hours?", a: "Timings vary per location. Check nearest store." },
  ];

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>

      {/* HERO */}
      <Box
        ref={sectionRefs.header}
        sx={{
          height: { xs: 240, sm: 300, md: 420 },
          backgroundImage: `url(${blogHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 2, sm: 3, md: 6 },
          opacity: visibleSections.header ? 1 : 0,
          transform: visibleSections.header ? "translateY(0)" : "translateY(20px)",
          transition: "0.7s ease",
        }}
      >
        <Typography sx={{ fontSize: { xs: 28, sm: 38, md: 56 }, fontWeight: 700, color: "#fff" }}>
          CONTACT US
        </Typography>
        <Typography sx={{ color: "#fff", fontSize: { xs: 12, md: 14 }, mt: 1 }}>
          Home • Contact Us
        </Typography>
      </Box>

      {/* STORES & CONTACT */}
      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 7 } }}>
        <Typography align="center" sx={{ fontWeight: 700, color: "#FF9472", mb: 4, fontSize: { xs: 22, md: 28 } }}>
          SOMETHING ABOUT US
        </Typography>

        <Box sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          border: "1px solid #FFB5A1",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4
        }}>

          {/* LEFT STORES */}
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 700, mb: 2 }}>VISIT OUR STORES</Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {["Lucknow", "Kanpur", "Delhi", "Noida", "Ghazibad"].map((city, i) => (
                <Box key={i} sx={{ textAlign: "center" }}>
                  <img src={visitors} style={{ width: 70, height: 70, borderRadius: 10 }} />
                  <Typography sx={{ fontSize: 12, fontWeight: 600, mt: 1 }}>{city}</Typography>
                </Box>
              ))}
            </Box>

            <Button variant="contained"
              sx={{ mt: 3, background: "#FF9472", textTransform: "none", fontWeight: 600, "&:hover": { background: "#F2709C" } }}>
              See more about
            </Button>
          </Box>

          {/* DIVIDER */}
          <Divider sx={{ display: { xs: "none", md: "block" }, borderColor: "#FFB5A1", borderWidth: 1 }} orientation="vertical" flexItem />

          {/* RIGHT CONTACT DETAILS */}
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 700, mb: 2 }}>CONTACT DETAILS</Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography>📞 +91 7309032618  |  0522-4113205</Typography>
              <Typography>✉️ Info@Mrbrownbakery.Com</Typography>
              <Typography>📍 B-35, Sector-P, Aliganj, Lucknow, UP 220024</Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* GET IN TOUCH */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography sx={{ fontSize: { xs: 32, md: 60 }, fontWeight: 700, opacity: .15 }}>Get in touch</Typography>
        <Typography sx={{ fontSize: { xs: 14, md: 18 }, maxWidth: 600, mx: "auto", mt: -3, color: "#555" }}>
          Reach out, and let’s create a universe of possibilities together!
        </Typography>
      </Box>

      <Container maxWidth="xl">
        <Box sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          background: "linear-gradient(90deg,#FF9472,#FF8F6B)",
          borderRadius: 4,
          p: { xs: 3, md: 5 },
          gap: 4
        }}>

          {/* FORM */}
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: { xs: 18, md: 24 }, fontWeight: 700, color: "#fff" }}>Let’s connect constellations</Typography>
            <Typography sx={{ fontSize: { xs: 13, md: 15 }, color: "#fff", mb: 3, mt: 1 }}>
              Let’s align our constellations! Reach out and let the magic of collaboration shine.
            </Typography>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}> <input placeholder="Last Name" style={inputStyle} /> </Grid>
              <Grid size={{ xs: 12, md: 6 }}> <input placeholder="First Name" style={inputStyle} /> </Grid>
              <Grid size={{ xs: 12 }}> <input placeholder="Email" style={inputStyle} /> </Grid>
              <Grid size={{ xs: 12 }}> <input placeholder="Phone Number" style={inputStyle} /> </Grid>
              <Grid size={{ xs: 12 }}> <textarea rows={4} placeholder="Message" style={inputStyle} /> </Grid>
            </Grid>

            <Box sx={{ mt: 3, textAlign: { xs: "center", md: "left" } }}>
              <Button variant="contained"
                sx={{ background: "#fff", color: "#000", fontWeight: 600, width: { xs: "100%", md: "40%" } }}>
                Send
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
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography align="center" sx={{ fontWeight: 700, fontSize: { xs: 24, md: 32 }, mb: 4 }}>
          Frequently Asked Questions
        </Typography>

        {faqs.map((item, i) => (
          <Box key={i} sx={{
            background: "#FFEDE8", p: { xs: 2.5, md: 3 }, borderRadius: 3, mb: 2, cursor: "pointer",
            "&:hover": { background: "#FFE1D8" }
          }} onClick={() => setOpen(open === i ? null : i)}>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontWeight: 600, fontSize: { xs: 14, md: 16 } }}>{item.q}</Typography>
              <IconButton>{open === i ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}</IconButton>
            </Box>

            {open === i && (
              <Typography sx={{ mt: 1.5, fontSize: { xs: 13, md: 15 }, color: "#444", lineHeight: 1.6 }}>
                {item.a}
              </Typography>
            )}
          </Box>
        ))}
      </Container>

    </Box>
  );
};
