// Zeitung.tsx

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  ZeitungContainer,
  SubscriptionSection,
  FaqSection,
  FaqList,
  FaqItem,
  FaqDetails,
  FaqSummary,
} from "./styles/Zeitung.styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Zeitung = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const faqs = [
    {
      question: "Wie kann ich ein Abonnement abschließen?",
      answer:
        "Sie können ein Abonnement online über unsere Website abschließen.",
    },
    {
      question: "Wann wird meine Zeitung geliefert?",
      answer: "Die Zeitung wird jeden Morgen um 6 Uhr geliefert.",
    },
    // Füge weitere FAQs hinzu
  ];

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);

    if (!date) {
      toast.error("Bitte wählen Sie ein Datum aus.");
    }
  };

  return (
    <ZeitungContainer>
      <SubscriptionSection>
        <h2>Abonnement auswählen</h2>
        <label>Datum auswählen:</label>
        <DatePicker selected={selectedDate} onChange={handleDateChange} />
        {/* Hier kannst du den Code für die Auswahl des Abonnements hinzufügen */}
      </SubscriptionSection>

      <FaqSection>
        <h2>FAQs</h2>
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

      <ToastContainer />
    </ZeitungContainer>
  );
};

export default Zeitung;
