import { Container, Box, CircularProgress, Typography } from "@mui/material";
import { CategoryCarousel } from "../components/home/CategoryCarousel";
import { HeroBanner } from "../components/home/HeroBanner";
import { FeaturedProductsCarousel } from "../components/home/FeaturedProductsCarousel";
import { SpecialOffersSection } from "../components/home/SpecialOffersSection";
import { AboutBakerySection } from "../components/home/AboutBakerySection";
import { BakeryServicesSection } from "../components/home/BakeryServicesSection";
import { TestimonialsCarousel } from "../components/home/TestimonialsCarousel";
import { NewsletterSection } from "../components/home/NewsletterSection";
import { YouTubeVideosSection } from "../components/home/YouTubeVideosSection";
import { CategoryProductSection } from "../components/home/CategoryProductSection";
import { BackgroundDecorations } from "../components/home/BackgroundDecorations";
import { useHomePageData } from "../hooks/useHomePageData";
import CakeIcon from "@mui/icons-material/Cake";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import CelebrationIcon from "@mui/icons-material/Celebration";
import LiquorIcon from "@mui/icons-material/Liquor";
import CookieIcon from "@mui/icons-material/Cookie";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import StoreIcon from "@mui/icons-material/Store";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

// Define all category configurations for home page
const categoryConfigs = [
  { categoryGroupname: "COOKIES", limit: 10 },
  { categoryGroupname: "CAKES WEB AND APP", limit: 10 },
  { categoryGroupname: "CAKES", limit: 10 },
  { categoryGroupname: "SNB CREAMLESS CAKES", limit: 10 },
  { categoryGroupname: "FAST FOOD", limit: 10 },
  { categoryGroupname: "ITALIAN SNACKS", limit: 10 },
  { categoryGroupname: "GIFT HAMPERS", limit: 10 },
  { categoryGroupname: "BREAKFAST SPECIAL", limit: 10 },
  { categoryGroupname: "PIZZA AND BURGERS", limit: 10 },
  { categoryGroupname: "CELEBRATION ITEMS", limit: 10 },
  { categoryGroupname: "CHOCOLATES", limit: 10 },
  { categoryGroupname: "DANBREW MOCKTAILS", limit: 10 },
  { categoryGroupname: "DRY CAKES AND MUFFINS", limit: 10 },
  { categoryGroupname: "FROZEN PRODUCTS", limit: 10 },
  { categoryGroupname: "MITHAI", limit: 10 },
  { categoryGroupname: "NAMKEEN", limit: 10 },
  { categoryGroupname: "NAMKEEN SHYAM", limit: 10 },
  { categoryGroupname: "NEW SAPRU MARG EJ", limit: 10 },
  { categoryGroupname: "TAJ", limit: 10 },
];

