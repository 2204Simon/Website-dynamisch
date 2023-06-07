import { ActionTypesUser, UserDataState, LogInData } from "./types";
//Beispiel reducer
const userReducer = (
  //der Default State sind hier leere Parameter
  state: UserDataState | undefined = {
    LogInData: { firstName: "", lastName: "", email: "", password: "" },
  },
  //Die Action müssen diese return Werte haben
  action: { type: ActionTypesUser; payload: LogInData }
) => {
  switch (action.type) {
    // Fall neuen nutzer anlegen
    case ActionTypesUser.ADD_NEW_USER:
      return {
        //der neue State wird übergeben
        ...state,
        // LogInData state wird gleich dem action.payload
        LogInData: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
