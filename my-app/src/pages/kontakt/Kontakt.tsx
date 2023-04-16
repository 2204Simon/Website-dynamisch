import React, { useState, FormEvent, ChangeEvent } from "react";

import { MapPin, Phone, Envelope } from "phosphor-react";
import {
  MainContainer,
  ContactContainer,
  FormInput,
  FormTextArea,
  FormButton,
  FormLabel,
  ContactList,
  ContactListItem,
  ContactMap,
} from "./styles/Kontakt.styles";

function Kontakt(): JSX.Element {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(`Danke für Ihre Anmeldung, ${email}!`);
    console.log(`Nachricht: ${message}`);
    // Hier könntest du den Code hinzufügen, der das Formular an deinen Server sendet
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value);
  }

  function handleMessageChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    setMessage(event.target.value);
  }

  return (
    <MainContainer>
      <h1>Kontakt</h1>
      <ContactList>
        <ContactListItem style={{ color: "#aa7d03" }}>
          <Envelope size={24} />{" "}
          <a href="mailto:delivery-breakfast@outlook.de">
            delivery-breakfast@outlook.de
          </a>
        </ContactListItem>
        <ContactListItem style={{ color: "#aa7d03" }}>
          <Phone size={24} /> <a href="tel:+49123456789">0 123 456789</a>
        </ContactListItem>
        <ContactListItem style={{ color: "#aa7d03" }}>
          <MapPin size={24} /> Frühstücksstr. 20, 89518 Frühhausen
        </ContactListItem>
      </ContactList>
      <ContactMap />
      <hr />
      <ContactContainer>
        <h2>Newsletter abonnieren</h2>
        <p>
          Melden Sie sich für unseren Newsletter an, um Updates zu erhalten:
        </p>
        <form onSubmit={handleSubmit}>
          <FormLabel>
            E-Mail-Adresse:
            <FormInput
              type="email"
              value={email}
              onChange={handleEmailChange}

              required
            />
          </FormLabel>
          <FormLabel>
            Nachricht:
            <FormTextArea value={message} onChange={handleMessageChange} />

          </FormLabel>
          <FormButton type="submit">Anmelden</FormButton>
        </form>
      </ContactContainer>
    </MainContainer>
  );
}

export default Kontakt;
