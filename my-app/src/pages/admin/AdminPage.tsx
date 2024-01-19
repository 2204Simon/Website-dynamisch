import { AdminPageWrapper } from "./Admin.styles";
import AdminBestellungsblock from "./AdminBestellungen";
import ZutatenBlock from "./ZutatenBlock";

export function AdminPage() {
  return (
    <AdminPageWrapper>
      <ZutatenBlock />
      <AdminBestellungsblock />
    </AdminPageWrapper>
  );
}
