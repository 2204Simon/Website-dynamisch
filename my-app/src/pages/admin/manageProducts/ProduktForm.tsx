// DrinkSelection.tsx
import React, { useState, useEffect } from "react";
import {
  Stage,
  StageHeader,
  NavigationIcon,
} from "../../konfigurator/styles/Konfigurator.styles";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button } from "../../general/button.styles";
import { baseUrl } from "../../../globalVariables/global";
import { Ingredient } from "../../konfigurator/Konfigurator";
import { ProduktCard } from "./CreateProductCard";
import { CustomToast } from "../../general/toast.style";
import { sendPostRequest } from "../../../serverFunctions/generelAPICalls";
import { useCookies } from "react-cookie";
import { FormLabel } from "@mui/material";
import { FormInput } from "../Admin.styles";
import { SelectionContainer } from "./manageProducts.styles";

const ZutatSelection: React.FC<any> = ({}) => {
  const [selectedExtras, setSelectedExtras] = useState<Array<Ingredient>>([]);
  const [extras, setExtras] = useState<any[]>([]); // Hier speichern wir die vom Server geholten Extras
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState<string>("");
  const [productPicture, setProductPicture] = useState<string>("");
  const [productSparte, setProductSparte] = useState<string>("");

  useEffect(() => {
    fetch(`${baseUrl}/zutat`)
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
        setExtras(extras);
        console.log("Fehler"); // Speichern der Daten im State
      })
      .catch(error => {
        console.log("Fehler");
        console.error("Error:", error);
      });
  }, []);

  async function loadImage(path: string): Promise<string> {
    // const image = await import(`../../img/Ingredients/Extras/${path}`);
    const image = await import(`../../../img/Logo.webp`);

    return image.default; //Wegen ES6 mit default
  }

  const handleExtraSelect = (topping: any, quantity: number) => {
    const lclToppings = selectedExtras;
    if (quantity > 0) {
      lclToppings.push({
        zutatsId: topping.zutatsId,
        zutatBild: topping.zutatBild,
        zutatsname: topping.zutatsname,
        zutatspreis: topping.zutatspreis,
        zutatseinheit: topping.zutatseinheit,
        zutatsmenge: quantity,
      });

      CustomToast.success(
        `Es wurde(n) ${quantity} ${topping.zutatseinheit} ${topping.zutatsname} hinzugefügt!`
      );
      console.log(lclToppings);
      setSelectedExtras(lclToppings);
    } else {
      CustomToast.error(
        `Du musst mindestens eine Menge von 1 Einheit auswählen!`
      );
    }
  };

  //   const handlePrev = () => {
  //     onPrevStage();
  //   };

  //   const handleNext = () => {
  //     onNextStage(selectedExtras);
  //   };

  const KonfiguratorCards = () => {
    return extras.map(product => (
      <ProduktCard topping={product} handleSelect={handleExtraSelect} />
    ));
  };

  async function createPersonalizedProduct(productName: string) {
    //Umformatierung Zutatenformat!
    let allFormattedIngredients = selectedExtras.map(item => {
      return {
        zutatsId: item.zutatsId,
        zutatenMenge: item.zutatsmenge.toString(),
      };
    });

    const itemObjekt = {
      titel: productName,
      kundenId: null,
      zutat: allFormattedIngredients,
      sparte: productSparte,
      bild: productPicture,
    };
    console.log(itemObjekt);
    let response = await sendPostRequest("/produkt", itemObjekt);
    setProductId(response);
    return response;
  }

  async function addPersonalizedProduct(productName: string) {
    if (selectedExtras.length > 0) {
      await createPersonalizedProduct(productName);
      CustomToast.success(
        `${productName} wurde gespeichert und kann unter Produkte eingesehen werden!`
      );
      setSelectedExtras([]);
    } else {
      CustomToast.error(`Du musst mindestens eine Zutat auswählen!`);
    }
  }

  return (
    <Stage>
      <StageHeader>Wähle die Zutaten</StageHeader>
      <p>
        Durch Anklicken der Produktkarte kannst Du die gewünschten Zutaten zum
        neuen Produkt hinzufügen.
      </p>

      <SelectionContainer>{KonfiguratorCards()}</SelectionContainer>

      <form
        onSubmit={event => {
          event.preventDefault();
          addPersonalizedProduct(productName);
          setProductName("");
          setProductSparte("");
          setProductPicture("");
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "80vh",
          }}
        >
          <FormLabel>
            <p>Dateiname des Bildes: (optional)</p>
            <FormInput
              type="string"
              value={productPicture}
              onChange={event => setProductPicture(event.target.value)}
              maxLength={50}
            />
          </FormLabel>
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
            <p>Name der Konfiguration:</p>
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
            width: "80vh",
          }}
        >
          <FormLabel>
            <p>
              Name der Sparte:
              <select
                value={productSparte}
                onChange={event => setProductSparte(event.target.value)}
                required
              >
                <option value="">Auswahl</option>
                <option value="Food">Speisen</option>
                <option value="Drink">Getränke</option>
              </select>
            </p>
          </FormLabel>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button className="black-color white-orange" type="submit">
            Produkt speichern
          </Button>
        </div>
      </form>
    </Stage>
  );
};

export default ZutatSelection;
