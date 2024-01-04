// BreadSelection.tsx
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

import whiteBreadImage from "../../img/Food/BaguetteAlone.webp"; // Platzhalterbild
import wholegrainBreadImage from "../../img/Food/BaguetteAlone.webp"; // Platzhalterbild
import lunchDiningImage from "../../img/Food/BaguttSalat.webp"; // Platzhalterbild
import baguetteImage from "../../img/Food/käseBaguett.webp"; // Platzhalterbild
import { ArrowForward } from "@mui/icons-material";

interface BreadSelectionProps {
  onNextStage: (selectedProduct: string, selectedImage: string) => void;
}

const BreadSelection: React.FC<BreadSelectionProps> = ({ onNextStage }) => {
  const [selectedBread, setSelectedBread] = useState<string | null>(null);

  const handleBreadSelect = (breadType: string, image: string) => {
    setSelectedBread(breadType);
  };

  const handleNext = () => {
    if (selectedBread) {
      onNextStage(selectedBread, "");
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
      <SelectionContainer>
        <SelectionList>
          <SelectionItem
            className={selectedBread === "Weißbrot" ? "selected" : ""}
            onClick={() => handleBreadSelect("Weißbrot", whiteBreadImage)}
          >
            <ProductImage src={whiteBreadImage} alt="Weißbrot" />
            Weißbrot
          </SelectionItem>
          <SelectionItem
            className={selectedBread === "Vollkornbrot" ? "selected" : ""}
            onClick={() =>
              handleBreadSelect("Vollkornbrot", wholegrainBreadImage)
            }
          >
            <ProductImage src={wholegrainBreadImage} alt="Vollkornbrot" />
            Vollkornbrot
          </SelectionItem>
          <SelectionItem
            className={selectedBread === "Mischbrot" ? "selected" : ""}
            onClick={() => handleBreadSelect("Mischbrot", lunchDiningImage)}
          >
            <ProductImage src={lunchDiningImage} alt="Mischbrot" />
            Mischbrot
          </SelectionItem>
          <SelectionItem
            className={selectedBread === "Baguette" ? "selected" : ""}
            onClick={() => handleBreadSelect("Baguette", baguetteImage)}
          >
            <ProductImage src={baguetteImage} alt="Baguette" />
            Baguette
          </SelectionItem>
          {/* Weitere Brot-Optionen hinzufügen */}
        </SelectionList>
      </SelectionContainer>
      {selectedBread && (
        <div>
          <p>Ausgewähltes Produkt: {selectedBread}</p>
          <p>Bestätige die Auswahl mit dem Vorwärtspfeil</p>
        </div>
      )}
    </Stage>
  );
};

export default BreadSelection;
