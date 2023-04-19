import { Button } from "../general/button.styles";
import { LoggedIn, changeLoggedIn } from "../../globalVariables/loggedin";
export default function DeinKonto(): JSX.Element {
  function handleClick(): void {
    console.log("changedlogin");
    changeLoggedIn();
    console.log(LoggedIn);
  }
  return (
    <>
      <h1>Ihr Konto</h1>{" "}
      <Button className="black-color white-orange " onClick={handleClick}>
        Ausloggen
      </Button>
    </>
  );
}
