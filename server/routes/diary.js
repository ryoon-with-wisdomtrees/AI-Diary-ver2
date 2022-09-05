const { Router } = require("express");
const { Diary } = require("../models/index");
const asyncHandler = require("../utils/async-handler");
const { User } = require("../models");
const router = Router();
const moment = require("moment");
const { body, validationResult } = require("express-validator");
const { diaryValidatorErrorChecker } = require("../utils/diaryValidator");
//Diary insert
router.post(
  "/write-page",
  [
    body("title").isLength({ min: 1 }),
    body("tag1").isLength({ min: 1 }),
    body("tag2").isLength({ min: 1 }),
    body("tag3").isLength({ min: 1 }),
    body("img_url").isLength({ min: 1 }),
    body("emotion").isLength({ min: 1 }),
    body("content").isLength({ min: 1 }),
    diaryValidatorErrorChecker,
  ],
  async (
    req,
    res,
    next //일기저장
  ) => {
    //const today = moment().format("YYYY-MM-DD HH:mm:ss"); //삭제
    const {
      user_id,
      author,
      email,
      title,
      content,
      emotion,
      tag1,
      tag2,
      tag3,
      img_url,
      hidden,
    } = req.body;
    //console.log("/write-page 인자값 확인");
    //console.log(req.body);

    try {
      //인스턴스 생성
      const newDiary = new Diary({
        user_id: user_id,
        email: email,
        author: author,
        content: content,
        emotion: emotion,
        title: title,
        //reg_date: moment().format("YYYY-MM-DD HH:mm:ss"), //삭제
        createdDate: new Date().toLocaleString(), //추가
        updatedDate: new Date().toLocaleString(), //추가
        tag1: tag1,
        tag2: tag2,
        tag3: tag3,
        img_url: img_url,
        month: new Date().getMonth()+1,
        hidden: hidden,
      });

      await newDiary.save(function (err, data) {
        if (err) {
          console.log(err);
          next(err);
          res.redirect("/");
        }
        console.log(data.shortId);
        const tempResult = {
          result: "저장이완료되었습니다",
          shortId: data.shortId,
        };
        res.json(tempResult);
      });
    } catch (e) {
      next(e);
    }
  }
);

//Diary insert
// router.post(
//   "/write-page",
//   async (
//     req,
//     res,
//     next //일기저장
//   ) => {
//     const today = moment().format("YYYY-MM-DD HH:mm:ss");
//     const {
//       user_id,
//       author,
//       email,
//       title,
//       content,
//       emotion,
//       tag1,
//       tag2,
//       tag3,
//       img_url,
//     } = req.body;
//     console.log("/write-page 인자값 확인");
//     console.log(req.body);

//     try {
//       //인스턴스 생성
//       const newDiary = new Diary({
//         user_id: user_id,
//         email: email,
//         author: author,
//         content: content,
//         emotion: emotion,
//         title: title,
//         reg_date: moment().format("YYYY-MM-DD HH:mm:ss"),
//         tag1: tag1,
//         tag2: tag1,
//         tag3: tag1,
//       });

//       await newDiary.save(function (err, data) {
//         if (err) {
//           console.log(err);
//           next(err);
//           res.redirect("/");
//         }
//         console.log(data.shortId);
//         const tempResult = {
//           result: "저장이완료되었습니다",
//           shortId: data.shortId,
//         };
//         res.json(tempResult);
//       });
//     } catch (e) {
//       next(e);
//     }
//   }
// );

// Diary list(모달창 형식)
router.get("/:user_id/:month/getModalList", async (req, res, next) => {
  //일기목록 모두 가져오기
  console.log("/getModalList");

  const { user_id, month } = req.params;
  console.log(user_id, month);
  // if (req.query.page < 1) {
  //   next("Please enter a number greater than 1"); //page가 1보다 작다면 오류처리.
  //   return;
  // }
  // const page = Number(req.query.page || 1); // req.query.page가 null or undifind면 1을 넣어라. 즉, default = 1
  // const perPage = Number(req.query.perPage || 10);
  const total = await Diary.countDocuments({});
  const diaries = await Diary.find({ user_id }).find({month})
    .sort({ createdAt: -1 }) //마지막으로 작성된 게시글을 첫번째 인덱스로 가져옴
  //   .skip(perPage * (page - 1)) //ex> 2페이지라면 5번부터
  //   .limit(perPage); // 6개씩 가져와줘.
  const totalPage = Math.ceil(total);
  console.log(diaries);
  res.json({ diaries, totalPage });
});

