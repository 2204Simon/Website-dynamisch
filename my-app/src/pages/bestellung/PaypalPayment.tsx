import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";

export function PayPalPayment({ price, address }: any) {
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
      />
    </PayPalScriptProvider>
  );
}
