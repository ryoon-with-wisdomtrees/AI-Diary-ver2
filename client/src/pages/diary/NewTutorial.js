import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

 
//modal
import RabbitKv from "../../img/jingu2.svg";
import styled from "styled-components";

import "./../../styles/NewTutorial.css";

import Tooltip from "./Tooltip";

const NewTutorial = () => {

    const navigate = useNavigate();
    const [cookies, ,] = useCookies(["userData"]);

    useEffect(() => {
        if (cookies.userData === undefined) {
          console.log(cookies.userData);
          navigate("/");
        } else {
          console.log(cookies);
        }
      }, [cookies]);

  return (
    <div className="diaryTutoPaper">
      <div className="diaryTutoPaper_content">
        <div className="diaryTuto">
          <div className="diaryTuto__container">
            <form>
            <div className="diaryTutoTitle"><Tooltip message='튜토리얼 페이지 입니다!! 마우스를 궁금한 곳에 올려보세요!!'><span class="tutoHighlight">튜토리얼 페이지&nbsp;</span></Tooltip></div>
              <div className="diaryTuto__nonDalle">
                <div className="setion0">
                  {/* <div className="">오늘날짜: &nbsp;{currentTime}</div> */}
                  <div className="">오늘날짜: 날짜 자동입력&nbsp;</div>
                </div>
                <div className="setion1">
                  <div className="">
                  <Tooltip message="회원님의 Id가 자동 입력됩니다!!"><label htmlFor="inputEmail4">작성자&nbsp;&nbsp;</label></Tooltip>                    
                    <input
                      type="text"
                      className="author"
                      id="author"
                      name="author"
                    //   value={diary.author || ""}
                      placeholder=""
                    //   onChange={onChangeDiary}
                      style={{ width: "30%" }}
                      readOnly
                      disabled
                    />
                    <input
                      type="text"
                      className=""
                      id="user_id"
                      name="user_id"
                    //   value={diary.user_id|| ""}
                    //   onChange={onChangeDiary}
                      hidden
                    />
                    <Tooltip message="제목을 입력해주세요!!">
                    <label htmlFor="inputPassword4">
                    &nbsp;&nbsp;제목&nbsp;&nbsp;</label></Tooltip>
                    <input
                      type="text"
                      className="title"
                      id="title"
                      name="title"
                      placeholder=""
                    //   onChange={onChangeDiary}
                    //   value = {diary.title}
                      disabled
                    />
                  </div>
                </div>
                <div className="setion2">
                  <div className="text"><Tooltip message="일기의 핵심 키워드 3개를 각각 적어주세요!!">오늘의 감정을 태그로 입력하세요.</Tooltip></div>
                  <Tooltip message="한글 단어형식으로 적어주세요!!">
                  <div className="tags">
                    <input
                      type="text"
                      className=""
                      id="tag1"
                      name="tag1"
                    //   onChange={onChangeDiary}
                      placeholder="#tag1"
                      required
                    //   value = {diary.tag1}
                      disabled
                    />

                    <input
                      type="text"
                      className=""
                      id="tag2"
                      name="tag2"
                    //   onChange={onChangeDiary}
                      placeholder="#tag2"
                      required
                    //   value = {diary.tag2}
                      disabled
                    />

                    <input
                      type="text"
                      className=""
                      id="tag3"
                      name="tag3"
                    //   onChange={onChangeDiary}
                      placeholder="#tag3"
                      required
                    //   value = {diary.tag3}
                    disabled
                    />
                    <button
                    type="button"
                    className="aiButton"
                    //   onClick={getPapago}
                    >
                    <Tooltip message="사진이 생성되는 동안 일기를 작성할 수 없습니다!!">AI 이미지 생성</Tooltip>
                    </button>
                  </div></Tooltip>
                </div>
                <div className="setion3">
                  <div className="text"><Tooltip message="일기의 대표되는 감정을 나타내주세요!!">감정지수를 선택하세요.</Tooltip></div>
                  <div className="selectBox">
                    <select
                      className="select"
                      name="emotion"
                      id="emotion"
                    //   onChange={onChangeDiary}
                      required
                    //   value = {diary.emotion}
                      
                    >
                      <option value="">오늘의 감정지수는?</option>
                      <option value="1">😁 I feeel goood</option>
                      <option value="2">😂 oh, That's so funny</option>
                      <option value="3">😫 what shooooda do?!</option>
                      <option value="4">😒 unpleasant, boring</option>
                      <option value="5">😤 how dare you</option>
                      <option value="6">😡 angry</option>
                      <option value="7">🤯 I wanna get outta here...</option>
                      <option value="8">💖 love</option>
                      <option value="9">🤕 not in a good condition</option>
                      <option value="10">💙 I feeel blue</option>
                    </select>
                    <span className="icoArrow">
                      <img
                        src="https://freepikpsd.com/media/2019/10/down-arrow-icon-png-7-Transparent-Images.png"
                        alt=""
                      />
                    </span>
                  </div>
                </div>
                <div className="setion4">
                  <div className="text"><Tooltip message="밑의 공간에서 일기의 본문을 작성해주세요!!">본문</Tooltip></div>
                  <textarea
                    className=""
                    id="content"
                    rows="3"
                    name="content"
                    // onChange={onChangeDiary}
                    // value={diary.content}
                    disabled
                  ></textarea><Tooltip message="일기 본문을 작성해주세요!!"></Tooltip>
                </div>
                <div className="setion5">
                  <div className=""><Tooltip message="일기를 다른 사람에게 공유할지 선택해주세요!!">🔎</Tooltip> </div>
                  <select
                    className=""
                    name="hidden"
                    id="hidden"
                    // onChange={onChangeDiary}
                    required
                    // value={diary.hidden}
                  >
                    <option value="true">숨기기</option>
                    <option value="false">보여주기</option>
                  </select>

                  <button
                    type="button"
                    className=""
                    style={{ marginRight: "2%" }}
                    // onClick={onClickTutoDairy}
                  ><Tooltip message="일기 작성과 사진 생성이 모두 끝났다면 일기를 저장해주세요!!">
                    일기작성완료</Tooltip>
                  </button>
                  <button
                    type="button"
                    className=""
                    // onClick={() => {
                    //   window.history.back();
                    // }}
                  >
                    뒤로가기
                  </button>
                </div>
              </div>
              <div className="diaryTuto__dalle">
                <div className="diaryTuto__dalle_img">
                    <div className="diaryTuto__dalle_none"><Tooltip message="인공지능 Dalle model을 사용해 이미지를 자동생성합니다!! 아직 정확도가 다소 떨어질수 있습니다ㅠㅠ">
                      태그로 생성된 <br></br>ai 이미지를 확인해보세요 !</Tooltip>
                    </div>
                  {/* {dalle ? (
                    <>
                      <img src={`data:image/jpeg;base64,${Base64}`} alt="" />
                      <div className="diaryTuto__dalle_text">
                        ai 이미지 생성 완료!
                      </div>
                    </>
                  ) : (
                    <div className="diaryTuto__dalle_none">
                      태그로 생성된 <br></br>ai 이미지를 확인해보세요 !
                    </div>
                  )} */}
                </div>
              </div>
            </form>
          </div>
        </div>
        <TutoDiaryRabbitKV>
          <TutoDiaryRabbitButton  >
          <Tooltip message='마스코트 "진구"를 통해서 작성한 일기 목록을 확인할 수 있습니다!!'>
            <img src={RabbitKv}/></Tooltip>
          </TutoDiaryRabbitButton>
        </TutoDiaryRabbitKV>
      </div>
    </div>
  );
};

//modal style css
const TutoDiaryRabbitKV = styled.div`
  // border: 1px solid #000000;
//   display: absolute;
//   display: flex;
//   flex-direction: column;
  // justify-content: flex-start;
  /* background: #BC9F84; */
//   width: 25%;
//   height: 20%;
  // top: 80%;
  // z-index: 9999;
  // img {
  //   width: 100%;
  // }
`;
const TutoDiaryRabbitButton = styled.button`
  border: 0;
  outline: 0;
  cursor: pointer;
  //버튼색 투명하게
  background-color:transparent;
  position: absolute;
  width: 20%;
  height: 10%;
  // height: 300px; width값에 자동으로 원본 사이즈 조정
  // top: 69%; 우리 다이어리 웹의 기준이 바닥에 있기 때문에 반응형을 바닥을 중심으로 잡았다.
  bottom: 30%;
  left: 50%;
  // z-index: 9999;
  img {
    width: 60%;
    // height: 100%
  }
`

export default NewTutorial;
