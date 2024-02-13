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
  Image,
  ImageContainer,
  Container,
  Details,
  Title,
  Price,
  ContainerFront,
  Label,
  Unit,
} from "./styles/Konfigurator.styles";
import {
  ArrowBack,
  ArrowForward,
  RemoveShoppingCart,
} from "@mui/icons-material";
import { BlackColorButton } from "../general/button";
import {
  Quantity,
  MinusQuantity,
  QuantityInput,
  PlusQuantity,
} from "../produkte/styles/ShoppingCard.styles";
import { Minus, Plus } from "phosphor-react";
import { Button } from "../general/button.styles";
import { baseUrl } from "../../globalVariables/global";
import { colors } from "../general/constants";

interface Ingredient {
  id: string;
  quantity: number;
}
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
  const [toppings, setToppings] = useState<any[]>([]); // Hier speichern wir die vom Server geholten Toppings
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleMinus = (topping: string) => {
    setQuantities(prev => ({
      ...prev,
      [topping]: Math.max((prev[topping] || 1) - 1, 0),
    }));
  };

  const handlePlus = (topping: string) => {
    setQuantities(prev => ({ ...prev, [topping]: (prev[topping] || 0) + 1 }));
  };

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    toppingId: string
  ) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      // setQuantities(prev => ({ ...prev, [topping]: value }));
      setSelectedToppings([{ id: toppingId, quantity: value }]);
      return;
    }
  };
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

  const handleToppingSelect = (toppingID: string) => {
    //   const updatedToppings = selectedToppings.includes(toppingID)
    //     ? selectedToppings.filter(selected => selected !== toppingID)
    //     : [...selectedToppings, toppingID];
    const oldToppings = selectedToppings;
    oldToppings.push({ id: toppingID, quantity: 1 });
    setSelectedToppings(oldToppings);
  };

  async function loadImage(path: string): Promise<string> {
    const image = await import(`../../img/Ingredients/Toppings/${path}`);
    return image.default; //Wegen ES6 mit default
  }

  const handlePrev = () => {
    onPrevStage();
  };

  const handleNext = () => {
    // const selectedToppingsData = Object.keys(quantities)
    //   .filter(topping => quantities[topping] > 0)
    //   .map(topping => toppings.find(t => t.zutatsId === topping));

    // if (selectedToppingsData.length > 0) {
    onNextStage(
      selectedToppings
      // selectedToppingsData.map(toppingData => toppingData?.zutatsId)
      // .join(", "),
      /*   selectedToppingsData
          .map(toppingData => toppingData?.zutatBild || "")
          .join(", ")*/
    );
  };
  // };

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
      <SelectionContainer>
        {toppings.map(
          (
            topping // Anzeigen der Toppings aus dem State
          ) => (
            <Container flipped={false}>
              <ContainerFront
                flipped={false}
                displayNone={false}
                key={topping.zutatsId}
                // className={quantities[topping.zutatsId] > 0 ? "selected" : ""}

                className={
                  selectedToppings.some(
                    toppingObj => toppingObj.id === topping.zutatsId
                  )
                    ? "selected"
                    : ""
                }
                onClick={() => handleToppingSelect(topping.zutatsId)}
              >
                <ImageContainer>
                  <Image src={topping.zutatBild} alt={topping.zutatsname} />
                </ImageContainer>
                <Details>
                  <Title> {topping.zutatsname} </Title>
                  <Price> Preis: {topping.zutatspreis} € </Price>
                  <Unit> Einheit: {topping.zutatseinheit} </Unit>
                  {/* <Quantity>
                    <>
                      <Label htmlFor={`quantity-${topping.zutatsId}`}>
                        Menge:
                      </Label>
                      <MinusQuantity
                        onClick={() => handleMinus(topping.zutatsId)}
                      >
                        <Minus color={colors.black} />
                      </MinusQuantity>
                      <QuantityInput
                        type="text"
                        id={`quantity-${topping.zutatsId}`}
                        pattern="[0-9]*"
                        value={quantities[topping.zutatsId] || 0}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleQuantityChange(event, topping.zutatsId)}
                        inputMode="numeric"
                      />
                      <PlusQuantity
                        onClick={() => handlePlus(topping.zutatsId)}
                      >
                        <Plus color={colors.black} />
                      </PlusQuantity>
                    </> 
                  </Quantity>*/}
                </Details>
              </ContainerFront>
            </Container>
          )
        )}
      </SelectionContainer>
      {/*selectedToppings.length > 0 && (
        <div>
          <p>Ausgewählte Beläge: {selectedToppings.join(", ")}</p>
          <p>Bestätige die Auswahl mit dem Vorwärtspfeil</p>
        </div>
      )*/}

      <NavigationIcon onClick={handleNext}>
        <Button className="black-color white-orange" onClick={handleNext}>
          Weiter zum Getränk
        </Button>
      </NavigationIcon>
    </Stage>
  );
};

export default ToppingsSelection;
