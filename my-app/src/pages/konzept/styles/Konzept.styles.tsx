import styled from "styled-components";

export const FaqSection = styled.div`
  margin-bottom: 20px;
  flex: 1; /* Füge Flex-Grow für Responsive-Layout hinzu */
  color: var(--black-color);
`;

export const FaqList = styled.ul`
  list-style: none;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;
  color: var(--black-color);
`;

export const FaqItem = styled.li`
  margin-bottom: 15px;
  color: var(--black-color);
`;

export const FaqDetails = styled.details`
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  color: var(--black-color);
`;

export const FaqSummary = styled.summary`
  font-weight: bold;
  color: var(--black-color);
`;

export const ContactLink = styled.div`
  padding-left: 20px;
  padding-bottom: 10px;
  color: var(--white-color);
`;