const Home = () => {
  // Fetch all category products in parallel
  const { productsData, loading, error } = useHomePageData(categoryConfigs);

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
        <CategoryCarousel />
        
        {/* Featured Products / Bestsellers */}
        <FeaturedProductsCarousel />
        
        {/* Our Best Selling Products - From API */}
        <CategoryProductSection
          categoryGroupname="COOKIES"
          title="Our Best Selling Products"
          subtitle="Top Picks"
          icon={LocalFireDepartmentIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={10}
          preloadedProducts={productsData["COOKIES"]?.products || []}
        />
        
        {/* Cakes - Merged Section (Birthday Cakes + Beautiful Cakes) */}
        <CategoryProductSection
          categoryGroupname="CAKES"
          title="Cakes"
          subtitle="Birthday Cakes, Beautiful Cakes"
          icon={CakeIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={40}
          preloadedProducts={[
            ...(productsData["CAKES WEB AND APP"]?.products || []),
            ...(productsData["CAKES"]?.products || [])
          ]}
        />
        
        {/* Special Offers / Deals */}
        <SpecialOffersSection />
        
        {/* Hunger Bites - From API */}
        <CategoryProductSection
          categoryGroupname="FAST FOOD"
          title="Hunger Bites"
          subtitle="Quick Bites"
          icon={FastfoodIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={10}
          preloadedProducts={productsData["FAST FOOD"]?.products || []}
        />
        
        {/* Fillers - From API */}
        <CategoryProductSection
          categoryGroupname="ITALIAN SNACKS"
          title="Fillers"
          subtitle="Snack Time"
          icon={RestaurantIcon}
          limit={10}
          preloadedProducts={productsData["ITALIAN SNACKS"]?.products || []}
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
          preloadedProducts={productsData["GIFT HAMPERS"]?.products || []}
        />
        
        {/* Breakfast Special - From API */}
        <CategoryProductSection
          categoryGroupname="BREAKFAST SPECIAL"
          title="Breakfast Special"
          subtitle="Morning Delights"
          icon={BreakfastDiningIcon}
          limit={10}
          preloadedProducts={productsData["BREAKFAST SPECIAL"]?.products || []}
        />
        
        {/* Pizza and Burgers - From API */}
        <CategoryProductSection
          categoryGroupname="PIZZA AND BURGERS"
          title="Pizza and Burgers"
          subtitle="Fast & Fresh"
          icon={LocalPizzaIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={10}
          preloadedProducts={productsData["PIZZA AND BURGERS"]?.products || []}
        />
        
        {/* Celebration Items - From API */}
        <CategoryProductSection
          categoryGroupname="CELEBRATION ITEMS"
          title="Celebration Items"
          subtitle="Party Essentials"
          icon={CelebrationIcon}
          limit={10}
          preloadedProducts={productsData["CELEBRATION ITEMS"]?.products || []}
        />
        
        {/* Chocolates - From API */}
        <CategoryProductSection
          categoryGroupname="CHOCOLATES"
          title="Chocolates"
          subtitle="Sweet Indulgence"
          icon={CookieIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={10}
          preloadedProducts={productsData["CHOCOLATES"]?.products || []}
        />
        
        {/* Danbrew Mocktails - From API */}
        <CategoryProductSection
          categoryGroupname="DANBREW MOCKTAILS"
          title="Danbrew Mocktails"
          subtitle="Refreshing Drinks"
          icon={LiquorIcon}
          limit={10}
          preloadedProducts={productsData["DANBREW MOCKTAILS"]?.products || []}
        />
        
        {/* Frozen Products - From API */}
        <CategoryProductSection
          categoryGroupname="FROZEN PRODUCTS"
          title="Frozen Products"
          subtitle="Chilled Delights"
          icon={AcUnitIcon}
          limit={10}
          preloadedProducts={productsData["FROZEN PRODUCTS"]?.products || []}
        />
        
        {/* Mithai - From API */}
        <CategoryProductSection
          categoryGroupname="MITHAI"
          title="Mithai"
          subtitle="Traditional Sweets"
          icon={LocalDiningIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={10}
          preloadedProducts={productsData["MITHAI"]?.products || []}
        />
        
        {/* Namkeen - Merged Section (Namkeen + Namkeen Shyam) */}
        <CategoryProductSection
          categoryGroupname="NAMKEEN"
          title="Namkeen"
          subtitle="Crunchy Snacks & Premium Selection"
          icon={RestaurantIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={20}
          preloadedProducts={[
            ...(productsData["NAMKEEN"]?.products || []),
            ...(productsData["NAMKEEN SHYAM"]?.products || [])
          ]}
        />
        
        {/* New Sapru Marg EJ - From API */}
        <CategoryProductSection
          categoryGroupname="NEW SAPRU MARG EJ"
          title="New Sapru Marg"
          subtitle="Special Collection"
          icon={StoreIcon}
          limit={10}
          preloadedProducts={productsData["NEW SAPRU MARG EJ"]?.products || []}
        />
        
        {/* Taj - From API */}
        <CategoryProductSection
          categoryGroupname="TAJ"
          title="Taj"
          subtitle="Premium Selection"
          icon={CardGiftcardIcon}
          bgColor="rgba(255,248,245,0.5)"
          limit={10}
          preloadedProducts={productsData["TAJ"]?.products || []}
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
