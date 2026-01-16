import { EXTERNAL_API_BASE_URL, EXTERNAL_API_ACCESS_KEY, API_BASE_URL } from './apiUrl';
import axios from 'axios';


/**
 * Sanitize JSON string by escaping control characters within string values
 * @param {string} jsonString - The JSON string to sanitize
 * @returns {string} Sanitized JSON string
 */
const sanitizeJsonString = (jsonString) => {
  let result = '';
  let inString = false;
  let escapeNext = false;
  
  for (let i = 0; i < jsonString.length; i++) {
    const char = jsonString[i];
    const charCode = char.charCodeAt(0);
    
    if (escapeNext) {
      // We're escaping the next character, so just add it as-is
      result += char;
      escapeNext = false;
      continue;
    }
    
    if (char === '\\') {
      // Next character is escaped
      escapeNext = true;
      result += char;
      continue;
    }
    
    if (char === '"' && !escapeNext) {
      // Toggle string state
      inString = !inString;
      result += char;
      continue;
    }
    
    if (inString) {
      // We're inside a string value, escape control characters
      if (charCode >= 0x00 && charCode <= 0x1F) {
        // Control character - escape it
        switch (charCode) {
          case 0x08: result += '\\b'; break;  // Backspace
          case 0x09: result += '\\t'; break;  // Tab
          case 0x0A: result += '\\n'; break;  // Line feed
          case 0x0C: result += '\\f'; break;  // Form feed
          case 0x0D: result += '\\r'; break;  // Carriage return
          default:
            // For other control characters, use Unicode escape
            result += '\\u' + ('0000' + charCode.toString(16)).slice(-4);
        }
      } else {
        result += char;
      }
    } else {
      // Outside string, keep as-is (but remove invalid control characters)
      if (charCode >= 0x00 && charCode <= 0x1F && char !== '\n' && char !== '\r' && char !== '\t') {
        // Remove control characters outside strings (except whitespace)
        continue;
      }
      result += char;
    }
  }
  
  return result;
};

/**
 * Get authentication token from localStorage
 * @returns {string|null} The authentication token or null if not found
 */
const getAuthToken = () => {
  return localStorage.getItem('token') || localStorage.getItem('authToken');
};

/**
 * Get the API URL for category endpoint
 */
const getApiUrl = () => {
  return `${API_BASE_URL}/category/getAll`;
};

/**
 * Fetch item categories from the external API
 * @returns {Promise<Object>} Response object with status and records array
 */
export const fetchItemCategories = async () => {
  try {
    const url = getApiUrl();

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false,
      timeout: 10000,
    });

    return response.data;

  } catch (error) {
    console.error('Error fetching item categories:', error);

    if (!error.response) {
      throw new Error(
        'Network error: Unable to connect to the API. Please check your internet connection or try again later.'
      );
    }

    throw new Error(
      error.response?.data?.message ||
      `HTTP error! status: ${error.response.status}`
    );
  }
};

/**
 * Get item categories with error handling
 * @returns {Promise<Array>} Array of category records
 */
export const getItemCategories = async () => {
  try {
    const response = await fetchItemCategories();
    
    if ((response.status === 'sucess' || response.status === 'success') && response.records) {
      return response.records;
    } else if (response.records && Array.isArray(response.records)) {
      // If records exist but status is different, still use it
      return response.records;
    }
    
    throw new Error(`Invalid response format: ${JSON.stringify(response)}`);
  } catch (error) {
    console.error('Error getting item categories:', error);
    throw error;
  }
};

/**
 * Get API URL helper function
 * @param {string} level - API level (ITEMCATEGORY, PRODUCTS, POS)
 * @param {object} params - Additional query parameters
 * @returns {string} API URL
 */
const getExternalApiUrl = (level, params = {}) => {
  const baseUrl = import.meta.env.DEV 
    ? `/api/external/downstream.asp`
    : `${EXTERNAL_API_BASE_URL}/downstream.asp`;
  
  const queryParams = new URLSearchParams({ level, ...params });
  return `${baseUrl}?${queryParams.toString()}`;
};

