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
import { addToCart, increaseQuantity } from "../../redux/action";
import { CartState } from "../../redux/types";
import { Plus, Minus } from "phosphor-react";
import { useSelector } from "react-redux";
import { formatNumber } from "../general/constants";

interface ShoppingCardProps {
  image: string;
  title: string;
  price: number;
}

const ShoppingCard: React.FC<ShoppingCardProps> = ({ image, title, price }) => {
  const [quantity, setQuantity] = useState<number>(0);
  const dispatch = useDispatch(); // Initialisierung der useDispatch-Hook
  const cartItems = useSelector(
    (state: { cart: CartState }) => state.cart.cartItems
  );

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/^0+/, ""); // entfernt führende Nullen
    const parsedValue = Number(value); // konvertiert die eingegebene Zeichenfolge in eine Zahl

    if (isNaN(parsedValue)) {
      setQuantity(0); // wenn der Wert NaN ist, wird der Wert auf 0 gesetzt
      CustomToast.error("Ungültige Eingabe");
    } else {
      if (parsedValue > 99) {
        setQuantity(99);
      } else {
        setQuantity(parsedValue);
      }
    }
  };

  const test = (quantity2: number) => {
    const item = {
      produktname: title,
      logo: image,
      preis: price,
      anzahl: quantity,
    };
    dispatch(increaseQuantity(item, quantity2));
  };

  const handleAddToCart = () => {
    if (quantity === 0) {
      CustomToast.error("Menge erhöhen");
    } else {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].produktname === title) {
          test(quantity);
          return;
        }
      }
      const item = {
        produktname: title,
        logo: image,
        preis: price,
        anzahl: quantity,
      };
      dispatch(addToCart(item)); // Dispatch der addToCart-Action mit dem erstellten Item
      CustomToast.success("Produkt im Warenkorb");
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
        <Title style={{ paddingLeft: "0px" }}>{title}</Title>
        <Price>Preis: {formatNumber(price)} €</Price>

        <Quantity>
          <label htmlFor="quantity">Menge:</label>
          <MinusQuantity onClick={() => handleMinus(quantity)}>
            <Minus />
          </MinusQuantity>
          <QuantityInput
            type="text"
            id="quantity"
            name="quantity"
            pattern="[0-9]*"
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
