import React, { useEffect } from "react";
import { Button } from "../general/button.styles";
import { useLoggedIn } from "../../globalVariables/loggedin";

export default function DeinKonto(): JSX.Element {
  const { changeLoggedIn, loggedIn } = useLoggedIn(); // Verwende den useLoggedIn-Hook, um auf den globalen Zustand zuzugreifen

  function handleClick(): void {
    console.log("changedlogin");
    changeLoggedIn();
  }

  return (
    <>
      <h1>{loggedIn ? "Ihr Konto" : "Anmelden"}</h1>
      <Button className="black-color white-orange " onClick={handleClick}>
        Ausloggen
      </Button>
    </>
  );
}
