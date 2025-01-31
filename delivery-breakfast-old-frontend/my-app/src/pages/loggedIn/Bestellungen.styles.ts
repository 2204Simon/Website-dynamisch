import { media } from "./../kontakt/styles/Kontakt.styles";
import styled from "styled-components";
import { colors, mediaQueries } from "../general/constants";

export const SingleBestellungWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${colors.secundarycolor};
  align-self: normal;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 0 10px ${colors.companycolor};
  }
`;

export const MetaDataDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;

export const MetaDataItem = styled.p`
  margin: 0;
`;

export const ScrollableYContainer = styled.div`
  overflow-y: auto;
  padding: 10px;
  overflow-x: clip;
  /* overflow-x: hidden; */
  /* align-self: flex-start; */
  width: 100%;
  /* max-height: 50vh; */
`;
