import { Link } from "react-router-dom";
import {
  HouseLine,
  ShoppingBagOpen,
  ShoppingCart,
  ClockCounterClockwise,
  AddressBook,
} from "phosphor-react";

function BottomNavBar(): JSX.Element {
  return (
    <nav>
      <div className="navigation bottom-nav">
        <input type="checkbox" className="toggle-menu" />
        <div className="hamburger"></div>
        <ul className="menu">
          <li>
            <Link to="/">
              <HouseLine size={24} weight="fill" />
            </Link>
          </li>
          <li>
            <Link to="/Produkte">
              <ShoppingBagOpen size={24} weight="fill" />
            </Link>
          </li>
          <li>
            <Link to="/Bestellung">
              <ShoppingCart size={24} weight="fill" />
            </Link>
          </li>
          <li>
            <Link to="/Unsere Geschichte">
              <ClockCounterClockwise size={24} weight="fill" />
            </Link>
          </li>
          <li>
            <Link to="/Kontakt">
              <AddressBook size={24} weight="fill" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default BottomNavBar;
