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
import { GeneralstyledLink, colors } from "./general/constants";
import { FooterContainer, FooterLinks, SocialMedia } from "./Footer.styles";

function Footer(): JSX.Element {
  return (
    <FooterContainer>
      <SocialMedia>
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
      </SocialMedia>
      <FooterLinks>
        <ul>
          <li>
            <a href="#top">Nach oben</a>
          </li>
          <li>
            <GeneralstyledLink
              to="/Datenschutzerklaerung"
              onClick={() => window.scrollTo(0, 0)}
            >
              Datenschutz
            </GeneralstyledLink>
          </li>
          <li>
            <GeneralstyledLink
              to="/Impressum"
              onClick={() => window.scrollTo(0, 0)}
            >
              Impressum
            </GeneralstyledLink>
          </li>
        </ul>
      </FooterLinks>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          &copy; delivery-breakfast {new Date().getFullYear()}
        </Link>
      </div>
    </FooterContainer>
  );
}

export default Footer;
