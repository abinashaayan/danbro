import { EXTERNAL_API_BASE_URL, EXTERNAL_API_ACCESS_KEY, API_BASE_URL } from './apiUrl';
import axios from 'axios';
import { getStoredLocation } from './location';
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from './cookies';

/**
 * POST /api/user/refreshToken – get new access (and optionally refresh) token using refresh token
 * @param {string} [refreshToken] - Refresh token (defaults to cookie value)
 * @returns {Promise<{ accessToken: string, refreshToken?: string }>}
 */
export const refreshTokenApi = async (refreshToken = getRefreshToken()) => {
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  const response = await axios.post(
    `${API_BASE_URL}/user/refreshToken`,
    { refreshToken },
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: false,
      timeout: 15000,
    }
  );
  const data = response?.data?.data || response?.data;
  const newAccessToken = data?.accessToken || data?.token;
  const newRefreshToken = data?.refreshToken;
  if (!newAccessToken) {
    throw new Error(response?.data?.message || 'Refresh token failed');
  }
  setAccessToken(newAccessToken);
  if (newRefreshToken) setRefreshToken(newRefreshToken);
  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

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
    if (orderData.couponCode) payload.couponCode = orderData.couponCode;

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
    if (orderData.couponCode) payload.couponCode = orderData.couponCode;

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
 * Initiate order for GUEST (no auth token)
 * @param {Object} orderData
 * @param {Array<{ productId: string, quantity: number }>} orderData.cart - Cart items
 * @param {Object} orderData.deliveryAddress - Full delivery address
 * @param {string} orderData.paymentMode - UPI, COD, etc.
 * @param {string} [orderData.couponCode] - Optional coupon code
 * @returns {Promise} Order initiation response
 */
export const initiateOrderGuest = async (orderData) => {
  try {
    const location = getStoredLocation();

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'lat': String(location.lat),
      'long': String(location.long),
    };
    // No Authorization header for guest

    const payload = {
      orderFor: 'GUEST',
      cart: orderData.cart.map((item) => ({
        productId: item.productId,
        quantity: Number(item.quantity) || 1,
      })),
      deliveryAddress: {
        name: orderData.deliveryAddress.name,
        phone: orderData.deliveryAddress.phone,
        houseNumber: orderData.deliveryAddress.houseNumber || '',
        streetName: orderData.deliveryAddress.streetName || '',
        area: orderData.deliveryAddress.area || '',
        landmark: orderData.deliveryAddress.landmark || '',
        city: orderData.deliveryAddress.city || '',
        state: orderData.deliveryAddress.state || '',
        zipCode: orderData.deliveryAddress.zipCode || '',
        coordinates: {
          lat: Number(location.lat),
          long: Number(location.long),
        },
      },
      paymentMode: orderData.paymentMode,
    };
    if (orderData.couponCode) payload.couponCode = orderData.couponCode;

    const response = await axios.post(`${API_BASE_URL}/order/initiate`, payload, {
      headers,
      withCredentials: false,
      timeout: 30000,
    });

    return response.data;
  } catch (error) {
    console.error('Error initiating order (GUEST):', error);

    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error('Request timeout. Please try again.');
    }

    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error;

      switch (status) {
        case 400:
          throw new Error(message || 'Invalid order data. Please check your information.');
        case 403:
          throw new Error(message || 'You do not have permission to place orders.');
        case 500:
          throw new Error(message || 'Server error. Please try again later.');
        default:
          throw new Error(message || `Order initiation failed (${status}). Please try again.`);
      }
    }

    throw new Error(error.message || 'Failed to initiate order. Please try again.');
  }
};

/**
 * Verify payment for an order (backend expects intentId in path)
 * @param {string} intentId - Razorpay intent ID (e.g. plink_xxx) to verify
 * @returns {Promise} Payment verification response
 */
