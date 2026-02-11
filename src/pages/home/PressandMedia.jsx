import { Box, Container, Grid, Card, CardContent, Button } from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import cateringEvents from "../../assets/createevents.png";
import offers from "../../assets/a3d911fa3a066482b613b012d6ec9a5c875d515c.jpg";
import offers1 from "../../assets/09f1ee59e9d78cc206e6e867e1cda04c1887d8f8.webp";
import offers2 from "../../assets/b99b1bd9963e106a73131dcda2ec226e89d0989e.webp";
import offers3 from "../../assets/bc84d9cc0eb41c63b819361b1b34b0cd8a96b431.webp";
import { useState, useEffect, useRef } from "react";
import { Redeem } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const PressandMedia = () => {
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

  return (
    <Box sx={{ paddingTop: { md: "0px !important" } }}>
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
        <CustomText variant="h1" sx={{ fontSize: { xs: 28, sm: 36, md: 56 }, fontWeight: 700, color: "#fff", mb: 2, }}>
          PRESS AND MEDIA
        </CustomText>
      </Box>
      <Box sx={{ width: "100%", overflowX: "hidden", backgroundColor: "#fff", pb: { xs: 12, md: 0 }, p: { xs: 1.25, md: 2.5 }, mt: { md: 3.125 }, mb: { md: 12 } }}>
        {/* ================= PRESS & MEDIA UI SECTION ================= */}
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 0 } }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <CustomText sx={{ fontSize: { xs: 14, md: 15 }, color: "#777", mb: 2 }}>
              Official media resources from Mr Brown Bakery and Food Products Pvt Ltd
            </CustomText>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
              <Button variant="contained" sx={{ background: "#FFB5A1", color: "#fff", textTransform: "none", px: { xs: 3, md: 4 }, py: 1.2, fontWeight: 600, "&:hover": { background: "#d66a1f" } }}>
                Download Media Kit
              </Button>

              <Button variant="outlined"
                sx={{
                  border: "none",
                  background: "#F2F0E8",
                  textTransform: "none",
                  px: { xs: 3, md: 4 },
                  py: 1.2,
                  fontWeight: 600,
                  color: "#ED7D2B",
                  "&:hover": {
                    background: "#fff1e8",
                    border: "none"
                  }
                }}
              >
                Contact Media Team
              </Button>
            </Box>
          </Box>


          {/* About Danbro */}
          <CustomText sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 700, mb: 1 }}>About Danbro</CustomText>
          <CustomText sx={{ fontSize: { xs: 13, md: 15 }, color: "#555", maxWidth: "800px", lineHeight: 1.7, mb: 4 }}>
            Danbro is a premium bakery brand dedicated to crafting exceptional baked goods.
            We collaborate with journalists, bloggers, and influencers to share our story and products with a wider audience.
          </CustomText>


          {/* Media Inquiries Title */}
          <CustomText sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 700, mb: 1 }}>Media Inquiries</CustomText>
          <CustomText sx={{ fontSize: { xs: 13, md: 15 }, color: "#555", mb: 3 }}>
            For press releases, interviews, media coverage, or collaboration requests, please contact our media relations team:
          </CustomText>


          {/* Media Contact Cards */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[
              { icon: <LocationOnIcon sx={{ fontSize: 32, color: "#ED7D2B" }} />, title: "Corporate Office", text: "B-35, Sector-P, Aliganj, Lucknow 226024" },
              { icon: <EmailIcon sx={{ fontSize: 32, color: "#ED7D2B" }} />, title: "Email", text: "media@mrbrownbakery.com" },
              { icon: <PhoneIcon sx={{ fontSize: 32, color: "#ED7D2B" }} />, title: "Phone", text: "+91-7309032618" },
            ].map((item, i) => (
              <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <Box sx={{
                  p: 3, borderRadius: 3, background: "#fff",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-5px)" }
                }}>
                  {item.icon}
                  <CustomText sx={{ fontWeight: 700, mt: 1 }}>{item.title}</CustomText>
                  <CustomText sx={{ fontSize: { xs: 12, md: 14 }, color: "#666", mt: 0.5 }}>{item.text}</CustomText>
                </Box>
              </Grid>
            ))}
          </Grid>


          {/* What We Offer Section */}
          <CustomText sx={{ mt: 6, fontSize: { xs: 18, md: 22 }, fontWeight: 700 }}>What We Offer</CustomText>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {[
              { img: offers, title: "Press Releases" },
              { img: offers3, title: "Media Kits" },
              { img: offers1, title: "Brand Stories" },
              { img: offers2, title: "Influencer Collaborations" },
              { img: offers, title: "Event Coverage" },
            ].map((item, i) => (
              <Grid item size={{ xs: 6, sm: 4, md: 2.4 }} key={i}>
                <Box sx={{ textAlign: "center" }}>
                  <img src={item.img} style={{ width: "100%", height: 150, borderRadius: 10 }} />
                  <CustomText sx={{ mt: 1, fontWeight: 600, fontSize: 14 }}>{item.title}</CustomText>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Recent Highlights */}
          <CustomText sx={{ mt: 6, fontSize: { xs: 18, md: 22 }, fontWeight: 700, mb: 2 }}>
            Recent Highlights
          </CustomText>

          <Box sx={{
            background: "#FCFAF7",
            borderRadius: 3,
            p: 3,
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
          }}>
            {[
              { title: "Delhi Retail Expansion", text: "Expanded retail presence in Delhi" },
              { title: "Baked Mithai & Fusion Desserts Launch", text: "Launched innovative baked mithai and fusion desserts" },
              { title: "Festive Gourmet Cakes & Premium Bread Range", text: "Introduced festive gourmet cakes and premium bread range" }
            ].map((item, i) => (
              <Box key={i} sx={{ display: "flex", gap: 1.5, mb: 1.8 }}>
                <Box sx={{
                  backgroundColor: "#F2F0E8",
                  height: 40, width: 40, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#000"
                }}>
                  <Redeem sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <CustomText sx={{ fontWeight: 700, fontSize: 14 }}>{item.title}</CustomText>
                  <CustomText sx={{ fontSize: 12, color: "#666" }}>{item.text}</CustomText>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <CustomText sx={{ mt: 6, fontSize: { xs: 18, md: 22 }, fontWeight: 700, mb: 2 }}>
              For press inquiries, interviews, or collaborations, feel free to reach out.
            </CustomText>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <Button variant="outlined"
                sx={{
                  background: "#FFB5A1",
                  textTransform: "none",
                  px: { xs: 3, md: 4 },
                  py: 1.2,
                  fontWeight: 600,
                  color: "#000",
                  border: "none",
                  "&:hover": { background: "#fff1e8" }
                }}
              >
                Contact Us
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

