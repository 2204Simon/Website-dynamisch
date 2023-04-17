import * as React from "react";
import { Link } from "react-router-dom";
import {
  TwitterLogo,
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  SnapchatLogo,
  LinkedinLogo,
} from "phosphor-react";

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
          </ul>
        </div>
        <div className="social-media">
          <a href="https://twitter.com/deliverybreak">
            <TwitterLogo size={24} />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100091669221469&sk=about">
            <FacebookLogo size={24} />
          </a>
          <a href="https://www.instagram.com/delivery_breakfast_">
            <InstagramLogo size={24} />
          </a>
          <a href="https://www.tiktok.com/@delivery_breakfast?is_from_webapp=1&sender_device=pc">
            <TiktokLogo size={24} />
          </a>
          <a href="https://t.snapchat.com/E0HWtcis">
            <SnapchatLogo size={24} />
          </a>
          <a href="https://www.linkedin.com/in/delivery-breakfast-723b46272">
            <LinkedinLogo size={24} />
          </a>
          <li>
            <Link to="/"> &copy; delivery-breakfast 2023</Link>
          </li>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
