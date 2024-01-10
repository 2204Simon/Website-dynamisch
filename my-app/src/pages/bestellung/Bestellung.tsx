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
import { addToCart, removeFromCart } from "../../redux/cartReducer";
import { useEffect, useState } from "react";
import { getRequest } from "../../serverFunctions/generelAPICalls";
import { CustomToast } from "../general/toast.style";
import { useCookies } from "react-cookie";
import { KUNDEN_ID } from "../../globalVariables/global";
import { loadImage } from "../produkte/Produkt";

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

        for (const item of serverCartItems) {
          if (serverCartItems.length === 0 || !serverCartItems) {
            throw new Error("Keine Daten gefunden");
          }
          const loadedimage = await loadImage(item.bild);
          console.log({ ...item, bild: loadedimage });

          dispatch(addToCart({ ...item, bild: loadedimage }));
        }
      } catch (error) {
        CustomToast.error("Fehler beim Laden der Daten");
      }
    };

    fetchData();
  }, []);

  const handleRemoveItem = (item: CartItem) => {
    dispatch(removeFromCart(item));
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
          />
        ))}
      </BestellungsWrapper>
      <SideBarBuy produktAnzahl={cartItems.length} price={sumPrice} />
    </WarenkorbWrapper>
  );
}

export default WarenkorbSeite;
