// DrinkSelection.tsx
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
import { Ingredient, KonfiguratorCardProps } from "./Konfigurator";
import KonfiguratorCard from "./KonfiguratorCard";

interface ExtrasSelectionProps {
  onPrevStage: () => void;
  onNextStage: (selectedExtra: Array<Ingredient>) => void;
}

const ExtraSelection: React.FC<ExtrasSelectionProps> = ({
  onPrevStage,
  onNextStage,
}) => {
  const [selectedExtras, setSelectedExtras] = useState<Array<Ingredient>>([]);
  const [extras, setExtras] = useState<any[]>([]); // Hier speichern wir die vom Server geholten Extras

  useEffect(() => {
    fetch(`${baseUrl}/zutat/Extra`)
      .then(response => response.json())
      .then(data =>
        Promise.all(
          data.map((extras: any) =>
            loadImage(extras.zutatBild).then(image => ({
              ...extras,
              zutatBild: image,
            }))
          )
        )
      )
      .then(extras => {
        setExtras(extras);
        console.log("Fehler"); // Speichern der Daten im State
      })
      .catch(error => {
        console.log("Fehler");
        console.error("Error:", error);
      });
  }, []);

  async function loadImage(path: string): Promise<string> {
    const image = await import(`../../img/Ingredients/Extras/${path}`);
    return image.default; //Wegen ES6 mit default
  }

  const handleExtraSelect = (extraID: string, quantity: number) => {
    const lclToppings = selectedExtras;
    if (!lclToppings.some(extras => extras.id === extraID)) {
      lclToppings.push({ id: extraID, quantity: quantity });
    }
    setSelectedExtras(selectedExtras);
  };

  const handlePrev = () => {
    onPrevStage();
  };

  const handleNext = () => {
    onNextStage(selectedExtras);
  };

  const KonfiguratorCards = () => {
    const productsToRender = extras.map((product: KonfiguratorCardProps) => ({
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
        handleSelect={handleExtraSelect}
      />
    ));
  };

  return (
    <Stage>
      <StageHeader>
        <NavigationIcon onClick={handlePrev}>
          <ArrowBack />
        </NavigationIcon>
        Wähle deine Extras
        <NavigationIcon onClick={handleNext}>
          <ArrowForward />
        </NavigationIcon>
      </StageHeader>
      <p>
        Durch Anklicken der Produktkarte kannst Du die gewünschten Beilagen zur
        Konfiguration hinzufügen.
      </p>

      <SelectionContainer>{KonfiguratorCards()}</SelectionContainer>

      <NavigationIcon onClick={handleNext}>
        <Button className="black-color white-orange" onClick={handleNext}>
          Weiter zur Zusammenfassung
        </Button>
      </NavigationIcon>
    </Stage>
  );
};

export default ExtraSelection;
