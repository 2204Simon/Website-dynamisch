import React from "react";
import { useSelector } from "react-redux";
import { UserDataState } from "./redux/types";

function Test(): JSX.Element {
  const user = useSelector((state: { user: UserDataState }) => state.user);
  return (
    <>
      <h1>test</h1>
      <p>email</p>
      <h1>{user.LogInData.email}</h1>
      <p>firstname</p>
      <h1>{user.LogInData.firstName}</h1>
      <p>lastame</p>
      <h1>{user.LogInData.lastName}</h1>
      <p>password</p>
      <h1>{user.LogInData.password}</h1>
    </>
  );
}

export default Test;
