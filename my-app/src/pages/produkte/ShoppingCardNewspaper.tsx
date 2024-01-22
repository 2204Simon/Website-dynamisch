import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import der useDispatch-Hook
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
import { CartItem, CartState } from "../../redux/types";
import { useCookies } from "react-cookie";
import { KUNDEN_ID } from "../../globalVariables/global";
import {
  sendPostRequest,
  sendPutRequest,
} from "../../serverFunctions/generelAPICalls";
import { addToCart, increaseQuantity } from "../../redux/cartReducer";

interface ShoppingCardProps {
  image: string;
  title: string;
  basePrice: number;
  back: Function;
  produktId: string;
}

const NewspaperBanner: React.FC<ShoppingCardProps> = ({
  image,
  title,
  basePrice,
  back,
  produktId,
}) => {
  const [load, setLoad] = useState(true);
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 12);
  const [selectedDate, setSelectedDate] = useState<Date>(minDate);
  const [selectedDays, setSelectedDays] = useState(1);
  const [price, setPrice] = useState(basePrice);
  const cartItems = useSelector(
    (state: { cart: CartState }) => state.cart.cartItems
  );
  const dispatch = useDispatch(); // Initialisierung der useDispatch-Hook
  const [cookie, setCookie] = useCookies([KUNDEN_ID]); // Initialisierung der useDispatch-Hook

  const addProduct = async (quantity2: number) => {
    const item: CartItem = {
      produktId: produktId,
      titel: title,
      bild: image,
      preis: price,
      anzahl: selectedDays,
    };
    try {
      const itemObjekt = {
        produktId: item.produktId,
        produktMenge: item.anzahl,
        kundenId: cookie.kundenId,
      };
      console.log(itemObjekt);
      const addedProdukt = await sendPutRequest("/warenkorb", itemObjekt);
      CustomToast.success("Dein Produkt ist im Warenkorb!");
      const amount = item.anzahl;
      dispatch(increaseQuantity({ item, amount: quantity2 })); // Dispatch der addToCart-Action mit dem erstellten Item
    } catch (error) {
      CustomToast.error("Fehler hinzufügen (Serververbindung))");
    }
    dispatch(increaseQuantity({ item, amount: quantity2 }));
    CustomToast.success(`Es wurde  ${selectedDays} ${title} hinzugefügt!`);
  };

  const handleAddToCart = async () => {
    if (selectedDays === 0) {
      CustomToast.error("Bitte erhöhe die Menge!");
    } else {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].titel === title) {
          addProduct(selectedDays);
          return;
        }
      }
      const item = {
        produktId: produktId,
        titel: title,
        bild: image,
        preis: price,
        anzahl: selectedDays,
      };
      try {
        const itemObjekt = {
          produktId: item.produktId,
          produktMenge: item.anzahl,
          kundenId: cookie.kundenId,
        };
        console.log(itemObjekt);
        const addedProdukt = await sendPostRequest("/warenkorb", itemObjekt);
        CustomToast.success("Dein Produkt ist im Warenkorb!");
        dispatch(addToCart(item as CartItem)); // Dispatch der addToCart-Action mit dem erstellten Item
      } catch (error) {
        CustomToast.error("Fehler hinzufügen (Serververbindung))");
      }
    }
  };

  const DatepickerInput = ({ ...props }) => (
    <input type="text" {...props} readOnly />
  );

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
