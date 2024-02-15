import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AdressDataState,
  AdressData,
  PaymentData,
  PaymentDataState,
  AddressenInformation,
  PaypalData,
  LastschriftData,
} from "../../redux/types";
import {
  Card,
  Container,
  LogoutButton,
  Paragraph,
  Title,
} from "./UserInformation.styles";
import { Bank, Pencil, RadioButton } from "phosphor-react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import { FaPaypal } from "react-icons/fa";
import { colors } from "../general/constants";
import { FormGroup } from "@mui/material";
import { addNewAdress, loadAdressen } from "../../redux/adressDataReducer";
import {
  getRequest,
  sendPostRequest,
  sendPutRequest,
} from "../../serverFunctions/generelAPICalls";
import { useCookies } from "react-cookie";
import { KUNDEN_ID } from "../../globalVariables/global";
import { CustomToast } from "../general/toast.style";
import {
  addLastschrift,
  addPayment,
  addPaypal,
} from "../../redux/paymentReaducer";
import styled from "styled-components";
import { setSelectedAdress } from "../../redux/adressDataReducer";

const ScrollableContainer = styled.div`
  overflow: auto;
  max-width: 450px;
  max-height: 450px;
  margin: auto;
`;

export default function AdressInformation(): JSX.Element {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<AdressData | null>(null);
  const [editedPaymentPaypalData, setEditedPaymentPaypalData] =
    useState<PaypalData | null>(null);
  const [editedPaymentLastschriftData, setEditedPaymentLastschriftData] =
    useState<LastschriftData | null>(null);
  const [cookies, setCookie] = useCookies([KUNDEN_ID]);
  const adressInformation = useSelector(
    (state: { adress: AdressDataState }) => state.adress.AdressData
  );
  const paymentInformation = useSelector(
    (state: { payment: PaymentDataState }) => state.payment.PaymentData
  );
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [showFields, setShowFields] = useState(false);
  const [showPaymentFields, setShowPaymentFields] = useState(false);
  const uniqueAdressInformation = adressInformation.filter(
    (adress, index, self) =>
      index ===
      self.findIndex(
        t =>
          t.postleitzahl === adress.postleitzahl &&
          t.ort === adress.ort &&
          t.strasse === adress.strasse &&
          t.hausnummer === adress.hausnummer
      )
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePayment = await getRequest(
          `/zahlung/${cookies.kundenId}`
        );
        const responseAdress = await getRequest(
          `/adressen/${cookies.kundenId}`
        );
        console.log(responseAdress, "responseAdress");
        dispatch(loadAdressen(responseAdress));

        console.log(responsePayment, "responsePayment");
        dispatch(addPayment(responsePayment));
      } catch (error) {
        CustomToast.error("Fehler beim Laden der Daten");
      }
    };

    fetchData();
  }, []);

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const paymentOption = event.target.value;

    if (selectedPayments.includes(paymentOption)) {
      setSelectedPayments(
        selectedPayments.filter(option => option !== paymentOption)
      );
    } else {
      setSelectedPayments([...selectedPayments, paymentOption]);
    }
  };
  const handleEdit = (data: AdressData) => {
    setEditMode(true);
    setEditedData(data);
  };

  const handleOpenAdress = () => {
    setShowFields(true);
  };

  const handleOpenPayment = () => {
    setShowPaymentFields(true);
  };

  const handleAddAdress = async (data: AdressData) => {
    console.log(data, "data");
    // Überprüfen, ob die Felder leer sind
    if (!data.postleitzahl || !data.ort || !data.strasse || !data.hausnummer) {
      CustomToast.error("Bitte füllen Sie alle erforderlichen Felder aus.");
      return;
    }
    const adressData: AdressData = {
      kundenId: cookies.kundenId,
      postleitzahl: data.postleitzahl,
      ort: data.ort,
      strasse: data.strasse,
      hausnummer: data.hausnummer,
      hausnummerzusatz: data.hausnummerzusatz,
    };

    console.log(adressData, "adressData");
    try {
      const postAdressData = await sendPostRequest("/adresse", adressData);
      dispatch(addNewAdress(postAdressData));
      setShowFields(false);
    } catch (error) {
      CustomToast.error("Fehler beim Hinzufügen der Adresse");
    }
  };

  const handleSelectAdress = (adress: AdressData) => {
    dispatch(setSelectedAdress(adress));
    console.log(adress, "adress Simon");
  };

  const handleCancelAdress = () => {
    setEditedData(null);
    setShowFields(false);
  };

  const handleCancelPayment = () => {
    setEditedPaymentPaypalData(null);
    setEditedPaymentLastschriftData(null);
    setShowPaymentFields(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("submit");
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const paymentData: PaymentData = {
      kundenId: cookies.kundenId,
      laufendeZahlungsId: paymentInformation.laufendeZahlungsId,
      paypalData: {
        kundenId: cookies.kundenId,
        paypalEmail: data.get("paypalEmail") as string,
      },
      lastschriftData: {
        kundenId: cookies.kundenId,
        bankname: data.get("bankName") as string,
        iban: data.get("iban") as string,
        bic: data.get("bic") as string,
      },
    };

    if (
      paymentData.paypalData?.paypalEmail &&
      !paymentData.paypalData?.paypalEmail.includes("@")
    ) {
      CustomToast.error("Bitte gebe eine gültige E-Mail-Adresse ein");
      return;
    }
    if (
      !(
        paymentData.paypalData?.paypalEmail ||
        (paymentData.lastschriftData?.bankname &&
          paymentData.lastschriftData?.bic &&
          paymentData.lastschriftData.iban)
      )
    ) {
      CustomToast.error(
        "Es muss mindestens PayPal oder Lastschrift ausgewählt sein"
      );
      return;
    }

    try {
      // PUT request to update the payment data
      const putPaymentData = await sendPutRequest("/zahlung", paymentData);

      // POST request to add PayPal data
      if (paymentData.paypalData?.paypalEmail) {
        const postPaypalData = await sendPostRequest(
          "/zahlung",
          paymentData.paypalData
        );
        dispatch(addPaypal(postPaypalData));
      }

      // POST request to add bank data
      if (
        paymentData.lastschriftData?.bankname &&
        paymentData.lastschriftData?.bic &&
        paymentData.lastschriftData?.iban
      ) {
        const postLastschriftData = await sendPostRequest(
          "/zahlung",
          paymentData.lastschriftData
        );
        dispatch(addLastschrift(postLastschriftData));
      }

      dispatch(addPayment(putPaymentData));

      setEditedData(null);
      setEditMode(false);
    } catch (error) {
      CustomToast.error("Fehler beim Speichern der Daten");
      console.log(error);
    }
  };
  const highestLaufendeAdressenId = Math.max(
    ...uniqueAdressInformation
      .map(adress => adress.laufendeAdressenId)
      .filter((id): id is number => id !== undefined)
  );
  useEffect(() => {
    const highestAdress = uniqueAdressInformation.find(
      adress => adress.laufendeAdressenId === highestLaufendeAdressenId
    );
    if (highestAdress) {
      dispatch(setSelectedAdress(highestAdress));
    }
  }, [highestLaufendeAdressenId, uniqueAdressInformation, dispatch]);

  return (
    <div>
      <Container>
        <Card>
          <Title>Adresse</Title>
          <Grid container spacing={2} justifyContent={"center"}>
            <Grid item xs={12} sm={showFields ? 6 : 12}>
              <ScrollableContainer>
                {uniqueAdressInformation
                  .slice()
                  .reverse()
                  .map((adress, index) => (
                    <div key={index}>
                      <Grid>
                        <input
                          type="radio"
                          id={`Adresse${index}`}
                          name="Adresse"
                          value={`Adresse${index}`}
                          defaultChecked={
                            adress.laufendeAdressenId ===
                            highestLaufendeAdressenId
                          }
                          onChange={() => {
                            handleSelectAdress(adress);
                          }}
                        />

                        <Paragraph>
                          <strong>Postleitzahl: </strong>
                          {adress.postleitzahl}
                        </Paragraph>
                        <Paragraph>
                          <strong>Stadt: </strong>
                          {adress.ort}
                        </Paragraph>
                        <Paragraph>
                          <strong>Straße: </strong>
                          {adress.strasse}
                        </Paragraph>
                        <Paragraph>
                          <strong>Hausnummer: </strong>
                          {adress.hausnummer}
                        </Paragraph>
                        <Paragraph>
                          <strong>Hausnummerzusatz: </strong>
                          {adress.hausnummerzusatz}
                        </Paragraph>
                      </Grid>
                    </div>
                  ))}
              </ScrollableContainer>
            </Grid>
            {showFields && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="plz"
                  label="Postleitzahl"
                  name="plz"
                  defaultValue={editedData?.postleitzahl}
                  inputProps={{
                    maxLength: 50,
                    style: { color: `${colors.black}` },
                  }}
                  InputLabelProps={{
                    sx: {
                      backgroundColor: `${colors.primarycolor}`,
                      color: colors.companycolor,
                    },
                  }}
                  onChange={e => {
                    e.target.value = e.target.value.trim();
                  }}
                />
                <TextField
                  fullWidth
                  required
                  id="city"
                  label="Stadt"
                  name="city"
                  defaultValue={editedData?.ort}
                  inputProps={{
                    maxLength: 50,
                    style: { color: `${colors.black}` },
                  }}
                  InputLabelProps={{
                    sx: {
                      backgroundColor: `${colors.primarycolor}`,
                      color: colors.companycolor,
                    },
                  }}
                />
                <TextField
                  fullWidth
                  required
                  id="street"
                  label="Straße"
                  name="street"
                  defaultValue={editedData?.strasse}
                  inputProps={{
                    maxLength: 50,
                    style: { color: `${colors.black}` },
                  }}
                  InputLabelProps={{
                    sx: {
                      backgroundColor: `${colors.primarycolor}`,
                      color: colors.companycolor,
                    },
                  }}
                />

                <TextField
                  fullWidth
                  required
                  id="hausnummer"
                  label="Hausnummer"
                  name="hausnummer"
                  defaultValue={editedData?.hausnummer}
                  inputProps={{
                    maxLength: 50,
                    style: { color: `${colors.black}` },
                  }}
                  InputLabelProps={{
                    sx: {
                      backgroundColor: `${colors.primarycolor}`,
                      color: colors.companycolor,
                    },
                  }}
                  onChange={e => {
                    e.target.value = e.target.value.trim();
                  }}
                />
                <TextField
                  fullWidth
                  id="hausnummerzusatz"
                  label="Hausnummerzusatz"
                  name="hausnummerzusatz"
                  defaultValue={editedData?.hausnummerzusatz}
                  inputProps={{
                    maxLength: 50,
                    style: { color: `${colors.black}` },
                  }}
                  InputLabelProps={{
                    sx: {
                      backgroundColor: `${colors.primarycolor}`,
                      color: colors.companycolor,
                    },
                  }}
                  onChange={e => {
                    e.target.value = e.target.value.trim();
                  }}
                />
                <Button
                  style={{ color: colors.companycolor }}
                  type="submit"
                  onClick={() => {
                    // Abrufen der Werte aus den Textfeldern
                    const postleitzahl = (
                      document.getElementById("plz") as HTMLInputElement
                    ).value;
                    const ort = (
                      document.getElementById("city") as HTMLInputElement
                    ).value;
                    const strasse = (
                      document.getElementById("street") as HTMLInputElement
                    ).value;
                    const hausnummer = (
                      document.getElementById("hausnummer") as HTMLInputElement
                    ).value;
                    const hausnummerzusatz = (
                      document.getElementById(
                        "hausnummerzusatz"
                      ) as HTMLInputElement
                    ).value;

                    // Initialisieren von editedData mit den abgerufenen Werten
                    const data: AdressData = {
                      kundenId: cookies.kundenId,
                      postleitzahl: postleitzahl,
                      ort: ort,
                      strasse: strasse,
                      hausnummer: hausnummer,
                      hausnummerzusatz: hausnummerzusatz,
                    };

                    if (data) {
                      handleAddAdress(data);
                    } else {
                      CustomToast.error("Keine Daten zum Hinzufügen");
                    }
                  }}
                >
                  Neu anlegen
                </Button>

                <Button
                  style={{ color: colors.companycolor }}
                  onClick={handleCancelAdress}
                >
                  Abbrechen
                </Button>
              </Grid>
            )}
            {!showFields && (
              <Grid>
                <LogoutButton
                  className="black-color white-orange "
                  onClick={() => handleOpenAdress()}
                >
                  {" "}
                  Adresse hinzufügen
                </LogoutButton>
              </Grid>
            )}
          </Grid>
        </Card>
      </Container>

      {/* 
      <Title>Zeitungsabonnement:</Title> */}
      {/* <ZeitungsAbo
                hasSubscription={hasSubscription}
                setHasSubscription={setHasSubscription}
                expiryDate={expiryDate}
                setExpiryDate={setExpiryDate}
              /> */}
      <Container>
        <Card>
          <Title>Zahlungsmöglichkeiten: </Title>
          <Grid container justifyContent={"center"}>
            <Grid item xs={6}>
              <Title>
                <FaPaypal size={30} />
              </Title>
              {showPaymentFields && (
                <form onSubmit={e => handleSubmit(e)}>
                  <FormControl component="fieldset">
                    <FormGroup>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="paypalEmail"
                          label="PayPal Email"
                          name="paypalEmail"
                          inputProps={{
                            maxLength: 100,
                            style: {
                              color: `${colors.black}`,
                              textAlign: "left",
                            },
                          }}
                          InputLabelProps={{
                            sx: {
                              backgroundColor: `${colors.primarycolor}`,
                              color: colors.companycolor,
                            },
                          }}
                          onChange={e => {
                            e.target.value = e.target.value.trim();
                          }}
                        />
                      </Grid>
                      <Button
                        style={{ color: colors.companycolor }}
                        type="submit"
                      >
                        PayPal-Information hinzufügen
                      </Button>
                      <Button
                        style={{ color: colors.companycolor }}
                        onClick={handleCancelPayment}
                      >
                        Abbrechen
                      </Button>
                    </FormGroup>
                  </FormControl>
                </form>
              )}
            </Grid>

            <Grid item xs={6}>
              <Title>
                <Bank size={30} />
              </Title>
              {showPaymentFields && (
                <form onSubmit={e => handleSubmit(e)}>
                  <FormControl component="fieldset">
                    <FormGroup>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="bankName"
                          label="Bankname"
                          name="bankName"
                          inputProps={{
                            maxLength: 50,
                            style: {
                              color: `${colors.black}`,
                              textAlign: "left",
                            },
                          }}
                          InputLabelProps={{
                            sx: {
                              backgroundColor: `${colors.primarycolor}`,
                              color: colors.companycolor,
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="bic"
                          label="BIC"
                          name="bic"
                          inputProps={{
                            maxLength: 50,
                            style: {
                              color: `${colors.black}`,
                              textAlign: "left",
                            },
                          }}
                          InputLabelProps={{
                            sx: {
                              backgroundColor: `${colors.primarycolor}`,
                              color: colors.companycolor,
                            },
                          }}
                          onChange={e => {
                            e.target.value = e.target.value.trim();
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="iban"
                          label="IBAN"
                          name="iban"
                          inputProps={{
                            maxLength: 50,
                            style: {
                              color: `${colors.black}`,
                              textAlign: "left",
                            },
                          }}
                          InputLabelProps={{
                            sx: {
                              backgroundColor: `${colors.primarycolor}`,
                              color: colors.companycolor,
                            },
                          }}
                          onChange={e => {
                            e.target.value = e.target.value.trim();
                          }}
                        />
                      </Grid>
                      <Button
                        style={{ color: colors.companycolor }}
                        type="submit"
                      >
                        Bankinformation hinzufügen
                      </Button>
                      <Button
                        style={{ color: colors.companycolor }}
                        onClick={handleCancelPayment}
                      >
                        Abbrechen
                      </Button>
                    </FormGroup>
                  </FormControl>
                </form>
              )}
            </Grid>
            {!showPaymentFields && (
              <Grid>
                <LogoutButton
                  className="black-color white-orange "
                  onClick={() => handleOpenPayment()}
                >
                  {" "}
                  Zahlung hinzufügen
                </LogoutButton>
              </Grid>
            )}
          </Grid>
        </Card>
      </Container>
    </div>
  );
}
