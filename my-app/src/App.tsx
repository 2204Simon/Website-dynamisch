import React, { Suspense, lazy } from "react";
import BottomNavBar from "./pages/BottomNavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/home/Home";
import Kontakt from "./pages/kontakt/Kontakt";
import Produkte from "./pages/produkte/Produkt";
import NoPage from "./pages/NoPage";
import Bestellung from "./pages/bestellung/Bestellung";
import "./App.css";
import Footer from "./pages/Footer";
import LoginForm from "./pages/logIn/LogIn";
import SignUp from "./pages/logIn/SignUp";
import DeinKonto from "./pages/loggedIn/DeinKonto";
import { LoggedInProvider } from "./globalVariables/loggedin"; // Import the LoggedInProvider component
import Impressum from "./pages/Impressum";
import Konzept from "./pages/konzept/Konzept";
import Konfigurator from "./pages/konfigurator/Konfigurator";
const DatenschutzerklaerungLazy = lazy(
  () => import("./pages/Datenschutzerklaerung")
);

export default function App(): JSX.Element {
  return (
    <React.StrictMode>
      <LoggedInProvider>
        {/* Wrap your routes in LoggedInProvider */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="Produkte" element={<Produkte />} />
              <Route path="Bestellung" element={<Bestellung />} />
              <Route path="Konzept" element={<Konzept />} />
              <Route path="Kontakt" element={<Kontakt />} />
              <Route path="LogIn" element={<LoginForm />} />
              <Route path="Konfigurator" element={<Konfigurator />} />
              <Route path="SignUp" element={<SignUp />} />
              <Route path="LoggedIn" element={<DeinKonto />} />
              <Route path="Impressum" element={<Impressum />} />
              <Route
                path="Datenschutzerklaerung"
                element={
                  <Suspense
                    fallback={
                      <div>Lädt die umfangreiche Datenschutzerklärung...</div>
                    }
                  >
                    <DatenschutzerklaerungLazy />
                  </Suspense>
                }
              />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
          <Footer />
          <BottomNavBar />
        </BrowserRouter>
      </LoggedInProvider>
    </React.StrictMode>
  );
}
