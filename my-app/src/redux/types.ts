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

//Array

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
