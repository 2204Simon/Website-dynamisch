import { useEffect, useState } from "react";
import { Calendar, Popper, StyledDatePicker } from "../bestellung/Calendar";
import { de } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { BestellungsInformation } from "../../redux/types";
import { getRequest } from "../../serverFunctions/generelAPICalls";
import { AdminListWrapper } from "./Admin.styles";
import { Paragraph } from "../loggedIn/UserInformation.styles";
import { Package, Truck } from "phosphor-react";

function BestellungToSpecificDate() {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const DatepickerInput = ({ ...props }) => (
    <input type="text" {...props} readOnly />
  );

  const [bestellungen, setBestellungen] = useState<BestellungsInformation[]>(
    []
  );
  const navigate = useNavigate();
  useEffect(() => {
    console.log("fetchedBestellungen", selectedDate);
    const fetchData = async () => {
      const fetchedBestellungen: Array<BestellungsInformation> =
        await getRequest(`/admin/sumLieferdatum/${selectedDate}`);
      setBestellungen(fetchedBestellungen);
      console.log(fetchedBestellungen);
      console.log(bestellungen);
    };
    fetchData();
  }, [selectedDate]);

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
      <div style={{ marginTop: "5px", marginBottom: "5px" }}>
        <StyledDatePicker
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(date)}
          dateFormat={"dd.MM.yyyy"}
          locale={de}
          popperPlacement={"top"}
          onFocus={() => {}}
          calendarContainer={Calendar}
          popperContainer={Popper}
          customInput={<DatepickerInput />}
        />
      </div>
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
          {bestellung.lieferdatum !== null ? (
            <Package size={30} />
          ) : (
            <Truck size={30} />
          )}
        </AdminListWrapper>
      ))}
    </div>
  );
}

export default BestellungToSpecificDate;
