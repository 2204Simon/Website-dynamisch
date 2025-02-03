import { useState } from "react";
import NewspaperBanner from "./ShoppingCardNewspaper";
import { CenteredContainer } from "./styles/NewspaperBanner.styles";
import { BlackColorButton } from "../general/button";

type Newspaper = {
  title: string;
  image: string;
  price: number;
  produktId: string;
};

function NewspaperAbo(newspaper: Newspaper) {
  const [visible, setVisible] = useState(false);
  function buttonclick() {
    setVisible(!visible);
  }
  if (visible) {
    if (newspaper.title === "") {
      return (
        <CenteredContainer>
          <BlackColorButton onClick={buttonclick} caption="Zurück" />
          <p>Leider ist ein Problem beim Laden der Zeitung aufgetreten</p>
        </CenteredContainer>
      );
    } else {
      return (
        <div>
          <NewspaperBanner
            image={newspaper.image}
            title={newspaper.title}
            basePrice={newspaper.price}
            back={buttonclick}
            produktId={newspaper.produktId}
          />
        </div>
      );
    }
  } else {
    return (
      <CenteredContainer>
        <BlackColorButton onClick={buttonclick} caption="Zeitungsabonnement" />
      </CenteredContainer>
    );
  }
}
export default NewspaperAbo;
