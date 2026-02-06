import { Container, Box, CircularProgress, Typography } from "@mui/material";
import { CategoryCarousel } from "../components/home/CategoryCarousel";
import { HeroBanner } from "../components/home/HeroBanner";
import { AboutBakerySection } from "../components/home/AboutBakerySection";
import { BakeryServicesSection } from "../components/home/BakeryServicesSection";
import { TestimonialsCarousel } from "../components/home/TestimonialsCarousel";
import { NewsletterSection } from "../components/home/NewsletterSection";
import { YouTubeVideosSection } from "../components/home/YouTubeVideosSection";
import { CategoryProductSection } from "../components/home/CategoryProductSection";
import { BackgroundDecorations } from "../components/home/BackgroundDecorations";
import { useHomeLayout, transformProduct } from "../hooks/useHomeLayout";
import { useMemo } from "react";
import CakeIcon from "@mui/icons-material/Cake";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import CelebrationIcon from "@mui/icons-material/Celebration";
import LiquorIcon from "@mui/icons-material/Liquor";
import CookieIcon from "@mui/icons-material/Cookie";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

// Map category names from API to section configs
const getCategoryProducts = (products, categoryName) => {
  const category = products.find(
    (cat) => cat.categoryName?.toUpperCase() === categoryName?.toUpperCase()
  );
  if (!category || !category.products) return [];
  return category.products.map((product) => transformProduct(product, category.categoryId));
};

const Home = () => {
  // Fetch home layout data from new API (cached)
  const { products: productsData, categories, loading, error } = useHomeLayout();

  // Memoize products for each section - prevent unnecessary recalculations
  const cakesProducts = useMemo(() => {
    if (!productsData || productsData.length === 0) return [];
    const cakesWebApp = getCategoryProducts(productsData, "CAKES WEB AND APP");
    const cakes = getCategoryProducts(productsData, "CAKES");
    return [...cakesWebApp, ...cakes];
  }, [productsData]);

  const namkeenProducts = useMemo(() => {
    if (!productsData || productsData.length === 0) return [];
    const namkeen = getCategoryProducts(productsData, "NAMKEEN");
    const namkeenShyam = getCategoryProducts(productsData, "NAMKEEN SHYAM");
    return [...namkeen, ...namkeenShyam];
  }, [productsData]);

  // Show loading screen while all data is being fetched
  if (loading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh", gap: 2, }}>
        <CircularProgress size={60} sx={{ color: "var(--themeColor)", }} />
        <Typography sx={{ fontSize: { xs: 16, md: 18 }, color: "var(--themeColor)", fontWeight: 600, }}>
          Loading delicious products...
        </Typography>
      </Box>
    );
  }

  // Show error state if data loading failed
  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", px: 2, }}>
        <Typography sx={{ fontSize: { xs: 16, md: 18 }, color: "#d32f2f", textAlign: "center", }}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", position: "relative" }}>
      {/* Background Decorations */}
      <BackgroundDecorations />
      
      {/* Hero Banner Carousel */}
      <Box sx={{ position: "relative", zIndex: 1, mt: "-54px" }}>
      <HeroBanner />
      </Box>
      
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 3 }, py: { xs: 4, md: 6 }, position: "relative", zIndex: 1 }}>
        {/* Category Carousel */}
        <CategoryCarousel categories={categories} />
        
        {/* Cakes - Merged Section (Birthday Cakes + Beautiful Cakes) */}
        <CategoryProductSection
          categoryGroupname="CAKES"
          title="Cakes"
          subtitle="Birthday Cakes, Beautiful Cakes"
          icon={CakeIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={20}
          preloadedProducts={cakesProducts.slice(0, 20)}
        />
        
        {/* Hunger Bites - From API */}
        <CategoryProductSection
          categoryGroupname="FAST FOOD"
          title="Hunger Bites"
          subtitle="Quick Bites"
          icon={FastfoodIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={10}
          preloadedProducts={getCategoryProducts(productsData, "FAST FOOD")}
        />
        
        {/* Fillers - From API */}
        <CategoryProductSection
          categoryGroupname="ITALIAN SNACKS"
          title="Fillers"
          subtitle="Snack Time"
          icon={RestaurantIcon}
          limit={10}
          preloadedProducts={getCategoryProducts(productsData, "ITALIAN SNACKS")}
        />
        
        {/* Take me Along - From API */}
        <CategoryProductSection
          categoryGroupname="GIFT HAMPERS"
          title="Take me Along"
          subtitle="Gift Collection"
          icon={CardGiftcardIcon}
          bgColor="rgba(255,248,245,0.5)"
          showBadge={false}
          limit={10}
          preloadedProducts={getCategoryProducts(productsData, "GIFT HAMPERS")}
        />
        
        {/* Breakfast Special - From API */}
        <CategoryProductSection
          categoryGroupname="BREAKFAST SPECIAL"
          title="Breakfast Special"
          subtitle="Morning Delights"
          icon={BreakfastDiningIcon}
          limit={10}
          preloadedProducts={getCategoryProducts(productsData, "BREAKFAST SPECIAL")}
        />
        
        {/* Pizza and Burgers - From API */}
        <CategoryProductSection
          categoryGroupname="PIZZA AND BURGERS"
          title="Pizza and Burgers"
          subtitle="Fast & Fresh"
          icon={LocalPizzaIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={10}
          preloadedProducts={getCategoryProducts(productsData, "PIZZA AND BURGERS")}
        />
        
        {/* Celebration Items - From API */}
        <CategoryProductSection
          categoryGroupname="CELEBRATION ITEMS"
          title="Celebration Items"
          subtitle="Party Essentials"
          icon={CelebrationIcon}
          limit={10}
          preloadedProducts={getCategoryProducts(productsData, "CELEBRATION ITEMS")}
        />
        
        {/* Chocolates - From API */}
        <CategoryProductSection
          categoryGroupname="CHOCOLATES"
          title="Chocolates"
          subtitle="Sweet Indulgence"
          icon={CookieIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={10}
          preloadedProducts={getCategoryProducts(productsData, "CHOCOLATES")}
        />
        
        {/* Danbrew Mocktails - From API */}
        <CategoryProductSection
          categoryGroupname="DANBREW MOCKTAILS"
          title="Danbrew Mocktails"
          subtitle="Refreshing Drinks"
          icon={LiquorIcon}
          limit={10}
          preloadedProducts={getCategoryProducts(productsData, "DANBREW MOCKTAILS")}
        />
        
        {/* Frozen Products - From API */}
        <CategoryProductSection
          categoryGroupname="FROZEN PRODUCTS"
          title="Frozen Products"
          subtitle="Chilled Delights"
          icon={AcUnitIcon}
          limit={10}
          preloadedProducts={getCategoryProducts(productsData, "FROZEN PRODUCTS")}
        />
        
        {/* Mithai - From API */}
        <CategoryProductSection
          categoryGroupname="MITHAI"
          title="Mithai"
          subtitle="Traditional Sweets"
          icon={LocalDiningIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={10}
          preloadedProducts={getCategoryProducts(productsData, "MITHAI")}
        />
        
        {/* Namkeen - Merged Section (Namkeen + Namkeen Shyam) */}
        <CategoryProductSection
          categoryGroupname="NAMKEEN"
          title="Namkeen"
          subtitle="Crunchy Snacks & Premium Selection"
          icon={RestaurantIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={15}
          preloadedProducts={namkeenProducts.slice(0, 15)}
        />
        
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
