import { useEffect, useState } from "react";
import {
  Card,
  Container,
  LogoutButton,
  Paragraph,
  Title,
} from "./UserInformation.styles";
import { getRequest } from "../../serverFunctions/generelAPICalls";
import { KUNDEN_ID } from "../../globalVariables/global";
import { useCookies } from "react-cookie";
import { CustomToast } from "../general/toast.style";
import { BestellungsInformation } from "../../redux/types";
import {
  BestellungWrapper,
  MetaDataDiv,
  MetaDataItem,
  SingleBestellungWrapper,
} from "./Bestellungen.styles";
import { Package, Truck } from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";
export default function BestellungsData(): JSX.Element {
  const [cookies] = useCookies([KUNDEN_ID]);
  const [bestellungen, setBestellungen] = useState<
    Array<BestellungsInformation>
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverBestellungen = await getRequest(
          `Bestellungen/${cookies.kundenId}`
        );

        console.log(serverBestellungen);
        if (!serverBestellungen) {
          throw new Error("Keine Daten gefunden");
        }
        setBestellungen(serverBestellungen);
      } catch (error) {
        CustomToast.error("Fehler beim Laden der Daten");
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Card>
        <h1>Bestellungen</h1>
        <BestellungWrapper>
          {bestellungen.map(bestellung => {
            let deliverd = true;
            if (!bestellung.bestellDatum) {
              deliverd = false;
            }
            return (
              <SingleBestellungWrapper
                key={bestellung.bestellungsId}
                onClick={() =>
                  navigate(`/bestellung/${bestellung.bestellungsId}`)
                }
              >
                <MetaDataDiv>
                  <MetaDataItem>
                    {deliverd
                      ? `Bestellung: ${bestellung.bestellDatum}`
                      : `vorrausichtliche Lieferung: ${bestellung.gewünschtesLieferdatum}`}
                  </MetaDataItem>
                  <MetaDataItem>
                    Email: {bestellung.zahlungsinformation.email}
                  </MetaDataItem>
                  <MetaDataItem>Zahlungsmethode: "Paypal"</MetaDataItem>
                  <MetaDataItem>
                    Gesamtsumme: {bestellung.gesamtpreis}
                  </MetaDataItem>
                  <MetaDataItem>
                    Anzahl der Produkte:{" "}
                    {bestellung.produktInformationen
                      ? bestellung.produktInformationen.length
                      : 0}
                  </MetaDataItem>
                </MetaDataDiv>
                {deliverd ? <Package size={50} /> : <Truck size={50} />}
              </SingleBestellungWrapper>
            );
          })}
        </BestellungWrapper>
      </Card>
    </Container>
  );
}
