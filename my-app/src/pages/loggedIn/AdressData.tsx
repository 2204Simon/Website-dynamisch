import React, { useState } from "react";
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
import { PayPalPayment } from "../PaypalPayment";
import { ZeitungsAbo } from "../Zeitungsabo";
import { Checkbox, FormGroup } from "@mui/material";
import { addNewAdress } from "../../redux/adressDataReducer";

export default function AdressInformation(): JSX.Element {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<AdressData | null>(null);
  const adressInformation = useSelector(
    (state: { adress: AdressDataState }) => state.adress.AdressData
  );
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
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
      plz: data.get("plz") as string,
      street: data.get("street") as string,
      city: data.get("city") as string,
      housenumber: data.get("hausnummer") as string,
      payment: selectedPayments.join(", "), // Verwenden Sie den selectedPayments Zustand
    };
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
                defaultValue={editedData?.plz}
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
                defaultValue={editedData?.city}
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
                defaultValue={editedData?.street}
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
                defaultValue={editedData?.housenumber}
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
              <Title>Zahlungsmöglichkeiten:</Title>
              <FormControl component="fieldset">
                <FormGroup>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedPayments.includes("Paypal")}
                          onChange={handlePaymentChange}
                          value="Paypal"
                          style={{ color: colors.companycolor }}
                        />
                      }
                      label={<FaPaypal size={15} />}
                    />
                  </Grid>
                  {selectedPayments.includes("Paypal") && (
                    <>
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
                      <PayPalPayment />
                    </>
                  )}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedPayments.includes("Lastschrift")}
                          onChange={handlePaymentChange}
                          value="Lastschrift"
                          style={{ color: colors.companycolor }}
                        />
                      }
                      label={<Bank size={20} />}
                    />
                  </Grid>
                  {selectedPayments.includes("Lastschrift") && (
                    <>
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
                    </>
                  )}
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
            <Title>Persönliche Daten:</Title>
            <Paragraph>
              <strong>Postleitzahl: </strong>
              {adressInformation?.plz}
            </Paragraph>
            <Paragraph>
              <strong>Stadt: </strong>
              {adressInformation?.city}
            </Paragraph>
            <Paragraph>
              <strong>Straße: </strong>
              {adressInformation?.street}
            </Paragraph>
            <Paragraph>
              <strong>Hausnummer: </strong>
              {adressInformation?.housenumber}
            </Paragraph>
            <Paragraph>
              <strong>Zahlungsart: </strong>
              {adressInformation?.payment}
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
