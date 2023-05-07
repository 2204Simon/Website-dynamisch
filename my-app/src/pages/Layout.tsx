import React from "react";
import { Outlet } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";
import { DesktopMenu } from "./DesktopMenu";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
      <DesktopMenu />
      <BurgerMenu />
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default Layout;
