import { TimelineItemA, TimelineContent, Image, TimelineDot, TimelineDate, ImageWrapper, } from "./TimelineBlock.styles";

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
}) => (
  <TimelineItemA>
    <TimelineDot />
      <TimelineDate>{date}</TimelineDate>
    <TimelineContent>
      <ImageWrapper>
        <Image src={image} alt="history_picture" />
      </ImageWrapper>
      <h3>{title}</h3>
      <p>{description}</p>
      <details>{details}</details>
    </TimelineContent>
  </TimelineItemA>
);

export default TimelineItem;
