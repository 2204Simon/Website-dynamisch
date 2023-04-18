import styled from "styled-components";
import { colors, mediaQueries } from "../../general/constants";

export const LogoImage = styled.img`
  width: 300px;
  height: auto;
`;

export const SideBarWrapper = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: ${colors.black};
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: ${mediaQueries.medium}) {
    width: 100%;
    height: 600px;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px 10px;
    box-shadow: none;
    border-radius: 8px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;
