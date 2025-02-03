import React from "react";
import { CookieBannerStyle } from "./Cookiebanner.styles";
import { Button } from "./pages/general/button.styles";

interface CookieBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  onAccept,
  onDecline,
}) => (
  <CookieBannerStyle>
    <div className="cookiebanner">
      <div className="cookietext">
        Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Durch die
        Nutzung unserer Website stimmen Sie allen Cookies gemäß unserer
        Cookie-Richtlinie zu.
      </div>
      <Button className="white-orange" onClick={onAccept}>
        Akzeptieren
      </Button>
      <Button className="white-orange" onClick={onDecline}>
        Ablehnen
      </Button>
    </div>
  </CookieBannerStyle>
);
