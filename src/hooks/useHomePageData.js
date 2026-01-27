import { useState, useEffect, useMemo } from 'react';
import { useItemCategories } from './useItemCategories';
import { fetchProducts } from '../utils/apiService';

/**
 * Custom hook to fetch all category products for home page in parallel
 * @param {Array} categoryConfigs - Array of config objects with categoryGroupname and limit
 * @returns {Object} Object containing productsData, loading state, and error
 */
export const useHomePageData = (categoryConfigs = []) => {
  const { categories, loading: categoriesLoading } = useItemCategories();
  const [productsData, setProductsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create a map of category groupname to category id
  const categoryMap = useMemo(() => {
    if (!categories || categories.length === 0) return {};
    const map = {};
    categories.forEach((cat) => {
      if (cat.groupname) {
        map[cat.groupname.toUpperCase()] = cat;
      }
    });
    return map;
  }, [categories]);

  // Create a stable reference for categoryConfigs to prevent infinite loops
  const stableCategoryConfigs = useMemo(() => {
    if (!categoryConfigs || categoryConfigs.length === 0) return [];
    // Create a hash based on configs content to detect actual changes
    const configHash = categoryConfigs.map(c => `${c.categoryGroupname}-${c.limit}`).join('|');
    return configHash;
  }, [categoryConfigs]);

  useEffect(() => {
    const loadAllProducts = async () => {
      // Wait for categories to load first
      if (categoriesLoading) {
        return;
      }

      // If no categories available, set loading to false
      if (!categories || categories.length === 0) {
        setLoading(false);
        return;
      }

      // Skip if no configs provided
      if (!categoryConfigs || categoryConfigs.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Create array of promises for all category product fetches
        const productPromises = categoryConfigs.map(async (config) => {
          const { categoryGroupname, limit = 10 } = config;
          const category = categoryMap[categoryGroupname?.toUpperCase()];

          if (!category || !category.id) {
            return {
              categoryGroupname,
              products: [],
              error: null,
            };
          }

          try {
            const response = await fetchProducts(category.id, 1, limit, '');

            if (!response?.success) {
              return {
                categoryGroupname,
                products: [],
                error: null,
              };
            }

            // Transform API products to match ProductSectionCarousel format
            let productsData = [];
            if (response?.data && Array.isArray(response.data)) {
              productsData = response.data.map((product) => {
                const priceObj =
                  product.price && product.price.length > 0
                    ? product.price[0]
                    : { rate: 0, mrp: 0 };
                const displayPrice = priceObj.rate || priceObj.mrp || 0;
                const originalPrice = priceObj.mrp || priceObj.rate || 0;

                const productImage =
                  product.images && product.images.length > 0 && product.images[0].url
                    ? product.images[0].url
                    : 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop&auto=format&q=80';

                // Calculate discount if applicable
                let discount = null;
                if (originalPrice > displayPrice && originalPrice > 0) {
                  const discountPercent = Math.round(
                    ((originalPrice - displayPrice) / originalPrice) * 100
                  );
                  discount = `${discountPercent}% OFF`;
                }

                return {
                  id: product.prdcode || product.productId || product._id,
                  productId: product.productId || product._id,
                  name: product.name,
                  title: product.name,
                  description: product.ingredient || product.name,
                  price: `₹${displayPrice}`,
                  originalPrice: originalPrice > displayPrice ? `₹${originalPrice}` : null,
                  image: productImage,
                  discount: discount,
                  rating: product.rating || 4.5,
                  reviews: product.reviews || 75, // Fixed value instead of random to prevent re-renders
                  sku: product.prdcode,
                  badge: product.badge || 'New',
                  badgeColor: product.badgeColor || '#FF9472',
                  categoryId: category.id,
                };
              });
            }

            return {
              categoryGroupname,
              products: productsData,
              error: null,
            };
          } catch (err) {
            console.error(`Error loading products for category ${categoryGroupname}:`, err);
            return {
              categoryGroupname,
              products: [],
              error: err.message || 'Failed to load products',
            };
          }
        });

        // Wait for all promises to resolve
        const results = await Promise.all(productPromises);

        // Convert results array to object keyed by categoryGroupname
        const productsDataMap = {};
        results.forEach((result) => {
          productsDataMap[result.categoryGroupname] = {
            products: result.products,
            error: result.error,
          };
        });

        setProductsData(productsDataMap);
      } catch (err) {
        console.error('Error loading home page data:', err);
        setError(err.message || 'Failed to load home page data');
      } finally {
        setLoading(false);
      }
    };

    loadAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, categoriesLoading, stableCategoryConfigs]);

  return {
    productsData,
    loading: loading || categoriesLoading,
    error,
  };
};

