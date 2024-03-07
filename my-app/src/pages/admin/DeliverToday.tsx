import { useEffect, useState } from "react";
import { getRequest } from "../../serverFunctions/generelAPICalls";
import { BestellungsInformation } from "../../redux/types";
import { AdminListWrapper } from "./Admin.styles";
import { useNavigate } from "react-router-dom";

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
    <>
      {bestellungen.map(bestellung => (
        <AdminListWrapper
          key={bestellung.bestellungsId}
          onClick={() => navigate(`Bestellung/${bestellung.bestellungsId}`)}
        >
          <div>{bestellung.kunde?.email}</div>
          <div>{bestellung.gesamtpreis}</div>
        </AdminListWrapper>
      ))}
    </>
  );
}

export default DeliverToday;
