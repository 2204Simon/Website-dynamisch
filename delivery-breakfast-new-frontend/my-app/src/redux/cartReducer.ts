import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "./types";

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      console.log(action, "removeFromCart");
      state.cartItems = state.cartItems.filter(item => {
        return item.titel !== action.payload.titel;
      });
    },
    clearCart: state => {
      state.cartItems = [];
    },
    addMultipleToCart: (state, action: PayloadAction<Array<CartItem>>) => {
      state.cartItems.push(...action.payload);
    },
    increaseQuantity: (
      state,
      action: PayloadAction<{ item: CartItem; amount: number }>
    ) => {
      state.cartItems = state.cartItems.map(item => {
        if (item.produktId === action.payload.item.produktId) {
          if (item.anzahl + action.payload.amount > 99) {
            return {
              ...item,
              anzahl: 99,
            };
          } else {
            return {
              ...item,
              anzahl: item.anzahl + action.payload.amount,
            };
          }
        }
        return item;
      });
      // Implementieren Sie die Logik zum Erhöhen der Menge
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  addMultipleToCart,
} = cartSlice.actions;

export default cartSlice.reducer;
