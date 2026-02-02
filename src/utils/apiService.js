import { EXTERNAL_API_BASE_URL, EXTERNAL_API_ACCESS_KEY, API_BASE_URL } from './apiUrl';
import axios from 'axios';
import { getStoredLocation } from './location';
import { getAccessToken } from './cookies';

/**
 * Initiate order for SELF delivery
 * @param {Object} orderData - Order data
 * @param {string} orderData.addressId - Address ID for delivery
 * @param {string} orderData.paymentMode - Payment mode (UPI, COD, etc.)
 * @param {string} orderData.instructions - Delivery instructions
 * @returns {Promise} Order initiation response
 */
export const initiateOrderSelf = async (orderData) => {
  try {
    const location = getStoredLocation();
    const token = getAccessToken();
    
    if (!token) {
      throw new Error('Authentication required. Please login.');
    }
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'lat': location.lat.toString(),
      'long': location.long.toString(),
    };
    
    const payload = {
      orderFor: "SELF",
      addressId: orderData.addressId,
      paymentMode: orderData.paymentMode,
      instructions: orderData.instructions || "",
    };
    
    const response = await axios.post(`${API_BASE_URL}/order/initiate`, payload, {
      headers,
      withCredentials: false,
      timeout: 30000,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error initiating order (SELF):', error);
    
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error('Request timeout: The server is taking too long to respond. Please try again.');
    }
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error;
      
      switch (status) {
        case 400:
          throw new Error(message || 'Invalid order data. Please check your information.');
        case 401:
          throw new Error('Authentication expired. Please login again.');
        case 403:
          throw new Error('You do not have permission to place orders.');
        case 404:
          throw new Error('Address not found. Please select a valid delivery address.');
        case 500:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(message || `Order initiation failed (${status}). Please try again.`);
      }
    }
    
    throw new Error(error.message || 'Failed to initiate order. Please try again.');
  }
};

/**
 * Initiate order for OTHER delivery
 * @param {Object} orderData - Order data
 * @param {Object} orderData.deliveryAddress - Delivery address details
 * @param {string} orderData.paymentMode - Payment mode (UPI, COD, etc.)
 * @param {string} orderData.instructions - Delivery instructions
 * @returns {Promise} Order initiation response
 */
export const initiateOrderOther = async (orderData) => {
  try {
    const location = getStoredLocation();
    const token = getAccessToken();
    
    if (!token) {
      throw new Error('Authentication required. Please login.');
    }
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'lat': location.lat.toString(),
      'long': location.long.toString(),
    };
    
    const payload = {
      orderFor: "OTHER",
      deliveryAddress: {
        name: orderData.deliveryAddress.name,
        phone: orderData.deliveryAddress.phone,
        houseNumber: orderData.deliveryAddress.houseNumber || "",
        streetName: orderData.deliveryAddress.streetName || "",
        area: orderData.deliveryAddress.area || "",
        landmark: orderData.deliveryAddress.landmark || "",
        city: orderData.deliveryAddress.city || "",
        state: orderData.deliveryAddress.state || "",
        zipCode: orderData.deliveryAddress.zipCode || "",
        coordinates: {
          lat: location.lat,
          long: location.long
        }
      },
      paymentMode: orderData.paymentMode,
      instructions: orderData.instructions || "",
    };
    
    const response = await axios.post(`${API_BASE_URL}/order/initiate`, payload, {
      headers,
      withCredentials: false,
      timeout: 30000,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error initiating order (OTHER):', error);
    
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error('Request timeout: The server is taking too long to respond. Please try again.');
    }
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error;
      
      switch (status) {
        case 400:
          throw new Error(message || 'Invalid order data. Please check your information.');
        case 401:
          throw new Error('Authentication expired. Please login again.');
        case 403:
          throw new Error('You do not have permission to place orders.');
        case 500:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(message || `Order initiation failed (${status}). Please try again.`);
      }
    }
    
    throw new Error(error.message || 'Failed to initiate order. Please try again.');
  }
};

