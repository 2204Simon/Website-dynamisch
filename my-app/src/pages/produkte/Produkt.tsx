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
import ScrollContainer from "./Arrows";

function Produkt() {
  const ShoppingCardsFood = [
    <ShoppingCard
      title={"Baguette"}
      price={2.99}
      image={BaguetteAlone}
      content={["Inhalt 1", "Inhalt 2"]}
      allergy={[
        "Allergie 1",
        "Allergie 2 BlaBlaBlaBlaBlaBl a BlaBlaBlaBla BlaBlaBlaBlaBlaBla BlaBlaBlaBlaBlaBla BlaBlaBlaBlaBlaBla BlaBlaBlaBlaBlaBlaBlaBla",
      ]}
      veggie={false}
    />,
    <ShoppingCard
      title={"Käsebaguette"}
      price={3.59}
      image={BaguetteYellow}
      content={["Inhalt 1"]}
      allergy={[]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Brezel"}
      price={1.49}
      image={Brezel}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Türkisches Menemen"}
      price={7.99}
      image={Menemen}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Brötchen"}
      price={1.29}
      image={Brötchen}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Croissant"}
      price={1.79}
      image={Croissant}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"DB Fresh Chicken"}
      price={3.79}
      image={HamburgerBrötchen}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Toast"}
      price={3.59}
      image={Toast}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Toast mit Käse"}
      price={1.79}
      image={BelegtesBrötchen}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Baguette mit Käse"}
      price={3.59}
      image={KäseBaguette}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
  ];
  const ShoppingCardsTrink = [
    <ShoppingCard
      title={"Espresso"}
      price={1.99}
      image={Espresso}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Kaffee"}
      price={5.99}
      image={Kaffee}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Latte Machiatto"}
      price={5.99}
      image={LatteMachiatto}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Orangensaft"}
      price={5.99}
      image={Orangensaft}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Früchtetee"}
      price={5.99}
      image={Früchtetee}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Wasser"}
      price={5.99}
      image={Wasser}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Zitronentee"}
      price={5.99}
      image={Zitronentee}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Heiße Schokolade"}
      price={5.99}
      image={HeißeSchokolade}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
  ];

  const ShoppingCardsMenu = [
    <ShoppingCard
      title={"Bayrisches Menü"}
      price={7.99}
      image={Bayrisches_Essen}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Wecken mit Kaffee"}
      price={6.99}
      image={BrötchenMitKaffe}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Obstmenü"}
      price={5.99}
      image={BrotEiTeeUndObst}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Eiermenü"}
      price={5.99}
      image={EigetränkUndEierbrot}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"klassische Menü"}
      price={5.99}
      image={KaffeeMitEiUndBrot}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Veggiemenü"}
      price={5.99}
      image={OSaftMitFrüchtebrot}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
      veggie={true}
    />,
    <ShoppingCard
      title={"Orangenmenü"}
      price={5.99}
      image={OSaftUndOrangenbrot}
      content={["Inhalt 1", "Inhalt 2", "Inhalt 3"]}
      allergy={["Allergie 1", "Allergie 2", "Allergie 3"]}
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
