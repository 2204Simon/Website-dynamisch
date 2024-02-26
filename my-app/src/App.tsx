import React, { Suspense, lazy } from "react";
import BottomNavBar from "./pages/BottomNavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/home/Home";
import Kontakt from "./pages/kontakt/Kontakt";
import Produkte from "./pages/produkte/Produkt";
import NoPage from "./pages/NoPage";
import Bestellung from "./pages/bestellung/WarenkorbSeite";
import "./App.css";
import Footer from "./pages/Footer";
import LoginForm from "./pages/logIn/LogIn";
import SignUp from "./pages/logIn/SignUp";
import DeinKonto from "./pages/loggedIn/DeinKonto";
import { LoggedInProvider } from "./globalVariables/loggedin"; // Import the LoggedInProvider component
import Impressum from "./pages/Impressum";
import Konzept from "./pages/konzept/Konzept";
import Konfigurator from "./pages/konfigurator/Konfigurator";
import { useCookies } from "react-cookie";
import { CookieBanner } from "./CookieBanner"; // Import the CookieBanner component
import EinzelBestellung from "./pages/loggedIn/einzelBestellung/einzelbestellung";
import { AdminPage } from "./pages/admin/AdminPage";
import { useSelector } from "react-redux";
import { UserDataState } from "./redux/types";
import { AdminRoute } from "./AdminRoute";

const DatenschutzerklaerungLazy = lazy(
  () => import("./pages/Datenschutzerklaerung")
);

export default function App(): JSX.Element {
  const [cookies, setCookie] = useCookies(["cookiesAccepted"]);
  const isAdmin = useSelector(
    (state: UserDataState) => state.LogInData?.istAdmin
  );
  console.log("isAdmin:", isAdmin); // Hier ist der console.log
  const handleAccept = () => {
    setCookie("cookiesAccepted", "true", { path: "/" });
  };

  const handleDecline = () => {
    setCookie("cookiesAccepted", "false", { path: "/" });
  };
  return (
    <React.StrictMode>
      <LoggedInProvider>
        {/* Wrap your routes in LoggedInProvider */}
        <BrowserRouter>
          {cookies.cookiesAccepted === undefined && (
            <CookieBanner onAccept={handleAccept} onDecline={handleDecline} />
          )}
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
              <Route path="Bestellung/:id" element={<EinzelBestellung />} />
              <Route path="Admin" element={<AdminRoute />} />
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
          {cookies.cookiesAccepted === true ? <BottomNavBar /> : ""}
        </BrowserRouter>
      </LoggedInProvider>
    </React.StrictMode>
  );
}
