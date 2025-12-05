import { Box, Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export const AboutUs = () => {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 300, md: 400 },
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=1200&h=400&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          px: { xs: 3, md: 6 },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 36, md: 56 },
            fontWeight: 700,
            color: "#fff",
            mb: 2,
          }}
        >
          ABOUT US
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: 14, md: 16 },
            color: "#fff",
          }}
        >
          HOME • ABOUT US
        </Typography>
      </Box>

      {/* Some Words About Us Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "#FF9472",
            fontWeight: 700,
            mb: 5,
            fontSize: { xs: 24, md: 32 },
          }}
        >
          SOME WORDS ABOUT US
        </Typography>

        <Grid container spacing={3}>
          {/* Our Mission Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                background: "linear-gradient(135deg, #FF9472 0%, #C77DFF 100%)",
                color: "#fff",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: "#fff",
                  }}
                >
                  OUR MISSION
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    color: "#fff",
                    fontSize: { xs: 14, md: 16 },
                  }}
                >
                  Mr. Brown is committed to provide The Best And Innovative Range Of Delicious Bakery Products With Outstanding Quality & Service To Keep Our Customers Delighted.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Our Vision Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                backgroundColor: "#fff",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: "#FF9472",
                  }}
                >
                  OUR VISION
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    color: "#2c2c2c",
                    fontSize: { xs: 14, md: 16 },
                  }}
                >
                  To Exceed The Expectations Of Our Guest And To Provide Five Star Products At Affordable Prices And Reach Out To All Our Patrons At As Many Locations As Possible
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Quality Policy Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                backgroundColor: "#fff",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: "#FF9472",
                  }}
                >
                  QUALITY POLICY
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    color: "#2c2c2c",
                    fontSize: { xs: 14, md: 16 },
                  }}
                >
                  To provide Products and services of The Highest Possible Standards, To Satisfy Our Customer Needs, Expectations Of Quality, Reliability And service.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Brand Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "#2c2c2c",
            mb: 1,
            fontSize: { xs: 28, md: 36 },
          }}
        >
          Brand : Danbro
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            color: "#666",
            mb: 3,
            fontSize: { xs: 16, md: 20 },
          }}
        >
          Mr. Brown Bakery And Food Products Pvt Ltd
        </Typography>
        <Typography
          variant="body1"
          sx={{
            lineHeight: 2,
            color: "#2c2c2c",
            fontSize: { xs: 14, md: 16 },
            mb: 4,
          }}
        >
          Started as a "Gourmet Family-Owned Pastry Shop" in Lucknow, Danbro has expanded with factories and retail outlets in Kanpur and Delhi. We blend "Classic Asian Traditions With Modern Flavors" to create exceptional bakery products. Our expertise lies in "cutting-edge designed wedding dessert creations" and "handcrafted Asian Pastry Specialties." We offer "Personalized Service" for wedding and special occasion cakes, ensuring every celebration is memorable.
          <br />
          <br />
          We've introduced a "New Concept of baked mithai," including innovative items like badam burfi, peach gulkand, almond florentine, multigrain florentine, baked modak, and choco bar. Our commitment to "World-Class Quality" and "Strict Hygienic Conditions" ensures that every product meets the highest standards of excellence.
        </Typography>
      </Container>

      {/* We Work Through Every Aspect Section */}
      <Box sx={{ backgroundColor: "#f9f9f9", py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "#2c2c2c",
                  mb: 3,
                  fontSize: { xs: 24, md: 32 },
                }}
              >
                We Work Through Every Aspect At The Planning
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 2,
                  color: "#666",
                  mb: 4,
                  fontSize: { xs: 14, md: 16 },
                }}
              >
                Blending Asian Traditions With Modern Flavors, Danbro Crafts Exquisite, World-Class Bakery Delights, From Wedding Cakes To Innovative Baked Mithai, Ensuring Every Celebration Is Unforgettable.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FF9472",
                  color: "#fff",
                  textTransform: "none",
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: 14, md: 16 },
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#F2709C",
                  },
                }}
              >
                WE DO IT FOR YOU WITH LOVE
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ position: "relative" }}>
                {/* Statistics */}
                <Box sx={{ mb: 4 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={4}>
                      <Box
                        sx={{
                          backgroundColor: "#FFD700",
                          borderRadius: 2,
                          p: 2,
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "#2c2c2c", mb: 0.5 }}>
                          500
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#666", fontSize: { xs: 11, md: 12 } }}>
                          VENDORS ASSOCIATED
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Box
                        sx={{
                          backgroundColor: "#fff",
                          borderRadius: 2,
                          p: 2,
                          textAlign: "center",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "#2c2c2c", mb: 0.5 }}>
                          05
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#666", fontSize: { xs: 11, md: 12 } }}>
                          OFFICES
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Box
                        sx={{
                          backgroundColor: "#fff",
                          borderRadius: 2,
                          p: 2,
                          textAlign: "center",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "#2c2c2c", mb: 0.5 }}>
                          500
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#666", fontSize: { xs: 11, md: 12 } }}>
                          TEAM MEMBERS
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Box
                        sx={{
                          backgroundColor: "#fff",
                          borderRadius: 2,
                          p: 2,
                          textAlign: "center",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "#2c2c2c", mb: 0.5 }}>
                          300
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#666", fontSize: { xs: 11, md: 12 } }}>
                          PRODUCTS
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Box
                        sx={{
                          backgroundColor: "#FFD700",
                          borderRadius: 2,
                          p: 2,
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "#2c2c2c", mb: 0.5 }}>
                          2006
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#666", fontSize: { xs: 11, md: 12 } }}>
                          FOUNDING YEAR
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Box
                        sx={{
                          backgroundColor: "#FFD700",
                          borderRadius: 2,
                          p: 2,
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "#2c2c2c", mb: 0.5 }}>
                          200000
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#666", fontSize: { xs: 11, md: 12 } }}>
                          HAPPY CUSTOMERS
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                {/* Baker Image */}
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=600&fit=crop"
                    alt="Baker"
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Video Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, pb: { xs: 12, md: 16 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: 250, md: 350 },
                backgroundColor: "#000",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                },
              }}
            >
              <PlayArrowIcon
                sx={{
                  fontSize: 60,
                  color: "#fff",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: 250, md: 350 },
                backgroundColor: "#000",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                },
              }}
            >
              <PlayArrowIcon
                sx={{
                  fontSize: 60,
                  color: "#fff",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
