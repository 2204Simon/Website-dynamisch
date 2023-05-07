import { Link } from "react-router-dom";
import {
  HouseLine,
  ShoppingBagOpen,
  ShoppingCart,
  User,
  SignIn,
} from "phosphor-react";
import { BottomNavStyle } from "./BottomNavBar.styles";
import { useLoggedIn } from "../globalVariables/loggedin";
import { useSelector } from "react-redux";
import { CartState } from "../redux/types";
import { Badge } from "@mui/material";

function BottomNavBar(): JSX.Element {
  const { loggedIn } = useLoggedIn();
  const cartItems = useSelector(
    (state: { cart: CartState }) => state.cart.cartItems
  );
  const arrayLength = cartItems.length;
  return (
    <BottomNavStyle>
      <nav>
        <div className="navigation bottom-nav">
          <ul className="menu">
            <li>
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <HouseLine size={30} />
              </Link>
            </li>
            <li>
              <Link to="/Produkte" onClick={() => window.scrollTo(0, 0)}>
                <ShoppingBagOpen size={30} />
              </Link>
            </li>
            <li>
              <Link to="/Bestellung" onClick={() => window.scrollTo(0, 0)}>
                <ShoppingCart size={30} />
                <Badge badgeContent={arrayLength} color="error" />
              </Link>
            </li>
            <li>
              {" "}
              {loggedIn ? (
                <Link to="/LoggedIn" onClick={() => window.scrollTo(0, 0)}>
                  <User size={30} />
                </Link>
              ) : (
                <Link to="/SignUp">
                  <SignIn size={30} onClick={() => window.scrollTo(0, 0)} />
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </BottomNavStyle>
  );
}
export default BottomNavBar;
