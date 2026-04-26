import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { cartMiddleware } from "./features/cart/cartSlice";
import favoritesSlice from "./features/favorites/favoritesSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    favorites: favoritesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware),
});
