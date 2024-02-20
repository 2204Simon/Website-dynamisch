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
  loadPaypal,
  loadLastschrift,
  addLastschriftData,
  addPaypalData,
} from "../../redux/paymentReaducer";
import {
  getRequest,
  sendPostRequest,
} from "../../serverFunctions/generelAPICalls";
import { useCookies } from "react-cookie";
import { KUNDEN_ID } from "../../globalVariables/global";
import { CustomToast } from "../general/toast.style";
import styled from "styled-components";
import { setSelectedAdress } from "../../redux/adressDataReducer";
import { setSelectedPayment } from "../../redux/paymentReaducer";

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
    (state: { payment: PaymentDataState }) => state.payment
  );
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
        console.log(responsePayment, "1234responsePayment");
        if (responsePayment.paypal) {
          const paypalData: PaypalData[] = responsePayment.paypal;
          dispatch(loadPaypal(paypalData));
        }
        if (responsePayment.lastschrift) {
          const lastschriftData: LastschriftData[] =
            responsePayment.lastschrift;
          dispatch(loadLastschrift(lastschriftData));
        }
        const responseAdress = await getRequest(
          `/adressen/${cookies.kundenId}`
        );
        console.log(responseAdress, "responseAdress");
        dispatch(loadAdressen(responseAdress));
      } catch (error) {
        CustomToast.error("Fehler beim Laden der Daten");
      }
    };

    fetchData();
  }, []);

  const handleOpenAdress = () => {
    setShowFields(true);
  };

  const handleOpenPayment = () => {
    setShowPaymentFields(true);
  };

  const handleAddPayment = async (data: PaymentData) => {
    console.log(data, "data");
    if (!data.paypalData?.paypalEmail && !data.lastschriftData?.IBAN) {
      CustomToast.error("Bitte füllen Sie alle erforderlichen Felder aus.");
      return;
    }
    const paymentData: PaymentData = {
      kundenId: cookies.kundenId,
      paypalData: data.paypalData,
      lastschriftData: data.lastschriftData,
    };

    console.log(paymentData, "paymentData");
    try {
      // POST request to add PayPal data
      if (paymentData.paypalData?.paypalEmail) {
        const postPaymentData = {
          ...paymentData,
          paypalEmail: paymentData.paypalData.paypalEmail,
        };

        const postPaypalData = await sendPostRequest(
          "/zahlung",
          postPaymentData
        );
        if (postPaypalData.paypal) {
          const paypalData: PaypalData = postPaypalData.paypal;
          dispatch(addPaypalData(paypalData));
          console.log(paypalData, "!!!!!!!!paypalData");
        }
      }
      if (paymentData.lastschriftData?.IBAN) {
        const postPaymentData = {
          ...paymentData,
          bankname: paymentData.lastschriftData.Bankname,
          iban: paymentData.lastschriftData.IBAN,
          bic: paymentData.lastschriftData.BIC,
        };
        const postLastschriftData = await sendPostRequest(
          "/zahlung",
          postPaymentData
        );
        if (postLastschriftData.lastschrift) {
          const lastschriftData: LastschriftData =
            postLastschriftData.lastschrift;
          console.log(paymentInformation, "!!!!!!!!!simon paymentInformation");
          dispatch(addLastschriftData(lastschriftData));
        }
      }

      setEditedData(null);
      setEditMode(false);
    } catch (error) {
      CustomToast.error("Fehler beim Speichern der Daten");
      console.log(error);
    }
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
  };

  const handleSelectPayment = (payment: PaymentData) => {
    dispatch(setSelectedPayment(payment));
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

  // const highestLaufendeZahlungsId = Math.max(
  //   ...uniquePaymentInformation
  //     .map(payment => payment.laufendeZahlungsId)
  //     .filter((id): id is number => id !== undefined)
  // );
  // useEffect(() => {
  //   const highestPayment = uniquePaymentInformation.find(
  //     payment => payment.laufendeZahlungsId === highestLaufendeZahlungsId
  //   );
  //   if (highestPayment) {
  //     dispatch(setSelectedPayment(highestPayment));
  //   }
  // }, [highestLaufendeZahlungsId, uniquePaymentInformation, dispatch]);

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
            <Grid item xs={12} sm={showPaymentFields ? 6 : 12}>
              <ScrollableContainer>
                {
                  // Zusammenführen der beiden Arrays und Sortieren nach der laufenden ZahlungsID
                  [
                    ...paymentInformation.lastschriftData,
                    ...paymentInformation.paypalData,
                  ]
                    .sort(
                      (a, b) =>
                        (a.laufendeZahlungsId || 0) -
                        (b.laufendeZahlungsId || 0)
                    )
                    .reverse()
                    .map((payment, index) => {
                      if ("paypalEmail" in payment) {
                        // Dies ist ein Paypal-Zahlungsobjekt
                        return (
                          <div key={index}>
                            <input
                              type="radio"
                              id={`Zahlung${index}`}
                              name="Zahlung"
                              value={`Zahlung${index}`}
                              onChange={() => {
                                handleSelectPayment(payment);
                              }}
                            />
                            <Paragraph>
                              <strong>PayPal Email: </strong>
                              {payment.paypalEmail}
                            </Paragraph>
                          </div>
                        );
                      } else {
                        // Dies ist ein Lastschrift-Zahlungsobjekt
                        if ("Bankname" in payment) {
                          return (
                            <div key={index}>
                              <input
                                type="radio"
                                id={`Zahlung${index}`}
                                name="Zahlung"
                                value={`Zahlung${index}`}
                                onChange={() => {
                                  handleSelectPayment(payment);
                                }}
                              />
                              <Paragraph>
                                <strong>Bankname: </strong>
                                {payment.Bankname}
                              </Paragraph>
                              <Paragraph>
                                <strong>BIC: </strong>
                                {payment.BIC}
                              </Paragraph>
                              <Paragraph>
                                <strong>IBAN: </strong>
                                {payment.IBAN}
                              </Paragraph>
                            </div>
                          );
                        }
                      }
                    })
                }
              </ScrollableContainer>
            </Grid>

            <Grid item xs={6}>
              {showPaymentFields && (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const paymentData: PaymentData = {
                      kundenId: cookies.kundenId,
                      paypalData: {
                        paypalEmail: formData.get("paypalEmail") as string,
                        // Fügen Sie hier weitere PayPal-Daten hinzu, falls vorhanden
                      },
                      lastschriftData: {
                        Bankname: formData.get("bankName") as string,
                        BIC: formData.get("bic") as string,
                        IBAN: formData.get("iban") as string,
                        // Fügen Sie hier weitere Lastschrift-Daten hinzu, falls vorhanden
                      },
                    };
                    handleAddPayment(paymentData);
                  }}
                >
                  <FormControl component="fieldset">
                    <FormGroup>
                      <Grid item xs={12}>
                        <Title>
                          <Bank size={30} />
                        </Title>
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
                      <Grid item xs={12}>
                        <Title>
                          <FaPaypal size={30} />
                        </Title>
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
                        Zahlungsart hinzufügen
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
              <Grid container justifyContent="center" alignItems="center">
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
