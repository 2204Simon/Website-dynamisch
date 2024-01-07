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
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { FaPaypal } from "react-icons/fa";
import { Title } from "../loggedIn/UserInformation.styles";
import { CustomToast } from "../general/toast.style";
import { PayPalPayment } from "../PaypalPayment";
import { useState } from "react";
import { Bank } from "phosphor-react";
import { ZeitungsAbo } from "../Zeitungsabo";
import { addNewUser } from "../../redux/userReducer";
import { addNewAdress } from "../../redux/adressDataReducer";

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
  const [selectedPayment, setSelectedPayment] = useState("Paypal");

  function PasswordMismatch() {
    return CustomToast.error("Die Passwörter sind nicht identisch");
  }

  const dispatch = useDispatch();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const preparedData: LogInData = {
      email: email,
      passwort: formData.get("password") as string,
      vorname: formData.get("firstName") as string,
      nachname: formData.get("lastName") as string,
      telefonnummer: formData.get("telefonnummer") as string,
    };
    if (!validateEmail(email)) {
      CustomToast.error("Bitte gebe eine gültige E-Mail-Adresse ein");
      return;
    }
    const adressData: AdressData = {
      postleitzahl: formData.get("plz") as string,
      strasse: formData.get("street") as string,
      ort: formData.get("city") as string,
      hausnummer: formData.get("hausnummer") as string,
      zahlungsmethode: formData.get("payment") as string,
      bankName: formData.get("bankName") as string,
      bic: formData.get("bic") as string,
      iban: formData.get("iban") as string,
    };

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    if (password !== confirmPassword) {
      PasswordMismatch();
      return;
    }

    dispatch(addNewUser(preparedData));
    dispatch(addNewAdress(adressData));
    navigate("/LoggedIn");
    changeLoggedIn();
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
          <Avatar sx={{ m: 1, bgcolor: "#aa7d03" }}>
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
                  }}
                  InputLabelProps={{
                    sx: {
                      backgroundColor: "white",
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
                  id="email"
                  label="Email Adresse"
                  name="email"
                  autoComplete="email"
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
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="telefonnumber"
                  name="telefonnummer"
                  fullWidth
                  required
                  id="telefonnummer"
                  label="telefonnummer"
                  autoFocus
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
                  name="password"
                  label="Passwort mit mindestens 8 Zeichen"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  InputLabelProps={{
                    sx: {
                      backgroundColor: "white",
                      color: colors.companycolor,
                    },
                  }}
                  inputProps={{
                    maxLength: 50,
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
                  }}
                  InputLabelProps={{
                    sx: {
                      backgroundColor: "white",
                      color: colors.companycolor,
                    },
                  }}
                />
              </Grid>
              <Title>Adress Daten</Title>
              <Grid item xs={12} xl={12}>
                <TextField
                  fullWidth
                  required
                  id="plz"
                  label="Postleitzahl"
                  name="plz"
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
              <Grid item xs={12} sm={7}>
                <TextField
                  fullWidth
                  required
                  id="city"
                  label="Stadt"
                  name="city"
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

              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  required
                  id="street"
                  label="Straße"
                  name="street"
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
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  id="hausnummer"
                  label="Hausnummer"
                  name="hausnummer"
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

              <Title>Zahlungsmöglichkeiten:</Title>

              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="Zahlung"
                  name="payment"
                  defaultValue={"Paypal"}
                  onChange={event => setSelectedPayment(event.target.value)}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  <Grid item xs={12}>
                    <FormControlLabel
                      value="Paypal"
                      control={<Radio style={{ color: colors.companycolor }} />}
                      label={
                        <div>
                          <FaPaypal size={15} />
                        </div>
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      value="Lastschrift"
                      control={<Radio style={{ color: colors.companycolor }} />}
                      label={
                        <div>
                          <Bank size={20} />
                        </div>
                      }
                    />
                  </Grid>
                </RadioGroup>
              </FormControl>
              {selectedPayment === "Paypal" && <PayPalPayment />}
              {selectedPayment === "Lastschrift" && (
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
