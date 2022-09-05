import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import url from "./../../data/port.json";
import { useCookies } from "react-cookie";

//modal
import Modal from "./Modal";
import RabbitKv from "../../img/DiaryRabbitKV.svg";
import styled from "styled-components";

//Redux
import { useDispatch } from "react-redux";
import { setDiaryDataDetails } from "./../../app/reducer/diarySlice";
import "./../../styles/DiaryView.css";

const DiaryView = () => {
  //modal
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const dispatch = useDispatch(); //action을 사용하기위해 보내주는 역할
  const params = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [currntDiary, setCurrentDiary] = useState({});
  const emotions = [
    "😁 I feeel goood",
    "😂 oh, That's so funny",
    "😫 what shooooda do?!",
    "😒 unpleasant, boring",
    "😤 how dare you",
    "😡 angry",
    "🤯 I wanna get outta here...",
    "💖 love",
    "🤕 not in a good condition",
    "💙 I feeel blue",
  ];
  //console.log(emotions);
  const navigate = useNavigate();

  useEffect(() => {
    getDiaryView(params.id).then((res) => {
      console.log(res.data);
      setCurrentDiary(res.data);
    });
  }, [params]);

  const getDiaryView = async () => {
    return await axios.get(url.url + `/diary/${params.id}/view`, {
      headers: {
        accessToken: cookies.userData.accessToken,
      },
    });
  };
  const onChangeDiary = (e) => {
    setCurrentDiary({
      ...currntDiary,
      [e.target.name]: e.target.value,
    });
  };

  const deleteDiary = async () => {
    return await axios.get(url.url + `/diary/${params.id}/delete`, {
      headers: {
        accessToken: cookies.userData.accessToken,
      },
    });
  };

  const onClickDeleteButton = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      deleteDiary(params.id)
        .then((res) => {
          alert("삭제가 완료됐습니다.");
          navigate("/diary/home");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      return;
    }
  };

  const onClickUpdateButton = () => {
    console.log(params.id);
    dispatch(setDiaryDataDetails(params.id));
    navigate(`/diary/${params.id}/diaryUpdate`);
  };

  return (
    <div className="diaryViewPaper">
      <div className="diaryView_content">
        <div className="diaryView">
          <div className="diaryView__container">
            <form>
              <div className="diaryView__nonDalle">
                <div className="setion0">
                  <div className="">
                    작성일 : &nbsp;{currntDiary.createdDate}
                  </div>
                </div>
                <div className="setion1">
                  <div className="">
                    <label htmlFor="inputEmail4">작성자&nbsp;&nbsp;</label>
                    <input
                      type="text"
                      className="author"
                      id="author"
                      name="author"
                      value={currntDiary.author}
                      style={{ width: "30%" }}
                      readOnly
                      disabled
                    />
                    <input
                      type="title"
                      className="form-control"
                      id="user_id"
                      name="user_id"
                      value={currntDiary.user_id}
                      hidden
                    />
                    <label htmlFor="inputPassword4">
                      &nbsp;&nbsp;제목 &nbsp;&nbsp;
                    </label>
                    <input
                      type="title"
                      className="title"
                      id="title"
                      name="title"
                      value={currntDiary.title}
                      readOnly
                      disabled
                    />
                  </div>
                </div>
                <div className="setion2">
                  <div className="text">Ai 태그</div>
                  <div className="tags">
                    <input
                      type="text"
                      id="tag1"
                      name="tag1"
                      value={currntDiary.tag1}
                      required
                      readOnly
                      disabled
                    />

                    <input
                      type="text"
                      id="tag2"
                      name="tag2"
                      value={currntDiary.tag2}
                      required
                      readOnly
                      disabled
                    />

                    <input
                      type="text"
                      id="tag3"
                      name="tag3"
                      value={currntDiary.tag3}
                      required
                      readOnly
                      disabled
                    />
                  </div>
                </div>
                <div className="setion3">
                  <div className="text">이날의 감정</div>
                  <div className="selectBox">
                    <select
                      className="select"
                      name="emotion"
                      id="emotion"
                      value={currntDiary.emotion}
                      required
                      readOnly
                      disabled
                    >
                      <option value="">
                        {/* {currntDiary.emotion} */}
                        {emotions.find((item, index) => {
                          if (index + 1 === currntDiary.emotion) {
                            return (
                              <option value={index + 1}>emotions[item]</option>
                            );
                          }
                        })}
                      </option>
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
                  <textarea
                    className=""
                    id="content"
                    rows="3"
                    name="content"
                    value={currntDiary.content}
                    onChange={onChangeDiary}
                    readOnly
                    disabled
                  ></textarea>
                </div>
                <div className="setion5">
                  <button
                    type="button"
                    className=""
                    // style={{ marginRight: "2%" }}
                    onClick={onClickUpdateButton}
                  >
                    수정하기
                  </button>
                  <button
                    type="button"
                    className=""
                    onClick={() => {
                      window.history.back();
                    }}
                  >
                    뒤로가기
                  </button>
                  <button
                    type="button"
                    className=""
                    onClick={() => {
                      onClickDeleteButton(params.id);
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <div className="diaryView__dalle">
                <div className="diaryView__dalle_img">
                  <img
                    src={`data:image/jpeg;base64,${currntDiary.img_url}`}
                    alt=""
                  />
                  <div className="diaryView__dalle_text">Ai based Image</div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <DiaryRabbitKV>
          <DiaryRabbitButton onClick={openModal} >
            <img src={RabbitKv}/>
          </DiaryRabbitButton>
          <Modal open={modalOpen} close={closeModal} header="Diary List" />
        </DiaryRabbitKV>
      </div>
      
    </div>
    
  );
};

//modal style css
const DiaryRabbitKV = styled.div`
  // border: 1px solid #000000;
  // display: absolute;
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-start;
  /* background: #BC9F84; */
  // width: 25%;
  // height: 20%;
  // top: 80%;
  // z-index: 9999;
  // img {
  //   width: 100%;
  // }
`;
const DiaryRabbitButton = styled.button`
  border: 0;
  outline: 0;
  cursor: pointer;
  //버튼색 투명하게
  background-color:transparent;
  position: absolute;
  // width: 17%;
  height: 25%;
  // height: 300px; width값에 자동으로 원본 사이즈 조정
  // top: 69%; 우리 다이어리 웹의 기준이 바닥에 있기 때문에 반응형을 바닥을 중심으로 잡았다.
  bottom: 1%;
  left: 60%;
  // z-index: 9999;
  img {
    width: 100%;
    height: 100%
  }
`

export default DiaryView;
