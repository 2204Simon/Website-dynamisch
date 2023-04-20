import { Outlet, Link } from "react-router-dom";
import logo from ".././img/Logo.webp";
import "../App.css";
import { SignIn, User, ShoppingCartSimple } from "phosphor-react";
import { useLoggedIn } from "../globalVariables/loggedin";
import Badge from "@mui/material/Badge";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const Layout = () => {
  const { loggedIn } = useLoggedIn();
  const CartArrayLength = useSelector(
    (state: RootState) => state.cartItems.length
  );
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
            <input type="checkbox" className="toggle-menu" />
            <div className="hamburger"></div>
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
                  <ShoppingCartSimple />
                  <Badge badgeContent={CartArrayLength} color="error" />
                </Link>
              </li>
              <li>
                {loggedIn ? (
                  <Link to="/LoggedIn">
                    <User />
                  </Link>
                ) : (
                  <Link to="/SignUp">
                    <SignIn />
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
