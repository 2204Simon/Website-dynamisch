import React, { useState, ChangeEvent } from "react";
import { BlackColorButton } from "../../general/button";
import "react-toastify/dist/ReactToastify.css";
import { CustomToast } from "../../general/toast.style";
import { Plus, Minus } from "phosphor-react";
import { colors, formatNumber } from "../../general/constants";
import {
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
} from "../../produkte/styles/ShoppingCard.styles";
import { Ingredient } from "../../konfigurator/Konfigurator";
import {
  Container,
  ContainerFront,
  ProduktContainer,
  ProduktContainerFront,
  ZutatenContainer,
  ZutatenContainerFront,
} from "./manageProducts.styles";
import Produkt, { Zutat } from "../../produkte/Produkt";
import { ZutatApiType } from "../ZutatsForm";

export interface ShoppingCardProps {
  topping: Ingredient;
  handleSelect: Function;
}
export interface Produkt {
  produktId: string;
  titel: string;
  preis: number;
  bild: string;
  sparte: string;
  kundenId: string | null;
  createdAt: string;
  updatedAt: string;
  Zutaten: Array<Zutat>;
}

export interface ProductCardProps {
  topping: Produkt;
  handleEdit: Function;
  handleDelete: Function;
}

export interface ZutatCardProps {
  topping: ZutatApiType;
  handleEdit: Function;
  handleDelete: Function;
}

export const ProduktCard: React.FC<ShoppingCardProps> = input => {
  const [displayNone, setDisplayNone] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/^0+/, ""); // entfernt führende Nullen
    const parsedValue = Number(value); // konvertiert die eingegebene Zeichenfolge in eine Zahl

    if (isNaN(parsedValue)) {
      setQuantity(0); // wenn der Wert NaN ist, wird der Wert auf 0 gesetzt
      CustomToast.error("Ungültige Eingabe");
    } else {
      if (parsedValue > 500) {
        setQuantity(500);
      } else {
        setQuantity(parsedValue);
      }
    }
  };

  const handlePlus = (quantity: number) => {
    quantity += 1;
    if (quantity === 501) {
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
      <ContainerFront>
        {/* <ImageContainer>
          <Image src={input.topping.zutatBild} alt="product" />
        </ImageContainer> */}
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
              pattern="[0-9]**"
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
            caption="Zum Produkt hinzufügen"
          />
        </Details>
      </ContainerFront>
    </Container>
  );
};

export const ZutatCard: React.FC<ZutatCardProps> = input => {
  const handleButtonEdit = () => {
    input.handleEdit(input.topping.zutatsId);
  };
  const handleButtonDelete = () => {
    input.handleDelete(input.topping.zutatsId);
  };
  return (
    <ZutatenContainer flipped={false}>
      <ZutatenContainerFront>
        {/* <ImageContainer>
          <Image src={input.topping.zutatBild} alt="product" />
        </ImageContainer> */}
        <Details>
          <Title style={{ paddingLeft: "0px" }}>
            {input.topping.zutatsname}
          </Title>
          <Price>Preis: {formatNumber(input.topping.zutatspreis)} €</Price>
          <Type>Id: </Type>
          <Type>{input.topping.zutatsId}</Type>
          <Type>Einheit: {input.topping.zutatseinheit}</Type>
          <Type>Eigenschaft: {input.topping.zutatseigenschaft}</Type>
          <Type>Sparte: {input.topping.zutatensparte}</Type>
          <Type>Bild: {input.topping.zutatBild}</Type>

          <BlackColorButton
            onClick={() => handleButtonEdit()}
            caption="Ändern"
          />
          <BlackColorButton
            onClick={() => handleButtonDelete()}
            caption="Löschen"
          />
        </Details>
      </ZutatenContainerFront>
    </ZutatenContainer>
  );
};

export const ProduktInfosCard: React.FC<ProductCardProps> = input => {
  const [displayNone, setDisplayNone] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);

  const handleButtonEdit = () => {
    input.handleEdit(input.topping.produktId);
  };
  const handleButtonDelete = () => {
    input.handleDelete(input.topping.produktId);
  };

  return (
    <ProduktContainer flipped={false}>
      <ProduktContainerFront>
        {/* <ImageContainer>
          <Image src={input.topping.zutatBild} alt="product" />
        </ImageContainer> */}

        <Title style={{ paddingLeft: "0px" }}>{input.topping.titel}</Title>
        <Price>Preis: {formatNumber(input.topping.preis)} €</Price>
        <Type>Id:</Type>
        <Type>{input.topping.produktId}</Type>
        <Type>Sparte: {input.topping.sparte}</Type>
        <Type>KundenID: {input.topping.kundenId}</Type>
        <Type>Bild: {input.topping.bild}</Type>
        <Type>Erstellt: {input.topping.createdAt}</Type>
        <Type>Geändert: {input.topping.updatedAt}</Type>
        <Type> Zutaten:</Type>
        {input.topping.Zutaten.map(item => {
          return (
            <>
              <Type>- {item.zutatsname}</Type>
            </>
          );
        })}

        <BlackColorButton onClick={handleButtonEdit} caption="Ändern" />
        <BlackColorButton onClick={handleButtonDelete} caption="Löschen" />
      </ProduktContainerFront>
    </ProduktContainer>
  );
};
