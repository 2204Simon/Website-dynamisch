import React from "react";
import ShoppingCard from "./ShoppingCard";
import Logo from "../../img/Logo.webp";
import BaguetteAlone from "../../img/Food/BaguetteAlone.webp";
import BaguetteYellow from "../../img/Food/BaguetteGelb.jpg";
import Brezel from "../../img/Food/Brezel.webp";
import Brötchen from "../../img/Food/Brötchen.jpg";
import BrötchenMitKaffe from "../../img/Food/BötchenmitKaffee.jpg";
import Croissant from "../../img/Food/Croissant.jpg";
import HamburgerBrötchen from "../../img/Food/HamburgerBrötchen.webp";
import Toast from "../../img/Food/Toast.webp";
import BelegtesBrötchen from "../../img/Food/belegtesBrötchen.jpg";
import KäseBaguette from "../../img/Food/käseBaguett.jpg";
import Espresso from "../../img/Drinks/Espresso.jpg";
import Früchtetee from "../../img/Drinks/Früchtetee.jpg";
import Kaffee from "../../img/Drinks/Kaffee.jpg";
import LatteMachiatto from "../../img/Drinks/Latte Machiatto.jpg";
import Orangensaft from "../../img/Drinks/Orangensaft.jpg";
import Wasser from "../../img/Drinks/Wasserglas.jpg";
import Zitronentee from "../../img/Drinks/Zitronentee.jpg";
import HeißeSchokolade from "../../img/Drinks/heißeSchokolade.jpg";
import { ToastContainer } from "react-toastify";
import { colors } from "../general/constants";
import BrotEiTeeUndObst from "../../img/Food/BrotEiTeeUndObst.webp";
import EigetränkUndEierbrot from "../../img/Food/EigetränkUndEierbrot.webp";
import KaffeeMitEiUndBrot from "../../img/Food/KaffeeMitEiUndBrot.webp";
import OSaftMitFrüchtebrot from "../../img/Food/OSaftMitFrüchtebrot.webp";
import OSaftUndOrangenbrot from "../../img/Food/OSaftUndOrangenbrot.webp";
import ScrollContainer from "./Scroll";

function Produkt() {
  const showScrollContainer = window.innerWidth >= 1024;
  const isMaxWidth1024 = window.matchMedia("(max-width: 1024px)").matches;
  return (
    <>
      <h2 style={{ color: colors.black }}>Essen</h2>
      {showScrollContainer && !isMaxWidth1024 ? (
        <ScrollContainer scrollAmount={200}>
          <ShoppingCard title={"Baguette"} price={2.99} image={BaguetteAlone} />
          <ShoppingCard
            title={"Sandwich mit Käse"}
            price={3.59}
            image={BaguetteYellow}
          />
          <ShoppingCard title={"Brezel"} price={1.49} image={Brezel} />
          <ShoppingCard title={"Brötchen"} price={1.29} image={Brötchen} />
          <ShoppingCard title={"Croissant"} price={1.79} image={Croissant} />
          <ShoppingCard
            title={"Käsebrötchen"}
            price={3.79}
            image={HamburgerBrötchen}
          />
          <ShoppingCard title={"Toast"} price={3.59} image={Toast} />
          <ShoppingCard
            title={"Belegtes Brötchen"}
            price={1.79}
            image={BelegtesBrötchen}
          />
          <ShoppingCard
            title={"Baguette mit Käse"}
            price={3.59}
            image={KäseBaguette}
          />
        </ScrollContainer>
      ) : (
        <div
          style={{ display: "flex", flexWrap: "nowrap", overflowX: "scroll" }}
        >
          <ShoppingCard title={"Baguette"} price={2.99} image={BaguetteAlone} />
          <ShoppingCard
            title={"Sandwich mit Käse"}
            price={3.59}
            image={BaguetteYellow}
          />
          <ShoppingCard title={"Brezel"} price={1.49} image={Brezel} />
          <ShoppingCard title={"Brötchen"} price={1.29} image={Brötchen} />
          <ShoppingCard title={"Croissant"} price={1.79} image={Croissant} />
          <ShoppingCard
            title={"Käsebrötchen"}
            price={3.79}
            image={HamburgerBrötchen}
          />
          <ShoppingCard title={"Toast"} price={3.59} image={Toast} />
          <ShoppingCard
            title={"Belegtes Brötchen"}
            price={1.79}
            image={BelegtesBrötchen}
          />
          <ShoppingCard
            title={"Baguette mit Käse"}
            price={3.59}
            image={KäseBaguette}
          />
        </div>
      )}

      <h2 style={{ color: colors.black }}>Getränke</h2>
      <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "scroll" }}>
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

      <h2 style={{ color: colors.black }}>Menüs</h2>
      <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "scroll" }}>
        <ShoppingCard
          title={"Brötchen mit Kaffee"}
          price={5.99}
          image={BrötchenMitKaffe}
        />
        <ShoppingCard
          title={"Obstmenü"}
          price={5.99}
          image={BrotEiTeeUndObst}
        />
        <ShoppingCard
          title={"Eiermenü"}
          price={5.99}
          image={EigetränkUndEierbrot}
        />
        <ShoppingCard
          title={"Klassikermenü"}
          price={5.99}
          image={KaffeeMitEiUndBrot}
        />
        <ShoppingCard
          title={"Broccolimenü"}
          price={5.99}
          image={OSaftMitFrüchtebrot}
        />
        <ShoppingCard
          title={"Orangenmenü"}
          price={5.99}
          image={OSaftUndOrangenbrot}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default Produkt;
