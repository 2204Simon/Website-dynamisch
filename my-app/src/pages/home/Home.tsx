import React from "react";
import { Link } from "react-router-dom";
import fakeZeitung from "../.././img/Fakezeitung_Logo.webp";
import Chatra from "./Chatra";
import { OrangeButton } from "../general/button";

const Home: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <Chatra />
      <main className="DunklerHintergrund">
        <div className="Anfangssatz">
          <h2>Stelle dir dein perfektes Frühstück zusammen</h2>
          <div>
            <Link to="/Produkte">
              <OrangeButton caption={"Zu unseren Produkten"}></OrangeButton>
            </Link>
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
