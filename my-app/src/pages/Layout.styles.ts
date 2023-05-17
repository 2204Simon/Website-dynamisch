import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { colors, mediaQueries } from "./general/constants";

export const Header = styled.header`
  display: flex;
  font-size: 1rem;
  letter-spacing: 1;
  line-height: 1,
  font-weight: 400;
  justify-content: space-around;
  align-items: center;
  background-color: ${colors.companycolor};
  font-family: Arial, sans-serif;
  padding: 16px;
  @media (max-width: ${mediaQueries.large}) {
    display: none;
  }
`;

export const Logo = styled.div``;

export const StyledImg = styled.img`
  width: 80px;
  height: auto;
  border: 2px solid ${colors.white};
  border-radius: 5px;
`;

export const Menu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 1em;
  text-transform: uppercase;
  font-weight: 100;
`;

export const MenuItem = styled.li`
  margin-right: 16px;
  padding: 10px;
`;

export const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: ${colors.white};
  margin-right: 16px;
  position: relative;
  width: 100%;
  font-family: "Montserrat", sans-serif;


  &:hover {
    color: ${colors.white};
    &::before {
      content: "";
      box-sizing: inherit;
      position: absolute;
      display: block;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: ${colors.white};
      pointer-events: none;
    }
    &::after {
      box-sizing: inherit;
    }
  }

  &.active {
    color: ${colors.black};
    font-weight: bold;

  &:active {
    color: ${colors.white};
  }
`;
