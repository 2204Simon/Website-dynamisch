import styled from "styled-components";
import { colors } from "../../general/constants";
export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: ${colors.primarycolor};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
`;

export const Image = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 16px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Price = styled.p`
  font-size: 28px;
  font-weight: bold;
  margin-right: 16px;
  color: #ff6347;
`;

export const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24px;
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #ff6347;
  }
`;
