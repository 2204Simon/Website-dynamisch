import { useState } from "react";
import Logo from "../../img/Logo.webp";
import {
  LogoImage,
  PopupBackdrop,
  PopupWrapper,
  SideBarWrapper,
} from "./stylesBestellung/SideBarBuy.styles";
import { Button } from "../general/button.styles";
import Adressdaten from "../loggedIn/AdressData";
import { useLoggedIn } from "../../globalVariables/loggedin";
import SignIn from "../logIn/LogIn";
import { useNavigate } from "react-router-dom";

interface SideBarProps {
  produktAnzahl: number;
  price: number;
}

export default function SideBarBuy({
  produktAnzahl,
  price,
}: SideBarProps): JSX.Element {
  const { loggedIn } = useLoggedIn();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleBuyNow = () => {
    setShowPopup(true);
    document.body.style.overflow = "hidden";
  };

  const handleSideChange = () => {
    setShowPopup(false);
    document.body.style.overflow = "auto";
    navigate("/LogIn");
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    document.body.style.overflow = "auto";
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
            {!loggedIn ? (
              <div>
                <h1>Du musst dich anmelden um bei uns zu bestellen</h1>
                <Button
                  className="black-color white-orange"
                  onClick={() => handleClosePopup()}
                >
                  Zurück
                </Button>
                <Button
                  className="black-color white-orange"
                  onClick={() => handleSideChange()}
                >
                  Zum SignIn
                </Button>
              </div>
            ) : (
              <>
                <h2 style={{ color: "black" }}>
                  Sind deine Adressdaten akutell?
                </h2>
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
              </>
            )}
          </PopupWrapper>
        </PopupBackdrop>
      )}
    </SideBarWrapper>
  );
}
