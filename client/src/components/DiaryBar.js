import React from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useEffect } from "react";
const DiaryBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [bg, setBg] = useState("#644e3a");
  useEffect(() => {
    if (!cookies.userData) {
      setBg("#ECE6CC");
    } else {
      setBg("#644e3a");
    }
  }, [cookies]);
  return <Wrapper id="bgwrapper" bg={bg}></Wrapper>;
};
const Wrapper = styled.div`
  /* border: 2px solid black; */
  background: ${(props) => props.bg};
  margin-left: 0;
  width: 5vw;
  height: 100vh;
  border-radius: 0px;
  z-index: 9997;
`;
export default DiaryBar;
