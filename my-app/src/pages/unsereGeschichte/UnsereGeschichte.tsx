import React from "react";
import TimelineBlock from "./TimelineBlock";
import history_1 from "../../img/Our_History/history_1.jpg";
/*import React, { useState } from "react";*/


/*function UnsereGeschichte() {
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
*/




interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  isFirst?: boolean;
  details: string;
  // image1: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  title,
  description,
  isFirst = false,
  details,
  // image1,
}) => {
  const dotClass = isFirst ? "timeline-dot first" : "timeline-dot";
  const dateClass = isFirst ? "timeline-date first" : "timeline-date";

  return (
    <div className="timeline-item">
      <div className={dotClass} />
      <div className={dateClass}>{date}</div>
      <div className="timeline-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <details>{details}</details>
      </div>
    </div>
  );
};

const UnsereGeschichte: React.FC = () => {
  return (
    <div className="platzhalter">
        <section className="timeline-section">
          <div className="timeline-items">
            <TimelineItem
              date="2016"
              // <TimelineBlock>
              // <image></image>
              // </TimelineBlock>
              title="Übernahme des Unternehmens durch die junge Generation"
              description="Die Kinder der bisherigen Gesellschafter übernehmen das Tagesgeschäft, nachdem diese bereits fünf Jahre Erfahrung gesammelt haben."
              details="Die „Bayerischen Wollfilzfabriken KG Offermann, Zeiler, Schmid & Co. KG Offingen Hof“ (BWF) gehen 1962 aus einer Fusion zweier Filzfabriken hervor. Eine davon wird 1892 von Theodor Wilhelm Schmid und seinen Partnern in Hof gegründet, die andere wurde 1896 in Offingen von den Unternehmern Silbermann und Lembert gegründet. 1912 übernimmt Johann Offermann die Lembert-Anteile. Beide Firmen sind bis zu ihrem Zusammenschluss in erster Linie in der Filzproduktion tätig. Im Jahr 1956 gelingt die Herstellung des ersten „Plexigum“-Kunststoffprofils im Extrusionsverfahren. Dies ist der Gründungszeitpunkt von BWF Profiles. Zu einer Erweiterung des Tätigkeitsfeldes in den Bereich Filtermedien als erster Hersteller in Europa kommt es 1968 mit der Gründung von BWF Envirotec. In den Jahrzehnten bis zur Jahrtausendwende wird der erfolgreiche Schritt in die USA, nach Italien und China gemacht. Die Einrichtung von internationalen Produktionsstätten in der Türkei, Indien, Russland, Österreich, Südafrika, Polen und Spanien prägt das vergangene und aktuelle Jahrzehnt der in fünfter Generation inhabergeführten BWF Group."
              isFirst
            />
            <TimelineItem
              date="2001"
              // picture="history_1"
              title="Expansion nach Österreich"
              description="Es werden die ersten Filialen in Österreich eröffnet. Somit erweitert sich das Einzugsgebiet erheblich."
              details="Dies sind weitere Informationen zu dem hinstorischen Punkt."
            />
            <TimelineItem
              date="1975"
              // picture="history_1"
              title="Filialen in ganz Deutschland"
              description="In ganz Deutschland werden immer mehr Filialen eröffnet."
              details="Dies sind weitere Informationen zu dem hinstorischen Punkt."

            />
            <TimelineItem
              date="1956"
              // picture="history_1"
              title="Gründung der 'Kuchenmanufaktur Wunnerlich, Schmid &amp; Co.'"
              description="Die Inhaber der Bäckerei setzen weiter auf den Konsum der Menschen, und gründeten die Kuchenmanufaktur."
              details="Dies sind weitere Informationen zu dem hinstorischen Punkt."

            />
            <TimelineItem
              date="1912"
              // picture="history_1"
              title="Neuer Gesellschafter: Johann Mustermann"
              description="Johann Mustermann kauft die Anteile von Theodor Wilhelm Schmid und steigt somit in das Tagesgeschäft der Bäckerei ein."
              details="Dies sind weitere Informationen zu dem hinstorischen Punkt."

            />
            <TimelineItem
              date="1896"
              // picture="history_1"
              title="Errichtung einer Bäckerei in Offingen"
              description="Um das Einzugsgebiet zu erweitern, errichteten sie eine weitere Bäckerei in Offingen."
              details="Dies sind weitere Informationen zu dem hinstorischen Punkt."

            />
            <TimelineItem
              date="1892"
              // picture="history_1"
              title="Firmengründung 'Bäckerei Wunnerlich, Schmid &amp; Co.'"
              description="Die drei Geschäftspartner Theodor Wilhelm Schmid, Robert Wunnerlich &amp; Otto Frank gründeten 1892 eine Bäckerei in Hof."
              details="Dies sind weitere Informationen zu dem hinstorischen Punkt."

            />
          </div>
        </section>
      
    </div>
  );
};





/*type BoxProps = {
  title: string;
  expanded: boolean;
};

const Box: React.FC<BoxProps> = ({ title, expanded }) => {
  return (
    <div>
      <h2>{title}</h2>
      {expanded && <p>Expanded content goes here</p>}
    </div>
  );
};

const UnsereGeschichte: React.FC = () => {
  const [boxExpanded, setBoxExpanded] = useState<boolean>(false);

  const handleButtonClick = () => {
    setBoxExpanded(!boxExpanded);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Toggle Box</button>
      <Box title="Box 1" expanded={boxExpanded} />
    </div>
  );
};
*/


export default UnsereGeschichte;

