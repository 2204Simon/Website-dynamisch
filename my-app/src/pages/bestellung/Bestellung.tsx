import Warenkorb from "./Warenkorb";
import SideBarBuy from "./SideBarBuy";
import {
  WarenkorbWrapper,
  SideBarWrapper,
  BestellungsWrapper,
} from "./stylesBestellung/Bestellung.styles";
import { CartArray, removeItemFromCart } from "../produkte/ShoppingCard";
import React from "react";

function WarenkorbSeite(): JSX.Element {
  const [sumPrice, setSumPrice] = React.useState(0);
  
  React.useEffect(() => {
    let total = 0;
    CartArray.forEach(item => {
      total += item.preis;
    });
    setSumPrice(total);
    console.log("es wird gerendert");
  }, []);

  return (
    <WarenkorbWrapper>
      <BestellungsWrapper>
        {CartArray.map((item, index) => (
          <Warenkorb
            key={index}
            image={item.logo}
            price={item.preis}
            onRemove={() => removeItemFromCart(index)}
            productName={item.produktname}
            count={item.anzahl}
          />
        ))}
      </BestellungsWrapper>
      <SideBarWrapper>
        <SideBarBuy produktAnzahl={CartArray.length} price={sumPrice} />
      </SideBarWrapper>
    </WarenkorbWrapper>
  );
}

export default WarenkorbSeite;
