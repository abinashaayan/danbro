import { useState, useEffect, useRef } from 'react';
import { fetchHomeLayout, invalidateHomeLayoutFetch } from '../utils/apiService';
import blankImage from '../assets/blankimage.png';

// Cache for home layout data to prevent multiple API calls
const homeLayoutCache = {
  data: null,
  timestamp: null,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes cache
};

/**
 * Custom hook to fetch home layout data from the new API with caching
 * @returns {Object} Object containing menus, categories, products, loading state, and error
 */
export const useHomeLayout = () => {
  const [data, setData] = useState({
    menus: [],
    categories: [],
    products: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    let cancelled = false;

    const loadHomeLayout = async () => {
      // Check cache first
      const now = Date.now();
      if (
        homeLayoutCache.data &&
        homeLayoutCache.timestamp &&
        (now - homeLayoutCache.timestamp) < homeLayoutCache.CACHE_DURATION
      ) {
        if (!cancelled) {
          setData(homeLayoutCache.data);
          setLoading(false);
          return;
        }
      }

      try {
        if (!cancelled) setLoading(true);
        setError(null);

        const response = await fetchHomeLayout();

        if (!cancelled) {
          if (response?.success && response?.data) {
            const newData = {
              menus: response.data.menus || [],
              categories: response.data.categories || [],
              products: response.data.products || [],
            };
            // Update cache
            homeLayoutCache.data = newData;
            homeLayoutCache.timestamp = Date.now();
            setData(newData);
          } else {
            setData({
              menus: [],
              categories: [],
              products: [],
            });
          }
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Error loading home layout:', err);
          setError(err.message || 'Failed to load home layout data');
          setData({
            menus: [],
            categories: [],
            products: [],
          });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadHomeLayout();

    return () => {
      cancelled = true;
      isMountedRef.current = false;
    };
  }, []);

  // Refetch when homeLayout is invalidated (e.g. after login) or wishlist updated (background only, no full-page load)
  useEffect(() => {
    const refetchHomeLayout = (options = {}) => {
      const { background = false } = options;
      invalidateHomeLayoutFetch();
      homeLayoutCache.data = null;
      homeLayoutCache.timestamp = null;
      if (!background) {
        setData({ menus: [], categories: [], products: [] });
        setLoading(true);
      }
      fetchHomeLayout()
        .then((response) => {
          if (response?.success && response?.data) {
            const newData = {
              menus: response.data.menus || [],
              categories: response.data.categories || [],
              products: response.data.products || [],
            };
            homeLayoutCache.data = newData;
            homeLayoutCache.timestamp = Date.now();
            setData(newData);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error refetching home layout:', err);
          setLoading(false);
        });
    };
    const onHomeLayoutInvalidate = () => refetchHomeLayout({ background: false });
    const onWishlistUpdated = () => refetchHomeLayout({ background: true });
    const onCartUpdatedOnHomepage = () => refetchHomeLayout({ background: true });
    window.addEventListener('homeLayoutInvalidate', onHomeLayoutInvalidate);
    window.addEventListener('wishlistUpdated', onWishlistUpdated);
    window.addEventListener('cartUpdatedOnHomepage', onCartUpdatedOnHomepage);
    return () => {
      window.removeEventListener('homeLayoutInvalidate', onHomeLayoutInvalidate);
      window.removeEventListener('wishlistUpdated', onWishlistUpdated);
      window.removeEventListener('cartUpdatedOnHomepage', onCartUpdatedOnHomepage);
    };
  }, []);

  return {
    menus: data.menus,
    categories: data.categories,
    products: data.products,
    loading,
    error,
  };
};

/**
 * Transform API product format to match CategoryProductSection expected format
 * @param {Object} apiProduct - Product from API
 * @param {number} categoryId - Category ID
 * @returns {Object} Transformed product object
 */
export const transformProduct = (apiProduct, categoryId) => {
  const priceObj = apiProduct.price || {};
  const displayPrice = priceObj.rate || priceObj.mrp || 0;
  const originalPrice = priceObj.mrp || priceObj.rate || 0;

  const productImage =
    apiProduct.image ||
    blankImage;

  // Calculate discount if applicable
  let discount = null;
  if (originalPrice > displayPrice && originalPrice > 0) {
    const discountPercent = Math.round(
      ((originalPrice - displayPrice) / originalPrice) * 100
    );
    discount = `${discountPercent}% OFF`;
  }

  const avgRating = Number(apiProduct.avgRating) ?? 0;
  const totalReviews = Number(apiProduct.totalReviews) ?? 0;

  return {
    id: apiProduct.productId,
    productId: apiProduct.productId,
    name: apiProduct.name,
    title: apiProduct.name,
    description: apiProduct.name,
    price: `₹${displayPrice}`,
    originalPrice: originalPrice > displayPrice ? `₹${originalPrice}` : null,
    image: productImage,
    discount: discount,
    rating: avgRating,
    avgRating,
    totalReviews,
    reviews: totalReviews,
    sku: apiProduct.productId,
    badge: apiProduct.badge ?? null,
    badgeColor: apiProduct.badgeColor ?? null,
    categoryId: categoryId,
    courier: apiProduct.courier,
    mrp: priceObj.mrp,
    rate: priceObj.rate,
    veg: apiProduct.veg,
    weight: apiProduct.weight,
    isCart: apiProduct.isCart === true,
    isWishlisted: apiProduct.isWishlisted === true,
  };
};
