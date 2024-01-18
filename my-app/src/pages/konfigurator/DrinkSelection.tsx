// DrinkSelection.tsx
import React, { useState, useEffect } from "react";
import {
  Stage,
  StageHeader,
  ProductImage,
  SelectionContainer,
  SelectionList,
  SelectionItem,
  NavigationIcon,
  Container,
  ContainerFront,
  ImageContainer,
  Image,
  Title,
  Price,
  Details,
} from "./styles/Konfigurator.styles";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button } from "../general/button.styles";


interface DrinkSelectionProps {
  onPrevStage: () => void;
  onComplete: (selectedProduct: string, selectedImage: string) => void;
}

const DrinkSelection: React.FC<DrinkSelectionProps> = ({
  onPrevStage,
  onComplete,
}) => {
  const [selectedDrink, setSelectedDrink] = useState<string | null>(null);
  const [drinks, setDrinks] = useState<any[]>([]); // Hier speichern wir die vom Server geholten Getränke

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/generalProdukts/Drinks")
      .then(response => response.json())
      .then(data =>
        Promise.all(
          data.map((drink: any) =>
            loadImage(drink.bild).then(image => ({
              ...drink,
              bild: image,
            }))
          )
        )
      )
      .then(drinks => {
        setDrinks(drinks); // Speichern der Daten im State
      })
      .catch(error => {
        console.log("Fehler");
        console.error("Error:", error);
      });
  }, []);

  const handleDrinkSelect = (drinkType: string, image: string) => {
    setSelectedDrink(drinkType);
  };

  async function loadImage(path: string): Promise<string> {
    const image = await import(`../../img/${path}`);
    return image.default; //Wegen ES6 mit default
  }

  const handlePrev = () => {
    onPrevStage();
  };

  const handleNext = () => {
    if (selectedDrink) {
      const selectedDrinkData = drinks.find(
        drink => drink.titel === selectedDrink
      );
      onComplete(selectedDrink, selectedDrinkData?.bild || "");
    }
  };

  return (
    <Stage>
      <StageHeader>
        <NavigationIcon onClick={handlePrev}>
          <ArrowBack />
        </NavigationIcon>
        Wähle dein Getränk
        <NavigationIcon onClick={handleNext}>
          <ArrowForward />
        </NavigationIcon>
      </StageHeader>
      <p>
        Durch Anklicken der Produktkarte kannst Du das gewünschte Getränk zur
        Konfiguration hinzufügen.
      </p>

      <SelectionContainer>
        {drinks.map(
          (
            drink // Anzeigen der Getränke aus dem State
          ) => (
            <Container flipped={false}>
              <ContainerFront
                flipped={false}
                displayNone={false}
                key={drink.produktId}
                className={selectedDrink === drink.titel ? "selected" : ""}
                onClick={() =>
                  handleDrinkSelect(drink.titel, drink.bild)
                }
              >
                <ImageContainer>
                  <Image src={drink.bild} alt={drink.titel} />
                </ImageContainer>
                <Details>
                  <Title>{drink.titel}</Title>
                  <Price>{drink.preis} €</Price>
                </Details>
              </ContainerFront>
            </Container>
          )
        )}
      </SelectionContainer>

        {selectedDrink && (
          <div>
            <p>Ausgewähltes Getränk: {selectedDrink}</p>
            <p>Bestätige die Auswahl mit dem Vorwärtspfeil</p>
          </div>
        )}
      <NavigationIcon onClick={handleNext}>
        <Button className="black-color white-orange" onClick={handleNext}>
          Weiter zur Zusammenfassung
        </Button>
        <ArrowForward />
      </NavigationIcon>
    </Stage>
  );
};

export default DrinkSelection;
