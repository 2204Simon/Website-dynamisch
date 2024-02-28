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
import { Ingredient, KonfiguratorCardProps } from "./Konfigurator";

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
  const [toppings, setToppings] = useState<Array<KonfiguratorCardProps>>([]); // Hier speichern wir die vom Server geholten Toppings

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

  const handleToppingSelect = (toppingID: string, quantity: number) => {
    const lclToppings = selectedToppings;
    if (!lclToppings.some(topping => topping.id === toppingID)) {
      lclToppings.push({ id: toppingID, quantity: quantity });
    }
    setSelectedToppings(lclToppings);
  };

  const handlePrev = () => {
    onPrevStage();
  };

  const handleNext = () => {
    onNextStage(selectedToppings);
  };

  const KonfiguratorCards = () => {
    const productsToRender = toppings.map((product: KonfiguratorCardProps) => ({
      produktId: product.zutatsId,
      image: product.zutatBild,
      title: product.zutatsname,
      price: product.zutatspreis,
    }));

    return productsToRender.map(product => (
      <KonfiguratorCard
        produktId={product.produktId}
        key={product.title}
        image={product.image}
        title={product.title}
        price={product.price}
        handleSelect={handleToppingSelect}
      />
    ));
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
      <p>
        Durch das Ausfüllen der Menge in der Produktkarte kannst Du den
        gewünschten Belag zur Konfiguration hinzufügen.
      </p>
      <SelectionContainer>{KonfiguratorCards()}</SelectionContainer>

      <NavigationIcon onClick={handleNext}>
        <Button className="black-color white-orange" onClick={handleNext}>
          Weiter
        </Button>
      </NavigationIcon>
    </Stage>
  );
};

export default ToppingsSelection;
