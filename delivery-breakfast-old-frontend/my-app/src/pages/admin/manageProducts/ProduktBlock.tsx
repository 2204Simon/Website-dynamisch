import { MagnifyingGlass, Pencil, Plus, Trash, X } from "phosphor-react";
import { Card, Paragraph, Title } from "../../loggedIn/UserInformation.styles";
import { CRUDCardWrappper, CRUDCardsGridWrapper } from "../Admin.styles";
import { ScrollableYContainer } from "../../loggedIn/Bestellungen.styles";
import { useEffect, useState } from "react";
import {
  getRequest,
  sendPostRequest,
  sendPutRequest,
} from "../../../serverFunctions/generelAPICalls";
import { ZutatApiType, ProduktApiType } from "../../../redux/types";
import Warenkorb from "../../bestellung/Warenkorb";
import { loadImage } from "../../produkte/Produkt";
import { AdminList } from "../AdminList";
import ZutatSelection from "./ProduktForm";
import { FaCross } from "react-icons/fa";
import { CustomToast } from "../../general/toast.style";
import { Stage } from "../../konfigurator/styles/Konfigurator.styles";
import {
  ProduktSelectionContainer,
  ZutatenSelectionContainer,
} from "./manageProducts.styles";
import { ProduktInfosCard } from "./CreateProductCard";
import ZutatCreation from "../ZutatsForm";
import { colors } from "../../general/constants";

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
  const [produkte, setProdukte] = useState<Array<Produkt>>([
    {
      produktId: "0",
      titel: "",
      preis: 0,
      bild: "",
      sparte: "",
      kundenId: "",
      createdAt: "",
      updatedAt: "",
      Zutaten: [
        {
          zutatsId: "0",
          zutatsname: "",
          zutatseigenschaft: "",
          zutatspreis: 0,
          zutatseinheit: "",
          zutatBild: "",
          zutatensparte: "",
          createdAt: "",
          updatedAt: "",
        },
      ],
    },
  ]);

  const KonfiguratorCards = (zutaten: Array<Produkt>) => {
    if (zutaten.length === 0) {
      return <h2>Keine Produkte vorhanden</h2>;
    } else {
      if (zutaten[0].produktId === "0") {
        return;
      } else {
        const filteredProducts = zutaten.filter(
          product => product.sparte !== null
        );
        return filteredProducts.map(product => (
          <ProduktInfosCard
            topping={product}
            handleDelete={handleDeleteProduct}
          />
        ));
      }
    }
  };

  async function getProductComponent() {
    setProdukte(await getRequest("/produkt"));
  }

  async function productPutKomponent(zutat?: Produkt) {
    setOptionalComponent(<p> Muss noch implementiert werden</p>);
  }

  async function productPostKomponent() {
    setOptionalComponent(<ZutatSelection />);
  }

  async function handleDeleteProduct(Id: string) {
    const status = await sendPutRequest("/produkt/loeschen", {
      produktId: Id,
    });

    if (status === true) {
      CustomToast.success("Produkt wurde gelöscht");
      setProdukte(prevProdukte =>
        prevProdukte.filter(produkt => produkt.produktId !== Id)
      );
    } else {
      CustomToast.error("Produkt konnte nicht gelöscht werden");
    }
  }
  useEffect(() => {
    if (produkte) {
      setOptionalComponent(
        <Stage>
          <ProduktSelectionContainer>
            {KonfiguratorCards(produkte)}
          </ProduktSelectionContainer>
        </Stage>
      );
    }
  }, [produkte]);

  return (
    <Card>
      <Title>Produkte</Title>

      <CRUDCardsGridWrapper>
        <CRUDCardWrappper onClick={() => getProductComponent()}>
          {/* <MagnifyingGlass size={50} /> */}
          <Pencil size={50} style={{ color: colors.black }} />
          <Paragraph>Produkte verwalten</Paragraph>
        </CRUDCardWrappper>
        {/* <CRUDCardWrappper onClick={() => productPutKomponent()}>
          <Pencil size={50} style={{ color: colors.black}}/>
          <Paragraph>Produkt bearbeiten</Paragraph>
        </CRUDCardWrappper> */}
        <CRUDCardWrappper onClick={() => productPostKomponent()}>
          <Plus size={50} style={{ color: colors.black }} />
          <Paragraph>Produkt hinzufügen</Paragraph>
        </CRUDCardWrappper>
        {/* <CRUDCardWrappper onClick={() => deleteProductComponent()}>
          <Trash size={50} style={{ color: colors.black}} />
          <Paragraph>Produkt löschen</Paragraph> 
        </CRUDCardWrappper>*/}
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
