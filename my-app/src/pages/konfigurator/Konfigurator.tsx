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

export interface Ingredient {
  id: string;
  quantity: number;
}

export interface KonfiguratorCardProps {
  zutatsId: string;
  zutatBild: string;
  zutatsname: string;
  zutatspreis: number;
  zutatseinheit: string;
}

const Konfigurator: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [selectedBread, setSelectedBread] = useState<Array<Ingredient>>([]);
  const [selectedToppings, setSelectedToppings] = useState<Array<Ingredient>>(
    []
  );
  const [selectedExtras, setSelectedExtras] = useState<Array<Ingredient>>([]);
  const [bread, setbread] = useState<KonfiguratorCardProps>({
    zutatsId: "",
    zutatBild: "",
    zutatsname: "",
    zutatspreis: 0,
    zutatseinheit: "",
  }); // Hier speichern wir die vom Server geholten Toppings
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

  const loadBread = (id: string) => {
    fetch(`${baseUrl}/ZutatById/${id}`)
      .then(response => response.json())
      .then(zutat =>
        loadImage(zutat.zutatBild).then(image => ({
          ...zutat,
          zutatBild: image,
        }))
      )

      .then(product => {
        setbread(product);
      });
  };
  async function loadImage(path: string): Promise<string> {
    const image = await import(`../../img/Ingredients/Breads/${path}`);
    return image.default; //Wegen ES6 mit default
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

          {selectedBread.map(item => {
            loadBread(item.id);
            return (
              <ReviewCard
                produktId={bread.zutatsId}
                key={bread.zutatsId}
                image={bread.zutatBild}
                title={bread.zutatsname}
                price={bread.zutatspreis}
                type={bread.zutatseinheit}
                quantity={item.quantity}
              />
            );
          })}
          {selectedToppings.map(item => {
            return (
              <div>
                <h1>Topping</h1>
                <p>id: {item.id}</p>
                <p>Menge: {item.quantity}</p>
              </div>
            );
          })}
          {selectedExtras.map(item => {
            return (
              <div>
                <h1>Extra</h1>
                <p>id: {item.id}</p>
                <p>Menge: {item.quantity}</p>
              </div>
            );
          })}

          {!loggedIn && (
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
          )}
          {loggedIn && currentStage === 4 && (
            <Button className="black-color white-orange">
              Zum Warenkorb hinzufügen
            </Button>
          )}
        </div>
      )}
      ;
    </div>
  );
};

export default Konfigurator;
