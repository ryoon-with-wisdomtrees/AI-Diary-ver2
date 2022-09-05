import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";

import Store from "./app/Store";
import { Provider } from "react-redux";

//components
import Tutorial from "./pages/diary/NewTutorial";
import Dali from "./pages/diary/Dali";
import Home from "./pages/Home";

//social
import KakaoCallBack from "./pages/user/KakaoCallBack";
import SocialSignup from "./pages/user/SocialSignup";

//pages
import DiaryCreate from "./pages/diary/DiaryCreate";
import DiaryView from "./pages/diary/DiaryView";
import DiaryUpdate2 from "./pages/diary/DiaryUpdate2";
import DiaryList from "./pages/diary/DiaryList";
import styled from "styled-components";
import DiaryNav from "./components/DiaryNav";
import DiaryBar from "./components/DiaryBar";
import LoginNew from "./pages/LoginNew";
import DiaryOtherList from "./pages/diary/DiaryOtherList";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  // console.log(cookies.userData);

  return (
    <Provider store={Store}>
      <Router>
        <MainWrapper id="mainwrapper">
          <PageWrap id="pagewrap">
            <DiaryBar id="diarybar" />
            <div className="diaryMain__Page" id="diaryMain_page">
              <Routes>
                <Route path="/" element={<LoginNew />} />
                <Route path="oauth">
                  <Route path="kakao/callback" element={<KakaoCallBack />} />
                  <Route path="signUp" element={<SocialSignup />} />
                </Route>
                <Route path="diary">
                  {/** 첫로그인후 메인 home */}
                  <Route path="home" element={<Home />} />
                  {/** 일기장 작성 튜토리얼 페이지 */}
                  <Route path="tutorial" element={<Tutorial />} />
                  {/**글작성 */}
                  <Route path="dali" element={<Dali />} />
                  {/**달리 */}
                  <Route path="write" element={<DiaryCreate />} />
                  <Route path="diaryList" element={<DiaryList />} />{" "}
                  <Route path="other" element={<DiaryOtherList />} />
                  <Route path=":id">
                    <Route path="diaryView" element={<DiaryView />} />
                    <Route path="diaryUpdate" element={<DiaryUpdate2 />} />
                    <Route path="getOtherList" element={<DiaryList />} />{" "}
                  </Route>
                </Route>
              </Routes>
            </div>
            <DiaryNav id="diarynav" />
          </PageWrap>
        </MainWrapper>
      </Router>
    </Provider>
  );
}

const MainWrapper = styled.div`
  /* border: 1px solid #000000; */
  width: 100vw;
  height: 100vh;
  background-color: #ece6cc;
`;

const PageWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
  z-index: 2;
`;

export default App;
