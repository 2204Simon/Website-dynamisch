import { ActionTypesUser, UserDataState, LogInData } from "./types"; // Importieren Sie die erforderlichen Typen

const userReducer = (
  state: UserDataState | undefined = {
    LogInData: { firstName: "", lastName: "", email: "", password: "" },
  },
  action: { type: ActionTypesUser; payload: LogInData } // Aktualisieren Sie den Action-Typ mit ActionTypesUser und Payload-Typ mit LogInData
) => {
  switch (action.type) {
    case ActionTypesUser.ADD_NEW_USER:
      return {
        ...state,
        LogInData: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
