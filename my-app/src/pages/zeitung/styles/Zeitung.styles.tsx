// Zeitung.styles.js

import styled from "styled-components";

export const ZeitungContainer = styled.div`
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

export const SubscriptionSection = styled.div`
  margin-bottom: 20px;
  flex: 1; /* Füge Flex-Grow für Responsive-Layout hinzu */
`;

export const FaqSection = styled.div`
  margin-bottom: 20px;
  flex: 1; /* Füge Flex-Grow für Responsive-Layout hinzu */
`;

export const FaqList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const FaqItem = styled.li`
  margin-bottom: 15px;
`;

export const FaqDetails = styled.details`
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
`;

export const FaqSummary = styled.summary`
  font-weight: bold;
`;

/* Media Queries für die responsive Gestaltung */
