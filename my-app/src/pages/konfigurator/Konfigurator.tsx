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

interface A1 {
  id: string;
  quantity: number;
}


const Konfigurator: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [selectedBread, setSelectedBread] = useState<Array<A1>>([]);
  const [selectedToppings, setSelectedToppings] = useState<Array<A1>>([]);
  const [selectedDrink, setSelectedDrink] = useState<Array<A1>>([]);
  const { loggedIn } = useLoggedIn();
  const navigate = useNavigate();
  const handleNextStage = (selectedProduct: Array<A1>) => {
    setCurrentStage(currentStage + 1);

    switch (currentStage) {
      case 1:
        setSelectedBread(selectedProduct);
        break;
      case 2:
        setSelectedToppings(selectedProduct);
        break;
      case 3:
        setSelectedDrink(selectedProduct);
        break;
      default:
        break;
    }
  };

  const handlePrevStage = () => {
    setCurrentStage(currentStage - 1);
  };

  return (
    <div>
      {currentStage === 1 && 
        <BreadSelection 
          onNextStage={handleNextStage} 
          />}
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
          <>
            {selectedToppings.map((item) => {
                  return (<div>
                    <p>test</p>
                    <p>{item.id}</p>
                    <p>{item.quantity}</p></div>);
            })
          
          }
          </>
          <p>Ausgewählte Beläge: {selectedToppings.toString()}</p>
          <p>Ausgewähltes Getränk: {selectedDrink.toString()}</p>

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
            <Button
              className="black-color white-orange"
              onClick={() => navigate("/Bestellung")} //TODO anpassung an server senden/Warenkorb hinzufügen
            >
              Zum Warenkorb hinzufügen
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
export default Konfigurator;
