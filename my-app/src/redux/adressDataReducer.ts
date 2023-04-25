import { ActionTypesAdressData, AdressData, AdressDataState } from "./types";

const adressDataReducer = (
  state: AdressDataState | undefined = {
    AdressData: {
      housenumber: 24,
      city: "Crailsheim",
      payment: "Bar",
      street: "Sonnenstraße",
    },
  },
  action: { type: ActionTypesAdressData; payload: AdressData }
) => {
  switch (action.type) {
    case ActionTypesAdressData.ADD_NEW_ADRESS:
      return {
        ...state,
        AdressData: action.payload,
      };
    default:
      return state;
  }
};

export default adressDataReducer;
