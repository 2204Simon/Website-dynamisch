import React from "react";
import { BlackColorButton } from "../general/button";
import Logo from "../../img/Logo.webp";
import { LogoImage } from "./stylesBestellung/SideBarBuy.styles";

export default function SideBarBuy({ produktAnzahl, Preis }) {
  return (
    <>
      <div>
        <h2>Ihr Einkauf</h2>
        <LogoImage src={Logo} alt="Logo" />
        <h4>Sie haben {produktAnzahl} Produkte in ihrem Warenkorb</h4>
      </div>
      <div>
        <h3>Gesamtpreis:{Preis}€</h3>
        <BlackColorButton caption={"Jetzt Kaufen"} />
      </div>
    </>
  );
}
