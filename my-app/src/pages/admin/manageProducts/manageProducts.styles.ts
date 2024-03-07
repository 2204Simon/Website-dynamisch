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
