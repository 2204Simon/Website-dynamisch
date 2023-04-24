import React, { useState } from "react";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { colors, mediaQueries } from "./general/constants";

const StyledBurgerMenu = styled.div`
  display: none; /* Standardmäßig ausgeblendet */
  @media (max-width: ${mediaQueries.large}) {
    display: flex; /* Ab einer Bildschirmbreite von 1200px eingeblendet */
    align-items: center;
    justify-content: flex-end;
  }
`;

const StyledBurgerIcon = styled(MenuIcon)`
  cursor: pointer;
`;

const StyledMenu = styled.div<{ open: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  padding: 16px;
  background-color: ${colors.companycolor}; /* Ändere die Hintergrundfarbe an die gewünschte Farbe */
  z-index: 1;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
`;

const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
  align-self: flex-end;
`;

const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
`;

const StyledListItem = styled(ListItem)`
  margin-bottom: 16px;
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
            <Link to={"/"}>
              <ListItemText primary="Home" />
            </Link>
          </StyledListItem>
          <StyledListItem>
            <Link to={"Produkte"}>
              <ListItemText primary="Produkte" />
            </Link>
          </StyledListItem>
          <StyledListItem>
            <Link to={"Bestellung"}>
              <ListItemText primary="Warenborb" />
            </Link>
          </StyledListItem>
          <StyledListItem>
            <Link to={"Kontakt"}>
              <ListItemText primary="Kontakte" />
            </Link>
          </StyledListItem>
          <StyledListItem>
            <Link to={"Unsere Geschichte"}>
              <ListItemText primary="Unsere Geschichte" />
            </Link>
          </StyledListItem>
        </StyledList>
      </StyledMenu>
    </StyledBurgerMenu>
  );
};

export default BurgerMenu;
