import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlackColorButton } from "../general/button";
import "react-toastify/dist/ReactToastify.css";
import { CustomToast } from "../general/toast.style";
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
import { KUNDEN_ID, baseUrl } from "../../globalVariables/global";
import {
  sendPostRequest,
  sendPutRequest,
} from "../../serverFunctions/generelAPICalls";
import { addToCart, increaseQuantity } from "../../redux/cartReducer";
import PickDay from "./PickDay";
import AboDurationCalculator from "./AboDurationCalculater";
import { useLoggedIn } from "../../globalVariables/loggedin";
import { useNavigate } from "react-router-dom";

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
  const [aboEndDate, setAboEndDate] = useState<string>("");
  const { loggedIn } = useLoggedIn();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState<number>(0);
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 12);
  const [price, setPrice] = useState(basePrice);
  const [cookies] = useCookies([KUNDEN_ID]);
  const cartItems = useSelector(
    (state: { cart: CartState }) => state.cart.cartItems
  );
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies([KUNDEN_ID]);

  const LoadAbonnement = async (): Promise<void> => {
    try {
      if (cookies.kundenId) {
        const request = await fetch(
          `${baseUrl}/kundeEndDate/${cookies.kundenId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
          }
        );
        const endDate = await request.json();
        if (!request.ok) throw new Error(endDate.message);
        setAboEndDate(endDate);
      }
    } catch (error) {
      CustomToast.error("Fehler beim Laden der Zeitungsdaten");
    }
  };

  useEffect(() => {
    LoadAbonnement();
  }, []);

  function MonthsToDays(months: number): number {
    let currentDate;
    if (aboEndDate) {
      currentDate = new Date(aboEndDate);
    } else {
      currentDate = new Date();
    }
    currentDate.setHours(0, 0, 0, 0); //Zeit reseten, damit sauber dazugezählt wird
    const futureDate = new Date();
    futureDate.setHours(0, 0, 0, 0);
    futureDate.setFullYear(currentDate.getFullYear()); //Jahr auf current Jahr setzen, damit keine - Tage entstehen
    futureDate.setMonth(currentDate.getMonth() + months);
    const timeDifference = futureDate.getTime() - currentDate.getTime();
    const days = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return days;
  }

  const addProduct = async () => {
    const item: CartItem = {
      produktId: produktId,
      titel: title,
      bild: image,
      preis: price,
      anzahl: MonthsToDays(quantity),
    };
    try {
      const itemObjekt = {
        produktId: item.produktId,
        produktMenge: item.anzahl,
        kundenId: cookie.kundenId,
      };
      await sendPutRequest("/warenkorb", itemObjekt);
      dispatch(increaseQuantity({ item, amount: MonthsToDays(quantity) }));
    } catch (error) {
      CustomToast.error("Fehler hinzufügen (Serververbindung))");
    }
    dispatch(increaseQuantity({ item, amount: MonthsToDays(quantity) }));
    CustomToast.success(`Es wurde(n) ${quantity} ${title}(en) abonniert!`);
    setQuantity(0);
  };

  const handleAddToCart = async () => {
    if (quantity === 0) {
      CustomToast.error("Bitte erhöhe die Menge!");
    } else {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].titel === title) {
          addProduct();
          return;
        }
      }
      const item = {
        produktId: produktId,
        titel: title,
        bild: image,
        preis: price,
        anzahl: MonthsToDays(quantity),
      };
      try {
        const itemObjekt = {
          produktId: item.produktId,
          produktMenge: item.anzahl,
          kundenId: cookie.kundenId,
        };
        await sendPostRequest("/warenkorb", itemObjekt);

        CustomToast.success(
          `Es wurde(n) ${quantity} ${title}(en) hinzugefügt!`
        );

        dispatch(addToCart(item as CartItem));
        setQuantity(0);
      } catch (error) {
        CustomToast.error("Fehler hinzufügen (Serververbindung))");
      }
    }
  };

  useEffect(() => {
    setPrice(basePrice * MonthsToDays(quantity));
  }, [quantity]);

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
          <AboDurationCalculator endDate={aboEndDate} />
          <p>Wähle aus, wie viele Monate du abonnieren möchtest:</p>
          <PickDay quantity={quantity} setQuantity={setQuantity} />
          <p>
            Preis: {price}€ ({MonthsToDays(quantity)} Tage)
          </p>
        </BannerContent>
        <BannerRight>
          {loggedIn ? (
            <BlackColorButton
              onClick={handleAddToCart}
              caption="Zum Warenkorb hinzufügen"
            />
          ) : (
            <BlackColorButton
              onClick={() => navigate("/login")}
              caption="Anmelden um zu bestellen"
            />
          )}
        </BannerRight>
      </BannerContainer>
    </>
  );
};

export default NewspaperBanner;
