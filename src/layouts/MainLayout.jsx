import { Container, Box } from "@mui/material";
import { CategoryCarousel } from "../components/home/CategoryCarousel";
import { HeroBanner } from "../components/home/HeroBanner";
import { OffersSection } from "../components/home/OffersSection";


const Home = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: "100vw", overflowX: "hidden", pb: { xs: 8, md: 12 } }}>
      <HeroBanner />
      <Container maxWidth="xxl" sx={{ overflowX: "hidden", px: { xs: 2, sm: 3, md: 6, lg: 3 }, maxWidth: { lg: "1400px" } }}>
        <CategoryCarousel />
        <OffersSection />
      </Container>
    </Box>
  );
};

export default Home;
