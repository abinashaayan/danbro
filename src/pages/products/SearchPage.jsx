import { useState, useEffect, useRef, useMemo } from "react";
import {
  Box,
  Container,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import { Clear as ClearIcon } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { ProductGrid } from "../../components/products/ProductGrid";
import { CustomButton } from "../../components/comman/CustomButton";
import blankImage from "../../assets/blankimage.png";

const PRICE_RANGE_OPTIONS = [
  { value: "", label: "Price range" },
  { value: "0-100", label: "₹0 - ₹100", min: 0, max: 100 },
  { value: "100-400", label: "₹100 - ₹400", min: 100, max: 400 },
  { value: "400-600", label: "₹400 - ₹600", min: 400, max: 600 },
  { value: "600-1000", label: "₹600 - ₹1000", min: 600, max: 1000 },
  { value: "1000-2000", label: "₹1000 - ₹2000", min: 1000, max: 2000 },
  { value: "2000-above", label: "₹2000 & above", min: 2000, max: null },
];

const ITEMS_PER_PAGE = 20;

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoadedForCurrentFilters, setHasLoadedForCurrentFilters] = useState(false);

  const q = searchParams.get("q") ?? "";
  const searchQuery = (q || "").trim();
  const minPriceFromUrl = searchParams.get("minPrice");
  const maxPriceFromUrl = searchParams.get("maxPrice");

  const urlInitDone = useRef(false);
  useEffect(() => {
    if (urlInitDone.current) return;
    urlInitDone.current = true;
    if (minPriceFromUrl !== null && minPriceFromUrl !== undefined && minPriceFromUrl !== "") {
      const match = PRICE_RANGE_OPTIONS.find(
        (r) =>
          r.value &&
          String(r.min) === String(minPriceFromUrl) &&
          (maxPriceFromUrl == null || maxPriceFromUrl === "" ? r.max == null : String(r.max) === String(maxPriceFromUrl))
      );
      if (match) setPriceRange(match.value);
    }
  }, [minPriceFromUrl, maxPriceFromUrl]);

  useEffect(() => {
    setCurrentPage(1);
    setDisplayedProducts([]);
    setAllProducts([]);
    setHasLoadedForCurrentFilters(false);
  }, [searchQuery, priceRange]);

  const selectedRange = PRICE_RANGE_OPTIONS.find((r) => r.value === priceRange);
  const minPriceNum = selectedRange?.min ?? null;
  const maxPriceNum = selectedRange?.max ?? null;

  const { products: apiProducts, loading: productsLoading, error: productsError, pagination } = useProducts(
    null,
    currentPage,
    ITEMS_PER_PAGE,
    searchQuery,
    minPriceNum,
    maxPriceNum
  );

  useEffect(() => {
    if (!apiProducts || apiProducts.length === 0) {
      if (currentPage === 1) {
        setAllProducts([]);
        setDisplayedProducts([]);
      }
      return;
    }

    const transformed = apiProducts.map((product) => {
      const priceObj = product?.price && product?.price.length > 0 ? product?.price[0] : { rate: 0, mrp: 0 };
      const productImage =
        product?.images && product?.images.length > 0 && product?.images[0].url ? product?.images[0].url : blankImage;
      return {
        id: product?.prdcode,
        productId: product?.productId || product?._id,
        name: product?.name,
        description: product?.ingredient || product?.name,
        price: `₹${priceObj.rate || priceObj.mrp || 0}`,
        mrp: priceObj.mrp,
        rate: priceObj.rate,
        courier: product?.courier ?? "N",
        weight: product?.weight || null,
        veg: product?.veg ?? "N",
        subcategory: product?.subcategory || null,
        image: productImage,
        avgRating: Number(product?.avgRating) ?? 0,
        totalReviews: Number(product?.totalReviews) ?? 0,
      };
    });

    if (currentPage === 1) {
      setAllProducts(transformed);
      setDisplayedProducts(transformed);
    } else {
      setAllProducts((prev) => [...prev, ...transformed]);
      setDisplayedProducts((prev) => [...prev, ...transformed]);
    }
  }, [apiProducts, currentPage]);

  useEffect(() => {
    if (currentPage === 1 && !productsLoading) {
      setHasLoadedForCurrentFilters(true);
    }
  }, [currentPage, productsLoading]);

  useEffect(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (searchQuery) next.set("q", searchQuery);
        else next.delete("q");
        const range = PRICE_RANGE_OPTIONS.find((r) => r.value === priceRange);
        if (range?.min != null) next.set("minPrice", String(range.min));
        else next.delete("minPrice");
        if (range?.max != null) next.set("maxPrice", String(range.max));
        else next.delete("maxPrice");
        return next;
      },
      { replace: true }
    );
  }, [searchQuery, priceRange]);

  const products = displayedProducts;
  const hasMore = pagination?.hasMore || (apiProducts && apiProducts.length === ITEMS_PER_PAGE);

  const handleLoadMore = () => setCurrentPage((prev) => prev + 1);

  const handleResetSearch = () => {
    setPriceRange("");
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete("q");
        next.delete("minPrice");
        next.delete("maxPrice");
        return next;
      },
      { replace: true }
    );
  };

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [searchQuery, priceRange]);

  if (productsError) {
    return (
      <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {productsError}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", py: { xs: 3, md: 0 }, pb: { xs: 8, md: 0 }, p: { xs: 1.25, md: 0 }, mb: 4 }}>
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
          }}
        >
          <CustomText variant="h4" sx={{ fontSize: { xs: 22, sm: 24, md: 32 }, fontWeight: 700, color: "#2c2c2c" }}>
            {searchQuery ? `Search: "${searchQuery}"` : "Search products"}
          </CustomText>
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5 }}>
            <FormControl size="small" sx={{ width: 160, minWidth: 160, flexShrink: 0 }}>
              <InputLabel id="search-price-range-label">Price range</InputLabel>
              <Select
                labelId="search-price-range-label"
                value={priceRange}
                label="Price range"
                onChange={(e) => setPriceRange(e.target.value)}
                MenuProps={{
                  disableScrollLock: true,
                  PaperProps: { sx: { maxHeight: 320, mt: 1.5, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", borderRadius: 2 } },
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
                    {opt?.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {(searchQuery || priceRange) && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<ClearIcon />}
                onClick={handleResetSearch}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  borderColor: "#999",
                  color: "#666",
                  "&:hover": { borderColor: "#666", backgroundColor: "rgba(0,0,0,0.04)" },
                }}
              >
                Reset
              </Button>
            )}
          </Box>
        </Box>

        {!searchQuery ? (
          <Box sx={{ px: { xs: 2, md: 3, lg: 2 }, py: 6, textAlign: "center" }}>
            <CustomText sx={{ fontSize: 16, color: "#666" }}>
              Type in the header search to find products.
            </CustomText>
          </Box>
        ) : productsLoading && currentPage === 1 ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "40vh" }}>
            <CircularProgress sx={{ color: "var(--themeColor)" }} />
          </Box>
        ) : (
          <>
            <Box sx={{ px: { xs: 2, md: 3, lg: 2 } }}>
              <ProductGrid products={products} isVisible={isVisible} />
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
                      "&:disabled": { backgroundColor: "transparent", borderColor: "#ccc", color: "#ccc" },
                    }}
                  >
                    {productsLoading ? "Loading..." : "Load More Products"}
                  </CustomButton>
                </Box>
              )}
              {productsLoading && currentPage > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
                  <CircularProgress size={32} sx={{ color: "#FF643A" }} />
                </Box>
              )}
            </Box>
            {searchQuery && hasLoadedForCurrentFilters && !productsLoading && products.length === 0 && (
              <Box sx={{ px: { xs: 2, md: 3, lg: 2 }, py: 6, textAlign: "center" }}>
                <CustomText sx={{ fontSize: 16, color: "#666" }}>No products found for "{searchQuery}".</CustomText>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};
