import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../../types/product";

interface FavoritesState {
  favoritesList: Product[];
}

const initialState: FavoritesState = {
  favoritesList: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<{ product: Product }>) {
      const item = action.payload.product;
      const existingItem = state.favoritesList.find((fav) => fav.id === item.id);

      if (!existingItem) {
        state.favoritesList.push(item);
      }
    },

    removeFromFavorites(state, action: PayloadAction<string>) {
      state.favoritesList = state.favoritesList.filter(
        (item) => item.id !== action.payload,
      );
    },

    clearFavorites(state) {
      state.favoritesList = [];
    },
  },
});

export const favoritesActions = favoritesSlice.actions;
export default favoritesSlice.reducer;
