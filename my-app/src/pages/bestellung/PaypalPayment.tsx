import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import { CustomToast } from "../general/toast.style";

export function PayPalPayment({ price, handleThankyouPopup, agbChecked }: any) {
  return (
    <PayPalScriptProvider
      options={
        {
          clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID as string,
          currency: "EUR",
        } as ReactPayPalScriptOptions
      }
    >
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
                      //TODO: replace with real address und name über Server
                      address_line_1: "123 Townsend St",
                      address_line_2: "Apt 2",
                      admin_area_2: "San Jose",
                      admin_area_1: "CA",
                      postal_code: "95131",
                      country_code: "US",
                    },
                    name: {
                      full_name: "John Doe",
                    },
                  },
                },
              ],
            });
          }}
          onError={err => {
            // Zeigt einen Toast-Fehler an, wenn ein Fehler auftritt
            CustomToast.error(`Fehler beim Bezahlen mit PayPal: ${err}`);
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
              CustomToast.error(
                "Bitte bestätigen Sie die AGBs, um fortzufahren."
              )
            }
          />
        )}
      </div>
    </PayPalScriptProvider>
  );
}
