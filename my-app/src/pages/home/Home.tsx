import { Link } from "react-router-dom";
import { OrangeButton } from "../general/button";
import {
  Cooperation,
  Produktteaser,
  Image,
  ImageBox,
  Bg,
  Dunkel,
} from "./styles/Home.styles";
import fakeZeitung from "../.././img/Fake_Zeitung.webp";

const Home: React.FC = () => {
  return (
    <>
      <Bg>
        <Dunkel>
          <Produktteaser>
            <div>
              <h2>Stelle Dir Dein perfektes Frühstück zusammen</h2>
              <Link to="/Produkte">
                <OrangeButton caption={"Zu unseren Produkten"} />
              </Link>
            </div>
          </Produktteaser>

          <Cooperation>
            <div>
              <h1>Unsere Kooperation</h1>
              <ImageBox>
                <Image
                  src={fakeZeitung}
                  alt="LogoFakezeitung"
                  width={"150px"}
                  height={"150px"}
                />
              </ImageBox>
              <p>
                Wir haben seit 2001 eine Kooperation mit der Zeitungsfirma
                FakeZeitung.
                <br />
                Mit Hilfe der Zeitungsboten kommt Dein Frühstück zu Dir. Dadurch
                können wir kostengünstig und emissionsarm liefern!
              </p>
            </div>
          </Cooperation>
        </Dunkel>
      </Bg>
    </>
  );
};

export default Home;
