// ToppingsSelection.tsx
import React, { useState } from "react";
import {
  Stage,
  StageHeader,
  SelectionContainer,
  SelectionList,
  SelectionItem,
  SelectionItemImage,
} from "./styles/Konfigurator.styles";
import cheeseImage from "../../img/Food/Croissant.webp";
import tomatoImage from "../../img/Food/Brezel.webp";
import lettuceImage from "../../img/Food/BaguetteAlone.webp";

interface ToppingsSelectionProps {
  onPrevStage: () => void;
  onNextStage: (selectedProduct: string) => void;
}

const ToppingsSelection: React.FC<ToppingsSelectionProps> = ({
  onPrevStage,
  onNextStage,
}) => {
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  const handleToppingSelect = (topping: string) => {
    const updatedToppings = selectedToppings.includes(topping)
      ? selectedToppings.filter(selected => selected !== topping)
      : [...selectedToppings, topping];

    setSelectedToppings(updatedToppings);
  };

  const handlePrev = () => {
    onPrevStage();
  };

  const handleNext = () => {
    if (selectedToppings.length > 0) {
      onNextStage(selectedToppings.join(", "));
    }
  };

  return (
    <Stage>
      <StageHeader>Wähle deine Beläge</StageHeader>
      <SelectionContainer>
        <SelectionList>
          <SelectionItem onClick={() => handleToppingSelect("Käse")}>
            <SelectionItemImage src={cheeseImage} alt="Käse" />
            Käse
          </SelectionItem>
          <SelectionItem onClick={() => handleToppingSelect("Tomate")}>
            <SelectionItemImage src={tomatoImage} alt="Tomate" />
            Tomate
          </SelectionItem>
          <SelectionItem onClick={() => handleToppingSelect("Salat")}>
            <SelectionItemImage src={lettuceImage} alt="Salat" />
            Salat
          </SelectionItem>
          {/* Weitere Belag-Optionen hinzufügen */}
        </SelectionList>
      </SelectionContainer>
      {selectedToppings.length > 0 && (
        <>
          <p>Ausgewählte Produkte: {selectedToppings.join(", ")}</p>
          <button onClick={handlePrev}>Zurück</button>
          <button onClick={handleNext}>Weiter</button>
        </>
      )}
    </Stage>
  );
};

export default ToppingsSelection;
