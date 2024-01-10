import React from "react";
import TimelineItem from "./TimelineBlock";

import { TimelineItems, TimelineSection } from "./TimelineBlock.styles";
import {
  FaqSection,
  FaqList,
  FaqItem,
  FaqDetails,
  FaqSummary,
  ContactLink,
} from "./styles/Konzept.styles";
import history_1 from "../../img/Our_History/history_1.webp";
import old_bakery from "../../img/Our_History/old_bakery.webp";
import founding from "../../img/Our_History/founding.webp";
import Mustermann from "../../img/Our_History/Johann_Mustermann.webp";
import Germany from "../../img/Our_History/Germany.webp";
import Austria from "../../img/Our_History/Austria.webp";
import YoungGeneration from "../../img/Our_History/Young_Generation.webp";
import {BlackColorButton } from "../../pages/general/button";
import { Link } from "react-router-dom";
const faqs = [
  {
    question: "Wie kann ich ein Abonnement abschließen?",
    answer: "Sie können ein Abonnement online über unsere Website abschließen.",
  },
  {
    question: "Wann wird meine Zeitung geliefert?",
    answer: "Die Zeitung wird jeden Morgen um 6 Uhr geliefert.",
  },
  {
    question: "Wie bleibt mein Getränk warm?",
    answer: "Unsere Engineers haben Thermobecher entwickelt, welche speziell auf unseren Lieferservice angepasst wurden. Während diese sich im Auto des Lieferdienstes befinden, werden diese weiterhin gewärmt, da jeder Becher eine eigene Heizung enthält. Somit kommt jederzeit ein warmes Getränk bei Dir an, selbst wenn es ein längerer Anfahrtsweg sein sollte.",
  },
  {
    question: "Welche Zahlungsmethoden kann ich einrichten?",
    answer: "Bei uns kannst Du ganz einfach über Dein Paypal-konto oder mittels Banklastschrift bezahlen.",
  },
  {
    question: "Bis wann kann ich für den nächsten Tag bestellen?",
    answer: "Du kannst Deine Bestellung für den kommenden Tag bis 16Uhr am Vortag tätigen.",
  },
  {
    question: "Woher kommen unsere Produke?",
    answer: "Alle Zutaten und Produkte, welche wir Dir anbieten, stammen aus BIO-zertifizierten Anbau. Zudem haben wir Geschäftsbeziehungen zu regionalen Erzeugern. Durch dieses Konzept möchten wir einerseits die regionalen Betriebe unterstützen und vermeiden gleichzeitig lange Lieferwege.",
  },
  {
    question: "Wer steckt hinter Delivery-Breakfast?",
    answer: "Wir sind aus einem kleinen Familienunternehmen entstanden. Wenn Du mehr über unseren Werdegang und die Verdienste unserer und voheriger Generationen wissen möchtest, dann scroll nach unten. ;)",
  },
  {
    question: "Wie kommt das Frühstück zu mir?",
    answer: "Wir haben eine Kooperation mit der FakeZeitung, welche bereits eine optimierte Infrastruktur zur Lieferung der eigenen Zeitung besitzt. Diese verwenden wir ebenfalls für unsere Auslieferung und können somit einerseits Kosten und Stickoxide einsparen.",
  },
  {
    question: "Für welche Personengruppen wurde das Angebot geschaffen?",
    answer: "Aufgrund der schlechten Infrastruktur auf dem Land haben wir federführend diese Personengruppe im Fokus. Jedoch ist unser Angebot für jeden interessant, welcher aufgrund eines eng getakteten Terminplans in der Früh schnell und ohne Aufwand ein nährreiches Frühstück zu sich nehmen möchte. ",
  },
  {
    question: "Wie schützen wir die Umwelt?",
    answer: "Einerseits können wir durch die Benutzung einer bestehenden Lieferinfrastruktur eine Menge an Stickoxiden einsparen, andererseits sind unsere Lieferketten ebenfalls zu kurz wie nur möglich!",
  },
];
const UnsereGeschichte: React.FC = () => {
  return (
    <>
      <h2>Das Konzept von Delivery-Breakfast</h2>
      <FaqSection>
        <h3>FAQs</h3>
        <p>Wenn Du genauere Informationen über unser Konzept erhalten möchtest, findest Du unter den folgenden Fragen die Spezifikation. Klicke einfach auf die Fragen, dann erscheint die dazugehörige Antwort. Wenn Deine Frage weiterhin besteht, dann tritt gerne mit uns in Verbindung!</p>
        <ContactLink>
        <Link to="/Produkte">
          <BlackColorButton caption={"Tritt mit uns in Kontakt"} ></BlackColorButton>
              </Link>
              </ContactLink>
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
