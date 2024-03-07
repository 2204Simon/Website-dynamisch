import { AdminPageWrapper } from "./Admin.styles";
import AdminBestellungsblock from "./AdminBestellungen";
import ProduktBlock from "./manageProducts/ProduktBlock";
import ZutatenBlock from "./ZutatenBlock";

export function AdminPage() {
  return (
    <AdminPageWrapper>
      <AdminBestellungsblock />
      <ZutatenBlock />
      <ProduktBlock />
    </AdminPageWrapper>
  );
}
