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
import { BlackColorButton } from "../general/button";

interface BreadSelectionProps {
  onNextStage: (selectedProduct: string, selectedImage: string) => void;
}

const BreadSelection: React.FC<BreadSelectionProps> = ({ onNextStage }) => {
  const [selectedBread, setSelectedBread] = useState<string | null>(null);
  const [breads, setBreads] = useState<any[]>([]); // Hier speichern wir die vom Server geholten Brote
  const [backendError, setBackendError] = useState(false);
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
        setBackendError(true);
        console.log("Fehler");
        console.error("Error:", error);
      });
  }, []);

  const handleBreadSelect = (breadType: string, image: string) => {
    setSelectedBread(breadType);
  };

  async function loadImage(path: string): Promise<string> {
    const image = await import(`../../img/Ingredients/Breads/${path}`);
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
                  <Title style={{ paddingLeft: "0px" }}>
                    {" "}
                    {bread.zutatsname}
                  </Title>
                  <br />
                  <Price>Preis: {bread.zutatspreis} €</Price> <br />
                  <p>Durch Anklicken zur Konfiguration hinzufügen</p>
                </SelectionItem>
              </Container>
            )
          )
        )}
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

/*return (
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
