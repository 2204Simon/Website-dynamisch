import { Container } from "../loggedIn/UserInformation.styles";
import { AdminPageWrapper } from "./Admin.styles";
import ZutatenBlock from "./ZutatenBlock";

export function AdminPage() {
  return (
    <AdminPageWrapper>
      <ZutatenBlock />
    </AdminPageWrapper>
  );
}
