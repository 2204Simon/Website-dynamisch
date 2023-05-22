import { useState, useTransition } from "react";
import Logo from "../../img/Logo.webp";
import {
  LogoImage,
  PopupBackdrop,
  PopupWrapper,
  SideBarWrapper,
  SideBarButton,
  SideBarInformation,
} from "./stylesBestellung/SideBarBuy.styles";
import { Button } from "../general/button.styles";
import Adressdaten from "../loggedIn/AdressData";
import { useLoggedIn } from "../../globalVariables/loggedin";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { StyledDatePicker } from "./Calendar";
import { de } from "date-fns/locale";
import { formatNumber } from "../general/constants";
import { CustomToast } from "../general/toast.style";
import PackageLocationQRCode from "./PackageLocationQRCode";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/action";
import { CartState } from "../../redux/types";

interface SideBarProps {
  produktAnzahl: number;
  price: number;
}

export default function SideBarBuy({ price }: SideBarProps): JSX.Element {
  const { loggedIn } = useLoggedIn();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showThankyouPopup, setShowThankyouPopup] = useState(false);
  const dispatch = useDispatch();
  const [agbChecked, setAgbChecked] = useState(false);
  const [, startTransition] = useTransition();
  const [load, setLoad] = useState(false);
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  const [selectedDate, setSelectedDate] = useState<Date>(minDate);
  const handleBuyNow = () => {
    setShowPopup(true);
    startTransition(() => {
      setLoad(true);
    });
    document.body.style.overflow = "hidden";
  };

  const handleSideChange = () => {
    setShowPopup(false);
    document.body.style.overflow = "auto";
    navigate("/LogIn");
  };

  const handleClosePopup = () => {
    if (showThankyouPopup === true) {
      dispatch(clearCart());
    }
    setShowPopup(false);
    setShowThankyouPopup(false);
    document.body.style.overflow = "auto";
  };

  const handleThankyouPopup = () => {
    if (!agbChecked) {
      CustomToast.error("Bitte die ABGs bestätigen!");
    } else {
      setShowPopup(false);
      setShowThankyouPopup(true);
      document.body.style.overflow = "hidden";
    }
  };

  const handleAgbCheckboxChange = () => {
    setAgbChecked(!agbChecked);
  };
  const cartItems = useSelector(
    (state: { cart: CartState }) => state.cart.cartItems
  );
  let cartLength = 0;
  cartItems.map(item => (cartLength += item.anzahl));

  function CalendarComponent(): JSX.Element {
    return (
      <div>
        {load && (
          <StyledDatePicker
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat={"dd.MM.yyyy"}
            locale={de}
            popperPlacement={"top"}
            onFocus={() => {}}
          />
        )}
      </div>
    );
  }

  return (
    <SideBarWrapper>
      <SideBarInformation>
        <h2>Dein Einkauf</h2>
        <LogoImage src={Logo} alt="Logo" />
        {cartLength === 1 ? (
          <h4>Du hast 1 Produkt in Deinem Warenkorb</h4>
        ) : (
          <h4>Du hast {cartLength} Produkte in Deinem Warenkorb</h4>
        )}
      </SideBarInformation>
      <SideBarButton>
        <h3>Gesamtpreis: {formatNumber(price)}€</h3>

        <Button className="white-orange black-color" onClick={handleBuyNow}>
          Weiter zum Bestellvorgang
        </Button>
      </SideBarButton>
      {showThankyouPopup && (
        <PopupBackdrop>
          <PopupWrapper>
            <h2>Danke für deine Bestellung!</h2>
            <p>fiktives Projekt, keine gültige Bestellung!</p>
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
      {showPopup && (
        <PopupBackdrop>
          <PopupWrapper>
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
                <h2 style={{ color: "black" }}>Sind Deine Daten aktuell?</h2>
                <Adressdaten />
                <div>Tag der Lieferung</div>
                <CalendarComponent />
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
