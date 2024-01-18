import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentDataState } from "./types";

const initialState: PaymentDataState = {
  PaymentData: {
    paypalEmail: "",
    bankName: "",
    bic: "",
    iban: "",
  },
};

const paymentSlice = createSlice({
  name: "adress",
  initialState,
  reducers: {
    addPayment: (state, action: PayloadAction<any>) => {
      state.PaymentData = action.payload;
    },
  },
});

export const { addPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
