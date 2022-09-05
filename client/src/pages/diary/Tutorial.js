import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import url from "./../../data/port.json";
import "./../../styles/Tutorial.css";

const Tutorial = () => {
  const navigate = useNavigate();
  //view를 변경하기 위한 유즈스테이트

  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  useEffect(() => {
    if (cookies.userData === undefined) {
      console.log(cookies.userData);
      navigate("/");
    } else {
      console.log(cookies);
    }
  }, [cookies]);

  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="tutorial">
      <div className="paper">
        <div className="paper-content">
          {/* <textarea autoFocus>
          Hello world !&#10;Here's a paper textarea tag.
        </textarea> */}
          <div className="paper-text">
            {" "}
            <p>Hello world !&#10;Here's a paper textarea tag.</p>
            <p>튜토리얼 정 안된다면 이걸로 해도 될듯</p>
          </div>
        </div>
      </div>
    </div>
    // <div>tutorial</div>
  );
};

export default Tutorial;
