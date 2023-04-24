import React from "react";
import { Outlet } from "react-router-dom";
import Chatra from "./home/Chatra";
import BurgerMenu from "./BurgerMenu";
import { DesktopMenu } from "./DesktopMenu";

const Layout = () => {
  return (
    <>
      <DesktopMenu />
      <BurgerMenu />
      <Outlet />
      <Chatra />
    </>
  );
};

export default Layout;
