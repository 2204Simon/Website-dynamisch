import Warenkorb from "./Warenkorb";
import SideBarBuy from "./SideBarBuy";
import {
  WarenkorbWrapper,
  SideBarWrapper,
  BestellungsWrapper,
} from "./stylesBestellung/Bestellung.styles";
import Logo from "../../img/Logo.webp";

// type testArray = [
//   { anzahl: Number; preis: Number; logo: String; produktname: String }
// ];

const testArray = [
  { anzahl: 1, preis: 100, logo: Logo, produktname: "peace out" },
  { anzahl: 1, preis: 100, logo: Logo, produktname: "pasdf out" },
  { anzahl: 1, preis: 100, logo: Logo, produktname: "pasdf out" },
  { anzahl: 1, preis: 100, logo: Logo, produktname: "pasdf out" },
  { anzahl: 1, preis: 100, logo: Logo, produktname: "pasdf out" },
  { anzahl: 1, preis: 100, logo: Logo, produktname: "pasdf out" },
  { anzahl: 1, preis: 100, logo: Logo, produktname: "pasdf out" },
  { anzahl: 1, preis: 100, logo: Logo, produktname: "pasdf out" },
  { anzahl: 1, preis: 100, logo: Logo, produktname: "pasdf out" },
];

function test(): void {
  console.log("hello World");
}
function WarenkorbSeite(): JSX.Element {
  return (
    <WarenkorbWrapper>
      <BestellungsWrapper>
        {testArray.map((item, index) => (
          <Warenkorb
            key={index}
            image={item.logo}
            price={item.preis}
            onRemove={test}
            productName={item.produktname}
            count={item.anzahl}
          />
        ))}
      </BestellungsWrapper>
      <SideBarWrapper>
        <SideBarBuy produktAnzahl={5} price={4.99} />
      </SideBarWrapper>
    </WarenkorbWrapper>
  );
}

export default WarenkorbSeite;
