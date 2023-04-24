import React, { useEffect } from "react";
import { Button } from "../general/button.styles";
import { useLoggedIn } from "../../globalVariables/loggedin";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
export default function DeinKonto(): JSX.Element {
  const { changeLoggedIn, loggedIn } = useLoggedIn(); // Verwende den useLoggedIn-Hook, um auf den globalen Zustand zuzugreifen

  function handleClick(): void {
    console.log("changedlogin");
    changeLoggedIn();
  }

  return (
    <div style={{ height: "100vh" }}>
      <h1>{loggedIn ? "Ihr Konto" : "Anmelden"}</h1>
      <Button className="black-color white-orange " onClick={handleClick}>
        <Link component={RouterLink} to="/LogIn" variant="body2">
          Ausloggen
        </Link>
      </Button>
    </div>
  );
}
