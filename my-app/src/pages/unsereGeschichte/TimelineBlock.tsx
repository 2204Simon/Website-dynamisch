import React, { useState, ChangeEvent } from "react";
import { TimelineItemA, TimelineContent, Image } from "./TimelineBlock.styles";

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  isFirst?: boolean;
  details: string;
  image: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  title,
  description,
  isFirst = false,
  details,
  image,
}) => {
  const dotClass = isFirst ? "timeline-dot first" : "timeline-dot";
  const dateClass = isFirst ? "timeline-date first" : "timeline-date";

  return (
    <TimelineItemA>
      <div className={dotClass} />
      <div className={dateClass}>{date}</div>

      <TimelineContent>
        <Image src={image} alt="product" />
        <h3 style={{ color: "black" }}>{title}</h3>
        <p>{description}</p>
        <details>{details}</details>
      </TimelineContent>
    </TimelineItemA>
  );
};

export default TimelineItem;
