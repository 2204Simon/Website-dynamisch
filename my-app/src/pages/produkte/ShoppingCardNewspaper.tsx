import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { useDispatch } from "react-redux"; // Import der useDispatch-Hook
// Import der addToCart-Action aus deiner Redux-Komponente
import { BlackColorButton } from "../general/button";
import "react-toastify/dist/ReactToastify.css";
import { CustomToast } from "../general/toast.style";
import { Calendar, Popper, StyledDatePicker } from "../bestellung/Calendar";
import { de } from "date-fns/locale";
import { formatNumber } from "../general/constants";
import {
  BannerContainer,
  BannerContent,
  BannerRight,
  BannerImage,
  BannerTitle,
  XCircleWrapper,
} from "./styles/NewspaperBanner.styles";
import { XCircle } from "phosphor-react";

interface ShoppingCardProps {
  image: string;
  title: string;
  basePrice: number;
  back: Function;
}

const NewspaperBanner: React.FC<ShoppingCardProps> = ({
  image,
  title,
  basePrice,
  back,
}) => {
  const [load, setLoad] = useState(true);
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 12);
  const [selectedDate, setSelectedDate] = useState<Date>(minDate);

  const handleAddToCart = () => {
    CustomToast.error("Work in Progress"); //Hier muss irgendwann die API für Zeitungsabonnement aufgerufen werden
  };

  const DatepickerInput = ({ ...props }) => (
    <input type="text" {...props} readOnly />
  );

  const [selectedDays, setSelectedDays] = useState(1);
  const [price, setPrice] = useState(basePrice);

  useEffect(() => {
    setPrice(basePrice + (selectedDays > 1 ? selectedDays - 1 : 0));
  }, [selectedDays, basePrice]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const selectedDateMidnight = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const minDateMidnight = new Date(
      minDate.getFullYear(),
      minDate.getMonth(),
      minDate.getDate()
    );
    const days = Math.ceil(
      (selectedDateMidnight.getTime() - minDateMidnight.getTime()) /
        (1000 * 60 * 60 * 24)
    );
    setSelectedDays(days + 1);
  };

  function CalendarComponent(): JSX.Element {
    return (
      <div>
        {load && (
          <StyledDatePicker
            selected={selectedDate}
            onChange={handleDateChange}
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
    <>
      <XCircleWrapper>
        <XCircle
          size={30}
          onClick={() => back()}
          style={{ cursor: "pointer" }}
        />
      </XCircleWrapper>
      <BannerContainer>
        <BannerImage src={image} alt="Newspaper" />
        <BannerContent>
          <BannerTitle>{title}</BannerTitle>
          <p>Wähle aus, wie lange du abonnieren möchtest:</p>
          <CalendarComponent />
        </BannerContent>
        <BannerRight>
          <BlackColorButton
            onClick={handleAddToCart}
            caption="Zum Warenkorb hinzufügen"
          />
        </BannerRight>
      </BannerContainer>
    </>
  );
};

export default NewspaperBanner;
