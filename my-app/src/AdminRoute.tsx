import { useSelector } from "react-redux";
import { UserDataState } from "./redux/types";
import { AdminPage } from "./pages/admin/AdminPage";

export const AdminRoute = () => {
  const isAdmin = useSelector((state: { user: UserDataState }) => state.user);

  console.log("isAdmin:", isAdmin);

  return isAdmin.LogInData.istAdmin ? <AdminPage /> : <div>401 Julian</div>;
};
