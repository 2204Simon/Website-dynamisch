import { Link } from "react-router-dom";
import styled from "styled-components";

export const mediaQueries = {
  small: "480px",
  medium: "768px",
  large: "1024px",
};

export const colors = {
  white: "#ffffff",
  black: "#000000",
  companycolor: "#aa7d03",
  primarycolor: " #E0E0E0",
  secundarycolor: "#333333",
};

export const GeneralstyledLink = styled(Link)`
  text-decoration: none;
  color: ${colors.white};
`;
