import React, { useEffect, useState } from "react";
import { MapContainer } from "./styles/Kontakt.styles";
import { useCookies } from "react-cookie";

function ContactMap(): JSX.Element {
  return (
    <MapContainer>
      <iframe
        title="Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2634.236118735561!2d10.152005076637723!3d48.68185011311377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47991673b8ad167b%3A0x128ebc1169c962b2!2sDHBW%20Heidenheim!5e0!3m2!1sde!2sde!4v1681532862141!5m2!1sde!2sde"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
      />
    </MapContainer>
  );
}

export { ContactMap };
