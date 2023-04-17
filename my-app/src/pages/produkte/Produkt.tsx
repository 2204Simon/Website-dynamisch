import React from "react";
import ShoppingCard from "./ShoppingCard";
import Logo from "../../img/Logo.webp";
import { ToastContainer } from "react-toastify";
import { PushUp } from "../general/toast.style";
function Produkt() {
  return (
    <>
      <ToastContainer />
      <h2 style={{ color: "black" }}>Essen</h2>
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <ShoppingCard title={"TestProdukt"} price={5.99} image={Logo} />
        <ShoppingCard title={"TestProdukt2"} price={6.0} image={Logo} />
        <ShoppingCard title={"TestProdukt2"} price={5.99} image={Logo} />
        <ShoppingCard title={"TestProdukt2"} price={5.99} image={Logo} />
      </div>

      <h2 style={{ color: "black" }}>Getränke</h2>
      <div style={{ display: "flex" }}>
        <ShoppingCard title={"TestProdukt"} price={5.99} image={Logo} />
        <ShoppingCard title={"TestProdukt2"} price={5.99} image={Logo} />
        <ShoppingCard title={"TestProdukt2"} price={5.99} image={Logo} />
        <ShoppingCard title={"TestProdukt2"} price={5.99} image={Logo} />
      </div>

      <h2 style={{ color: "black" }}>Menüs</h2>
      <div style={{ display: "flex" }}>
        <ShoppingCard title={"TestProdukt"} price={5.99} image={Logo} />
        <ShoppingCard title={"TestProdukt2"} price={5.99} image={Logo} />
        <ShoppingCard title={"TestProdukt2"} price={5.99} image={Logo} />
        <ShoppingCard title={"TestProdukt2"} price={5.99} image={Logo} />
      </div>
    </>
  );
}

export default Produkt;
