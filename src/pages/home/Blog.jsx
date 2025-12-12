import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Typography, Grid, Button, Divider } from "@mui/material";

// images – filhaal available images use kar liye,
// tum apne hisaab se change kar sakta hai
import blogHero from "../../assets/blog.png";
import createevents1 from "../../assets/createevents1.png";
import cateringEvents from "../../assets/createevents.png";
import { useNavigate } from "react-router-dom";

export const Blog = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = {
    hero: useRef(null),
    categories: useRef(null),
    blogs: useRef(null),
    sidebar: useRef(null),
    pagination: useRef(null),
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
  const categories = ["Category 1", "Category 2", "Category 3", "Category 4"];

  const navigate = useNavigate();

  const blogs = [
    {
      id: 1,
      category: "Cakes",
      title:
        "Handmade with Love – Discover Danbro Cookies by Mr Brown Bakery",
      author: "Danbro by Mr Brown Bakery",
      date: "May 03, 2025",
      image: createevents1,
      description:
        "There’s something timeless and comforting about a cookie—the kind that crumbles just right, fills the room with warmth, and tastes like it was made in grandma’s kitchen. That’s exactly what you get with Danbro’s Handmade Cookies, a delightful creation by Mr Brown Bakery.",
    },
    {
      id: 2,
      category: "Cakes",
      title:
        "Experience the Magic of Danbro Cakes – A Delicious Creation by Mr Brown Bakery",
      author: "Danbro by Mr Brown Bakery",
      date: "May 03, 2025",
      image: cateringEvents,
      description:
        "When it comes to desserts that spark joy and make moments memorable, few things compare to a beautifully baked cake. At Mr Brown Bakery, we’ve taken cake-making to the next level with our premium line: Danbro Cakes – a name now synonymous with indulgence, elegance, and irresistible flavour.",
    },
    {
      id: 3,
      category: "Cake",
      title:
        "Discover the Best Baklawa by Danbro – A Sweet Masterpiece by Mr Brown Bakery",
      author: "Danbro by Mr Brown Bakery",
      date: "May 03, 2025",
      image: createevents1,
      description:
        "When it comes to indulgent desserts that blend tradition with perfection, baklawa tops the list. And if you’re on the hunt for the best baklawa around, look no further than Danbro’s Baklawa by Mr Brown Bakery — a bite of golden bliss that melts in your mouth and lingers in your memory.",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "hidden",
        backgroundColor: "#fff",
        pb: { xs: 8, md: 10 },
        p: { xs: 1.25, md: 0 },
      }}
    >
      {/* ---------------- HERO HEADER ---------------- */}
      <Box
        ref={sectionRefs.hero}
        sx={{
          height: { xs: 250, sm: 300, md: 380 },
          backgroundImage: `url(${blogHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 2, sm: 4, md: 8 },
          opacity: visibleSections.hero ? 1 : 0,
          transform: visibleSections.hero ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 28, sm: 36, md: 52 },
            fontWeight: 700,
            color: "#fff",
            mb: 1,
          }}
        >
          Our Blogs
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 12, sm: 14 },
            color: "#f2f2f2",
            opacity: 0.9,
            letterSpacing: 0.5,
          }}
        >
          Home • Our Blogs
        </Typography>
      </Box>


      {/* ---------------- BLOG CONTENT WRAPPER ---------------- */}
      <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 3 } }}>
        <Box ref={sectionRefs.categories}>
          <Box
            sx={{
              opacity: visibleSections.categories ? 1 : 0,
              transform: visibleSections.categories ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            <Divider sx={{ borderBottomWidth: 2, borderColor: "black" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 0,
              }}
            >
              {categories.map((cat, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: { xs: 1, sm: 1.5, md: 2 },
                    borderRight:
                      index !== categories.length - 1 ? "2px solid black" : "none",
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
        </Box>

        <Grid container spacing={{ xs: 2, sm: 3, md: 3 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            {blogs.map((blog) => (
              <Box
                key={blog.id}
                sx={{
                  display: "flex",
                  gap: 3,
                  mb: 6,
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                }}
              >
                {/* Image */}
                <Box
                  sx={{
                    width: { xs: "100%", sm: "45%" },
                    height: { xs: 200, sm: 220, md: 240 },
                    borderRadius: 3,
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      mb: 1,
                      color: "#9a9a9a",
                    }}
                  >
                    {blog.category}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: { xs: 18, md: 22 },
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: "#111",
                    }}
                  >
                    {blog.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 11,
                      color: "#8a8a8a",
                      mb: 1,
                    }}
                  >
                    {blog.date} • Posted by {blog.author}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#555",
                      lineHeight: 1.7,
                      mb: 2.5,
                    }}
                  >
                    {blog.description.length > 200
                      ? blog.description.slice(0, 200) + "..."
                      : blog.description}
                  </Typography>

                  <Button
                    variant="outlined"
                    onClick={() => navigate("/blog-details", { state: blog })}
                    sx={{
                      borderRadius: 2,
                      fontSize: 13,
                      px: 4,
                      textTransform: "none",
                      borderColor: "#111",
                      color: "#111",
                      "&:hover": {
                        backgroundColor: "#111",
                        color: "#fff",
                        borderColor: "#111",
                      },
                    }}
                  >
                    View More
                  </Button>
                </Box>
              </Box>
            ))}
          </Grid>


          <Grid size={{ xs: 12, md: 4 }} ref={sectionRefs.sidebar}>
            <Box
              sx={{
                opacity: visibleSections.sidebar ? 1 : 0,
                transform: visibleSections.sidebar ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
              }}
            >
              <Box sx={{ mb: { xs: 3, md: 4 } }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    fontSize: { xs: 14, sm: 15 },
                  }}
                >
                  Search
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <input
                    placeholder="Search..."
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      outline: "none",
                      fontSize: "14px",
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#ED7D2B",
                      textTransform: "none",
                      fontSize: { xs: 12, sm: 13 },
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#d66a1f",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    Search
                  </Button>
                </Box>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: 14, sm: 15 },
                  }}
                >
                  Recent Posts
                </Typography>

                {blogs.slice(0, 3).map((b, index) => (
                  <Box
                    key={b.id}
                    sx={{
                      display: "flex",
                      gap: { xs: 1.5, sm: 2 },
                      mb: 2,
                      alignItems: "center",
                      animation: visibleSections.sidebar
                        ? `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                        : "none",
                      "@keyframes fadeInUp": {
                        "0%": { opacity: 0, transform: "translateY(20px)" },
                        "100%": { opacity: 1, transform: "translateY(0)" },
                      },
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateX(5px)",
                      },
                    }}
                  >
                    <img
                      src={b.image}
                      alt={b.title}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 6,
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontSize: { xs: 12, sm: 13 },
                          fontWeight: 600,
                          mb: 0.5,
                          lineHeight: 1.4,
                        }}
                      >
                        {b.title.length > 45
                          ? b.title.slice(0, 45) + "..."
                          : b.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: 10, sm: 11 },
                          color: "#777",
                        }}
                      >
                        {b.date}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>


        <Box
          ref={sectionRefs.pagination}
          sx={{
            display: "flex",
            gap: { xs: 0.5, sm: 1 },
            justifyContent: "center",
            mt: { xs: 3, md: 4 },
            flexWrap: "wrap",
            opacity: visibleSections.pagination ? 1 : 0,
            transform: visibleSections.pagination ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          {[1, 2, 3, 4, 5, 10, 20, 30].map((n, i) => (
            <Button
              key={i}
              size="small"
              sx={{
                minWidth: { xs: 30, sm: 35 },
                p: { xs: 0.4, sm: 0.5 },
                backgroundColor: i === 0 ? "#000" : "#fff",
                color: i === 0 ? "#fff" : "#000",
                borderRadius: 0,
                border: "1px solid #e0e0e0",
                fontSize: { xs: 12, sm: 13 },
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#000",
                  color: "#fff",
                  transform: "scale(1.1)",
                },
              }}
            >
              {n}
            </Button>
          ))}
          <Button
            size="small"
            sx={{
              textTransform: "none",
              fontSize: { xs: 12, sm: 13 },
              color: "#000",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#ED7D2B",
                transform: "translateX(3px)",
              },
            }}
          >
            Last »
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
