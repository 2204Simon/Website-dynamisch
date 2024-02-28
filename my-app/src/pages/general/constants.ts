import { Link } from "react-router-dom";
import styled from "styled-components";

export const mediaQueries = {
  small: "480px",
  medium: "768px",
  large: "1024px",
};

export const colors = {
  white: "var(--white-color)",
  black: "var(--black-color)",
  companycolor: "var(--company-color)",
  primarycolor: "var(--primary-color)",
  secundarycolor: "var(--secondary-color)",
};

export const GeneralstyledLink = styled(Link)`
  text-decoration: none;
  color: ${colors.white};
`;

export function formatNumber(number: number): string {
  return number.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
