import { Link } from "react-router-dom";
import {
  HouseLine,
  ShoppingBagOpen,
  ShoppingCart,
  ClockCounterClockwise,
  AddressBook,
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
                <HouseLine size={40} />
              </Link>
            </li>
            <li>
              <Link to="/Produkte" onClick={() => window.scrollTo(0, 0)}>
                <ShoppingBagOpen size={40} />
              </Link>
            </li>
            <li>
              <Link to="/Bestellung" onClick={() => window.scrollTo(0, 0)}>
                <ShoppingCart size={40} />
              </Link>
            </li>
            <li>
              <Link
                to="/Unsere Geschichte"
                onClick={() => window.scrollTo(0, 0)}
              >
                <ClockCounterClockwise size={40} />
              </Link>
            </li>
            <li>
              <Link to="/Kontakt" onClick={() => window.scrollTo(0, 0)}>
                <AddressBook size={40} />
              </Link>
            </li>
            <li>
              <AddressBook
                size={40}
                style={{
                  color: "black",
                  background: "black",
                }}
              />
            </li>
          </ul>
        </div>
      </nav>
    </BottomNavStyle>
  );
}
export default BottomNavBar;
