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

import whiteBreadImage from "../../img/Food/Croissant.webp"; // Platzhalterbild
import wholegrainBreadImage from "../../img/Food/Croissant.webp"; // Platzhalterbild
import lunchDiningImage from "../../img/Food/Croissant.webp"; // Platzhalterbild
import baguetteImage from "../../img/Food/Croissant.webp"; // Platzhalterbild
import { ArrowForward } from "@mui/icons-material";

interface BreadSelectionProps {
  onNextStage: (selectedProduct: string, selectedImage: string) => void;
}

const BreadSelection: React.FC<BreadSelectionProps> = ({ onNextStage }) => {
  const [selectedBread, setSelectedBread] = useState<string | null>(null);

  const handleBreadSelect = (breadType: string, image: string) => {
    setSelectedBread(breadType);
    onNextStage(breadType, image);
  };

  return (
    <Stage>
      <StageHeader>
        <NavigationIcon>
          <ArrowForward />
        </NavigationIcon>
        Wähle dein Brot
      </StageHeader>
      <SelectionContainer>
        <SelectionList>
          <SelectionItem
            onClick={() => handleBreadSelect("Weißbrot", whiteBreadImage)}
          >
            <ProductImage src={whiteBreadImage} alt="Weißbrot" />
            Weißbrot
          </SelectionItem>
          <SelectionItem
            onClick={() =>
              handleBreadSelect("Vollkornbrot", wholegrainBreadImage)
            }
          >
            <ProductImage src={wholegrainBreadImage} alt="Vollkornbrot" />
            Vollkornbrot
          </SelectionItem>
          <SelectionItem
            onClick={() => handleBreadSelect("Mischbrot", lunchDiningImage)}
          >
            <ProductImage src={lunchDiningImage} alt="Mischbrot" />
            Mischbrot
          </SelectionItem>
          <SelectionItem
            onClick={() => handleBreadSelect("Baguette", baguetteImage)}
          >
            <ProductImage src={baguetteImage} alt="Baguette" />
            Baguette
          </SelectionItem>
          {/* Weitere Brot-Optionen hinzufügen */}
        </SelectionList>
      </SelectionContainer>
      {selectedBread && <p>Ausgewähltes Produkt: {selectedBread}</p>}
    </Stage>
  );
};

export default BreadSelection;
