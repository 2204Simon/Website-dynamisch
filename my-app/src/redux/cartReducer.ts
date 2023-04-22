import { ActionTypes, CartState } from "./types"; // Importieren Sie die erforderlichen Typen

const cartReducer = (
  state: CartState = {
    cartItems: [{ logo: "", preis: 2, produktname: "haha", anzahl: 3 }],
  },
  action: any
) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item !== action.payload),
      };
    case ActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    case ActionTypes.INCREASE_QUANTITY:
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
    case ActionTypes.DECREASE_QUANTITY:
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
