import React, { useState, ChangeEvent } from "react";
import {
  Container,
  Timeline_further_information,
  ImageContainer,
  Timeline_year,
  Timeline_image,
  Timeline_header_sentence,
  Details,
  Image,
} from "./TimelineBlock.styles";
import { BlackColorButton } from "../general/button";
/*import { Details } from "../produkte/styles/ShoppingCard.styles";*/


interface TimelineBlockProperties {
  /*timeline_image: string;
  timeline_year: string;
  timeline_header_sentence: string;
  timeline_further_information: string;*/
  image: string;
}



const TimelineBlock: React.FC<TimelineBlockProperties> = ({ /*timeline_image, timeline_year, timeline_header_sentence, timeline_further_information, */image }) => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

 /* return (
    <Container>
      <ImageContainer>
        <Image src={image} alt="TimelineBlock" />
      </ImageContainer>
      <Details>
        <Timeline_year>{timeline_year}</Timeline_year>
        <Timeline_header_sentence>{timeline_header_sentence}</Timeline_header_sentence>
        <Timeline_further_information>{timeline_further_information}</Timeline_further_information>
        <BlackColorButton
          caption="Mehr Informationen"
        />
      </Details>
    </Container>
  );*/

  return (
   <Container>
      <ImageContainer>
        <Image src={image} alt="TimelineBlock" />
      </ImageContainer>
      </Container>
     );
};

export default TimelineBlock;
