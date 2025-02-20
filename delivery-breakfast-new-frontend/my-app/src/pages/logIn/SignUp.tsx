import * as React from "react";

import Avatar from "@mui/material/Avatar";
import { Button } from "../general/button.styles";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useLoggedIn } from "../../globalVariables/loggedin";
import { AdressData, LogInData } from "../../redux/types";
import { useDispatch } from "react-redux";
import { colors } from "../general/constants";
import { FormControl, FormGroup } from "@mui/material";
import { FaPaypal } from "react-icons/fa";
import { Title } from "../loggedIn/UserInformation.styles";
import { CustomToast } from "../general/toast.style";
import { useState } from "react";
import { Bank } from "phosphor-react";
import { addNewUser } from "../../redux/userReducer";
import { addNewAdress, setSelectedAdress } from "../../redux/adressDataReducer";
import { sendPostRequest } from "../../serverFunctions/generelAPICalls";
import { useCookies } from "react-cookie";
import { KUNDEN_ID } from "../../globalVariables/global";
import {
  addLastschriftData,
  addPaypalData,
  setSelectedPayment,
} from "../../redux/paymentReaducer";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    ></Typography>
  );
}

export default function SignUp() {
  const { changeLoggedIn } = useLoggedIn();
  const navigate = useNavigate();
  //später für season token
  const [cookies, setCookie] = useCookies([KUNDEN_ID]);

  function PasswordMismatch() {
    return CustomToast.error("Die Passwörter sind nicht identisch");
  }

  const dispatch = useDispatch();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;
      const firstName = formData.get("firstName") as string;
      const lastName = formData.get("lastName") as string;
      const telefonnummer = formData.get("telefonnummer") as string;
      const plz = formData.get("plz") as string;
      const street = formData.get("street") as string;
      const city = formData.get("city") as string;
      const hausnummer = formData.get("hausnummer") as string;
      const hausnummerzusatz = formData.get("hausnummerzusatz") as string;
      const bankName = formData.get("bankName") as string;
      const bic = formData.get("bic") as string;
      const iban = formData.get("iban") as string;
      const paypalEmail = formData.get("paypalEmail") as string;

      if (password !== confirmPassword) {
        PasswordMismatch();
        return;
      }
      if (!(paypalEmail || (bankName && bic && iban))) {
        CustomToast.error(
          "Es muss mindestens PayPal oder Lastschrift ausgewählt sein"
        );
        return;
      }

      if (plz.length !== 5) {
        CustomToast.error("Die Postleitzahl muss 5-stellig sein");
        return;
      }

      if (iban.length !== 22 && iban) {
        CustomToast.error("Die IBAN muss 22-stellig sein");
        return;
      }

      if (bic.length !== 8 && bic.length !== 11 && bic) {
        CustomToast.error("Die BIC muss 8 oder 11-stellig sein");
        return;
      }
      if (paypalEmail && !validateEmail(paypalEmail)) {
        CustomToast.error("Bitte gebe eine gültige PayPal E-Mail-Adresse ein");
        return;
      }
      const preparedData: LogInData = {
        email: email,
        passwort: password,
        vorname: firstName,
        nachname: lastName,
        telefonnummer: telefonnummer,
      };
      const kundenData = await sendPostRequest("/kunde", preparedData);
      console.log(kundenData);
      if (!validateEmail(email)) {
        CustomToast.error("Bitte gebe eine gültige E-Mail-Adresse ein");
        return;
      }
      const adressDataFormData: AdressData = {
        kundenId: kundenData.kundenId,
        postleitzahl: plz,
        strasse: street,
        ort: city,
        hausnummer: hausnummer,
        hausnummerzusatz: hausnummerzusatz,
      };
      const paymentLastschriftFormData = {
        kundenId: kundenData.kundenId,
        bankname: bankName,
        bic: bic,
        iban: iban,
      };
      const paymentPaypalFormData = {
        kundenId: kundenData.kundenId,
        paypalEmail: paypalEmail,
      };

      const adressData = await sendPostRequest("/adresse", adressDataFormData);
      if (
        paymentLastschriftFormData.bankname &&
        paymentLastschriftFormData.bic &&
        paymentLastschriftFormData.iban
      ) {
        const paymentLastschriftData = await sendPostRequest(
          "/zahlung",
          paymentLastschriftFormData
        );
        dispatch(addLastschriftData(paymentLastschriftData));
        dispatch(setSelectedPayment(paymentLastschriftData));
      }
      if (paymentPaypalFormData.paypalEmail) {
        const paymentPaypalData = await sendPostRequest(
          "/zahlung",
          paymentPaypalFormData
        );
        dispatch(addPaypalData(paymentPaypalData));
        dispatch(setSelectedPayment(paymentPaypalData));
      }
      // const response eventuel season token
      setCookie(KUNDEN_ID, kundenData.kundenId, { path: "/" });
      // console.log(cookies.kundenId);
      dispatch(addNewUser(kundenData));
      dispatch(addNewAdress(adressData));
      dispatch(setSelectedAdress(adressData));
      navigate("/LoggedIn");
      changeLoggedIn();
    } catch (error: any) {
      console.log(error);
      if (error.message.includes("409")) {
        CustomToast.error("Die E-Mail-Adresse ist bereits vorhanden");
      } else {
        console.log(error);
        CustomToast.error("Ein unbekannter Fehler ist aufgetreten");
      }
    }
  };
  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <div>
      <Container component="main" maxWidth="xs" style={{ height: "auto" }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: `${colors.companycolor}` }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrieren
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            style={{ paddingLeft: "20px" }}
          >
            <Grid container spacing={2}>
              <Title>Persönliche Daten</Title>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  required
                  id="firstName"
                  label="Vorname"
                  autoFocus
                  inputProps={{
                    maxLength: 50,
                    style: { color: `${colors.black}` },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: colors.companycolor,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="lastName"
                  label="Nachname"
                  name="lastName"
                  autoComplete="family-name"
                  inputProps={{
                    maxLength: 50,
                    style: { color: `${colors.black}` },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: colors.companycolor,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="email"
                  label="Email Adresse"
                  name="email"
                  autoComplete="email"
                  inputProps={{
                    maxLength: 50,
                    style: { color: `${colors.black}` },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: colors.companycolor,
                    },
                  }}
                  onChange={e => {
                    e.target.value = e.target.value.trim();
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="telefonnumber"
                  name="telefonnummer"
                  fullWidth
                  required
                  id="telefonnummer"
                  label="Telefonnummer"
                  autoFocus
                  inputProps={{
                    maxLength: 50,
                    style: { color: `${colors.black}` },
                  }}
                  InputLabelProps={{
                    sx: {
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
                  required
                  name="password"
                  label="Passwort mit mindestens 8 Zeichen"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  InputLabelProps={{
                    sx: {
                      color: colors.companycolor,
                    },
                  }}
                  inputProps={{
                    maxLength: 50,
                    style: { color: `${colors.black}` },
                    pattern: ".{8,}",
                    title: "Passwort muss mindestens 8 Zeichen haben",
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="confirmPassword"
                  label="Passwort bestätigen"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  inputProps={{
                    maxLength: 50,
                    style: { color: `${colors.black}` },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: colors.companycolor,
                    },
                  }}
                />
              </Grid>
              <Title>Adressdaten</Title>
              <Grid item xs={12} xl={12}>
                <TextField
                  fullWidth
                  required
                  id="plz"
                  label="Postleitzahl"
                  name="plz"
                  inputProps={{
                    maxLength: 50,
                    style: { color: `${colors.black}` },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: colors.companycolor,
                    },
                  }}
                  onChange={e => {
                    e.target.value = e.target.value.trim();
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  required
                  id="city"
                  label="Stadt"
                  name="city"
                  inputProps={{
                    maxLength: 50,
                    style: { color: `${colors.black}` },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: colors.companycolor,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  required
                  id="street"
                  label="Straße"
                  name="street"
                  inputProps={{
                    maxLength: 50,
                    style: { color: `${colors.black}` },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: colors.companycolor,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="hausnummer"
                  label="Hausnummer"
                  name="hausnummer"
                  inputProps={{
                    maxLength: 50,
                    style: { color: `${colors.black}` },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: colors.companycolor,
                    },
                  }}
                  onChange={e => {
                    e.target.value = e.target.value.trim();
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="hausnummerzusatz"
                  label="Hausnummerzusatz"
                  name="hausnummerzusatz"
                  inputProps={{
                    maxLength: 50,
                    style: { color: `${colors.black}` },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: colors.companycolor,
                    },
                  }}
                  onChange={e => {
                    e.target.value = e.target.value.trim();
                  }}
                />
              </Grid>
              <Title>Zahlungsmöglichkeiten </Title>
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
                        inputProps={{
                          maxLength: 100,
                          style: { color: `${colors.black}` },
                        }}
                        InputLabelProps={{
                          sx: {
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
                        inputProps={{
                          maxLength: 50,
                          style: { color: `${colors.black}` },
                        }}
                        InputLabelProps={{
                          sx: {
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
                          style: { color: `${colors.black}` },
                        }}
                        InputLabelProps={{
                          sx: {
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
                          style: { color: `${colors.black}` },
                        }}
                        InputLabelProps={{
                          sx: {
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
            </Grid>
            <Button type="submit" className="black-color white-orange">
              Registrieren
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  component={RouterLink}
                  to="/LogIn"
                  variant="body2"
                  style={{ color: colors.companycolor }}
                >
                  Hast du bereits einen Account? Anmelden
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </div>
  );
}
