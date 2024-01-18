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
  Title,
  Price,
  Details,
} from "./styles/Konfigurator.styles";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { BlackColorButton } from "../general/button";

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
    fetch("http://localhost:3001/api/v1/zutat/Getränk")
      .then(response => response.json())
      .then(data =>
        Promise.all(
          data.map((drink: any) =>
            loadImage(drink.zutatBild).then(image => ({
              ...drink,
              zutatBild: image,
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
    const image = await import(`../../img/Drinks/${path}`);
    return image.default; //Wegen ES6 mit default
  }

  const handlePrev = () => {
    onPrevStage();
  };

  const handleNext = () => {
    if (selectedDrink) {
      const selectedDrinkData = drinks.find(
        drink => drink.zutatsname === selectedDrink
      );
      onComplete(selectedDrink, selectedDrinkData?.zutatBild || "");
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

      <SelectionContainer>
        {drinks.map(
          (
            drink // Anzeigen der Getränke aus dem State
          ) => (
            <Container flipped={false}>
              <SelectionItem
                key={drink.zutatsId}
                className={selectedDrink === drink.zutatsname ? "selected" : ""}
                onClick={() =>
                  handleDrinkSelect(drink.zutatsname, drink.zutatBild)
                }
              >
                <ProductImage src={drink.zutatBild} alt={drink.zutatsname} />

                <Title>{drink.zutatsname}</Title>
                <Price>{drink.zutatspreis} €</Price>
                <p>Durch Anklicken zur Konfiguration hinzufügen</p>
              </SelectionItem>
            </Container>
          )
        )}

        {selectedDrink && (
          <div>
            <p>Ausgewähltes Getränk: {selectedDrink}</p>
            <p>Bestätige die Auswahl mit dem Vorwärtspfeil</p>
          </div>
        )}
      </SelectionContainer>
    </Stage>
  );
};

export default DrinkSelection;
