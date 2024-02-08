import { PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import { CustomToast } from "../general/toast.style";
import { useSelector } from "react-redux";
import { AdressDataState, UserDataState } from "../../redux/types";

export function PayPalPayment({ price, handleThankyouPopup, agbChecked }: any) {
  const userInformation = useSelector(
    (state: { user: UserDataState }) => state.user
  );
  const adressInformation = useSelector(
    (state: { adress: AdressDataState }) => state.adress.AdressData
  );

  return (
    <div style={{ position: "relative" }}>
      <PayPalButtons
        fundingSource={FUNDING.PAYPAL}
        createOrder={(data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: price,
                },

                shipping: {
                  address: {
                    //TODO: replace with selectedAdress
                    address_line_1: `${adressInformation[0].strasse}`,
                    address_line_2: adressInformation[0].hausnummerzusatz
                      ? `${adressInformation[0].hausnummer} ${adressInformation[0].hausnummerzusatz}`
                      : `${adressInformation[0].hausnummer}`,
                    admin_area_2: `${adressInformation[0].ort}`,
                    postal_code: `${adressInformation[0].postleitzahl}`,
                    country_code: "DE",
                  },
                  name: {
                    full_name: `${userInformation.LogInData.vorname} ${userInformation.LogInData.nachname}`,
                  },
                },
              },
            ],
            payer: {
              email_address: `${userInformation.LogInData.email}`, // Ersetzen Sie dies durch die tatsächliche E-Mail-Adresse
            },
          });
        }}
        onError={err => {
          // Zeigt einen Toast-Fehler an, wenn ein Fehler auftritt
          console.log(userInformation.LogInData.email);
          console.error(err);
          CustomToast.error(
            `Fehler beim Bezahlen ausgehend von der PayPal Schnittstelle. Laden Sie die Seite erneut und versuchen Sie es erneut.`
          );
        }}
        onCancel={data => {
          // Zeigt einen Toast an, wenn die Zahlung abgebrochen wird
          CustomToast.error("Die Zahlung wurde abgebrochen.");
        }}
        onApprove={(data, actions) => {
          // Ruft die handleThankyouPopup Funktion auf, wenn die Zahlung erfolgreich ist
          return handleThankyouPopup();
        }}
        disabled={!agbChecked} // Deaktiviert den Button, wenn die AGBs nicht bestätigt wurden
      />

      {!agbChecked && (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          onClick={() =>
            CustomToast.error("Bitte bestätigen Sie die AGBs, um fortzufahren.")
          }
        />
      )}
    </div>
  );
}
