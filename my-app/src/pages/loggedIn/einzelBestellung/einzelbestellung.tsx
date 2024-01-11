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
  const [bestellungen, setBestellungen] =
    useState<BestellungsInformation | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverBestellungen: BestellungsInformation = await getRequest(
          `Bestellung/${id}`
        );
        console.log(serverBestellungen);
        for (const produkt of serverBestellungen.produktInformationen) {
          console.log(produkt.bild);

          const loadedimage = await loadImage(produkt.bild);
          produkt.bild = loadedimage;
        }
        const loadedServerBestellung = {
          ...serverBestellungen,
          // bild: loadedimage,
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
    <div>
      <h1>Deine Bestellung vom {bestellungen.createdAt.toLocaleString()}</h1>
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
      </WarenkorbWrapper>
    </div>
  );
}
