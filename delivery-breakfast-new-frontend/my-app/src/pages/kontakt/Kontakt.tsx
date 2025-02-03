import { useState, FormEvent, ChangeEvent } from "react";
import { MapPin, Phone, Envelope } from "phosphor-react";
import {
  MainContainer,
  ContactContainer,
  FormInput,
  FormTextArea,
  FormLabel,
  ContactList,
  ContactListItem,
} from "./styles/Kontakt.styles";
import { ContactMap } from "./Map";
import "react-toastify/dist/ReactToastify.css";
import { CustomToast } from "../general/toast.style";
import { BlackColorButton } from "../general/button";
import { useCookies } from "react-cookie";

function Kontakt(): JSX.Element {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [cookies, setCookie] = useCookies(["cookiesAccepted"]);
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(`Danke für Ihre Anmeldung, ${email}!`);
    console.log(`Nachricht: ${message}`);
    CustomToast.success("Die Anmeldung zum Newsletter war erfolgreich!");
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value);
  }

  function handleMessageChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    setMessage(event.target.value);
  }

  return (
    <>
      <h2>Kontakt</h2>
      <p>
        Wenn wir Dein Interesse geweckt haben, Du jedoch noch weitere
        Informationen zu Produkten, dem Service oder zu unserem Unternehmen
        haben möchtest, kannst Du uns tagsüber unter den nachfolgenden
        Kontaktmöglichkeiten erreichen. Wir freuen uns, von Dir zu hören!
      </p>

      <MainContainer>
        <ContactList>
          <ContactListItem style={{ color: "#aa7d03" }}>
            <Envelope size={40} />{" "}
            <a href="mailto:delivery-breakfast@outlook.de">
              delivery-breakfast@outlook.de
            </a>
          </ContactListItem>
          <ContactListItem style={{ color: "#aa7d03" }}>
            <Phone size={40} /> <a href="tel:+49123456789">0 123 456789</a>
          </ContactListItem>
          <ContactListItem style={{ color: "#aa7d03" }}>
            <MapPin size={40} /> Frühstücksstr. 20, 89518 Frühhausen
          </ContactListItem>
        </ContactList>
        {cookies.cookiesAccepted === true ? (
          <ContactMap />
        ) : (
          <div>Du musst die Cookies akzeptieren, um die Karte zu sehen.</div>
        )}
        <hr />
      </MainContainer>
    </>
  );
}

export default Kontakt;
