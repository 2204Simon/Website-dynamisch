import { MagnifyingGlass, Pencil, Trash } from "phosphor-react";
import { Card, Paragraph, Title } from "../loggedIn/UserInformation.styles";
import { CRUDCardWrappper, CRUDCardsGridWrapper } from "./Admin.styles";
import { ScrollableYContainer } from "../loggedIn/Bestellungen.styles";
import { useState } from "react";
import { getRequest } from "../../serverFunctions/generelAPICalls";
import { ZutatApiType } from "../../redux/types";
import Warenkorb from "../bestellung/Warenkorb";
import { loadImage } from "../produkte/Produkt";

export default function ZutatenBlock() {
  const [optionalComponent, setOptionalComponent] =
    useState<JSX.Element | null>(null);
  async function getZutatenComponent() {
    console.log("muss noch implementiert werden");
    const zutaten: Array<ZutatApiType> = await getRequest("/zutat");
    const loadedZutaten = await Promise.all(
      zutaten.map((zutat: any) =>
        loadImage(zutat.zutatBild).then(image => ({
          ...zutat,
          zutatBild: image,
        }))
      )
    );
    setOptionalComponent(
      <>
        {loadedZutaten.map(zutat => (
          <Warenkorb
            key={zutat.zutatsId}
            image={zutat.zutatBild}
            price={zutat.zutatspreis}
            onRemove={() => console.log("removed")} // Item an handleRemoveItem übergeben
            productName={zutat.zutatsname}
            count={zutat.zutatspreis}
            editabel={true}
          />
        ))}
      </>
    );
  }

  async function putZutatenComponent() {
    setOptionalComponent(<p>put</p>);
  }
  async function deleteZutatenComponent() {
    setOptionalComponent(<p>delete</p>);
  }
  return (
    <Card>
      <Title>Zutaten</Title>

      <CRUDCardsGridWrapper>
        <CRUDCardWrappper onClick={() => getZutatenComponent()}>
          <MagnifyingGlass size={50} />
          <Paragraph>Zutaten suchen</Paragraph>
        </CRUDCardWrappper>
        <CRUDCardWrappper onClick={() => putZutatenComponent()}>
          <Pencil size={50} />
          <Paragraph>Zutaten bearbeiten</Paragraph>
        </CRUDCardWrappper>
        <CRUDCardWrappper onClick={() => deleteZutatenComponent()}>
          <Trash size={50} />
          <Paragraph>Zutaten löschen</Paragraph>
        </CRUDCardWrappper>
      </CRUDCardsGridWrapper>
      <div style={{ marginTop: "50px", width: "100%" }}>
        <ScrollableYContainer>{optionalComponent}</ScrollableYContainer>
      </div>
    </Card>
  );
}