/**
 * Fetch products from the API
 * @param {number} categoryId - Category ID to filter products
 * @param {number} page - Page number (default: 1)
 * @param {string} search - Search query (default: '')
 * @returns {Promise<Object>} Response object with success, message, meta, and data array
 */
export const fetchProducts = async (categoryId = null, page = 1, search = '') => {
  try {
    const baseUrl = `${API_BASE_URL}/product/getAll`;
    const params = new URLSearchParams();
    
    if (categoryId) {
      params.append('category', categoryId.toString());
    }
    params.append('page', page.toString());
    params.append('search', search);
    
    const url = `${baseUrl}?${params.toString()}`;
    
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false,
      timeout: 10000,
      responseType: 'text', // Get as text first to handle potential JSON parsing issues
    });

    let data;
    
    try {
      // First try parsing without sanitization
      data = JSON.parse(response.data);
    } catch (parseError) {
      // If that fails, try sanitizing and parsing again
      try {
        const sanitizedText = sanitizeJsonString(response.data);
        data = JSON.parse(sanitizedText);
      } catch (sanitizeError) {
        console.error('Failed to parse response as JSON:', sanitizeError);
        console.error('Response text (first 500 chars):', response.data.substring(0, 500));
        throw new Error(`Invalid response format from API: ${sanitizeError.message}`);
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    
    if (!error.response) {
      throw new Error(
        'Network error: Unable to connect to the API. Please check your internet connection or try again later.'
      );
    }

    throw new Error(
      error.response?.data?.message ||
      `HTTP error! status: ${error.response.status}`
    );
  }
};

/**
 * Get products with error handling
 * @param {number} categoryId - Category ID to filter products
 * @param {number} page - Page number (default: 1)
 * @param {string} search - Search query (default: '')
 * @returns {Promise<Array>} Array of product records
 */
export const getProducts = async (categoryId = null, page = 1, search = '') => {
  try {
    const response = await fetchProducts(categoryId, page, search);
    
    if (response.success && response.data && Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && Array.isArray(response.data)) {
      // If data exists but success is different, still use it
      return response.data;
    }
    
    throw new Error(`Invalid response format: ${JSON.stringify(response)}`);
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

/**
 * Fetch branches/POS from the API
 * @returns {Promise<Object>} Response object with status and records array
 */
export const fetchBranches = async () => {
  try {
    const url = `${API_BASE_URL}/branch/getAll`;
    
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false,
      timeout: 10000,
      responseType: 'text', // Get as text first to handle potential JSON parsing issues
    });

    let data;
    
    try {
      // First try parsing without sanitization
      data = JSON.parse(response.data);
    } catch (parseError) {
      // If that fails, try sanitizing and parsing again
      try {
        const sanitizedText = sanitizeJsonString(response.data);
        data = JSON.parse(sanitizedText);
      } catch (sanitizeError) {
        console.error('Failed to parse response as JSON:', sanitizeError);
        console.error('Response text (first 500 chars):', response.data.substring(0, 500));
        throw new Error(`Invalid response format from API: ${sanitizeError.message}`);
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching branches:', error);
    
    if (!error.response) {
      throw new Error(
        'Network error: Unable to connect to the API. Please check your internet connection or try again later.'
      );
    }

    throw new Error(
      error.response?.data?.message ||
      `HTTP error! status: ${error.response.status}`
    );
  }
};

/**
 * Get branches with error handling
 * @returns {Promise<Array>} Array of branch records
 */
export const getBranches = async () => {
  try {
    const response = await fetchBranches();
    
    if ((response.status === 'sucess' || response.status === 'success') && response.records) {
      return response.records;
    } else if (response.records && Array.isArray(response.records)) {
      // If records exist but status is different, still use it
      return response.records;
    }
    
    throw new Error(`Invalid response format: ${JSON.stringify(response)}`);
  } catch (error) {
    console.error('Error getting branches:', error);
    throw error;
  }
};

