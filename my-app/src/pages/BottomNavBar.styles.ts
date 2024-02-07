import styled from "styled-components";
import { colors, mediaQueries } from "./general/constants";

export const BottomNavStyle = styled.div`
  .bottom-nav {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100vw; /* Aktualisierte Breite auf 100% */
    height: 70px;
    background-color: black; //muss fix bleiben wegen Chatbot
    z-index: 10;
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
    color: white; //muss fix bleiben wegen Chatbot
    text-decoration: none;
  }

  @media (max-width: ${mediaQueries.medium}) {
    .bottom-nav .menu {
      justify-content: flex-end;
      padding-right: 85px; //Ausrichtung Icons wegen Chatbot
    }
  }
  @media (min-width: 1025px) {
    .bottom-nav {
      display: none;
    }
  }
`;
