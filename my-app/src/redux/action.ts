// actions.ts

import { ActionTypes, ActionTypesUser, CartItem, LogInData } from "./types"; // Importieren Sie die erforderlichen Typen

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

// LogIn

export const addNewUser = (LogInData: LogInData) => {
  return {
    type: ActionTypesUser.ADD_NEW_USER,
    payload: LogInData,
  };
};
