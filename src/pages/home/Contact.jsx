import { Box, Container, Grid, Button, Divider, IconButton, Link } from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import { useEffect, useRef, useState } from "react";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@mui/icons-material";

import blogHero from "../../assets/blog.png";
import visitors from "../../assets/egpqen3o_danbro_625x300_04_March_20.webp";
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
          height: { xs: 240, sm: 300, md: 350, lg: 420 },
          backgroundImage: `url(${blogHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          opacity: visibleSections.header ? 1 : 0,
          transform: visibleSections.header ? "translateY(0)" : "translateY(20px)",
          transition: "0.7s ease",
        }}
      >
        <CustomText sx={{ fontSize: { xs: 28, sm: 38, md: 42, lg: 56 }, fontWeight: 700, color: "#fff" }}>
          CONTACT US
        </CustomText>
        <CustomText sx={{ color: "#fff", fontSize: { xs: 12, sm: 13, md: 13, lg: 14 }, mt: 1 }}>
          Home • Contact Us
        </CustomText>
      </Box>

      {/* STORES & CONTACT */}
      <Container sx={{ py: 4, px: { xs: 2, md: 3, lg: 2 } }}>
        <CustomText align="center" sx={{ fontWeight: 700, color: "#FF9472", mb: { xs: 4, sm: 4, md: 4, lg: 4 }, fontSize: { xs: 22, sm: 24, md: 26, lg: 28 }, px: { xs: 0, sm: 0, md: 2, lg: 0 } }}>
          SOMETHING ABOUT US
        </CustomText>

        <Box sx={{
          p: { xs: 3, sm: 3.5, md: 4.5, lg: 5 },
          borderRadius: 4,
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          border: "1px solid #FFB5A1",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, sm: 4, md: 3.5, lg: 4 },
          px: { xs: 0, sm: 0, md: 2, lg: 0 },
        }}>

          {/* LEFT STORES */}
          <Box sx={{ flex: 1, px: { xs: 2, md: 3, lg: 2 } }}>
            <CustomText sx={{ fontSize: { xs: 18, sm: 20, md: 21, lg: 22 }, fontWeight: 700, mb: 2 }}>VISIT OUR STORES</CustomText>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 2, sm: 2, md: 1.5, lg: 2 } }}>
              {["Lucknow", "Kanpur", "Delhi", "Noida", "Ghazibad"].map((city, i) => (
                <Box key={i} sx={{ textAlign: "center" }}>
                  <img src={visitors} style={{ width: 70, height: 70, borderRadius: 10 }} />
                  <CustomText sx={{ fontSize: { xs: 12, sm: 12, md: 12, lg: 12 }, fontWeight: 600, mt: 1 }}>{city}</CustomText>
                </Box>
              ))}
            </Box>

            <Button variant="contained"
              sx={{ mt: 3, background: "#FF9472", textTransform: "none", fontWeight: 600, fontSize: { xs: 14, sm: 14, md: 14, lg: 16 }, "&:hover": { background: "#F2709C" } }}>
              See more about
            </Button>
          </Box>

          {/* DIVIDER */}
          <Divider sx={{ display: { xs: "none", md: "block" }, borderColor: "#FFB5A1", borderWidth: 1 }} orientation="vertical" flexItem />

          {/* RIGHT CONTACT DETAILS */}
          <Box sx={{ flex: 1, px: { xs: 0, sm: 0, md: 1, lg: 0 } }}>
            <CustomText sx={{ fontSize: { xs: 18, sm: 20, md: 21, lg: 22 }, fontWeight: 700, mb: 2 }}>CONTACT DETAILS</CustomText>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <CustomText sx={{ fontSize: { xs: 14, sm: 14, md: 14, lg: 16 } }}>
                📞{" "}
                <Link href="tel:+917309032618" sx={{ color: "inherit", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>+91 7309032618</Link>
                {"  |  "}
                <Link href="tel:05224113205" sx={{ color: "inherit", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>0522-4113205</Link>
              </CustomText>
              <CustomText sx={{ fontSize: { xs: 14, sm: 14, md: 14, lg: 16 } }}>
                ✉️{" "}
                <Link href="mailto:Info@Mrbrownbakery.Com" sx={{ color: "inherit", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>Info@Mrbrownbakery.Com</Link>
              </CustomText>
              <CustomText sx={{ fontSize: { xs: 14, sm: 14, md: 14, lg: 16 } }}>
                📍{" "}
                <Link
                  href="https://www.google.com/maps/search/?api=1&query=B-35,+Sector-P,+Aliganj,+Lucknow,+UP+220024"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "inherit", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                >
                  B-35, Sector-P, Aliganj, Lucknow, UP 220024
                </Link>
              </CustomText>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* GET IN TOUCH */}
      <Box sx={{ textAlign: "center", mb: 3, px: { xs: 2, sm: 3, md: 4, lg: 4 } }}>
        <CustomText sx={{ fontSize: { xs: 32, sm: 40, md: 48, lg: 60 }, fontWeight: 700, opacity: .15 }}>Get in touch</CustomText>
        <CustomText sx={{ fontSize: { xs: 14, sm: 16, md: 17, lg: 18 }, maxWidth: { xs: "100%", sm: "90%", md: 600 }, mx: "auto", mt: -3, color: "#555" }}>
          Reach out, and let's create a universe of possibilities together!
        </CustomText>
      </Box>

      <Container  sx={{ py: 4, px: { xs: 2, md: 3, lg: 2 } }}>
        <Box sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          background: "linear-gradient(90deg,#FF9472,#FF8F6B)",
          borderRadius: 4,
          p: { xs: 3, sm: 3.5, md: 4, lg: 5 },
          gap: { xs: 4, sm: 4, md: 3.5, lg: 4 }
        }}>

          {/* FORM */}
          <Box sx={{ flex: 1 }}>
            <CustomText sx={{ fontSize: { xs: 18, sm: 20, md: 22, lg: 24 }, fontWeight: 700, color: "#fff" }}>Let's connect constellations</CustomText>
            <CustomText sx={{ fontSize: { xs: 13, sm: 14, md: 14.5, lg: 15 }, color: "#fff", mb: 3, mt: 1 }}>
              Let's align our constellations! Reach out and let the magic of collaboration shine.
            </CustomText>

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
      <Container sx={{ py: 4, px: { xs: 2, md: 3, lg: 2 }, mb: 5 }}>
        <CustomText align="center" sx={{ fontWeight: 700, fontSize: { xs: 24, sm: 26, md: 28, lg: 32 }, mb: { xs: 4, sm: 4, md: 4, lg: 4 }, px: { xs: 0, sm: 0, md: 1, lg: 0 } }}>
          Frequently Asked Questions
        </CustomText>

        <Box sx={{ px: { xs: 0, sm: 0, md: 1, lg: 0 } }}>
          {faqs.map((item, i) => (
            <Box key={i} sx={{
              background: "#FFEDE8", p: { xs: 1, sm: 1, md: 1, lg: 2 }, borderRadius: 3, mb: 2, cursor: "pointer",
              "&:hover": { background: "#FFE1D8" }
            }} onClick={() => setOpen(open === i ? null : i)}>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <CustomText sx={{ fontWeight: 600, fontSize: { xs: 14, sm: 15, md: 15, lg: 16 } }}>{item.q}</CustomText>
                <IconButton>{open === i ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}</IconButton>
              </Box>

              {open === i && (
                <CustomText sx={{ mt: 1.5, fontSize: { xs: 13, sm: 14, md: 14.5, lg: 15 }, color: "#444", lineHeight: 1.6 }}>
                  {item.a}
                </CustomText>
              )}
            </Box>
          ))}
        </Box>
      </Container>

    </Box>
  );
};
