import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoritesList: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action) {
      const item = action.payload.product;
      const existingItem = state.favoritesList.find(
        (fav) => fav.id === item.id,
      );

      if (!existingItem) {
        state.favoritesList.push(item);
      }
    },

    removeFromFavorites(state, action) {
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
