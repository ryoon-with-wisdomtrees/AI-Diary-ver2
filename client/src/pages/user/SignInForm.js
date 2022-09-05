import $ from "jquery";
import axios from "axios";
import port from "./../../data/port.json";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useCookies } from "react-cookie";
import "./../../styles/SignInForm.css";
const SignInForm = ({ signInData,setSignInData, onChangeSignInData }) => {
  
  useEffect(() => {
    if (cookies.userData === undefined) {
      setSignInData({
        email:"",
        password:"",
      })
      //console.log(cookies.userData);
      navigate("/");
    } else {
      //console.log(cookies.userData);
      navigate("/diary/home");
      
    }
  }, []);
  
  
  
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["userData"]);
  const [errorMessage, setErrorMessage] = useState("");
  const onClickLoginButton = () => {
    if (signInData.email === "") {
      alert("이메일을 입력해주세요");
      $("#email").focus();
      return;
    } else if (signInData.password === "") {
      alert("비밀번호를 입력해주세요");
      $("#password").focus();
      return;
    }

    sendSignInData()
      .then((res) => {
        console.log(res);
        alert("로그인이 완료됐습니다.");
        setCookie("userData", res.data, { path: "/" });
        navigate("/diary/home");
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage(e.response.data.fail);
      })
      .finally(() => {
        console.log(cookies);
      });
  };

  const sendSignInData = async () => {
    return await axios.post(`${port.url}/user/login`, signInData);
  };

  return (
    <div className="siginIn_form">
      <div>
        <form>
          <div>
            <label htmlFor="email" className="form-label">
              
            </label>
          
            <input
              size='30'
              placeholder="Email address" 
              type="email"
              value={signInData.email}
              onChange={onChangeSignInData}
              className="siginIn_form-input"
              name="email"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <p></p>
          <div>
            <label htmlFor="password" className="form-label">
              
            </label>
          
            <input
              size='30'
              placeholder="Password" 
              type="password"
              value={signInData.password}
              onChange={onChangeSignInData}
              name="password"
              className="siginIn_form-input"
              id="password"
            />
          </div>
          <div>
            <span className="text-danger">{errorMessage}</span>
          </div>
          <p></p>
          <button
            type="button"
            onClick={onClickLoginButton}
            className="siginIn_form-button"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;