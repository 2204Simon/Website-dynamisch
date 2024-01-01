// DrinkSelection.tsx
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
import { LocalCafe, ArrowForward, ArrowBack } from "@mui/icons-material";

import orangeJuiceImage from "../../img/Drinks/Orangensaft.webp"; // Platzhalterbild
import coffeeImage from "../../img/Drinks/Kaffee.webp"; // Platzhalterbild
import teaImage from "../../img/Drinks/Zitronentee.webp"; // Platzhalterbild

interface DrinkSelectionProps {
  onPrevStage: () => void;
  onComplete: (selectedProduct: string, selectedImage: string) => void;
}

const DrinkSelection: React.FC<DrinkSelectionProps> = ({
  onPrevStage,
  onComplete,
}) => {
  const [selectedDrink, setSelectedDrink] = useState<string | null>(null);

  const drinkData = [
    { name: "Orangensaft", image: orangeJuiceImage },
    { name: "Kaffee", image: coffeeImage },
    { name: "Tee", image: teaImage },
    // Weitere Getränke-Optionen hinzufügen
  ];

  const handleDrinkSelect = (drink: string, image: string) => {
    setSelectedDrink(drink);
    onComplete(drink, image);
  };

  const handlePrev = () => {
    onPrevStage();
  };

  return (
    <Stage>
      <StageHeader>
        <NavigationIcon onClick={handlePrev}>
          <ArrowBack />
        </NavigationIcon>
        Wähle dein Getränk
        <NavigationIcon
          onClick={() =>
            handleDrinkSelect(selectedDrink || "", selectedDrink || "")
          }
        >
          <ArrowForward />
        </NavigationIcon>
      </StageHeader>
      <SelectionContainer>
        <SelectionList>
          <SelectionItem
            onClick={() => handleDrinkSelect("Orangensaft", orangeJuiceImage)}
          >
            <ProductImage src={orangeJuiceImage} alt="Orangensaft" />
            Orangensaft
          </SelectionItem>
          <SelectionItem
            onClick={() => handleDrinkSelect("Kaffee", coffeeImage)}
          >
            <ProductImage src={coffeeImage} alt="Kaffee" />
            Kaffee
          </SelectionItem>
          <SelectionItem onClick={() => handleDrinkSelect("Tee", teaImage)}>
            <ProductImage src={teaImage} alt="Tee" />
            Tee
          </SelectionItem>
          {/* Weitere Getränke-Optionen hinzufügen */}
        </SelectionList>
      </SelectionContainer>
      {selectedDrink && <p>Ausgewähltes Getränk: {selectedDrink}</p>}
    </Stage>
  );
};

export default DrinkSelection;
