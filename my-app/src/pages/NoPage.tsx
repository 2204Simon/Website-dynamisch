import { Link } from "react-router-dom";
import { OrangeButton } from "./general/button";

function NoPage(): JSX.Element {
  return (
    <div>
      <h1>
        Diese Seite wurde leider nicht gefunden. Eventuell wurde diese gelöscht.
      </h1>
      <Link to="/">
        <OrangeButton caption={"Zur Home Seite"}></OrangeButton>
      </Link>
    </div>
  );
}
