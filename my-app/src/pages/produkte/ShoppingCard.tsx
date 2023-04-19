import React, { useState, ChangeEvent } from "react";
import {
  Container,
  Details,
  ImageContainer,
  Price,
  Quantity,
  QuantityInput,
  Title,
  Image,
} from "./styles/ShoppingCard.styles";
import { BlackColorButton } from "../general/button";
import "react-toastify/dist/ReactToastify.css";
import { CustomToast } from "../general/toast.style";

export let CartArray: TestArray = [];

export const removeItemFromCart = (itemIndex: number) => {
  const newCartArray = [...CartArray];
  newCartArray.splice(itemIndex, 1);
  CartArray = newCartArray;
  console.log(CartArray);
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
      CustomToast.error("Menge erhöhen");
      console.log("Bitte gebe eine Anzahl ein!");
    } else {
      //Wird ausgeführt wenn Array nicht leer ist
      for (let i = 0; i < CartArray.length; i++) {
        if (CartArray[i].produktname === productname) {
          //Wird ausgeführt, wenn Produkt bereits im Warenkorb ist
          CartArray[i].anzahl += anzahl;
          CustomToast.success("Produkt im Einkaufswagen");
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
      CustomToast.info("Produkt im Einkaufswagen");
      console.log(CartArray);
    }
  }

  return (
    <Container>
      <ImageContainer>
        <Image src={image} alt="product" />
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
