import React from "react";

import {
  Container,
  Image,
  Price,
  RemoveButton,
} from "./stylesBestellung/Warenkorb.styles";
export default function Warenkorb({ image, price, onRemove }) {
  return (
    <Container>
      <Image src={image} />
      <Price>{price}</Price>
      <RemoveButton onClick={onRemove}>×</RemoveButton>
    </Container>
  );
}
