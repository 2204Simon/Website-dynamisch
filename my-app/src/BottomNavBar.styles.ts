import styled from "styled-components";
import { colors } from "./pages/general/constants";
export const BottomNavStyle = styled.div`
  .bottom-nav {
    display: none;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: black;
    z-index: 1;
  }

  .bottom-nav .menu {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
  }

  .bottom-nav .menu li {
    font-size: 1.2rem;
    padding: 0.5rem;
    text-align: center;
  }

  .bottom-nav .menu a {
    display: block;
    color: white;
    text-decoration: none;
  }

  @media (max-width: 1200px) {
    .bottom-nav {
      display: block;
    }
  }
`;
