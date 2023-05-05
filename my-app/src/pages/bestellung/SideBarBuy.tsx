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
import "react-datepicker/dist/react-datepicker.css";
import { StyledDatePicker } from "./stylesBestellung/Calendar.styles";
import { de } from "date-fns/locale";
import { formatNumber } from "../general/constants";
import { CustomToast } from "../general/toast.style";
import PackageLocationQRCode from "../kontakt/PackageLocationQRCode";

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
  const [showThankyouPopup, setShowThankyouPopup] = useState(false);

  const [agbChecked, setAgbChecked] = useState(false);

  const handleBuyNow = () => {
    if (!agbChecked) {
      CustomToast.error("Bitte die ABGs bestätigen!");
    } else {
      setShowPopup(true);
      document.body.style.overflow = "hidden";
    }
  };

  const handleSideChange = () => {
    setShowPopup(false);
    document.body.style.overflow = "auto";
    navigate("/LogIn");
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowThankyouPopup(false);
    document.body.style.overflow = "auto";
  };

  const handleThankyouPopup = () => {
    setShowThankyouPopup(true);
    document.body.style.overflow = "hidden";
  };

  const handleAgbCheckboxChange = () => {
    setAgbChecked(!agbChecked);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  function CalendarComponent(): JSX.Element {
    const [startDate, setStartDate] = useState<Date>(minDate);
    return (
      <div>
        <StyledDatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          minDate={minDate}
          dateFormat={"dd.MM.yyyy"}
          locale={de}
          popperPlacement={"top"}
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
        <h3>Gesamtpreis: {formatNumber(price)}€</h3>

        <p>
          <input
            type="checkbox"
            onChange={handleAgbCheckboxChange}
            checked={agbChecked}
          />
          Ich akzeptiere die{" "}
          <a
            href="https://delivery-breakfast.projekt.dhbw-heidenheim.de/AGBs_delivery-breakfast.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            AGBs
          </a>{" "}
        </p>

        <Button className="white-orange black-color" onClick={handleBuyNow}>
          Weiter zum Zahlungsvorgang
        </Button>
      </div>

      {showPopup && (
        <PopupBackdrop>
          <PopupWrapper>
            {showThankyouPopup && (
              <PopupBackdrop>
                <PopupWrapper>
                  <h1 style={{ color: "black" }}>
                    Danke für deine Bestellung!
                  </h1>
                  <p style={{ color: "black" }}>
                    fiktives Projekt, keine gültige Bestellung!
                  </p>
                  <div>
                    <h2>Frühstücks Tracker</h2>
                    <PackageLocationQRCode
                      latitude={48.676666}
                      longitude={10.153616}
                    />
                  </div>
                  <Button
                    className="black-color white-orange"
                    onClick={() => handleClosePopup()}
                  >
                    Schließen
                  </Button>
                </PopupWrapper>
              </PopupBackdrop>
            )}

            {!loggedIn ? (
              <div>
                <h1>
                  Du musst Dich anmelden um Dein perfektes Frühstück zu
                  bestellen!
                </h1>
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
                  Zur Anmeldung
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
                  onClick={() => handleThankyouPopup()}
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
