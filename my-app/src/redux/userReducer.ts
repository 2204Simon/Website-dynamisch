import { ActionTypesUser, UserDataState, LogInData } from "./types";

const userReducer = (
  state: UserDataState | undefined = {
    LogInData: { firstName: "", lastName: "", email: "", password: "" },
  },
  action: { type: ActionTypesUser; payload: LogInData }
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
