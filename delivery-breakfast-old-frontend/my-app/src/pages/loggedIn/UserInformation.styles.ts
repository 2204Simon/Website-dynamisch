import styled from "styled-components";
import { Button } from "../general/button.styles";
import { colors } from "../general/constants";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${colors.white};
  padding: 20px;
  color: ${colors.black};
`;
export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${colors.primarycolor};

  padding: 32px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  /* max-width: 600px; */
  width: 80%;
  margin: 10px;
`;
export const Title = styled.h1`
  color: ${colors.black};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const Paragraph = styled.p`
  color: ${colors.black};
  text-align: center;
  font-size: 16px;
  margin-bottom: 8px;
`;
export const LogoutButton = styled(Button)`
  margin-top: 24px;
`;
