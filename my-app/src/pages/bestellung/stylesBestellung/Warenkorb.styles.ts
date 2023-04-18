import styled from "styled-components";
import { colors, mediaQueries } from "../../general/constants";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${colors.white};
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.24);

  @media (max-width: ${mediaQueries.large}) {
    flex-direction: column;
  }
`;

export const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  @media (max-width${mediaQueries.medium}) {
    width: 100%;
    height: auto;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  flex: 1;

  > * {
    display: flex;
    align-items: center;
  }

  &:nth-child(1) {
    flex: 1 1 fit-content;
  }

  &:nth-child(2) {
    flex: 1 1 auto;
  }
  @media (max-width: ${mediaQueries.large}) {
    flex-direction: column;
  }
`;
export const ProductName = styled.h2`
  color: black;
  margin-right: 0.5rem;
`;

export const Count = styled.h2`
  color: black;
  margin-right: 0.5rem;
`;

export const Price = styled.h2`
  color: black;
  margin-right: 0.5rem;
  @media (${mediaQueries.medium}) {
    align-self: flex-end;
  }
`;

export const TotalPrice = styled.h2`
  color: black;
  margin: 0;
  @media (${mediaQueries.medium}) {
    align-self: flex-end;
  }
`;

export const RemoveButton = styled.button`
  color: ${colors.black};
  border: none;
  font-size: 20px;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    color: ${colors.companycolor};
  }
  @media (${mediaQueries.medium}) {
    align-self: flex-end;
    padding: 0.25rem;
    font-size: 24px;
  }
`;
