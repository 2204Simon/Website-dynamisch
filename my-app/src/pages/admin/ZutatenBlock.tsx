import { MagnifyingGlass } from "phosphor-react";
import { Card, Paragraph, Title } from "../loggedIn/UserInformation.styles";
import { CRUDCardWrappper } from "./Admin.styles";

export default function ZutatenBlock() {
  return (
    <Card>
      <Title>Zutaten</Title>
      <CRUDCardWrappper>
        <MagnifyingGlass size={50} />
        <div>
          <Paragraph>Zutaten</Paragraph>
          <Paragraph>suchen</Paragraph>
        </div>
      </CRUDCardWrappper>
    </Card>
  );
}