/**
 * Verify payment for an order
 * @param {string} orderId - Order ID to verify
 * @returns {Promise} Payment verification response
 */
export const verifyOrderPayment = async (orderId) => {
  try {
    const token = getAccessToken();
    
    if (!token) {
      throw new Error('Authentication required. Please login.');
    }
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    
    const response = await axios.post(`${API_BASE_URL}/order/verify?orderId=${orderId}`, {}, {
      headers,
      withCredentials: false,
      timeout: 30000,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error('Request timeout: The server is taking too long to respond. Please try again.');
    }
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error;
      
      switch (status) {
        case 400:
          throw new Error(message || 'Invalid payment verification request.');
        case 401:
          throw new Error('Authentication expired. Please login again.');
        case 404:
          throw new Error('Order not found. Please check your order ID.');
        case 500:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(message || `Payment verification failed (${status}). Please try again.`);
      }
    }
    
    throw new Error(error.message || 'Failed to verify payment. Please try again.');
  }
};


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

/**
 * Get the API URL for category endpoint
 */
const getApiUrl = () => {
  return `${API_BASE_URL}/category/getAll`;
};

/**
 * Check if delivery service is available at given coordinates
 * @param {string|number} latitude
 * @param {string|number} longitude
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const checkServiceAvailability = async (latitude, longitude) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/location/checkServiceAvailability`,
      {
        latitude: String(latitude),
        longitude: String(longitude),
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000,
      }
    );
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Unable to check service availability. Please try again.';
    return { success: false, message };
  }
};

/**
 * Fetch item categories from the external API
 * @returns {Promise<Object>} Response object with status and records array
 */
export const fetchItemCategories = async () => {
  try {
    const url = getApiUrl();
    const location = getStoredLocation();

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'lat': location.lat.toString(),
        'long': location.long.toString(),
      },
      withCredentials: false,
      timeout: 30000, // Increased to 30 seconds to handle slower network conditions
    });

    return response.data;

  } catch (error) {
    console.error('Error fetching item categories:', error);

    // Handle timeout errors specifically
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error(
        'Request timeout: The server is taking too long to respond. Please try again or check your network connection.'
      );
    }

    if (!error.response) {
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        throw new Error(
          'Network error: Unable to connect to the API. Please check your internet connection or try again later.'
        );
      }
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
 * @param {number} limit - Number of items per page (default: 20)
 * @param {string} search - Search query (default: '')
 * @returns {Promise<Object>} Response object with success, message, meta, and data array
 */
export const fetchProducts = async (categoryId = null, page = 1, limit = 20, search = '') => {
  try {
    const baseUrl = `${API_BASE_URL}/product/getAll`;
    const params = new URLSearchParams();
    
    if (categoryId) {
      params.append('category', categoryId.toString());
    }
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    params.append('search', search);
    
    const url = `${baseUrl}?${params.toString()}`;
    const location = getStoredLocation();
    
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'lat': location.lat.toString(),
        'long': location.long.toString(),
      },
      withCredentials: false,
      timeout: 30000, // Increased to 30 seconds to handle slower network conditions
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
    
    // Handle timeout errors specifically
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error(
        'Request timeout: The server is taking too long to respond. Please try again or check your network connection.'
      );
    }
    
    // Handle network errors
    if (!error.response) {
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        throw new Error(
          'Network error: Unable to connect to the API. Please check your internet connection or try again later.'
        );
      }
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
 * @param {number} limit - Number of items per page (default: 20)
 * @param {string} search - Search query (default: '')
 * @returns {Promise<Array>} Array of product records
 */
