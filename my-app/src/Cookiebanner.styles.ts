import styled from "styled-components";
import { colors, mediaQueries } from "./pages/general/constants";

export const CookieBannerStyle = styled.div`
  .cookiebanner {
    display: flex;
    //justify-content: space-evenly;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100vw; /* Aktualisierte Breite auf 100% */
    height: 100px;
    background-color: ${colors.black};
    z-index: 10;
    padding: 16px 16px 16px 16px;
  }

  .cookietext {
    font-family: "Montserrat", sans-serif;
    color: #aa7d03;
    font-size: 1.25rem;
  }

  @media (max-width: ${mediaQueries.medium}) {
    .cookiebanner {
      justify-content: center;
      flex-direction: column;
      height: 300px;
      width: 90vw; /* Aktualisierte Breite auf 100% */
      text-align: center;

      padding-right: 85px; //Ausrichtung Icons wegen Chatbot
    }
    .cookietext {
      font-size: 1rem;
    }
  }
`;
