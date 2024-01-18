import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AdressDataState, AdressData } from "../../redux/types";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import { FaPaypal } from "react-icons/fa";
import { colors } from "../general/constants";
import { ZeitungsAbo } from "../Zeitungsabo";
import { Checkbox, FormGroup } from "@mui/material";
import { addNewAdress } from "../../redux/adressDataReducer";
import { getRequest } from "../../serverFunctions/generelAPICalls";
import { useCookies } from "react-cookie";
import { KUNDEN_ID } from "../../globalVariables/global";
import { CustomToast } from "../general/toast.style";

export default function AdressInformation(): JSX.Element {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<AdressData | null>(null);
  const [cookies, setCookie] = useCookies([KUNDEN_ID]);
  const adressInformation = useSelector(
    (state: { adress: AdressDataState }) => state.adress.AdressData
  );
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("cookies", cookies);

        const responseAdress = await getRequest(`/adresse/${cookies.kundenId}`);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const preparedData: AdressData = {
      postleitzahl: data.get("plz") as string,
      strasse: data.get("street") as string,
      ort: data.get("city") as string,
      hausnummer: data.get("hausnummer") as string,
      hausnummerzusatz: data.get("hausnummerzusatz") as string,
      bankName: data.get("bankName") as string,
      bic: data.get("bic") as string,
      iban: data.get("iban") as string,
      paypalEmail: data.get("paypalEmail") as string,
    };
    if (preparedData.paypalEmail && !preparedData.paypalEmail.includes("@")) {
      CustomToast.error("Bitte gebe eine gültige E-Mail-Adresse ein");
      return;
    }
    if (
      !preparedData.paypalEmail &&
      (!preparedData.bankName || !preparedData.bic || !preparedData.iban)
    ) {
      CustomToast.error(
        "Es muss mindestens PayPal oder Lastschrift ausgewählt sein"
      );
      return;
    }
    console.log(preparedData);
    dispatch(addNewAdress(preparedData));
    setEditedData(null);
    setEditMode(false);
  };
  const [hasSubscription, setHasSubscription] = useState(false);
  const [expiryDate, setExpiryDate] = useState(new Date());

  return (
    <Container>
      <Card>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <Grid>
              <Title>Adresse:</Title>
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

              <Title>Zeitungsabonnement:</Title>
              <ZeitungsAbo
                hasSubscription={hasSubscription}
                setHasSubscription={setHasSubscription}
                expiryDate={expiryDate}
                setExpiryDate={setExpiryDate}
              />
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
                        required
                        id="paypalEmail"
                        label="PayPal Email"
                        name="paypalEmail"
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
                        required
                        id="bankName"
                        label="Bankname"
                        name="bankName"
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
                        required
                        id="bic"
                        label="BIC"
                        name="bic"
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
                        required
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
            <Title>Persönliche Daten:</Title>
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
            <Paragraph>
              <strong>Zahlungsart: </strong>
              {adressInformation.paypalEmail ? (
                <FaPaypal size={30} />
              ) : (
                <Bank size={30} />
              )}
            </Paragraph>

            <LogoutButton
              style={{ display: "center" }}
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
