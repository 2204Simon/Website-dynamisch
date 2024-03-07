import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BestellungsInformation } from "../../../redux/types";
import {
  getRequest,
  sendPutRequest,
} from "../../../serverFunctions/generelAPICalls";
import { CustomToast } from "../../general/toast.style";
import Warenkorb from "../../bestellung/Warenkorb";
import {
  WarenkorbWrapper,
  BestellungsWrapper,
} from "../../bestellung/stylesBestellung/Bestellung.styles";
import { loadImage } from "../../produkte/Produkt";
import { formatGermanDate } from "../../../DateUtils";
import { ArrowCircleLeft, CheckCircle, CheckSquare } from "phosphor-react";
import { colors } from "../../general/constants";
import { BlackColorButton, OrangeButton } from "../../general/button";

type BestellungsInformationProps = {
  admin?: boolean;
  deliverFunction?: () => void;
};
export default function EinzelBestellung({
  admin,
}: BestellungsInformationProps) {
  const { id } = useParams();
  const [bestellungen, setBestellungen] =
    useState<BestellungsInformation | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverBestellungen: BestellungsInformation = await getRequest(
          `/Bestellung/${id}`
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

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  async function deliverFunction() {
    const response = await sendPutRequest(`/admin/deliver/${id}`);
    if (response) {
      CustomToast.success("Lieferung erfolgreich abgeschlossen");
      navigate(-1);
    } else {
      CustomToast.error("Fehler beim Abschließen der Lieferung");
    }
  }
  return !bestellungen ? (
    <div>loading</div>
  ) : (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between", // verteilt die Elemente gleichmäßig im Container
          alignItems: "center",
        }}
      >
        <ArrowCircleLeft size={50} color={colors.black} onClick={goBack} />
        <h1 style={{ textAlign: "center", flex: 1 }}>
          {" "}
          {/* flex: 1 hinzufügen */}
          Bestellung vom{" "}
          {formatGermanDate(bestellungen.bestellDatum.toLocaleString())}
        </h1>
        <div></div>
      </div>
      {admin ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <BlackColorButton
            caption={"Lieferung abschließen"}
            onClick={deliverFunction}
          />
        </div>
      ) : null}

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
              editabel={false}
            />
          ))}
        </BestellungsWrapper>
      </WarenkorbWrapper>
    </div>
  );
}
