export interface UserDataState {
  LogInData: LogInData;
}

export interface LogInData {
  email: string;
  vorname: string;
  nachname: string;
  passwort: string;
  telefonnummer: string;
  zeitungsaboablaufdatum?: Date;
  istAdmin?: boolean;
}

export enum ActionTypesUser {
  ADD_NEW_USER = "ADD_NEW_USER",
}

//Adress Data
export interface AdressDataState {
  AdressData: AdressData[];
  selectedAdress: AdressData | null;
}

export interface AdressData {
  kundenId?: string;
  postleitzahl: string;
  strasse: string;
  ort: string;
  hausnummer: string;
  hausnummerzusatz?: string;
  laufendeAdressenId?: number;
}

export type PaymentData = {
  kundenId?: string;
  laufendeZahlungsId?: number;
  paypalData?: PaypalData;
  lastschriftData?: LastschriftData;
};

export type PaypalData = {
  kundenId?: string;
  laufendeZahlungsId?: number;
  paypalEmail?: string;
};

export type LastschriftData = {
  kundenId?: string;
  laufendeZahlungsId?: number;
  Bankname?: string;
  IBAN?: string;
  BIC?: string;
};

export type PaymentDataState = {
  paypalData: Array<PaypalData>;
  lastschriftData: Array<LastschriftData>;
  selectedPayments: SelectedPaymentData | null;
};

export type SelectedPaymentData = {
  paypalEmail?: string;
  kundenId?: string;
  laufendeZahlungsId?: number;
  Bankname?: string;
  IBAN?: string;
  BIC?: string;
};

export type SelectedLastschriftData = {
  Bankname: string;
  IBAN: string;
  BIC: string;
};

export enum ActionTypesAdressData {
  ADD_NEW_ADRESS = "ADD_NEW_ADRESS",
}

//CartArray

export interface CartState {
  cartItems: CartItem[];
}

export interface CartItem {
  produktId: string;
  bild: string;
  preis: number;
  titel: string;
  kundenId?: string;
  anzahl: number;
}

export interface ProduktApiType {
  produkt: {
    produktId: string;
    titel: string;
    preis: number;
    bild: string;
    sparte: string;
    kundenId: string | null;
    createdAt: string;
    updatedAt: string;
  };
  bestellmenge: number;
}

export type AddressenInformation = {
  createdAt: string;
  hausnummer: string;
  hausnummerzusatz: string | null;
  kundenId: string;
  laufendeAdressenId: number;
  ort: string;
  postleitzahl: string;
  strasse: string;
  updatedAt: string;
};

export type ProduktInformationen = {
  bestellmenge: number;
  summe: number;
  bestellungsId: string;
  bild: string;
  createdAt: string;
  kundenId: string | null;
  preis: number;
  produktId: string;
  sparte: string;
  titel: string;
  updatedAt: string;
};

export type Zahlungsinformation = {
  createdAt: string;
  email: string;
  kundenId: string;
  updatedAt: string;
  zahlungsId: string;
};

export type BestellungsInformation = {
  kunde?: LogInData;
  gesamtpreis: number;
  lieferDatum: Date;
  bestellDatum: string;
  gewünschtesLieferdatum: Date;
  bestellungsId: string;
  zahlungsinformation: Zahlungsinformation;
  addressenInformation: AddressenInformation;
  produktInformationen: ProduktInformationen[];
};

export type ZutatApiType = {
  zutatsId: string;
  zutatsname: string;
  zutatseigenschaft: string;
  zutatspreis: number;
  zutatseinheit: string;
  zutatBild: string;
  zutatensparte: string;
};
