// ToppingsSelection.tsx
import React, { useState } from "react";
import {
  Stage,
  StageHeader,
  ProductImage,
  SelectionContainer,
  SelectionList,
  SelectionItem,
  NavigationIcon,
} from "./styles/Konfigurator.styles";
import {
  ArrowForward,
  ArrowBack,
  EmojiFoodBeverage,
} from "@mui/icons-material";

import cheeseImage from "../../img/Food/Croissant.webp"; // Platzhalterbild
import tomatoImage from "../../img/Food/Croissant.webp"; // Platzhalterbild
import lettuceImage from "../../img/Food/Croissant.webp"; // Platzhalterbild
import eggImage from "../../img/Food/Croissant.webp"; // Platzhalterbild

interface ToppingsSelectionProps {
  onNextStage: (selectedProduct: string, selectedImage: string) => void;
  onPrevStage: () => void;
}

const ToppingsSelection: React.FC<ToppingsSelectionProps> = ({
  onPrevStage,
  onNextStage,
}) => {
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  const toppingsData = [
    { name: "Käse", image: cheeseImage },
    { name: "Tomate", image: tomatoImage },
    { name: "Salat", image: lettuceImage },
    { name: "Ei", image: eggImage },
    // Weitere Belag-Optionen hinzufügen
  ];

  const handleToppingSelect = (topping: string, image: string) => {
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
      onNextStage(
        selectedToppings.join(", "),
        selectedToppings
          .map(topping => {
            const matchingTopping = toppingsData.find(t => t.name === topping);
            return matchingTopping?.image || "";
          })
          .join(", ")
      );
    }
  };

  return (
    <Stage>
      <StageHeader>
        <NavigationIcon onClick={handlePrev}>
          <ArrowBack />
        </NavigationIcon>
        Wähle deine Beläge
        <NavigationIcon onClick={handleNext}>
          <ArrowForward />
        </NavigationIcon>
      </StageHeader>
      <SelectionContainer>
        <SelectionList>
          <SelectionItem
            onClick={() => handleToppingSelect("Käse", cheeseImage)}
          >
            <ProductImage src={cheeseImage} alt="Käse" />
            Käse
          </SelectionItem>
          <SelectionItem
            onClick={() => handleToppingSelect("Tomate", tomatoImage)}
          >
            <ProductImage src={tomatoImage} alt="Tomate" />
            Tomate
          </SelectionItem>
          <SelectionItem
            onClick={() => handleToppingSelect("Salat", lettuceImage)}
          >
            <ProductImage src={lettuceImage} alt="Salat" />
            Salat
          </SelectionItem>
          <SelectionItem onClick={() => handleToppingSelect("Ei", eggImage)}>
            <ProductImage src={eggImage} alt="Ei" />
            Ei
          </SelectionItem>
          {/* Weitere Belag-Optionen hinzufügen */}
        </SelectionList>
      </SelectionContainer>
      {selectedToppings.length > 0 && (
        <p>Ausgewählte Beläge: {selectedToppings.join(", ")}</p>
      )}
    </Stage>
  );
};

export default ToppingsSelection;
