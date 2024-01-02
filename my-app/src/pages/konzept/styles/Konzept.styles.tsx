import styled from "styled-components";

export const FaqSection = styled.div`
  margin-bottom: 20px;
  flex: 1; /* Füge Flex-Grow für Responsive-Layout hinzu */
`;

export const FaqList = styled.ul`
  list-style: none;
  padding-left: 30px;
  padding-right: 30px;
  
`;

export const FaqItem = styled.li`
  margin-bottom: 15px;
`;

export const FaqDetails = styled.details`
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
`;

export const FaqSummary = styled.summary`
  font-weight: bold;
`;
