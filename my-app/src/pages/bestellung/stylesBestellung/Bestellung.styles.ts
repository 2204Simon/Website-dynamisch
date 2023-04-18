import styled from "styled-components";
import { mediaQueries, colors } from "../../general/constants";

export const WarenkorbWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  height: auto;

  @media (max-width: ${mediaQueries.large}) {
    flex-direction: column-reverse;
    height: auto;
    margin-bottom: 20px;
  }
`;

export const BestellungsWrapper = styled.div`
  flex: 1 1 auto;
  margin-right: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 550px;
  background-color: ${colors.white};

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f2f2f2;
  }

  ::-webkit-scrollbar-thumb {
    background: #ccc;
  }
`;
