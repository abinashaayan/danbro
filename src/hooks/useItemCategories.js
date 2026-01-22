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
        
        // Handle different response formats
        let categoriesData = null;
        
        // Check for response.records (expected format)
        if (response && response.records && Array.isArray(response.records)) {
          categoriesData = response.records;
        }
        // Check for response.data.records
        else if (response && response.data && response.data.records && Array.isArray(response.data.records)) {
          categoriesData = response.data.records;
        }
        // Check if response is directly an array
        else if (response && Array.isArray(response)) {
          categoriesData = response;
        }
        // Check for response.data as array
        else if (response && response.data && Array.isArray(response.data)) {
          categoriesData = response.data;
        }
        // Check for success response with data array
        else if (response && (response.status === 'success' || response.status === 'sucess' || response.success === true) && response.data && Array.isArray(response.data)) {
          categoriesData = response.data;
        }
        
        if (categoriesData && categoriesData.length > 0) {
          categoriesCache = categoriesData;
          cacheTimestamp = Date.now();
          setCategories(categoriesData);
        } else {
          console.warn('Invalid response format or empty categories:', response);
          throw new Error('Invalid response format: Categories data not found or empty');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch item categories');
        console.error('Error loading item categories:', err);
        // Set empty array on error to prevent crashes
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, loading, error };
};

