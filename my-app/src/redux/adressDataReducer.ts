import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdressData, AdressDataState } from "./types";

const initialState: AdressDataState = {
  AdressData: [
    {
      postleitzahl: "",
      hausnummer: "",
      hausnummerzusatz: "",
      ort: "",
      strasse: "",
    },
  ],
};

const adressDataSlice = createSlice({
  name: "adress",
  initialState,
  reducers: {
    addNewAdress: (state, action: PayloadAction<AdressData>) => {
      state.AdressData.push(action.payload);
    },
  },
});

export const { addNewAdress } = adressDataSlice.actions;

export default adressDataSlice.reducer;
