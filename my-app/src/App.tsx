import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/home/Home";
import Kontakt from "./pages/kontakt/Kontakt";
import Produkte from "./pages/produkte/Produkt";
import UnsereGeschichte from "./pages/unsereGeschichte/UnsereGeschichte";
import NoPage from "./pages/NoPage";
import Bestellung from "./pages/bestellung/Bestellung";
import "./App.css";
import Footer from "./pages/Footer";
import LoginForm from "./pages/logIn/LogIn";
import SignUp from "./pages/logIn/SignUp";
import ContactForm from "./pages/logIn/ContactForm";
import LogPage from "./pages/loggedIn/LoggedIn";
import { LoggedIn } from "./globalVariables/loggedin";

export default function App(): JSX.Element {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <div id="top">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="Produkte" element={<Produkte />} />
              <Route path="Bestellung" element={<Bestellung />} />
              <Route path="Unsere Geschichte" element={<UnsereGeschichte />} />
              <Route path="Kontakt" element={<Kontakt />} />
              <Route path="LogIn" element={<LoginForm />} />
              <Route path="SignUp" element={<SignUp />} />
              <Route path="contactForm" element={<ContactForm />} />
              {LoggedIn ? (
                <Route path="LoggedIn" element={<LogPage />} />
              ) : (
                <Route path="*" element={<NoPage />} />
              )}
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
}
