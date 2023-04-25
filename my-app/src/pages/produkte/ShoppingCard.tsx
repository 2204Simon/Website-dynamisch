import React, { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux"; // Import der useDispatch-Hook
// Import der addToCart-Action aus deiner Redux-Komponente
import {
  Container,
  Details,
  ImageContainer,
  Price,
  Quantity,
  QuantityInput,
  Title,
  Image,
  PlusQuantity,
  MinusQuantity,
} from "./styles/ShoppingCard.styles";
import { BlackColorButton } from "../general/button";
import "react-toastify/dist/ReactToastify.css";
import { CustomToast } from "../general/toast.style";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/action";
import { CartItem } from "../../redux/types";
import { Plus, Minus } from "phosphor-react";

interface ShoppingCardProps {
  image: string;
  title: string;
  price: number;
}

const ShoppingCard: React.FC<ShoppingCardProps> = ({ image, title, price }) => {
  const [quantity, setQuantity] = useState<number>(0);
  const dispatch = useDispatch(); // Initialisierung der useDispatch-Hook

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddToCart = () => {
    if (quantity === 0) {
      CustomToast.error("Menge erhöhen");
      console.log("Bitte gebe eine Anzahl ein!");
    } else {
      const item = {
        produktname: title,
        logo: image,
        preis: price,
        anzahl: quantity,
      };
      dispatch(addToCart(item)); // Dispatch der addToCart-Action mit dem erstellten Item
      CustomToast.success("Produkt im Warenkorb");
      console.log(item);
    }
  };

  const handlePlus = (quantity: number) => {
    quantity += 1;
    if (quantity === 100) {
      CustomToast.error("Maximale Anzahl erreicht");
    } else {
      setQuantity(Number(quantity));
    }
  };

  const handleMinus = (quantity: number) => {
    quantity -= 1;
    if (quantity === -1) {
    } else {
      setQuantity(Number(quantity));
    }
  };

  return (
    <Container>
      <ImageContainer>
        <Image src={image} alt="product" />
      </ImageContainer>
      <Details>
        <Title>{title}</Title>
        <Price>Preis: {price} €</Price>

        <Quantity>
          <label htmlFor="quantity">Menge:</label>
          <MinusQuantity onClick={() => handleMinus(quantity)}>
            <Minus />
          </MinusQuantity>
          <QuantityInput
            type="number"
            id="quantity"
            name="quantity"
            min="0"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <PlusQuantity onClick={() => handlePlus(quantity)}>
            <Plus />
          </PlusQuantity>
        </Quantity>

        <BlackColorButton
          onClick={handleAddToCart}
          caption="Zum Warenkorb hinzufügen"
        />
      </Details>
    </Container>
  );
};

export default ShoppingCard;
