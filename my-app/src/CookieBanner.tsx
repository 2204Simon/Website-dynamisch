import React from "react";

interface CookieBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  onAccept,
  onDecline,
}) => (
  <div>
    <p>
      Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Durch die Nutzung
      unserer Website stimmen Sie allen Cookies gemäß unserer Cookie-Richtlinie
      zu.
    </p>
    <button onClick={onAccept}>Akzeptieren</button>
    <button onClick={onDecline}>Ablehnen</button>
  </div>
);
