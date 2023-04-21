import { createStore, combineReducers } from "redux";

export interface UserDataState {
  LogInData: LogInData;
}

export interface LogInData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export enum ActionTypesUser {
  ADD_NEW_USER = "ADD_NEW_USER",
}

export const addNewUser = (LogInData: LogInData) => {
  return {
    type: ActionTypesUser.ADD_NEW_USER,
    payload: LogInData,
  };
};

const userReducer = (
  state: UserDataState | undefined = {
    LogInData: {
      firstName: "John",
      lastName: "Doe",
      email: "JohnDoe@gmil.com",
      password: "dully1234",
    },
  },
  action: any
) => {
  switch (action.type) {
    case ActionTypesUser.ADD_NEW_USER:
      return {
        ...state,
        LogInData: action.payload,
      };
    default:
      return state;
  }
};

export interface CartState {
  cartItems: CartItem[];
}

export interface CartItem {
  logo: string;
  preis: number;
  produktname: string;
  anzahl: number;
}

export enum ActionTypes {
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  CLEAR_CART = "CLEAR_CART",
  INCREASE_QUANTITY = "INCREASE_QUANTITY",
  DECREASE_QUANTITY = "DECREASE_QUANTITY",
}

export const addToCart = (item: CartItem) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: item,
  };
};

export const clearCart = () => {
  return {
    type: ActionTypes.CLEAR_CART,
  };
};

export const increaseQuantity = (item: CartItem) => {
  return {
    type: ActionTypes.INCREASE_QUANTITY,
    payload: item,
  };
};

export const removeFromCart = (item: CartItem) => {
  return {
    type: ActionTypes.REMOVE_FROM_CART,
    payload: item,
  };
};

export const decreaseQuantity = (item: CartItem) => {
  return {
    type: ActionTypes.DECREASE_QUANTITY,
    payload: item,
  };
};

const cartReducer = (state: CartState = { cartItems: [] }, action: any) => {
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

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer);

export default store;
