import { Link, useLocation } from "react-router-dom";
import {
  HouseLine,
  ShoppingBagOpen,
  ShoppingCart,
  User,
  SignIn,
  ChatCircleText,
} from "phosphor-react";
import { BottomNavStyle } from "./BottomNavBar.styles";
import { useLoggedIn } from "../globalVariables/loggedin";
import { useSelector } from "react-redux";
import { CartState } from "../redux/types";
import { Badge } from "@mui/material";
import { lazy, useEffect, useState, useTransition } from "react";
const LazyChatra = lazy(() => import("./Chatra"));

function BottomNavBar(): JSX.Element {
  const { loggedIn } = useLoggedIn();
  const [, startTransition] = useTransition();
  const [load, setLoad] = useState(false);
  const cartItems = useSelector(
    (state: { cart: CartState }) => state.cart.cartItems
  );
  let cartLength = 0;
  cartItems.map(item => (cartLength += item.anzahl));
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = (): void => {
      if (!hasScrolled && window.pageYOffset > 0) {
        setHasScrolled(true);
        startTransition(() => {
          setLoad(true);
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return (): void => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  useEffect(() => {
    setHasScrolled(false);
  }, [location]);

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
                <Badge badgeContent={cartLength} color="error" />
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
            {hasScrolled && load && <LazyChatra />}
          </ul>
        </div>
      </nav>
    </BottomNavStyle>
  );
}
export default BottomNavBar;
