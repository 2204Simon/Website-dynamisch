// BreadSelection.tsx
import React, { useState } from "react";
import {
  Stage,
  StageHeader,
  SelectionContainer,
  SelectionList,
  SelectionItem,
  SelectionItemImage,
} from "./styles/Konfigurator.styles";
import baguetteImage from "../../img/Food/BaguetteAlone.webp";
import whiteBreadImage from "../../img/Food/BaguetteAlone.webp";
import wholeWheatBreadImage from "../../img/Food/BaguetteGelb.webp";

interface BreadSelectionProps {
  onNextStage: (selectedProduct: string) => void;
}

const BreadSelection: React.FC<BreadSelectionProps> = ({ onNextStage }) => {
  const [selectedBread, setSelectedBread] = useState<string | null>(null);

  const handleBreadSelect = (breadType: string) => {
    setSelectedBread(breadType);
  };

  const handleNext = () => {
    if (selectedBread) {
      onNextStage(selectedBread);
    }
  };

  return (
    <Stage>
      <StageHeader>Wähle dein Brot</StageHeader>
      <SelectionContainer>
        <SelectionList>
          <SelectionItem onClick={() => handleBreadSelect("Weißbrot")}>
            <SelectionItemImage src={whiteBreadImage} alt="Weißbrot" />
            Weißbrot
          </SelectionItem>
          <SelectionItem onClick={() => handleBreadSelect("Vollkornbrot")}>
            <SelectionItemImage src={wholeWheatBreadImage} alt="Vollkornbrot" />
            Vollkornbrot
          </SelectionItem>
          {/* Weitere Brot-Optionen hinzufügen */}
        </SelectionList>
      </SelectionContainer>
      {selectedBread && (
        <>
          <p>Ausgewähltes Produkt: {selectedBread}</p>
          <button onClick={handleNext}>Weiter</button>
        </>
      )}
    </Stage>
  );
};

export default BreadSelection;
