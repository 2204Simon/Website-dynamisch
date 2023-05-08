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
import { LogInData } from "../../redux/types";
import { useDispatch } from "react-redux";
import { addNewAdressData, addNewUser } from "../../redux/action";
import { colors } from "../general/constants";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { FaEuroSign, FaPaypal, FaApplePay } from "react-icons/fa";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { Title } from "../loggedIn/UserInformation.styles";

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
  function handleClick(): void {
    console.log("changedlogin");
    changeLoggedIn();
  }
  const dispatch = useDispatch();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const preparedData: LogInData = {
      email: data.get("email") as string,
      password: data.get("password") as string,
      firstName: data.get("firstName") as string,
      lastName: data.get("lastName") as string,
    };
    const adressData = {
      street: data.get("street") as string,
      city: data.get("city") as string,
      housenumber: data.get("hausnummer") as string,
      payment: data.get("payment") as string,
    };
    console.log(preparedData);
    dispatch(addNewUser(preparedData));
    dispatch(addNewAdressData(adressData));
    navigate("/LoggedIn");
  };
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Title>Persönliche Daten:</Title>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  required
                  id="firstName"
                  label="First Name"
                  autoFocus
                  InputLabelProps={{
                    sx: {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  InputLabelProps={{
                    sx: {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  InputLabelProps={{
                    sx: {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  InputLabelProps={{
                    sx: {
                      backgroundColor: "white",
                    },
                  }}
                  inputProps={{
                    pattern: ".{8,}",
                    title: "Passwort muss mindestens 8 Zeichen haben",
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
                  InputLabelProps={{
                    sx: {
                      backgroundColor: "white",
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
                  InputLabelProps={{
                    sx: {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="city"
                  label="Stadt"
                  name="city"
                  InputLabelProps={{
                    sx: {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Grid>
              <Title>Zahlungsmöglichkeiten:</Title>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="Zahlung"
                  name="payment"
                  defaultValue={"Barzahlung"}
                >
                  <Grid item xs={12}>
                    <FormControlLabel
                      value="Barzahlung"
                      control={<Radio style={{ color: "#aa7d03" }} />}
                      label={
                        <div style={{ color: "#aa7d03" }}>
                          <FaEuroSign /> Bar
                        </div>
                      }
                    />
                  </Grid>
                  <FormControlLabel
                    value="SEPA Lastschriftmandat"
                    control={<Radio style={{ color: "#aa7d03" }} />}
                    label={
                      <div style={{ color: "#aa7d03" }}>
                        <AccountBalanceOutlinedIcon fontSize="small" /> SEPA
                        Lastschrift
                      </div>
                    }
                  />
                  <Grid item xs={12}>
                    <FormControlLabel
                      value="Paypal"
                      control={<Radio style={{ color: "#aa7d03" }} />}
                      label={
                        <div style={{ color: "#aa7d03" }}>
                          <FaPaypal size={20} />
                          <span></span>
                        </div>
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      value="Apple Pay"
                      control={<Radio style={{ color: "#aa7d03" }} />}
                      label={
                        <div style={{ color: "#aa7d03" }}>
                          <FaApplePay size={40} />
                        </div>
                      }
                    />
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
            <Button
              type="submit"
              className="black-color white-orange"
              onClick={handleClick}
            >
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
