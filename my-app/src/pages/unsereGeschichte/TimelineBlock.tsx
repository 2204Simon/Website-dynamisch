import React, { useState, ChangeEvent } from "react";
import { TimelineItemA, TimelineContent, Image, TimelineDot, TimelineDate } from "./TimelineBlock.styles";

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  details: string;
  image: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  title,
  description,
  details,
  image,
}) => {
  
  return (
    <TimelineItemA>
       <TimelineDot />
       <TimelineDate>
        <h1>{date}</h1>
       </TimelineDate>
      
      <TimelineContent>
        <Image src={image} alt="history_picture" />
        <h3 style={{ color: "black" }}>{title}</h3>
        <p>{description}</p>
        <details>{details}</details>
      </TimelineContent>
    </TimelineItemA>
  );
};

export default TimelineItem;
