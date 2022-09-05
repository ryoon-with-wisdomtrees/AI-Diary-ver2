import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import url from "../../data/port.json";
import "./../../styles/DiaryOtherList.css";
import RabbitKVSrc from "./../../img/DiaryRabbitKV.svg";

//modal
import Modal from "./Modal";
import RabbitKv from "../../img/DiaryRabbitKV.svg";
import styled from "styled-components";

const DiaryOhterList = () => {

  //modal
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [diaryList, setDiaryList] = useState([]);
  const [userId, setUserId] = useState("");
  const [page, setPage] = useState({
    page: 1, //현재 보고있는 페이지 번호
    totalPage: 0, //전체 페이지 수
  });
  // const [reload, setReload] = useState(true);
  useEffect(() => {
    if (cookies.userData === undefined) {
      navigate("/");
    } else {
      getDiaryList(cookies.userData.user_id, page.page).then((res) => {});
      setUserId(cookies.userData.user_id);
    }
  }, []);

  const getDiaryList = async (my_id, temPage) => {
    console.log(my_id);
    return await axios
      .get(url.url + `/diary/${my_id}/getOtherList?page=${temPage}&perPage=6`, {
        headers: {
          accessToken: cookies.userData.accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        // let checkcehck = JSON.stringfy(res);
        // console.log(checkcehck);
        let ttp = res.data.totalPage;
        console.log(ttp);
        setDiaryList(res.data.diaries);
        setPage({
          page: temPage,
          totalPage: ttp,
        });
      })
      .catch((e) => {
        console.log(e);
        navigate("/");
      });
  };
  const onClickPagination = (page) => {
    getDiaryList(userId, page);
  };

  return (
    <div className="diaryOtherList_paper">
      <div className="diaryOtherList_paper_content">
        <main className="diaryOtherList">
          {diaryList !== null &&
          (diaryList !== undefined) & (diaryList !== 0) ? (
            diaryList &&
            diaryList.map((it, index) => (
              <div className="" key={index}>
                <div className="mini-posts">
                  <article className="mini-post">
                    <header>
                      <h3>
                        <a
                          className="mini-post-title"
                          onClick={() => {
                            navigate(`/diary/${it.shortId}/diaryView`);
                          }}
                        >
                          <span style={{ fontSize: "bold", color: "#604e2e" }}>
                            &nbsp;{it.author} &nbsp;
                          </span>
                          <span>&nbsp; {it.title.substring(0, 7)}...</span>
                        </a>
                      </h3>
                      <time className="published" dateTime={it.created_at}>
                        {/* {it.createdDate} */}
                        {it.createdDate.substring(0, it.createdDate.length / 2)}
                      </time>
                      <a
                        onClick={() => {
                          navigate(`/diary/${it.shortId}/diaryView`);
                        }}
                        className="author"
                      >
                        <img
                          className="diaryOtherList_RabbitKVSrc"
                          src={RabbitKVSrc}
                          alt=""
                        />
                      </a>
                    </header>
                    <a
                      onClick={() => {
                        navigate(`/diary/${it.shortId}/diaryView`);
                      }}
                      className="image"
                    >
                      <img
                        src={`data:image/jpeg;base64,${it.img_url}`}
                        alt=""
                        style={{ width: "100%", overflow: "hidden" }}
                      />
                    </a>
                  </article>
                </div>
              </div>
            ))
          ) : (
            <div>아직 게시글이 없습니다 😢</div>
          )}
        </main>
        <div style={{ textAlign: "center" }} className="diaryOtherList_ul">
          <nav
            aria-label="Page navigation example"
            style={{ display: "inline-block" }}
          >
            <ul className="">
              {page.page - 1 < 1 ? (
                <></>
              ) : (
                <>
                  <li className="">
                    <a
                      className=""
                      aria-label="Previous"
                      onClick={() => onClickPagination(page.page - 1)}
                    >
                      &laquo;
                    </a>
                  </li>
                  <li className="">
                    <a
                      className=""
                      onClick={() => onClickPagination(page.page - 1)}
                    >
                      {page.page - 1}
                    </a>
                  </li>
                </>
              )}

              <li className="">
                <a className="" onClick={() => onClickPagination(page.page)}>
                  {page.page}
                </a>
              </li>
              {page.page + 1 > page.totalPage ? (
                <></>
              ) : (
                <>
                  <li className="">
                    <a
                      className=""
                      onClick={() => onClickPagination(page.page + 1)}
                    >
                      {page.page + 1}
                    </a>
                  </li>
                  <li className="">
                    <a
                      className=""
                      aria-label="Next"
                      onClick={() => onClickPagination(page.page + 1)}
                    >
                      &raquo;
                    </a>
                  </li>
                </>
              )}
            </ul>
          </nav>
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

export default DiaryOhterList;
