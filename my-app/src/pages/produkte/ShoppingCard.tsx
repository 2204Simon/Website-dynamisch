import React, { useState, ChangeEvent } from "react";
import {
  Container,
  Details,
  ImageContainer,
  Price,
  Quantity,
  QuantityInput,
  Title,
} from "./styles/ShoppingCard.styles";
import Logo from "../../img/Logo.webp";
import { BlackColorButton } from "../general/button";

export let CartArray: TestArray = [];

interface ShoppingCardProps {
  image: string;
  title: string;
  price: number;
}

interface TestArrayItem {
  anzahl: number;
  preis: number;
  logo: string;
  produktname: string;
}

type TestArray = TestArrayItem[];

const ShoppingCard: React.FC<ShoppingCardProps> = ({ image, title, price }) => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  function AddToCart(
    productname: string,
    logo: string,
    price: number,
    anzahl: number
  ): void {
    setQuantity(0);
    CartArray.push({
      anzahl: anzahl,
      preis: price,
      logo: logo,
      produktname: productname,
    });
    // add logic to add item to cart
  }

  return (
    <Container>
      <ImageContainer>
        {/* <Image src={Logo} alt="Product" /> */}
      </ImageContainer>
      <Details>
        <Title>{title}</Title>
        <Price>Price: {price} €</Price>
        <Quantity>
          <label htmlFor="quantity">Quantity:</label>
          <QuantityInput
            type="number"
            id="quantity"
            name="quantity"
            min="0"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </Quantity>
        <BlackColorButton
          onClick={() => AddToCart(title, image, price, quantity)}
          caption="Zum Warenkorb hinzufügen"
        />
      </Details>
    </Container>
  );
};

export default ShoppingCard;
