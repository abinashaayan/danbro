import { Container } from "@mui/material";
import { CategoryCarousel } from "../components/home/CategoryCarousel";
import { HeroBanner } from "../components/home/HeroBanner";
import { OffersSection } from "../components/home/OffersSection";


const Home = () => {
  return (
    <>
      <HeroBanner />
      <Container maxWidth="xxl">
        <CategoryCarousel />
        <OffersSection />
      </Container>
    </>
  );
};

export default Home;
