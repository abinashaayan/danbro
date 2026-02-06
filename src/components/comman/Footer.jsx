import { Box, Container, Grid, IconButton } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import makeinindia from "../../assets/makeinindia.png";
import Maskgroup from "../../assets/Maskgroup.png";
import logo from "../../assets/logo.png";
import postImg from "../../assets/cakeimg.png";
import { getAllBlogs } from "../../utils/apiService";
import visaLogo from "../../assets/visa-logo.svg";
import mastercardLogo from "../../assets/mastercard-logo.svg";
import paypalLogo from "../../assets/paypal-logo.svg";
import amexLogo from "../../assets/amex-logo.svg";
import razorpayLogo from "../../assets/razorpay-logo.svg";
import { Link, useNavigate } from "react-router-dom";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#FBEFE8",
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(4),
  position: "relative",
  marginTop: "auto",
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.between('md', 'lg')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const formatBlogDate = (dateStr) => {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch (_) {
    return "";
  }
};

export const Footer = () => {
  const bannerRef = useRef(null);
  const footerRef = useRef(null);
  const navigate = useNavigate();
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    let cancelled = false;
    getAllBlogs()
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data) ? data.slice(0, 2) : [];
        setRecentBlogs(list);
      })
      .catch(() => {
        if (!cancelled) setRecentBlogs([]);
      });
    return () => { cancelled = true; };
  }, []);

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(path);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
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
    { label: "About Us", link: "/about-us" },
    { label: "Career at Danbro", link: "/career" },
    { label: "Danbro Institute", link: "/institute" },
  ];

  const ourStories = [
    { label: "Lucknow Stores", link: "/store" },
    { label: "Kanpur Stores", link: "/store" },
    { label: "Ghaziabad Stores", link: "/store" },
    { label: "Noida Stores", link: "/store" },
    { label: "Delhi Stores", link: "/store" },
  ];

  const knowMore = [
    { label: "Privacy Policies", link: "/privacy-policy" },
    { label: "Shipping Policies", link: "/shipping-policies" },
    { label: "Refund & Returns Policy", link: "/refund-returns-policy" },
    { label: "Terms and Conditions", link: "/terms-conditions" },
    { label: "Corporate Queries", link: "/corporate-queries" },
    { label: "Contact Us", link: "/contact" },
  ];

  return (
    <Box>
      <FooterContainer
        ref={footerRef}
        sx={{
          minHeight: { xs: "400px", sm: "450px", md: "480px", lg: "500px" },
          px: { xs: 2, md: 3, lg: 2 },
        }}
      >
        <Container
          maxWidth="false"
          sx={{
            px: { xs: 2, sm: 3, md: 4, lg: 4 },
            width: "100%",
            maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: "1536px" },
          }}
        >
          <Box
            ref={bannerRef}
            sx={{
              background: "linear-gradient(90deg, #FF9472 0%, #F2709C 100%)",
              width: { xs: "95%", sm: "92%", md: "92%", lg: "90%" },
              mx: "auto",
              p: { xs: 1, sm: 1.5, md: 2, lg: 3 },
              borderRadius: "20px",
              display: { xs: "none", md: "flex" },
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
              position: "absolute",
              bottom: { xs: "2%", md: "85%", lg: "88%" },
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
              <CustomText
                sx={{
                  fontSize: { xs: 24, sm: 28, md: 32, lg: 36 },
                  fontWeight: 800,
                  color: "#fff",
                  animation: "fadeInUp 0.8s ease-out",
                  "@keyframes fadeInUp": {
                    "0%": { opacity: 0, transform: "translateY(20px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                Have a good cake Today.
              </CustomText>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 1.5, sm: 2, md: 3, lg: 4 },
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
                        fontSize: { xs: 18, sm: 19, md: 19, lg: 20 },
                        animation: "pulse 2s ease-in-out infinite",
                        "@keyframes pulse": {
                          "0%, 100%": { transform: "scale(1)" },
                          "50%": { transform: "scale(1.1)" },
                        },
                      }}
                    />
                    <CustomText
                      sx={{
                        color: "#fff",
                        fontSize: { xs: 14, sm: 15, md: 15, lg: 16 },
                        fontWeight: 500,
                      }}
                    >
                      {text}
                    </CustomText>
                  </Box>
                ))}
              </Box>
            </Box>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  background: "#fff",
                  px: { xs: 3, sm: 4, md: 4, lg: 5 },
                  py: { xs: 1, sm: 1.2, md: 1.3, lg: 1.5 },
                  borderRadius: "40px",
                  fontSize: { xs: 16, sm: 18, md: 18, lg: 20 },
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
            </Link>
          </Box>
          <Box sx={{ mt: { xs: 6, sm: 8, md: 10, lg: 10 }, display: 'flex', flexDirection: { xs: "column", sm: "row" }, justifyContent: { xs: "flex-start", sm: "space-between", md: "space-between" }, alignItems: { xs: "flex-start", sm: "center" }, gap: { xs: 2, sm: 2, md: 2, lg: 0 }, mb: 4, px: { xs: 1, sm: 1, md: 1, lg: 0 } }}>
            <Box
              component="img"
              src={logo}
              alt="logo"
              sx={{
                height: { xs: 60, sm: 70, md: 80, lg: 90 },
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
              <CustomText
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  fontSize: { xs: 16, sm: 17, md: 17, lg: 18 },
                }}
              >
                Let's do it!
              </CustomText>
              <Box sx={{ display: "flex", gap: { xs: 1.5, sm: 1.5, md: 1.5, lg: 2 } }}>
                {[
                  {
                    icon: FacebookIcon,
                    color: "#1877F2",
                    url: "https://www.facebook.com/mrbrownbakery"
                  },
                  {
                    icon: InstagramIcon,
                    color: "#E4405F",
                    url: "https://www.instagram.com/danbrobymrbrown/"
                  },
                  {
                    icon: YouTubeIcon,
                    color: "#FF0000",
                    url: "https://www.youtube.com/channel/UCW4Y_rfg2IscDvrrdiJhSWQ"
                  },
                ].map(({ icon: Icon, color, url }, index) => (
                  <IconButton
                    key={index}
                    onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      color: color,
                      width: { xs: 40, sm: 44, md: 46, lg: 48 },
                      height: { xs: 40, sm: 44, md: 46, lg: 48 },
                      borderRadius: "50%",
                      border: `2px solid ${color}`,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: color,
                        color: "#fff",
                        transform: "translateY(-8px) scale(1.15) rotate(5deg)",
                        boxShadow: `0 8px 20px ${color}80`,
                        borderColor: color,
                      },
                      "&:active": {
                        transform: "translateY(-4px) scale(1.05)",
                      },
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                      "@keyframes fadeInUp": {
                        "0%": { opacity: 0, transform: "translateY(20px)" },
                        "100%": { opacity: 1, transform: "translateY(0)" },
                      },
                    }}
                  >
                    <Icon sx={{ fontSize: { xs: 20, sm: 22, md: 22, lg: 24 } }} />
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Box>
          <Grid
            container
            spacing={{ xs: 4, sm: 4, md: 3, lg: 6 }}
            sx={{ my: { xs: 3, sm: 4, md: 4, lg: 5 }, px: { xs: 1, sm: 1, md: 1, lg: 0 } }}
          >
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <CustomText
                variant="body2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  width: { xs: "100%", sm: "100%", md: "100%", lg: 250 },
                  maxWidth: { md: "100%" },
                  fontSize: { xs: 13, sm: 13, md: 12, lg: 14 },
                  lineHeight: 1.6,
                }}
              >
                Blending Asian traditions with modern flavors, Danbro crafts
                exquisite, world-class bakery delights, from wedding cakes to
                innovative baked mithai, ensuring every celebration is
                unforgettable.
              </CustomText>
            </Grid>
            <Grid item xs={6} sm={3} md={2} lg={2}>
              <CustomText
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: 14, sm: 14, md: 13, lg: 16 },
                }}
              >
                OUR STORES
              </CustomText>
              {ourStories?.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="text-decoration-none"
                  style={{ textDecoration: "none" }}
                  onClick={(e) => handleLinkClick(e, item.link)}
                >
                  <CustomText
                    sx={{
                      mb: 1,
                      color: "#555",
                      fontSize: { xs: 13, sm: 13, md: 11.5, lg: 14 },
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
                  </CustomText>
                </Link>
              ))}
            </Grid>
            <Grid item xs={6} sm={3} md={2} lg={2}>
              <CustomText sx={{ fontWeight: 700, mb: 2, fontSize: { xs: 14, sm: 14, md: 13, lg: 16 }, }}>
                USEFUL LINKS
              </CustomText>
              {knowMore?.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="text-decoration-none"
                  style={{ textDecoration: "none" }}
                  onClick={(e) => handleLinkClick(e, item.link)}
                >
                  <CustomText
                    sx={{
                      mb: 1,
                      color: "#555",
                      fontSize: { xs: 13, sm: 13, md: 11.5, lg: 14 },
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
                  </CustomText>
                </Link>
              ))}
            </Grid>
            <Grid item xs={6} sm={3} md={2} lg={2}>
              <CustomText
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: 14, sm: 14, md: 13, lg: 16 },
                }}
              >
                KNOW MORE
              </CustomText>
              {knowMoreLinks?.map((item, index) => (
                <Link
                  key={index}
                  to={item?.link}
                  className="text-decoration-none"
                  style={{ textDecoration: "none" }}
                  onClick={(e) => handleLinkClick(e, item.link)}
                >
                  <CustomText
                    sx={{
                      mb: 1,
                      color: "#555",
                      fontSize: { xs: 13, sm: 13, md: 11.5, lg: 14 },
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
                  </CustomText>
                </Link>
              ))}
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3.4}>
              <CustomText
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  fontSize: { xs: 14, sm: 14, md: 14, lg: 16 },
                }}
              >
                RECENT POSTS
              </CustomText>

              {recentBlogs?.map((blog, index) => {
                const id = blog?._id ?? blog?.id;
                const title = blog?.title ?? "";
                const image = blog?.image ?? blog?.thumbnail ?? blog?.featuredImage ?? postImg;
                const date = formatBlogDate(blog?.createdAt ?? blog?.date ?? blog?.updatedAt);
                return (
                  <Box
                    key={id ?? index}
                    onClick={() => id && navigate(`/blog-details/${id}`)}
                    sx={{
                      display: "flex",
                      gap: { xs: 1.5, sm: 1.5, md: 2 },
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
                      src={typeof image === "string" ? image : postImg}
                      alt=""
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = postImg;
                      }}
                      sx={{
                        width: { xs: 60, sm: 65, md: 55, lg: 70 },
                        height: { xs: 60, sm: 65, md: 55, lg: 70 },
                        borderRadius: 2,
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <CustomText
                        sx={{
                          fontSize: { xs: 12, sm: 12, md: 11.5, lg: 14 },
                          fontWeight: 600,
                          mb: 0.5,
                          wordBreak: "break-word",
                          lineHeight: 1.4,
                        }}
                      >
                        {title.length > 45 ? title.slice(0, 45) + "…" : title || "Blog post"}
                      </CustomText>

                      <CustomText
                        sx={{
                          fontSize: { xs: 11, sm: 11, md: 10, lg: 12 },
                          color: "#777",
                        }}
                      >
                        {date || "—"}
                      </CustomText>
                    </Box>
                  </Box>
                );
              })}
            </Grid>
          </Grid>

          <Box
            sx={{
              borderTop: "1px solid #ddd",
              mt: { xs: 4, sm: 4, md: 5, lg: 6 },
              pt: { xs: 2, sm: 2.5, md: 2.5, lg: 3 },
              pb: { xs: 3, sm: 2.5, md: 2.5, lg: 2 },
              px: { xs: 1, sm: 1, md: 1, lg: 0 },
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              justifyContent: { xs: "flex-start", sm: "flex-start", md: "space-between" },
              alignItems: { xs: "flex-start", sm: "flex-start", md: "center" },
              gap: { xs: 2, sm: 2, md: 1.5, lg: 0 },
              flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap", lg: "nowrap" },
            }}
          >
            <CustomText sx={{ color: "#000", fontSize: { xs: 12, sm: 12, md: 12, lg: 14 }, textAlign: { xs: "left", sm: "left", md: "left" }, flex: { md: "0 0 auto" }, whiteSpace: { md: "nowrap" } }}>
              Mr. Brown Bakery and Food Products Pvt Ltd | {new Date().getFullYear()} |
            </CustomText>
            <Box sx={{ display: "flex", gap: { xs: 1.5, sm: 2, md: 1.5, lg: 2 }, alignItems: "center", flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap" }, flex: { md: "0 0 auto" } }}>
              <CustomText sx={{ color: "#000", fontSize: { xs: 12, sm: 12, md: 12, lg: 14 }, textAlign: { xs: "left", sm: "left", md: "left" }, whiteSpace: "nowrap" }}>
                Design & Developed by
              </CustomText>
              <Box component="img" src={Maskgroup} alt="makeinindia" sx={{ height: { xs: 20, sm: 24, md: 24, lg: 32 }, width: "auto", flexShrink: 0 }} />
              <Box component="img" src={makeinindia} alt="makeinindia" sx={{ height: { xs: 20, sm: 24, md: 24, lg: 32 }, width: "auto", flexShrink: 0 }} />
            </Box>
            <Box sx={{ display: "flex", gap: { xs: 1, sm: 1.5, md: 2 }, alignItems: "center", flexWrap: "wrap", flex: { md: "0 0 auto" } }}>
              {[
                { src: visaLogo, alt: "Visa" },
                { src: mastercardLogo, alt: "Mastercard" },
                { src: paypalLogo, alt: "PayPal" },
                { src: amexLogo, alt: "American Express" },
                { src: razorpayLogo, alt: "Razorpay" },
              ].map((payment, index) => (
                <Box
                  key={index}
                  component="img"
                  src={payment.src}
                  alt={payment.alt}
                  sx={{
                    height: { xs: 25, sm: 30, md: 28, lg: 35 },
                    width: "auto",
                    filter: "grayscale(0.3)",
                    transition: "all 0.3s ease",
                    flexShrink: 0,
                    "&:hover": {
                      filter: "grayscale(0)",
                      transform: "scale(1.1)",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </FooterContainer>
    </Box>
  );
};
