import { Link } from "react-router-dom";
import {
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  SnapchatLogo,
  LinkedinLogo,
  ArrowUp,
} from "phosphor-react";
import { GeneralstyledLink, colors } from "./general/constants";
import { FooterContainer, FooterLinks, SocialMedia } from "./Footer.styles";

function Footer(): JSX.Element {
  return (
    <FooterContainer>
      <SocialMedia>
        <a
          href="https://www.facebook.com/profile.php?id=100091669221469&sk=about"
          aria-label="Link zu Facebook"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            width: "48px",
            height: "48px",
          }}
        >
          <FacebookLogo size={24} />
        </a>
        <a
          href="https://www.instagram.com/delivery_breakfast_"
          aria-label="Link zu Instagram"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", width: "48px", height: "48px" }}
        >
          <InstagramLogo size={24} />
        </a>
        <a
          href="https://www.tiktok.com/@delivery_breakfast?is_from_webapp=1&sender_device=pc"
          aria-label="Link zu Tiktok"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", width: "48px", height: "48px" }}
        >
          <TiktokLogo size={24} />
        </a>
        <a
          href="https://t.snapchat.com/E0HWtcis"
          aria-label="Link zu Snapchat"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", width: "48px", height: "48px" }}
        >
          <SnapchatLogo size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/delivery-breakfast-723b46272"
          aria-label="Link zu LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", width: "48px", height: "48px" }}
        >
          <LinkedinLogo size={24} />
        </a>
      </SocialMedia>
      <FooterLinks>
        <ul>
          <li>
            <button
              style={{
                display: "flex",
                color: `${colors.white}`,
                background: "transparent",
                border: "none",
                font: "Montserrat",
                fontStyle: "sans-serif",
                fontSize: "16px",
                cursor: "pointer",
                width: "fit-content",
                height: "48px",
                alignItems: "center",
              }}
              onClick={() => window.scroll(0, 0)}
            >
              <ArrowUp
                size={24}
                style={{ marginRight: "5px", color: `${colors.white}` }}
              />
              Anfang
            </button>
          </li>
          <li>
            <GeneralstyledLink
              style={{
                width: "48px",
                height: "48px",
              }}
              to="/Datenschutzerklaerung"
              onClick={() => window.scrollTo(0, 0)}
            >
              Datenschutz
            </GeneralstyledLink>
          </li>
          <li>
            <GeneralstyledLink
              style={{
                width: "48px",
                height: "48px",
              }}
              to="/Impressum"
              onClick={() => window.scrollTo(0, 0)}
            >
              Impressum
            </GeneralstyledLink>
          </li>
        </ul>
      </FooterLinks>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Link
          onClick={() => window.scrollTo(0, 0)}
          to="/"
          style={{ color: `${colors.white}`, textDecoration: "none" }}
        >
          &copy; delivery-breakfast {new Date().getFullYear()}
        </Link>
      </div>
    </FooterContainer>
  );
}

export default Footer;
