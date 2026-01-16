import { useState, useEffect } from 'react';
import { fetchItemCategories } from '../utils/apiService';

// Module-level cache to store categories across component re-renders
let categoriesCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache duration

/**
 * Custom hook to fetch and manage item categories with caching
 * @returns {Object} Object containing categories, loading state, and error
 */
export const useItemCategories = () => {
  const [categories, setCategories] = useState(categoriesCache || []);
  const [loading, setLoading] = useState(!categoriesCache);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      // Check if we have valid cached data
      const now = Date.now();
      if (categoriesCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
        setCategories(categoriesCache);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetchItemCategories();
        
        if (response.status === 'sucess' && response.records) {
          // Update cache
          categoriesCache = response.records;
          cacheTimestamp = Date.now();
          setCategories(response.records);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch item categories');
        console.error('Error loading item categories:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, loading, error };
};