export const getProducts = async (categoryId = null, page = 1, limit = 20, search = '') => {
  try {
    const response = await fetchProducts(categoryId, page, limit, search);
    
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
    const location = getStoredLocation();
    
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'lat': location.lat.toString(),
        'long': location.long.toString(),
      },
      withCredentials: false,
      timeout: 30000, // Increased to 30 seconds to handle slower network conditions
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
    
    // Handle timeout errors specifically
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error(
        'Request timeout: The server is taking too long to respond. Please try again or check your network connection.'
      );
    }
    
    // Handle network errors
    if (!error.response) {
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        throw new Error(
          'Network error: Unable to connect to the API. Please check your internet connection or try again later.'
        );
      }
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

/**
 * Add a new address
 * @param {Object} addressData - Address data
 * @param {string} addressData.addressType - Address type (Home, Work, etc.)
 * @param {string} addressData.zipCode - Zip code
 * @param {string} addressData.houseNumber - House number
 * @param {string} addressData.streetName - Street name
 * @param {string} addressData.area - Area
 * @param {string} addressData.landmark - Landmark
 * @param {string} addressData.city - City
 * @param {string} addressData.state - State
 * @param {boolean} addressData.isDefault - Is default address
 * @param {Object} addressData.currentAddress - Current address coordinates
 * @returns {Promise<Object>} Response object
 */
export const addAddress = async (addressData) => {
  try {
    const url = `${API_BASE_URL}/address/add`;
    const location = getStoredLocation();
    const token = getAccessToken();
    
    if (!token) {
      throw new Error('Authentication required. Please login.');
    }
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'lat': location.lat.toString(),
      'long': location.long.toString(),
    };
    
    const response = await axios.post(url, addressData, {
      headers,
      withCredentials: false,
      timeout: 30000,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error adding address:', error);
    
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error('Request timeout: The server is taking too long to respond. Please try again.');
    }
    
    if (!error.response) {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
    }
    
    throw new Error(
      error.response?.data?.message ||
      error.response?.data?.error ||
      `Failed to add address. Status: ${error.response.status}`
    );
  }
};

/**
 * Get all addresses for the current user
 * @returns {Promise<Array>} Array of address objects
 */
export const getMyAddresses = async () => {
  try {
    const url = `${API_BASE_URL}/address/myAddresses`;
    const location = getStoredLocation();
    const token = getAccessToken();
    
    if (!token) {
      throw new Error('Authentication required. Please login.');
    }
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'lat': location.lat.toString(),
      'long': location.long.toString(),
    };
    
    const response = await axios.get(url, {
      headers,
      withCredentials: false,
      timeout: 30000,
    });
    
    // Handle different response structures
    if (response.data?.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (response.data?.addresses && Array.isArray(response.data.addresses)) {
      return response.data.addresses;
    } else if (Array.isArray(response.data)) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching addresses:', error);
    
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error('Request timeout: The server is taking too long to respond. Please try again.');
    }
    
    if (!error.response) {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
    }
    
    throw new Error(
      error.response?.data?.message ||
      error.response?.data?.error ||
      `Failed to fetch addresses. Status: ${error.response.status}`
    );
  }
};

/**
 * Update an existing address
 * @param {string} addressId - Address ID to update
 * @param {Object} addressData - Updated address data
 * @returns {Promise<Object>} Response object
 */
export const updateAddress = async (addressId, addressData) => {
  try {
    const url = `${API_BASE_URL}/address/update/${addressId}`;
    const location = getStoredLocation();
    const token = getAccessToken();
    
    if (!token) {
      throw new Error('Authentication required. Please login.');
    }
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'lat': location.lat.toString(),
      'long': location.long.toString(),
    };
    
    const response = await axios.put(url, addressData, {
      headers,
      withCredentials: false,
      timeout: 30000,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error updating address:', error);
    
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error('Request timeout: The server is taking too long to respond. Please try again.');
    }
    
    if (!error.response) {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
    }
    
    throw new Error(
      error.response?.data?.message ||
      error.response?.data?.error ||
      `Failed to update address. Status: ${error.response.status}`
    );
  }
};

/**
 * Delete an address
 * @param {string} addressId - Address ID to delete
 * @returns {Promise<Object>} Response object
 */
