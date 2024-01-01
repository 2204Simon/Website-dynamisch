// Konfigurator.styles.ts
import styled from "styled-components";
import {
  ArrowForward,
  ArrowBack,
  Fastfood,
  LocalCafe,
  LunchDining,
  EmojiFoodBeverage,
} from "@mui/icons-material";

export const ConfiguratorContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const ConfiguratorContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

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

export const StageHeader = styled.h2`
  font-size: 1.5rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 150px; /* Anpassung der Bildgröße */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const SelectionContainer = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export const SelectionList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const SelectionItem = styled.li`
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
    background-color: #f4f4f4;
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
  color: #333;
`;

export const SummaryText = styled.p`
  margin-top: 10px;
`;

export const NavigationIcon = styled.div`
  font-size: 2rem;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
`;

export const NavigationContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;
