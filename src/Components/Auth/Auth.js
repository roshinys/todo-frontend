import React, { useState } from "react";
import AuthBox from "../Auth/AuthBox";
import AuthWrapper from "../Auth/AuthWrapper";
import AuthForm from "../Auth/AuthForm";
import styles from "./Auth.module.css";
import { useDispatch } from "react-redux";
import { authUser } from "../../store/auth/auth-action";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginPage, setLoginPage] = useState(false);
  const authHandler = (email, password) => {
    const user = { email, password };
    let url;
    if (loginPage) {
      url = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;
    } else {
      url = `${process.env.REACT_APP_BACKEND_URL}/auth/register`;
    }
    dispatch(authUser(user, url, navigate));
  };
  return (
    <AuthBox>
      <AuthWrapper>
        <h3>{loginPage ? "Login here" : "Register here"}</h3>
        <AuthForm onSubmit={authHandler} />
        <span
          className={styles.redirectInfo}
          onClick={() => {
            setLoginPage((prevState) => !prevState);
          }}
        >
          {loginPage
            ? "Don't Have an acc Register here"
            : "Already have an acc login here"}
        </span>
      </AuthWrapper>
    </AuthBox>
  );
}

export default Auth;
