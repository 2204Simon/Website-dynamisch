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
          clientId:
            "AVyT9gzsIvUM4isPoCk8F2U1aqr2X92U2ETBtHQJtAr2IqcNzlV7DKGDni0wNLjmqZV5rnpf2HUOKO4C",
        } as ReactPayPalScriptOptions
      }
    >
      <PayPalButtons />
    </PayPalScriptProvider>
  );
}
