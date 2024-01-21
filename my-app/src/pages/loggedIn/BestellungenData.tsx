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
  ScrollableYContainer,
  MetaDataDiv,
  MetaDataItem,
  SingleBestellungWrapper,
} from "./Bestellungen.styles";
import { Package, Truck } from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";
import {
  CRUDCardPText,
  CRUDCardWrappper,
  CRUDCardsGridWrapper,
} from "../admin/Admin.styles";
import { formatGermanDate } from "../../DateUtils";
import { BlackButton, OrangeButton } from "../general/button";
import { Button } from "../general/button.styles";
export default function BestellungsData(): JSX.Element {
  const [cookies] = useCookies([KUNDEN_ID]);
  const [bestellungen, setBestellungen] =
    useState<Array<BestellungsInformation> | null>([]);

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
        if (error instanceof Error && error.message === "404") {
          setBestellungen(null);
          return;
        }
        CustomToast.error("Fehler beim Laden der Daten");
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Card>
        <Title>Bestellungen</Title>
        {bestellungen === null ? (
          <Card>
            <Title>Du hast noch keine Bestellungen</Title>
            <Paragraph>Jonas nen Guten spruch bitte ;)</Paragraph>
            <Link to="/Produkte">
              <Button className="black-color white-orange ">
                Zu unseren Produkten
              </Button>
            </Link>
          </Card>
        ) : (
          <ScrollableYContainer>
            <CRUDCardsGridWrapper>
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
                          {formatGermanDate(bestellung.lieferDatum.toString())}
                        </CRUDCardPText>
                      </div>
                    ) : (
                      <>
                        <Truck size={50} />
                        <CRUDCardPText>
                          vorraussichtliche Lieferung
                        </CRUDCardPText>
                        <CRUDCardPText>
                          {formatGermanDate(
                            bestellung.gewünschtesLieferdatum.toString()
                          )}
                        </CRUDCardPText>
                      </>
                    )}
                  </CRUDCardWrappper>
                );
              })}
            </CRUDCardsGridWrapper>
          </ScrollableYContainer>
        )}
      </Card>
    </Container>
  );
}
