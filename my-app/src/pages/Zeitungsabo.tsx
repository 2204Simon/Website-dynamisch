import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import DatePicker from "react-datepicker";
import { de } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

interface ZeitungsAboProps {
  hasSubscription: boolean;
  setHasSubscription: (value: boolean) => void;
  expiryDate: Date;
  setExpiryDate: (date: Date) => void;
}

export const ZeitungsAbo: React.FC<ZeitungsAboProps> = ({
  hasSubscription,
  setHasSubscription,
  expiryDate,
  setExpiryDate,
}) => {
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={hasSubscription}
            onChange={event => setHasSubscription(event.target.checked)}
            name="hasSubscription"
            color="primary"
          />
        }
        label="Hat das Abonnement abonniert"
      />
      {hasSubscription && (
        <>
          <p>Das Abonnement läuft ab am: </p>
          <DatePicker
            selected={expiryDate}
            onChange={(date: Date) => setExpiryDate(date)}
            locale={de} // Setzen Sie die Locale auf Deutsch
            dateFormat="dd.MM.yyyy" // Setzen Sie das Datumsformat auf Deutsch
            popperContainer={({ children }) => (
              <div style={{ zIndex: 9999 }}>{children}</div>
            )}
          />
        </>
      )}
    </>
  );
};
