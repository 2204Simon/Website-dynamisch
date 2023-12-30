// DrinkSelection.tsx
import React, { useState } from "react";
import {
  Stage,
  StageHeader,
  SelectionContainer,
  SelectionList,
  SelectionItem,
  SelectionItemImage,
} from "./styles/Konfigurator.styles";
import coffeeImage from "../../img/Drinks/Kaffee.webp";
import orangeJuiceImage from "../../img/Drinks/Orangensaft.webp";

interface DrinkSelectionProps {
  onPrevStage: () => void;
  onComplete: (selectedProduct: string) => void;
}

const DrinkSelection: React.FC<DrinkSelectionProps> = ({
  onPrevStage,
  onComplete,
}) => {
  const [selectedDrink, setSelectedDrink] = useState<string | null>(null);

  const handleDrinkSelect = (drinkType: string) => {
    setSelectedDrink(drinkType);
  };

  const handlePrev = () => {
    onPrevStage();
  };

  const handleComplete = () => {
    if (selectedDrink) {
      onComplete(selectedDrink);
    }
  };

  return (
    <Stage>
      <StageHeader>Wähle dein Getränk</StageHeader>
      <SelectionContainer>
        <SelectionList>
          <SelectionItem onClick={() => handleDrinkSelect("Kaffee")}>
            <SelectionItemImage src={coffeeImage} alt="Kaffee" />
            Kaffee
          </SelectionItem>
          <SelectionItem onClick={() => handleDrinkSelect("Orangensaft")}>
            <SelectionItemImage src={orangeJuiceImage} alt="Orangensaft" />
            Orangensaft
          </SelectionItem>
          {/* Weitere Getränk-Optionen hinzufügen */}
        </SelectionList>
      </SelectionContainer>
      {selectedDrink && (
        <>
          <p>Ausgewähltes Produkt: {selectedDrink}</p>
          <button onClick={handlePrev}>Zurück</button>
          <button onClick={handleComplete}>Abschließen</button>
        </>
      )}
    </Stage>
  );
};

export default DrinkSelection;
