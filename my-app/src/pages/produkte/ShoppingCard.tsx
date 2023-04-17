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

export const removeItemFromCart = (itemIndex: number) => {
  const newCartArray = [...CartArray];
  newCartArray.splice(itemIndex, 1);
  CartArray = newCartArray;
};

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
    //setQuantity(0);
    if (quantity === 0) {
      //PushUp Nachricht: "Bitte geben sie die Anzahl ein!"
      console.log("Bitte geben sie die Anzahl ein");
    } else {
      if (CartArray && CartArray.length === 0) {
        //Wird nur ausgeführt, wenn Array leer ist.
        CartArray.push({
          anzahl: anzahl,
          preis: price,
          logo: logo,
          produktname: productname,
        });
        console.log(CartArray);
      } else {
        //Wird ausgeführt wenn Array nicht leer ist
        for (let i = 0; i < CartArray.length; i++) {
          if (CartArray[i].produktname === productname) {
            //Wird ausgeführt, wenn Produkt bereits im Warenkorb ist
            CartArray[i].anzahl = anzahl;
            console.log(CartArray);
            return;
          }
        }
        CartArray.push({
          anzahl: anzahl,
          preis: price,
          logo: logo,
          produktname: productname,
        });
        console.log(CartArray);
      }
    }
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
