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

interface A1 {
  id: string;
  quantity: number;
}

const Konfigurator: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<Array<A1>>([]);
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [selectedBread, setSelectedBread] = useState<Array<A1>>([]);
  const [selectedToppings, setSelectedToppings] = useState<Array<A1>>([]);
  const [selectedExtras, setSelectedExtras] = useState<Array<A1>>([]);
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
        setSelectedExtras(selectedProduct);

        break;
      default:
        break;
    }
  };

  const handlePrevStage = () => {
    setCurrentStage(currentStage - 1);
  };

  // const addToCart = async () => {
  //   const zutatIdWithAmount = [
  //     ...selectedBread,
  //     ...selectedToppings,
  //     ...selectedDrink,
  //   ].map(item => ({
  //     zutatsId: item.id,
  //     zutatenMenge: item.quantity,
  //   }));

  //   const response = await fetch(`${baseUrl}/Zutatenposition`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       produktId: "87056000-c733-11ee-aee9-c5556ce2ed0f", // ProduktID muss noch angepasst werden
  //       zutatIdWithAmount,
  //     }),
  //   });

  //   if (!response.ok) {
  //     throw new Error("Failed to add to cart");
  //   }
  // };

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
          <>
            {selectedBread.map(item => {
              return (
                <div>
                  <h1>Bread</h1>
                  <p>id: {item.id}</p>
                  <p>Menge: {item.quantity}</p>
                </div>
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
            {/* {selectedIngredients.map(item => {
              selectedIngredients.concat(selectedBread, selectedToppings);

              return (
                <div>
                  <h1>INgredients</h1>
                  <p>id: {item.id}</p>
                  <p>Menge: {item.quantity}</p>
                </div>
              );
            })} */}
          </>
          {/* 
          <p>Ausgewählte Beläge: {selectedToppings.toString()}</p>
          <p>Ausgewähltes Getränk: {selectedExtras.toString()}</p> */}

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
              // onClick={() => {
              //   addToCart()
              //     .then(() => navigate("/Bestellung"))
              //     .catch(error => {
              //       // Handle error here
              //       console.error(error);
              //     });
              // }}
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
