import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { Button } from "../general/button.styles";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { AddressBook, Coin, CreditCard } from "phosphor-react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import { Rowing } from "@mui/icons-material";
import { LoggedIn } from "../../globalVariables/loggedin";

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

export default function ContactForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#aa7d03" }}>
          <AddressBook />
        </Avatar>
        <Typography component="h1" variant="h5">
          Bestellformular
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                fullWidth
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
            <Grid item xs={12} alignItems={"center"}>
              <Avatar sx={{ m: 1, bgcolor: "#aa7d03" }}>
                <Coin />
              </Avatar>

              <Grid item>
                <Link component={RouterLink} to="/LogIn" variant="body2">
                  PayPal
                </Link>
              </Grid>
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-end">
            <Grid item>
              {LoggedIn ? null : (
                <Link component={RouterLink} to="/LogIn" variant="body2">
                  Sign In
                </Link>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
