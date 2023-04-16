import React from "react";
import Warenkorb from "./Warenkorb";
import SideBarBuy from "./SideBarBuy";
import {
  WarenkorbWrapper,
  SideBarWrapper,
  BestellungsWrapper,
} from "./stylesBestellung/Bestellung.styles";
import Logo from "../../img/Logo.webp";

function WarenkorbSeite() {
  return (
    <WarenkorbWrapper>
      <BestellungsWrapper>
        <Warenkorb image={Logo} price={4.99} />
        <Warenkorb image={Logo} price={5.99} />
        <Warenkorb image={Logo} price={6.99} />
        <Warenkorb image={Logo} price={3.99} />
        <Warenkorb image={Logo} price={2.99} />
        <Warenkorb image={Logo} price={4.99} />
        <Warenkorb image={Logo} price={4.99} />
        <Warenkorb image={Logo} price={4.99} />
        <Warenkorb image={Logo} price={4.99} />
        <Warenkorb image={Logo} price={4.99} />
        <Warenkorb image={Logo} price={4.99} />
        <Warenkorb image={Logo} price={4.99} />
        <Warenkorb image={Logo} price={4.99} />
        <Warenkorb image={Logo} price={4.99} />
      </BestellungsWrapper>
      <SideBarWrapper>
        <SideBarBuy produktAnzahl={5} Preis={56} />
      </SideBarWrapper>
    </WarenkorbWrapper>
  );
}

export default WarenkorbSeite;
