import { useSelector, useDispatch } from "react-redux";

import Warenkorb from "./Warenkorb";
import SideBarBuy from "./SideBarBuy";
import {
  WarenkorbWrapper,
  BestellungsWrapper,
  NoOrderContainer,
  NoOrderTextWrapper,
  NoOrderShoppingBag,
} from "./stylesBestellung/Bestellung.styles";
import { Button } from "../general/button.styles";
import { Link as RouterLink } from "react-router-dom";
import { CartItem, CartState, ProduktApiType } from "../../redux/types";
import {
  addMultipleToCart,
  clearCart,
  removeFromCart,
} from "../../redux/cartReducer";
import { useEffect, useState } from "react";
import {
  getRequest,
  sendDeleteRequest,
} from "../../serverFunctions/generelAPICalls";
import { CustomToast } from "../general/toast.style";
import { useCookies } from "react-cookie";
import { KUNDEN_ID } from "../../globalVariables/global";
import { loadImage } from "../produkte/Produkt";
import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";

function WarenkorbSeite(): JSX.Element {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies([KUNDEN_ID]);

  const cartItems = useSelector(
    (state: { cart: CartState }) => state.cart.cartItems
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverCartItems: Array<CartItem> = await getRequest(
          `/Warenkorb/${cookies.kundenId}`
        );
        console.log(serverCartItems);

        if (serverCartItems.length === 0 || !serverCartItems) {
          throw new Error("Keine Daten gefunden");
        }

        const updatedCartItems = [];
        for (const item of serverCartItems) {
          const loadedimage = await loadImage(item.bild);
          console.log(item.anzahl);

          console.log({ ...item, bild: loadedimage });
          // sehr sus aber sonst muss viel geändert werden

          updatedCartItems.push({ ...item, bild: loadedimage });
        }

        dispatch(clearCart());
        dispatch(addMultipleToCart(updatedCartItems));
      } catch (error) {
        CustomToast.error("Fehler beim Laden der Daten");
      }
    };

    fetchData();
  }, []);
  const handleRemoveItem = async (item: CartItem) => {
    try {
      await sendDeleteRequest(
        `Warenkorb/${cookies.kundenId}/${item.produktId}`
      );
      dispatch(removeFromCart(item));
    } catch (error) {
      CustomToast.error("Fehler beim Löschen des Produkts");
    }
  };
  const priceCounter = (): number => {
    let price = 0;
    cartItems.forEach(item => (price += item.preis * item.anzahl));
    console.log(price);
    return parseFloat(price.toFixed(2));
  };
  const sumPrice = priceCounter();

  return cartItems.length === 0 ? (
    <NoOrderContainer>
      <NoOrderTextWrapper>
        <h2 style={{ color: "black" }}>Du hast nichts im Warenkorb</h2>
        <p>
          Schaue Dich doch bei unseren Produkten um. Hier gibt es eine große
          Auswahl an Getränken, Speisen und Frühstücksmenüs!
        </p>
        <RouterLink to="/Produkte">
          <Button className="white-orange black-color">Zu den Produkten</Button>
        </RouterLink>
      </NoOrderTextWrapper>
      <NoOrderShoppingBag />
    </NoOrderContainer>
  ) : (
    <WarenkorbWrapper>
      <BestellungsWrapper>
        {cartItems.map((item, index) => (
          <Warenkorb
            key={index}
            image={item.bild}
            price={item.preis}
            onRemove={() => handleRemoveItem(item)} // Item an handleRemoveItem übergeben
            productName={item.titel}
            count={item.anzahl}
            editabel={true}
          />
        ))}
      </BestellungsWrapper>
      <PayPalScriptProvider
        options={
          {
            clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID as string,
            currency: "EUR",
            components: "buttons",
          } as ReactPayPalScriptOptions
        }
      >
        <SideBarBuy produktAnzahl={cartItems.length} price={sumPrice} />
      </PayPalScriptProvider>
    </WarenkorbWrapper>
  );
}

export default WarenkorbSeite;
