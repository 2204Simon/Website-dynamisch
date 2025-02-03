import { MagnifyingGlass, Pencil, Trash, X } from "phosphor-react";
import { Card, Paragraph, Title } from "../loggedIn/UserInformation.styles";
import { CRUDCardWrappper, CRUDCardsGridWrapper } from "./Admin.styles";
import { ScrollableYContainer } from "../loggedIn/Bestellungen.styles";
import { useState } from "react";
import { getRequest } from "../../serverFunctions/generelAPICalls";
import { BestellungsInformation } from "../../redux/types";
import DeliverToday from "./DeliverToday";
import BestellungToSpecificDate from "./BestellungToSpecificDate";
import { colors } from "../general/constants";

export default function AdminBestellungsblock() {
  const [optionalComponent, setOptionalComponent] =
    useState<JSX.Element | null>(null);
  async function getAllBestellungenComponent() {
    console.log("muss noch implementiert werden");
    const bestellungen: Array<BestellungsInformation> = await getRequest(
      "/admin/todayDeliveries"
    );
    console.log(bestellungen);

    setOptionalComponent(<BestellungToSpecificDate />);
  }
  async function getBestellungsLieferungComponent() {
    setOptionalComponent(<DeliverToday />);
  }
  return (
    <Card>
      <Title>Bestellung</Title>

      <CRUDCardsGridWrapper>
        <CRUDCardWrappper onClick={() => getAllBestellungenComponent()}>
          <MagnifyingGlass size={50} style={{ color: colors.black }} />
          <Paragraph>Alle Bestellungen suchen</Paragraph>
        </CRUDCardWrappper>
        <CRUDCardWrappper onClick={() => getBestellungsLieferungComponent()}>
          <MagnifyingGlass size={50} style={{ color: colors.black }} />
          <Paragraph>heutige Lieferungen suchen und liefern</Paragraph>
        </CRUDCardWrappper>
      </CRUDCardsGridWrapper>
      <div
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ marginTop: "50px", width: "100%" }}>
          <ScrollableYContainer style={{ width: "100%" }}>
            {optionalComponent}
          </ScrollableYContainer>
        </div>
        {optionalComponent && (
          <X
            size={40}
            cursor={"pointer"}
            onClick={() => setOptionalComponent(null)}
            style={{ color: colors.black }}
          />
        )}
      </div>
    </Card>
  );
}
