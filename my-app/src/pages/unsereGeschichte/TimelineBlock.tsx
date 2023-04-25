import { 
  TimelineItemA, 
  TimelineContent, 
  Image, 
  TimelineDot, 
  TimelineDate, 
  ImageWrapper,
  TimelineTitle, 
} from "./TimelineBlock.styles";

interface TimelineItemProps {
  date: string;
  title: string;
  details: string;
  image: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  title,
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
      <TimelineTitle>{title}</TimelineTitle>
      <details>{details}</details>
    </TimelineContent>
  </TimelineItemA>
);

export default TimelineItem;
