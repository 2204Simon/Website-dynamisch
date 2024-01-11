import { Link } from "react-router-dom";
import { BlackColorButton } from "../general/button";
import AdressInformation from "./AdressData";
import UserInformation from "./UserInformation";
import BestellungsData from "./BestellungenData";

export default function DeinKonto(): JSX.Element {
  return (
    <>
      <UserInformation />
      <AdressInformation />
      <div
        style={{
          textAlign: "center",
          backgroundColor: "rgb(248, 248, 248)",
        }}
      >
        <Link to="/Bestellung" onClick={() => window.scrollTo(0, 0)}>
          <BlackColorButton caption={"Zurück zum Einkauf"}></BlackColorButton>
        </Link>
      </div>
      <BestellungsData />
    </>
  );
}
