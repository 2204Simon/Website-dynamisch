import {
  PayPalScriptProvider,
  PayPalButtons,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";

export function PayPalPayment() {
  return (
    <PayPalScriptProvider
      options={
        {
          clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID as string,
        } as ReactPayPalScriptOptions
      }
    >
      <PayPalButtons />
    </PayPalScriptProvider>
  );
}
