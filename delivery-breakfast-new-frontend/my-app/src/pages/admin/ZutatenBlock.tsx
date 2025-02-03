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
import ZutatCreation from "./ZutatsForm";
import { FaCross } from "react-icons/fa";
import { ProduktCard, ZutatCard } from "./manageProducts/CreateProductCard";
import { ZutatenSelectionContainer } from "./manageProducts/manageProducts.styles";
import { Stage } from "../konfigurator/styles/Konfigurator.styles";
import { CustomToast } from "../general/toast.style";
import { colors } from "../general/constants";

export default function ZutatenBlock() {
  const [optionalComponent, setOptionalComponent] =
    useState<JSX.Element | null>(null);
  const [zutaten, setZutaten] = useState<Array<ZutatApiType>>([
    {
      zutatsId: "0",
      zutatBild: "",
      zutatsname: "",
      zutatspreis: 0,
      zutatseinheit: "",
      zutatseigenschaft: "",
      zutatensparte: "",
    },
  ]);

  function handleEditZutat(ID: string) {
    setOptionalComponent(<p>Abfrage muss noch implementiert werden</p>);
  }

  async function handleDeleteZutat(Id: string) {
    const status = await sendPutRequest("/admin/zutatenloeschen", {
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
    if (zutaten.length === 0) {
      return <h2>Keine Zutaten vorhanden</h2>;
    } else {
      if (zutaten[0].zutatsId === "0") {
        return;
      } else {
        return zutaten.map(product => (
          <ZutatCard topping={product} handleDelete={handleDeleteZutat} />
        ));
      }
    }
  };

  async function getZutatenComponent() {
    setZutaten(await getRequest("/zutat"));
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

  async function zutatsPostKomponent() {
    setOptionalComponent(<ZutatCreation />);
  }

  return (
    <Card>
      <Title>Zutaten</Title>

      <CRUDCardsGridWrapper>
        <CRUDCardWrappper onClick={() => getZutatenComponent()}>
          <Pencil size={50} style={{ color: colors.black }} />
          <Paragraph>Zutaten verwalten</Paragraph>
        </CRUDCardWrappper>
        <CRUDCardWrappper onClick={() => zutatsPostKomponent()}>
          <Plus size={50} style={{ color: colors.black }} />
          <Paragraph>Zutaten hinzufügen</Paragraph>
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
