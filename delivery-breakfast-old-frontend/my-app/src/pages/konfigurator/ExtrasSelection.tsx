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
import { Ingredient } from "./Konfigurator";
import KonfiguratorCard from "./KonfiguratorCard";
import { CustomToast } from "../general/toast.style";

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

  const handleExtraSelect = (topping: any, quantity: number) => {
    const lclToppings = selectedExtras;
    const toppingId = lclToppings.findIndex(
      t => t.zutatsId === topping.zutatsId
    );

    if (quantity > 0) {
      // if (lclToppings.includes(topping)) {
      if (toppingId !== -1) {
        //Zutat existiert bereits im Auswahlarray
        lclToppings[toppingId] = {
          ...lclToppings[toppingId],
          zutatsmenge: lclToppings[toppingId].zutatsmenge + quantity,
        };
      } else {
        //Zutat existiert noch nicht im Auswahlarray
        lclToppings.push({
          zutatsId: topping.zutatsId,
          zutatBild: topping.zutatBild,
          zutatsname: topping.zutatsname,
          zutatspreis: topping.zutatspreis,
          zutatseinheit: topping.zutatseinheit,
          zutatsmenge: quantity,
        });
      }
      CustomToast.success(
        `Es wurde(n) ${quantity} ${topping.zutatseinheit} ${topping.zutatsname} hinzugefügt!`
      );
    } else {
      CustomToast.error(
        `Du musst mindestens eine Menge von 1 Einheit auswählen!`
      );
    }
  };

  const handlePrev = () => {
    onPrevStage();
  };

  const handleNext = () => {
    onNextStage(selectedExtras);
  };

  const KonfiguratorCards = () => {
    return extras.map(product => (
      <KonfiguratorCard topping={product} handleSelect={handleExtraSelect} />
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
          Zur Zusammenfassung
        </Button>
      </NavigationIcon>
    </Stage>
  );
};

export default ExtraSelection;
