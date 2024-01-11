import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { KUNDEN_ID } from "../../../globalVariables/global";
import { useEffect, useState } from "react";
import { BestellungsInformation } from "../../../redux/types";
import { getRequest } from "../../../serverFunctions/generelAPICalls";
import { CustomToast } from "../../general/toast.style";
import SideBarBuy from "../../bestellung/SideBarBuy";
import Warenkorb from "../../bestellung/Warenkorb";
import {
  WarenkorbWrapper,
  BestellungsWrapper,
} from "../../bestellung/stylesBestellung/Bestellung.styles";
import { loadImage } from "../../produkte/Produkt";
export default function EinzelBestellung() {
  const { id } = useParams();
  const [cookies] = useCookies([KUNDEN_ID]);
  const [bestellungen, setBestellungen] =
    useState<BestellungsInformation | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverBestellungen = await getRequest(`Bestellung/${id}`);
        const loadedimage = await loadImage(
          `../../img/${serverBestellungen.bild}`
        );
        const loadedServerBestellung = {
          ...serverBestellungen,
          bild: loadedimage,
        };

        setBestellungen(loadedServerBestellung);
      } catch (error) {
        CustomToast.error("Fehler beim Laden der Daten");
      }
    };

    fetchData();
  }, []);
  return !bestellungen ? (
    <div>loading</div>
  ) : (
    <WarenkorbWrapper>
      <BestellungsWrapper>
        {bestellungen.produktInformationen.map((item, index) => (
          <Warenkorb
            key={index}
            image={item.bild}
            price={item.preis}
            onRemove={() => console.log("removed")} // Item an handleRemoveItem übergeben
            productName={item.titel}
            count={item.bestellmenge}
          />
        ))}
      </BestellungsWrapper>
      <SideBarBuy
        produktAnzahl={bestellungen.produktInformationen.length}
        price={bestellungen.gesamtpreis}
      />
    </WarenkorbWrapper>
  );
}
