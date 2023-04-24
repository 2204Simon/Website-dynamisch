import AdressInformation from "./AdressData";
import UserInformation from "./UserInformation";

export default function DeinKonto(): JSX.Element {
  return (
    <>
      <UserInformation />
      <AdressInformation />
    </>
  );
}
