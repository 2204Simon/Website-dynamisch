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
} from "./styles/Konfigurator.styles";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
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
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [flipped, setFlipped] = useState(false);
  const [displayNone, setDisplayNone] = useState(false);
  const handleFlip = () => {
    setFlipped(!flipped);
  };
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
    topping: string
  ) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setQuantities(prev => ({ ...prev, [topping]: value }));
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
    const selectedToppingsData = Object.keys(quantities)
      .filter(topping => quantities[topping] > 0)
      .map(topping => toppings.find(t => t.zutatsname === topping));

    if (selectedToppingsData.length > 0) {
      onNextStage(
        selectedToppingsData
          .map(toppingData => toppingData?.zutatsname)
          .join(", "),
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
                className={quantities[topping.zutatsname] > 0 ? "selected" : ""}
                onClick={() =>
                  handleToppingSelect(topping.zutatsname, topping.zutatBild)
                }
              >
                <ImageContainer>
                  <Image src={topping.zutatBild} alt={topping.zutatsname} />
                </ImageContainer>
                <Details>
                  <Title> {topping.zutatsname} </Title>
                  <Price> Preis: {topping.zutatspreis} € </Price>
                  <Quantity>
                    <>
                      <Label htmlFor={`quantity-${topping.zutatsname}`}>
                        Menge:
                      </Label>
                      <MinusQuantity
                        onClick={() => handleMinus(topping.zutatsname)}
                      >
                        <Minus color={colors.black}/>
                      </MinusQuantity>
                      <QuantityInput
                        type="text"
                        id={`quantity-${topping.zutatsname}`}
                        name={`quantity-${topping.zutatsname}`}
                        pattern="[0-9]*"
                        value={quantities[topping.zutatsname] || 0}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleQuantityChange(event, topping.zutatsname)}
                        inputMode="numeric"
                      />
                      <PlusQuantity
                        onClick={() => handlePlus(topping.zutatsname)}
                      >
                        <Plus color={colors.black}/>
                      </PlusQuantity>
                    </>
                  </Quantity>
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
