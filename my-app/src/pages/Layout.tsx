import React from "react";
import { Outlet, Link } from "react-router-dom";
import logo from ".././img/Logo.webp";
import { SignIn, User, ShoppingCart } from "phosphor-react";
import { useLoggedIn } from "../globalVariables/loggedin";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import { CartState } from "../redux/types";
import Chatra from "./home/Chatra";
import {
  Header,
  Logo,
  Menu,
  MenuItem,
  StyledImg,
  StyledLink,
} from "./Layout.styles";

const Layout = () => {
  const { loggedIn } = useLoggedIn();
  const cartItems = useSelector(
    (state: { cart: CartState }) => state.cart.cartItems
  );
  const arrayLength = cartItems.length;
  return (
    <>
      <Header id="zumSeitenanfang">
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
            <StyledLink to="/Unsere Geschichte">Unsere Geschichte</StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/Kontakt">Kontakt</StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/Bestellung">
              <ShoppingCart />
              <Badge badgeContent={arrayLength} color="error" />
            </StyledLink>
          </MenuItem>
          <MenuItem>
            {loggedIn ? (
              <StyledLink to="/LoggedIn">
                <User />
              </StyledLink>
            ) : (
              <StyledLink to="/SignUp">
                <SignIn weight="fill" />
              </StyledLink>
            )}
          </MenuItem>
        </Menu>

        <Chatra />
      </Header>
      <Outlet />
    </>
  );
};

export default Layout;
