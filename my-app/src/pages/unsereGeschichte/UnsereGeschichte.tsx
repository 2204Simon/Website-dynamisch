import React from "react";
import TimelineItem from "./TimelineBlock";
import history_1 from "../../img/Our_History/history_1.jpg";
/*import React, { useState } from "react";*/
import {
  TimelineItems,
  TimelineSection,
} from "./TimelineBlock.styles";


const UnsereGeschichte: React.FC = () => {
  return (
    <div className="platzhalter">
        <TimelineSection>
          <TimelineItems>
            <TimelineItem
              date={"2016"}
              image={history_1}
              title={"Übernahme des Unternehmens durch die junge Generation"}
              description={"Die Kinder der bisherigen Gesellschafter übernehmen das Tagesgeschäft, nachdem diese bereits fünf Jahre Erfahrung gesammelt haben."}
              details={"Die „Bayerischen Wollfilzfabriken KG Offermann, Zeiler, Schmid & Co. KG Offingen Hof“ (BWF) gehen 1962 aus einer Fusion zweier Filzfabriken hervor. Eine davon wird 1892 von Theodor Wilhelm Schmid und seinen Partnern in Hof gegründet, die andere wurde 1896 in Offingen von den Unternehmern Silbermann und Lembert gegründet. 1912 übernimmt Johann Offermann die Lembert-Anteile. Beide Firmen sind bis zu ihrem Zusammenschluss in erster Linie in der Filzproduktion tätig. Im Jahr 1956 gelingt die Herstellung des ersten „Plexigum“-Kunststoffprofils im Extrusionsverfahren. Dies ist der Gründungszeitpunkt von BWF Profiles. Zu einer Erweiterung des Tätigkeitsfeldes in den Bereich Filtermedien als erster Hersteller in Europa kommt es 1968 mit der Gründung von BWF Envirotec. In den Jahrzehnten bis zur Jahrtausendwende wird der erfolgreiche Schritt in die USA, nach Italien und China gemacht. Die Einrichtung von internationalen Produktionsstätten in der Türkei, Indien, Russland, Österreich, Südafrika, Polen und Spanien prägt das vergangene und aktuelle Jahrzehnt der in fünfter Generation inhabergeführten BWF Group."}
              isFirst
            />
            <TimelineItem
              date="2001"
              image={history_1}
              title="Expansion nach Österreich"
              description="Es werden die ersten Filialen in Österreich eröffnet. Somit erweitert sich das Einzugsgebiet erheblich."
              details="Dies sind weitere Informationen zu dem hinstorischen Punkt."
            />

            <TimelineItem
              date="1975"
              image={history_1}
              title="Filialen in ganz Deutschland"
              description="In ganz Deutschland werden immer mehr Filialen eröffnet."
              details="Dies sind weitere Informationen zu dem hinstorischen Punkt."
            />

            <TimelineItem
              date="1956"
              image={history_1}
              title="Gründung der 'Kuchenmanufaktur Wunnerlich, Schmid &amp; Co.'"
              description="Die Inhaber der Bäckerei setzen weiter auf den Konsum der Menschen, und gründeten die Kuchenmanufaktur."
              details="Dies sind weitere Informationen zu dem hinstorischen Punkt."
            />

            <TimelineItem
              date="1912"
              image={history_1}
              title="Neuer Gesellschafter: Johann Mustermann"
              description="Johann Mustermann kauft die Anteile von Theodor Wilhelm Schmid und steigt somit in das Tagesgeschäft der Bäckerei ein."
              details="Dies sind weitere Informationen zu dem hinstorischen Punkt."
            />

            <TimelineItem
              date="1896"
              image={history_1}
              title="Errichtung einer Bäckerei in Offingen"
              description="Um das Einzugsgebiet zu erweitern, errichteten sie eine weitere Bäckerei in Offingen."
              details="Dies sind weitere Informationen zu dem hinstorischen Punkt."
            />

            <TimelineItem
              date="1892"
              image={history_1}
              title="Firmengründung 'Bäckerei Wunnerlich, Schmid &amp; Co.'"
              description="Die drei Geschäftspartner Theodor Wilhelm Schmid, Robert Wunnerlich &amp; Otto Frank gründeten 1892 eine Bäckerei in Hof."
              details="Dies sind weitere Informationen zu dem hinstorischen Punkt."
            />

            </TimelineItems>
        </TimelineSection>
    </div>
  );
};

export default UnsereGeschichte;

