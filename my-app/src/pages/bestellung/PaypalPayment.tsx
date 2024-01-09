import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";

export function PayPalPayment({ price }: any) {
  return (
    <PayPalScriptProvider
      options={
        {
          clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID as string,
          currency: "EUR",
        } as ReactPayPalScriptOptions
      }
    >
      <PayPalButtons
        fundingSource={FUNDING.PAYPAL}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: price,
                },
              },
            ],
          });
        }}
      />
    </PayPalScriptProvider>
  );
}
