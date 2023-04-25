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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      data.get("email") === userInformation.email &&
      data.get("password") === userInformation.password
    ) {
      console.log("erfolgreicher Login");
      navigate("/loggedIn");
      changeLoggedIn();
    } else {
      CustomToast.error("falsches Passwort oder e-Mail");
    }
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
            Sign in
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
              InputLabelProps={{
                sx: {
                  backgroundColor: "white", // Hier den gewünschten Farbcode eintragen
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
              InputLabelProps={{
                sx: {
                  backgroundColor: "white", // Hier den gewünschten Farbcode eintragen
                },
              }}
            />

            <Button type="submit" className="black-color white-orange">
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/SignUp" variant="body2">
                  Have no account? Sign in
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
