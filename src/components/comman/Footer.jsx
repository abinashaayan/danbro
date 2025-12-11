import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useRef } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import SendIcon from "@mui/icons-material/Send";

import logo from "../../assets/logo.png";
import postImg from "../../assets/cakeimg.png";
import visa from "../../assets/payments.png";
import { Link, useNavigate } from "react-router-dom";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#FBEFE8",
  paddingTop: theme.spacing(6),
  position: "relative",
  marginTop: "auto",
}));

export const Footer = () => {
  const bannerRef = useRef(null);
  const footerRef = useRef(null);
  const navigate = useNavigate();

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      navigate(path);
    }, 100);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
          }
        });
      },
      { threshold: 0.1 }
    );

    if (bannerRef.current) observer.observe(bannerRef.current);
    if (footerRef.current) observer.observe(footerRef.current);

    return () => {
      if (bannerRef.current) observer.unobserve(bannerRef.current);
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  const knowMoreLinks = [
    { label: "Offers and Schemes", link: "/offers" },
    { label: "Press and Media", link: "/media" },
    { label: "Events & Catering", link: "/events" },
    { label: "Blogs", link: "/blog" },
    { label: "Career at Danbro", link: "/career" },
    { label: "Danbro Institute", link: "/institute" },
  ];

  const ourStories = [
    { label: "About Us", link: "/about-us" },
    { label: "Lucknow Stores", link: "/store" },
    { label: "Kanpur Stores", link: "/events" },
    { label: "Ghaziabad Stores", link: "/blogs" },
    { label: "Noida Stores", link: "/career" },
    { label: "Delhi Stores", link: "/career-danbro" },
  ];

  const knowMore = [
    { label: "Privacy Policies", link: "/privacy-policies" },
    { label: "Shipping Policies", link: "/shipping-policies" },
    { label: "Refund & Returns Policy", link: "/refund-returns-policy" },
    { label: "Terms and Conditions", link: "/terms-and-conditions" },
    { label: "Corporate Queries", link: "/corporate-queries" },
    { label: "Contact Us", link: "/contact" },
  ];

  return (
    <Box>
      <FooterContainer
        ref={footerRef}
        sx={{
          minHeight: { xs: "400px", md: "500px" },
        }}
      >
        <Container maxWidth="xl">
          <Box
            ref={bannerRef}
            sx={{
              background: "linear-gradient(90deg, #FF9472 0%, #F2709C 100%)",
              width: { xs: "95%", sm: "92%", md: "90%" },
              mx: "auto",
              p: { xs: 2.5, sm: 3, md: 4 },
              borderRadius: "20px",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: { xs: 2, sm: 3 },
              position: "absolute",
              bottom: { xs: "4%", md: "95%" },
              left: "50%",
              transform: "translateX(-50%)",
              opacity: 0,
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
              boxShadow: "0 8px 30px rgba(255,148,114,0.3)",
              zIndex: 10,
              "&:hover": {
                boxShadow: "0 12px 40px rgba(255,148,114,0.4)",
                transform: "translateX(-50%) translateY(-5px)",
              },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: { xs: 24, sm: 28, md: 36 },
                  fontWeight: 800,
                  color: "#fff",
                  mb: { xs: 1.5, md: 2 },
                  animation: "fadeInUp 0.8s ease-out",
                  "@keyframes fadeInUp": {
                    "0%": { opacity: 0, transform: "translateY(20px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                Have a good cake Today.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 1.5, sm: 2, md: 4 },
                  flexWrap: "wrap",
                }}
              >
                {["Fresh Baked", "Premium Quality", "Fast Delivery"].map((text, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
                      "@keyframes fadeInUp": {
                        "0%": { opacity: 0, transform: "translateY(20px)" },
                        "100%": { opacity: 1, transform: "translateY(0)" },
                      },
                    }}
                  >
                    <CheckCircleIcon
                      sx={{
                        color: "#fff",
                        fontSize: { xs: 18, md: 20 },
                        animation: "pulse 2s ease-in-out infinite",
                        "@keyframes pulse": {
                          "0%, 100%": { transform: "scale(1)" },
                          "50%": { transform: "scale(1.1)" },
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        color: "#fff",
                        fontSize: { xs: 14, sm: 15, md: 16 },
                        fontWeight: 500,
                      }}
                    >
                      {text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                background: "#fff",
                px: { xs: 3, sm: 4, md: 5 },
                py: { xs: 1, sm: 1.2, md: 1.5 },
                borderRadius: "40px",
                fontSize: { xs: 16, sm: 18, md: 20 },
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                  background: "#f8f8f8",
                },
                whiteSpace: "nowrap",
              }}
            >
              Contact
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: { xs: "column", sm: "row" }, justifyContent: 'space-between', alignItems: { xs: "flex-start", sm: "center" }, gap: { xs: 2, sm: 0 }, mb: { xs: 8, sm: 10, md: 12 } }}>
            <Box
              component="img"
              src={logo}
              alt="logo"
              sx={{
                height: { xs: 60, sm: 75, md: 90 },
                width: "auto",
                animation: "fadeInLeft 0.8s ease-out",
                "@keyframes fadeInLeft": {
                  "0%": { opacity: 0, transform: "translateX(-30px)" },
                  "100%": { opacity: 1, transform: "translateX(0)" },
                },
              }}
            />
            <Box
              sx={{
                animation: "fadeInRight 0.8s ease-out",
                "@keyframes fadeInRight": {
                  "0%": { opacity: 0, transform: "translateX(30px)" },
                  "100%": { opacity: 1, transform: "translateX(0)" },
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  fontSize: { xs: 16, md: 18 },
                }}
              >
                Let's do it!
              </Typography>
              <Box sx={{ display: "flex", gap: { xs: 1.5, md: 2 } }}>
                {[
                  { icon: FacebookIcon, color: "#1877F2" },
                  { icon: InstagramIcon, color: "#E4405F" },
                  { icon: TwitterIcon, color: "#1DA1F2" },
                  { icon: SendIcon, color: "#0088cc" },
                ].map(({ icon: Icon, color }, index) => (
                  <IconButton
                    key={index}
                    sx={{
                      color: color,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px) scale(1.1)",
                        color: color,
                      },
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                      "@keyframes fadeInUp": {
                        "0%": { opacity: 0, transform: "translateY(20px)" },
                        "100%": { opacity: 1, transform: "translateY(0)" },
                      },
                    }}
                  >
                    <Icon />
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Box>
          <Grid
            container
            spacing={{ xs: 4, md: 6 }}
            sx={{ my: { xs: 3, md: 5 } }}
          >
            <Grid item xs={12} sm={6} md={2}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  width: { xs: "100%", md: 250 },
                  fontSize: { xs: 13, md: 14 },
                  lineHeight: 1.6,
                }}
              >
                Blending Asian traditions with modern flavors, Danbro crafts
                exquisite, world-class bakery delights, from wedding cakes to
                innovative baked mithai, ensuring every celebration is
                unforgettable.
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: 14, md: 16 },
                }}
              >
                OUR STORES
              </Typography>
              {ourStories.map((item, index) => (
                <Link 
                  key={index}
                  to={item.link} 
                  className="text-decoration-none"
                  onClick={(e) => handleLinkClick(e, item.link)}
                >
                  <Typography
                    sx={{
                      mb: 1,
                      color: "#555",
                      fontSize: { xs: 13, md: 14 },
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "var(--themeColor)",
                        transform: "translateX(5px)",
                      },
                      animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`,
                      "@keyframes fadeInUp": {
                        "0%": { opacity: 0, transform: "translateY(10px)" },
                        "100%": { opacity: 1, transform: "translateY(0)" },
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                </Link>
              ))}
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: 14, md: 16 },
                }}
              >
                USEFUL LINKS
              </Typography>
              {knowMore?.map((item, index) => (
                <Link 
                  key={index}
                  to={item.link} 
                  className="text-decoration-none"
                  onClick={(e) => handleLinkClick(e, item.link)}
                >
                  <Typography
                    sx={{
                      mb: 1,
                      color: "#555",
                      fontSize: { xs: 13, md: 14 },
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "var(--themeColor)",
                        transform: "translateX(5px)",
                      },
                      animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`,
                      "@keyframes fadeInUp": {
                        "0%": { opacity: 0, transform: "translateY(10px)" },
                        "100%": { opacity: 1, transform: "translateY(0)" },
                      },
                    }}
                  >
                    {item?.label}
                  </Typography>
                </Link>
              ))}
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: 14, md: 16 },
                }}
              >
                KNOW MORE
              </Typography>
              {knowMoreLinks.map((item, index) => (
                <Link 
                  key={index}
                  to={item.link} 
                  className="text-decoration-none"
                  onClick={(e) => handleLinkClick(e, item.link)}
                >
                  <Typography
                    sx={{
                      mb: 1,
                      color: "#555",
                      fontSize: { xs: 13, md: 14 },
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "var(--themeColor)",
                        transform: "translateX(5px)",
                      },
                      animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`,
                      "@keyframes fadeInUp": {
                        "0%": { opacity: 0, transform: "translateY(10px)" },
                        "100%": { opacity: 1, transform: "translateY(0)" },
                      },
                    }}
                  >
                    {item?.label}
                  </Typography>
                </Link>
              ))}
            </Grid>
            <Grid item xs={12} sm={6} md={3.4}>
              <Typography
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  fontSize: { xs: 14, md: 16 },
                }}
              >
                RECENT POSTS
              </Typography>

              {[1, 2].map((i, index) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    gap: 2,
                    mb: 2,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(5px)",
                    },
                    animation: `fadeInRight 0.6s ease-out ${index * 0.2}s both`,
                    "@keyframes fadeInRight": {
                      "0%": { opacity: 0, transform: "translateX(-20px)" },
                      "100%": { opacity: 1, transform: "translateX(0)" },
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={postImg}
                    sx={{
                      width: { xs: 60, md: 70 },
                      height: { xs: 60, md: 70 },
                      borderRadius: 2,
                      objectFit: "cover",
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontSize: { xs: 12, md: 14 },
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      Handmade with Love – Discover Danbro Cookies by Mr Brown
                      Bakery
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: { xs: 11, md: 12 },
                        color: "#777",
                      }}
                    >
                      May 3, 2025 — No Comments
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Grid>
          </Grid>

          <Box
            sx={{
              borderTop: "1px solid #ddd",
              mt: { xs: 4, md: 6 },
              pt: { xs: 2, md: 3 },
              pb: 2,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Typography
              sx={{
                color: "#444",
                fontSize: { xs: 12, md: 14 },
                textAlign: { xs: "left", sm: "left" },
              }}
            >
              Mr. Brown Bakery and Food Products Pvt Ltd | 2025 | All Rights
              Reserved
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={visa}
                alt="payment methods"
                sx={{
                  height: { xs: 30, md: 40 },
                  width: "auto",
                  filter: "grayscale(0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    filter: "grayscale(0)",
                    transform: "scale(1.1)",
                  },
                }}
              />
            </Box>
          </Box>
        </Container>
      </FooterContainer>
    </Box>
  );
};
