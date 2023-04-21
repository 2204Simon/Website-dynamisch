import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { Button } from "./pages/general/button.styles";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { addNewUser } from "./redux/action";
import { LogInData } from "./redux/types";

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

export default function SignInTest() {
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
    dispatch(addNewUser(preparedData));
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
                    backgroundColor: "white", // Hier den gewünschten Farbcode eintragen
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
                    backgroundColor: "white", // Hier den gewünschten Farbcode eintragen
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
                    backgroundColor: "white", // Hier den gewünschten Farbcode eintragen
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                InputLabelProps={{
                  sx: {
                    backgroundColor: "white", // Hier den gewünschten Farbcode eintragen
                  },
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            className="black-color white-orange"
            // onClick={handleClick}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>Already have an account? Sign in</Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
