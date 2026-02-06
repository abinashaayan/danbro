// Cart utility functions

import api from './api';
import { getAccessToken } from './cookies';
import { store } from '../store/store';
import { addToGuestCart, removeFromGuestCart, updateGuestCartQuantity, setGuestCart } from '../store/guestSlice';

/**
 * Add a product to cart (guest: LocalStorage + Redux; logged-in: API)
 * @param {string} productId - The product ID to add
 * @param {number|string} quantity - The quantity to add
 * @param {{ weight?: string, productSnapshot?: object }} options - Optional weight and product snapshot for guest cart
 * @returns {Promise} API response or guest success object
 */
const CART_ICON_LOADING_EVENT = 'headerCartLoading';

export const addToCart = async (productId, quantity = 1, options = {}) => {
  window.dispatchEvent(new CustomEvent(CART_ICON_LOADING_EVENT, { detail: { loading: true } }));
  try {
    if (!productId) {
      throw new Error('ProductId is required');
    }

    const token = getAccessToken();
    if (!token) {
      store.dispatch(addToGuestCart({
        productId,
        quantity: Number(quantity) || 1,
        weight: options.weight || null,
        productSnapshot: options.productSnapshot || null,
      }));
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      return { success: true, message: 'Item added to cart', data: [] };
    }

    const payload = {
      productId: productId,
      quantity: quantity.toString(),
    };
    const response = await api.post('/cart/add', payload);
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  } finally {
    window.dispatchEvent(new CustomEvent(CART_ICON_LOADING_EVENT, { detail: { loading: false } }));
  }
};

/**
 * Get cart items (guest: from Redux/LocalStorage; logged-in: API)
 * @returns {Promise} API response with cart items or guest cart data
 */
export const getCart = async () => {
  const token = getAccessToken();
  if (!token) {
    const state = store.getState();
    const guestCart = state.guest?.guestCart ?? [];
    return { data: guestCart, success: true };
  }
  try {
    const response = await api.get('/cart/get');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

// Normalize weight for guest cart matching (null, '', 'N/A' all treated as same)
const normalizeWeight = (w) => {
  const s = (w == null ? '' : String(w)).trim();
  return s === '' || s.toLowerCase() === 'n/a' ? '__empty__' : s;
};

/**
 * Increase item count in cart (guest: Redux; logged-in: API)
 * @param {string} productId - The product ID to increase quantity
 * @param {string} [weight] - Optional weight for guest cart item
 * @returns {Promise} API response or guest success
 */
export const increaseItemCount = async (productId, weight) => {
  try {
    if (!productId) throw new Error('ProductId is required');
    const token = getAccessToken();
    if (!token) {
      const state = store.getState();
      const item = (state.guest?.guestCart ?? []).find(
        (i) => i.productId === productId && normalizeWeight(i.weight) === normalizeWeight(weight)
      );
      if (item) {
        store.dispatch(updateGuestCartQuantity({ productId, weight: item.weight, quantity: (item.quantity || 1) + 1 }));
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      }
      return { success: true };
    }
    const payload = { 
      productId: productId,
      action: 'increment'
    };
    const response = await api.patch('/cart/updateQuantity', payload);
    return response.data;
  } catch (error) {
    console.error('Error increasing item count:', error);
    throw error;
  }
};

/**
 * Decrease item count in cart (guest: Redux; logged-in: API)
 * @param {string} productId - The product ID to decrease quantity
 * @param {string} [weight] - Optional weight for guest cart item
 * @returns {Promise} API response or guest success
 */
export const decreaseItemCount = async (productId, weight) => {
  try {
    if (!productId) throw new Error('ProductId is required');
    const token = getAccessToken();
    if (!token) {
      const state = store.getState();
      const item = (state.guest?.guestCart ?? []).find(
        (i) => i.productId === productId && normalizeWeight(i.weight) === normalizeWeight(weight)
      );
      if (item) {
        const newQty = Math.max(0, (item.quantity || 1) - 1);
        store.dispatch(updateGuestCartQuantity({ productId, weight: item.weight, quantity: newQty }));
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      }
      return { success: true };
    }
    const payload = { 
      productId: productId,
      action: 'decrement'
    };
    const response = await api.patch('/cart/updateQuantity', payload);
    return response.data;
  } catch (error) {
    console.error('Error decreasing item count:', error);
    throw error;
  }
};

/**
 * Remove item from cart (guest: Redux; logged-in: API)
 * @param {string} productId - The product ID to remove
 * @param {string} [weight] - Optional weight for guest cart item
 * @returns {Promise} API response or guest success
 */
export const removeFromCart = async (productId, weight) => {
  try {
    if (!productId) throw new Error('ProductId is required');
    const token = getAccessToken();
    if (!token) {
      const state = store.getState();
      const item = (state.guest?.guestCart ?? []).find(
        (i) => i.productId === productId && normalizeWeight(i.weight) === normalizeWeight(weight)
      );
      if (item) {
        store.dispatch(removeFromGuestCart({ productId, weight: item.weight }));
      }
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      return { success: true };
    }
    const response = await api.delete(`/cart/removeItem/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

/**
 * Clear all items from cart (guest: Redux; logged-in: API)
 * @returns {Promise} API response or guest success
 */
export const clearCart = async () => {
  try {
    const token = getAccessToken();
    if (!token) {
      store.dispatch(setGuestCart([]));
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      return { success: true };
    }
    const response = await api.delete('/cart/clear');
    return response.data;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

