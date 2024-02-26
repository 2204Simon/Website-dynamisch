import { useDispatch, useSelector } from "react-redux";
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
import { useEffect } from "react";
import { getRequest } from "../../serverFunctions/generelAPICalls";
import { KUNDEN_ID } from "../../globalVariables/global";
import { useCookies } from "react-cookie";
import { CustomToast } from "../general/toast.style";
import { addNewUser } from "../../redux/userReducer";

export default function UserInformation(): JSX.Element {
  const { changeLoggedIn, loggedIn } = useLoggedIn();
  const [cookies, setCookie] = useCookies([KUNDEN_ID]);
  const navigate = useNavigate();
  const userInformation = useSelector(
    (state: { user: UserDataState }) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("cookies", cookies);

        const responsekunde = await getRequest(`/kunde?id=${cookies.kundenId}`);
        dispatch(addNewUser(responsekunde));
      } catch (error) {
        CustomToast.error("Fehler beim Laden der Daten");
      }
    };

    fetchData();
  }, [loggedIn]);

  const handleClick = (): void => {
    console.log("changedlogin");
    setCookie(KUNDEN_ID, "", { path: "/" });
    changeLoggedIn();
    navigate("/SignUp");
  };

  const handleAdminPageClick = (): void => {
    navigate("/admin");
  };
  return (
    <Container>
      <Card>
        <Title>{loggedIn ? "Dein Konto" : "Anmelden"}</Title>
        <Paragraph>
          Hallo {userInformation.LogInData.vorname}{" "}
          {userInformation.LogInData.nachname}
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
        <LogoutButton
          className="black-color white-orange "
          onClick={handleAdminPageClick}
        >
          AdminPage
        </LogoutButton>
      </Card>
    </Container>
  );
}
