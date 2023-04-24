import styled from "styled-components";
import { Button } from "../general/button.styles";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #f8f8f8;
  padding: 20px;
`;
export const Card = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 80%;
`;
export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const Paragraph = styled.p`
  font-size: 16px;
  margin-bottom: 8px;
`;
export const LogoutButton = styled(Button)`
  margin-top: 24px;
`;
