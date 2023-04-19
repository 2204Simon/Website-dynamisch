import Warenkorb from "./Warenkorb";
import SideBarBuy from "./SideBarBuy";
import {
  WarenkorbWrapper,
  BestellungsWrapper,
  NoOrderContainer,
  NoOrderTextWrapper,
  NoOrderShoppingBag,
} from "./stylesBestellung/Bestellung.styles";
import { CartArray, removeItemFromCart } from "../produkte/ShoppingCard";
import React from "react";
import { Button } from "../general/button.styles";
import { ShoppingBag } from "phosphor-react";

function WarenkorbSeite(): JSX.Element {
  const [sumPrice, setSumPrice] = React.useState(0);

  React.useEffect(() => {
    let total = 0;
    if (CartArray && CartArray.length > 0) {
      CartArray.forEach(item => {
        total += item.preis * item.anzahl;
      });
    }
    setSumPrice(total);
    console.log("es wird gerendert");
  }, []);

  const handleRemoveItem = (itemIndex: number) => {
    removeItemFromCart(itemIndex);
    setSumPrice(
      prevPrice =>
        prevPrice - CartArray[itemIndex]?.preis * CartArray[itemIndex]?.anzahl
    );
  };

  return CartArray.length === 0 ? (
    <NoOrderContainer>
      <NoOrderTextWrapper>
        <h2 style={{ color: "black" }}>Sie haben nichts im Warenkorb</h2>
        <Button className="white-orange black-color">Zu den Produkten</Button>
      </NoOrderTextWrapper>
      <NoOrderShoppingBag />
    </NoOrderContainer>
  ) : (
    <WarenkorbWrapper>
      <BestellungsWrapper>
        {CartArray.map((item, index) => (
          <Warenkorb
            key={index}
            image={item.logo}
            price={item.preis}
            onRemove={() => handleRemoveItem(index)} // pass the item index to handleRemoveItem
            productName={item.produktname}
            count={item.anzahl}
          />
        ))}
      </BestellungsWrapper>

      <SideBarBuy produktAnzahl={CartArray.length} price={sumPrice} />
    </WarenkorbWrapper>
  );
}

export default WarenkorbSeite;
