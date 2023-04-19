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
              <Link to="/Impressum">Impressum</Link>
            </li>
          </ul>
        </div>
        <div className="social-media">
          <a
            href="https://twitter.com/deliverybreak"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterLogo size={24} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100091669221469&sk=about"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookLogo size={24} />
          </a>
          <a
            href="https://www.instagram.com/delivery_breakfast_"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramLogo size={24} />
          </a>
          <a
            href="https://www.tiktok.com/@delivery_breakfast?is_from_webapp=1&sender_device=pc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TiktokLogo size={24} />
          </a>
          <a
            href="https://t.snapchat.com/E0HWtcis"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SnapchatLogo size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/delivery-breakfast-723b46272"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinLogo size={24} />
          </a>
          <li>
            <Link to="/">
              &copy; delivery-breakfast {new Date().getFullYear()}
            </Link>
          </li>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
