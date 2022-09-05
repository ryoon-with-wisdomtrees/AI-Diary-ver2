import './HoriScrollList.css'
// import Cards from "./Cards";

import React, { useState } from "react";
import axios from "axios";
import { useEffect, useLayoutEffect } from "react";
import { Link, NavLink, Routes, Route, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import url from "./../../data/port.json";
import carroticon from "../../img/carroticon.png"

const HoriScrollList = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [diaryList, setDiaryList] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth()+1)
  
  const [reload, setReload] = useState(true);
  //  const user_id = cookies.userData.user_id;
  //갯수 잘 가져오는지 확인  
  console.log(diaryList);

  useEffect(() => {
    if (cookies.userData === undefined) {
      console.log(cookies.userData);
      navigate("/");
    } else {
      getDiaryList(cookies.userData.user_id,month).then((res) => {
        
      });
    }
  }, [reload]);

  //console.log(cookies.userData);

  const getDiaryList = async (user_id,month) => {
    console.log(month)
    return await axios
      .get(url.url + `/diary/${user_id}/${month}/getModalList`, {
        headers: {
          accessToken: cookies.userData.accessToken,
        },
      })
      .then((res) => {
        setDiaryList(res.data.diaries);
        setMonth(month); 
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        navigate("/");
      });
      
      //setReload(!reload)
  };

  return(
    <div className="wrap">
      <div aria-label="Page navigation example">
        <div className="pagination">{month-1<1?(<>다음달 없음</>):
          (<button className="page-item-notnow"><a className="page-link" onClick={()=>{getDiaryList(cookies.userData.user_id,month-1)}}>{month-1}월</a></button>)}
          <div className="page-item"><a className="page-link" >{month}월</a></div>
          {month+1>12?(<>다음달 없음</>):<button className="page-item-notnow"><a className="page-link" onClick={()=>{getDiaryList(cookies.userData.user_id,month+1)}}>{month+1}월</a></button>}
        </div>
      </div>
      <div className="scroll__wrap">
        <div className="modal_card_list_container">  
            {diaryList &&
              diaryList.map((it, index) => (
                // <div className="col" key={index}>
                //   <div className="card shadow-sm">
                <div className="modal_card_container" key={index}>
                  <div className="modal_img_pod">
                    <img className="carroticon" src={carroticon} />
                  </div> 
                  <div className="modal_cards_form">
                    <div className="card-body">
                      <h2
                        className="modal_card_date"
                      >
                        {it.createdDate} 
                      </h2>
                      <h1
                        className="modal_card-title"
                        onClick={() => {
                          navigate(`/diary/${it.shortId}/diaryView`);
                        }}
                      >
                        {it.title}
                      </h1>
                      <button className='modal_cards_btn' onClick={() => {
                            navigate(`/diary/${it.shortId}/diaryView`, {replace: true});
                          }}>Read more
                      </button>
                      
                      {/* <p className="card-text">
                        {it.content.substring(0, it.content.length / 2)}
                        <a
                          onClick={() => {
                            navigate(`/diary/${it.shortId}/diaryView`);
                          }}
                        >
                          &nbsp;&nbsp;&nbsp;...상세보기
                        </a>
                      </p> */}
                      {/* <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button
                            type="button"
                            onClick={() => {
                              onClickDeleteButton(it.shortId);
                            }}
                            className="btn btn-sm btn-outline-secondary"
                          >
                            삭제
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onClickUpdateButton(it.shortId);
                            }}
                            className="btn btn-sm btn-outline-secondary"
                          >
                            수정
                          </button>
                        </div>
                        <small className="text-muted">9 mins</small>
                      </div> */}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* <ul class="pagination">
        {
      (month-1)<1?(<></>):(<><li className="page-item">
      <a className="page-link" aria-label="Previous" onClick={()=> getDiaryList(cookies.userData.user_id,month-1)}>
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li className="page-item"><a className="page-link" >{month-1}</a></li></>)
    }
    <li class="page-item"><a class="page-link" onClick={()=>{getDiaryList(cookies.userData.user_id,month-1)}}>저번달</a></li>
    <li class="page-item"><a class="page-link" href="#">{month}</a></li>
    <li class="page-item"><a class="page-link" href="#">다음달</a></li>
  </ul> */}
        </div>
    </div>
    
    )
}

export default HoriScrollList;

// import './HoriScrollList.css'
// // import Cards from "./Cards";

// import React, { useState } from "react";
// import axios from "axios";
// import { useEffect, useLayoutEffect } from "react";
// import { Link, NavLink, Routes, Route, useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import url from "./../../data/port.json";
// import carroticon from "../../img/carroticon.png"

// const HoriScrollList = () => {
//   const navigate = useNavigate();
//   const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
//   const [diaryList, setDiaryList] = useState([]);
  
//   const [reload, setReload] = useState(true);
//   //  const user_id = cookies.userData.user_id;
//   //갯수 잘 가져오는지 확인  
//   console.log(diaryList);

//   useEffect(() => {
//     if (cookies.userData === undefined) {
//       console.log(cookies.userData);
//       navigate("/");
//     } else {
//       getDiaryList(cookies.userData.user_id).then((res) => {
//         console.log(res);
//       });
//     }
//   }, [reload]);

//   console.log(cookies.userData);

//   const getDiaryList = async (user_id) => {
//     return await axios
//       .get(url.url + `/diary/${user_id}/getModalList`, {
//         headers: {
//           accessToken: cookies.userData.accessToken,
//         },
//       })
//       .then((res) => {
//         setDiaryList(res.data.diaries);
//         console.log(res);
//       })
//       .catch((e) => {
//         console.log(e);
//         navigate("/");
//       });
//   };

//   return(
//     <div className="wrap">
//       <div className="scroll__wrap">
//         <div className="modal_card_list_container">  
//             {diaryList &&
//               diaryList.map((it, index) => (
//                 // <div className="col" key={index}>
//                 //   <div className="card shadow-sm">
//                 <div className="modal_card_container" key={index}>
//                   <div className="modal_img_pod">
//                     <img className="carroticon" src={carroticon} />
//                   </div> 
//                   <div className="modal_cards_form">
//                     <div className="card-body">
//                       <h2
//                         className="modal_card_date"
//                       >
//                         {it.createdDate} 
//                       </h2>
//                       <h1
//                         className="modal_card-title"
//                         onClick={() => {
//                           navigate(`/diary/${it.shortId}/diaryView`);
//                         }}
//                       >
//                         {it.title}
//                       </h1>
//                       <button className='modal_cards_btn' onClick={() => {
//                             navigate(`/diary/${it.shortId}/diaryView`, {replace: true});
//                           }}>Read more
//                       </button>
                      
//                       {/* <p className="card-text">
//                         {it.content.substring(0, it.content.length / 2)}
//                         <a
//                           onClick={() => {
//                             navigate(`/diary/${it.shortId}/diaryView`);
//                           }}
//                         >
//                           &nbsp;&nbsp;&nbsp;...상세보기
//                         </a>
//                       </p> */}
//                       {/* <div className="d-flex justify-content-between align-items-center">
//                         <div className="btn-group">
//                           <button
//                             type="button"
//                             onClick={() => {
//                               onClickDeleteButton(it.shortId);
//                             }}
//                             className="btn btn-sm btn-outline-secondary"
//                           >
//                             삭제
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => {
//                               onClickUpdateButton(it.shortId);
//                             }}
//                             className="btn btn-sm btn-outline-secondary"
//                           >
//                             수정
//                           </button>
//                         </div>
//                         <small className="text-muted">9 mins</small>
//                       </div> */}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>

//         </div>
// {/* 
//         <Routes>
//           <Route path=/diary/${it.shortId}/diaryView` />
//         </Routes> */}
//     </div>
//     )
// }

// export default HoriScrollList;