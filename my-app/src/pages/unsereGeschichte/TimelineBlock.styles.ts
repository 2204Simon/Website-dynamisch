import styled from "styled-components";

export const Timeline_image = styled.img`
  width: 100%;
  height: auto;
  transition: transform 0.3s ease-in-out;
`;

export const Timeline_year = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  text-align: center;
  color: black;
`;

export const Timeline_header_sentence = styled.h3``;

export const Timeline_further_information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  max-width: 250px;
  margin: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  transition: transform 0.3s ease-in-out;
`;

export const TimelineSection = styled.section`
  background-color: transparent;
  min-height: 100vh;
  padding: 0px 15px 0 15px;
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
    background-color: #aa7d03;
  }
`;

export const TimelineItem = styled.div`
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
`;

export const TimelineDot = styled.div`
  height: 16px;
  width: 16px;
  background-color: black;
  position: absolute;
  left: calc(50% - 8px);
  border-radius: 50%;
  top: 13px;

  #timeline-first-dot & {
    top: 8px;
  }
`;

export const TimelineDate = styled.h4`
  font-size: 25px;
  font-weight: 800;
  color: #000;
  margin: 5px 5px 15px 5px;

  #timeline-first-date & {
    margin-top: 0;
  }
`;

export const TimelineContent = styled.div`
  background-color: #aa7d03;
  padding: 30px;
  border-radius: 15px;
  border: 2px solid #000;
`;

export const TimelineHeading = styled.h3`
  font-size: 20px;
  font-weight: 700;
  line-height: 22px;
  color: #000;
  margin: 0px 0px 10px;
`;

export const TimelineParagraph = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  color: #000;
  margin: 16px 0px 0px 0px;
`;
