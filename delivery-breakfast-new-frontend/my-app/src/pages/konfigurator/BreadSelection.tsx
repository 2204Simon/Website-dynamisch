// BreadSelection.tsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Details,
  ImageContainer,
  Price,
  Title,
  Image,
  ContainerFront,
} from "../produkte/styles/ShoppingCard.styles";
import {
  Stage,
  StageHeader,
  NavigationIcon,
  SelectionContainer,
} from "./styles/Konfigurator.styles";

import { ArrowForward } from "@mui/icons-material";
import { CustomToast } from "../general/toast.style";
import { Button } from "../general/button.styles";
import { baseUrl } from "../../globalVariables/global";
import { Ingredient } from "./Konfigurator";
import { BlackColorButton } from "../general/button";
import { formatNumber } from "../general/constants";

interface BreadSelectionProps {
  onNextStage: (breadselection: Array<Ingredient>) => void;
}

const BreadSelection: React.FC<BreadSelectionProps> = ({ onNextStage }) => {
  const [selectedBread, setSelectedBread] = useState<Ingredient>(); // Hier speichern wir das ausgewählte Brot
  const [breads, setBreads] = useState<any[]>([]); // Hier speichern wir die vom Server geholten Brote
  const [backendError, setBackendError] = useState(false);
  useEffect(() => {
    fetch(`${baseUrl}/zutat/Brot`)
      .then(response => response.json())
      .then(data =>
        Promise.all(
          data.map((bread: any) =>
            loadImage(bread.zutatBild).then(image => ({
              ...bread,
              zutatBild: image,
            }))
          )
        )
      )
      .then(breads => {
        setBreads(breads); // Speichern der Daten im State
      })
      .catch(error => {
        setBackendError(true);
        console.log("Fehler");
        console.error("Error:", error);
      });
  }, []);

  async function loadImage(path: string): Promise<string> {
    const image = await import(`../../img/Ingredients/Breads/${path}`);
    return image.default; //Wegen ES6 mit default
  }

  const handleBreadSelect = (topping: any) => {
    const alteAuswahl = selectedBread;
    setSelectedBread({
      zutatsId: topping.zutatsId,
      zutatBild: topping.zutatBild,
      zutatsname: topping.zutatsname,
      zutatspreis: topping.zutatspreis,
      zutatseinheit: topping.zutatseinheit,
      zutatsmenge: 1,
    });
    if (alteAuswahl) {
      if (alteAuswahl.zutatsname === topping.zutatsname) {
        CustomToast.info(`Du hast bereits ${topping.zutatsname} ausgewählt!`);
      } else {
        CustomToast.success(
          `${alteAuswahl.zutatsname} wurde ersetzt durch ${topping.zutatsname}!`
        );
      }
    } else {
      CustomToast.success(`Es wurde ${topping.zutatsname} hinzugefügt!`);
    }
  };

  const handleNext = () => {
    if (selectedBread) {
      onNextStage([selectedBread]);
    } else {
      CustomToast.error("Bitte wähle ein Gebäck aus!");
    }
  };

  return (
    <Stage>
      <StageHeader>
        Wähle Dein Gebäck
        <NavigationIcon onClick={handleNext}>
          <ArrowForward />
        </NavigationIcon>
      </StageHeader>

      <p>
        Durch Anklicken der Produktkarte kannst Du das gewünschte Gebäck zur
        Konfiguration hinzufügen. Du kannst nur ein Gebäck auswählen.
      </p>
      {backendError && (
        <p>
          Die Brote konnten nicht geladen werden. Bitte wende Dich an den
          Support.
        </p>
      )}
      <SelectionContainer>
        {breads.map(
          (
            bread // Anzeigen der Brote aus dem State
          ) => (
            <Container flipped={false}>
              <ContainerFront
                flipped={false}
                displayNone={false}
                key={bread.zutatsId}
              >
                <ImageContainer>
                  <Image src={bread.zutatBild} alt={bread.zutatsname} />
                </ImageContainer>
                <Details>
                  <Title style={{ paddingLeft: "0px" }}>
                    {bread.zutatsname}
                  </Title>
                  <Price>Preis: {formatNumber(bread.zutatspreis)} €</Price>
                  <p> 1 Stück </p>
                  <BlackColorButton
                    onClick={() => handleBreadSelect(bread)}
                    caption="Zur Konfiguration hinzufügen"
                  />
                </Details>
              </ContainerFront>
            </Container>
          )
        )}
      </SelectionContainer>

      <Button className="black-color white-orange" onClick={handleNext}>
        Weiter zum Belag
      </Button>
    </Stage>
  );
};

export default BreadSelection;
