import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { colors, mediaQueries } from "./general/constants";
import { Logo, StyledLink } from "./Layout.styles";
import { ShoppingCart, SignIn, User } from "phosphor-react";
import { Badge } from "@mui/material";
import { useLoggedIn } from "../globalVariables/loggedin";
import { useSelector } from "react-redux";
import { CartState } from "../redux/types";
import logo from ".././img/Logo.webp";

const StyledBurgerMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Header = styled.div`
  display: none;
  @media (max-width: ${mediaQueries.large}) {
    background-color: ${colors.companycolor};
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const StyledImg = styled.img`
  border: 2px solid ${colors.white};
  border-radius: 5px;
  line-height 1;
  margin-top: 5px;
  margin-left: 25px;
`;

const StyledBurgerIcon = styled(MenuIcon)`
  cursor: pointer;
  color: ${colors.white};
  margin-right: 20px;
`;

const StyledMenu = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 200px;
  padding: 16px;
  background-color: ${colors.companycolor};
  z-index: 4;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  border-bottom-left-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 4);
`;

const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
  align-self: flex-end;
  color: ${colors.white};
`;

const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
`;

const StyledListItem = styled(ListItem)`
  margin-bottom: 16px;
  a {
    text-decoration: none;
    color: ${colors.white};
  }
  a:hover {
    text-decoration: none;
  }
  border-radius: 15px;
`;

const BurgerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { loggedIn } = useLoggedIn();
  const cartItems = useSelector(
    (state: { cart: CartState }) => state.cart.cartItems
  );
  let cartLength = 0;
  cartItems.map(item => (cartLength += item.anzahl));

  const handleBurgerClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Header>
      <Logo>
        <a href="/">
          <StyledImg src={logo} alt="Logo" width="60px" height="60px" />
        </a>
      </Logo>
      <StyledBurgerMenu>
        <StyledBurgerIcon onClick={handleBurgerClick} />
        <StyledMenu open={open}>
          <StyledCloseIcon onClick={handleBurgerClick} />
          <StyledList>
            <StyledListItem>
              <StyledLink to="/" onClick={closeMenu}>
                Home
              </StyledLink>
            </StyledListItem>
            <StyledListItem>
              <StyledLink to="/Produkte" onClick={closeMenu}>
                Produkte
              </StyledLink>
            </StyledListItem>
            <StyledListItem>
              <StyledLink to="/Konzept" onClick={closeMenu}>
                Konzept
              </StyledLink>
            </StyledListItem>
            <StyledListItem>
              <StyledLink to="/Kontakt" onClick={closeMenu}>
                Kontakt
              </StyledLink>
            </StyledListItem>
            <StyledListItem>
              <StyledLink to="/Konfigurator" onClick={closeMenu}>
                Breakfast Builder
              </StyledLink>
            </StyledListItem>
            <StyledListItem>
              <StyledLink to="/Bestellung" onClick={closeMenu}>
                <ShoppingCart size={30} />
                <Badge badgeContent={cartLength} color="error" />
              </StyledLink>
            </StyledListItem>
            <StyledListItem>
              {loggedIn ? (
                <StyledLink to="/LoggedIn" onClick={closeMenu}>
                  <User size={30} />
                </StyledLink>
              ) : (
                <StyledLink to="/SignUp" onClick={closeMenu}>
                  <SignIn size={30} />
                </StyledLink>
              )}
            </StyledListItem>
          </StyledList>
        </StyledMenu>
      </StyledBurgerMenu>
    </Header>
  );
};

export default BurgerMenu;
