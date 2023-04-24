import styled from "styled-components";
import { colors } from "./general/constants";

export const FooterContainer = styled.footer`
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.companycolor};
  height: auto;
  width: 100%;
  padding-top: 40px;
  color: #000;
  text-align: center;
  overflow: hidden;
`;

export const FooterLinks = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;

    li {
      margin: 0 10px;

      a {
        text-decoration: none;
        padding: 10px;
        color: #fff;
      }
    }
  }
`;

export const SocialMedia = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    margin: 0 10px;

    svg {
      color: #fff;
    }
  }
`;
