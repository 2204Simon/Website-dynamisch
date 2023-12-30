// Konfigurator.tsx
import React, { useState } from "react";
import BreadSelection from "./BreadSelection";
import ToppingsSelection from "./ToppingsSelection";
import DrinkSelection from "./DrinkSelection";
import {
  ConfiguratorContainer,
  ConfiguratorContent,
  StageContainer,
  SummaryContainer,
  SummaryHeader,
  SummaryText,
} from "./styles/Konfigurator.styles";

const Konfigurator: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [config, setConfig] = useState({
    bread: null,
    toppings: [],
    drink: null,
  });

  const handleNextStage = () => {
    setCurrentStage(prevStage => prevStage + 1);
  };

  const handlePrevStage = () => {
    setCurrentStage(prevStage => prevStage - 1);
  };

  const handleComplete = () => {
    // Handle the completion logic, e.g., send the configuration to the server
    console.log("Configuration:", config);
  };

  return (
    <ConfiguratorContainer>
      <ConfiguratorContent>
        <StageContainer>
          {currentStage === 1 && (
            <BreadSelection onNextStage={handleNextStage} />
          )}
          {currentStage === 2 && (
            <ToppingsSelection
              onPrevStage={handlePrevStage}
              onNextStage={handleNextStage}
            />
          )}
          {currentStage === 3 && (
            <DrinkSelection
              onPrevStage={handlePrevStage}
              onComplete={handleComplete}
            />
          )}
        </StageContainer>
        {currentStage === 3 && (
          <SummaryContainer>
            <SummaryHeader>Zusammenfassung</SummaryHeader>
            <SummaryText>
              Brot: {config.bread}
              <br />
              Beläge: {config.toppings.join(", ")}
              <br />
              Getränke: {config.drink}
            </SummaryText>
          </SummaryContainer>
        )}
      </ConfiguratorContent>
    </ConfiguratorContainer>
  );
};

export default Konfigurator;
