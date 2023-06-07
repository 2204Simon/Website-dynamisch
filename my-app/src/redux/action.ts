import {
  CartActionTypes,
  ActionTypesUser,
  CartItem,
  LogInData,
  AdressData,
  ActionTypesAdressData,
} from "./types"; // Importieren Sie die erforderlichen Typen

// Cart
export const addToCart = (item: CartItem) => {
  return {
    type: CartActionTypes.ADD_TO_CART,
    payload: item,
  };
};

export const clearCart = () => {
  return {
    type: CartActionTypes.CLEAR_CART,
  };
};

export const increaseQuantity = (item: CartItem, amount: number) => {
  return {
    type: CartActionTypes.INCREASE_QUANTITY,
    payload: { item, amount },
  };
};

export const removeFromCart = (item: CartItem) => {
  return {
    type: CartActionTypes.REMOVE_FROM_CART,
    payload: item,
  };
};

export const decreaseQuantity = (item: CartItem) => {
  return {
    type: CartActionTypes.DECREASE_QUANTITY,
    payload: item,
  };
};

// LogIn

export const addNewUser = (LogInData: LogInData) => {
  return {
    // Angabe es soll den Case ADD_NEW_USER ausführen
    type: ActionTypesUser.ADD_NEW_USER,
    // payload der benutzt werden soll Funktionsparameter
    payload: LogInData,
  };
};

//Adress Data

export const addNewAdressData = (AdressData: AdressData) => {
  return {
    type: ActionTypesAdressData.ADD_NEW_ADRESS,
    payload: AdressData,
  };
};
