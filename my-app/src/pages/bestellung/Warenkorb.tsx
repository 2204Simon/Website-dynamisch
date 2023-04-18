import React from "react";

import {
  Container,
  ContentContainer,
  Count,
  Image,
  Price,
  ProductName,
  RemoveButton,
  TotalPrice,
} from "./stylesBestellung/Warenkorb.styles";
import { Trash } from "phosphor-react";
interface WarenkorbProps {
  image: string;
  productName: string;
  count: number;
  price: number;
  onRemove: () => void;
}

export default function Warenkorb({
  image,
  count,
  productName,
  price,
  onRemove,
}: WarenkorbProps): JSX.Element {
  const totalPrice = count * price; // Berechnung des Gesamtpreises
  return (
    <Container>
      <Image src={image} />
      <ContentContainer>
        <div>
          <Count>{count}x</Count>
          <ProductName>{productName}:</ProductName>
          <Price>{price}€</Price>
        </div>
        <div>
          <ProductName>Gesamtpreis:</ProductName>
          <TotalPrice>{totalPrice}€</TotalPrice>{" "}
          {/* Anzeige des Gesamtpreises */}
        </div>
      </ContentContainer>
      <RemoveButton onClick={onRemove}>
        <Trash size={30} />
      </RemoveButton>
    </Container>
  );
}
