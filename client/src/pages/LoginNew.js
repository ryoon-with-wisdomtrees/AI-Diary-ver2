import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Login from "./Login";
import RabbitKVSrc from "./../img/DiaryRabbitKV.svg";
const LoginNew = () => {
  const navigate = useNavigate();
  //view를 변경하기 위한 유즈스테이트
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
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
    <Wrapper id="wrapper">
      <Temp id="temp">
        <LoginNewFixedKV id="LoginNewFixedKV">
          <RabbitKv id="RabkkitKv">
            <img src={RabbitKVSrc} alt="" />
          </RabbitKv>
          <AiDiaryBox id="AiDiaryBox">
            <AiText>ai-diary</AiText>
            <BottomThreeLines />
            <BottomThreeLines />
            <BottomThreeLines />
          </AiDiaryBox>
        </LoginNewFixedKV>
        <Login />
        <DiaryHandleContainer2 />
        <DiaryHandleContainer3 />
      </Temp>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* border: 2px solid red; */
  border-radius: 2.5em 2.5em 0em 0em;
  background: #836a54;
  box-shadow: inset 5px 5px 8px #735d4a, inset -5px -5px 8px #93775e;
  position: relative;
  margin-left: -1.9em;
  padding: 0;
  bottom: 0%;
  width: 100%;
  height: 100%;
`;

const Temp = styled.div`
  /* border: 2px solid orange; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RabbitKv = styled.div`
  /* border: 1px solid brown; */
  position: absolute;
  z-index: 9999;
  width: 10vmin;
  margin-top: 0.1vmin;
  margin-left: -1.875vmin;
  img {
    width: 100%;
  }
`;
const LoginNewFixedKV = styled.div`
  /* border: 2px solid yellow; */
  /* top: 0px; */
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
`;

const AiDiaryBox = styled.div`
  /* border: 1px solid blue; */
  /* margin-top: 40px; */
  margin-top: 5vmin;
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AiText = styled.div`
  width: 100%;
  height: 22vmin;
  font-size: 10vmin;
  font-weight: bold;
  background: #d9d9d9;
  box-shadow: inset 5px 5px 10px #bbbbbb, inset -5px -5px 10px #f7f7f7;
  text-align: center;
`;
const BottomThreeLines = styled.div`
  margin-top: 0.625em;
  width: 100%;
  height: 3%;
  background-color: #d9d9d9;
`;

const DiaryHandleContainer2 = styled.div`
  /* border: 1px solid #000000; */
  position: absolute;
  width: 30vmin;
  height: 23vmin;
  margin-top: 40vmin;
  right: -0px;
  background: #774a20;
  border-radius: 3.125em 0em 0em 3.125em;
  z-index: 9999;
  a {
    width: 70%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: #774a20;
    border-radius: 0em 3.125em 3.125em 0em;
    box-shadow: rgb(0 0 0/50%) 0em 0em 1.125em 0em;
    &:hover {
      background: #492a0d;
      opacity: 1;
    }
  }
`;
const DiaryHandleContainer3 = styled.div`
  /* border: 1px solid #000000; */
  position: absolute;
  width: 25vmin;
  height: 23vmin;
  margin-top: 40vmin;
  right: -1.92em;
  background: #5f462f;
  z-index: 9995;
`;

export default LoginNew;
