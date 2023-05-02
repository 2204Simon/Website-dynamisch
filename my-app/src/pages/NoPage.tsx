import { Link } from "react-router-dom";
import { BlackColorButton, OrangeButton } from "./general/button";

function NoPage(): JSX.Element {
  return (
    <div style={{ height: "88vh" }}>
      <h1>
        Diese Seite wurde leider nicht gefunden. Eventuell wurde diese gelöscht.
      </h1>
      <Link to="/">
        <BlackColorButton caption={"Zur Home Seite"}></BlackColorButton>
      </Link>
    </div>
  );
}
export default NoPage;
