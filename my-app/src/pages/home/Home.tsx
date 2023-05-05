//import React from "react";
import { Link } from "react-router-dom";
import fakeZeitung from "../.././img/test1.webp";
import hintergrund_dunkel from "../.././img/Hintergrund_Croissant_verdunkelt.webp";
import { OrangeButton } from "../general/button";

// const Home: React.FC = (): JSX.Element => {
//   return (
//     <div className="App">
//       <Chatra />
//       <main className="DunklerHintergrund">
//         {/* <div className="Anfangssatz">  */}
//         <div>
//           <h2>Stelle Dir Dein perfektes Frühstück zusammen</h2>
//           <div>
//             <Link to="/Produkte">
//               <OrangeButton caption={"Zu unseren Produkten"}></OrangeButton>
//             </Link>
//           </div>
//         </div>
//         {/* <div className="parallax"> */}
//         <div>
//           {/* <div className="parallax-content"> */}

//             <h1>Unsere Kooperation</h1>
//             <img
//               src={fakeZeitung}
//               alt="Logo von FakeZeitung"
//               width="200"
//               height="200"
//             />
//             <p>
//               Wir haben seit 2001 eine Kooperation mit der Zeitungsfirma
//               FakeZeitung.
//               <br />
//               Mit Hilfe der Zeitungsboten kommt Dein Frühstück zu Dir. Dadurch
//               können wir kostengünstig und emissionsarm liefern!
//             </p>
// </div>
//           {/* </div>
//         </div> */}
//       </main>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import {
  Cooperation,
  Produktteaser,
  Image,
  ImageBox,
} from "./styles/Home.styles";

// Definiere ein Interface für die Konfiguration der Startseite
interface HomePageConfig {
  backgroundColor: string;
  textColor: string;
}

// Definiere die Standardkonfiguration
const defaultConfig: HomePageConfig = {
  backgroundColor: "white",
  textColor: "black",
};

// Definiere die Komponente für die Startseite
const Home: React.FC = () => {
  const [config, setConfig] = useState(defaultConfig);

  // Definiere die Funktion, die beim Scrollen aufgerufen wird
  const onScroll = () => {
    const body = document.querySelector("body");
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    const threshold = scrollHeight - windowHeight;
    const newConfig = getConfig(scrollTop, threshold);
    setConfig(newConfig);
  };

  // Definiere eine Funktion, um die Konfiguration basierend auf der Scroll-Position zu aktualisieren
  const getConfig = (scrollTop: number, threshold: number): HomePageConfig => {
    const progress = scrollTop / threshold;
    const backgroundColor = `rgb(${progress * 255}, ${progress * 255}, ${
      progress * 255
    })`;
    const textColor = `rgb(${255 - progress * 255}, ${255 - progress * 255}, ${
      255 - progress * 255
    })`;
    return {
      backgroundColor,
      textColor,
    };
  };

  useEffect(() => {
    // Füge den Event-Listener für das Scroll-Ereignis hinzu
    window.addEventListener("scroll", onScroll);
    // Entferne den Event-Listener beim Entladen der Komponente
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    
  

      <div
        style={{
          backgroundColor: config.backgroundColor,
          color: config.textColor,
        }}
      >

<ImageBox>
    <Image src={hintergrund_dunkel} alt="LogoFakezeitung" />
        {/* Hier kommt der Inhalt der Startseite */}

        <Produktteaser>
          <h2 style={{ color: config.textColor }}>
            Stelle Dir Dein perfektes Frühstück zusammen
          </h2>
          <Link to="/Produkte">
            {/* <LandingPageButton 
              caption={"Zu unseren Produkten"} 
              color={config.textColor}
              ></LandingPageButton> */}
            <OrangeButton caption={"Zu unseren Produkten"} />
          </Link>
        </Produktteaser>

        <Cooperation>
          <h1 style={{ color: config.textColor }}>Unsere Kooperation</h1>
          <ImageBox>
            <Image src={fakeZeitung} alt="LogoFakezeitung" />
          </ImageBox>

          <p style={{ color: config.textColor }}>
            Wir haben seit 2001 eine Kooperation mit der Zeitungsfirma
            FakeZeitung.
            <br />
            Mit Hilfe der Zeitungsboten kommt Dein Frühstück zu Dir. Dadurch
            können wir kostengünstig und emissionsarm liefern!
          </p>
        </Cooperation>

        </ImageBox>


      </div>
    </>
  );
};

export default Home;
