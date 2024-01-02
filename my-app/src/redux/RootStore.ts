import {
  configureStore,
  MiddlewareAPI,
  Action,
  Middleware,
} from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import adressDataReducer from "./adressDataReducer";
import { log } from "console";

// Define the state type
interface RootState {
  user: ReturnType<typeof userReducer>;
  cart: ReturnType<typeof cartReducer>;
  adress: ReturnType<typeof adressDataReducer>;
}

// Middleware to save state to localStorage after each action
const localStorageMiddleware: Middleware<{}, RootState> =
  storeAPI => next => (action: unknown) => {
    const result = next(action);
    const state = storeAPI.getState();
    console.log(state);
    localStorage.setItem("cardState", JSON.stringify(state.cart));
    console.log(localStorage);

    return result;
  };

// Function to load state from localStorage
const loadState = () => {
  try {
    console.log("aufgeruuuuuuuuuuuuuuuffffffffffffffennnnnnn");

    const serializedState = localStorage.getItem("cardState");
    console.log(serializedState);

    if (serializedState === null) {
      return undefined;
    }
    console.log({ cart: JSON.parse(serializedState) });

    return { cart: JSON.parse(serializedState) };
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    adress: adressDataReducer,
  },
  preloadedState: persistedState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
