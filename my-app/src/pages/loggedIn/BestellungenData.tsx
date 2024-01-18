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
import { CRUDCardPText, CRUDCardWrappper } from "../admin/Admin.styles";
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
          `/Bestellungen/${cookies.kundenId}`
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

  return bestellungen.length === 0 ? (
    <></>
  ) : (
    <Container>
      <Card>
        <h1>Bestellungen</h1>
        <BestellungWrapper>
          {bestellungen.map(bestellung => {
            let deliverd = true;
            if (!bestellung.lieferDatum) {
              deliverd = false;
            }
            return (
              <CRUDCardWrappper
                key={bestellung.bestellungsId}
                onClick={() =>
                  navigate(`/bestellung/${bestellung.bestellungsId}`)
                }
              >
                {deliverd ? (
                  <div>
                    <Package size={50} />
                    <CRUDCardPText>geliefert am</CRUDCardPText>
                    <CRUDCardPText>
                      {bestellung.lieferDatum.toString()}
                    </CRUDCardPText>
                  </div>
                ) : (
                  <>
                    <Truck size={50} />
                    <CRUDCardPText>vorraussichtliche Lieferung</CRUDCardPText>
                    <CRUDCardPText>
                      {bestellung.gewünschtesLieferdatum.toString()}
                    </CRUDCardPText>
                  </>
                )}
              </CRUDCardWrappper>
            );
          })}
        </BestellungWrapper>
      </Card>
    </Container>
  );
}
