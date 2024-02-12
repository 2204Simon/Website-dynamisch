import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdressData, AdressDataState } from "./types";

const initialState: AdressDataState = {
  AdressData: [],
};

const adressDataSlice = createSlice({
  name: "adress",
  initialState,
  reducers: {
    addNewAdress: (state, action: PayloadAction<AdressData>) => {
      state.AdressData.push(action.payload);
    },
    loadAdressen: (state, action: PayloadAction<AdressData[]>) => {
      state.AdressData = action.payload;
    },
  },
});

export const { addNewAdress, loadAdressen } = adressDataSlice.actions;

export default adressDataSlice.reducer;
