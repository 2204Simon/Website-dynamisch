// ToppingsSelection.tsx
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
import { ArrowBack, ArrowForward } from "@mui/icons-material";

interface ToppingsSelectionProps {
  onNextStage: (selectedProduct: string, selectedImage: string) => void;
  onPrevStage: () => void;
}

const ToppingsSelection: React.FC<ToppingsSelectionProps> = ({
  onPrevStage,
  onNextStage,
}) => {
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [toppings, setToppings] = useState<any[]>([]); // Hier speichern wir die vom Server geholten Toppings

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/zutat/Topping")
      .then(response => response.json())
      .then(data =>
        Promise.all(
          data.map((topping: any) =>
            loadImage(topping.zutatBild).then(image => ({
              ...topping,
              zutatBild: image,
            }))
          )
        )
      )
      .then(toppings => {
        setToppings(toppings); // Speichern der Daten im State
      })
      .catch(error => {
        console.log("Fehler");
        console.error("Error:", error);
      });
  }, []);

  const handleToppingSelect = (topping: string, image: string) => {
    const updatedToppings = selectedToppings.includes(topping)
      ? selectedToppings.filter(selected => selected !== topping)
      : [...selectedToppings, topping];

    setSelectedToppings(updatedToppings);
  };

  async function loadImage(path: string): Promise<string> {
    const image = await import(`../../img/Ingredients/Toppings/${path}`);
    return image.default; //Wegen ES6 mit default
  }

  const handlePrev = () => {
    onPrevStage();
  };

  const handleNext = () => {
    if (selectedToppings.length > 0) {
      const selectedToppingsData = selectedToppings.map(topping =>
        toppings.find(t => t.zutatsname === topping)
      );
      onNextStage(
        selectedToppings.join(", "),
        selectedToppingsData
          .map(toppingData => toppingData?.zutatBild || "")
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
          {toppings.map(
            (
              topping // Anzeigen der Toppings aus dem State
            ) => (
              <SelectionItem
                key={topping.zutatsId}
                className={
                  selectedToppings.includes(topping.zutatsname)
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  handleToppingSelect(topping.zutatsname, topping.zutatBild)
                }
              >
                <ProductImage
                  src={topping.zutatBild}
                  alt={topping.zutatsname}
                />
                {topping.zutatsname}
              </SelectionItem>
            )
          )}
        </SelectionList>
      </SelectionContainer>
      {selectedToppings.length > 0 && (
        <div>
          <p>Ausgewählte Beläge: {selectedToppings.join(", ")}</p>
          <p>Bestätige die Auswahl mit dem Vorwärtspfeil</p>
        </div>
      )}
    </Stage>
  );
};

export default ToppingsSelection;
