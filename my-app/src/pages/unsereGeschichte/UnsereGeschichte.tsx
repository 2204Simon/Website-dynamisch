import React from "react";
import TimelineItem from "./TimelineBlock";

import { 
  TimelineItems, 
  TimelineSection 
} from "./TimelineBlock.styles";

import history_1 from "../../img/Our_History/history_1.jpg";
import old_bakery from "../../img/Our_History/old_bakery.png";
import founding from "../../img/Our_History/founding.png";
import Mustermann from "../../img/Our_History/Johann_Mustermann.png";
import Germany from "../../img/Our_History/Germany.png";
import Austria from "../../img/Our_History/Austria.png";
import YoungGeneration from "../../img/Our_History/Young_Generation.png";




const UnsereGeschichte: React.FC = () => {
  return (
      
   <>
     <h2> Unsere Geschichte </h2>
     <p> Die „Bayerischen Wollfilzfabriken KG Offermann, Zeiler, Schmid & Co. KG Offingen Hof“ (BWF) gehen 1962 aus einer Fusion zweier Filzfabriken hervor. Eine davon wird 1892 von Theodor Wilhelm Schmid und seinen Partnern in Hof gegründet, die andere wurde 1896 in Offingen von den Unternehmern Silbermann und Lembert gegründet. 1912 übernimmt Johann Offermann die Lembert-Anteile. Beide Firmen sind bis zu ihrem Zusammenschluss in erster Linie in der Filzproduktion tätig.

Im Jahr 1956 gelingt die Herstellung des ersten „Plexigum“-Kunststoffprofils im Extrusionsverfahren. Dies ist der Gründungszeitpunkt von BWF Profiles. Zu einer Erweiterung des Tätigkeitsfeldes in den Bereich Filtermedien als erster Hersteller in Europa kommt es 1968 mit der Gründung von BWF Envirotec.

In den Jahrzehnten bis zur Jahrtausendwende wird der erfolgreiche Schritt in die USA, nach Italien und China gemacht. Die Einrichtung von internationalen Produktionsstätten in der Türkei, Indien, Russland, Österreich, Südafrika, Polen und Spanien prägt das vergangene und aktuelle Jahrzehnt der in fünfter Generation inhabergeführten BWF Group.
</p>

<h3>
Nachfolgend möchten wir Dir mittels einer Reise zurück in die Vergangenheit unsere Wurzeln sowie unsere Erfolgsgeschichte näherbringen:
</h3>
      
      
      <TimelineSection>
        <TimelineItems>
          <TimelineItem
            date="2016"
            image={YoungGeneration}
            title={"Übernahme des Unternehmens durch die junge Generation"}
            details={"Die Kinder der bisherigen Gesellschafter übernehmen das Tagesgeschäft, nachdem diese bereits fünf Jahre Erfahrung gesammelt haben."}
          />

          <TimelineItem
            date="2001"
            image={Austria}
            title="Expansion nach Österreich"
            details="Es werden die ersten Filialen in Österreich eröffnet. Somit erweitert sich das Einzugsgebiet erheblich."
          />

          <TimelineItem
            date="1975"
            image={Germany}
            title="Filialen in ganz Deutschland"
            details="In ganz Deutschland werden immer mehr Filialen eröffnet."
          />

          <TimelineItem
            date="1956"
            image={history_1}
            title="Gründung der 'Kuchenmanufaktur Wunnerlich, Schmid &amp; Co.'"
            details="Die Inhaber der Bäckerei setzen weiter auf den Konsum der Menschen, und gründeten die Kuchenmanufaktur."
          />

          <TimelineItem
            date="1912"
            image={Mustermann}
            title="Neuer Gesellschafter: Johann Mustermann"
            details="Johann Mustermann kauft die Anteile von Theodor Wilhelm Schmid und steigt somit in das Tagesgeschäft der Bäckerei ein."
          />

          <TimelineItem
            date="1896"
            image={old_bakery}
            title="Errichtung einer Bäckerei in Offingen"
            details="Um das Einzugsgebiet zu erweitern, errichteten sie eine weitere Bäckerei in Offingen."
          />

          <TimelineItem
            date="1892"
            image={founding}
            title="Firmengründung 'Bäckerei Wunnerlich, Schmid &amp; Co.'"
            details="Die drei Geschäftspartner Theodor Wilhelm Schmid, Robert Wunnerlich &amp; Otto Frank gründeten 1892 eine Bäckerei in Hof."
          />
        </TimelineItems>
      </TimelineSection>

      </>
  );
};

export default UnsereGeschichte;
