// DrinkSelection.tsx
import React, { useState, useEffect } from "react";
import {
  Stage,
  StageHeader,
  ProductImage,
  SelectionContainer,
  SelectionList,
  SelectionItem,
  NavigationIcon,
  Container,
  ContainerFront,
  ImageContainer,
  Image,
  Title,
  Price,
  Details,
  Label,
  Unit,
} from "./styles/Konfigurator.styles";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
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

interface A1 {
  id: string;
  quantity: number;
}


interface ExtrasSelectionProps {
  onPrevStage: () => void;
  onNextStage: (selectedExtra: Array<A1> ) => void;
}

const ExtraSelection: React.FC<ExtrasSelectionProps> = ({
  onPrevStage,
  onNextStage,
}) => {
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [extras, setExtras] = useState<any[]>([]); // Hier speichern wir die vom Server geholten Getränke
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [flipped, setFlipped] = useState(false);
  const [displayNone, setDisplayNone] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };
  const handleMinus = (extra: string) => {
    setQuantities(prev => ({
      ...prev,
      [extra]: Math.max((prev[extra] || 1) - 1, 0),
    }));
  };

  const handlePlus = (extra: string) => {
    setQuantities(prev => ({ ...prev, [extra]: (prev[extra] || 0) + 1 }));
  };

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    extra: string
  ) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setQuantities(prev => ({ ...prev, [extra]: value }));
    }
  };


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
        setExtras(extras); // Speichern der Daten im State
      })
      .catch(error => {
        console.log("Fehler");
        console.error("Error:", error);
      });
  }, []);

  const handleExtraSelect = (extraID: string) => {
    const updatedExtras = selectedExtras.includes(extraID)
    ? selectedExtras.filter(selected => selected !== extraID)
    : [...selectedExtras, extraID];

    setSelectedExtras(updatedExtras);
  };

  async function loadImage(path: string): Promise<string> {
    const image = await import(`../../img/Ingredients/Extras/${path}`);
    return image.default; //Wegen ES6 mit default
  }

  const handlePrev = () => {
    onPrevStage();
  };

  const handleNext = () => {
    const selectedExtrasData = Object.keys(quantities)
      .filter(extra => quantities[extra] > 0)
      .map(extra => extras.find(e => e.zutatsId === extra));

   // if (selectedExtrasData.length > 0) {
      onNextStage(
        selectedExtrasData
          .map(extraData => extraData?.zutatsId)
      /*    .join(", "),
        selectedExtrasData
          .map(extraData => extraData?.zutatBild || "")
          .join(", ")*/
      );
   // }
  };

  return (
    <Stage>
      <StageHeader>
        <NavigationIcon onClick={handlePrev}>
          <ArrowBack />
        </NavigationIcon>
        Wähle deine Beilage
        <NavigationIcon onClick={handleNext}>
          <ArrowForward />
        </NavigationIcon>
      </StageHeader>
      <p>
        Durch Anklicken der Produktkarte kannst Du die gewünschten Beilagen zur
        Konfiguration hinzufügen.
      </p>

      <SelectionContainer>
        {extras.map(
          (
            extra // Anzeigen der Toppings aus dem State
          ) => (
            <Container flipped={false}>
              <ContainerFront
                flipped={false}
                displayNone={false}
                key={extra.zutatsId}
                className={quantities[extra.zutatsId] > 0 ? "selected" : ""}
                onClick={() =>
                  handleExtraSelect(extra.zutatsId)
                }
              >
                <ImageContainer>
                  <Image src={extra.zutatBild} alt={extra.zutatsname} />
                </ImageContainer>
                <Details>
                  <Title> {extra.zutatsname} </Title>
                  <Price> Preis: {extra.zutatspreis} € </Price>
                  <Unit> Einheit: {extra.zutatseinheit} </Unit>
                  <Quantity>
                    <>
                      <Label htmlFor={`quantity-${extra.zutatsId}`}>
                        Menge:
                      </Label>
                      <MinusQuantity
                        onClick={() => handleMinus(extra.zutatsId)}
                      >
                        <Minus color={colors.black}/>
                      </MinusQuantity>
                      <QuantityInput
                        type="text"
                        id={`quantity-${extra.zuutatsId}`}
                        name={`quantity-${extra.zutatsId}`}
                        pattern="[0-9]*"
                        value={quantities[extra.zutatsId] || 0}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleQuantityChange(event, extra.zutatsId)}
                        inputMode="numeric"
                      />
                      <PlusQuantity
                        onClick={() => handlePlus(extra.zutatsId)}
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

      {/*selectedDrink && (
        <div>
          <p>Ausgewähltes Getränk: {selectedDrink}</p>
          <p>Bestätige die Auswahl mit dem Vorwärtspfeil</p>
        </div>
      )*/}
      <NavigationIcon onClick={handleNext}>
        <Button className="black-color white-orange" onClick={handleNext}>
          Weiter zur Zusammenfassung
        </Button>
      </NavigationIcon>
    </Stage>
  );
};

export default ExtraSelection;