//Diary 게시글 한 개
router.get("/:shortId/view", async (req, res, next) => {
  console.log("/view");
  try {
    const { shortId } = req.params;
    // console.log(shortId);
    const diary = await Diary.findOne({ shortId });
    res.json(diary);
  } catch (e) {
    next(e);  
  }
});

//Diary list
router.get("/:user_id/getList", async (req, res, next) => {
  //일기목록 모두 가져오기
  console.log("/getList");

  const { user_id } = req.params;
  console.log(user_id);
  if (req.query.page < 1) {
    next("Please enter a number greater than 1"); //page가 1보다 작다면 오류처리.
    return;
  }
  const page = Number(req.query.page || 1); // req.query.page가 null or undifind면 1을 넣어라. 즉, default = 1
  const perPage = Number(req.query.perPage || 10);
  const total = await Diary.countDocuments({});
  const diaries = await Diary.find({ user_id })
    .sort({ createdAt: -1 }) //마지막으로 작성된 게시글을 첫번째 인덱스로 가져옴
    .skip(perPage * (page - 1)) //ex> 2페이지라면 5번부터
    .limit(perPage); // 6개씩 가져와줘.
  const totalPage = Math.ceil(total / perPage);
  console.log(diaries);
  res.json({ diaries, totalPage });
});

//남의글 보기
router.get("/:user_id/getOtherList", async (req, res, next) => {
  //일기목록 모두 가져오기
  console.log("남의글 /getList");

  const { user_id } = req.params;
  console.log(user_id);
  console.log(req.query.page);
  console.log(req.query.perPage);
  if (req.query.page < 1) {
    next("Please enter a number greater than 1"); //page가 1보다 작다면 오류처리.
    return;
  }
  console.log("qqqqqqqqqqqqqqqqqqqqqqqqq");
  //({user_id: {$ne: user_id}})
  const page = Number(req.query.page || 1); // req.query.page가 null or undifind면 1을 넣어라. 즉, default = 1
  const perPage = Number(req.query.perPage || 6);
  const total = await Diary.countDocuments({});
  const diaries = await Diary.find({ user_id: { $ne: user_id } })
    .find({ hidden: "false" })
    .sort({ createdAt: -1 }) //마지막으로 작성된 게시글을 첫번째 인덱스로 가져옴
    .skip(perPage * (page - 1)) //ex> 2페이지라면 5번부터
    .limit(perPage); // 6개씩 가져와줘.
  const totalPage = Math.ceil(total / perPage);
  console.log("ssssssssssssssssssssssssss");
  // console.log(diaries);
  res.json({ diaries, totalPage });
});

//Diary 삭제
router.get("/:shortId/delete", async (req, res, next) => {
  console.log("/delete");
  try {
    //const {name,content,emotion} = req.body;
    const { shortId } = req.params;
    console.log(shortId);
    await Diary.deleteOne({ shortId });
    res.json({ result: "삭제가 완료되었습니다. " });
  } catch (e) {
    next(e);
  }
});

//Diary 수정
router.post("/:shortId/update", async (req, res, next) => {
  console.log("/update");
  try {
    const {
      shortId,
      user_id,
      author,
      email,
      title,
      content,
      emotion,
      tag1,
      tag2,
      tag3,
      img_url,
      hidden,
    } = req.body;
    console.log(shortId);
    // const mod_date = moment().format("YYYY-MM-DD HH:mm:ss");
    // await Diary.updateOne(
    //   { shortId },
    //   { $set: { content, emotion, title, mod_date } }
    // );
    updatedDate = new Date().toLocaleString(); //추가
    console.log(updatedDate);
    await Diary.updateOne(
      { shortId },
      { $set: { content, emotion, title, updatedDate,hidden } }
    );
    res.json({ result: "수정완료" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
