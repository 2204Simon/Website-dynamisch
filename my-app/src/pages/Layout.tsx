import { Outlet, Link } from "react-router-dom";
import logo from ".././img/Logo.webp";
import "../App.css";
import { SignIn, User, ShoppingCart } from "phosphor-react";
import { useLoggedIn } from "../globalVariables/loggedin";
import Badge from "@mui/material/Badge";

import { useSelector } from "react-redux";
import { CartState } from "../redux/types";
import Chatra from "./home/Chatra";

const Layout = () => {
  const { loggedIn } = useLoggedIn();
  const cartItems = useSelector(
    (state: { cart: CartState }) => state.cart.cartItems
  );
  const arrayLength = cartItems.length;
  return (
    <>
      <header id="zumSeitenanfang" className="header">
        <p></p>
        <div className="Logo">
          <a href="/">
            <img
              src={logo}
              alt="Logo"
              className="logo"
              width="100"
              height="100"
            />
          </a>
        </div>
        <nav>
          <div className="navigation">
            <ul className="menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Produkte">Produkte</Link>
              </li>
              <li>
                <Link to="/Unsere Geschichte">Unsere Geschichte</Link>
              </li>
              <li>
                <Link to="/Kontakt">Kontakt</Link>
              </li>
              <li>
                <Link to="/Bestellung">
                  <ShoppingCart />
                  <Badge badgeContent={arrayLength} color="error" />
                </Link>
              </li>
              <li>
                {loggedIn ? (
                  <Link to="/LoggedIn">
                    <User />
                  </Link>
                ) : (
                  <Link to="/SignUp">
                    <SignIn weight="fill" />
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
        <Chatra />
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
