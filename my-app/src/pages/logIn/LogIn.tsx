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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserDataState } from "../../redux/types";
import { CustomToast } from "../general/toast.style";
import { ToastContainer } from "react-toastify";
import { useLoggedIn } from "../../globalVariables/loggedin";
import { colors } from "../general/constants";

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

const theme = createTheme();

export default function SignIn() {
  const userInformation = useSelector(
    (state: { user: UserDataState }) => state.user.LogInData
  );
  const navigate = useNavigate();
  const { changeLoggedIn } = useLoggedIn();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (email.trim() === "" || password.trim() === "") {
      CustomToast.error("Bitte füllen Sie alle Felder aus");
      return;
    }

    try {
      // Sende Anmeldeinformationen an das Backend
      const response = await fetch("http://localhost:3000/api/v1/kunde/login", {
        // Ändern Sie die URL entsprechend Ihrer neuen Route
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ email, password }),
      });

      // Überprüfe die Antwort des Backends
      if (response.ok) {
        console.log("Erfolgreicher Login");
        navigate("/loggedIn");
        changeLoggedIn();
      } else {
        const responseBody = await response.json();
        if (responseBody.error === "User not found") {
          CustomToast.error("Benutzer nicht gefunden");
        } else {
          CustomToast.error("Falsches Passwort oder E-Mail");
        }
      }
    } catch (error) {
      console.error("Fehler bei der Anmeldung:", (error as any).message);
      CustomToast.error("Fehler bei der Anmeldung");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{ height: "600px" }}>
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
            Anmelden
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
            noValidate
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              required
              inputProps={{
                maxLength: 50,
              }}
              InputLabelProps={{
                sx: {
                  backgroundColor: "white",
                },
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputProps={{
                maxLength: 50,
              }}
              InputLabelProps={{
                sx: {
                  backgroundColor: "white",
                },
              }}
            />

            <Button type="submit" className="black-color white-orange">
              Anmelden
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  component={RouterLink}
                  to="/SignUp"
                  variant="body2"
                  style={{ color: colors.companycolor }}
                >
                  Keinen Account? Hier geht´s zur Registrierung
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
}
