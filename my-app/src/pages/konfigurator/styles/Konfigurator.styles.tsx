// Zeitung.styles.js

import styled from "styled-components";
import { colors } from "../../general/constants";

export const KonfiguratorContainer = styled.div`
  display: flex;
  flex-direction: column; /* Änderung auf Spaltenlayout für Mobilgeräte */
  padding: 20px;

  /* Tablets und größere Geräte */
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }

  /* Desktop-Bildschirme und größere Geräte */
  @media screen and (min-width: 1200px) {
    padding: 40px;
  }
`;

export const ProcessButton = styled.p`
  text-decoration: underline;
  color: ${colors.companycolor};
  cursor: pointer;
`;
