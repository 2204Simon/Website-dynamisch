import { CartActionTypes, CartState } from "./types"; // Importieren Sie die erforderlichen Typen

const cartReducer = (
  state: CartState = {
    cartItems: [],
  },
  action: any
) => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case CartActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item !== action.payload),
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    case CartActionTypes.INCREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(item => {
          if (item === action.payload) {
            return {
              ...item,
              anzahl: item.anzahl + 1,
            };
          }
          return item;
        }),
      };
    case CartActionTypes.DECREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(item => {
          if (item === action.payload) {
            return {
              ...item,
              anzahl: Math.max(0, item.anzahl - 1),
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

export default cartReducer;
