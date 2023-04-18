import { Outlet, Link } from "react-router-dom";
import logo from ".././img/Logo.webp";
import "../App.css";
import { SignIn } from "phosphor-react";

const Layout = () => {
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
                <Link to="/Bestellung">Bestellung</Link>
              </li>
              <li>
                <Link to="/Unsere Geschichte">Unsere Geschichte</Link>
              </li>
              <li>
                <Link to="/Kontakt">Kontakt</Link>
              </li>
              <li>
                <Link to="/SignUp">
                  <SignIn />
                </Link>
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
