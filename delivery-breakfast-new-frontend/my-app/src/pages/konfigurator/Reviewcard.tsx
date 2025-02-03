import React from "react";
import {
  Container,
  Details,
  ImageContainer,
  Price,
  Type,
  Title,
  Image,
  ContainerFront,
} from "../produkte/styles/ShoppingCard.styles";
import { Ingredient } from "./Konfigurator";
import { formatNumber } from "../general/constants";

const Reviewcard: React.FC<Ingredient> = (topping: Ingredient) => {
  return (
    <Container flipped={false}>
      <ContainerFront flipped={false} displayNone={false}>
        <ImageContainer>
          <Image src={topping.zutatBild} alt="product" />
        </ImageContainer>
        <Details>
          <Title style={{ paddingLeft: "0px" }}>{topping.zutatsname}</Title>
          <Price>Preis: {formatNumber(topping.zutatspreis)} €</Price>
          <Type>Einheit: {topping.zutatseinheit}</Type>
          <Type>Menge: {topping.zutatsmenge}</Type>
        </Details>
      </ContainerFront>
    </Container>
  );
};

export default Reviewcard;
