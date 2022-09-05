import React from "react";
import { useEffect, useState } from "react";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectLoginPgState,
  selectSignUpPgState,
} from "./../app/reducer/userSlice";
import "./../styles/Login.css";
import SignInForm from "./user/SignInForm";
import SignUpForm from "./user/SignUpForm";

const Login = () => {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  const isLoginPg = useSelector(selectLoginPgState);
  const isSignUpPg = useSelector(selectSignUpPgState);
  // 로그인 입력받을 데이터 props로 넘겨줌
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  //회원가입 입력받을 데이터를 props로넘겨줌
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    rePassword: "",
    name: "",
  });

  const onChangeSignInData = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeSignUpData = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  // 로그인 상태일 때,/diary/home로 리다이렉트
  useEffect(() => {
    if (cookies.userData === undefined) {
      console.log(cookies.userData);
      navigate("/");
    } else {
      console.log(cookies.userData);
      navigate("/diary/home");
    }
  }, [cookies]);
  return (
    <div className="login__main">
      {isLoginPg === true ? (
        <SignInForm
          signInData={signInData}
          setSignInData={setSignInData}
          onChangeSignInData={onChangeSignInData}
        />
      ) : isSignUpPg === true ? (
        <SignUpForm
          signUpData={signUpData}
          setSignUpData={setSignUpData}
          onChangeSignUpData={onChangeSignUpData}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Login;
