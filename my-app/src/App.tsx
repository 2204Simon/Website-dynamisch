import React, { Suspense, lazy } from "react";
import BottomNavBar from "./pages/BottomNavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/home/Home";
import Kontakt from "./pages/kontakt/Kontakt";
import Produkte from "./pages/produkte/Produkt";
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
            <Route path="/beta/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/beta/Produkte" element={<Produkte />} />
              <Route path="/beta/Bestellung" element={<Bestellung />} />
              <Route path="/beta/Konzept" element={<Konzept />} />
              <Route path="/beta/Kontakt" element={<Kontakt />} />
              <Route path="/beta/LogIn" element={<LoginForm />} />
              <Route path="/beta/Konfigurator" element={<Konfigurator />} />
              <Route path="/beta/SignUp" element={<SignUp />} />
              <Route path="/beta/LoggedIn" element={<DeinKonto />} />
              <Route path="/beta/Impressum" element={<Impressum />} />
              <Route path="/beta/Bestellung/:id" element={<EinzelBestellung />} />
              <Route
                path="/beta/Admin/Bestellung/:id"
                element={<EinzelBestellung admin />}
              />
              <Route path="/beta/Admin" element={<AdminRoute />} />
              <Route
                path="/beta/Datenschutzerklaerung"
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
            </Route>
          </Routes>
          <Footer />
          {cookies.cookiesAccepted === true ? <BottomNavBar /> : ""}
        </BrowserRouter>
      </LoggedInProvider>
    </React.StrictMode>
  );
}
