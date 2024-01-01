// Konfigurator.tsx
import React, { useState } from "react";
import BreadSelection from "./BreadSelection";
import ToppingsSelection from "./ToppingsSelection";
import DrinkSelection from "./DrinkSelection";
import { NavigationIcon } from "./styles/Konfigurator.styles";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const Konfigurator: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [selectedBread, setSelectedBread] = useState<string>("");
  const [selectedToppings, setSelectedToppings] = useState<string>("");
  const [selectedDrink, setSelectedDrink] = useState<string>("");

  const handleNextStage = (selectedProduct: string, selectedImage: string) => {
    setCurrentStage(currentStage + 1);

    switch (currentStage) {
      case 1:
        setSelectedBread(selectedProduct);
        break;
      case 2:
        setSelectedToppings(selectedProduct);
        break;
      case 3:
        setSelectedDrink(selectedProduct);
        break;
      default:
        break;
    }
  };

  const handlePrevStage = () => {
    setCurrentStage(currentStage - 1);
  };

  return (
    <div>
      {currentStage === 1 && <BreadSelection onNextStage={handleNextStage} />}
      {currentStage === 2 && (
        <ToppingsSelection
          onNextStage={handleNextStage}
          onPrevStage={handlePrevStage}
        />
      )}
      {currentStage === 3 && (
        <DrinkSelection
          onPrevStage={handlePrevStage}
          onComplete={handleNextStage}
        />
      )}
      {currentStage === 4 && (
        <div>
          <NavigationIcon onClick={handlePrevStage}>
            <ArrowBack />
          </NavigationIcon>
          <h2>Zusammenfassung</h2>
          <p>Ausgewähltes Brot: {selectedBread}</p>
          <p>Ausgewählte Beläge: {selectedToppings}</p>
          <p>Ausgewähltes Getränk: {selectedDrink}</p>
        </div>
      )}
    </div>
  );
};

export default Konfigurator;
