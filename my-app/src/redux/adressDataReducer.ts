import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdressData, AdressDataState } from "./types";

const initialState: AdressDataState = {
  AdressData: {
    plz: "",
    housenumber: "",
    city: "",
    payment: "",
    street: "",
  },
};

const adressDataSlice = createSlice({
  name: "adress",
  initialState,
  reducers: {
    addNewAdress: (state, action: PayloadAction<AdressData>) => {
      state.AdressData = action.payload;
    },
  },
});

export const { addNewAdress } = adressDataSlice.actions;

export default adressDataSlice.reducer;
