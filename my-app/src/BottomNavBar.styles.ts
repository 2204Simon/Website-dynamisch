import styled from "styled-components";
import { colors } from "./pages/general/constants";

export const BottomNavStyle = styled.div`
  .bottom-nav {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
    background-color: ${colors.black};
    z-index: 1;
  }

  .bottom-nav .menu {
    display: flex;
    align-items: center;
    justify-content: space-around;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  .bottom-nav .menu li {
    flex-grow: 1;
    text-align: center;
    padding: 0;
    margin: 0;
    height: 45px;
  }

  .bottom-nav .menu a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${colors.companycolor};
    text-decoration: none;
  }

  @media (max-width: 1200px) {
    .bottom-nav .menu {
      justify-content: flex-end;
      padding-right: 100px; //Ausrichtung Icons wegen Chatbot
    }
  }
  @media (min-width: 1200px) {
    .bottom-nav {
      display: none;
    }
  }
`;
