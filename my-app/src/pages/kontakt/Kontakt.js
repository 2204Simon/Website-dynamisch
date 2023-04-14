import React, { useState, FormEvent } from "react";
import { MapPin, Phone, Envelope } from "phosphor-react";

function Kontakt(): JSX.Element {
  const [email, setEmail] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(`Danke für Ihre Anmeldung, ${email}!`);
    // Hier könntest du den Code hinzufügen, der das Formular an deinen Server sendet
  }

  return (
    <div>
      <h1>Kontakt</h1>
      <p>Gerne kannst du uns auf folgenden Wegen erreichen:</p>
      <ul>
        <li>
          <MapPin size={24} /> Frühstücksstr. 20, 89518 Frühhausen
        </li>
        <li>
          <Phone size={24} /> <a href="tel:+49123456789">0 123 456789</a>
        </li>
        <li>
          <Envelope size={24} />{" "}
          <a href="mailto:delivery-breakfast@outlook.de">
            delivery-breakfast@outlook.de
          </a>
        </li>
      </ul>
      <hr />
      <h2>Newsletter abonnieren</h2>
      <p>Melden Sie sich für unseren Newsletter an, um Updates zu erhalten:</p>
      <form onSubmit={handleSubmit}>
        <label>
          E-Mail-Adresse:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Anmelden</button>
      </form>
    </div>
  );
}

export default Kontakt;
