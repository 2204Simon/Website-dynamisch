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
import { ArrowBack } from "@mui/icons-material";
import { useLoggedIn } from "../../globalVariables/loggedin";
import { useNavigate } from "react-router-dom";
import { Button } from "../general/button.styles";
import ReviewCard from "./Reviewcard";
import { sendPostRequest } from "../../serverFunctions/generelAPICalls";
import { useCookies } from "react-cookie";
import FormLabel from "@mui/material/FormLabel";
import { FormInput } from "../kontakt/styles/Kontakt.styles";
import { CustomToast } from "../general/toast.style";

export interface Ingredient {
  zutatsId: string;
  zutatBild: string;
  zutatsname: string;
  zutatspreis: number;
  zutatseinheit: string;
  zutatsmenge: number;
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
  const [productId, setProductId] = useState<string>("");
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

  async function createPersonalizedProduct(productName: string) {
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

    const itemObjekt = {
      titel: productName,
      kundenId: cookies.kundenId,
      zutat: allFormattedIngredients,
    };
    console.log(itemObjekt);
    let response = await sendPostRequest("/KundenProdukt", itemObjekt);
    setProductId(response);
    return response;
  }

  async function addPersonalizedProduct(productName: string) {
    await createPersonalizedProduct(productName);
    CustomToast.success(
      `${productName} wurde gespeichert und kann unter Produkte eingesehen werden!`
    );
    navigate("/Produkte");
  }

  async function addPersonalizedProductToBasket(productName: string) {
    const id = await createPersonalizedProduct(productName);
    await handleAddToCart(id, productName);
    navigate("/Bestellung");
  }

  const handleAddToCart = async (productId: string, productName: string) => {
    try {
      const itemObjekt = {
        produktId: productId,
        produktMenge: 1,
        kundenId: cookies.kundenId,
      };
      console.log(itemObjekt);
      await sendPostRequest("/warenkorb", itemObjekt);
      CustomToast.success(`${productName} wurde zum Warenkorb hinzugefügt!`);
    } catch (error) {
      CustomToast.error("Fehler hinzufügen (Serververbindung))");
    }
  };

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h2>
            Du musst dich anmelden, um dein perfektes Frühstück zu
            konfigurieren!
          </h2>
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
            <h3>Das ist deine fertige Konfiguration:</h3>
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
                      type="string"
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
                    onClick={() => addPersonalizedProductToBasket(productName)}
                    style={{ paddingTop: "10px" }}
                  >
                    Zum Warenkorb hinzufügen
                  </Button>
                </div>
              </div>
            </AbschlussKonfigurator>
          </Stage>
        </div>
      )}
    </div>
  );
};

export default Konfigurator;
