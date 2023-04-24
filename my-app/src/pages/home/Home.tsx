import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import fakeZeitung from "../.././img/Fakezeitung_Logo.webp";
import Chatra from "./Chatra";

const Home = (): JSX.Element => {
  /*const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = (): void => {
      if (!hasScrolled && window.pageYOffset > 0) {
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return (): void => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  useEffect(() => {
    setHasScrolled(false);
  }, [location]);

  {
    console.log(
      window.location.href,
      window.location.href === "http://localhost:3000/"
    );
  }*/
  return (
    <div className="App">
      {/*hasScrolled &&*/ <Chatra />}
      <main className="DunklerHintergrund">
        <div className="Anfangssatz">
          <h2>Stelle dir dein perfektes Frühstück zusammen</h2>
          <div>
            <a href="Produkte.html">
              <button type="button">
                <span></span>Zu unseren Produkten
              </button>
            </a>
          </div>
        </div>
        <div className="parallax">
          <div className="parallax-content">
            <h1>Unsere Kooperation</h1>
            <img
              src={fakeZeitung}
              alt="Logo von FakeZeitung"
              width="200"
              height="200"
            />
            <p>
              Wir haben seit 2001 eine Kooperation mit der Zeitungsfirma
              FakeZeitung.
              <br />
              Mit Hilfe der Zeitungsboten kommt dein Frühstück zu dir. Dadurch
              können wir kostengünstig und emissionsarm liefern!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
