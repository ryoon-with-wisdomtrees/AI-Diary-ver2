import React, { useEffect } from 'react';
import './modal.css';
import HoriScrollList from './HoriScrollList';

const Modal = (props) => {

  //수정필요
  //웹에서는 바깥 스크롤이 작동안되지만, 모바일에서는 작동함
  useEffect(()=>{
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    // onClick 에 close를 넣어 전체 창이 클릭시 닫게 만들고...
    <div className={open ? 'openModal modal' : 'modal'} onClick={close}>
      {open ? (
        //여기 영역까지 닫힘 이벤트가 넘어오지 않게 막는다...
        <section onClick={(e)=>e.stopPropagation()}>
          <header>
            {header}
            {/* <button className="close" onClick={close}>
              &times;
            </button> */}
          </header>
          {/* <main>{props.children}</main> */}
          <main><HoriScrollList /></main>
            {/* <HoriScrollList /> */}
          {/* <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer> */}
        </section>
      ) : null}
    </div>
  );
};

export default Modal;