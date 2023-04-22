import React from "react";
import { useSelector } from "react-redux";
import { CartState, UserDataState } from "./redux/types";
import SignInTest from "./testLogIn";

function Test(): JSX.Element {
  const user = useSelector((state: { user: UserDataState }) => state.user);
  const cartItems = useSelector(
    (state: { cart: CartState }) => state.cart.cartItems
  );

  if (cartItems === undefined) {
    console.log(cartItems);
    return <div>Loading...</div>;
  }
  console.log(cartItems);

  return (
    <>
      <h1>test cartArray</h1>
      {cartItems.map((item, index) => (
        <p key={index}>{item.produktname}</p>
      ))}
      <h1>test LogInData</h1>
      <p>email</p>
      <h1>{user.LogInData.email}</h1>
      <p>firstname</p>
      <h1>{user.LogInData.firstName}</h1>
      <p>lastame</p>
      <h1>{user.LogInData.lastName}</h1>
      <p>password</p>
      <h1>{user.LogInData.password}</h1>
      <SignInTest />
    </>
  );
}

export default Test;
