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
`;

export const PopupBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  will-change: transform;
  max-height: 100vh;
`;

export const PopupWrapper = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  z-index: 11;
  color: ${colors.black};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  will-change: transform;

  @media (max-width: ${mediaQueries.medium}) {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 20px 10px;
    box-shadow: none;
  }
`;
