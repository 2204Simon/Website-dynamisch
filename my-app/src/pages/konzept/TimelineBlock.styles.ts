import styled from "styled-components";
import { colors } from "../general/constants";


export const TimelineSection = styled.section`
  background-color: transparent;
  min-height: 100vh;
  padding: 0% 5% 5% 5%;
  }
`;

export const Image = styled.img`
  width: 50%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  transition: transform 0.3s ease-in-out;
  border-radius: 10px;
  border: 2px;
  border-color: ${colors.black};
`;

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const TimelineItems = styled.div`
  max-width: 1500px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 10px;
    left: calc(50% - 1px);
    width: 3px;
    height: 100%;
    background-color: ${colors.companycolor};
  }

  @media (max-width: 800px) {
    &::before {
      left: 7px;
    }}
`;

export const TimelineItemA = styled.div`
margin-bottom: 40px;
  width: 100%;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  &:nth-child(odd) {
    padding-right: calc(50% + 30px);
    text-align: right;
  }

  &:nth-child(even) {
    padding-left: calc(50% + 30px);
  }

  @media (max-width: 800px) {
    
    &:nth-child(odd) {
      padding-right: 0;
      text-align: left;
    }
  
    &:nth-child(odd),
    &:nth-child(even) {
      padding-left: 37px;
    }
  }

`;

export const TimelineDot = styled.div`
  height: 16px;
  width: 16px;
  background-color: ${colors.companycolor};
  position: absolute;
  left: calc(50% - 8px);
  border-radius: 50%;
  //top: 13px;
  top: 10px;

  @media (max-width: 800px) {
    left: 0px;
  }
`;

export const TimelineDate = styled.h1`
  font-size: 25px;
  font-weight: 800;
  color: ${colors.companycolor};
  margin: 0px 5px 15px 5px;
  }
`;

export const TimelineContent = styled.div`
  background-color: ${colors.white};
  padding: 30px;
  border-radius: 15px;
  border: 3px solid ${colors.companycolor};
`;

export const TimelineTitle = styled.h3`
  /* font-size: 20px;
  font-weight: 800; */
  color: ${colors.black};
  margin: 10px 5px 10px 0px;
  `;