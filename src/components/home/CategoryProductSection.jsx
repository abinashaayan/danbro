import { useEffect, useState, useMemo, memo } from "react";
import { useItemCategories } from "../../hooks/useItemCategories";
import { fetchProducts } from "../../utils/apiService";
import { ProductSectionCarousel } from "./ProductSectionCarousel";
import { Box, CircularProgress, Alert } from "@mui/material";
import blankImage from "../../assets/blankimage.png";

/**
 * Component that fetches products by category groupname and displays them
 * @param {string} categoryGroupname - The groupname of the category (e.g., "CAKES", "COOKIES")
 * @param {string} title - Display title for the section
 * @param {string} subtitle - Display subtitle for the section
 * @param {React.Component} icon - Icon component to display
 * @param {string} bgColor - Background color for the section
 * @param {boolean} showBadge - Whether to show product badges
 * @param {number} limit - Number of products to fetch (default: 10)
 * @param {Array} preloadedProducts - Pre-loaded products array (optional, if provided, skips API call)
 */
export const CategoryProductSection = memo(({
  categoryGroupname,
  title,
  subtitle,
  icon,
  bgColor = "transparent",
  showBadge = true,
  limit = 10,
  preloadedProducts = null,
}) => {
  const { categories, loading: categoriesLoading } = useItemCategories();
  const [products, setProducts] = useState(preloadedProducts || []);
  const [loading, setLoading] = useState(preloadedProducts === null);
  const [error, setError] = useState(null);

  // Find category by groupname
  const category = useMemo(() => {
    if (!categories || categories.length === 0) return null;
    return categories.find(
      (cat) => cat.groupname?.toUpperCase() === categoryGroupname?.toUpperCase()
    );
  }, [categories, categoryGroupname]);

  // Update products when preloadedProducts prop changes
  useEffect(() => {
    if (preloadedProducts !== null) {
      setProducts(preloadedProducts);
      setLoading(false);
    }
  }, [preloadedProducts]);

  useEffect(() => {
    if (preloadedProducts !== null) {
      return;
    }

    const loadProducts = async () => {
      if (!category || !category.id) {
        setLoading(false);
        setProducts([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetchProducts(category.id, 1, limit, "");

        if (!response?.success) {
          setProducts([]);
          setLoading(false);
          return;
        }

        let productsData = [];
        if (response?.data && Array.isArray(response.data)) {
          productsData = response.data.map((product) => {
            const priceObj =
              product?.price && product?.price.length > 0
                ? product?.price[0]
                : { rate: 0, mrp: 0 };
            const displayPrice = priceObj.rate || priceObj.mrp || 0;
            const originalPrice = priceObj.mrp || priceObj.rate || 0;

            const productImage =
              product?.images && product?.images.length > 0 && product?.images[0].url
                ? product?.images[0].url
                : blankImage;

            // Calculate discount if applicable
            let discount = null;
            if (originalPrice > displayPrice && originalPrice > 0) {
              const discountPercent = Math.round(
                ((originalPrice - displayPrice) / originalPrice) * 100
              );
              discount = `${discountPercent}% OFF`;
            }

            return {
              id: product?.prdcode || product?.productId || product?._id,
              productId: product?.productId || product?._id,
              name: product?.name,
              title: product?.name,
              description: product?.ingredient || product?.name,
              price: `₹${displayPrice}`,
              originalPrice: originalPrice > displayPrice ? `₹${originalPrice}` : null,
              image: productImage,
              discount: discount,
              rating: Number(product?.avgRating ?? product?.rating) || 0,
              avgRating: Number(product?.avgRating ?? product?.rating) || 0,
              totalReviews: Number(product?.totalReviews ?? product?.reviews) || 0,
              reviews: Number(product?.totalReviews ?? product?.reviews) || 0,
              sku: product?.prdcode,
              badge: product?.badge || "New",
              badgeColor: product?.badgeColor || "#FF9472",
              categoryId: category.id, // Add categoryId for navigation
            };
          });
        }

        setProducts(productsData);
      } catch (err) {
        console.error(`Error loading products for category ${categoryGroupname}:`, err);
        setError(err.message || "Failed to load products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (!categoriesLoading && category) {
      loadProducts();
    } else if (!categoriesLoading && !category) {
      setLoading(false);
      setProducts([]);
    }
  }, [category, categoryGroupname, limit, categoriesLoading, preloadedProducts]);

  if (preloadedProducts === null && !categoriesLoading && !category) {
    return null;
  }

  if (preloadedProducts === null && (loading || categoriesLoading)) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8, minHeight: "300px", }}>
        <CircularProgress sx={{ color: "var(--themeColor)" }} />
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  // Don't render if no products
  if (!products || products.length === 0) {
    return null;
  }

  // Render ProductSectionCarousel with fetched products
  return (
    <ProductSectionCarousel onCarousel
      title={title || category?.groupname}
      subtitle={subtitle || "Shop Now"}
      products={products}
      icon={icon}
      bgColor={bgColor}
      showBadge={showBadge}
    />
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for memo
  return (
    prevProps.categoryGroupname === nextProps?.categoryGroupname &&
    prevProps.title === nextProps?.title &&
    prevProps.subtitle === nextProps?.subtitle &&
    prevProps.bgColor === nextProps?.bgColor &&
    prevProps.showBadge === nextProps?.showBadge &&
    prevProps.limit === nextProps?.limit &&
    prevProps.preloadedProducts?.length === nextProps?.preloadedProducts?.length &&
    JSON.stringify(prevProps.preloadedProducts) === JSON.stringify(nextProps?.preloadedProducts)
  );
});

