import styled from "styled-components";
import { colors } from "../../general/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  max-width: 250px;
  margin: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
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
  border-radius: 5px;
  margin-left: 0.5rem;
  font-size: 1.2rem;
  text-align: center;
  appearance: textfield;
`;
