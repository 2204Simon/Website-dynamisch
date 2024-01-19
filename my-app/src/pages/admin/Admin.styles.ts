import styled from "styled-components";
import { colors } from "../general/constants";

export const AdminPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  justify-content: flex-start;
  background-color: ${colors.primarycolor};
  width: 100vw;
  height: fit-content;
  padding-bottom: 50px;
`;
export const CRUDCardsGridWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  justify-content: center; // Elemente von rechts nach links ausrichten
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  grid-gap: 30px; // Abstand zwischen den Elementen
  row-gap: 20px;
  width: 100%;
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

export const CRUDCardText = styled.p`
  color: ${colors.white};
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

export const CRUDCardPText = styled.p`
  color: ${colors.black};
  text-align: center;
`;
