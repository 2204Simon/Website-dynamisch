import React from "react";
import { BlackColorButton } from "../general/button";
import Logo from "../../img/Logo.webp";
import {
  LogoImage,
  SideBarWrapper,
} from "./stylesBestellung/SideBarBuy.styles";
import { Button } from "../general/button.styles";
import { Link } from "react-router-dom";

interface SideBarProps {
  produktAnzahl: number;
  price: number;
}

export default function SideBarBuy({
  produktAnzahl,
  price,
}: SideBarProps): JSX.Element {
  return (
    <SideBarWrapper>
      <div>
        <LogoImage src={Logo} alt="Logo" />
        <h2>Ihr Einkauf</h2>
        <h4>Du hast {produktAnzahl} Produkte in deinem Warenkorb</h4>
      </div>
      <div>
        <h3>Gesamtpreis: {price}€</h3>
        <Button className="white-orange black-color">
          <Link to="/ContactForm">Jetzt kaufen</Link>
        </Button>
      </div>
    </SideBarWrapper>
  );
}