export const verifyOrderPayment = async (intentId) => {
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

    // GET /api/order/verify/:intentId
    const response = await axios.get(`${API_BASE_URL}/order/verify/${intentId}`, {
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
 * Verify payment for a GUEST order (no auth token)
 * @param {string} intentId - Razorpay intent ID (e.g. plink_xxx) to verify
 * @returns {Promise} Payment verification response
 */
export const verifyOrderPaymentGuest = async (intentId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/order/verify/${intentId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        withCredentials: false,
        timeout: 30000,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error verifying guest order payment:', error);
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error('Request timeout. Please try again.');
    }
    if (error.response) {
      const message = error.response.data?.message || error.response.data?.error;
      throw new Error(message || `Payment verification failed (${error.response.status}). Please try again.`);
    }
    throw new Error(error.message || 'Failed to verify payment. Please try again.');
  }
};

/**
 * Get all coupons
 * GET /api/coupon/getAll (optional auth)
 * @returns {Promise<{ data: Array }>} API response with data array of coupons
 */
export const getAllCoupons = async () => {
  try {
    const location = getStoredLocation();
    const token = getAccessToken();
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'lat': String(location.lat),
      'long': String(location.long),
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await axios.get(`${API_BASE_URL}/coupon/getAll`, {
      headers,
      withCredentials: false,
      timeout: 15000,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.response?.data?.error || error.message;
    throw new Error(message || 'Failed to fetch coupons.');
  }
};

/**
 * Validate coupon (guest: no token; logged-in: with token)
 * POST /api/coupon/validate with body { couponCode, cart: [{ productId, quantity }] }
 * @param {string} couponCode - Coupon code to validate
 * @param {Array<{ productId: string, quantity: number }>} cart - Cart items
 * @returns {Promise} Validation response with discount details
 */
export const validateCoupon = async (couponCode, cart) => {
  try {
    const location = getStoredLocation();
    const token = getAccessToken();

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'lat': String(location.lat),
      'long': String(location.long),
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const payload = {
      couponCode: couponCode.trim(),
      cart: (cart || []).map((item) => ({
        productId: item.productId,
        quantity: Number(item.quantity) || 1,
      })),
    };

    const response = await axios.post(`${API_BASE_URL}/coupon/validate`, payload, {
      headers,
      withCredentials: false,
      timeout: 15000,
    });

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.response?.data?.error || error.message;
    throw new Error(message || 'Failed to validate coupon.');
  }
};

/**
 * Track order by order ID
 * GET /api/order/track/:orderId (works for guest and logged-in; send Authorization if token present)
 * @param {string} orderId - Order ID to track
 * @returns {Promise} Order tracking response with status, delivery address, items, etc.
 */
export const trackOrder = async (orderId) => {
  try {
    const location = getStoredLocation();
    const token = getAccessToken();

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'lat': String(location.lat),
      'long': String(location.long),
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await axios.get(`${API_BASE_URL}/order/track/${orderId}`, {
      headers,
      withCredentials: false,
      timeout: 15000,
    });

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.response?.data?.error || error.message;
    throw new Error(message || 'Failed to track order. Please check the order ID and try again.');
  }
};

/**
 * Get all orders for current user (no pagination)
 * GET /api/order/getAllOrders (requires auth)
 * @returns {Promise<any>} API response
 */
export const getAllOrders = async () => {
  try {
    const token = getAccessToken();
    if (!token) throw new Error('Authentication required. Please login.');

    const response = await axios.get(`${API_BASE_URL}/order/getAllOrders`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
      timeout: 30000,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.response?.data?.error || error.message;
    throw new Error(message || 'Failed to fetch orders.');
  }
};

/**
 * Get current user's orders with pagination
 * GET /api/order/getMyOrders?page=1&limit=10 (requires auth)
 * @param {number} page - 1-based page
 * @param {number} limit - items per page
 * @returns {Promise<any>} API response { data, count, ... }
 */
export const getMyOrders = async (page = 1, limit = 10) => {
  try {
    const token = getAccessToken();
    if (!token) throw new Error('Authentication required. Please login.');

    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    const response = await axios.get(`${API_BASE_URL}/order/getMyOrders?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
      timeout: 30000,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.response?.data?.error || error.message;
    throw new Error(message || 'Failed to fetch orders.');
  }
};

/**
 * Add a product to recently viewed (requires auth)
 * POST /api/product/addToRecentlyViewed/:productId
 * @param {string} productId
 * @returns {Promise<any>}
 */
export const addToRecentlyViewed = async (productId) => {
  try {
    const token = getAccessToken();
    if (!token) throw new Error('Authentication required. Please login.');

    const response = await axios.post(
      `${API_BASE_URL}/product/addToRecentlyViewed/${productId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: false,
        timeout: 15000,
      }
    );

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.response?.data?.error || error.message;
    throw new Error(message || 'Failed to add recently viewed item.');
  }
};

/**
 * Get recently viewed products (requires auth)
 * GET /api/product/getRecentlyViewed
 * @returns {Promise<any>}
 */
export const getRecentlyViewed = async () => {
  try {
    const token = getAccessToken();
    if (!token) throw new Error('Authentication required. Please login.');

    const response = await axios.get(`${API_BASE_URL}/product/getRecentlyViewed`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
      timeout: 20000,
    });

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.response?.data?.error || error.message;
    throw new Error(message || 'Failed to fetch recently viewed items.');
  }
};

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
    const token = getAccessToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const response = await axios.post(
      `${API_BASE_URL}/location/checkServiceAvailability`,
      {
        latitude: String(latitude),
        longitude: String(longitude),
      },
      {
        headers,
        timeout: 15000,
      }
    );
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Unable to check service availability. Please try again.';
    return { success: false, message };
  }
};

// Dedupe in-flight category/getAll so multiple components don't fire parallel requests
let categoriesFetchPromise = null;

/**
 * Fetch item categories from the external API (single in-flight request)
 * @returns {Promise<Object>} Response object with status and records array
 */
export const fetchItemCategories = async () => {
  if (categoriesFetchPromise) return categoriesFetchPromise;

  categoriesFetchPromise = (async () => {
    try {
      const url = getApiUrl();
      const location = getStoredLocation();
      const token = getAccessToken();

      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'lat': location.lat.toString(),
        'long': location.long.toString(),
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await axios.get(url, {
        headers,
        withCredentials: false,
        timeout: 15000,
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching item categories:', error);
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        throw new Error(
          'Request timeout. Please try again or check your network connection.'
        );
      }
      if (!error.response) {
        if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
          throw new Error('Network error. Please check your internet connection.');
        }
        throw new Error('Network error. Please try again later.');
      }
      throw new Error(
        error.response?.data?.message || `HTTP error! status: ${error.response.status}`
      );
    } finally {
      categoriesFetchPromise = null;
    }
  })();

  return categoriesFetchPromise;
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
 * Search products via GET /product/search
 * Matches: ?search=cake and ?minPrice=400&maxPrice=600 with lat/long headers
 * @param {string} search - Search query (optional); when empty, only price/category applied
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Number of items per page (default: 20)
 * @param {number|null} minPrice - Min price filter (optional)
 * @param {number|null} maxPrice - Max price filter (optional)
 * @param {string|null} categoryId - Category filter (optional)
 * @returns {Promise<Object>} Response with data (array), and optional pagination or meta
 */
export const fetchProductSearch = async (search, page = 1, limit = 20, minPrice = null, maxPrice = null, categoryId = null) => {
  const location = getStoredLocation();
  const token = getAccessToken();
  const params = new URLSearchParams();
  if (search && String(search).trim()) params.append('search', String(search).trim());
  if (page != null) params.append('page', String(page));
  if (limit != null) params.append('limit', String(limit));
  if (minPrice != null && minPrice !== '') params.append('minPrice', String(minPrice));
  if (maxPrice != null && maxPrice !== '') params.append('maxPrice', String(maxPrice));
  if (categoryId) params.append('categoryId', String(categoryId));
  const url = `${API_BASE_URL}/product/search?${params.toString()}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'lat': location.lat.toString(),
    'long': location.long.toString(),
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  const response = await axios.get(url, {
    headers,
    withCredentials: false,
    timeout: 15000,
  });
  return response.data;
};

/**
 * Fetch products by category from the API (getProductsByCategory)
 * @param {string} categoryId - Category ID
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Number of items per page (default: 20)
 * @param {string} search - Search query (default: '')
 * @returns {Promise<Object>} Response object with success, data array, pagination
 */
export const fetchProductsByCategory = async (categoryId, page = 1, limit = 20, search = '') => {
  const location = getStoredLocation();
  const token = getAccessToken();
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (limit) params.append('limit', limit.toString());
  if (search) params.append('search', search);
  const query = params.toString();
  const url = `${API_BASE_URL}/product/getProductsByCategory/${encodeURIComponent(categoryId)}${query ? `?${query}` : ''}`;

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'lat': location.lat.toString(),
    'long': location.long.toString(),
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await axios.get(url, {
    headers,
    withCredentials: false,
    timeout: 15000,
  });
  return response.data;
};

/**
 * Fetch products from the API (uses getProductsByCategory when categoryId is set)
 * @param {number|string} categoryId - Category ID to filter products
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Number of items per page (default: 20)
 * @param {string} search - Search query (default: '')
 * @returns {Promise<Object>} Response object with success, message, meta, and data array
 */
export const fetchProducts = async (categoryId = null, page = 1, limit = 20, search = '') => {
  try {
    if (categoryId != null && categoryId !== '') {
      return await fetchProductsByCategory(String(categoryId), page, limit, search);
    }

    const baseUrl = `${API_BASE_URL}/product/getAll`;
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    params.append('search', search);
    const url = `${baseUrl}?${params.toString()}`;
    const location = getStoredLocation();
    const token = getAccessToken();

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'lat': location.lat.toString(),
      'long': location.long.toString(),
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.get(url, {
      headers,
      withCredentials: false,
      timeout: 15000,
    });

    return response.data;
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
    const token = getAccessToken();
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'lat': location.lat.toString(),
      'long': location.long.toString(),
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const response = await axios.get(url, {
      headers,
      withCredentials: false,
      timeout: 15000,
    });

    return response.data;
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

// In-flight promise for homeLayout to dedupe concurrent calls (e.g. Navbar, MainLayout, NavbarDropdown)
let homeLayoutFetchPromise = null;

/**
 * Fetch home layout data from the API (deduped: concurrent callers share one request)
 * @returns {Promise<Object>} Response object with menus, categories, and products
 */
export const fetchHomeLayout = async () => {
  if (homeLayoutFetchPromise) {
    return homeLayoutFetchPromise;
  }
  homeLayoutFetchPromise = (async () => {
    try {
      const url = `${API_BASE_URL}/product/homeLayout`;
      const location = getStoredLocation();
      const token = getAccessToken();

      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'lat': location.lat.toString(),
        'long': location.long.toString(),
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await axios.get(url, {
        headers,
        withCredentials: false,
        timeout: 15000,
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
    } finally {
      homeLayoutFetchPromise = null;
    }
  })();
  return homeLayoutFetchPromise;
};

/**
 * Invalidate home layout in-flight request so next fetch uses current token (e.g. after login).
 * Call this after login so homeLayout is refetched with Authorization header.
 */
export const invalidateHomeLayoutFetch = () => {
  homeLayoutFetchPromise = null;
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
    const token = getAccessToken();

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'lat': location.lat.toString(),
      'long': location.long.toString(),
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.get(url, {
      headers,
      withCredentials: false,
      timeout: 15000,
    });

    return response.data;
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

/**
 * Submit contact form
 * POST /api/contact
 * @param {Object} contactData - Contact form data
 * @param {string} contactData.firstName - First name
 * @param {string} contactData.lastName - Last name
 * @param {string} contactData.email - Email address
 * @param {string} contactData.phone - Phone number
 * @param {string} contactData.message - Message/query
 * @returns {Promise<Object>} Response object
 */
export const submitContact = async (contactData) => {
  try {
    const location = getStoredLocation();
    const token = getAccessToken();
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'lat': location.lat.toString(),
      'long': location.long.toString(),
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const payload = {
      firstName: contactData.firstName || "",
      lastName: contactData.lastName || "",
      email: contactData.email || "",
      phone: contactData.phone || "",
      message: contactData.message || "",
    };
    
    const response = await axios.post(`${API_BASE_URL}/contact`, payload, {
      headers,
      withCredentials: false,
      timeout: 30000,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error('Request timeout: The server is taking too long to respond. Please try again.');
    }
    
    if (!error.response) {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
    }
    
    throw new Error(
      error.response?.data?.message ||
      error.response?.data?.error ||
      `Failed to submit contact form. Status: ${error.response.status}`
    );
  }
};

/**
 * Subscribe to newsletter
 * POST /api/newsletter/subscribe
 * @param {string} email - Email address to subscribe
 * @returns {Promise<Object>} Response object
 */
export const subscribeNewsletter = async (email) => {
  try {
    const location = getStoredLocation();
    const token = getAccessToken();
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'lat': location.lat.toString(),
      'long': location.long.toString(),
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const payload = {
      email: email.trim(),
    };
    
    const response = await axios.post(`${API_BASE_URL}/newsletter/subscribe`, payload, {
      headers,
      withCredentials: false,
      timeout: 15000,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error('Request timeout: The server is taking too long to respond. Please try again.');
    }
    
    if (!error.response) {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
    }
    
    throw new Error(
      error.response?.data?.message ||
      error.response?.data?.error ||
      `Failed to subscribe to newsletter. Status: ${error.response.status}`
    );
  }
};

/**
 * Get all FAQs
 * GET /api/faq/getAll
 * @returns {Promise<Object>} Response object with FAQs array
 */
export const getAllFAQs = async () => {
  try {
    const location = getStoredLocation();
    const token = getAccessToken();
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'lat': location.lat.toString(),
      'long': location.long.toString(),
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const response = await axios.get(`${API_BASE_URL}/faq/getAll`, {
      headers,
      withCredentials: false,
      timeout: 15000,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error('Request timeout: The server is taking too long to respond. Please try again.');
    }
    
    if (!error.response) {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
    }
    
    throw new Error(
      error.response?.data?.message ||
      error.response?.data?.error ||
      `Failed to fetch FAQs. Status: ${error.response.status}`
    );
  }
};
