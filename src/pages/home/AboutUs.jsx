import { Box, Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import logo from "../../assets/logo.png";
import { useEffect, useRef, useState } from "react";
import blogHero from "../../assets/blog.png";
import planning from "../../assets/2f1c127d9f6293a74bd052f2c516c77a6713fa7f.jpg";

export const AboutUs = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const [active, setActive] = useState(0);

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
      if (sectionRefs[key].current) observer.observe(sectionRefs[key].current);
      return observer;
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const cardData = [
    {
      title: "OUR MISSION",
      description:
        "Mr. Brown is committed to provide The Best And Innovative Range Of Delicious Bakery Products With Outstanding Quality & Service To Keep Our Customers Delighted.",
    },
    {
      title: "OUR VISION",
      description:
        "To Exceed The Expectations Of Our Guest And To Provide Five Star Products At Affordable Prices And Reach Out To All Our Patrons At As Many Locations As Possible",
    },
    {
      title: "QUALITY POLICY",
      description:
        "To provide Products and services of The Highest Possible Standards, To Satisfy Customer Needs and Expectations Of Quality, Reliability And Service.",
    },
  ];

  const stats = [
    { number: "500", label: "VENDORS ASSOCIATED", gold: true },
    { number: "05", label: "OFFICES" },
    { number: "500", label: "TEAM MEMBERS" },
    { number: "300", label: "PRODUCTS" },
    { number: "2006", label: "FOUNDING YEAR", gold: true },
    { number: "200000", label: "HAPPY CUSTOMERS", gold: true },
  ];

  const videos = [
    "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
  ];

  return (
    <Box sx={{ width: "100%", overflowX: "hidden", pb: { xs: 4, md: 0 }, p: { xs: 1.25, md: 0 } }}>
      <Box
        ref={sectionRefs.header}
        sx={{
          height: { xs: 250, sm: 300, md: 400 },
          backgroundImage: `url(${blogHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 3, sm: 3, md: 6 },
          py: { xs: 2, md: 0 },
          opacity: visibleSections.header ? 1 : 0,
          transform: visibleSections.header ? "translateY(0)" : "translateY(30px)",
          transition: "0.8s",
        }}
      >
        <Typography sx={{ fontSize: { xs: 28, sm: 36, md: 56 }, fontWeight: 700, color: "#fff" }}>
          ABOUT US
        </Typography>
        <Typography sx={{ color: "#fff", fontSize: { xs: 12, sm: 14 }, mt: 1 }}>
          Home • About Us
        </Typography>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 0 }, px: { xs: 3, sm: 3, md: 4 } }}>
        <Typography align="center" sx={{ fontWeight: 700, color: "#FF9472", mb: { xs: 4, md: 5 }, fontSize: { xs: 20, sm: 24, md: 32 }, px: { xs: 0, md: 0 } }}>
          SOME WORDS ABOUT US
        </Typography>

        <Grid container spacing={{ xs: 3, md: 3 }}>
          {cardData.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                onClick={() => setActive(index)}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  cursor: "pointer",
                  background: active === index ? "linear-gradient(135deg,#FF9472,#C77DFF)" : "#fff",
                  color: active === index ? "#fff" : "#2c2c2c",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-8px)" },
                }}
              >
                <CardContent sx={{ p: { xs: 3.5, md: 4 } }}>
                  <Typography sx={{ fontWeight: 700, mb: 2, fontSize: { xs: 18, md: 22 }, color: active === index ? "#fff" : "#FF9472" }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: 14, md: 16 }, lineHeight: 1.8 }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 3, md: 4 }, py: { xs: 2, md: 0 } }}>
        <Box
          sx={{
            p: { xs: 3.5, sm: 3, md: 5 },
            borderRadius: 4,
            boxShadow: "0 4px 30px rgba(0,0,0,0.10)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${logo})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: { xs: "90%", md: "40%" },
              backgroundPosition: "center",
              opacity: 0.25,
              pointerEvents: "none",
            },
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: { xs: 26, md: 34 }, mb: 1 }}>
            Brand : Danbro
          </Typography>
          <Typography sx={{ color: "#797979", mb: 3 }}>
            Mr. Brown Bakery And Food Products Pvt Ltd
          </Typography>

          <Typography sx={{ color: "#797979", fontSize: { xs: 14, md: 16 }, lineHeight: 2 }}>
            A gourmet family-owned pastry shop in Lucknow now expanded to Kanpur & Delhi.
            <b> We blend Asian traditions with modern flavors </b> creating premium desserts,
            mousse cakes, artisan tarts and <b> baked mithai innovations.</b>
          </Typography>

          <Typography sx={{ color: "#797979", fontSize: { xs: 14, md: 16 }, mt: 2, lineHeight: 2 }}>
            We craft luxury <b>wedding dessert creations</b> using fresh fruits like strawberry & apple.
            Also offering <b>petit fours, cookies, chocolates, éclairs & signature pastry delicacies.</b>
          </Typography>
        </Box>
      </Container>

      {/*================ COUNT + RIGHT IMAGE =================*/}

      <Box sx={{ py: { xs: 5, md: 0 }, mt: { xs: 4, md: 5 } }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, md: 3 } }}>
          <Grid container spacing={{ xs: 4, md: 4 }} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: { xs: 2, md: 2 }, fontSize: { xs: 20, sm: 24, md: 32 }, px: { xs: 0, md: 0 } }}>
                We Work Through Every Aspect At The Planning
              </Typography>

              <Typography sx={{ color: "#666", mb: { xs: 3.5, md: 4 }, lineHeight: 2, fontSize: { xs: 14, md: 16 }, px: { xs: 0, md: 0 } }}>
                Blending Asian traditions with modern flavors, Danbro crafts exquisite, world-class
                bakery delights, from wedding cakes to innovative baked mithai, ensuring every celebration
                is unforgettable.
              </Typography>

              <Button
                sx={{
                  backgroundColor: "#FF9472",
                  color: "#fff",
                  textTransform: "none",
                  px: { xs: 3.5, md: 4 },
                  py: { xs: 1.2, md: 1.3 },
                  fontSize: { xs: 13, md: 15 },
                  fontWeight: 600,
                  borderRadius: 2,
                  whiteSpace: { xs: "normal", sm: "nowrap" },
                  ml: { xs: 0, md: 0 },
                  "&:hover": { backgroundColor: "#F2709C" }
                }}
              >
                WE DO IT FOR YOU WITH LOVE
              </Button>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{ position: "relative", mt: { xs: 5, md: 0 }, px: { xs: 0, md: 0 } }}>
              <Box
                sx={{
                  width: "100%",
                  height: { xs: 300, sm: 350, md: 420 },
                  background: "#FFA72B",
                  borderRadius: { xs: "20px", md: "30px" },
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={planning}
                  alt="chef"
                  sx={{
                    width: { xs: "100%", md: "400px" },
                    height: { xs: "100%", md: "400px" },
                    maxWidth: { xs: "100%", md: "400px" },
                    objectFit: "cover",
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: "-50px", md: "-70px" },
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: { xs: "90%", md: "500px" },
                  maxWidth: "90%",
                  display: { xs: "none", md: "flex" },
                  justifyContent: "space-between",
                  gap: 2,
                  zIndex: 5,
                }}
              >
                {[
                  { label: "FOUNDING YEAR", num: "2006" },
                  { label: "HAPPY CUSTOMERS", num: "200000" },
                ].map((i, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      flex: 1,
                      background: "#fff",
                      p: { xs: 1.5, md: 2 },
                      textAlign: "center",
                      borderRadius: "18px",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                    }}
                  >
                    <Typography sx={{ fontSize: { xs: 11, md: 13 }, fontWeight: 600 }}>
                      {i.label}
                    </Typography>
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: 22, md: 28 } }}>
                      {i.num}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* LEFT 4 VERTICAL CARDS */}
              <Box
                sx={{
                  position: "absolute",
                  right: { xs: "auto", md: "90%" },
                  left: { xs: "auto", md: "auto" },
                  bottom: { xs: "auto", md: "25%" },
                  top: { xs: "auto", md: "auto" },
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                  gap: 2.2,
                  zIndex: 5,
                  opacity: 0.8,
                }}
              >
                {[
                  { label: "VENDORS ASSOCIATED", num: "500" },
                  { label: "OFFICES", num: "05" },
                  { label: "TEAM MEMBERS", num: "500" },
                  { label: "PRODUCTS", num: "300" },
                ].map((i, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      background: "#fff",
                      width: "200px",
                      p: 2,
                      textAlign: "center",
                      borderRadius: "18px",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                    }}
                  >
                    <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                      {i.label}
                    </Typography>
                    <Typography sx={{ fontWeight: 800, fontSize: 22 }}>
                      {i.num}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Mobile Stats Grid */}
              <Box
                sx={{
                  display: { xs: "grid", md: "none" },
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2.5,
                  mt: 4,
                  px: { xs: 0, md: 0 },
                }}
              >
                {[
                  { label: "FOUNDING YEAR", num: "2006" },
                  { label: "HAPPY CUSTOMERS", num: "200000" },
                  { label: "VENDORS ASSOCIATED", num: "500" },
                  { label: "OFFICES", num: "05" },
                  { label: "TEAM MEMBERS", num: "500" },
                  { label: "PRODUCTS", num: "300" },
                ].map((i, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      background: "#fff",
                      p: 2,
                      textAlign: "center",
                      borderRadius: "18px",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                    }}
                  >
                    <Typography sx={{ fontSize: { xs: 10, sm: 11 }, fontWeight: 600, mb: 0.5 }}>
                      {i.label}
                    </Typography>
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: 20, sm: 24 } }}>
                      {i.num}
                    </Typography>
                  </Box>
                ))}
              </Box>

            </Grid>

          </Grid>
        </Container>
      </Box>


      {/*================ VIDEO SECTION (DYNAMIC) =================*/}

      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 0 }, pb: { xs: 10, md: 0 }, px: { xs: 3, sm: 3, md: 4 } }}>
        <Grid container spacing={{ xs: 3, md: 3 }}>
          {videos.map((v, i) => (
            <Grid size={{ xs: 12, md: 6 }} key={i}>
              <Box sx={{
                height: { xs: 200, sm: 250, md: 350 },
                backgroundColor: "#000",
                borderRadius: { xs: 2, md: 3 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.02)" },
              }}>
                <PlayArrowIcon sx={{ fontSize: { xs: 40, md: 60 }, color: "#fff" }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
