import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./../styles/Home.css";
import bubble from "./../img/bubble.svg";
import jingu2 from "./../img/jingu2.svg";
import styled from "styled-components";
import Typed from "react-typed";
const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies("userData");
  useEffect(() => {
    console.log(cookies);
  }, []);
  const textLines = [
    `Welcome to`,
    `Ai-diary.`,
    `You can easily`,
    `Make your own <br></br> Ai-based Diary.`,
  ];
  return (
    <div className="dali__Home">
      <HomeBubble id="HomeBubble">
        <HomeText id="HomeText">
          <span style={{ fontWeight: "bold", lineHeight: 0.5 }}>
            {" "}
            {/* <Typed
              strings={textLines}
              typeSpeed={100}
              backDelay={100}
              backSpeed={100}
              smartBackspace={true}
              startDelay={300}
              // loop={true}
              // showCursor={true}
            />' */}
            작성이 처음이신가요?
            {/* You can easily Make your own
            <br></br> Ai-based Diary. */}
          </span>

          <button
            type="button"
            className="Homebutton"
            onClick={() => navigate("/diary/tutorial")}
          >
            튜토리얼 보러가기
          </button>
          <button
            type="button"
            className="Homebutton"
            onClick={() => navigate("/diary/write")}
          >
            일기 쓰러가기 🖍
          </button>
        </HomeText>
      </HomeBubble>
      <HomeJingu id="HomeJingu">
        <JinguImg />
      </HomeJingu>
    </div>
  );
};

export default Home;

const HomeBubble = styled.div`
  /* border: 2px solid rgb(255, 46, 46); */
  position: absolute;
  left: 10vmin;
  top: 5vmin;
  z-index: 9995;
  width: 30%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const HomeText = styled.div`
  /* border: 2px solid blue; */
  height: 120%;
  width: 130%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    font-size: 3vmin;
  }
  button {
    font-size: 2vmin;
  }
  background-image: url(${bubble});
  background-size: cover;
  background-position: center;
`;
const HomeJingu = styled.div`
  /* border: 2px solid yellow; */
  position: absolute;
  bottom: 10vmin;
  right: 10vmin;
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const JinguImg = styled.div`
  /* border: 2px solid green; */
  height: 120%;
  width: 100%;
  background-image: url(${jingu2});
  background-size: cover;
  background-position: center;
`;
