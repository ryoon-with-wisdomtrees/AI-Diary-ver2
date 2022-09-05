import { useEffect, useRef, useState } from "react";
import $ from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import port from "./../../data/port.json";
import "./../../styles/SignUpForm.css";
import { useCookies } from "react-cookie";

const SignUpForm = ({ signUpData, onChangeSignUpData, setSignUpData }) => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef =useRef(); 
  const rePasswordRef = useRef(); 
  const nameRef = useRef()
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  useEffect(() => {
    if (cookies.userData === undefined) {
      //console.log(cookies.userData);
      navigate("/");
      setSignUpData({
        email:"",
        password:"",
        rePassword:"",
        name:""
      })
    } else {
      //console.log(cookies.userData);
      navigate("/diary/home");
      
    }
  }, []);

  const [errorWarning, setErrorWarning] = useState({
    email:false,
    password : false , 
    rePassword : false , 
    name : false, 
})

  const [errorMessage, setErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMesage] = useState("")
  const [nameValid, setNameValid] = useState(false)
  const [passwordValid, setPasswordValid]=useState(true)
  const [rePasswordValid, setRepasswordValid]=useState(true)

  // 이메일 유효성 검사
  const checkEmail = async(email) => {
    var regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/; 
    // 형식에 맞는 경우 true 리턴
    //console.log("이메일 유효성 검사 :: ", regExp.test(email));
    if(regExp.test(email)===true){ //유효함 
      await axios.get(`${port.url}/user/${email}/findEmail`).then(
        (res)=>{console.log(res)
        setEmailErrorMesage("존재하는 이메일입니다") //찾기 성공 => 존재하는 이메일 
        }).catch((e)=>{         //찾기 실패 => 존재하지 않는 거니까 에러 내용에 아무것도 저장 안함 
          setEmailErrorMesage("")
          setErrorWarning({
            ...errorWarning,
            email:false
          })
          console.log(e)})
    }
    else{ //아예 유효 x
      setEmailErrorMesage("유효하지 않는 이메일입니다.")
    }
  };
  //비밀번호 유효성 검사
  const checkPassword = (password) => {
    //  8 ~ 10자 영문, 숫자 조합
    //console.log(password)
    var regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#\$%\^&\*]).{8,}$/;
    
    // 형식에 맞는 경우 true 리턴
    //console.log("비밀번호 유효성 검사 :: ", regExp.test(password));
    if(regExp.test(password)){  //정규식에 들어 맞았을 때 
      setPasswordValid(true)    // 메시지 없애고 
      setErrorWarning({         //빨간색 효과도 초기화 
        ...errorWarning,
        password:false
      }) 
    }
    else{                       //정규식에 안 맞을 때 
    setPasswordValid(false)     //메시지 나오게 함 // 빨간색 효과는 클릭했을 때 나오니 setErrorWarning은 사용 안함.
    }
  };

  

  const checkRepassword = (password, rePassword) => {
    console.log(password,rePassword)
   if(password===rePassword){
    setRepasswordValid(true)
    //console.log("같은가")
    //console.log(rePasswordValid)
    setErrorWarning({
      ...errorWarning,
      rePassword:false
    })
  }
   else{
    setRepasswordValid(false)
    //console.log("다른가")
    //console.log(rePasswordValid)
   }

  }

  const checkName = (name) => {
    if(name===""){
      setNameValid(false)
    }
    else{
      setNameValid(true)
      setErrorWarning({
        ...errorWarning,
        name: false
      })
    }
  }

  const onClickSignUpButton = () => {
    var validationValue; //백엔드에서 유효성 검사를 진행 한 후 나온 첫번째 에러의 종류 
    // if(!nameValid){
    //   setErrorMessage("이름을 확인하세요")
    //   nameRef.current.focus()
    //   return
    // }
    sendSignUpData()
      .then((res) => {
        console.log(res.data);
        
        alert(res.data.result);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e.response.data.value); 
        validationValue = e.response.data.value; 
        console.log(validationValue)
        setErrorMessage(e.response.data.error);
        if(validationValue==="email"){
          emailRef.current.focus();
          setErrorWarning({
            ...errorWarning,
            email:true
          })
        }
        else if(validationValue==="password"){
            passwordRef.current.focus()
            setErrorWarning({
              ...errorWarning,
              password:true
            })
        }
        else if(validationValue==="rePassword")
        {
          rePasswordRef.current.focus()
          setErrorWarning({
            ...errorWarning,
            rePassword:true
          })
        }
        else if(validationValue==="name"){
          nameRef.current.focus()
          setErrorWarning({
            ...errorWarning,
            name:true
          })
        }
      });
      
  };

  
  const sendSignUpData = async () => {
    return await axios.post(`${port.url}/user/signUp`, signUpData);
  };

  const handleEmailChange = (e) => {
    console.log(e.target.value)
    checkEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    //console.log(e.target.value)
    checkPassword(e.target.value)
  }

  const handleRepasswordChange = (e) => {
    console.log(signUpData.password)
    checkRepassword(signUpData.password,e.target.value)
  }

  const handleNameChange = (e) => {
    checkName(e.target.value)
  }
  return (
    <div className="signUp_form">
      <div>
        <form>
          <div>
            <label htmlFor="email" className="form-label">
              Email address
            </label>
          </div>
          <div>
            <input
              size='30'
              type="email"
              ref={emailRef}
              value={signUpData.email}
              // onChange={onChangeSignUpData}
              onChange={(e)=>{
                onChangeSignUpData(e)
                handleEmailChange(e)
                // checkEmail(signUpData.email)
              }}
              className="siginUp_form-input"
              name="email"
              id="email"
              aria-describedby="emailHelp"
            />
            <div className="siginUp_form-oo" style={{color:errorWarning['email']?'red':'black'}}>
          {emailErrorMessage}
          </div>
            <div id="emailHelp">
              {/* We'll never share your email with anyone else. */}
            </div>
          </div>
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
          </div>
          <div>
            <input
              size='30'
              type="password"
              value={signUpData.password}
              ref = {passwordRef}
              onChange={(e)=>{
                onChangeSignUpData(e)
                handlePasswordChange(e)
                
              }}
              className="siginUp_form-input"
              name="password"
              id="password"
            />
          </div>
          <div className="siginUp_form-oo">
          {passwordValid?(<></>):(<div style={{color:errorWarning['password']?'red':'black'}}>8~16자 영문 대 소문자, 숫자, <br></br>특수문자를 사용하세요.</div>)}
          </div>
          <div>
            <label htmlFor="rePassword" className="form-label">
              rePassword
            </label>
          </div>
          <div>
            <input
              size='30'
              type="password"
              value={signUpData.rePassword}
              className="siginUp_form-input"
              name="rePassword"
              id="rePassword"
              ref = {rePasswordRef}
              onChange={(e)=>{
                onChangeSignUpData(e)
                handleRepasswordChange(e)}}
            />
        </div>
        <div className="siginUp_form-oo">
        {rePasswordValid?(<></>):(<div style={{color:errorWarning['rePassword']?'red':'black'}}>비밀번호가 일치하지 않습니다.</div>)}
        </div>
          <div>
            <label htmlFor="name" className="form-label">
              name
            </label>
          </div>
          <div>
            <input
              size='30'
              type="text"
              value={signUpData.name}
              onChange={(e)=>{
                onChangeSignUpData(e)
                handleNameChange(e)
                // checkEmail(signUpData.email)
              }}
              className="siginUp_form-input"
              name="name"
              id="name"
              ref = {nameRef}
            />
             
          </div>
          {/* <div>
            <p className="text-danger" >{errorMessage}</p>
          </div> */}
          <p></p>
          <button

            type="button"
            onClick={onClickSignUpButton}
            className="siginUp_form-button"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;