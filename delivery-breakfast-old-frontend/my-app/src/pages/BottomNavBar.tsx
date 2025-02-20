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
import { lazy, useEffect, useState, useTransition } from "react";
import { useCookies } from "react-cookie";
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
  const [cookies, setCookie] = useCookies(["cookiesAccepted"]);

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
  }, []);

  return (
    <BottomNavStyle>
      {hasScrolled && load && (
        <nav>
          <div className="navigation bottom-nav">
            <ul className="menu">
              <li>
                <Link
                  to="/"
                  onClick={() => window.scrollTo(0, 0)}
                  aria-label="Link zu Home"
                >
                  <HouseLine size={30} />
                </Link>
              </li>
              <li>
                <Link
                  to="/Produkte"
                  onClick={() => window.scrollTo(0, 0)}
                  aria-label="Link zu Produkte"
                >
                  <ShoppingBagOpen size={30} />
                </Link>
              </li>
              <li>
                <Link
                  to="/Bestellung"
                  onClick={() => window.scrollTo(0, 0)}
                  aria-label="Link zu Bestellung"
                >
                  <ShoppingCart size={30} />
                  <Badge badgeContent={cartLength} color="error" />
                </Link>
              </li>
              <li>
                {loggedIn ? (
                  <Link
                    to="/LoggedIn"
                    onClick={() => window.scrollTo(0, 0)}
                    aria-label="Link zu LoggedIn"
                  >
                    <User size={30} />
                  </Link>
                ) : (
                  <Link
                    to="/SignUp"
                    onClick={() => window.scrollTo(0, 0)}
                    aria-label="Link zu SignUp"
                  >
                    <SignIn size={30} />
                  </Link>
                )}
              </li>
              <LazyChatra />
            </ul>
          </div>
        </nav>
      )}
    </BottomNavStyle>
  );
}

export default BottomNavBar;
