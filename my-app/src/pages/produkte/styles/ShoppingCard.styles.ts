import styled, { keyframes } from "styled-components";
import { colors } from "../../general/constants";
import CroissantGif from "../../../img/Croissant.webp";

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
  height: 600px;
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
  height: 550px;
  margin: 1rem;
  cursor: pointer;
  backface-visibility: hidden;
  transform: rotateY(0deg);
  display: ${props => (props.displayNone ? "none" : "block")};
`;

export const ContainerBack = styled.div<{
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
  color: ${colors.black};
`;

export const MiniH = styled.h4`
  color: ${colors.companycolor};
  font-size: 18px;
  margin: 5px;
`;

export const DetailsButton = styled.p`
  text-decoration: underline;
  color: ${colors.companycolor};
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
