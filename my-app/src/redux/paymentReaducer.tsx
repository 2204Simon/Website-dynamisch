import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentData, PaymentDataState } from "./types";

const initialState: PaymentDataState = {
  paypalData: {
    paypalEmail: "",
  },
  lastschriftData: {
    bankname: "",
    iban: "",
    bic: "",
  },

  selectedPayments: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    addPayment: (state, action: PayloadAction<PaymentData>) => {
      state.PaymentData.push(action.payload);
    },
    loadPayment: (state, action: PayloadAction<PaymentData>) => {
      state.PaymentData = action.payload;
    },
    setSelectedPayment: (state, action: PayloadAction<PaymentData>) => {
      state.selectedPayments = action.payload;
    },
  },
});

export const { addPayment, loadPayment, setSelectedPayment } =
  paymentSlice.actions;

export default paymentSlice.reducer;
