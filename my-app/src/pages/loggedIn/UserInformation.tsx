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
import { useNavigate } from "react-router-dom";

export default function UserInformation(): JSX.Element {
  const { changeLoggedIn, loggedIn } = useLoggedIn();
  const navigate = useNavigate();
  const userInformation = useSelector(
    (state: { user: UserDataState }) => state.user
  );

  const handleClick = (): void => {
    console.log("changedlogin");
    changeLoggedIn();
    navigate("/SignUp");
  };

  return (
    <Container>
      <Card>
        <Title>{loggedIn ? "Dein Konto" : "Anmelden"}</Title>
        <Paragraph>
          Hallo {userInformation.LogInData.firstName}{" "}
          {userInformation.LogInData.lastName}
        </Paragraph>
        <Paragraph style={{ textAlign: "center" }}>
          Deine E-Mail lautet {userInformation.LogInData.email}
        </Paragraph>
        <LogoutButton
          className="black-color white-orange "
          onClick={handleClick}
        >
          Ausloggen
        </LogoutButton>
      </Card>
    </Container>
  );
}
