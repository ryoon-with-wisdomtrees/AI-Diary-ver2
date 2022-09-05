import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setUserLoginDataDetails } from "./../app/reducer/userSlice";

const DiaryNav = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const dispatch = useDispatch(); //action을 사용하기위해 보내주는 역할
  useEffect(() => {
    if (cookies.userData === undefined) {
      // console.log(cookies.userData);
      navigate("/");
    } else {
      // console.log(cookies.userData);
      navigate("/diary/home");
    }
  }, [cookies]);

  // console.log(cookies.userData);
  //--------------kakao oauth
  const REST_API_KEY = "7d3a56396c0500b913cedacc843ff47a"; //보통은 이런 고유 상수키값은 어떻게 관리하는지, 따로 lock을 걸어두는지. 이게 .env인지.물어볼것
  // const REDIRECT_URI = "http://118.67.131.173:8080/oauth/kakao/callback";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const KAKAO_OAUTH_URI = `https:/kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const onClickLogin = () => {
    dispatch(
      setUserLoginDataDetails({
        isLoginPg: true,
        isSignUpPg: false,
      })
    );
    navigate("/");
  };

  const onClickSignUp = () => {
    dispatch(
      setUserLoginDataDetails({
        isLoginPg: false,
        isSignUpPg: true,
      })
    );
    navigate("/");
  };
  return (
    <Wrapper>
      {cookies.userData ? (
        <>
          <PostItNav1>
            <DiaryNav1 onClick={() => navigate("/")}>main</DiaryNav1>
            <DiaryNav2 onClick={() => navigate("/diary/write")}>
              write
            </DiaryNav2>
            <DiaryNav3 onClick={() => navigate("/diary/tutorial")}>
              tutorial
            </DiaryNav3>
            <DiaryNav4 onClick={() => navigate("/diary/other")}>
              &nbsp;sneak peek 👀
            </DiaryNav4>
            <DiaryHandleContainer>
              <a
                onClick={() => {
                  removeCookie("userData", { path: "/" });
                  navigate("/");
                }}
              >
                LogOut
              </a>
            </DiaryHandleContainer>
          </PostItNav1>
        </>
      ) : (
        <PostItNav2>
          <LoginNav onClick={onClickLogin}>Login</LoginNav>
          <KaKaoLoginNav>
            <a href={KAKAO_OAUTH_URI}>&nbsp;&nbsp;&nbsp; Login with Kakao</a>
          </KaKaoLoginNav>
          <SignUpNav onClick={onClickSignUp}> signUp</SignUpNav>
        </PostItNav2>
      )}
    </Wrapper>
  );
};

export default DiaryNav;
const Wrapper = styled.div`
  /* border: 1px solid #000000; */
  width: 20vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 23px;
  font-weight: bold;
  a {
    color: white;
  }
  z-index: 9995;
`;

const PostItNav1 = styled.div`
  /* border: 1px solid #000000; */
  margin-top: 20%;
  margin-left: -10px;
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 0px;
  padding-left: 0px;
  letter-spacing: 1.42px;
  a {
    text-decoration: none !important;
  }
`;
const PostItNav2 = styled.div`
  /* border: 1px solid #000000; */
  margin-top: 20%;
  margin-left: -10px;
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 0px;
  padding-right: 20px;
  align-items: center;
  letter-spacing: 1.42px;
  a {
    text-decoration: none !important;
  }
`;

const DiaryNav1 = styled.a`
  width: 100%;
  height: 20%;
  border-radius: 0px;
  background: linear-gradient(145deg, #89e73e, #73c234);
  box-shadow: 5px 5px 0px #7acd37, -5px -5px 0px #86e33d;

  margin-bottom: 0.9375em;
  color: white;
  transition: all 0.2% ease 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  &:hover {
    background: #afe783;
    opacity: 1;
  }
`;
const DiaryNav2 = styled.a`
  width: 110%;
  height: 20%;
  margin-bottom: 0.9375em;
  border-radius: 0px;
  background: linear-gradient(145deg, #fe676f, #d5565e);
  box-shadow: 5px 5px 0px #e15b63, -5px -5px 0px #f9656d;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  &:hover {
    background: #ffb1ae;
    opacity: 1;
  }
`;
const DiaryNav3 = styled.a`
  width: 100%;
  height: 20%;
  margin-bottom: 0.9375em;
  border-radius: 0px;
  background: linear-gradient(145deg, #c841f7, #a837d0);
  box-shadow: 5px 5px 0px #b23adb, -5px -5px 0px #c440f3;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  &:hover {
    background: #cd83e7;
    opacity: 1;
  }
`;
const DiaryNav4 = styled.a`
  width: 110%;
  height: 20%;
  margin-bottom: 0.9375em;
  border-radius: 0px;
  background: linear-gradient(145deg, #5897f7, #4a7fd0);
  box-shadow: 5px 5px 0px #4e86db, -5px -5px 0px #5694f3;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  &:hover {
    background: #83abe7;
    opacity: 1;
  }
`;
const DiaryHandleContainer = styled.div`
  /* border: 1px solid #000000; */
  width: 190%;
  height: 60%;
  margin-top: 1em;
  a {
    width: 70%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: #774a20;
    border-radius: 0px 50px 50px 0px;
    box-shadow: rgb(0 0 0/50%) 0px 0px 18px 0px;
    &:hover {
      background: #492a0d;
      opacity: 1;
    }
  }
  z-index: 9999;
  /* justify-content: space-between; */
`;
const LoginNav = styled.a`
  width: 100%;
  height: 10%;
  margin-bottom: 0.9375em;
  border-radius: 0px;
  background: #4fed4c;
  box-shadow: 5px 5px 0px #43c941, -5px -5px 0px #5bff57;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: none;
  &:hover {
    background: #91e58f;
    opacity: 1;
  }
`;
const KaKaoLoginNav = styled.div`
  border-radius: 0px;
  background: #fee500;
  box-shadow: 5px 5px 0px #d8c300, -5px -5px 0px #ffff00;
  width: 100%;
  height: 10%;
  margin-bottom: 0.9375em;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  img {
    width: 100%;
  }
  margin-left: 0%;
  padding-left: 0%;
  &:hover {
    background: #ece393;
    opacity: 1;
  }
`;
const SignUpNav = styled.a`
  width: 100%;
  height: 10%;
  border-radius: 0px;
  background: #a3fffd;
  box-shadow: 5px 5px 0px #8bd9d7, -5px -5px 0px #bbffff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: none;
  &:hover {
    background: #c5ecec;
    opacity: 1;
  }
`;
// const DiaryHandleContainer2 = styled.div`
//   /* border: 1px solid #000000; */
//   width: 190%;
//   height: 30%;
//   margin-top: 5em;
//   margin-left: -30px;
//   z-index: 9999;
//   background: #774a20;
//   border-radius: 50px 0px 0px 50px;
//   a {
//     width: 70%;
//     height: 70%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     text-align: center;
//     background: #774a20;
//     border-radius: 0px 50px 50px 0px;
//     box-shadow: rgb(0 0 0/50%) 0px 0px 18px 0px;
//     &:hover {
//       background: #492a0d;
//       opacity: 1;
//     }
//   }
/* justify-content: space-between; 
`;
// const DiaryHandle = styled.div`;
//   /* margin-top: 20%; */

// `;
