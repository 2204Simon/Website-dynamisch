import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LastschriftData,
  PaymentData,
  PaymentDataState,
  PaypalData,
} from "./types";

const initialState: PaymentDataState = {
  paypalData: [
    {
      paypalEmail: "",
    },
  ],
  lastschriftData: [
    {
      bankname: "",
      iban: "",
      bic: "",
    },
  ],

  selectedPayments: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    addLastschriftData: (state, action: PayloadAction<PaypalData>) => {
      state.lastschriftData.push(action.payload);
    },
    addPaypalData: (state, action: PayloadAction<PaypalData>) => {
      state.paypalData.push(action.payload);
    },
    loadPaypal: (state, action: PayloadAction<Array<LastschriftData>>) => {
      state.lastschriftData = action.payload;
    },
    loadLastschrift: (state, action: PayloadAction<Array<LastschriftData>>) => {
      state.lastschriftData = action.payload;
    },
    setSelectedPayment: (state, action: PayloadAction<PaymentData>) => {
      state.selectedPayments = action.payload;
    },
  },
});

export const {
  addLastschriftData,
  addPaypalData,
  loadPaypal,
  loadLastschrift,
  setSelectedPayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;
