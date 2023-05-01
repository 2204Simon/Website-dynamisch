import React, { useEffect, useState } from "react";
import ShoppingCard from "./ShoppingCard";
import Logo from "../../img/Logo.webp";
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
  const ShoppingCardFood = () => (
    <div style={{ display: "flex", flexWrap: "nowrap" }}>
      <ShoppingCard title={"Baguette"} price={2.99} image={BaguetteAlone} />
      <ShoppingCard
        title={"Käsebaguette"}
        price={3.59}
        image={BaguetteYellow}
      />
      <ShoppingCard title={"Brezel"} price={1.49} image={Brezel} />
      <ShoppingCard title={"Türkisches Menemen"} price={7.99} image={Menemen} />
      <ShoppingCard title={"Brötchen"} price={1.29} image={Brötchen} />
      <ShoppingCard title={"Croissant"} price={1.79} image={Croissant} />
      <ShoppingCard
        title={"DB Fresh Chicken"}
        price={3.79}
        image={HamburgerBrötchen}
      />
      <ShoppingCard title={"Toast"} price={3.59} image={Toast} />
      <ShoppingCard
        title={"Toast mit Käse"}
        price={1.79}
        image={BelegtesBrötchen}
      />
      <ShoppingCard
        title={"Baguette mit Käse"}
        price={3.59}
        image={KäseBaguette}
      />
    </div>
  );
  const ShoppingCardTrinks = () => (
    <div style={{ display: "flex", flexWrap: "nowrap" }}>
      <ShoppingCard title={"Espresso"} price={1.99} image={Espresso} />
      <ShoppingCard title={"Kaffee"} price={5.99} image={Kaffee} />
      <ShoppingCard
        title={"Latte Machiatto"}
        price={5.99}
        image={LatteMachiatto}
      />
      <ShoppingCard title={"Orangensaft"} price={5.99} image={Orangensaft} />
      <ShoppingCard title={"Früchtetee"} price={5.99} image={Früchtetee} />
      <ShoppingCard title={"Wasser"} price={5.99} image={Wasser} />
      <ShoppingCard title={"Zitronentee"} price={5.99} image={Zitronentee} />
      <ShoppingCard
        title={"Heiße Schokolade"}
        price={5.99}
        image={HeißeSchokolade}
      />
    </div>
  );

  const ShoppingCardMenu = () => (
    <div style={{ display: "flex", flexWrap: "nowrap" }}>
      <ShoppingCard
        title={"Bayrisches Menü"}
        price={7.99}
        image={Bayrisches_Essen}
      />
      <ShoppingCard
        title={"Wecken mit Kaffee"}
        price={6.99}
        image={BrötchenMitKaffe}
      />
      <ShoppingCard title={"Obstmenü"} price={5.99} image={BrotEiTeeUndObst} />
      <ShoppingCard
        title={"Eiermenü"}
        price={5.99}
        image={EigetränkUndEierbrot}
      />
      <ShoppingCard
        title={"klassische Menü"}
        price={5.99}
        image={KaffeeMitEiUndBrot}
      />
      <ShoppingCard
        title={"Veggiemenü"}
        price={5.99}
        image={OSaftMitFrüchtebrot}
      />
      <ShoppingCard
        title={"Orangenmenü"}
        price={5.99}
        image={OSaftUndOrangenbrot}
      />
    </div>
  );

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
          <ShoppingCardFood />
        </div>
      ) : (
        <ScrollContainer scrollAmount={300}>
          <ShoppingCardFood />
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
          <ShoppingCardTrinks />
        </div>
      ) : (
        <ScrollContainer scrollAmount={300}>
          <ShoppingCardTrinks />
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
          <ShoppingCardMenu />
        </div>
      ) : (
        <ScrollContainer scrollAmount={300}>
          <ShoppingCardMenu />
        </ScrollContainer>
      )}
    </>
  );
}

export default Produkt;
