import { useSelector } from "react-redux";
import { UserDataState } from "./redux/types";
import { AdminPage } from "./pages/admin/AdminPage";
import { useNavigate } from "react-router-dom";
import { Button } from "./pages/general/button.styles";

export const AdminRoute = () => {
  const isAdmin = useSelector((state: { user: UserDataState }) => state.user);
  const navigate = useNavigate();

  console.log("isAdmin:", isAdmin);

  return isAdmin.LogInData.istAdmin ? (
    <AdminPage />
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h2>Fehler 401: fehlende Autorisierung</h2>
      <Button
        className="black-color white-orange"
        onClick={() => navigate("/LoggedIn")}
      >
        Zum Konto
      </Button>
    </div>
  );
};
