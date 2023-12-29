import React, { useState, ChangeEvent, useRef } from "react";
import { useDispatch } from "react-redux"; // Import der useDispatch-Hook
// Import der addToCart-Action aus deiner Redux-Komponente
import {
  Container,
  Details,
  ImageContainer,
  Price,
  Title,
  Image,
  DetailsButton,
  ContainerBack,
  ContainerFront,
  Title2,
  Top,
  MiniH,
  ListContainer,
} from "./styles/ShoppingCard.styles";
import { BlackColorButton } from "../general/button";
import "react-toastify/dist/ReactToastify.css";
import { CustomToast } from "../general/toast.style";
import { addToCart } from "../../redux/action";
import { CartState } from "../../redux/types";
import { XCircle } from "phosphor-react";
import { FaSeedling } from "react-icons/fa";
import { useSelector } from "react-redux";
import { formatNumber } from "../general/constants";
import { Calendar, Popper, StyledDatePicker } from "../bestellung/Calendar";
import { de } from "date-fns/locale";

interface ShoppingCardProps {
  image: string;
  title: string;
  price: number;
}

const ShoppingCardNewspaper: React.FC<ShoppingCardProps> = ({
  image,
  title,
  price,
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [displayNone, setDisplayNone] = useState(false);
  const dispatch = useDispatch(); // Initialisierung der useDispatch-Hook
  const [load, setLoad] = useState(true);
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  const [selectedDate, setSelectedDate] = useState<Date>(minDate);

  const handleAddToCart = () => {
    CustomToast.error("Work in Progress"); //Hier muss irgendwann die API für Zeitungsabonnement aufgerufen werden
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

  const DatepickerInput = ({ ...props }) => (
    <input type="text" {...props} readOnly />
  );

  function CalendarComponent(): JSX.Element {
    return (
      <div>
        {load && (
          <StyledDatePicker
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat={"dd.MM.yyyy"}
            locale={de}
            popperPlacement={"top"}
            onFocus={() => {}}
            calendarContainer={Calendar}
            popperContainer={Popper}
            customInput={<DatepickerInput />}
          />
        )}
      </div>
    );
  }

  return (
    <Container flipped={isFlipped}>
      <ContainerFront flipped={isFlipped} displayNone={displayNone}>
        <ImageContainer>
          <Image src={image} alt="product" />
        </ImageContainer>
        <Details>
          <Title style={{ paddingLeft: "0px" }}>{title}</Title>
          <DetailsButton onClick={handleDetailsClick}>
            Details anzeigen
          </DetailsButton>
          <Price>Preis: {formatNumber(price)} €</Price>
          <CalendarComponent />
          <BlackColorButton
            onClick={handleAddToCart}
            caption="Zum Warenkorb hinzufügen"
          />
        </Details>
      </ContainerFront>
      <ContainerBack flipped={isFlipped} displayNone={displayNone}>
        <Top>
          <Title2 style={{ paddingLeft: "0px" }}>{title}</Title2>
          <XCircle size={30} onClick={handleDetailsClick} />
        </Top>
        <p>
          Aktuell gibt es keine Details. Irgendwelche Ideen? Sonst lösche ich
          die Details.
        </p>
      </ContainerBack>
    </Container>
  );
};

export default ShoppingCardNewspaper;
