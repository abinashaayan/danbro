import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, addToCart, increaseItemCount, decreaseItemCount, removeFromCart, clearCart } from '../utils/cart';
import { getAccessToken } from '../utils/cookies';

/**
 * Async thunk for loading cart items
 */
export const loadCartItems = createAsyncThunk(
  'cart/loadItems',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      const response = await getCart();

      if (!token) {
        // Guest cart: response.data is array of { productId, quantity, weight, productSnapshot }
        const rawItems = response?.data && Array.isArray(response.data) ? response.data : [];
        const displayItems = [];
        for (const it of rawItems) {
          let name, images, price, lineTotal, displayWeight = it.weight ?? it.productSnapshot?.weight ?? "N/A";
          const qty = Number(it.quantity) || 1;
          const itemWeight = it.weight ?? it.productSnapshot?.weight ?? null;
          // Guest cart: use only productSnapshot from localStorage – no product API calls
          if (it.productSnapshot && (it.productSnapshot.name != null || it.productSnapshot.price != null)) {
            const p = it.productSnapshot;
            if (displayWeight === "N/A" && p.weight) displayWeight = p.weight;
            const priceArr = Array.isArray(p.price) ? p.price : [];
            const matchWeight = (pw) => (pw || "").toString().trim().toLowerCase();
            const matchedPrice = itemWeight && priceArr.length > 0
              ? priceArr.find((pr) => matchWeight(pr.weight) === matchWeight(itemWeight))
              : null;
            const firstPrice = matchedPrice || (priceArr[0] || null);
            const rate = firstPrice != null
              ? (Number(firstPrice.rate) || Number(firstPrice.mrp) || 0)
              : (typeof p.price === "number" ? p.price : 0);
            name = p.name || "Product";
            images = Array.isArray(p.images) ? p.images : (p.image ? [{ url: p.image }] : []);
            price = firstPrice ? { rate: Number(firstPrice.rate) || Number(firstPrice.mrp) || 0, mrp: Number(firstPrice.mrp) || Number(firstPrice.rate) || 0 } : { rate, mrp: rate };
            lineTotal = rate * qty;
          } else {
            // No productSnapshot: use fallback only (no API call in guest mode)
            name = "Product";
            images = [];
            price = { rate: 0, mrp: 0 };
            lineTotal = 0;
          }
          displayItems.push({
            productId: it.productId,
            id: it.productId,
            quantity: qty,
            weight: displayWeight,
            rawWeight: it.weight ?? null,
            name,
            images,
            price,
            lineTotal: Number(lineTotal.toFixed(2)),
          });
        }
        const cartTotal = displayItems.reduce((sum, i) => sum + (i.lineTotal || 0), 0);
        return { items: displayItems, cartTotal, isGuest: true };
      }

      // Logged-in: API response
      let items = [];
      let cartTotal = 0;
      
      if (response?.data && Array.isArray(response.data)) {
        items = response.data;
        if (response.cartTotal !== undefined) cartTotal = response.cartTotal;
      } else if (response?.data?.data && Array.isArray(response.data.data)) {
        items = response.data.data;
        if (response.data.cartTotal !== undefined) cartTotal = response.data.cartTotal;
      } else if (response?.data?.items) {
        items = response.data.items;
        if (response.data.cartTotal !== undefined) cartTotal = response.data.cartTotal;
      } else if (response?.items) {
        items = response.items;
      } else if (Array.isArray(response)) {
        items = response;
      }

      const apiSubtotal = response?.subtotal != null ? Number(response.subtotal) : null;
      const apiTaxTotal = response?.taxTotal != null ? Number(response.taxTotal) : null;
      const apiDiscount = response?.discount != null ? Number(response.discount) : null;
      const apiFinalAmount = response?.finalAmount != null ? Number(response.finalAmount) : null;
      if (apiFinalAmount != null && cartTotal === 0) cartTotal = apiFinalAmount;
      if (apiSubtotal != null && cartTotal === 0) cartTotal = apiSubtotal;

      return {
        items,
        cartTotal,
        isGuest: false,
        cartSubtotal: apiSubtotal,
        cartTaxTotal: apiTaxTotal,
        cartDiscount: apiDiscount,
        cartFinalAmount: apiFinalAmount,
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to load cart';
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk for updating item quantity
 */
export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ productId, change, weight }, { rejectWithValue }) => {
    try {
      if (change > 0) {
        await increaseItemCount(productId, weight);
      } else {
        await decreaseItemCount(productId, weight);
      }
      return { productId, change, weight };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update quantity';
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk for removing item from cart
 */
export const removeCartItem = createAsyncThunk(
  'cart/removeItem',
  async ({ productId, weight }, { rejectWithValue }) => {
    try {
      await removeFromCart(productId, weight);
      return { productId, weight };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to remove item';
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk for clearing cart
 */
export const clearCartItems = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await clearCart();
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to clear cart';
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  items: [],
  cartTotal: 0,
  loading: false,
  error: null,
  updatingItems: new Set(),
  updatingAction: {},
  isGuest: false,
  cartSubtotal: null,
  cartTaxTotal: null,
  cartDiscount: null,
  cartFinalAmount: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setUpdatingItem: (state, action) => {
      const { productId, weight, action: updateAction } = action.payload;
      const itemKey = `${productId ?? ""}|${weight ?? ""}`;
      state.updatingItems.add(itemKey);
      state.updatingAction[itemKey] = updateAction;
    },
    clearUpdatingItem: (state, action) => {
      const { productId, weight } = action.payload;
      const itemKey = `${productId ?? ""}|${weight ?? ""}`;
      state.updatingItems.delete(itemKey);
      delete state.updatingAction[itemKey];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load cart items
      .addCase(loadCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.cartTotal = action.payload.cartTotal;
        state.isGuest = action.payload.isGuest;
        state.cartSubtotal = action.payload.cartSubtotal ?? null;
        state.cartTaxTotal = action.payload.cartTaxTotal ?? null;
        state.cartDiscount = action.payload.cartDiscount ?? null;
        state.cartFinalAmount = action.payload.cartFinalAmount ?? null;
        state.error = null;
      })
      .addCase(loadCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items = [];
        state.cartTotal = 0;
        state.cartSubtotal = null;
        state.cartTaxTotal = null;
        state.cartDiscount = null;
        state.cartFinalAmount = null;
      })
      // Update item quantity
      .addCase(updateCartItemQuantity.pending, (state, action) => {
        const { productId, weight, change } = action.meta.arg;
        const itemKey = `${productId ?? ""}|${weight ?? ""}`;
        state.updatingItems.add(itemKey);
        state.updatingAction[itemKey] = change > 0 ? 'increase' : 'decrease';
      })
      .addCase(updateCartItemQuantity.fulfilled, (state) => {
        // Clear updating state and reload cart
        state.updatingItems.clear();
        state.updatingAction = {};
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        const { productId, weight } = action.meta.arg;
        const itemKey = `${productId ?? ""}|${weight ?? ""}`;
        state.updatingItems.delete(itemKey);
        delete state.updatingAction[itemKey];
        state.error = action.payload;
      })
      // Clear cart
      .addCase(clearCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove item
      .addCase(removeCartItem.pending, (state, action) => {
        const { productId, weight } = action.meta.arg;
        const itemKey = `${productId ?? ""}|${weight ?? ""}`;
        state.updatingItems.add(itemKey);
        state.updatingAction[itemKey] = 'remove';
      })
      .addCase(removeCartItem.fulfilled, (state) => {
        // Clear updating state and reload cart
        state.updatingItems.clear();
        state.updatingAction = {};
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        const { productId, weight } = action.meta.arg;
        const itemKey = `${productId ?? ""}|${weight ?? ""}`;
        state.updatingItems.delete(itemKey);
        delete state.updatingAction[itemKey];
        state.error = action.payload;
      })
      .addCase(clearCartItems.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.cartTotal = 0;
        state.cartSubtotal = null;
        state.cartTaxTotal = null;
        state.cartDiscount = null;
        state.cartFinalAmount = null;
        state.error = null;
      });
  },
});

export const { setUpdatingItem, clearUpdatingItem, clearError } = cartSlice.actions;
export default cartSlice.reducer;
