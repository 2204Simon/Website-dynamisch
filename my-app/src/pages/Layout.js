import { Outlet, Link } from "react-router-dom";
import logo from '../Logo.webp'
import '../App.css';
const Layout = () => {
  return (
    <>
      <header id="zumSeitenanfang" className="header">
          <p></p>
          <div className="Logo">
            <a href="index.html">
              <img src={logo} alt="Logo" className="logo" width="100" height="100" />
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
              </ul>
            </div>
          </nav>
        </header>
      <Outlet />
      <footer>
            <div className="footer">
              <a href="#zumSeitenanfang">zum Seitenanfang</a>
              <a href="Impressum.html">Impressum</a>
              <a href="Datenschutzerklärung.html">Datenschutzerklärung</a>
              <div className="footer-content">
                <p>copyright &copy;2022 delivery breakfast
                </p>
              </div>
            </div>
          </footer>
    </>
  )
};

export default Layout;