export const deleteAddress = async (addressId) => {
  try {
    const url = `${API_BASE_URL}/address/delete/${addressId}`;
    const location = getStoredLocation();
    const token = getAccessToken();
    
    if (!token) {
      throw new Error('Authentication required. Please login.');
    }
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'lat': location.lat.toString(),
      'long': location.long.toString(),
    };
    
    const response = await axios.delete(url, {
      headers,
      withCredentials: false,
      timeout: 30000,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error deleting address:', error);
    
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error('Request timeout: The server is taking too long to respond. Please try again.');
    }
    
    if (!error.response) {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
    }
    
    throw new Error(
      error.response?.data?.message ||
      error.response?.data?.error ||
      `Failed to delete address. Status: ${error.response.status}`
    );
  }
};

/**
 * Submit contact form data
 * @param {Object} contactData - Contact form data
 * @param {string} contactData.firstName - First name
 * @param {string} contactData.lastName - Last name
 * @param {string} contactData.email - Email address
 * @param {string} contactData.phone - Phone number
 * @param {string} contactData.message - Message/query
 * @returns {Promise<Object>} Response object
 */
export const submitContactForm = async (contactData) => {
  try {
    const url = `${API_BASE_URL}/address/add`;
    const location = getStoredLocation();
    
    // Get access token if available (for authenticated users)
    const token = getAccessToken();
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'lat': location.lat.toString(),
      'long': location.long.toString(),
    };
    
    // Add authorization header if token is available
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    // Prepare payload - using address API structure as shown in Postman request
    const payload = {
      addressType: "Contact",
      zipCode: "000000", // Default zipcode for contact form
      houseNumber: contactData.firstName || "",
      streetName: contactData.lastName || "",
      area: contactData.email || "",
      landmark: contactData.phone || "",
      city: contactData.message || "",
      state: "Contact Form Submission",
      isDefault: false,
      currentAddress: {
        type: "Point",
        coordinates: [location.long, location.lat] // [longitude, latitude]
      }
    };
    
    const response = await axios.post(url, payload, {
      headers,
      withCredentials: false,
      timeout: 30000,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    // Handle timeout errors
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error(
        'Request timeout: The server is taking too long to respond. Please try again.'
      );
    }
    
    // Handle network errors
    if (!error.response) {
      throw new Error(
        'Network error: Unable to connect to the server. Please check your internet connection.'
      );
    }
    
    throw new Error(
      error.response?.data?.message ||
      error.response?.data?.error ||
      `Failed to submit contact form. Status: ${error.response.status}`
    );
  }
};

/**
 * Fetch home layout data from the API
 * @returns {Promise<Object>} Response object with menus, categories, and products
 */
export const fetchHomeLayout = async () => {
  try {
    const url = `${API_BASE_URL}/product/homeLayout`;
    const location = getStoredLocation();
    
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'lat': location.lat.toString(),
        'long': location.long.toString(),
      },
      withCredentials: false,
      timeout: 30000,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching home layout:', error);
    
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error(
        'Request timeout: The server is taking too long to respond. Please try again or check your network connection.'
      );
    }
    
    if (!error.response) {
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        throw new Error(
          'Network error: Unable to connect to the API. Please check your internet connection or try again later.'
        );
      }
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
 * Fetch product by ID from the API
 * @param {string} productId - Product ID
 * @returns {Promise<Object>} Response object with product data
 */
export const fetchProductById = async (productId) => {
  try {
    const url = `${API_BASE_URL}/product/getById/${productId}`;
    const location = getStoredLocation();
    
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'lat': location.lat.toString(),
        'long': location.long.toString(),
      },
      withCredentials: false,
      timeout: 30000,
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
    console.error('Error fetching product by ID:', error);
    
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error(
        'Request timeout: The server is taking too long to respond. Please try again or check your network connection.'
      );
    }
    
    if (!error.response) {
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        throw new Error(
          'Network error: Unable to connect to the API. Please check your internet connection or try again later.'
        );
      }
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
