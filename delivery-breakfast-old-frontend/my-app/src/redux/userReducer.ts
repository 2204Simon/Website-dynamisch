import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataState, LogInData } from "./types";

const initialState: UserDataState = {
  LogInData: {
    email: "",
    vorname: "",
    nachname: "",
    passwort: "",
    telefonnummer: "",
    zeitungsaboablaufdatum: undefined,
    istAdmin: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<LogInData>) => {
      // LogInData state wird gleich dem action.payload
      state.LogInData = action.payload;
    },
  },
});

export const { addNewUser } = userSlice.actions;

export default userSlice.reducer;
