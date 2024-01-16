import styled from "styled-components";
import { colors } from "../../general/constants";

export const BannerContainer = styled.div`
  width: 90%;
  max-height: 150px;
  background-color: ${colors.white};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-left: 5%;
  padding: 5px;
`;

export const BannerImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 50%;
`;

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BannerTitle = styled.h5`
  color: ${colors.black};
  font-size: 1.25rem;
  margin-bottom: 10px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Fülle die gesamte Höhe des Containers aus */
`;
