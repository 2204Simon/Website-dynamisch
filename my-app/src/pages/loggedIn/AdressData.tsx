import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AdressDataState,
  AdressData,
  PaymentData,
  PaymentDataState,
} from "../../redux/types";
import {
  Card,
  Container,
  LogoutButton,
  Paragraph,
  Title,
} from "./UserInformation.styles";
import { Bank, Pencil } from "phosphor-react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import { FaPaypal } from "react-icons/fa";
import { colors } from "../general/constants";
import { FormGroup } from "@mui/material";
import { addNewAdress } from "../../redux/adressDataReducer";
import {
  getRequest,
  sendPutRequest,
} from "../../serverFunctions/generelAPICalls";
import { useCookies } from "react-cookie";
import { KUNDEN_ID } from "../../globalVariables/global";
import { CustomToast } from "../general/toast.style";
import { addPayment } from "../../redux/paymentReaducer";
import styled from "styled-components";

const ScrollableContainer = styled.div`
  overflow: auto;
  max-height: 300px;
`;

export default function AdressInformation(): JSX.Element {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<AdressData | null>(null);
  const [cookies, setCookie] = useCookies([KUNDEN_ID]);
  const adressInformation = useSelector(
    (state: { adress: AdressDataState }) => state.adress.AdressData
  );
  const paymentInformation = useSelector(
    (state: { payment: PaymentDataState }) => state.payment.PaymentData
  );
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [showFields, setShowFields] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAdress = await getRequest(`/adresse/${cookies.kundenId}`);
        const responsePayment = await getRequest(
          `/zahlung/${cookies.kundenId}`
        );
        console.log(responseAdress, "responseAdress");
        console.log(responsePayment, "responsePayment");
        dispatch(addPayment(responsePayment));
        dispatch(addNewAdress(responseAdress));
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
    setEditedData(data);
    setEditMode(true);
  };

  const handleOpenAdress = () => {
    setShowFields(true);
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
      //ToDo: Add new Adress
      const putAdressData = await sendPutRequest("/adresse", adressData);
      dispatch(addNewAdress(putAdressData));
      setShowFields(false);
    } catch (error) {
      CustomToast.error("Fehler beim Hinzufügen der Adresse");
    }
  };

  const handleCancel = () => {
    setEditedData(null);
    setEditMode(false);
  };

  const handleCancelAdress = () => {
    setEditedData(null);
    setShowFields(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("submit");
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const paymentData: PaymentData = {
      kundenId: cookies.kundenId,
      paypalEmail: data.get("paypalEmail") as string,
      bankname: data.get("bankName") as string,
      bic: data.get("bic") as string,
      iban: data.get("iban") as string,
    };
    if (paymentData.paypalEmail && !paymentData.paypalEmail.includes("@")) {
      CustomToast.error("Bitte gebe eine gültige E-Mail-Adresse ein");
      return;
    }
    if (
      !(
        paymentData.paypalEmail ||
        (paymentData.bankname && paymentData.bic && paymentData.iban)
      )
    ) {
      CustomToast.error(
        "Es muss mindestens PayPal oder Lastschrift ausgewählt sein"
      );
      return;
    }

    try {
      const putPaymentData = await sendPutRequest("/zahlung", paymentData);

      dispatch(addPayment(putPaymentData));
      setEditedData(null);
      setEditMode(false);
    } catch (error) {
      CustomToast.error("Fehler beim Speichern der Daten");
      console.log(error);
    }
  };

  return (
    <div>
      <Container>
        <Card>
          <Title>Adresse</Title>
          <Grid container spacing={2} justifyContent={"center"}>
            <Grid item xs={12} sm={showFields ? 6 : 12}>
              <ScrollableContainer>
                {/* map über responseAdress */}

                <Grid>
                  <Paragraph>
                    <strong>Postleitzahl: </strong>
                    {adressInformation.postleitzahl}
                  </Paragraph>
                  <Paragraph>
                    <strong>Stadt: </strong>
                    {adressInformation.ort}
                  </Paragraph>
                  <Paragraph>
                    <strong>Straße: </strong>
                    {adressInformation.strasse}
                  </Paragraph>
                  <Paragraph>
                    <strong>Hausnummer: </strong>
                    {adressInformation.hausnummer}
                  </Paragraph>
                  <Paragraph>
                    <strong>Hausnummerzusatz: </strong>
                    {adressInformation.hausnummerzusatz}
                  </Paragraph>
                </Grid>
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

          {editMode ? (
            <form onSubmit={e => handleSubmit(e)}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormGroup>
                    <Title>
                      <FaPaypal size={30} />
                    </Title>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="paypalEmail"
                        label="PayPal Email"
                        name="paypalEmail"
                        defaultValue={paymentInformation.paypalEmail}
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
                    <Title>
                      <Bank size={30} />
                    </Title>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="bankName"
                        label="Bankname"
                        name="bankName"
                        defaultValue={paymentInformation.bankname}
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
                        defaultValue={paymentInformation.bic}
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
                        defaultValue={paymentInformation.iban}
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
                  </FormGroup>
                </FormControl>
              </Grid>

              <Button style={{ color: colors.companycolor }} type="submit">
                Speichern
              </Button>

              <Button
                style={{ color: colors.companycolor }}
                onClick={handleCancel}
              >
                Abbrechen
              </Button>
            </form>
          ) : (
            <div>
              <Grid container gap={10} justifyContent={"center"}>
                <Grid
                  item
                  alignItems={"center"}
                  display={"flex"}
                  justifyContent={"center"}
                  flexDirection={"column"}
                >
                  <Paragraph>
                    <strong>Zahlungsart</strong>
                  </Paragraph>
                  <FaPaypal size={30} />
                  <Paragraph>
                    <strong>Paypal-Email:</strong>{" "}
                    {paymentInformation.paypalEmail}
                  </Paragraph>
                  <Bank size={30} />
                  <Paragraph>
                    <strong>Bankname:</strong> {paymentInformation.bankname}
                  </Paragraph>
                  <Paragraph>
                    <strong>BIC:</strong> {paymentInformation.bic}
                  </Paragraph>
                  <Paragraph>
                    <strong>IBAN: </strong>
                    {paymentInformation.iban}
                  </Paragraph>
                  <LogoutButton
                    className="black-color white-orange "
                    onClick={() => handleEdit(adressInformation)}
                  >
                    <Pencil size={20} />
                  </LogoutButton>
                </Grid>
              </Grid>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
}
