// Konfigurator.tsx
import React, { useState } from "react";
import BreadSelection from "./BreadSelection";
import ToppingsSelection from "./ToppingsSelection";
import ExtraSelection from "./ExtrasSelection";
import { NavigationIcon } from "./styles/Konfigurator.styles";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useLoggedIn } from "../../globalVariables/loggedin";
import { useNavigate } from "react-router-dom";
import { Button } from "../general/button.styles";
import { baseUrl } from "../../globalVariables/global";
import ReviewCard from "./Reviewcard";
import { sendPostRequest } from "../../serverFunctions/generelAPICalls";
import { useCookies } from "react-cookie";

export interface Ingredient {
  zutatsId: string;
  zutatenMenge: number;
}

export interface KonfiguratorCardProps {
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
  const [bread, setbread] = useState<KonfiguratorCardProps>({
    zutatsId: "",
    zutatBild: "",
    zutatsname: "",
    zutatspreis: 0,
    zutatseinheit: "",
    zutatsmenge: 0,
  }); // Hier speichern wir die vom Server geholten Toppings
  const [allIngredients, setallIngredients] = useState<Array<Ingredient>>([]);
  const [allDisplayedIngredients, setallDisplayedIngredients] = useState<
    Array<KonfiguratorCardProps>
  >([]);
  const [productName, setProductName] = useState("");
  const [cookied, useCookie] = useState(false); //TODO-Jonas: Cookie-Handling für KundenId
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
        // const allIngredients = selectedBread.concat(
        //   selectedExtras,
        //   selectedToppings
        // );
        // setallDisplayedIngredients(allIngredients);

        break;
      default:
        break;
    }
  };

  const handlePrevStage = () => {
    setCurrentStage(currentStage - 1);
  };

  // const loadAllSelectedIngredients = (id: string) => {

  //   fetch(`${baseUrl}/ZutatById/${id}`)
  //     .then(response => response.json())
  //     .then(zutat =>
  //       loadImage(zutat.zutatBild, zutat.zutatensparte).then(image => ({
  //         ...zutat,
  //         zutatBild: image,
  //       }))
  //     )
  //     .then(zutat => ({
  //       ...zutat,
  //       zutatsMenge: zutat.zutatenMenge,
  //     }))

  //     .then(zutat => {
  //       setallDisplayedIngredients(zutat);
  //     });

  //     .then(zutat => { return (
  //       <ReviewCard
  //         produktId={zutat.zutatsId}
  //         key={item.zutatsId}
  //         image={item.zutatBild}
  //         title={item.zutatsname}
  //         price={item.zutatspreis}
  //         type={item.zutatseinheit}
  //         quantity={item.zutatsmenge}
  //       />
  //     ); });
  // };
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
    const itemObjekt = {
      titel: productName,
      kundenId: cookies.kundenId,
      zutat: allIngredients,
    };
    console.log(itemObjekt);
    await sendPostRequest("/KundenProdukt", itemObjekt);
  }

  return (
    <div>
      {currentStage === 1 && <BreadSelection onNextStage={handleNextStage} />}
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
          <NavigationIcon onClick={handlePrevStage}>
            <ArrowBack />
          </NavigationIcon>
          <h2>Zusammenfassung</h2>
          <h1>Bread</h1>
          {selectedBread.map(item => {
            return (
              <div>
                <p>id: {item.zutatsId}</p>
                <p>Menge: {item.zutatenMenge}</p>
              </div>
            );
          })}
          <h1>Topping</h1>

          {selectedToppings.map(item => {
            return (
              <div>
                <p>id: {item.zutatsId}</p>
                <p>Menge: {item.zutatenMenge}</p>
              </div>
            );
          })}
          <h1>Extra</h1>

          {selectedExtras.map(item => {
            return (
              <div>
                <p>id: {item.zutatsId}</p>
                <p>Menge: {item.zutatenMenge}</p>
              </div>
            );
          })}

          {/* {!loggedIn && (
            <div>
              <h1>
                Du musst dich anmelden, um dein perfektes Frühstück zu
                bestellen!
              </h1>
              <Button
                className="black-color white-orange"
                onClick={() => navigate("/LogIn")}
              >
                Zur Anmeldung
              </Button>
            </div>
          )} loggedIn &&*/}
          {currentStage === 4 && (
            <div>
              {/* <Button
                className="black-color white-orange"
                onClick={() => loadAllSelectedIngredients()}
              >
                Auswahl laden
              </Button> */}
              <label htmlFor="productName">Produktname:</label>
              <input
                type="string"
                id="productName"
                name="productName"
                value={productName}
                onChange={event => setProductName(event.target.value)}
              />
              <Button
                className="black-color white-orange"
                onClick={() => addPersonalizedProduct(productName)}
              >
                Produkt speichern
              </Button>
            </div>
          )}
        </div>
      )}
      ;
    </div>
  );
};

export default Konfigurator;
