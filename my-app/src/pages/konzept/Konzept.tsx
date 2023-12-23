import React from "react";
import TimelineItem from "./TimelineBlock";

import { TimelineItems, TimelineSection } from "./TimelineBlock.styles";
import {
  FaqSection,
  FaqList,
  FaqItem,
  FaqDetails,
  FaqSummary,
} from "./styles/Konzept.styles";
import history_1 from "../../img/Our_History/history_1.webp";
import old_bakery from "../../img/Our_History/old_bakery.webp";
import founding from "../../img/Our_History/founding.webp";
import Mustermann from "../../img/Our_History/Johann_Mustermann.webp";
import Germany from "../../img/Our_History/Germany.webp";
import Austria from "../../img/Our_History/Austria.webp";
import YoungGeneration from "../../img/Our_History/Young_Generation.webp";
const faqs = [
  {
    question: "Wie kann ich ein Abonnement abschließen?",
    answer: "Sie können ein Abonnement online über unsere Website abschließen.",
  },
  {
    question: "Wann wird meine Zeitung geliefert?",
    answer: "Die Zeitung wird jeden Morgen um 6 Uhr geliefert.",
  },
  // Füge weitere FAQs hinzu
];
const UnsereGeschichte: React.FC = () => {
  return (
    <>
      <h2>Das Konzept von Delivery-Breakfast</h2>
      <FaqSection>
        <h3>FAQs</h3>
        <FaqList>
          {faqs.map((faq, index) => (
            <FaqItem key={index}>
              <FaqDetails>
                <FaqSummary>{faq.question}</FaqSummary>
                <p>{faq.answer}</p>
              </FaqDetails>
            </FaqItem>
          ))}
        </FaqList>
      </FaqSection>
      <h3> Unsere Geschichte </h3>
      <p>
        Nachfolgend möchten wir Dir mittels einer Reise zurück in die
        Vergangenheit unsere Wurzeln sowie unsere Erfolgsgeschichte
        näherbringen:
      </p>

      <TimelineSection>
        <TimelineItems>
          <TimelineItem
            date="2016"
            image={YoungGeneration}
            title={"Übernahme des Unternehmens durch die junge Generation"}
            details={
              "Die Kinder der bisherigen Gesellschafter übernehmen das Tagesgeschäft, nachdem diese bereits fünf Jahre Erfahrung gesammelt haben."
            }
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
            details="Die Inhaber der Bäckerei setzen weiter auf den Konsum der Menschen und gründeten die Kuchenmanufaktur."
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
