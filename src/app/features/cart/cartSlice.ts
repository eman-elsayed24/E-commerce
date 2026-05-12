import {
  createSlice,
  type Middleware,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AnyAction } from "redux";
import type { CartItem, Product } from "../../../types/product";

function loadCartFromStorage(): CartItem[] {
  const raw = localStorage.getItem("cartList");
  if (raw === null) return [];
  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

interface CartState {
  cartList: CartItem[];
}

const initialState: CartState = {
  cartList: loadCartFromStorage(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; num: number }>) => {
      const productToAdd = action.payload.product;
      const quantity = action.payload.num;
      const productExit = state.cartList.find(
        (item) => item.id === productToAdd.id,
      );
      if (productExit) {
        state.cartList = state.cartList.map((item) =>
          item.id === action.payload.product.id
            ? { ...productExit, qty: productExit.qty + action.payload.num }
            : item,
        );
      } else {
        state.cartList.push({ ...productToAdd, qty: quantity });
      }
    },
    decreaseQty: (state, action: PayloadAction<Product>) => {
      const productTodecreaseQnty = action.payload;
      const productExit = state.cartList.find(
        (item) => item.id === productTodecreaseQnty.id,
      );
      if (!productExit) return;
      if (productExit.qty === 1) {
        state.cartList = state.cartList.filter(
          (item) => item.id !== productExit.id,
        );
      } else {
        state.cartList = state.cartList.map((item) =>
          item.id === productExit.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item,
        );
      }
    },
    deleteProduct: (state, action: PayloadAction<Product>) => {
      const productToDelete = action.payload;
      state.cartList = state.cartList.filter(
        (item) => item.id !== productToDelete.id,
      );
    },
  },
});

type RootWithCart = { cart: CartState };

export const cartMiddleware: Middleware<object, RootWithCart> =
  (store) => (next) => (action: AnyAction) => {
    const result = next(action);
    if (
      typeof action === "object" &&
      action !== null &&
      "type" in action &&
      typeof (action as { type: unknown }).type === "string" &&
      (action as { type: string }).type.startsWith("cart/")
    ) {
      const cartList = store.getState().cart.cartList;
      localStorage.setItem("cartList", JSON.stringify(cartList));
    }
    return result;
  };

export const { addToCart, decreaseQty, deleteProduct } = cartSlice.actions;

export default cartSlice.reducer;
