import React, { useState } from "react";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import { colors, mediaQueries } from "./general/constants";

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
  border-radius: 15px;
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
    text-decoration: underline;
  }
  border-radius: 15px;
`;

const BurgerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleBurgerClick = () => {
    setOpen(!open);
  };

  return (
    <StyledBurgerMenu>
      <StyledBurgerIcon onClick={handleBurgerClick} />
      <StyledMenu open={open}>
        <StyledCloseIcon onClick={handleBurgerClick} />
        <StyledList>
          <StyledListItem>
            <NavLink to={"/"}>
              <ListItemText primary="Home" />
            </NavLink>
          </StyledListItem>
          <StyledListItem>
            <NavLink to={"Produkte"}>
              <ListItemText primary="Produkte" />
            </NavLink>
          </StyledListItem>
          <StyledListItem>
            <NavLink to={"Bestellung"}>
              <ListItemText primary="Warenkorb" />
            </NavLink>
          </StyledListItem>
          <StyledListItem>
            <NavLink to={"Kontakt"}>
              <ListItemText primary="Kontakte" />
            </NavLink>
          </StyledListItem>
          <StyledListItem>
            <NavLink to={"Unsere Geschichte"}>
              <ListItemText primary="Unsere Geschichte" />
            </NavLink>
          </StyledListItem>
        </StyledList>
      </StyledMenu>
    </StyledBurgerMenu>
  );
};

export default BurgerMenu;
