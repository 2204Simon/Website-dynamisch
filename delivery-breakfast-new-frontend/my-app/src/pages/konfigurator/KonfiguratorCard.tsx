import React, { useState, ChangeEvent } from "react";
import { BlackColorButton } from "../general/button";
import "react-toastify/dist/ReactToastify.css";
import { CustomToast } from "../general/toast.style";
import { Plus, Minus } from "phosphor-react";
import { colors, formatNumber } from "../general/constants";
import {
  Container,
  Details,
  ImageContainer,
  Price,
  Type,
  Quantity,
  QuantityInput,
  Title,
  Image,
  PlusQuantity,
  MinusQuantity,
  ContainerFront,
} from "../produkte/styles/ShoppingCard.styles";
import { Ingredient } from "./Konfigurator";

export interface ShoppingCardProps {
  topping: Ingredient;
  handleSelect: Function;
}

const ShoppingCard: React.FC<ShoppingCardProps> = input => {
  const [displayNone, setDisplayNone] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);

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

  const handlePlus = (quantity: number) => {
    quantity += 1;
    if (quantity === 6) {
      CustomToast.error("Die maximale Anzahl wurde erreicht!");
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

  const handleButtonClick = () => {
    input.handleSelect(input.topping, quantity);
    setQuantity(0);
  };

  return (
    <Container flipped={false}>
      <ContainerFront flipped={false} displayNone={displayNone}>
        <ImageContainer>
          <Image src={input.topping.zutatBild} alt="product" />
        </ImageContainer>
        <Details>
          <Title style={{ paddingLeft: "0px" }}>
            {input.topping.zutatsname}
          </Title>
          <Price>Preis: {formatNumber(input.topping.zutatspreis)} €</Price>
          <Type>Einheit: {input.topping.zutatseinheit}</Type>

          <Quantity>
            <MinusQuantity onClick={() => handleMinus(quantity)}>
              <Minus color={colors.black} />
            </MinusQuantity>
            <QuantityInput
              type="text"
              id="quantity"
              name="quantity"
              pattern="[0-9]*"
              value={quantity}
              onChange={handleQuantityChange}
              inputMode="numeric"
            />
            <PlusQuantity onClick={() => handlePlus(quantity)}>
              <Plus color={colors.black} />
            </PlusQuantity>
          </Quantity>

          <BlackColorButton
            onClick={() => handleButtonClick()}
            caption="Zur Konfiguration hinzufügen"
          />
        </Details>
      </ContainerFront>
    </Container>
  );
};

export default ShoppingCard;
