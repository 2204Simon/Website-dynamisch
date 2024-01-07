export interface UserDataState {
  LogInData: LogInData;
}

export interface LogInData {
  email: string;
  vorname: string;
  nachname: string;
  passwort: string;
  telefonnummer: string;
  zeitungsaboablaufdatum?: Date;
}

export enum ActionTypesUser {
  ADD_NEW_USER = "ADD_NEW_USER",
}

//Adress Data
export interface AdressDataState {
  AdressData: AdressData;
}

export interface AdressData {
  postleitzahl: string;
  strasse: string;
  ort: string;
  hausnummer: string;
  zahlungsmethode: string;
  hausnummerzusatz?: string;
  bankName?: string;
  bic?: string;
  iban?: string;
}

export enum ActionTypesAdressData {
  ADD_NEW_ADRESS = "ADD_NEW_ADRESS",
}

//CartArray

export interface CartState {
  cartItems: CartItem[];
}

export interface CartItem {
  produktId: string;
  logo: string;
  preis: number;
  produktname: string;
  anzahl: number;
}

export enum CartActionTypes {
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  CLEAR_CART = "CLEAR_CART",
  INCREASE_QUANTITY = "INCREASE_QUANTITY",
  DECREASE_QUANTITY = "DECREASE_QUANTITY",
}

export type ErrorMessageType = {
  statusCode: number;
  message: string;
};
