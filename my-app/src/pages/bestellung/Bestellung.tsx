import Warenkorb from "./Warenkorb";
import SideBarBuy from "./SideBarBuy";
import {
  WarenkorbWrapper,
  SideBarWrapper,
  BestellungsWrapper,
} from "./stylesBestellung/Bestellung.styles";
import { CartArray } from "../produkte/ShoppingCard";
import React from "react";

function WarenkorbSeite(): JSX.Element {
  const [sumPrice, setSumPrice] = React.useState(0);
  const [copieCardArray, setCopieCardArray] = React.useState(CartArray);
  React.useEffect(() => {
    let total = 0;
    CartArray.forEach(item => {
      total += item.preis;
    });
    setSumPrice(total);
    console.log("es wird gerendert");
  }, [copieCardArray.length]);

  const removeItemFromCart = (itemIndex: number) => {
    const newCartArray = [...copieCardArray];
    newCartArray.splice(itemIndex, 1);
    setCopieCardArray(newCartArray);
    console.log("mew Array", copieCardArray);
  };

  return (
    <WarenkorbWrapper>
      <BestellungsWrapper>
        {copieCardArray.map((item, index) => (
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
