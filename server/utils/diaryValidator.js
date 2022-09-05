const { validationResult } = require("express-validator");

exports.diaryValidatorErrorChecker = (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors.array()[0])
        
        if(errors.array()[0].param==="title"){
            return res.status(400).json({ 
                error:"제목을 입력하세요."
              })
        }
        
        else if(errors.array()[0].param==="tag1"){
            return res.status(400).json({ 
                error:"첫번째 태그를 입력하세요."
              })
        }
        else if(errors.array()[0].param==="tag2"){
            return res.status(400).json({ 
                error:"두번째 태그를 입력하세요."
              })
        }
        else if(errors.array()[0].param==="tag3"){
            return res.status(400).json({ 
                error:"세번째 태그를 입력하세요."
              })
        }
        else if(errors.array()[0].param==="img_url"){
            return res.status(400).json({ 
                error:"이미지 생성이 완료되지 않았습니다."
              })
        }
        else if(errors.array()[0].param==="emotion"){
            return res.status(400).json({ 
                error:"감정상태를 선택하세요."
              })
        }
        else if(errors.array()[0].param==='content'){
            return res.status(400).json({ 
                error:"내용을 입력하세요."
              })
        }
    }
    next(); 
}