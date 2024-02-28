import { MagnifyingGlass, Pencil, Trash } from "phosphor-react";
import { Card, Paragraph, Title } from "../loggedIn/UserInformation.styles";
import { CRUDCardWrappper, CRUDCardsGridWrapper } from "./Admin.styles";
import { ScrollableYContainer } from "../loggedIn/Bestellungen.styles";
import { useState } from "react";
import { getRequest } from "../../serverFunctions/generelAPICalls";
import { BestellungsInformation, ZutatApiType } from "../../redux/types";

export default function AdminBestellungsblock() {
  const [optionalComponent, setOptionalComponent] =
    useState<JSX.Element | null>(null);
  async function getAllBestellungenComponent() {
    console.log("muss noch implementiert werden");
    const bestellungen: Array<BestellungsInformation> = await getRequest(
      "/admin/todayDeliveries"
    );
    console.log(bestellungen);

    setOptionalComponent(
      <>
        <p>get bestellung muss noch implementiert werden</p>
      </>
    );
  }
  async function getBestellungsLieferungComponent() {
    setOptionalComponent(<p>alle heutigen Bestellungen</p>);
  }
  async function putBestellungsLieferungComponent() {
    setOptionalComponent(<p>Bestellung abschließen</p>);
  }
  async function deleteBestellungComponent() {
    setOptionalComponent(<p>delete</p>);
  }
  return (
    <Card>
      <Title>Bestellung</Title>

      <CRUDCardsGridWrapper>
        <CRUDCardWrappper onClick={() => getAllBestellungenComponent()}>
          <MagnifyingGlass size={50} />
          <Paragraph>Alle Bestellungen suchen</Paragraph>
        </CRUDCardWrappper>
        <CRUDCardWrappper onClick={() => getBestellungsLieferungComponent()}>
          <MagnifyingGlass size={50} />
          <Paragraph>heutige Lieferungen suchen</Paragraph>
        </CRUDCardWrappper>
        <CRUDCardWrappper onClick={() => putBestellungsLieferungComponent()}>
          <Pencil size={50} />
          <Paragraph>Bestellung abschließen</Paragraph>
        </CRUDCardWrappper>
        <CRUDCardWrappper onClick={() => deleteBestellungComponent()}>
          <Trash size={50} />
          <Paragraph>Bestellung löschen</Paragraph>
        </CRUDCardWrappper>
      </CRUDCardsGridWrapper>
      <div style={{ marginTop: "50px" }}>
        <ScrollableYContainer>{optionalComponent}</ScrollableYContainer>
      </div>
    </Card>
  );
}
