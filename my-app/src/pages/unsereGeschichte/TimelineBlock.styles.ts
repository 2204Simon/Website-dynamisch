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
  background-color: #ffffff;
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
  background-color: black;
  position: absolute;
  left: calc(50% - 8px);
  border-radius: 50%;
  top: 13px;

  #timeline-first-dot & {
    top: 8px;
  }

  @media (max-width: 800px) {
    left: 0px;
  }
`;

export const TimelineDate = styled.div`
  h1.font-size: 25px;
  h1.font-weight: 800;
  color: #000;
  h1.margin: 5px 5px 15px 5px;
  

  ::First{  margin-top: 0px;
  }
`;

export const TimelineContent = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 15px;
  border: 2px solid #aa7d03;
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


/* 
.timeline-section {
  background-color: transparent;
  min-height: 100vh;
  padding: 0px 15px 0 15px;
}

.timeline-items {
  max-width: 1500px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.timeline-items::before {
  content: "";
  position: absolute;
  top: 10px;
  left: calc(50% - 1px);
  width: 3px;
  height: 100%;
  background-color: #aa7d03;
}

.timeline-item {
  margin-bottom: 40px;
  width: 100%;
  position: relative;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-item:nth-child(odd) {
  padding-right: calc(50% + 30px);
  text-align: right;
}

.timeline-item:nth-child(even) {
  padding-left: calc(50% + 30px);
}

.timeline-dot {
  height: 16px;
  width: 16px;
  background-color: black;
  position: absolute;
  left: calc(50% - 8px);
  border-radius: 50%;
  top: 13px;
}

#timeline-first-dot {
  top: 8px;
}

.timeline-date {
  font-size: 25px;
  font-weight: 800;
  color: #000;
  margin: 5px 5px 15px 5px;
}

#timeline-first-date {
  margin-top: 0;
}

.timeline-content {
  background-color: #aa7d03;
  padding: 30px;
  border-radius: 15px;
  border: 2px solid #000;
}

.timeline-content h3 {
  font-size: 20px;
  font-weight: 700;
  line-height: 22px;
  color: #000;
  margin: 0px 0px 10px;
}

.timeline-content p {
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  color: #000;
  margin: 16px 0px 0px 0px;
} */