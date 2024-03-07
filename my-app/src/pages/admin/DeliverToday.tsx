import { useEffect, useState } from "react";
import { getRequest } from "../../serverFunctions/generelAPICalls";
import { BestellungsInformation } from "../../redux/types";
import { AdminListWrapper } from "./Admin.styles";
import { useNavigate } from "react-router-dom";
import { Paragraph } from "../loggedIn/UserInformation.styles";

function DeliverToday() {
  const [bestellungen, setBestellungen] = useState<BestellungsInformation[]>(
    []
  );
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const fetchedBestellungen: Array<BestellungsInformation> =
        await getRequest("/admin/todayDeliveries");
      setBestellungen(fetchedBestellungen);
      console.log(fetchedBestellungen);
      console.log(bestellungen);
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        width: "100%",
      }}
    >
      {bestellungen.map(bestellung => (
        <AdminListWrapper
          hover
          adminPage
          key={bestellung.bestellungsId}
          onClick={() => navigate(`Bestellung/${bestellung.bestellungsId}`)}
        >
          <Paragraph>{bestellung.kunde?.nachname}</Paragraph>
          <Paragraph>{bestellung.kunde?.vorname}</Paragraph>
          <Paragraph>{bestellung.addressenInformation?.ort}</Paragraph>
          <Paragraph>{bestellung.addressenInformation?.postleitzahl}</Paragraph>
          <Paragraph>{bestellung.addressenInformation?.strasse}</Paragraph>
          <Paragraph>{bestellung.addressenInformation?.hausnummer}</Paragraph>
          <Paragraph>Preis: {bestellung.gesamtpreis}</Paragraph>
        </AdminListWrapper>
      ))}
    </div>
  );
}

export default DeliverToday;
