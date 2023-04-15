import React, { useState, FormEvent } from "react";
import { MapPin, Phone, Envelope } from "phosphor-react";
import {
  MainContainer,
  ContactContainer,
  FormInput,
  FormTextArea,
  FormButton,
  FormLabel,
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

  return (
    <MainContainer>
      <h1>Kontakt</h1>
      <p>Gerne kannst du uns auf folgenden Wegen erreichen:</p>
      <ul>
        <li>
          <Envelope size={24} />{" "}
          <a href="mailto:delivery-breakfast@outlook.de">
            delivery-breakfast@outlook.de
          </a>
        </li>
        <li>
          <Phone size={24} /> <a href="tel:+49123456789">0 123 456789</a>
        </li>
        <li>
          <MapPin size={24} /> Frühstücksstr. 20, 89518 Frühhausen
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2634.236118735561!2d10.152005076637723!3d48.68185011311377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47991673b8ad167b%3A0x128ebc1169c962b2!2sDHBW%20Heidenheim!5e0!3m2!1sde!2sde!4v1681532862141!5m2!1sde!2sde"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </li>
      </ul>
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
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormLabel>
          <FormLabel>
            Nachricht:
            <FormTextArea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </FormLabel>
          <FormButton type="submit">Anmelden</FormButton>
        </form>
      </ContactContainer>
    </MainContainer>
  );
}

export default Kontakt;
