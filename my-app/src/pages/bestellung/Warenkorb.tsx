import {
  Container,
  ContentContainer,
  Count,
  Image,
  Price,
  ProductName,
  RemoveButton,
  TotalPrice,
} from "./stylesBestellung/Warenkorb.styles";
import { Trash } from "phosphor-react";
import { colors, formatNumber } from "../general/constants";
interface WarenkorbProps {
  image: string;
  productName: string;
  count: number;
  price: number;
  editabel?: boolean;
  onRemove: () => void;
}

export default function Warenkorb({
  image,
  count,
  productName,
  price,
  onRemove,
  editabel,
}: WarenkorbProps): JSX.Element {
  const totalPrice = count * price; // Berechnung des Gesamtpreises
  return (
    <Container>
      <Image src={image} />
      <ContentContainer>
        <div>
          <Count>
            {count}
            {productName === "Zeitung" ? " Tage" : "x"}
          </Count>
          <ProductName>{productName}</ProductName>
          <Price>{formatNumber(price)}€</Price>
        </div>
        <div>
          <ProductName>Gesamtpreis:</ProductName>
          <TotalPrice>{formatNumber(totalPrice)}€</TotalPrice>{" "}
        </div>
      </ContentContainer>
      {editabel ? (
        <RemoveButton onClick={onRemove}>
          <Trash size={30} />
        </RemoveButton>
      ) : null}
    </Container>
  );
}
