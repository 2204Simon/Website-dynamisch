import styled from "styled-components";
import { colors } from "../general/constants";

export const AdminPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${colors.primarycolor};
  width: 100vw;
  height: 100vh;
`;
export const CRUDCardsGridWrapper = styled.div`
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  row-gap: 20px;
`;
export const CRUDCardWrappper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primarycolor};
  flex-grow: 1;
  width: 200px;
  height: 250px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
  :hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    background-color: ${colors.companycolor};
    cursor: pointer;
  }
  :active {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    background-color: ${colors.secundarycolor};
  }
`;

export const CRUDCardPText = styled.p`
  text-align: center;
`;
