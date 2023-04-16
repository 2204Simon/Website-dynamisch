import styled from "styled-components";
import { mediaQueries, colors } from "../../general/constants";

export const WarenkorbWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  height: auto;

  @media (max-width: ${mediaQueries.medium}) {
    flex-direction: column;
    height: auto;
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

export const SideBarWrapper = styled.div`
  flex: 0 1 250px;
  background-color: ${colors.primarycolor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  height: 550px;
  padding: 20px;
  color: black;

  @media (max-width: ${mediaQueries.medium}) {
    flex: 0 1 auto;
    width: 100%;
    height: 200px;
    margin-top: 20px;
  }
`;
