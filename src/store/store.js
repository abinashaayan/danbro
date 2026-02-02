import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import authReducer from './authSlice';
import guestReducer from './guestSlice';
import cartReducer from './cartSlice';

// Enable MapSet plugin for Immer to handle Set objects in state
enableMapSet();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    guest: guestReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/login/fulfilled', 'cart/loadItems/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.user', 'payload.items'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user', 'cart.updatingItems'],
      },
    }),
});

