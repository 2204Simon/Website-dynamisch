// ToppingsSelection.tsx
import React, { useState, useEffect } from "react";
import {
  Stage,
  StageHeader,
  SelectionContainer,
  NavigationIcon,
} from "./styles/Konfigurator.styles";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button } from "../general/button.styles";
import { baseUrl } from "../../globalVariables/global";
import KonfiguratorCard from "./KonfiguratorCard";
import { Ingredient } from "./Konfigurator";
import { CustomToast } from "../general/toast.style";

interface ToppingsSelectionProps {
  onNextStage: (selectedToppingsID: Array<Ingredient>) => void;
  onPrevStage: () => void;
}

const ToppingsSelection: React.FC<ToppingsSelectionProps> = ({
  onPrevStage,
  onNextStage,
}) => {
  const [selectedToppings, setSelectedToppings] = useState<Array<Ingredient>>(
    []
  );
  const [toppings, setToppings] = useState<Array<Ingredient>>([]); // Hier speichern wir die vom Server geholten Toppings

  useEffect(() => {
    fetch(`${baseUrl}/zutat/Topping`)
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

  async function loadImage(path: string): Promise<string> {
    const image = await import(`../../img/Ingredients/Toppings/${path}`);
    return image.default; //Wegen ES6 mit default
  }

  function handleSelect(topping: Ingredient, quantity: number) {
    const lclToppings = selectedToppings;

    if (quantity > 0) {
      lclToppings.push({
        zutatsId: topping.zutatsId,
        zutatBild: topping.zutatBild,
        zutatsname: topping.zutatsname,
        zutatspreis: topping.zutatspreis,
        zutatseinheit: topping.zutatseinheit,
        zutatsmenge: quantity,
      });

      CustomToast.success(
        `Es wurde(n) ${quantity} ${topping.zutatseinheit} ${topping.zutatsname} hinzugefügt!`
      );
      setSelectedToppings(lclToppings);
    } else {
      CustomToast.error(
        `Du musst mindestens eine Menge von 1 Einheit auswählen!`
      );
    }
  }

  const handlePrev = () => {
    onPrevStage();
  };

  const handleNext = () => {
    onNextStage(selectedToppings);
  };

  const KonfiguratorCards = () => {
    return toppings.map(product => (
      <KonfiguratorCard topping={product} handleSelect={handleSelect} />
    ));
  };

  return (
    <Stage>
      <StageHeader>
        <NavigationIcon onClick={handlePrev}>
          <ArrowBack />
        </NavigationIcon>
        Wähle Deine Beläge
        <NavigationIcon onClick={handleNext}>
          <ArrowForward />
        </NavigationIcon>
      </StageHeader>
      <p>
        Durch das Ausfüllen der Menge in der Produktkarte kannst Du den
        gewünschten Belag zur Konfiguration hinzufügen.
      </p>
      <SelectionContainer>{KonfiguratorCards()}</SelectionContainer>

      <NavigationIcon onClick={handleNext}>
        <Button className="black-color white-orange" onClick={handleNext}>
          Weiter zu den Extras
        </Button>
      </NavigationIcon>
    </Stage>
  );
};

export default ToppingsSelection;
