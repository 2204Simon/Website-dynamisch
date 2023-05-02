import { useSelector } from "react-redux";
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
import { CartState } from "../redux/types";
import { ShoppingCart, SignIn, User } from "phosphor-react";
import logo from ".././img/Logo.webp";

export const DesktopMenu: React.FC = () => {
  const { loggedIn } = useLoggedIn();
  const cartItems = useSelector(
    (state: { cart: CartState }) => state.cart.cartItems
  );
  const arrayLength = cartItems.length;
  return (
    <Header id="zumSeitenanfang">
      <p></p>
      <Logo>
        <a href="/">
          <StyledImg src={logo} alt="Logo" />
        </a>
      </Logo>
      <Menu>
        <MenuItem>
          <StyledLink to="/">Home</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/Produkte">Produkte</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/Unsere Geschichte">Geschichte</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/Kontakt">Kontakt</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/Bestellung">
            <ShoppingCart size={40} />
            <Badge badgeContent={arrayLength} color="error" />
          </StyledLink>
        </MenuItem>
        <MenuItem>
          {loggedIn ? (
            <StyledLink to="/LoggedIn">
              <User size={40} />
            </StyledLink>
          ) : (
            <StyledLink to="/SignUp">
              <SignIn size={40} />
            </StyledLink>
          )}
        </MenuItem>
      </Menu>
    </Header>
  );
};
