import { useState, useEffect, useRef, useMemo } from "react";
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import {
  Search as SearchIcon,
} from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import Rectangle45 from "../../assets/Rectangle45.png";
import { useItemCategories } from "../../hooks/useItemCategories";
import { useProducts } from "../../hooks/useProducts";
import { CategoryTabs } from "../../components/comman/CategoryTabs";
import { ProductGrid } from "../../components/products/ProductGrid";
import { RecommendedProducts } from "../../components/products/RecommendedProducts";
import { CustomButton } from "../../components/comman/CustomButton";
import blankImage from "../../assets/blankimage.png";

const PRICE_RANGE_OPTIONS = [
  { value: "", label: "Price range" },
  { value: "0-100", label: "₹0 - ₹100", min: 0, max: 100 },
  { value: "100-2000", label: "₹100 - ₹2000", min: 100, max: 2000 },
  { value: "2000-above", label: "₹2000 - Above", min: 2000, max: null },
];

export const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const productRef = useRef(null);

  const ITEMS_PER_PAGE = 20; // Show 20 items per page

  const { categories: apiCategories, loading: categoriesLoading, error: categoriesError } = useItemCategories();
  console.log(apiCategories, 'apiCategories')

  const categoryIdFromUrl = searchParams.get('categoryId');
 

  useEffect(() => {
    if (categoryIdFromUrl && apiCategories && apiCategories.length > 0) {
      const categoryIndex = apiCategories.findIndex(
        (cat) =>
          cat?.categoryId === categoryIdFromUrl ||
          String(cat?.id) === categoryIdFromUrl
      );
      if (categoryIndex !== -1) {
        setSelectedCategory(categoryIndex);
      }
    }
  }, [categoryIdFromUrl, apiCategories]);

  // Debounce search query to avoid excessive API calls - increased delay for better typing experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 800); 

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // API expects categoryId (string e.g. "696602a929c5a42df91ef599"), not numeric id
  const selectedCategoryId = useMemo(() => {
    const cat = apiCategories?.[selectedCategory];
    return cat?.categoryId ?? cat?.id ?? null;
  }, [apiCategories, selectedCategory]);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
    const cat = apiCategories?.[newValue];
    const categoryId = cat?.categoryId ?? cat?.id;
    if (categoryId != null) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("categoryId", String(categoryId));
          return next;
        },
        { replace: true }
      );
    }
  };

  // Reset pagination when category, search or price range changes
  useEffect(() => {
    setCurrentPage(1);
    setDisplayedProducts([]);
    setAllProducts([]);
  }, [selectedCategoryId, debouncedSearchQuery, priceRange]);

  const selectedRange = PRICE_RANGE_OPTIONS.find((r) => r.value === priceRange);
  const minPriceNum = selectedRange?.min ?? null;
  const maxPriceNum = selectedRange?.max ?? null;

  const { products: apiProducts, loading: productsLoading, error: productsError, pagination } = useProducts(
    selectedCategoryId,
    currentPage,
    ITEMS_PER_PAGE,
    debouncedSearchQuery,
    minPriceNum,
    maxPriceNum
  );

  // Transform products when API data changes
  useEffect(() => {
    if (!apiProducts || apiProducts.length === 0) {
      if (currentPage === 1) {
        setAllProducts([]);
        setDisplayedProducts([]);
      }
      return;
    }

    const transformed = apiProducts.map((product) => {
      const priceObj = product.price && product.price.length > 0 ? product.price[0] : { rate: 0, mrp: 0 };
      const displayPrice = priceObj.rate || priceObj.mrp || 0;

      const productImage = product.images && product.images.length > 0 && product.images[0].url
        ? product.images[0].url
        : blankImage;

      return {
        id: product.prdcode,
        productId: product.productId || product._id,
        name: product.name,
        description: product.ingredient || product.name,
        price: `₹${displayPrice}`,
        mrp: priceObj.mrp,
        rate: priceObj.rate,
        courier: product.courier ?? "N",
        image: productImage,
      };
    });

    if (currentPage === 1) {
      setAllProducts(transformed);
      setDisplayedProducts(transformed);
    } else {
      setAllProducts(prev => [...prev, ...transformed]);
      setDisplayedProducts(prev => [...prev, ...transformed]);
    }
  }, [apiProducts, currentPage]);

  // Search and price filter are done by API; no client-side filter needed
  const products = displayedProducts;
  const categories = apiCategories?.map(cat => cat.groupname) || [];
  const hasMore = pagination?.hasMore || (apiProducts && apiProducts.length === ITEMS_PER_PAGE);

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  // Animation on mount and category change
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedCategory, debouncedSearchQuery]);

  if (categoriesLoading || productsLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: "var(--themeColor)" }} />
      </Box>
    );
  }

  if (categoriesError || productsError) {
    return (
      <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {categoriesError || productsError}
        </Alert>
      </Box>
    );
  }

  const recommendedProducts = [
    {
      id: 1,
      name: "Blueberry Cake",
      description: "Sweet blueberry delight",
      image: blankImage,
    },
    {
      id: 2,
      name: "Cinnamon Roll",
      description: "Warm cinnamon spice",
      image: blankImage,
    },
    {
      id: 3,
      name: "Lemon Tart",
      description: "Tangy lemon filling",
      image: blankImage,
    },
    {
      id: 4,
      name: "Lemon Tart",
      description: "Tangy lemon filling",
      image: blankImage,
    },
    {
      id: 5,
      name: "Lemon Tart",
      description: "Tangy lemon filling",
      image: blankImage,
    },
    {
      id: 5,
      name: "Lemon Tart",
      description: "Tangy lemon filling",
      image: blankImage,
    },
  ];


  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", py: { xs: 3, md: 0 }, pb: { xs: 8, md: 0 }, p: { xs: 1.25, md: 0 } }}>
      <Container maxWidth="false" sx={{ px: { xs: 2, md: 3, lg: 2 }, py: 2 }}>
        <Box
          sx={{
            mb: { xs: 3, md: 4 },
            px: { xs: 2, md: 3, lg: 2 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: { xs: 1.5, md: 2 },
            animation: "fadeInDown 0.8s ease-out",
            "@keyframes fadeInDown": {
              "0%": {
                opacity: 0,
                transform: "translateY(-20px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          <CustomText variant="h4" sx={{ fontSize: { xs: 22, sm: 24, md: 32 }, fontWeight: 700, color: "#2c2c2c", transition: "color 0.3s ease", }}>
            Categories
          </CustomText>
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5 }}>
            <TextField
              placeholder="Search for products"
              value={searchQuery}
              size="small"
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#666", transition: "color 0.3s ease" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: { xs: "100%", sm: 200, md: 240 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                  transition: "all 0.3s ease",
                  "&:hover": { backgroundColor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
                  "&.Mui-focused": { backgroundColor: "#fff", boxShadow: "0 4px 12px rgba(255,100,58,0.2)" },
                },
              }}
            />
            <FormControl
              size="small"
              sx={{
                width: 160,
                minWidth: 160,
                flexShrink: 0,
              }}
            >
              <InputLabel id="price-range-label">Price range</InputLabel>
              <Select
                labelId="price-range-label"
                value={priceRange}
                label="Price range"
                onChange={(e) => setPriceRange(e.target.value)}
                MenuProps={{
                  disableScrollLock: true,
                  PaperProps: {
                    sx: {
                      maxHeight: 320,
                      mt: 1.5,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                      borderRadius: 2,
                    },
                  },
                  anchorOrigin: { vertical: "bottom", horizontal: "left" },
                  transformOrigin: { vertical: "top", horizontal: "left" },
                }}
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                  "&:hover": { backgroundColor: "#fff" },
                  "&.Mui-focused": { backgroundColor: "#fff", boxShadow: "0 4px 12px rgba(255,100,58,0.2)" },
                }}
              >
                {PRICE_RANGE_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value || "all"} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <CategoryTabs categories={categories} selectedCategory={selectedCategory} onChange={handleCategoryChange} />
        <Box ref={productRef} sx={{ px: { xs: 2, md: 3, lg: 2 } }}>
          <ProductGrid products={products} isVisible={isVisible} />

          {/* Load More Button */}
          {products?.length > 0 && hasMore && !productsLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <CustomButton
                variant="outlined"
                onClick={handleLoadMore}
                disabled={productsLoading}
                sx={{
                  px: 4,
                  borderRadius: "30px",
                  backgroundColor: "transparent",
                  borderColor: "#FF643A",
                  color: "#FF643A",
                  boxShadow: "none",
                  fontSize: { xs: 14, md: 16 },
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#FF643A",
                    color: "#fff",
                    borderColor: "#FF643A",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(255,100,58,0.3)",
                  },
                  "&:disabled": {
                    backgroundColor: "transparent",
                    borderColor: "#ccc",
                    color: "#ccc",
                  },
                }}
              >
                {productsLoading ? "Loading..." : "Load More Products"}
              </CustomButton>
            </Box>
          )}

          {/* Loading indicator for load more */}
          {productsLoading && currentPage > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
              <CircularProgress size={32} sx={{ color: "#FF643A" }} />
            </Box>
          )}
        </Box>
      </Container>

      {/* Promotional Banner */}
      <Container maxWidth="false" sx={{ px: { xs: 2, md: 3, lg: 2 } }}>
        <Box
          sx={{
            backgroundImage: `url(${Rectangle45})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: { xs: "8px", md: "12px" },
            height: { xs: 250, sm: 320, md: 420 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: { xs: 4, md: 6 },
            position: "relative",
            overflow: "hidden",
            animation: "fadeInScale 1s ease-out",
            "@keyframes fadeInScale": {
              "0%": {
                opacity: 0,
                transform: "scale(0.95)",
              },
              "100%": {
                opacity: 1,
                transform: "scale(1)",
              },
            },
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              backdropFilter: "blur(1px)",
              zIndex: 1,
            },
            "&:hover": {
              "&::after": {
                backdropFilter: "blur(2px)",
              },
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: "480px", px: 2, }}>
            <CustomText
              sx={{
                fontFamily: `'Playfair Display', serif`,
                fontSize: { xs: 24, sm: 32, md: 42 },
                fontStyle: "italic",
                fontWeight: 700,
                color: "#8B3D22",
                mb: 1,
                lineHeight: 1,
              }}
            >
              20% Off Your <br /> First Order
            </CustomText>

            <CustomText
              sx={{
                fontFamily: `'Inter', sans-serif`,
                fontStyle: "italic",
                fontSize: { xs: 14, sm: 16, md: 18 },
                color: "#5D5D5D",
                mb: 3,
                maxWidth: 380,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum justo.
            </CustomText>

            <CustomButton
              variant="contained"
              sx={{
                backgroundColor: "#FF643A",
                color: "#fff",
                textTransform: "none",
                px: 5,
                py: 1.4,
                borderRadius: "30px",
                fontSize: { xs: 14, sm: 15, md: 16 },
                fontWeight: 600,
                boxShadow: "0 6px 18px rgba(255,100,58,0.35)",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#ff5323",
                  boxShadow: "0 8px 22px rgba(255,100,58,0.45)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Learn More
            </CustomButton>
          </Box>
        </Box>
      </Container>
      {recommendedProducts && recommendedProducts.length > 0 && (
        <RecommendedProducts recommendedProducts={recommendedProducts} />
      )}
    </Box>
  );
};

