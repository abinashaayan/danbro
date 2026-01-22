import { Container, Box } from "@mui/material";
import { CategoryCarousel } from "../components/home/CategoryCarousel";
import { HeroBanner } from "../components/home/HeroBanner";
import { FeaturedProductsCarousel } from "../components/home/FeaturedProductsCarousel";
import { SpecialOffersSection } from "../components/home/SpecialOffersSection";
import { AboutBakerySection } from "../components/home/AboutBakerySection";
import { BakeryServicesSection } from "../components/home/BakeryServicesSection";
import { TestimonialsCarousel } from "../components/home/TestimonialsCarousel";
import { NewsletterSection } from "../components/home/NewsletterSection";
import { YouTubeVideosSection } from "../components/home/YouTubeVideosSection";

const Home = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: "100%" }}>
      {/* Hero Banner Carousel */}
      <HeroBanner />
      
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 }, py: { xs: 4, md: 6 } }}>
        {/* Category Carousel */}
        <CategoryCarousel />
        
        {/* Featured Products / Bestsellers */}
        <FeaturedProductsCarousel />
        
        {/* Special Offers / Deals */}
        <SpecialOffersSection />
        
        {/* About the Bakery */}
        <AboutBakerySection />
        
        {/* YouTube Videos Section */}
        <YouTubeVideosSection />
        
        {/* Bakery Services */}
        <BakeryServicesSection />
        
        {/* Testimonials / Reviews */}
        <TestimonialsCarousel />
      </Container>
      
      {/* Newsletter Signup */}
      <NewsletterSection />
    </Box>
  );
};

export default Home;
