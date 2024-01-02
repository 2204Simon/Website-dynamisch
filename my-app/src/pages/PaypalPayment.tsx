import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";

export function PayPalPayment() {
  return (
    <PayPalScriptProvider
      options={
        {
          clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID as string,
          currency: "EUR",
        } as ReactPayPalScriptOptions
      }
    >
      <PayPalButtons fundingSource={FUNDING.PAYPAL} />
    </PayPalScriptProvider>
  );
}
