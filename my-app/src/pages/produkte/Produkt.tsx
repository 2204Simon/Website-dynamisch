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
import Fußball from "../../img/Food/Fußball.webp";
import ScrollContainer from "./Arrows";

function Produkt() {
  const ShoppingCardsFood = [
    <ShoppingCard
      title={"Baguette"}
      price={2.99}
      image={BaguetteAlone}
      content={["Baguette aus Weizenmehl"]}
      allergy={["Glutenhaltig", "Erdnusserzeugnisse"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Käsebaguette"}
      price={3.59}
      image={BaguetteYellow}
      content={["Baguette aus Weizenmehl", "Limburger Käsebelag", "Butter"]}
      allergy={[
        "Glutenhaltig",
        "Eier und Eiererzeugnisse",
        "Erdnusserzeugnisse",
        "Lactosehaltig",
      ]}
      veggie={false}
    />,

    <ShoppingCard
      title={"Veganes Käsebaguette"}
      price={3.59}
      image={KäseBaguette}
      content={[
        "Baguette aus Weizenmehl",
        "veganer Käsebelag",
        "vegane Margarine",
      ]}
      allergy={["Glutenhaltig"]}
      veggie={true}
    />,

    <ShoppingCard
      title={"Brezel"}
      price={1.49}
      image={Brezel}
      content={["Brezel aus Weizenmehl"]}
      allergy={["Glutenhaltig", "Erdnusserzeugnisse"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Türkisches Menemen"}
      price={7.99}
      image={Menemen}
      content={["pochierte Eier", "würzige Tomaten-Paprika-Soße"]}
      allergy={[
        "Eier und Eiererzeugnisse",
        "Glutenhaltig",
        "Lactosehaltig",
        "Konservierungsstoffe",
      ]}
      veggie={false}
    />,
    <ShoppingCard
      title={"Brötchen"}
      price={1.29}
      image={Brötchen}
      content={["Brötchen aus Dinkelmehl"]}
      allergy={["Erdnusserzeugnisse"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Croissant"}
      price={1.79}
      image={Croissant}
      content={["Croissant aus Pflanzenfett"]}
      allergy={["Glutenhaltig"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Fresh Chicken"}
      price={3.79}
      image={HamburgerBrötchen}
      content={[
        "Brötchen aus Weizenmehl",
        "Emmentaler Käse",
        "Tomaten",
        "Salat",
        "Ei",
        "Hähnchenpatty",
        "Burgersoße",
      ]}
      allergy={["Glutenhaltig", "Eiprodukte", "Milchprodukte", "Senfprodukte"]}
      veggie={false}
    />,
    <ShoppingCard
      title={"Veganer Toast"}
      price={3.59}
      image={Toast}
      content={[
        "Toast aus Weizenmehl",
        "Tomaten",
        "Salat",
        "Gemüsepatty",
        "Burgersoße",
      ]}
      allergy={["Glutenhaltig", "Senfprodukte"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Toast mit Rinderpatty"}
      price={1.79}
      image={BelegtesBrötchen}
      content={[
        "Toast aus Weizenmehl",
        "Emmentaler Käse",
        "Tomaten",
        "Salat",
        "Patty aus Rindfleisch",
        "Burgersoße",
      ]}
      allergy={["Glutenhaltig", "Eiprodukte", "Milchprodukte", "Senfprodukte"]}
      veggie={false}
    />,
  ];
  const ShoppingCardsTrink = [
    <ShoppingCard
      title={"Espresso"}
      price={1.99}
      image={Espresso}
      content={["Espressobohnen aus Kolumbien", "filtriertes Wasser"]}
      allergy={["Koffeinhaltig"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Schwarzer Kaffee"}
      price={5.99}
      image={Kaffee}
      content={["Kaffeebohnen aus Brasilien", "filtriertes Wasser"]}
      allergy={["Koffeinhaltig"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Latte Machiatto"}
      price={5.99}
      image={LatteMachiatto}
      content={["Espressobohnen aus Kolumbien", "Frische Milch aus den Alpen"]}
      allergy={["Laktosehaltig", "Koffeinhaltig"]}
      veggie={false}
    />,
    <ShoppingCard
      title={"Orangensaft"}
      price={5.99}
      image={Orangensaft}
      content={["Bio-Organgen aus zertifizierten Fairtrade Anbau"]}
      allergy={["Konservierungsstoffe"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Früchtetee"}
      price={5.99}
      image={Früchtetee}
      content={["Waldbeerengeschmack", "filtriertes Wasser"]}
      allergy={[]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Wasser"}
      price={5.99}
      image={Wasser}
      content={[
        "Das filtrierte Mineralwasser stammt aus einer Quelle in den Alpen",
      ]}
      allergy={[]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Zitronentee"}
      price={5.99}
      image={Zitronentee}
      content={["Zitronengeschmack", "filtriertes Wasser"]}
      allergy={["Konservierungsstoffe", "Koffeinhaltig"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Heiße Schokolade"}
      price={5.99}
      image={HeißeSchokolade}
      content={[
        "geschmolzene schweizer Schokolade",
        "Frische Milch aus den Alpen",
      ]}
      allergy={["Milcherzeugnisse", "Lactosehaltig"]}
      veggie={false}
    />,
  ];

  const ShoppingCardsMenu = [
    <ShoppingCard
      title={"1. Liga FCH Aufstiegsbox"}
      price={5.99}
      image={Fußball}
      content={["Fußball Überaschungsbox"]}
      allergy={[
        "Laktosehaltig",
        "Koffeinhaltig",
        "Glutenhaltig",
        "Alkoholhaltig",
      ]}
      veggie={false}
    />,
    <ShoppingCard
      title={"Bayrisches Menü"}
      price={7.99}
      image={Bayrisches_Essen}
      content={["eine Flasche Helles", "ein Paar Weißwurst", "eine Breze"]}
      allergy={["Alkoholhaltig", "Glutenhaltig", "Hopfenhaltig"]}
      veggie={false}
    />,
    <ShoppingCard
      title={"Wecken mit Kaffee"}
      price={6.99}
      image={BrötchenMitKaffe}
      content={["Wecken aus Weizenmehl", "Kaffee mit Kaffeesahne"]}
      allergy={[
        "Glutenhaltig",
        "Koffeinhaltig",
        "Mlicherzeugnisse",
        "Lactosehaltig",
      ]}
      veggie={false}
    />,
    <ShoppingCard
      title={"Obstmenü"}
      price={5.99}
      image={BrotEiTeeUndObst}
      content={[
        "mit einem Spiegelei belegtes Brötchen",
        "Saisonfrüchte",
        "Früchtetee",
      ]}
      allergy={["Glutenhaltig", "Eiprodukte"]}
      veggie={false}
    />,
    <ShoppingCard
      title={"Eiermenü"}
      price={5.99}
      image={EigetränkUndEierbrot}
      content={[
        "mit einem Spiegelei belegtes Brötchen",
        "Eierlikör",
        "schwarzer Kaffee",
      ]}
      allergy={["Glutenhaltig", "Eiprodukte", "Koffeinhaltig"]}
      veggie={false}
    />,
    <ShoppingCard
      title={"Klassisches Menü"}
      price={5.99}
      image={KaffeeMitEiUndBrot}
      content={[
        "Baguettescheiben",
        "Spiegelei mit Bacon",
        "Kräuteraufstrich",
        "schwarzer Kaffee",
      ]}
      allergy={["Glutenhaltig", "Eiprodukte", "Koffeinhaltig"]}
      veggie={false}
    />,
    <ShoppingCard
      title={"Veggiemenü"}
      price={5.99}
      image={OSaftMitFrüchtebrot}
      content={[
        "Baguettescheiben",
        "veganer Pancake",
        "Saisonfrüchte",
        "Saisongemüse",
        "Orangensaft",
        "Zitronentee",
      ]}
      allergy={["Glutenhaltig", "Koffeinhaltig", "Erdnusshaltig"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Orangenmenü"}
      price={5.99}
      image={OSaftUndOrangenbrot}
      content={[
        "Orangenpie",
        "Orangenmarmelade",
        "Saisonfrüchte",
        "Zimt und Zucker",
      ]}
      allergy={["Glutenhaltig", "Zimthaltig"]}
      veggie={true}
    />,
  ];

  const isTouchpad = matchMedia("(pointer: coarse)").matches;

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
          {ShoppingCardsFood}
        </div>
      ) : (
        <ScrollContainer scrollAmount={283}>
          {ShoppingCardsFood}
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
          {ShoppingCardsTrink}
        </div>
      ) : (
        <ScrollContainer scrollAmount={283}>
          {ShoppingCardsTrink}
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
          {ShoppingCardsMenu}
        </div>
      ) : (
        <ScrollContainer scrollAmount={283}>
          {ShoppingCardsMenu}
        </ScrollContainer>
      )}
    </>
  );
}

export default Produkt;
