import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LastschriftData, PaymentData, PaypalData } from "./types";

const initialState = {
  PaymentData: {} as PaymentData,
  PaypalData: {} as PaypalData,
  LastschriftData: {} as LastschriftData,
};

const paymentSlice = createSlice({
  name: "adress",
  initialState,
  reducers: {
    addPayment: (state, action: PayloadAction<PaymentData>) => {
      state.PaymentData = action.payload;
    },
    addPaypal: (state, action: PayloadAction<PaypalData>) => {
      state.PaypalData = action.payload;
    },
    addLastschrift: (state, action: PayloadAction<LastschriftData>) => {
      state.LastschriftData = action.payload;
    },
  },
});

export const { addPayment, addPaypal, addLastschrift } = paymentSlice.actions;

export default paymentSlice.reducer;
