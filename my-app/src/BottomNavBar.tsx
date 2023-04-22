import { Link } from "react-router-dom";
import {
  HouseLine,
  ShoppingBagOpen,
  ShoppingCart,
  ClockCounterClockwise,
  AddressBook,
} from "phosphor-react";
import { BottomNavStyle } from "./BottomNavBar.styles";

function BottomNavBar(): JSX.Element {
  return (
    <BottomNavStyle>
      <nav>
        <div className="navigation bottom-nav">
          <ul className="menu">
            <li>
              <Link to="/">
                <HouseLine size={40} weight="fill" />
              </Link>
            </li>
            <li>
              <Link to="/Produkte">
                <ShoppingBagOpen size={40} weight="fill" />
              </Link>
            </li>
            <li>
              <Link to="/Bestellung">
                <ShoppingCart size={40} weight="fill" />
              </Link>
            </li>
            <li>
              <Link to="/Unsere Geschichte">
                <ClockCounterClockwise size={40} weight="fill" />
              </Link>
            </li>
            <li>
              <Link to="/Kontakt">
                <AddressBook size={40} weight="fill" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </BottomNavStyle>
  );
}
export default BottomNavBar;
