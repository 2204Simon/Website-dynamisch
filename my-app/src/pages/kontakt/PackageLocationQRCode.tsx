import React from "react";
import QRCode from "qrcode.react";

interface Props {
  latitude: number;
  longitude: number;
}

export default function PackageLocationQRCode(props: Props): JSX.Element {
  const locationUrl =
    "https://www.openstreetmap.org/?mlat=48.676666&mlon=10.153616#map=19/48.676666/10.153616";
  return (
    <div>
      <QRCode value={locationUrl} />
      <p>
        Scanne den QR Code um den aktuellen Standort deiner Frühstückslieferung
        zu sehen
      </p>
      <a href={locationUrl} target="_blank" rel="noopener noreferrer">
        Hier geht´s zum Tracker wenn du keinen QR Code Scanner hast
      </a>
    </div>
  );
}
