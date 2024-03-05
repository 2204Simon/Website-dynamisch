// BreadSelection.tsx
import React, { useState, useEffect } from "react";
import {
  Stage,
  StageHeader,
  SelectionContainer,
  NavigationIcon,
  Container,
  Details,
  ImageContainer,
  Price,
  Title,
  Image,
  ContainerFront,
} from "./styles/Konfigurator.styles";
import { ArrowForward } from "@mui/icons-material";
import { CustomToast } from "../general/toast.style";
import { Button } from "../general/button.styles";
import { baseUrl } from "../../globalVariables/global";
import { Ingredient } from "./Konfigurator";
import { BlackColorButton } from "../general/button";

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
    setSelectedBread({
      zutatsId: topping.zutatsId,
      zutatBild: topping.zutatBild,
      zutatsname: topping.zutatsname,
      zutatspreis: topping.zutatspreis,
      zutatseinheit: topping.zutatseinheit,
      zutatsmenge: 1,
    });
  };

  const handleNext = () => {
    if (selectedBread) {
      onNextStage([selectedBread]);
    } else {
      CustomToast.error("Bitte wählen Sie ein Brot aus");
    }
  };

  return (
    <Stage>
      <StageHeader>
        Wähle dein Brot
        <NavigationIcon onClick={handleNext}>
          <ArrowForward />
        </NavigationIcon>
      </StageHeader>

      <p>
        Durch Anklicken der Produktkarte kannst Du das gewünschte Brot zur
        Konfiguration hinzufügen.
      </p>
      {backendError && (
        <p>
          Die Brote konnten nicht geladen werden. Bitte wenden Sie sich an den
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
                className={
                  selectedBread && selectedBread.zutatsId === bread.zutatsId
                    ? "selected"
                    : ""
                }
                onClick={() => handleBreadSelect(bread)}
              >
                <ImageContainer>
                  <Image src={bread.zutatBild} alt={bread.zutatsname} />
                </ImageContainer>
                <Details>
                  <Title>{bread.zutatsname}</Title>

                  <Price>Preis: {bread.zutatspreis} €</Price>

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
