import styled from "styled-components";
import { colors, mediaQueries } from "../../general/constants";

export const SelectionContainer = styled.div`
  width: 100%;
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

export const Container = styled.div<{ flipped: boolean }>`
  width: 314px;
  height: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
  transform-style: preserve-3d;
  margin-bottom: 20px;

  transform: ${props => (props.flipped ? "rotateY(180deg)" : "none")};
`;

export const ContainerFront = styled.div<{}>`
  display: flex;
  flex-direction: column;
  background-color: ${colors.primarycolor};
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 250px;
  height: 550px;
  margin: 1rem;
  cursor: pointer;
  backface-visibility: hidden;
  transform: rotateY(0deg);
`;

export const ZutatenSelectionContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 1px;
  //box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 10px;
  /* justify-items: center; // Elemente horizontal zentrieren
  align-items: center; // Elemente vertikal zentrieren */
  border-radius: 10px;
`;

export const ZutatenContainer = styled.div<{ flipped: boolean }>`
  width: 450px;
  height: 500px;
  display: flex;
  flex-direction: column;
  position: relative;
  transform-style: preserve-3d;
  margin-bottom: 20px;

  transform: ${props => (props.flipped ? "rotateY(180deg)" : "none")};
`;

export const ZutatenContainerFront = styled.div<{}>`
  display: flex;
  flex-direction: column;
  background-color: ${colors.primarycolor};
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 350;
  height: 550px;
  margin: 1rem;
  cursor: pointer;
  backface-visibility: hidden;
  transform: rotateY(0deg);
`;

export const ProduktSelectionContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  grid-gap: 1px;
  //box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 10px;
  /* justify-items: center; // Elemente horizontal zentrieren
  align-items: center; // Elemente vertikal zentrieren */
  border-radius: 10px;
`;

export const ProduktContainer = styled.div<{ flipped: boolean }>`
  width: 500px;
  /* height: 500px; */

  display: flex;
  flex-direction: column;
  position: relative;
  transform-style: preserve-3d;
  /* margin-bottom: 20px; */
  margin-bottom: auto;

  transform: ${props => (props.flipped ? "rotateY(180deg)" : "none")};
`;

export const ProduktContainerFront = styled.div<{}>`
  display: flex;
  flex-direction: column;
  background-color: ${colors.primarycolor};
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 400px;
  /* height: 550px; */
  height: auto;
  margin: 1rem;
  cursor: pointer;
  backface-visibility: hidden;
  transform: rotateY(0deg);
  align-items: center;
`;

export const Type = styled.p`
  margin: 0;
  font-size: 1rem;
  text-align: left;
`;
