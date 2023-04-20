import styled from "styled-components";
import { mediaQueries, colors } from "../../general/constants";
import { ShoppingBag } from "phosphor-react";

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

export const Badge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: white;
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
  @media (max-width: ${mediaQueries.large}) {
    height: auto;
  }
`;

export const NoOrderContainer = styled.div`
  color: ${colors.black};
  min-height: 80vh;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  padding: 0.5rem;
  margin: 10px;
  background-color: ${colors.white};
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.24);
  @media (max-width: ${mediaQueries.large}) {
    flex-direction: column;
    align-items: center;
  }
`;

export const NoOrderTextWrapper = styled.div`
  color: ${colors.black};
  display: flex;
  gap: 2rem;
  flex-direction: column;
  padding: 0.5rem;
  margin: 20px;
  background-color: ${colors.white};
  align-items: center;
  align-content: center;
  @media (max-width: ${mediaQueries.large}) {
    flex-direction: column;
    align-items: center;
  }
`;
export const NoOrderShoppingBag = styled(ShoppingBag)`
  width: 500px;
  height: 500px;
  @media (max-width: ${mediaQueries.small}) {
    width: 300px;
    height: 300px;
  }
`;
