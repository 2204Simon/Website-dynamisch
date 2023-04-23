import { Link } from "react-router-dom";
import {
  HouseLine,
  ShoppingBagOpen,
  ShoppingCart,
  ClockCounterClockwise,
  AddressBook,
  User,
} from "phosphor-react";
import { BottomNavStyle } from "./BottomNavBar.styles";
import { colors } from "./pages/general/constants";

function BottomNavBar(): JSX.Element {
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
              </Link>
            </li>
            <li>
              <Link to="/LoggedIn" onClick={() => window.scrollTo(0, 0)}>
                <User size={30} />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </BottomNavStyle>
  );
}
export default BottomNavBar;
