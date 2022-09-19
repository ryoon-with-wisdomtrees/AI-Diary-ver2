require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const diaryRouter = require("./routes/diary");
const userRouter = require("./routes/user");
const authRouter = require("./routes/oauth");
const authMiddleware = require("./utils/authMiddleware");
const transeRouter = require("./routes/papago");
const cors = require("cors");
const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== "production";
const prod = process.env.NODE_ENV === "production";
const app = express();

const appConfig = prod
  ? require("../../AI-Diary-ver2/server/application.prod.json")
  : require("../../AI-Diary-ver2/server/application.dev.json");

console.log(appConfig);
mongoose.connect(appConfig.MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log("DB connect success");
  console.log(appConfig.PORT);
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/diary", diaryRouter);
// auth url 경로 라우팅
app.use("/auth", authRouter);
//posts url 경로 라우팅
app.use("/diary", authMiddleware, diaryRouter);
//user url 경로 라우팅
app.use("/user", userRouter);
//papago url 경로 라우팅
app.use("/translate", transeRouter);

app.listen(appConfig.PORT, () => {
  console.log(`server open. port: ${appConfig.PORT}`);
});
