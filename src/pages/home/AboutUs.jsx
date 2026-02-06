import { Box, Container, Grid, Card, CardContent, Button, Avatar } from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import logo from "../../assets/logo.png";
import { useEffect, useRef, useState } from "react";
import blogHero from "../../assets/blog.png";
import planning from "../../assets/2f1c127d9f6293a74bd052f2c516c77a6713fa7f.jpg";
import { YouTubeVideosSection } from "../../components/home/YouTubeVideosSection";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import founderImage from "../../assets/founderImage.jpeg";
import { StaticContentLayout } from "../../components/comman/StaticContentLayout";
import { useStaticContent } from "../../hooks/useStaticContent";

export const AboutUs = () => {
  const { data, loading } = useStaticContent("aboutUs");
  const [visibleSections, setVisibleSections] = useState({});
  const [active, setActive] = useState(0);
  const [founderImageError, setFounderImageError] = useState(false);

  const hasDynamicContent = data?.content?.trim() || (data?.sections && data.sections.length > 0);
  if (loading && !data) {
    return (
      <StaticContentLayout
        pageTitle="About Us"
        loading={true}
      />
    );
  }
  if (hasDynamicContent) {
    return (
      <Box sx={{ pt: { xs: 0, md: 13 } }}>
        <StaticContentLayout
          pageTitle={data?.title ?? "About Us"}
          updatedAt={data?.updatedAt}
          sections={data?.sections}
          content={data?.content}
          loading={false}
        />
      </Box>
    );
  }

  const sectionRefs = {
    header: useRef(null),
    hero: useRef(null),
    whyChoose: useRef(null),
    specialties: useRef(null),
    contact: useRef(null),
    founder: useRef(null),
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


  return (
    <Box sx={{ width: "100%", overflowX: "hidden", pb: { xs: 4, md: 0 }, p: { xs: 1.25, md: 0 }, pt: { xs: 0, md: 13 } }}>
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
        <CustomText sx={{ fontSize: { xs: 28, sm: 36, md: 56 }, fontWeight: 700, color: "#fff" }}>
          ABOUT US
        </CustomText>
        <CustomText sx={{ color: "#fff", fontSize: { xs: 12, sm: 14 }, mt: 1 }}>
          Home • About Us
        </CustomText>
      </Box>

      <Container sx={{ py: { xs: 2, md: 4 }, px: { xs: 3, sm: 3, md: 4 } }}>
        <CustomText align="center" sx={{ fontWeight: 700, color: "#FF9472", mb: { xs: 4, md: 5 }, fontSize: { xs: 20, sm: 24, md: 32 }, px: { xs: 0, md: 0 } }}>
          SOME WORDS ABOUT US
        </CustomText>

        <Grid container spacing={{ xs: 3, md: 3 }}>
          {cardData?.map((item, index) => (
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
                  <CustomText sx={{ fontWeight: 700, mb: 2, fontSize: { xs: 18, md: 22 }, color: active === index ? "#fff" : "#FF9472" }}>
                    {item.title}
                  </CustomText>
                  <CustomText sx={{ fontSize: { xs: 14, md: 16 }, lineHeight: 1.8 }}>
                    {item.description}
                  </CustomText>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ px: { xs: 3, sm: 3, md: 4 }, py: { xs: 2, md: 0 } }}>
        <Box
          sx={{
            p: { xs: 3.5, sm: 3, md: 5 },
            borderRadius: 4,
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
          <CustomText sx={{ fontWeight: 700, fontSize: { xs: 26, md: 34 }, mb: 1 }}>
            Brand : Danbro
          </CustomText>
          <CustomText sx={{ color: "#797979", mb: 3 }}>
            Mr. Brown Bakery And Food Products Pvt Ltd
          </CustomText>

          <CustomText sx={{ color: "#797979", fontSize: { xs: 14, md: 16 }, lineHeight: 2 }}>
            A gourmet family-owned pastry shop in Lucknow now expanded to Kanpur & Delhi.
            <b> We blend Asian traditions with modern flavors </b> creating premium desserts,
            mousse cakes, artisan tarts and <b> baked mithai innovations.</b>
          </CustomText>

          <CustomText sx={{ color: "#797979", fontSize: { xs: 14, md: 16 }, mt: 2, lineHeight: 2 }}>
            We craft luxury <b>wedding dessert creations</b> using fresh fruits like strawberry & apple.
            Also offering <b>petit fours, cookies, chocolates, éclairs & signature pastry delicacies.</b>
          </CustomText>
        </Box>
      </Container>

      {/*================ FOUNDER SECTION =================*/}
      <Box
        ref={sectionRefs.founder}
        sx={{
          py: { xs: 2, md: 6 },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-30%",
            right: "-5%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            filter: "blur(80px)",
            animation: "float 6s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
              "50%": { transform: "translateY(-20px) translateX(-10px)" },
            },
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-20%",
            left: "-5%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(95,41,48,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "floatReverse 8s ease-in-out infinite",
            "@keyframes floatReverse": {
              "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
              "50%": { transform: "translateY(15px) translateX(10px)" },
            },
          },
        }}
      >
        <Container sx={{ px: { xs: 3, sm: 3, md: 4 }, position: "relative", zIndex: 1 }}>
          {/* Header Section */}
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 2, md: 4 },
              opacity: visibleSections.founder ? 1 : 0,
              transform: visibleSections.founder ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: 70, md: 90 },
                height: { xs: 70, md: 90 },
                borderRadius: "50%",
                bgcolor: "rgba(255,148,114,0.1)",
                mb: 3,
                position: "relative",
                animation: visibleSections.founder ? "pulse 2s ease-in-out infinite" : "none",
                "@keyframes pulse": {
                  "0%, 100%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.05)" },
                },
              }}
            >
              <BusinessIcon sx={{ fontSize: { xs: 35, md: 45 }, color: "#FF9472" }} />
            </Box>
            <CustomText
              sx={{
                fontSize: { xs: 11, md: 13 },
                fontWeight: 700,
                color: "#FF9472",
                textTransform: "uppercase",
                letterSpacing: 3,
              }}
            >
              Our Founder
            </CustomText>
            <CustomText
              sx={{
                fontSize: { xs: 32, sm: 42, md: 56 },
                fontWeight: 800,
                color: "var(--themeColor)",
                fontFamily: "'Inter', sans-serif",
                background: "linear-gradient(135deg, var(--themeColor) 0%, #7a2d3a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.2,
              }}
            >
              Meet The Visionary
            </CustomText>
          </Box>

          {/* Main Content Grid */}
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            {/* Founder Image */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  opacity: visibleSections.founder ? 1 : 0,
                  transform: visibleSections.founder ? "translateX(0)" : "translateX(-50px)",
                  transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: -12,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #FF9472, #FFB5A1, #FF9472, #FF9472)",
                      backgroundSize: "300% 300%",
                      animation: "rotateGradient 4s linear infinite",
                      "@keyframes rotateGradient": {
                        "0%": { backgroundPosition: "0% 50%" },
                        "100%": { backgroundPosition: "300% 50%" },
                      },
                      zIndex: 0,
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      inset: -6,
                      borderRadius: "50%",
                      bgcolor: "#fff",
                      zIndex: 1,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 220, md: 300 },
                      height: { xs: 220, md: 300 },
                      borderRadius: "50%",
                      border: "6px solid #fff",
                      boxShadow: "0 25px 70px rgba(255,148,114,0.35)",
                      position: "relative",
                      zIndex: 2,
                      overflow: "hidden",
                      bgcolor: "rgba(255,148,114,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.5s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 30px 80px rgba(255,148,114,0.45)",
                      },
                    }}
                  >
                    {founderImageError ? (
                      <PersonIcon
                        sx={{
                          fontSize: { xs: 110, md: 150 },
                          color: "rgba(255,148,114,0.4)",
                        }}
                      />
                    ) : (
                      <Box
                        component="img"
                        src={founderImage}
                        alt="Vikash Malik - Founder & CEO"
                        onError={() => setFounderImageError(true)}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Founder Info */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: { xs: 3, md: 5 },
                  p: { xs: 4, md: 5 },
                  boxShadow: "0 15px 50px rgba(0,0,0,0.1)",
                  position: "relative",
                  overflow: "hidden",
                  opacity: visibleSections.founder ? 1 : 0,
                  transform: visibleSections.founder ? "translateX(0)" : "translateX(50px)",
                  transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "8px",
                    height: "100%",
                    background: "linear-gradient(180deg, #FF9472 0%, #FFB5A1 50%, #FF9472 100%)",
                    backgroundSize: "100% 200%",
                    animation: "gradientFlow 3s ease infinite",
                    "@keyframes gradientFlow": {
                      "0%, 100%": { backgroundPosition: "0% 0%" },
                      "50%": { backgroundPosition: "0% 100%" },
                    },
                  },
                  "&:hover": {
                    boxShadow: "0 20px 60px rgba(255,148,114,0.2)",
                    transform: "translateY(-5px)",
                  },
                }}
              >
                {/* Name and Title */}
                <Box sx={{ mb: 4 }}>
                  <CustomText
                    sx={{
                      fontSize: { xs: 28, md: 38 },
                      fontWeight: 800,
                      color: "var(--themeColor)",
                      fontFamily: "'Inter', sans-serif",
                      mb: 1,
                      lineHeight: 1.2,
                    }}
                  >
                    Vikash Malik
                  </CustomText>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        bgcolor: "#FF9472",
                        animation: "blink 2s ease-in-out infinite",
                        "@keyframes blink": {
                          "0%, 100%": { opacity: 1 },
                          "50%": { opacity: 0.3 },
                        },
                      }}
                    />
                    <CustomText
                      sx={{
                        fontSize: { xs: 15, md: 18 },
                        color: "#FF9472",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                      }}
                    >
                      Founder & CEO
                    </CustomText>
                  </Box>
                </Box>

                {/* Content */}
                <Box sx={{ pl: { xs: 0, md: 2 } }}>
                  <CustomText
                    sx={{
                      fontSize: { xs: 15, md: 17 },
                      color: "#444",
                      lineHeight: 1.85,
                      mb: 3,
                      fontWeight: 400,
                    }}
                  >
                    Vikash Malik is the visionary founder and CEO of Danbro, a leading bakery brand that has revolutionized the art of baking in India. With an unwavering passion for creating exceptional culinary experiences, Vikash has transformed Danbro from a small family-owned pastry shop into a renowned brand with multiple locations across Lucknow, Kanpur, and Delhi.
                  </CustomText>

                  <CustomText
                    sx={{
                      fontSize: { xs: 15, md: 17 },
                      color: "#444",
                      lineHeight: 1.85,
                      mb: 3,
                      fontWeight: 400,
                    }}
                  >
                    Under Vikash's leadership, Danbro has become synonymous with innovation, quality, and excellence. His vision of blending traditional Asian flavors with modern baking techniques has resulted in unique creations like baked mithai innovations, premium mousse cakes, and artisan tarts that have delighted thousands of customers.
                  </CustomText>

                  <CustomText
                    sx={{
                      fontSize: { xs: 15, md: 17 },
                      color: "#444",
                      lineHeight: 1.85,
                      fontWeight: 400,
                    }}
                  >
                    With a commitment to using only the freshest ingredients and maintaining the highest standards of quality, Vikash has built Danbro into a trusted name for weddings, corporate events, and everyday celebrations. His dedication to customer satisfaction and continuous innovation continues to drive Danbro's success and growth.
                  </CustomText>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/*================ COUNT + RIGHT IMAGE =================*/}

      <Box sx={{ py: { xs: 5, md: 0 }, mt: { xs: 4, md: 5 } }}>
        <Container sx={{ px: { xs: 3, md: 3 } }}>
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} sx={{ pr: { xs: 0, md: 2 } }}>
              <CustomText variant="h3" sx={{ fontWeight: 700, mb: { xs: 2, md: 2 }, fontSize: { xs: 20, sm: 24, md: 32 }, px: { xs: 0, md: 0 } }}>
                We Work Through Every Aspect At The Planning
              </CustomText>

              <CustomText sx={{ color: "#666", mb: { xs: 3.5, md: 4 }, lineHeight: 2, fontSize: { xs: 14, md: 16 }, px: { xs: 0, md: 0 } }}>
                Blending Asian traditions with modern flavors, Danbro crafts exquisite, world-class
                bakery delights, from wedding cakes to innovative baked mithai, ensuring every celebration
                is unforgettable.
              </CustomText>

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

            <Grid size={{ xs: 12, md: 6 }} sx={{ position: "relative", mt: { xs: 5, md: 0 }, pl: { xs: 0, md: 2 }, px: { xs: 0, md: 0 } }}>
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
                    <CustomText sx={{ fontSize: { xs: 11, md: 13 }, fontWeight: 600 }}>
                      {i?.label}
                    </CustomText>
                    <CustomText sx={{ fontWeight: 800, fontSize: { xs: 22, md: 28 } }}>
                      {i?.num}
                    </CustomText>
                  </Box>
                ))}
              </Box>

              {/* LEFT 4 VERTICAL CARDS - kept inside right column with gap from left section */}
              <Box
                sx={{
                  position: "absolute",
                  right: { xs: "auto", md: "calc(100% - 180px)" },
                  left: { xs: "auto", md: "auto" },
                  bottom: { xs: "auto", md: "25%" },
                  top: { xs: "auto", md: "auto" },
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                  gap: 2.2,
                  zIndex: 5,
                  opacity: 0.9,
                }}
              >
                {[
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
                    <CustomText sx={{ fontSize: 12, fontWeight: 600 }}>
                      {i?.label}
                    </CustomText>
                    <CustomText sx={{ fontWeight: 800, fontSize: 22 }}>
                      {i?.num}
                    </CustomText>
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
                    <CustomText sx={{ fontSize: { xs: 10, sm: 11 }, fontWeight: 600, mb: 0.5 }}>
                      {i.label}
                    </CustomText>
                    <CustomText sx={{ fontWeight: 800, fontSize: { xs: 20, sm: 24 } }}>
                      {i.num}
                    </CustomText>
                  </Box>
                ))}
              </Box>

            </Grid>

          </Grid>
        </Container>
      </Box>


      {/*================ YouTube Videos Section =================*/}
      <Box sx={{ py: { xs: 5, md: 8 }, mb: 3 }}>
        <YouTubeVideosSection />
      </Box>
    </Box>
  );
};
