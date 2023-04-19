import React from "react";
import TimelineBlock from "./TimelineBlock";
import history_1 from "../../img/Our_History/history_1.jpg";



function UnsereGeschichte() {
  return (
    <>
      <h2 style={{ color: "black" }}>Unsere Geschichte</h2>
      
      <TimelineBlock          
          timeline_year={"1992"}
          timeline_header_sentence={"Das sind weitere Informationen zu dem hinstorischen Punkt"}
          timeline_image={history_1}
          timeline_further_information={"BLABLABLA"}
          />

      </>
)
};

export default UnsereGeschichte;

