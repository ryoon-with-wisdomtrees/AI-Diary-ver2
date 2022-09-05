const { validationResult } = require("express-validator");

exports.userValidatorErrorChecker = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array()) 
  if (!errors.isEmpty()){
    if(errors.array()[0].param==='email'){  //이메일 유효성 문제 1. 이메일 형식 문제 2. 존재하는 이메일 
      if(errors.array()[0].msg==="Invalid value"){  //1. 이메일 형식 문제 
    return res.status(400).json({ 
      value:"email", 
      error:"이메일 형식을 확인하세요."
    })}
    else if(errors.array()[0].msg==="E-mail already in use"){ //2. 존재하는 이메일 
      return res.status(400).json({ 
        //errors: errors.array() 
        value:"email", 
        error:"존재하는이메일입니다."
    })
    ;}}
  }
   
      //console.log(errors.array()) 
        //모든 에러들 목록 
      // else if(errors.array()[0].param==='password'){    //비밀번호 유효성 문제 1. 정규식 문제 
          
      //   if(errors.array()[0].msg==="Body must have valid password (At Least 1 Upper Case, 1 lower case, 1 spacial character, 1 numeric character)")
      //     {return res.status(400).json({ 
      //       //errors: errors.array() 
      //       value: "password", 
      //       error:"비밀번호는 영문 대소문자, 특수문자, 숫자가 각각 한개 이상 포함되어야 합니다"
      //     })
      //   }
      //       else if(errors.array()[1].msg==="different"){ //비밀번호 유효성 문제 2. 비밀번호와 비밀번호 확인의 차이
      //     return res.status(400).json({
      //       value: "password", 
      //        error:"비밀번호가 비밀번호 확인과 일치 하지 않습니다"
      //      })
      //    }
      //   }


    
  
  next();
}