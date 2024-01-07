// BreadSelection.tsx
import React, { useState, useEffect } from "react";
import {
  Stage,
  StageHeader,
  ProductImage,
  SelectionContainer,
  SelectionList,
  SelectionItem,
  NavigationIcon,
} from "./styles/Konfigurator.styles";
import { ArrowForward } from "@mui/icons-material";

interface BreadSelectionProps {
  onNextStage: (selectedProduct: string, selectedImage: string) => void;
}

const BreadSelection: React.FC<BreadSelectionProps> = ({ onNextStage }) => {
  const [selectedBread, setSelectedBread] = useState<string | null>(null);
  const [breads, setBreads] = useState<any[]>([]); // Hier speichern wir die vom Server geholten Brote

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/zutat/Brot")
      .then(response => response.json())
      .then(data =>
        Promise.all(
          data.map((bread: any) =>
            loadImage(bread.zutatBild).then(image => ({
              ...bread,
              zutatBild: image,
            }))
          )
        )
      )
      .then(breads => {
        setBreads(breads); // Speichern der Daten im State
      })
      .catch(error => {
        console.log("Fehler");
        console.error("Error:", error);
      });
  }, []);

  const handleBreadSelect = (breadType: string, image: string) => {
    setSelectedBread(breadType);
  };

  async function loadImage(path: string): Promise<string> {
    const image = await import(`../../img/${path}`);
    return image.default; //Wegen ES6 mit default
  }

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
          {breads.map(
            (
              bread // Anzeigen der Brote aus dem State
            ) => (
              console.log(bread),
              (
                <SelectionItem
                  key={bread.zutatsId}
                  className={
                    selectedBread === bread.zutatsname ? "selected" : ""
                  }
                  onClick={() =>
                    handleBreadSelect(bread.zutatsname, bread.zutatBild)
                  }
                >
                  <ProductImage src={bread.zutatBild} alt={bread.zutatsname} />
                  {bread.zutatsname}
                  {}
                </SelectionItem>
              )
            )
          )}
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
