import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import SendIcon from "@mui/icons-material/Send";

import logo from "../../assets/logo.png";
import postImg from "../../assets/cakeimg.png";    // sample image
import visa from "../../assets/payments.png";          // add your icons
import mastercard from "../../assets/logo.png";
import maestro from "../../assets/logo.png";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#FBEFE8",
  paddingTop: theme.spacing(6),
}));

export const Footer = () => {
  return (
    <Box>
      <Box
        sx={{
          background:
            "linear-gradient(90deg, #FF9472 0%, #F2709C 100%)",
          width: "90%",
          mx: "auto",
          p: 4,
          borderRadius: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Box>
          <Typography
            sx={{ fontSize: 36, fontWeight: 800, color: "#fff", mb: 2 }}
          >
            Have a good cake Today.
          </Typography>
          <Box sx={{ display: "flex", gap: 4 }}>
            {[1, 2, 3].map((_) => (
              <Box key={_} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircleIcon sx={{ color: "#fff" }} />
                <Typography sx={{ color: "#fff", fontSize: 16 }}>Lorem</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            background: "#fff",
            px: 5,
            py: 1.5,
            borderRadius: "40px",
            fontSize: 20,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Contact
        </Box>
      </Box>
      <FooterContainer>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src={logo} alt="logo" height="90" />
            <Box>
              <Typography sx={{ fontWeight: 700, mb: 1 }}>Let's do it!</Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <FacebookIcon />
                <InstagramIcon />
                <TwitterIcon />
                <SendIcon />
              </Box>
            </Box>
          </Box>
          <Grid container spacing={6} sx={{ my: 5 }}>
            <Grid item xs={12} md={2}>
              <Typography variant="body2" sx={{ fontWeight: 700, mb: 2, width: 250 }}>
                Blending Asian traditions with modern
                flavors, Danbro crafts exquisite, world-
                class bakery delights, from wedding
                cakes to innovative baked mithai,
                ensuring every celebration is
                unforgettable.
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography sx={{ fontWeight: 700, mb: 2 }}>OUR STORES</Typography>
              {["About Us", "Lucknow Stores", "Kanpur Stores", "Ghaziabad Stores", "Noida Stores", "Delhi Stores"]
                .map((item) => (
                  <Typography key={item} sx={{ mb: 1, color: "#555" }}>
                    {item}
                  </Typography>
                ))}
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography sx={{ fontWeight: 700, mb: 2 }}>USEFUL LINKS</Typography>
              {["Privacy Policies", "Shipping Policies", "Refund & Returns Policy", "Terms and Conditions", "Corporate Queries", "Contact Us"]
                .map((item) => (
                  <Typography key={item} sx={{ mb: 1, color: "#555" }}>
                    {item}
                  </Typography>
                ))}
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography sx={{ fontWeight: 700, mb: 2 }}>KNOW MORE</Typography>
              {["Offers and Schemes", "Press and Media", "Events & Catering", "Blogs", "Career at Danbro", "Danbro Institute"]
                .map((item) => (
                  <Typography key={item} sx={{ mb: 1, color: "#555" }}>
                    {item}
                  </Typography>
                ))}
            </Grid>
            <Grid item xs={12} md sx={{ flex: 0.6 }}>
              <Typography sx={{ mb: 2, fontWeight: 700 }}>
                RECENT POSTS
              </Typography>

              {[1, 2].map((i) => (
                <Box key={i} sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <img src={postImg} width="70" style={{ borderRadius: 8 }} />
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                      Handmade with Love – Discover Danbro Cookies by Mr Brown Bakery
                    </Typography>

                    <Typography sx={{ fontSize: 12, color: "#777" }}>
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
              mt: 6,
              pt: 3,
              pb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#444", fontSize: 14 }}>
              Mr. Brown Bakery and Food Products Pvt Ltd | 2025 | All Rights Reserved
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <img src={visa} />
            </Box>
          </Box>
        </Container>
      </FooterContainer>
    </Box>
  );
};
