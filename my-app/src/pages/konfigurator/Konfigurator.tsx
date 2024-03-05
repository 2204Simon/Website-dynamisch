// Konfigurator.tsx
import React, { useState } from "react";
import BreadSelection from "./BreadSelection";
import ToppingsSelection from "./ToppingsSelection";
import ExtraSelection from "./ExtrasSelection";
import {
  AbschlussKonfigurator,
  NavigationIcon,
  SelectionContainer,
  Stage,
  StageHeader,
} from "./styles/Konfigurator.styles";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useLoggedIn } from "../../globalVariables/loggedin";
import { useNavigate } from "react-router-dom";
import { Button } from "../general/button.styles";
import { baseUrl } from "../../globalVariables/global";
import ReviewCard from "./Reviewcard";
import { sendPostRequest } from "../../serverFunctions/generelAPICalls";
import { useCookies } from "react-cookie";
import TextField from "@mui/material/TextField";
import { colors, formatNumber } from "../general/constants";
import FormLabel from "@mui/material/FormLabel";
import { FormInput } from "../kontakt/styles/Kontakt.styles";
import Container from "@mui/material/Container";
import { Trash } from "phosphor-react";
import {
  ContentContainer,
  ProductName,
  TotalPrice,
  RemoveButton,
} from "../bestellung/stylesBestellung/Warenkorb.styles";
import { alignProperty } from "@mui/material/styles/cssUtils";

export interface Ingredient {
  zutatsId: string;
  zutatBild: string;
  zutatsname: string;
  zutatspreis: number;
  zutatseinheit: string;
  zutatsmenge: number;
}

interface AusgewählteZutat {
  zutatsId: string;
  zutatenMenge: string;
}

const Konfigurator: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [selectedBread, setSelectedBread] = useState<Array<Ingredient>>([]);
  const [selectedToppings, setSelectedToppings] = useState<Array<Ingredient>>(
    []
  );
  const [cookies] = useCookies(["kundenId"]);
  const [selectedExtras, setSelectedExtras] = useState<Array<Ingredient>>([]);
  const [productName, setProductName] = useState("");
  const { loggedIn } = useLoggedIn();
  const navigate = useNavigate();
  const handleNextStage = (selectedProduct: Array<Ingredient>) => {
    setCurrentStage(currentStage + 1);

    switch (currentStage) {
      case 1:
        setSelectedBread(selectedProduct);
        break;
      case 2:
        setSelectedToppings(selectedProduct);
        break;
      case 3:
        setSelectedExtras(selectedProduct);
        break;
      default:
        break;
    }
  };

  const handlePrevStage = () => {
    setCurrentStage(currentStage - 1);
  };

  async function loadImage(path: string, zutatensparte: string) {
    let sparte = "";
    switch (zutatensparte) {
      case "Brot":
        sparte = `Breads`;
        break;
      case "Topping":
        sparte = `Toppings`;
        break;
      case "Extra":
        sparte = `Extras`;
        break;
    }
    const image = await import(`../../img/Ingredients/${sparte}/${path}`);
    return image.default; //Wegen ES6 mit default
  }

  async function addPersonalizedProduct(productName: string) {
    const allIngredients = selectedBread.concat(
      selectedExtras,
      selectedToppings
    );

    //Umformatierung Zutatenformat!
    let allFormattedIngredients = allIngredients.map(item => {
      return {
        zutatsId: item.zutatsId,
        zutatenMenge: item.zutatsmenge.toString(),
      };
    });

    console.log(allFormattedIngredients);

    const itemObjekt = {
      titel: productName,
      kundenId: cookies.kundenId,
      zutat: allFormattedIngredients,
    };
    console.log(itemObjekt);
    await sendPostRequest("/KundenProdukt", itemObjekt);
  }

  const calcPrice = (): number => {
    let price: any = 0;
    selectedBread.forEach(item => {
      price += item.zutatspreis * item.zutatsmenge;
    });
    selectedToppings.forEach(item => {
      price += item.zutatspreis * item.zutatsmenge;
    });
    selectedExtras.forEach(item => {
      price += item.zutatspreis * item.zutatsmenge;
    });
    return price.toFixed(2);
  };

  return (
    <div>
      {currentStage === 1 && loggedIn && (
        <BreadSelection onNextStage={handleNextStage} />
      )}
      {!loggedIn && (
        <div>
          <h1>
            Du musst dich anmelden, um dein perfektes Frühstück zu bestellen!
          </h1>
          <Button
            className="black-color white-orange"
            onClick={() => navigate("/LogIn")}
          >
            Zur Anmeldung
          </Button>
        </div>
      )}
      {currentStage === 2 && (
        <ToppingsSelection
          onNextStage={handleNextStage}
          onPrevStage={handlePrevStage}
        />
      )}
      {currentStage === 3 && (
        <ExtraSelection
          onPrevStage={handlePrevStage}
          onNextStage={handleNextStage}
        />
      )}
      {currentStage === 4 && (
        <div>
          <Stage>
            <StageHeader>
              <NavigationIcon onClick={handlePrevStage}>
                <ArrowBack />
              </NavigationIcon>
              Konfiguration
            </StageHeader>
            <h3>Das ist Deine fertige Konfiguration:</h3>
            <SelectionContainer>
              {selectedBread &&
                selectedBread.map(item => {
                  return ReviewCard(item);
                })}
              {selectedToppings &&
                selectedToppings.map(item => {
                  return ReviewCard(item);
                })}

              {selectedExtras &&
                selectedExtras.map(item => {
                  return ReviewCard(item);
                })}
            </SelectionContainer>

            <AbschlussKonfigurator>
              <div>
                <h2>Gesamtpreis: {calcPrice()} €</h2>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <p
                    style={{
                      textAlign: "center",
                      width: "50vh",
                    }}
                  >
                    Gib Deiner Konfiguration einen Namen, sodass Du diese unter
                    Deinen persönlichen Proukten sowie im Warenkorb wieder
                    findest.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "80vh",
                  }}
                >
                  <FormLabel>
                    Name der Konfiguration:
                    <FormInput
                      type="email"
                      value={productName}
                      onChange={event => setProductName(event.target.value)}
                      maxLength={50}
                      required
                    />
                  </FormLabel>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    className="black-color white-orange"
                    onClick={() => addPersonalizedProduct(productName)}
                  >
                    Produkt speichern
                  </Button>
                  <Button
                    className="black-color white-orange"
                    onClick={() => addPersonalizedProduct(productName)}
                    style={{ paddingTop: "10px" }}
                  >
                    Produkt speichern und zum Warenkorb hinzufügen
                  </Button>
                </div>
              </div>
            </AbschlussKonfigurator>
          </Stage>
        </div>
      )}
      ;
    </div>
  );
};

export default Konfigurator;

{
  /* {selectedToppings &&
            selectedExtras.map(item => {
              return (
                <>
                  <p> Bild: {item.zutatBild} </p>
                  <p> Produktname: {item.zutatsname}</p>
                  <p> Preis: {item.zutatspreis} €</p>
                  <p> Einheit: {item.zutatseinheit}</p>
                  <p> Menge: {item.zutatsmenge}</p>
                </>
              );
            })} */
}
