import { useSelector } from "react-redux";
import { useLoggedIn } from "../../globalVariables/loggedin";
import { UserDataState } from "../../redux/types";
import {
  Card,
  Container,
  LogoutButton,
  Paragraph,
  Title,
} from "./UserInformation.styles";

export default function UserInformation(): JSX.Element {
  const { changeLoggedIn, loggedIn } = useLoggedIn();
  const userInformation = useSelector(
    (state: { user: UserDataState }) => state.user
  );

  const handleClick = (): void => {
    console.log("changedlogin");
    changeLoggedIn();
  };

  return (
    <Container>
      <Card>
        <Title>{loggedIn ? "Ihr Konto" : "Anmelden"}</Title>
        <Paragraph>
          Hallo {userInformation.LogInData.firstName}{" "}
          {userInformation.LogInData.lastName}
        </Paragraph>
        <Paragraph>
          Deine E-Mail ist {userInformation.LogInData.email}
        </Paragraph>
        <LogoutButton
          className="black-color white-orange "
          onClick={handleClick}
        >
          test
        </LogoutButton>
      </Card>
    </Container>
  );
}
