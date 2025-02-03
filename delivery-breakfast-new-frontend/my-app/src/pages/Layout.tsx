import { Outlet } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";
import { DesktopMenu } from "./DesktopMenu";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <DesktopMenu />
      <BurgerMenu />
      <div style={{ minHeight: "90vh", flex: 1 }}>
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Layout;
