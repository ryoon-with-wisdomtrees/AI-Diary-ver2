const { Router } = require("express");
const router = Router();
const asyncHandler = require("./../utils/async-handler");
const cryto = require("crypto");
const { User } = require("../models");
const { Diary } = require("../models/index");
const jwt = require("jsonwebtoken");
const jwtConfig = require("./../config/jwtConfig");
const nodeMailer = require("nodemailer");
const { body, validationResult } = require('express-validator');
const {userValidatorErrorChecker} = require('../utils/userValidator')
router.post(
  "/signUp",[
    //형식 유효성 검사 
    body('email').exists().isEmail(), // 1. 이메일 형식 문제
    body('email').exists().custom(value => {   // 2. 존재하는 이메일
      return User.findOne({email:value}).then(user => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    }),
    // body('password').custom(value => {
    //     const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#\$%\^&\*]).{8,16}$/; 
    //     const isNotValidPassword = !regexPassword.test(value);
    //     console.log(isNotValidPassword)
    //     if(isNotValidPassword) {
    //       return new Error('Body must have valid password (At Least 1 Upper Case, 1 lower case, 1 spacial character, 1 numeric character)');
    //     }
    //     else{
    //       new Error("?"); 
    //     }
    //   }),
     
      // body('password')
      // .custom(value=>{  //위에 비밀번호 내부 에러 때문에 진행이 안되고 넘어감 
      //   if(value ===body('rePassword')){
      //     return Promise.reject("different")
      //   }
      // }),
      // body('rePassword').custom((value,{req})=>{
      //   if(value!==req.body.password){
      //     //return Promise.reject("different")
      //     throw new Error("diff")
      //   }
      // }),
      // body('name').isLength({min:1}),
    userValidatorErrorChecker
  ],


  asyncHandler(async (req, res, next) => {
    const { email, password, rePassword ,name} = req.body;
    console.log(`email: ${email}, password: ${password}, name: ${name}`);
    let hashPassword = passwordHash(password);

    // const checkEmail = await User.findOne({ email: email });
    // console.log(`checkEmail: ${checkEmail}`);
    // if (checkEmail) {
    //   // throw new Error("이미 가입된 이메일입니다.");
    //   res.status(500);
    //   res.json({
    //     error: "이미 가입된 이메일입니다.",
    //   });
    //   return;
    // }
    
      const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#\$%\^&\*]).{8,16}$/; 
      const isNotValidPassword = !regexPassword.test(password);
      console.log(isNotValidPassword)
      if(isNotValidPassword) {
        res.status(500);
      res.json({
        value:"password", 
        error:"비밀번호를 확인하세요"
      })
      return;
      }
      
    

    if(password !== rePassword){
      res.status(500);
      res.json({
        value:"rePassword", 
        error:"비밀번호가 비밀번호 확인과 일치 하지 않습니다"
      })
      return;
    }

    if(!name){
      res.status(500); 
      res.json({
        value:"name",
        error:"내용을 확인하세요."
      })
      return 
    }
    

    await User.create({
      email,
      password: hashPassword,
      name,
    });

    res.json({
      result: "회원가입이 완료되었습니다. 로그인을 해주세요.",
    });
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(`email: ${email}, password: ${password}`);
    let hashPassword = passwordHash(password);

    const isUserCheck = await User.findOne({ email });

    if (!isUserCheck) {
      res.status(401);
      res.json({
        fail: "존재하지 않는 이메일입니다.",
      });
      return;
    }

    if (hashPassword !== isUserCheck.password) {
      res.status(401);
      res.json({
        fail: "비밀번호가 틀렸습니다.",
      });
      return;
    }

    jwt.sign(
      {
        email: email,
        name: isUserCheck.name,
      },
      jwtConfig.secret,
      {
        expiresIn: "1d", //1y,1d,2h,1m,5s
      },
      (err, token) => {
        if (err) {
          res
            .status(401)
            .json({ status: false, message: "로그인을 해주세요." });
        } else {
          res.json({
            login: true,
            status: true,
            accessToken: token,
            email: isUserCheck.email,
            author: isUserCheck.name,
            user_id: isUserCheck.user_id,
          });
        }
      }
    );
  })
);

//비밀번호 찾기 : 2번
router.post(
  "/find/password",
  asyncHandler(async (req, res, nex) => {
    //email값을 가져옵니다.
    let { email } = req.body;
    //email에 해당하는 사용자 정보를 가져옵니다.
    let user = await User.findOne({ email });
    //email을 전송하는데 사용하게 될 email
    let myEmail = "dudspsdl123321@gmail.com";
    //nodemailer를 사용하여 메일전송을합니다.
    let transporter = nodeMailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: myEmail,
        pass: "wsdjonteaayznmkm",
      },
    });

    //랜덤 난수값을 가져옵니다.
    const randomPassword = randomPw();
    //랜덤 난수값을 hash형태로 변환합니다.
    const hashRandomPassword = passwordHash(randomPassword);
    //변환된 랜덤 난수 패스워드를 DB에 저장합니다.
    await User.findOneAndUpdate(
      { shortId: user.shortId },
      {
        password: hashRandomPassword,
        status: true, //비밀번호가 변경이 되었다는것을 감지하기 위해 true를 작성
      }
    );

    console.log(hashRandomPassword);

    //실질적으로 email을 보내는 부분입니다.
    let info = await transporter.sendMail({
      from: `"Elice" <${myEmail}>`,
      to: user.email,
      subject: "Reset Password By Elice",
      html: `<b>초기화 비밀번호 : ${randomPassword}</b>`,
    });

    console.log(info.messageId);

    //응답처리
    res.json({ result: "이메일을 전송하였습니다." });
  })
);

//랜덤 난수 값을 리턴하는 함수
const randomPw = () => {
  return Math.floor(Math.random() * 10 ** 8)
    .toString()
    .padStart("0", 8);
};

const passwordHash = (password) => {
  return cryto.createHash("sha1").update(password).digest("hex");
};


router.get('/:email/findEmail',async(req,res,next)=>{
  const {email} = req.params; 
  //console.log(email)
  const isUserCheck = await User.findOne({ email });
  if(isUserCheck){
    res.json({result:"존재하는이메일"})
  }
  else{
    res.status(500);
      res.json({
        error:"존재하는 이메일입니다"
      })
  }
})
module.exports = router;
