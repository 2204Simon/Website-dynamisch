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

  const handleCancel = () => {
    setEditedData(null);
    setEditMode(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("submit");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const preparedData: AdressData = {
      kundenId: cookies.kundenId,
      postleitzahl: data.get("plz") as string,
      strasse: data.get("street") as string,
      ort: data.get("city") as string,
      hausnummer: data.get("hausnummer") as string,
      hausnummerzusatz: data.get("hausnummerzusatz") as string,
    };
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
    console.log(preparedData);
    try {
      const putAdressData = await sendPutRequest("/adresse", preparedData);
      const putPaymentData = await sendPutRequest("/zahlung", paymentData);
      dispatch(addNewAdress(putAdressData));
      dispatch(addPayment(putPaymentData));
      setEditedData(null);
      setEditMode(false);
    } catch (error) {
      CustomToast.error("Fehler beim Speichern der Daten");
      console.log(error);
    }
  };
  const [hasSubscription, setHasSubscription] = useState(false);
  const [expiryDate, setExpiryDate] = useState(new Date());

  return (
    <Container>
      <Card>
        {editMode ? (
          <form onSubmit={e => handleSubmit(e)}>
            <Grid justifyContent={"center"}>
              <Title>Adresse</Title>
              <TextField
                fullWidth
                required
                id="plz"
                label="Postleitzahl"
                name="plz"
                defaultValue={editedData?.postleitzahl}
                InputLabelProps={{
                  sx: {
                    backgroundColor: "white",
                    color: colors.companycolor,
                  },
                }}
              />
              <TextField
                fullWidth
                required
                id="city"
                label="Stadt"
                name="city"
                defaultValue={editedData?.ort}
                InputLabelProps={{
                  sx: {
                    backgroundColor: "white",
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
                InputLabelProps={{
                  sx: {
                    backgroundColor: "white",
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
                InputLabelProps={{
                  sx: {
                    backgroundColor: "white",
                    color: colors.companycolor,
                  },
                }}
              />

              <TextField
                fullWidth
                id="hausnummerzusatz"
                label="Hausnummerzusatz"
                name="hausnummerzusatz"
                defaultValue={editedData?.hausnummerzusatz}
                InputLabelProps={{
                  sx: {
                    backgroundColor: "white",
                    color: colors.companycolor,
                  },
                }}
              />
              {/* 
              <Title>Zeitungsabonnement:</Title> */}
              {/* <ZeitungsAbo
                hasSubscription={hasSubscription}
                setHasSubscription={setHasSubscription}
                expiryDate={expiryDate}
                setExpiryDate={setExpiryDate}
              /> */}
              <Grid item xs={12}>
                <Title>Zahlungsmöglichkeiten: </Title>
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
                        }}
                        InputLabelProps={{
                          sx: {
                            backgroundColor: "white",
                            color: colors.companycolor,
                          },
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
                        }}
                        InputLabelProps={{
                          sx: {
                            backgroundColor: "white",
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
                        }}
                        InputLabelProps={{
                          sx: {
                            backgroundColor: "white",
                            color: colors.companycolor,
                          },
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
                        }}
                        InputLabelProps={{
                          sx: {
                            backgroundColor: "white",
                            color: colors.companycolor,
                          },
                        }}
                      />
                    </Grid>
                  </FormGroup>
                </FormControl>
              </Grid>
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
            <Title style={{ textAlign: "center" }}>Persönliche Daten</Title>
            <Grid container gap={10} justifyContent={"center"}>
              <Grid item>
                <Paragraph>
                  <strong>Postleitzahl: </strong>
                  {adressInformation?.postleitzahl}
                </Paragraph>
                <Paragraph>
                  <strong>Stadt: </strong>
                  {adressInformation?.ort}
                </Paragraph>
                <Paragraph>
                  <strong>Straße: </strong>
                  {adressInformation?.strasse}
                </Paragraph>
                <Paragraph>
                  <strong>Hausnummer: </strong>
                  {adressInformation?.hausnummer}
                </Paragraph>
                <Paragraph>
                  <strong>Hausnummerzusatz: </strong>
                  {adressInformation?.hausnummerzusatz}
                </Paragraph>
              </Grid>
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
                <Paragraph>{paymentInformation.paypalEmail}</Paragraph>
                <Bank size={30} />
                <Paragraph>{paymentInformation.bankname}</Paragraph>
                <Paragraph>{paymentInformation.bic}</Paragraph>
                <Paragraph>{paymentInformation.iban}</Paragraph>
              </Grid>
            </Grid>
            <LogoutButton
              className="black-color white-orange "
              onClick={() => handleEdit(adressInformation)}
            >
              <Pencil size={20} />
            </LogoutButton>
          </div>
        )}
      </Card>
    </Container>
  );
}
