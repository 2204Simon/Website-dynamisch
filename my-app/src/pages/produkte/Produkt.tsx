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
import StyledToastContainer from "../general/toast.style";

function Produkt() {
  return (
    <>
      <h2 style={{ color: "black" }}>Essen</h2>
      <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "scroll" }}>
        <ShoppingCard title={"Baguette"} price={2.99} image={BaguetteAlone} />
        <ShoppingCard
          title={"Baguette mit Käse"}
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

      <h2 style={{ color: "black" }}>Getränke</h2>
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

      <h2 style={{ color: "black" }}>Menüs</h2>
      <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "scroll" }}>
        <ShoppingCard
          title={"Brötchen mit Kaffee"}
          price={5.99}
          image={BrötchenMitKaffe}
        />
        <ShoppingCard title={"Menü2"} price={5.99} image={Logo} />
        <ShoppingCard title={"Menü3"} price={5.99} image={Logo} />
        <ShoppingCard title={"Menu4"} price={5.99} image={Logo} />
      </div>
      <StyledToastContainer />
    </>
  );
}

export default Produkt;
