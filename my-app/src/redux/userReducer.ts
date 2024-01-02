import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataState, LogInData } from "./types";

const initialState: UserDataState = {
  LogInData: { firstName: "", lastName: "", email: "", password: "" },
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
