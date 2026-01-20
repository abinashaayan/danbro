import React, { useEffect, useRef, useState } from "react";
import { Box, Container,  Grid, Button, Divider } from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useLocation } from "react-router-dom";
import createevents1 from "../../assets/createevents1.png";

export default function BlogDetails() {
  const navigate = useNavigate();
  const { state } = useLocation(); // blog data passed from View More
  const [visibleSections, setVisibleSections] = useState({});

  const sectionRefs = {
    header: useRef(null),
    categories: useRef(null),
    title: useRef(null),
    image: useRef(null),
    content: useRef(null),
    comment: useRef(null),
    specialties: useRef(null),
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
      title: "MAY 03, 2025",
      description: "Handmade with Love – Discover Danbro Cookies by Mr Brown Bakery",
      image: createevents1,
    },
    {
      title: "MAY 03, 2025",
      description: "Handmade with Love – Discover Danbro Cookies by Mr Brown Bakery",
      image: createevents1,
    },
    {
      title: "MAY 03, 2025",
      description: "Handmade with Love – Discover Danbro Cookies by Mr Brown Bakery",
      image: createevents1,
    },
    {
      title: "MAY 03, 2025",
      description: "Handmade with Love – Discover Danbro Cookies by Mr Brown Bakery",
      image: createevents1,
    },
  ];

  const categories = ["Category 1", "Category 2", "Category 3", "Category 4"];

  const blog = state;
  // fallback if no data (optional)
  if (!blog) return <CustomText>No Blog Data Found</CustomText>;

  return (
    <Box sx={{ backgroundColor: "#fff", pb: { xs: 8, md: 10 }, p: { xs: 1.25, md: 0 } }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 2 }, px: { xs: 2, md: 3 } }}>
        <Box ref={sectionRefs.header}>
          <Button
            onClick={() => navigate(-1)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#000",
              textTransform: "none",
              fontSize: { xs: 13, md: 14 },
              transition: "all 0.3s ease",
              "&:hover": { color: "#ED7D2B", backgroundColor: "transparent" },
            }}
          >
            <ArrowBackIosIcon sx={{ fontSize: { xs: 14, md: 16 } }} /> Back
          </Button>
        </Box>
      </Container>

      {/* Category Navigation */}
      <Container maxWidth="xl" ref={sectionRefs.categories} sx={{ px: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            opacity: visibleSections.categories ? 1 : 0,
            transform: visibleSections.categories ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <Divider sx={{ borderBottomWidth: 2, borderColor: "black" }} />
          <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 0 }}>
            {categories.map((cat, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: { xs: 1, sm: 1.5, md: 2 },
                  borderRight: index !== categories.length - 1 ? "2px solid black" : "none",
                  my: 1,
                }}
              >
                <Button
                  disableRipple
                  sx={{
                    fontSize: { xs: 11, sm: 12, md: 14 },
                    color: "#000",
                    borderRadius: 0,
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#ED7D2B",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {cat}
                </Button>
              </Box>
            ))}
          </Box>
          <Divider sx={{ mb: { xs: 3, md: 4 }, borderBottomWidth: 2, borderColor: "black" }} />
        </Box>
      </Container>

      {/* BLOG TITLE + Meta */}
      <Container maxWidth="xl" sx={{ textAlign: "center", mb: { xs: 3, md: 4 }, px: { xs: 2, md: 3 } }} ref={sectionRefs.title}>
        <Box
          sx={{
            opacity: visibleSections.title ? 1 : 0,
            transform: visibleSections.title ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <CustomText
            sx={{
              fontSize: { xs: 20, sm: 24, md: 26 },
              fontWeight: 700,
              mb: 1,
              px: { xs: 2, sm: 0 },
            }}
          >
            {blog.title}
          </CustomText>

          <CustomText
            sx={{
              fontSize: { xs: 10, sm: 11, md: 11 },
              color: "#8a8a8a",
              textTransform: "uppercase",
            }}
          >
            {blog.date} • POSTED BY {blog.author}
          </CustomText>
        </Box>
      </Container>

      {/* Blog Image */}
      <Container maxWidth="xl" ref={sectionRefs.image} sx={{ px: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            width: "100%",
            height: { xs: 220, sm: 300, md: 420 },
            borderRadius: { xs: 2, md: 3 },
            overflow: "hidden",
            mb: { xs: 3, md: 4 },
            opacity: visibleSections.image ? 1 : 0,
            transform: visibleSections.image ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <img
            src={blog.image}
            alt="Blog"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      </Container>

      {/* Blog Content */}
      <Container maxWidth="xl" sx={{ lineHeight: 1.8, color: "#444", px: { xs: 2, md: 3 } }} ref={sectionRefs.content}>
        <Box
          sx={{
            opacity: visibleSections.content ? 1 : 0,
            transform: visibleSections.content ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <CustomText sx={{ fontSize: { xs: 14, sm: 15, md: 15 }, mb: 3 }}>
            {blog.description}
          </CustomText>

          <CustomText
            sx={{
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: 16, sm: 17, md: 18 },
            }}
          >
            The Charm of Handmade Goodness
          </CustomText>

          <CustomText sx={{ fontSize: { xs: 14, sm: 15, md: 15 }, mb: 2 }}>
            In a world full of factory-made snacks...
          </CustomText>

          <Box
            component="ul"
            sx={{
              marginLeft: { xs: 2.5, sm: 2.5 },
              marginBottom: 2.5,
              lineHeight: "1.7",
              fontSize: { xs: 14, sm: 15 },
            }}
          >
            <li>Made from Scratch – No shortcuts, no preservatives...</li>
            <li>Perfectly Baked – Crunchy on the outside, soft inside...</li>
            <li>Variety to Crave – From classic choco-chip to...</li>
          </Box>

          <CustomText
            sx={{
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: 16, sm: 17, md: 18 },
            }}
          >
            Great for Gifting or Snacking
          </CustomText>
          <CustomText sx={{ fontSize: { xs: 14, sm: 15, md: 15 }, mb: 2 }}>
            Whether you're filling a jar at home, packing a lunchbox, or choosing a thoughtful gift, Danbro handmade cookies are a perfect pick. They're ideal for:
          </CustomText>

          <Box
            component="ul"
            sx={{
              marginLeft: { xs: 2.5, sm: 2.5 },
              marginBottom: 2.5,
              fontSize: { xs: 14, sm: 15 },
            }}
          >
            <li>Festive Hampers</li>
            <li>Office snack boxes</li>
            <li>Tea-time treats</li>
            <li>Little everyday indulgences</li>
          </Box>

          <CustomText
            sx={{
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: 16, sm: 17, md: 18 },
            }}
          >
            Available Fresh In-Store & Online
          </CustomText>
          <CustomText sx={{ fontSize: { xs: 14, sm: 15, md: 15 }, mb: 2 }}>
            Danbro cookies are available at all Mr Brown Bakery outlets and through our online store. Packaged with care, they stay fresh, crisp, and ready to enjoy anytime.
          </CustomText>

          <CustomText
            sx={{
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: 16, sm: 17, md: 18 },
            }}
          >
            Every Bite Tells a Story
          </CustomText>
          <CustomText sx={{ fontSize: { xs: 14, sm: 15, md: 15 }, mb: 2 }}>
            With Danbro handmade cookies, you're not just eating a snack — you're tasting tradition, craftsmanship, and a whole lot of love.
          </CustomText>

          {/* Divider */}
          <Box sx={{ height: 1, width: "100%", background: "#ddd", my: { xs: 3, md: 4 } }} />
        </Box>

        {/* Comment Section */}
        <Box ref={sectionRefs.comment}>
          <Box
            sx={{
              opacity: visibleSections.comment ? 1 : 0,
              transform: visibleSections.comment ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            <CustomText
              sx={{
                fontSize: { xs: 16, sm: 17, md: 18 },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Leave a Reply
            </CustomText>
            <CustomText
              sx={{
                fontSize: { xs: 11, sm: 12, md: 12 },
                mb: 2,
                color: "#777",
              }}
            >
              Your email address will not be published. Required fields are marked *
            </CustomText>

            <textarea
              placeholder="Comment*"
              style={{
                width: "100%",
                minHeight: 120,
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "14px",
                marginBottom: "15px",
                fontFamily: "inherit",
                resize: "vertical",
              }}
            />

            <Grid container spacing={{ xs: 1.5, sm: 2 }}>
              {["Name*", "Email*", "Website"].map((p, i) => (
                <Grid size={{ xs: 12, sm: 6 }} key={i}>
                  <input
                    placeholder={p}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      fontSize: "14px",
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                my: 2,
                flexWrap: "wrap",
              }}
            >
              <input type="checkbox" />
              <CustomText sx={{ fontSize: { xs: 11, sm: 12, md: 12 } }}>
                Save my name, email, and website for next time.
              </CustomText>
            </Box>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ED7D2B",
                textTransform: "none",
                fontWeight: 600,
                px: { xs: 3, md: 4 },
                py: { xs: 1, md: 1.2 },
                fontSize: { xs: 13, sm: 14, md: 15 },
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#d66a1f",
                  transform: "scale(1.05)",
                },
              }}
            >
              Post Comment
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Related Posts Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 0 }, px: { xs: 2, md: 3 } }}>
        <Box ref={sectionRefs.specialties}>
          <Box
            sx={{
              opacity: visibleSections.specialties ? 1 : 0,
              transform: visibleSections.specialties ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            <CustomText
              variant="h2"
              sx={{
                fontSize: { xs: 20, sm: 24, md: 30 },
                fontWeight: 700,
                color: "#2c2c2c",
                mb: { xs: 3, md: 4 },
              }}
            >
              Our Catering Specialties
            </CustomText>

          <Grid container spacing={{ xs: 2, sm: 2, md: 2 }}>
            {specialties.map((item, index) => (
              <Grid size={{ xs: 6, sm: 6, md: 3 }} key={index}>
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

                  <CustomText
                    sx={{
                      fontSize: { xs: 12, sm: 13, md: 13 },
                      color: "#666",
                      mt: 0.5,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.description}
                  </CustomText>
                  <CustomText
                    sx={{
                      fontSize: { xs: 12, sm: 13, md: 13 },
                      color: "#666",
                      mt: 0.5,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.title}
                  </CustomText>
                </Box>
              </Grid>
            ))}
          </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
