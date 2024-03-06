// Konfigurator.styles.ts
import styled, { keyframes } from "styled-components";
import { colors } from "../../general/constants";
import {
  ArrowForward,
  ArrowBack,
  Fastfood,
  LocalCafe,
  LunchDining,
  EmojiFoodBeverage,
} from "@mui/icons-material";
import CroissantGif from "../../../img/Croissant.webp";

export const StageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const Stage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
export const SelectionContainer = styled.div`
  width: 90vw;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1px;
  //box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 10px;
  justify-items: center; // Elemente horizontal zentrieren
  align-items: center; // Elemente vertikal zentrieren
  border-radius: 10px;
`;

export const AbschlussKonfigurator = styled.div`
  width: 70vw;
  display: grid;
  grid-template-columns: repeat(1fr, 1fr);
  grid-gap: 1px;
  //box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 10px;
  justify-items: center; // Elemente horizontal zentrieren
  align-items: center; // Elemente vertikal zentrieren
  border-radius: 10px;
`;

export const StageHeader = styled.h2`
  font-size: 1.5rem;
  color: ${colors.companycolor};
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
`;

export const SelectionList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const SelectionItem = styled.div`
  cursor: pointer;
  margin: 5px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: background-color 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  &:hover {
    background-color: ${colors.primarycolor};
  }

  &.selected {
    background-color: ${colors.companycolor};
    color: ${colors.white};
  }

  svg {
    font-size: 2rem;
  }
`;

export const SummaryContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const SummaryHeader = styled.h3`
  font-size: 1.2rem;
  color: ${colors.companycolor};
`;

export const Unit = styled.p`
  font-size: 0%.5;
  color: ${colors.black};
  margin-top: 2px;
  margin-bottom: 2px;
`;

export const SummaryText = styled.p`
  margin-top: 10px;
`;

export const NavigationIcon = styled.div`
  font-size: 2rem;
  cursor: pointer;
  color: ${colors.companycolor};
  display: flex;
  align-items: center;
`;

export const NavigationContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

//Produktkarten

const rotateAnimation = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(180deg);
  }
`;

const reverseRotateAnimation = keyframes`
  from {
    transform: rotateY(180deg);
  }
  to {
    transform: rotateY(0deg);
  }
`;

export const Container = styled.div<{ flipped: boolean }>`
  width: 314px;
  height: 475px;
  display: flex;
  flex-direction: column;
  position: relative;
  transform-style: preserve-3d;
  margin-bottom: 20px;

  animation: ${props =>
      props.flipped ? rotateAnimation : reverseRotateAnimation}
    1s;
  transform: ${props => (props.flipped ? "rotateY(180deg)" : "none")};
`;

export const ContainerFront = styled.div<{
  flipped: boolean;
  displayNone: boolean;
}>`
  display: flex;
  flex-direction: column;
  background-color: ${colors.primarycolor};
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 250px;
  height: 425px;
  margin: 1rem;
  cursor: pointer;
  backface-visibility: hidden;
  transform: rotateY(0deg);
  display: ${props => (props.displayNone ? "none" : "block")};

  &:hover {
    background-color: ${colors.companycolor};
  }

  &.selected {
    background-color: ${colors.companycolor};
    color: ${colors.white};
  }
`;

export const ContainerBack = styled.div<{
  flipped: boolean;
  displayNone: boolean;
}>`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 250px;
  height: 550px;
  margin: 1rem;
  cursor: pointer;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  display: ${props => (props.displayNone ? "block" : "none")};
`;

export const ImageContainer = styled.div`
  overflow: hidden;
  margin-bottom: 1rem;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  padding-left 0px;
  margin: 0;
  font-size: 1.25rem;
  text-align: center;
  color: ${colors.black};
`;

export const Title2 = styled.h2`
  margin: 0;
  font-size: 1.05rem;
  text-decoration: underline;
  color: ${colors.companycolor};
`;

export const Top = styled.div`
  display: flex;
  text-items: center;
  justify-content: space-between;
`;
export const ListContainer = styled.ul`
  list-style-image: url(${CroissantGif});
`;

export const MiniH = styled.h4`
  color: ${colors.companycolor};
  font-size: 18px;
  margin: 5px;
`;

export const Price = styled.p`
  margin: 0;
  font-size: 1.2rem;
`;

export const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

export const QuantityInput = styled.input`
  width: 3rem;
  padding: 0.5rem;
  border: 1px solid #aaa;
  font-size: 1.2rem;
  text-align: center;
  appearance: textfield;
  border-radius: 5px;
  height: 20px;
  margin-left: 5px;
  margin-right: 5px;
`;

export const PlusQuantity = styled.div`
  width: 3rem;
  border: 1px solid #aaa;
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 5px;
  height: 20px;
  width: 20px;
`;

export const MinusQuantity = styled.div`
  width: 3rem;
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 5px;
  height: 20px;
  width: 20px;
  border: 1px solid #aaa;
  margin-left: 5px;
`;

export const Label = styled.label`
  color: ${colors.black}; // Farbe des Textes ändern
`;

export const signedIn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
