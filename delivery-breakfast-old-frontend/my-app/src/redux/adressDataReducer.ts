import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdressData, AdressDataState } from "./types";

// Fügen Sie selectedAdress zum initialen Zustand hinzu
const initialState: AdressDataState = {
  AdressData: [],
  selectedAdress: null,
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
    // Fügen Sie einen neuen Reducer hinzu, um selectedAdress zu aktualisieren
    setSelectedAdress: (state, action: PayloadAction<AdressData>) => {
      state.selectedAdress = action.payload;
    },
  },
});

// Exportieren Sie die neue Aktion
export const { addNewAdress, loadAdressen, setSelectedAdress } =
  adressDataSlice.actions;

export default adressDataSlice.reducer;
