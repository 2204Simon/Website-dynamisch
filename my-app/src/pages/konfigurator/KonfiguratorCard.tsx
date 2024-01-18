import React, { useState, ChangeEvent, useRef } from "react";
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
  ContainerBack,
  ContainerFront,
  Title2,
  Top,
  MiniH,
  ListContainer,
} from "./styles/Konfigurator.styles";
import { BlackColorButton } from "../general/button";
import "react-toastify/dist/ReactToastify.css";
import { CustomToast } from "../general/toast.style";

import { CartItem, CartState } from "../../redux/types";
import { Plus, XCircle, Minus } from "phosphor-react";
import { FaSeedling } from "react-icons/fa";
import { useSelector } from "react-redux";
import { formatNumber } from "../general/constants";
import { addToCart, increaseQuantity } from "../../redux/cartReducer";
import {
  sendPostRequest,
  sendPutRequest,
} from "../../serverFunctions/generelAPICalls";
import { useCookies } from "react-cookie";
import { KUNDEN_ID } from "../../globalVariables/global";

interface ShoppingCardProps {
  produktId: string;
  image: string;
  title: string;
  price: number;
  content: string[];
  allergy: string[];
  veggie: boolean;
}

const ShoppingCard: React.FC<ShoppingCardProps> = ({
  image,
  title,
  price,
  content,
  allergy,
  veggie,
  produktId,
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [displayNone, setDisplayNone] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);
  const dispatch = useDispatch(); // Initialisierung der useDispatch-Hook
  const [cookie, setCookie] = useCookies([KUNDEN_ID]); // Initialisierung der useDispatch-Hook
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

  const addProduct = async (quantity2: number) => {
    const item: CartItem = {
      produktId: produktId,
      titel: title,
      bild: image,
      preis: price,
      anzahl: quantity,
    };
    try {
      const itemObjekt = {
        produktId: item.produktId,
        produktMenge: item.anzahl,
        kundenId: cookie.kundenId,
      };
      console.log(itemObjekt);
      const addedProdukt = await sendPutRequest("warenkorb", itemObjekt);
      CustomToast.success("Dein Produkt ist im Warenkorb!");
      const amount = item.anzahl;
      dispatch(increaseQuantity({ item, amount: quantity2 })); // Dispatch der addToCart-Action mit dem erstellten Item
    } catch (error) {
      CustomToast.error("Fehler hinzufügen (Serververbindung))");
    }
    dispatch(increaseQuantity({ item, amount: quantity2 }));
    CustomToast.success(`Es wurde  ${quantity} ${title} hinzugefügt!`);
  };

  const handleAddToCart = async () => {
    if (quantity === 0) {
      CustomToast.error("Bitte erhöhe die Menge!");
    } else {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].titel === title) {
          addProduct(quantity);
          return;
        }
      }
      const item = {
        produktId: produktId,
        titel: title,
        bild: image,
        preis: price,
        anzahl: quantity,
      };
      try {
        const itemObjekt = {
          produktId: item.produktId,
          produktMenge: item.anzahl,
          kundenId: cookie.kundenId,
        };
        console.log(itemObjekt);
        const addedProdukt = await sendPostRequest("warenkorb", itemObjekt);
        CustomToast.success("Dein Produkt ist im Warenkorb!");
        dispatch(addToCart(item as CartItem)); // Dispatch der addToCart-Action mit dem erstellten Item
      } catch (error) {
        CustomToast.error("Fehler hinzufügen (Serververbindung))");
      }
    }
  };

  const handlePlus = (quantity: number) => {
    quantity += 1;
    if (quantity === 100) {
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

  const isProcessingRef = useRef(false);

  const handleDetailsClick = () => {
    if (!isProcessingRef.current) {
      isProcessingRef.current = true; // Markiere den Klick als in Bearbeitung

      setIsFlipped(!isFlipped); // 2. Zustand ändern

      setTimeout(() => {
        setDisplayNone(!displayNone);
        isProcessingRef.current = false; // Markiere den Klick als abgeschlossen
      }, 500); // 0,5 Sekunden Verzögerung
    }
  };

  return (
    <Container flipped={isFlipped}>
      <ContainerFront flipped={isFlipped} displayNone={displayNone}>
        <ImageContainer>
          <Image src={image} alt="product" />
        </ImageContainer>
        <Details>
          <Title style={{ paddingLeft: "0px" }}>{title}</Title>
          <Price>Preis: {formatNumber(price)} €</Price>
          <BlackColorButton
            onClick={handleAddToCart}
            caption="Zur Konfiguration hinzufügen"
          />
        </Details>
      </ContainerFront>
      
    </Container>
  );
};

export default ShoppingCard;
