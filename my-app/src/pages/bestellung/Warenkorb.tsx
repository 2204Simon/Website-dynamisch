import React from "react";

import {
  Container,
  Image,
  Price,
  RemoveButton,
} from "./stylesBestellung/Warenkorb.styles";

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
  return (
    <Container>
      <Image src={image} />
      <h2>{productName}</h2>
      <h2>{count}</h2>
      <Price>{price}</Price>
      <RemoveButton onClick={onRemove}>x</RemoveButton>
    </Container>
  );
}
