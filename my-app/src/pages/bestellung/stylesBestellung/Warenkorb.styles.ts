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
  gap:0.5rem
  justify-content: space-between;
  align-items: center;
  flex: 1;
  flex-direction: row;

  > * {
    display: flex;
    align-items: center;
  }

  &:nth-child(1) {
    flex: 1 1 fit-content;
  }

  &:nth-child(2) {
    flex: 1 1 auto;
    justify-content: space-between;
  }
  @media (max-width: ${mediaQueries.large}) {
    flex-direction: column;
  }
`;
export const ProductName = styled.p`
  font-size: 20px;
  color: black;
  padding-left: 10px;
  padding-right: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Count = styled.p`
  font-size: 20px;
  color: black
  margin: 0;
  padding: 0;
`;

export const Price = styled.p`
  color: black;
  margin: 0;
  padding-left: 0;
  padding-right: 0.5 rem;
  font-size: 20px;
  @media (${mediaQueries.medium}) {
    align-self: flex-end;
  }
`;

export const TotalPrice = styled.p`
  font-size: 20px;
  color: black;
  padding-left: 0;
  padding-right: 0.5 rem;
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
