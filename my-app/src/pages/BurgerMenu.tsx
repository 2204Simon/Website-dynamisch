import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import { colors, mediaQueries } from "./general/constants";
import { StyledLink } from "./Layout.styles";

const StyledBurgerMenu = styled.div`
  display: none;
  @media (max-width: ${mediaQueries.large}) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: ${colors.companycolor};
    height: 70px;
  }
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

  const handleBurgerClick = () => {
    setOpen(!open);
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
    <StyledBurgerMenu>
      <StyledBurgerIcon onClick={handleBurgerClick} />
      <StyledMenu open={open}>
        <StyledCloseIcon onClick={handleBurgerClick} />
        <StyledList>
          <StyledListItem>
            <StyledLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Home
            </StyledLink>
          </StyledListItem>
          <StyledListItem>
            <StyledLink to="/Produkte">Produkte</StyledLink>
          </StyledListItem>
          <StyledListItem>
            <StyledLink to="/Bestellung">Bestellung</StyledLink>
          </StyledListItem>
          <StyledListItem>
            <StyledLink to="/Kontakt">Kontakte</StyledLink>
          </StyledListItem>
          <StyledListItem>
            <StyledLink to="/Unsere Geschichte">Unsere Geschichte</StyledLink>
          </StyledListItem>
        </StyledList>
      </StyledMenu>
    </StyledBurgerMenu>
  );
};

export default BurgerMenu;
