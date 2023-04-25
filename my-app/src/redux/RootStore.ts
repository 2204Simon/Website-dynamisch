import { createStore, combineReducers, Store, AnyAction } from "redux";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import adressDataReducer from "./adressDataReducer";
import { UserDataState, CartState, AdressDataState } from "./types"; // Import the required types

// Define the RootState type, which includes types for user and cart
interface RootState {
  user: UserDataState;
  cart: CartState;
  adress: AdressDataState;
}

// Combine the reducers
const rootReducer = combineReducers<RootState>({
  user: userReducer,
  cart: cartReducer,
  adress: adressDataReducer,
});

// Create the Redux store with the rootReducer and export it
const store: Store<RootState, AnyAction> = createStore(rootReducer);

export default store;
