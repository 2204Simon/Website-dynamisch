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
import { CartItem, CartState } from "../../redux/types";
import { removeFromCart } from "../../redux/action";
function WarenkorbSeite(): JSX.Element {
  // Zugriff auf den Gesamtpreis aus dem Redux-Store
  const dispatch = useDispatch(); // Zugriff auf die dispatch-Funktion, um Aktionen auszulösen
  const cartItems = useSelector(
    (state: { cart: CartState }) => state.cart.cartItems
  );

  const handleRemoveItem = (item: CartItem) => {
    dispatch(removeFromCart(item)); // Aktion zum Entfernen eines Elements aus dem Warenkorb mit dispatch auslösen
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
        <h2 style={{ color: "black" }}>Sie haben nichts im Warenkorb</h2>
        <Button className="white-orange black-color">
          <RouterLink to="/Produkte">Zu den Produkten</RouterLink>
        </Button>
      </NoOrderTextWrapper>
      <NoOrderShoppingBag />
    </NoOrderContainer>
  ) : (
    <WarenkorbWrapper>
      <BestellungsWrapper>
        {cartItems.map((item, index) => (
          <Warenkorb
            key={index}
            image={item.logo}
            price={item.preis}
            onRemove={() => handleRemoveItem(item)} // pass the item index to handleRemoveItem
            productName={item.produktname}
            count={item.anzahl}
          />
        ))}
      </BestellungsWrapper>

      <SideBarBuy produktAnzahl={cartItems.length} price={sumPrice} />
    </WarenkorbWrapper>
  );
}

export default WarenkorbSeite;
