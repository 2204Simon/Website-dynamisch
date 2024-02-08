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
  Container,
  Details,
  ImageContainer,
  Price,
  Quantity,
  QuantityInput,
  Title,
  Image,
  PlusQuantity,
  MinusQuantity,
  ContainerBack,
  ContainerFront,
  Title2,
  Top,
  MiniH,
  ListContainer,
} from "./styles/Konfigurator.styles";
import { ArrowForward } from "@mui/icons-material";
import { CustomToast } from "../general/toast.style";
import { Button } from "../general/button.styles";
import { baseUrl } from "../../globalVariables/global";


interface A1 {
  id: string;
  quantity: number;
}

interface BreadSelectionProps {
  onNextStage: (breadselection: Array<A1>) => void;
}

const BreadSelection: React.FC<BreadSelectionProps> = ({ onNextStage }) => {
  const [selectedBread, setSelectedBread] = useState<Array<A1>> ([]); // Hier speichern wir das ausgewählte Brot
  const [breads, setBreads] = useState<any[]>([]); // Hier speichern wir die vom Server geholten Brote
  const [backendError, setBackendError] = useState(false);
  useEffect(() => {
    fetch(`${baseUrl}/zutat/Brot`)
      .then(response => response.json())
      .then(data =>
        Promise.all(
          data.map((bread: any) =>
            loadImage(bread.zutatBild).then(image => ({
              ...bread,
              zutatBild: image,
            })),
          )
        )
      )
      .then(breads => {
        setBreads(breads); // Speichern der Daten im State
      })
      .catch(error => {
        setBackendError(true);
        console.log("Fehler");
        console.error("Error:", error);
      });
  }, []);

  const handleBreadSelect = (breadID: string) => {
    setSelectedBread([{ id: breadID, quantity: 0 }]);
  };

  async function loadImage(path: string): Promise<string> {
    const image = await import(`../../img/Ingredients/Breads/${path}`);
    return image.default; //Wegen ES6 mit default
  }

  const handleNext = () => {
   // const selectedBreadData: { [key: string]: number }[] = Object.keys(selectedBread).map(key => ({ [key]: selectedBread[key] }));
      //.map(topping => selectedBread.find(t => t.zutatsId === topping));
    
    if (selectedBread) {
      onNextStage(selectedBread);
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

      <p>
        Durch Anklicken der Produktkarte kannst Du das gewünschte Brot zur
        Konfiguration hinzufügen.
      </p>
      {backendError && (
        <p>
          Die Brote konnten nicht geladen werden. Bitte wenden Sie sich an den
          Support.
        </p>
      )}
      <SelectionContainer>
        {breads.map(
          (
            bread // Anzeigen der Brote aus dem State
          ) => (
            console.log(bread),
            (
              <Container flipped={false}>
                <ContainerFront
                  flipped={false}
                  displayNone={false}
                  key={bread.zutatsId}
                  className={
                    selectedBread === bread.id ? "selected" : ""
                  }
                  onClick={() =>
                    handleBreadSelect(bread.zutatsId)
                  }
                >
                  <ImageContainer>
                    <Image src={bread.zutatBild} alt={bread.zutatsname} />
                  </ImageContainer>
                  <Details>
                    <Title>{bread.zutatsname}</Title>

                    <Price>Preis: {bread.zutatspreis} €</Price>
                  </Details>
                </ContainerFront>
              </Container>
            )
          )
        )}
      </SelectionContainer>

      <NavigationIcon onClick={handleNext}>
        <Button className="black-color white-orange" onClick={handleNext}>
          Weiter zum Belag
        </Button>
      </NavigationIcon>
    </Stage>
  );
};

/*


    /{selectedBread && (
        <div>
          <p>Ausgewähltes Produkt: {selectedBread}</p>
          <p>Bestätige die Auswahl mit dem Vorwärtspfeil</p>
        </div>
      )}



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
                  <ImageContainer>
                    <Image src={bread.zutatBild} alt={bread.zutatsname} />
                  </ImageContainer> 
                  {bread.zutatsname} <br />
                  {bread.zutatspreis} €{} <br />
                  {bread.zutatsID}
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
};*/

export default BreadSelection;
