import * as React from "react";
import { Link } from "react-router-dom";
import { TwitterLogo, FacebookLogo, InstagramLogo } from "phosphor-react";

function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <ul>
            <li>
              <a href="#top">Zum Seitenanfang</a>
            </li>
            <li>
              <Link to="/datenschutz">Datenschutzerklärung</Link>
            </li>
            <li>
              <Link to="/impressum">Impressum</Link>
            </li>
            <li>
              <Link to="/">&copy; delivery-breakfast 2023</Link>
            </li>
          </ul>
        </div>
        <div className="social-media">
          <a href="https://twitter.com">
            <TwitterLogo size={24} />
          </a>
          <a href="https://facebook.com">
            <FacebookLogo size={24} />
          </a>
          <a href="https://www.instagram.com/delivery_breakfast_">
            <InstagramLogo size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
