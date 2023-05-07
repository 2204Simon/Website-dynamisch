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
      <p>Scanne den Code um den Standort deiner Lieferung zu verfolgen!</p>
      <a href={locationUrl} target="_blank" rel="noopener noreferrer">
        Hier geht´s zum Standort ohne QR Code Scanner!
      </a>
    </div>
  );
}
