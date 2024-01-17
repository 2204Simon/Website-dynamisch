import { MagnifyingGlass } from "phosphor-react";
import { Card, Container } from "../loggedIn/UserInformation.styles";
import { CRUDCardWrappper } from "./Admin.styles";

export default function ZutatenBlock() {
  return (
    <Card>
      <h1>Zutaten</h1>
      <CRUDCardWrappper>
        <MagnifyingGlass size={50} />
        <div>
          <p>Zutaten</p>
          <p>suchen</p>
        </div>
      </CRUDCardWrappper>
    </Card>
  );
}
