import React, { useState } from "react";
import Logo from "../../img/Logo.webp";
import {
  LogoImage,
  PopupBackdrop,
  PopupWrapper,
  SideBarWrapper,
} from "./stylesBestellung/SideBarBuy.styles";
import { Button } from "../general/button.styles";
import Adressdaten from "../loggedIn/AdressData"; // Import der Popup-Komponente

interface SideBarProps {
  produktAnzahl: number;
  price: number;
}

export default function SideBarBuy({
  produktAnzahl,
  price,
}: SideBarProps): JSX.Element {
  const [showPopup, setShowPopup] = useState(false); // State für das Anzeigen des Popups

  const handleBuyNow = () => {
    setShowPopup(true); // Setzen des State-Werts auf true, um das Popup anzuzeigen
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Setzen des State-Werts auf false, um das Popup zu schließen
    document.body.style.overflow = "auto"; // Freigeben des body-Scrolls
  };
  return (
    <SideBarWrapper>
      <div>
        <LogoImage src={Logo} alt="Logo" />
        <h2>Ihr Einkauf</h2>
        <h4>Du hast {produktAnzahl} Produkte in deinem Warenkorb</h4>
      </div>
      <div>
        <h3>Gesamtpreis: {price}€</h3>
        <Button className="white-orange black-color" onClick={handleBuyNow}>
          Jetzt kaufen
        </Button>
      </div>

      {showPopup && (
        <PopupBackdrop>
          <PopupWrapper>
            <h2 style={{ color: "black" }}>Sind deine Adressdaten akutell?</h2>
            <Adressdaten />
            <Button
              className="black-color white-orange"
              onClick={() => handleClosePopup()}
            >
              Zurück
            </Button>
            <Button
              className="black-color white-orange"
              onClick={() => handleClosePopup()}
            >
              Kostenpflichtig Bestellen
            </Button>
          </PopupWrapper>
        </PopupBackdrop>
      )}
    </SideBarWrapper>
  );
}
