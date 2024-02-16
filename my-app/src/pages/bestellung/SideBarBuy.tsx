import { useEffect, useState, useTransition } from "react";
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
import { StyledDatePicker, Calendar, Popper } from "./Calendar";
import { de } from "date-fns/locale";
import { colors, formatNumber } from "../general/constants";
import { CustomToast } from "../general/toast.style";
import { useDispatch, useSelector } from "react-redux";
import { CartState, PaymentDataState } from "../../redux/types";
import { clearCart } from "../../redux/cartReducer";
import { PayPalPayment } from "./PaypalPayment";
import {
  sendDeleteRequest,
  sendPostRequest,
} from "../../serverFunctions/generelAPICalls";
import { useCookies } from "react-cookie";
import { KUNDEN_ID } from "../../globalVariables/global";
import { Bank } from "phosphor-react";
import { FaPaypal } from "react-icons/fa";

interface SideBarProps {
  produktAnzahl: number;
  price: number;
}

export default function SideBarBuy({ price }: SideBarProps): JSX.Element {
  const { loggedIn } = useLoggedIn();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [cookies] = useCookies([KUNDEN_ID, "ZahlungsId"]);
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
  const paymentInformation = useSelector(
    (state: { payment: PaymentDataState }) => state.payment.selectedPayments
  );

  const handleBuyNow = () => {
    setShowPopup(true);
    startTransition(() => {
      setLoad(true);
    });
  };
  const handleSideChange = () => {
    setShowPopup(false);
    navigate("/LogIn");
  };

  const handleClosePopup = () => {
    if (showThankyouPopup === true) {
      dispatch(clearCart());
    }
    setShowPopup(false);
    setShowThankyouPopup(false);
  };
  // Initialisieren Sie selectedPayments basierend auf den vorhandenen Zahlungsinformationen
  const [selectedPayments, setSelectedPayments] = useState(() => {
    if (
      paymentInformation?.paypalData?.paypalEmail &&
      paymentInformation.lastschriftData?.bankname &&
      paymentInformation.lastschriftData?.bic &&
      paymentInformation.lastschriftData?.iban
    ) {
      return ["Paypal"];
    } else if (
      paymentInformation?.paypalData?.paypalEmail &&
      !paymentInformation.lastschriftData?.bankname
    ) {
      return ["Paypal"];
    } else if (
      paymentInformation?.lastschriftData?.bankname &&
      paymentInformation.lastschriftData?.bic &&
      paymentInformation.lastschriftData?.iban &&
      !paymentInformation.paypalData?.paypalEmail
    ) {
      return ["Lastschrift"];
    } else {
      return [];
    }
  });
  useEffect(() => {
    // Überprüfen Sie die Zahlungsinformationen und aktualisieren Sie die Anzeige der Schaltflächen
    if (
      paymentInformation?.paypalData?.paypalEmail &&
      paymentInformation.lastschriftData?.bankname &&
      paymentInformation.lastschriftData?.bic &&
      paymentInformation.lastschriftData?.iban
    ) {
      setSelectedPayments(["Paypal"]);
    } else if (
      paymentInformation?.paypalData?.paypalEmail &&
      !paymentInformation.lastschriftData?.bankname
    ) {
      setSelectedPayments(["Paypal"]);
    } else if (
      paymentInformation?.lastschriftData?.bankname &&
      paymentInformation.lastschriftData?.bic &&
      paymentInformation.lastschriftData?.iban &&
      !paymentInformation.paypalData?.paypalEmail
    ) {
      setSelectedPayments(["Lastschrift"]);
    } else {
      setSelectedPayments([]);
    }
  }, [paymentInformation]); // Abhängigkeiten der useEffect Hook

  const handleThankyouPopup = async () => {
    if (!agbChecked && !selectedPayments.includes("Paypal")) {
      CustomToast.error("Bitte akzeptiere die AGBs");
      return;
    }
    try {
      const bodyForBestellung = {
        kundenId: cookies.kundenId,
        //Todo checken ob paypal ausgewählt ist
        isPaypal: true,
        gewünschtesLieferdatum: selectedDate,
      };
      console.log(bodyForBestellung);
      await sendPostRequest(`/bestellung`, bodyForBestellung);
      setShowPopup(false);
      setShowThankyouPopup(true);
    } catch (error) {
      CustomToast.error("Fehler beim Bestellen");
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

  const DatepickerInput = ({ ...props }) => (
    <input type="text" {...props} readOnly />
  );

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
            calendarContainer={Calendar}
            popperContainer={Popper}
            customInput={<DatepickerInput />}
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
          <h4 style={{ color: colors.black }}>
            Du hast {cartLength} Produkte in Deinem Warenkorb
          </h4>
        )}
      </SideBarInformation>
      <SideBarButton>
        <h3 style={{ color: colors.black }}>
          Gesamtpreis: {formatNumber(price)}€
        </h3>

        <Button className="white-orange black-color" onClick={handleBuyNow}>
          Weiter zum Bestellvorgang
        </Button>
      </SideBarButton>
      {showThankyouPopup && (
        <PopupBackdrop>
          <PopupWrapper>
            <h2>Danke für deine Bestellung!</h2>

            <div>
              <p>Fiktives Projekt, keine gültige Bestellung!</p>
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
          <PopupWrapper
            className="scrollable-popup"
            style={{
              overflowY: "scroll",
              maxHeight: "90vh",
            }}
          >
            {!loggedIn ? (
              <div style={{ color: colors.black }}>
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
                    href="http://delivery-breakfast.projekt.dhbw-heidenheim.de/AGBs_delivery-breakfast.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    AGBs
                  </a>{" "}
                </p>

                {
                  // Wenn PayPal-E-Mail und Bankinformationen vorhanden sind
                  paymentInformation?.paypalData?.paypalEmail &&
                  paymentInformation.lastschriftData?.bankname &&
                  paymentInformation.lastschriftData?.bic &&
                  paymentInformation.lastschriftData?.iban ? (
                    // Radio Button für PayPal oder Bankinformationen
                    <div>
                      <input
                        type="radio"
                        id="paypal"
                        name="payment"
                        value="paypal"
                        checked={selectedPayments.includes("Paypal")}
                        style={{ transform: "scale(1.5)" }}
                        onChange={() => setSelectedPayments(["Paypal"])}
                      />
                      <label htmlFor="paypal">
                        <FaPaypal size={30} />
                      </label>
                      <input
                        type="radio"
                        id="lastschrift"
                        name="payment"
                        value="lastschrift"
                        style={{ transform: "scale(1.5)" }}
                        onChange={() => setSelectedPayments(["Lastschrift"])}
                      />
                      <label htmlFor="lastschrift">
                        <Bank size={30} />
                      </label>
                    </div>
                  ) : null
                }
                {selectedPayments.includes("Lastschrift") ||
                (paymentInformation?.lastschriftData?.bankname &&
                  paymentInformation.lastschriftData?.bic &&
                  paymentInformation.lastschriftData?.iban &&
                  !paymentInformation.paypalData?.paypalEmail) ? (
                  <Button
                    onClick={() => handleThankyouPopup()}
                    className="black-color white-orange"
                  >
                    Kostenpflichtig Bestellen
                  </Button>
                ) : null}
                {selectedPayments.includes("Paypal") ||
                (paymentInformation?.paypalData?.paypalEmail &&
                  !paymentInformation.lastschriftData?.bankname) ||
                !paymentInformation?.lastschriftData?.bic ||
                !paymentInformation.lastschriftData?.iban ? (
                  <>
                    Kostenpflichtig Bestellen mit
                    <PayPalPayment
                      price={price}
                      handleThankyouPopup={handleThankyouPopup}
                      agbChecked={agbChecked}
                    />
                  </>
                ) : null}

                <Button
                  className="black-color white-orange"
                  onClick={() => handleClosePopup()}
                >
                  Zurück
                </Button>
              </>
            )}
          </PopupWrapper>
        </PopupBackdrop>
      )}
    </SideBarWrapper>
  );
}
