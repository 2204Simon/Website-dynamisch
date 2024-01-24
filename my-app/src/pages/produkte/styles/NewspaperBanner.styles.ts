import styled from "styled-components";
import { colors } from "../../general/constants";

export const BannerContainer = styled.div`
  width: 75%;
  max-height: auto;
  background-color: ${colors.white};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: stretch;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    max-height: 1fr;
    place-self: center;
    justify-items: center; // Elemente horizontal zentrieren
    align-items: center; // Elemente vertikal zentrieren
  }

`;

export const BannerImage = styled.img`
  width: 250px;
  height: auto;
  align-self: center;
  justify-self: end;
  object-fit: cover;
  border-radius: 10px;
  @media (max-width: 800px) {
    
    justify-self: center; }
`;

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  text-align: center;
  
`;

export const BannerTitle = styled.h5`
  color: ${colors.black};
  font-size: 1.25rem;
  margin-top: -10px;
  margin-bottom: 5px;
`;

export const BannerRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`;

export const XCircleWrapper = styled.div`
  position: absolute;
  right: 11.8%;
  margin: 10px;
  z-index: 2;
`;

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
