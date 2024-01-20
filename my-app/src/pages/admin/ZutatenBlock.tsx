import { MagnifyingGlass, Pencil, Plus, Trash, X } from "phosphor-react";
import { Card, Paragraph, Title } from "../loggedIn/UserInformation.styles";
import { CRUDCardWrappper, CRUDCardsGridWrapper } from "./Admin.styles";
import { ScrollableYContainer } from "../loggedIn/Bestellungen.styles";
import { useState } from "react";
import { getRequest } from "../../serverFunctions/generelAPICalls";
import { ZutatApiType } from "../../redux/types";
import Warenkorb from "../bestellung/Warenkorb";
import { loadImage } from "../produkte/Produkt";
import { AdminList } from "./AdminList";
import { Zutatsform } from "./ZutatsForm";
import { FaCross } from "react-icons/fa";
export default function ZutatenBlock() {
  const [optionalComponent, setOptionalComponent] =
    useState<JSX.Element | null>(null);

  function handleEditChange(zuatat: ZutatApiType) {
    console.log("muss noch implementiert werden");
    setOptionalComponent(<p>Abfrage muss noch implementiert werden</p>);
  }

  async function getZutatenComponent() {
    console.log("muss noch implementiert werden");
    const zutaten: Array<ZutatApiType> = await getRequest("/zutat");
    const loadedZutaten: Array<ZutatApiType> = await Promise.all(
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
          <AdminList
            key={zutat.zutatsId}
            editable
            deletable
            onEdit={() => zutatsPutKomponent(zutat)}
            onRemove={() => deleteZutatenComponent()} // Item an handleRemoveItem übergeben
            children={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {/* <Paragraph>{zutat.zutatsId}</Paragraph> */}
                <Paragraph>{zutat.zutatsname}</Paragraph>
                <Paragraph>{zutat.zutatensparte}</Paragraph>
                <Paragraph>{zutat.zutatseigenschaft}</Paragraph>
                <Paragraph>{zutat.zutatspreis}</Paragraph>
                <Paragraph>{zutat.zutatseinheit}</Paragraph>
              </div>
            }
          />
        ))}
      </>
    );
  }

  async function zutatsPutKomponent(zutat?: ZutatApiType) {
    setOptionalComponent(
      <Zutatsform
        onSubmit={handleEditChange}
        defaultValue={zutat}
        newZutat={false}
      />
    );
  }

  async function zutatsPostKomponent() {
    setOptionalComponent(
      <Zutatsform onSubmit={handleEditChange} newZutat={true} />
    );
  }

  async function deleteZutatenComponent() {
    setOptionalComponent(<p> Muss noch implementiert werden</p>);
  }
  return (
    <Card>
      <Title>Zutaten</Title>

      <CRUDCardsGridWrapper>
        <CRUDCardWrappper onClick={() => getZutatenComponent()}>
          <MagnifyingGlass size={50} />
          <Paragraph>Zutaten suchen</Paragraph>
        </CRUDCardWrappper>
        <CRUDCardWrappper onClick={() => zutatsPutKomponent()}>
          <Pencil size={50} />
          <Paragraph>Zutaten bearbeiten</Paragraph>
        </CRUDCardWrappper>
        <CRUDCardWrappper onClick={() => zutatsPostKomponent()}>
          <Plus size={50} />
          <Paragraph>Zutaten hinzufügen</Paragraph>
        </CRUDCardWrappper>
        <CRUDCardWrappper onClick={() => deleteZutatenComponent()}>
          <Trash size={50} />
          <Paragraph>Zutaten löschen</Paragraph>
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
          />
        )}
      </div>
    </Card>
  );
}
