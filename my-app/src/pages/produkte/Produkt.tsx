import ShoppingCard from "./ShoppingCard";
import BaguetteAlone from "../../img/Food/BaguetteAlone.webp";
import BaguetteYellow from "../../img/Food/BaguetteGelb.webp";
import Brezel from "../../img/Food/Brezel.webp";
import Brötchen from "../../img/Food/Brötchen.webp";
import BrötchenMitKaffe from "../../img/Food/BötchenmitKaffee.webp";
import Croissant from "../../img/Food/Croissant.webp";
import HamburgerBrötchen from "../../img/Food/HamburgerBrötchen.webp";
import Toast from "../../img/Food/Toast.webp";
import BelegtesBrötchen from "../../img/Food/belegtesBrötchen.webp";
import KäseBaguette from "../../img/Food/käseBaguett.webp";
import Espresso from "../../img/Drinks/Espresso.webp";
import Früchtetee from "../../img/Drinks/Früchtetee.webp";
import Kaffee from "../../img/Drinks/Kaffee.webp";
import LatteMachiatto from "../../img/Drinks/Latte Machiatto.webp";
import Orangensaft from "../../img/Drinks/Orangensaft.webp";
import Wasser from "../../img/Drinks/Wasserglas.webp";
import Zitronentee from "../../img/Drinks/Zitronentee.webp";
import HeißeSchokolade from "../../img/Drinks/heißeSchokolade.webp";
import Bayrisches_Essen from "../../img/Food/bayrisches_Essen.webp";
import Menemen from "../../img/Food/Menemen.webp";
import BrotEiTeeUndObst from "../../img/Food/BrotEiTeeUndObst.webp";
import EigetränkUndEierbrot from "../../img/Food/EigetränkUndEierbrot.webp";
import KaffeeMitEiUndBrot from "../../img/Food/KaffeeMitEiUndBrot.webp";
import OSaftMitFrüchtebrot from "../../img/Food/OSaftMitFrüchtebrot.webp";
import OSaftUndOrangenbrot from "../../img/Food/OSaftUndOrangenbrot.webp";
import Osterfruehstueck from "../../img/Food/Osterfruehstueck.webp";
import ScrollContainer from "./Arrows";
import ShoppingCardNewspaper from "./ShoppingCardNewspaper";
import { useEffect, useState } from "react";

interface Product {
  titel: string;
  preis: number;
  bild: string;
  kundenId?: string;
  sparte: string;
}
function Produkt() {
  const isTouchpad = matchMedia("(pointer: coarse)").matches;
  const [products, setProducts] = useState<Array<Product>>([]);

  //const existSparte = (sparte: string): boolean => {
  //  return products.some(product => product.sparte === sparte);
  // };

  const loadProducts = async (): Promise<void> => {
    try {
      const request = await fetch(
        `http://localhost:3001/api/v1/generalProdukts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      ); // TODO http://localhost:3000/api/v1 austauschen mit Variablenname bsp. ${apiUrl}
      const product = await request.json();
      console.log(product);
      setProducts(product);
    } catch (error) {
      console.error(error);
      console.log("Fehler");
      setProducts([]);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const ShoppingCards = (sparte: string) => {
    return products
      .filter((product: Product) => product.sparte === sparte)
      .map((product: Product) => (
        <ShoppingCard
          image={product.bild}
          title={product.titel}
          price={product.preis}
          content={["ABC-Salat", "Buchstabensuppe"]}
          allergy={["Alles", "Nichts"]}
          veggie={true}
        />
      ));
  };

  return (
    <>
      <h2>Unsere Produkte</h2>
      <p>
        Nachfolgend findest Du unser reichliches Angebot an Speisen und
        Getränken, um Dir Dein perfektes Frühstück zusammenzustellen. Alle
        Produkte sind bio und klimaneutral hergestellt sowie geliefert. Wenn Du
        weitere Informationen zu deren Ursprüngen oder zu den Zutaten erhalten
        möchtest, helfen Dir gerne unsere Mitarbeiter:innen weiter!
      </p>

      <h3>Speisen</h3>

      {isTouchpad ? (
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {ShoppingCards("Food")}
        </div>
      ) : (
        <ScrollContainer scrollAmount={283}>
          {ShoppingCards("Food")}
        </ScrollContainer>
      )}

      <h3>Getränke</h3>
      {isTouchpad ? (
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {ShoppingCards("Drink")}
        </div>
      ) : (
        <ScrollContainer scrollAmount={283}>
          {ShoppingCards("Drink")}
        </ScrollContainer>
      )}

      <h3>Menüs</h3>
      {isTouchpad ? (
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {ShoppingCards("Menu")}
        </div>
      ) : (
        <ScrollContainer scrollAmount={283}>
          {ShoppingCards("Menu")}
        </ScrollContainer>
      )}
    </>
  );
}

export default Produkt;
