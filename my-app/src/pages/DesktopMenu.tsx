import { useDispatch, useSelector } from "react-redux";
import { useLoggedIn } from "../globalVariables/loggedin";
import {
  Header,
  Logo,
  Menu,
  MenuItem,
  StyledImg,
  StyledLink,
} from "./Layout.styles";
import Badge from "@mui/material/Badge";
import { CartItem, CartState } from "../redux/types";
import { ShoppingCart, SignIn, User } from "phosphor-react";
import logo from ".././img/Logo.webp";
import { ThemeButton } from "../Theme";
import { useEffect } from "react";
import {
  errorHandlerNotfound,
  getRequest,
} from "../serverFunctions/generelAPICalls";
import { addMultipleToCart, clearCart } from "../redux/cartReducer";
import { CustomToast } from "./general/toast.style";
import { useCookies } from "react-cookie";

export const DesktopMenu: React.FC = () => {
  const { loggedIn } = useLoggedIn();
  const [cookies] = useCookies(["kundenId"]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverCartItems: Array<CartItem> = await getRequest(
          `/Warenkorb/${cookies.kundenId}`
        );
        console.log(serverCartItems);

        if (serverCartItems.length === 0 || !serverCartItems) {
          throw new Error("Keine Daten gefunden");
        }

        dispatch(clearCart());
        dispatch(addMultipleToCart(serverCartItems));
      } catch (error) {
        const notFound = errorHandlerNotfound(error);
        if (notFound) {
          dispatch(clearCart());
        }
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const cartItems = useSelector(
    (state: { cart: CartState }) => state.cart.cartItems
  );
  let cartLength = 0;
  cartItems.map(item => (cartLength += item.anzahl));
  return (
    <Header id="zumSeitenanfang">
      <p></p>
      <Logo>
        <a href="/">
          <StyledImg
            src={logo}
            alt="Logo"
            style={{ width: "80px", height: "80px" }}
          />
        </a>
      </Logo>
      <Menu>
        <MenuItem>
          <StyledLink to="/beta/">Home</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/beta/Produkte">Produkte</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/beta/Konzept">Konzept</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/beta/Kontakt">Kontakt</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/beta/Konfigurator">Breakfast Builder</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/beta/Bestellung" aria-label="Link zu Bestellung">
            <ShoppingCart size={40} />
            <Badge badgeContent={cartLength} color="error" />
          </StyledLink>
        </MenuItem>
        <MenuItem>
          {loggedIn ? (
            <StyledLink to="/beta/LoggedIn" aria-label="Link zu LoggedIn">
              <User size={40} />
            </StyledLink>
          ) : (
            <StyledLink to="/beta/SignUp" aria-label="Link zu SignUp">
              <SignIn size={40} />
            </StyledLink>
          )}
        </MenuItem>
        <ThemeButton />
      </Menu>
    </Header>
  );
};
