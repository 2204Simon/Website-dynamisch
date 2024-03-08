import { MagnifyingGlass, Pencil, Plus, Trash, X } from "phosphor-react";
import { Card, Paragraph, Title } from "../loggedIn/UserInformation.styles";
import { CRUDCardWrappper, CRUDCardsGridWrapper } from "./Admin.styles";
import { ScrollableYContainer } from "../loggedIn/Bestellungen.styles";
import { useEffect, useState } from "react";
import {
  getRequest,
  sendPutRequest,
} from "../../serverFunctions/generelAPICalls";
import { ZutatApiType } from "../../redux/types";
import Warenkorb from "../bestellung/Warenkorb";
import { loadImage } from "../produkte/Produkt";
import { AdminList } from "./AdminList";
import { Zutatsform } from "./ZutatsForm";
import { FaCross } from "react-icons/fa";
import { ProduktCard, ZutatCard } from "./manageProducts/CreateProductCard";
import { ZutatenSelectionContainer } from "./manageProducts/manageProducts.styles";
import { Stage } from "../konfigurator/styles/Konfigurator.styles";
import { CustomToast } from "../general/toast.style";

export default function ZutatenBlock() {
  const [optionalComponent, setOptionalComponent] =
    useState<JSX.Element | null>(null);
  const [zutaten, setZutaten] = useState<Array<ZutatApiType>>([]);

  function handleEditZutat(ID: string) {
    setOptionalComponent(<p>Abfrage muss noch implementiert werden</p>);
  }

  async function handleDeleteZutat(Id: string) {
    const status = await sendPutRequest("/zutat/loeschen", {
      zutatsId: Id,
    });
    if (status === true) {
      CustomToast.success("Zutat wurde gelöscht");
      setZutaten(prevZutaten =>
        prevZutaten.filter(zutat => zutat.zutatsId !== Id)
      );
    } else {
      CustomToast.error("Zutat konnte nicht gelöscht werden");
    }
  }

  const KonfiguratorCards = (zutaten: Array<ZutatApiType>) => {
    return zutaten.map(product => (
      <ZutatCard
        topping={product}
        handleEdit={handleEditZutat}
        handleDelete={handleDeleteZutat}
      />
    ));
  };

  async function getZutatenComponent() {
    const fetchedZutaten = await getRequest("/zutat");
    setZutaten(fetchedZutaten);
  }

  useEffect(() => {
    if (zutaten) {
      setOptionalComponent(
        <Stage>
          <ZutatenSelectionContainer>
            {KonfiguratorCards(zutaten)}
          </ZutatenSelectionContainer>
        </Stage>
      );
    }
  }, [zutaten]);
  // async function zutatsPutKomponent(zutat?: ZutatApiType) {
  //   setOptionalComponent(
  //     <Zutatsform
  //       onSubmit={handleEditChange}
  //       defaultValue={zutat}
  //       newZutat={false}
  //     />
  //   );
  // }

  // async function zutatsPostKomponent() {
  //   setOptionalComponent(
  //     <Zutatsform onSubmit={handleEditChange} newZutat={true} />
  //   );
  // }

  return (
    <Card>
      <Title>Zutaten</Title>

      <CRUDCardsGridWrapper>
        <CRUDCardWrappper onClick={() => getZutatenComponent()}>
          <MagnifyingGlass size={50} />
          <Paragraph>Zutaten anzeigen</Paragraph>
        </CRUDCardWrappper>
        {/* <CRUDCardWrappper onClick={() => zutatsPutKomponent()}>
          <Pencil size={50} />
          <Paragraph>Zutaten bearbeiten</Paragraph>
        </CRUDCardWrappper>
        <CRUDCardWrappper onClick={() => zutatsPostKomponent()}>
          <Plus size={50} />
          <Paragraph>Zutaten hinzufügen</Paragraph>
        </CRUDCardWrappper>
        <CRUDCardWrappper onClick={() => ()}>
          <Trash size={50} />
          <Paragraph>Zutaten löschen</Paragraph>
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
