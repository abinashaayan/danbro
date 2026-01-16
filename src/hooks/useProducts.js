import { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/apiService';

/**
 * Custom hook to fetch and manage products
 * @param {number} categoryId - Optional category ID to filter products
 * @returns {Object} Object containing products, loading state, and error
 */
export const useProducts = (categoryId = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // If no category is selected, set empty products and return
        if (!categoryId) {
          setProducts([]);
          setLoading(false);
          return;
        }
        
        const response = await fetchProducts(categoryId);
        
        if (!response?.success) {
          setProducts([]);
          setError(null); 
          return;
        }
        
        // Check for success and data array
        if (response?.success && response?.data && Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (response?.data && Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setProducts([]);
          setError(null);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        console.error('Error loading products:', err);
        setProducts([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoryId]);

  return { products, loading, error };
};

