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
import DeinKonto from "./pages/loggedIn/DeinKonto";
import { LoggedInProvider } from "./globalVariables/loggedin"; // Import the LoggedInProvider component
import Impressum from "./pages/Impressum";
import Datenschutzerklaerung from "./pages/Datenschutzerklaerung";
import BottomNavBar from "./BottomNavBar";

export default function App(): JSX.Element {
  return (
    <React.StrictMode>
      <LoggedInProvider>
        {/* Wrap your routes in LoggedInProvider */}
        <BrowserRouter>
          <div id="top">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="Produkte" element={<Produkte />} />
                <Route path="Bestellung" element={<Bestellung />} />
                <Route
                  path="Unsere Geschichte"
                  element={<UnsereGeschichte />}
                />
                <Route path="Kontakt" element={<Kontakt />} />
                <Route path="LogIn" element={<LoginForm />} />
                <Route path="SignUp" element={<SignUp />} />
                <Route path="contactForm" element={<ContactForm />} />
                <Route path="LoggedIn" element={<DeinKonto />} />
                <Route path="Impressum" element={<Impressum />} />
                <Route
                  path="Datenschutzerklaerung"
                  element={<Datenschutzerklaerung />}
                />
                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
            <BottomNavBar /> {/* Add BottomNavBar component */}
            <Footer />
          </div>
        </BrowserRouter>
      </LoggedInProvider>
    </React.StrictMode>
  );
}
