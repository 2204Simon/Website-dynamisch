import styled from "styled-components";
import { colors, mediaQueries } from "../general/constants";

interface AdminListWrapperProps {
  adminPage?: boolean;
  hover?: boolean;
}

export const AdminPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  justify-content: flex-start;
  background-color: ${colors.white};
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
  column-gap: 50px;
  row-gap: 20px;
  width: 100%;
`;
export const CRUDCardWrappper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primarycolor};
  row-gap: 100;
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

export const AdminListWrapper = styled.div<AdminListWrapperProps>`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${colors.primarycolor};
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.24);
  flex-wrap: wrap;
  ${props =>
    props.adminPage &&
    `
    justify-content: space-between;
  `}
  ${props =>
    props.hover &&
    `
    :hover {
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
      background-color: ${colors.companycolor};
      cursor: pointer;
    }
  `}
  @media (max-width: ${mediaQueries.large}) {
    flex-direction: column;
    gap: 0;
    border-radius: 0;
    border-top: 2px solid ${colors.primarycolor};
  }
`;

export const FormWrapper = styled.form`
  /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
  display: flex;
  flex-direction: column;
  column-gap: 50px;
  row-gap: 20px;
  justify-items: center;
  background-color: ${colors.primarycolor};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
  margin: 0 auto; // Zentriert das Formular horizontal
  max-width: 90%; // Begrenzt die maximale Breite des Formulars auf 90% des umgebenden Elements
  align-items: center;
`;

export const FormInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${colors.black};
  margin-bottom: 10px; // Fügt einen Abstand unter jedem Eingabefeld hinzu
`;
