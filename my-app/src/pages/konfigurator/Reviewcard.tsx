import React, { useState, ChangeEvent, useRef } from "react";
import { useDispatch } from "react-redux"; // Import der useDispatch-Hook
// Import der addToCart-Action aus deiner Redux-Komponente

import { BlackColorButton } from "../general/button";
import "react-toastify/dist/ReactToastify.css";
import { CustomToast } from "../general/toast.style";

import { CartItem, CartState } from "../../redux/types";
import { Plus, XCircle, Minus } from "phosphor-react";
import { FaSeedling } from "react-icons/fa";
import { useSelector } from "react-redux";
import { formatNumber } from "../general/constants";
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

export interface ShoppingCardProps {
  produktId: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
  type: string;
}

const Reviewcard: React.FC<ShoppingCardProps> = ({
  image,
  title,
  price,
  produktId,
  quantity,
  type,
}) => {
  const [displayNone, setDisplayNone] = useState(false);

  const cartItems = useSelector(
    (state: { cart: CartState }) => state.cart.cartItems
  );

  return (
    <Container flipped={false}>
      <ContainerFront flipped={false} displayNone={displayNone}>
        <ImageContainer>
          <Image src={image} alt="product" />
        </ImageContainer>
        <Details>
          <Title style={{ paddingLeft: "0px" }}>{title}</Title>
          <Price>Preis: {formatNumber(price)} €</Price>
          <Type>Einheit: {type}</Type>
          <Type>Menge: {quantity}</Type>
        </Details>
      </ContainerFront>
    </Container>
  );
};

export default Reviewcard;
