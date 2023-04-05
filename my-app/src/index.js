import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/home/Home";
import Kontakt from './pages/kontakt/Kontakt';
import Produkte from "./pages/produkte/Produkt";
import UnsereGeschichte from "./pages/unsereGeschichte/UnsereGeschichte";
import NoPage from "./pages/NoPage";
import Bestellung from "./pages/bestellung/Bestellung";
import './App.css';
import reportWebVitals from "./reportWebVitals";

export default function App() {
  return (
    <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Produkte" element={<Produkte />} />
          <Route path="Bestellung" element={<Bestellung />} />
          <Route path="Unsere Geschichte" element={<UnsereGeschichte />} />
          <Route path="Kontakt" element={<Kontakt />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
reportWebVitals();