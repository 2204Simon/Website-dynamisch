import { MagnifyingGlass, Pencil, Plus, Trash, X } from "phosphor-react";
import { Card, Paragraph, Title } from "../../loggedIn/UserInformation.styles";
import { CRUDCardWrappper, CRUDCardsGridWrapper } from "../Admin.styles";
import { ScrollableYContainer } from "../../loggedIn/Bestellungen.styles";
import { useState } from "react";
import { getRequest } from "../../../serverFunctions/generelAPICalls";
import { ZutatApiType, ProduktApiType } from "../../../redux/types";
import Warenkorb from "../../bestellung/Warenkorb";
import { loadImage } from "../../produkte/Produkt";
import { AdminList } from "../AdminList";
import ZutatSelection from "./ProduktForm";
import { FaCross } from "react-icons/fa";

export interface Zutat {
  zutatsId: string;
  zutatsname: string;
  zutatseigenschaft: string;
  zutatspreis: number;
  zutatseinheit: string;
  zutatBild: string;
  zutatensparte: string;
  createdAt: string;
  updatedAt: string;
}

export interface Produkt {
  produktId: string;
  titel: string;
  preis: number;
  bild: string;
  sparte: string;
  kundenId: string | null;
  createdAt: string;
  updatedAt: string;
  Zutaten: Array<Zutat>;
}

export default function ProduktBlock() {
  const [optionalComponent, setOptionalComponent] =
    useState<JSX.Element | null>(null);

  function handleEditChange(zuatat: ZutatApiType) {
    console.log("muss noch implementiert werden");
    setOptionalComponent(<p>Abfrage muss noch implementiert werden</p>);
  }

  async function getProductComponent() {
    console.log("muss noch implementiert werden");
    const produkte: Array<Produkt> = await getRequest("/produkt");
    const loadedProdukte: Array<Produkt> = await Promise.all(
      produkte.map((zutat: any) =>
        loadImage(zutat.zutatBild).then(image => ({
          ...zutat,
          zutatBild: image,
        }))
      )
    );
    setOptionalComponent(
      <>
        {loadedProdukte.map(zutat => (
          <AdminList
            key={zutat.produktId}
            editable
            deletable
            onEdit={() => productPutKomponent(zutat)}
            onRemove={() => deleteProductComponent()} // Item an handleRemoveItem übergeben
            children={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Paragraph>{zutat.produktId}</Paragraph>
                <Paragraph>{zutat.titel}</Paragraph>
                <Paragraph>{zutat.preis}</Paragraph>
                <Paragraph>{zutat.bild}</Paragraph>
                <Paragraph>{zutat.sparte}</Paragraph>
                <Paragraph>{zutat.kundenId}</Paragraph>
                <Paragraph>{zutat.createdAt}</Paragraph>
                <Paragraph>{zutat.updatedAt}</Paragraph>
              </div>
            }
          />
        ))}
      </>
    );
  }

  async function productPutKomponent(zutat?: Produkt) {
    //setOptionalComponent(<ZutatSelection />);
    setOptionalComponent(<p> Muss noch implementiert werden</p>);
  }

  async function productPostKomponent() {
    setOptionalComponent(<ZutatSelection />);
  }

  async function deleteProductComponent() {
    setOptionalComponent(<p> Muss noch implementiert werden</p>);
  }
  return (
    <Card>
      <Title>Produkte</Title>

      <CRUDCardsGridWrapper>
        <CRUDCardWrappper onClick={() => getProductComponent()}>
          <MagnifyingGlass size={50} />
          <Paragraph>Produkt suchen</Paragraph>
        </CRUDCardWrappper>
        <CRUDCardWrappper onClick={() => productPutKomponent()}>
          <Pencil size={50} />
          <Paragraph>Produkt bearbeiten</Paragraph>
        </CRUDCardWrappper>
        <CRUDCardWrappper onClick={() => productPostKomponent()}>
          <Plus size={50} />
          <Paragraph>Produkt hinzufügen</Paragraph>
        </CRUDCardWrappper>
        <CRUDCardWrappper onClick={() => deleteProductComponent()}>
          <Trash size={50} />
          <Paragraph>Produkt löschen</Paragraph>
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
          {/* <ScrollableYContainer style={{ width: "100%", height: "100vh" }}> */}
          {optionalComponent}
          {/* </ScrollableYContainer> */}
        </div>
        {optionalComponent && (
          <X
            size={10}
            cursor={"pointer"}
            onClick={() => setOptionalComponent(null)}
          />
        )}
      </div>
    </Card>
  );
}
