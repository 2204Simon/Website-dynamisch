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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { StyledDatePicker } from "./stylesBestellung/Calendar.styles";

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

  function CalendarComponent() {
    const [startDate, setStartDate] = useState<Date>(new Date());
    return (
      <div>
        <StyledDatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          minDate={new Date()}
        />
      </div>
    );
  }
  return (
    <SideBarWrapper>
      <div>
        <LogoImage src={Logo} alt="Logo" />
        <h2>Dein Einkauf</h2>
        {produktAnzahl === 1 ? (
          <h4>Du hast 1 Produkt in Deinem Warenkorb</h4>
        ) : (
          <h4>Du hast {produktAnzahl} Produkte in Deinem Warenkorb</h4>
        )}
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
                <h1>Du musst Dich anmelden um Dein perfektes Frühstück zu bestellen!</h1>
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
                  Sind Deine Adressdaten aktuell?
                </h2>
                <Adressdaten />
                <div>Tag der Lieferung</div>
                <CalendarComponent />
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
