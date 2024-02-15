import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LastschriftData, PaymentData, PaypalData } from "./types";

const initialState = {
  PaymentData: {
    PaypalData: {} as PaypalData,
    LastschriftData: {} as LastschriftData,
  } as PaymentData,
};

const paymentSlice = createSlice({
  name: "adress",
  initialState,
  reducers: {
    addPayment: (state, action: PayloadAction<PaymentData>) => {
      state.PaymentData = action.payload;
    },
    setSelectedPayment: (state, action: PayloadAction<PaymentData>) => {
      state.PaymentData = action.payload;
    },
  },
});

export const { addPayment } = paymentSlice.actions;
export const { setSelectedPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
