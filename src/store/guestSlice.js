import { createSlice } from "@reduxjs/toolkit";

const GUEST_CART_KEY = "danbro_guest_cart";
const GUEST_WISHLIST_KEY = "danbro_guest_wishlist";

const loadGuestCart = () => {
  try {
    const raw = localStorage.getItem(GUEST_CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const loadGuestWishlist = () => {
  try {
    const raw = localStorage.getItem(GUEST_WISHLIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveGuestCart = (items) => {
  try {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn("Failed to save guest cart to localStorage", e);
  }
};

const saveGuestWishlist = (ids) => {
  try {
    localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(ids));
  } catch (e) {
    console.warn("Failed to save guest wishlist to localStorage", e);
  }
};

const initialState = {
  guestCart: loadGuestCart(),
  guestWishlist: loadGuestWishlist(),
};

const guestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    addToGuestCart: (state, action) => {
      const { productId, quantity = 1, weight, productSnapshot } = action.payload;
      const existing = state.guestCart.find((i) => i.productId === productId && (i.weight || "") === (weight || ""));
      if (existing) {
        existing.quantity = (existing.quantity || 1) + (quantity || 1);
        // Update productSnapshot if provided and existing one is null
        if (productSnapshot && !existing.productSnapshot) {
          existing.productSnapshot = productSnapshot;
        }
      } else {
        state.guestCart.push({
          productId,
          quantity: quantity || 1,
          weight: weight || null,
          productSnapshot: productSnapshot || null,
        });
      }
      saveGuestCart(state.guestCart);
    },
    removeFromGuestCart: (state, action) => {
      const { productId, weight } = action.payload;
      state.guestCart = state.guestCart.filter(
        (i) => !(i.productId === productId && (i.weight || "") === (weight || ""))
      );
      saveGuestCart(state.guestCart);
    },
    updateGuestCartQuantity: (state, action) => {
      const { productId, quantity, weight } = action.payload;
      const item = state.guestCart.find(
        (i) => i.productId === productId && (i.weight || "") === (weight || "")
      );
      if (item) {
        const q = Math.max(0, Number(quantity));
        if (q === 0) {
          state.guestCart = state.guestCart.filter((i) => i !== item);
        } else {
          item.quantity = q;
        }
      }
      saveGuestCart(state.guestCart);
    },
    setGuestCart: (state, action) => {
      state.guestCart = Array.isArray(action.payload) ? action.payload : [];
      saveGuestCart(state.guestCart);
    },
    addToGuestWishlist: (state, action) => {
      const productId = action.payload;
      if (productId && !state.guestWishlist.includes(productId)) {
        state.guestWishlist.push(productId);
        saveGuestWishlist(state.guestWishlist);
      }
    },
    removeFromGuestWishlist: (state, action) => {
      const productId = action.payload;
      state.guestWishlist = state.guestWishlist.filter((id) => id !== productId);
      saveGuestWishlist(state.guestWishlist);
    },
    setGuestWishlist: (state, action) => {
      state.guestWishlist = Array.isArray(action.payload) ? action.payload : [];
      saveGuestWishlist(state.guestWishlist);
    },
    clearGuestData: (state) => {
      state.guestCart = [];
      state.guestWishlist = [];
      saveGuestCart([]);
      saveGuestWishlist([]);
    },
  },
});

export const {
  addToGuestCart,
  removeFromGuestCart,
  updateGuestCartQuantity,
  setGuestCart,
  addToGuestWishlist,
  removeFromGuestWishlist,
  setGuestWishlist,
  clearGuestData,
} = guestSlice.actions;

export const getGuestCart = (state) => state.guest?.guestCart ?? [];
export const getGuestWishlist = (state) => state.guest?.guestWishlist ?? [];

export default guestSlice.reducer;
