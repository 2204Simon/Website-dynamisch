import { useEffect, useState } from "react";
import { Calendar, Popper, StyledDatePicker } from "../bestellung/Calendar";
import { de } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { BestellungsInformation } from "../../redux/types";
import { getRequest } from "../../serverFunctions/generelAPICalls";
import { AdminListWrapper } from "./Admin.styles";

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
    <>
      <div>BestellungToSpecificDate</div>
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

export default BestellungToSpecificDate;
