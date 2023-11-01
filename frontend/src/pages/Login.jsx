import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Authenticate/action";
import styled from "styled-components";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
 
  const { isAuth, isError } = useSelector((store) => {
    return {
      isAuth: store.authReducer.isAUTH,
      isError: store.authReducer.isError,
    };
  }, shallowEqual);

  const handleLogin = () => {
    const userData = {
      email,
      password,
    };
    dispatch(login(userData)).then((res) => {
      console.log(res);
    });
  };
  return (
    <DIV isAuth={isAuth.toString()} isError={isError.toString()}>
      <h2>{isAuth ? "LOGIN SUCCESS" : "Login to continue"}</h2>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name=""
        placeholder="email"
        value={email}
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        name=""
        placeholder="password"
        value={password}
      />
      <button onClick={handleLogin}>Login</button>
    </DIV>
  );
};

const DIV = styled.div`
  width: 400px;
  margin: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  input {
    height: 40px;
    font: larger;
    border: ${({ isAuth }) =>
      isAuth === "false" ? "1px solid red" : "1px solid green"};
  }
  h2 {
    color: ${({ isAuth }) => (isAuth === "true" ? "green" : "red")};
  }
  button {
    height: 35px;
    border: none;
    cursor: pointer;
  }
`;
